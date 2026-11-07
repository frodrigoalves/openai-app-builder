// Browser-only DEMO store (localStorage). Not production storage.
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { defaultSettings, demoMovements, demoProducts } from "@/data/demo";
import { deriveAvailability } from "./format";
import type { CartItem, InventoryMovement, Product, ShopSettings } from "./types";

const KEY = "mader-steinwelt-demo-v1";

interface State {
  products: Product[];
  movements: InventoryMovement[];
  cart: CartItem[];
  favorites: string[];
  settings: ShopSettings;
  adminSession: boolean;
}

const initial: State = {
  products: demoProducts,
  movements: demoMovements,
  cart: [],
  favorites: [],
  settings: defaultSettings,
  adminSession: false,
};

interface Ctx extends State {
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  addToCart: (productId: string, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleFavorite: (productId: string) => void;
  saveProduct: (p: Product) => void;
  deleteProducts: (ids: string[]) => void;
  adjustStock: (productId: string, delta: number, note: string, type?: InventoryMovement["type"]) => void;
  updateSettings: (s: Partial<ShopSettings>) => void;
  setAdminSession: (v: boolean) => void;
  resetDemo: () => void;
}

const StoreContext = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(initial);
  const [loaded, setLoaded] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...initial, ...JSON.parse(raw) });
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(KEY, JSON.stringify(state));
  }, [state, loaded]);

  const maxFor = (s: State, id: string) => s.products.find((p) => p.id === id)?.stock ?? 0;

  const addToCart = useCallback((productId: string, qty = 1) => {
    setState((s) => {
      const max = maxFor(s, productId);
      const existing = s.cart.find((c) => c.productId === productId);
      const next = Math.min(max, (existing?.quantity ?? 0) + qty);
      if (next <= 0) return s;
      const cart = existing
        ? s.cart.map((c) => (c.productId === productId ? { ...c, quantity: next } : c))
        : [...s.cart, { productId, quantity: next }];
      return { ...s, cart };
    });
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    setState((s) => {
      const q = Math.max(1, Math.min(maxFor(s, productId), qty));
      return { ...s, cart: s.cart.map((c) => (c.productId === productId ? { ...c, quantity: q } : c)) };
    });
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      ...state,
      cartOpen,
      setCartOpen,
      addToCart,
      setQty,
      removeFromCart: (id) => setState((s) => ({ ...s, cart: s.cart.filter((c) => c.productId !== id) })),
      clearCart: () => setState((s) => ({ ...s, cart: [] })),
      toggleFavorite: (id) =>
        setState((s) => ({
          ...s,
          favorites: s.favorites.includes(id) ? s.favorites.filter((f) => f !== id) : [...s.favorites, id],
        })),
      saveProduct: (p) =>
        setState((s) => {
          const fixed = { ...p, availability: deriveAvailability(p.stock, p.incoming) };
          const exists = s.products.some((x) => x.id === p.id);
          return { ...s, products: exists ? s.products.map((x) => (x.id === p.id ? fixed : x)) : [fixed, ...s.products] };
        }),
      deleteProducts: (ids) => setState((s) => ({ ...s, products: s.products.filter((p) => !ids.includes(p.id)) })),
      adjustStock: (productId, delta, note, type = "korrektur") =>
        setState((s) => ({
          ...s,
          products: s.products.map((p) => {
            if (p.id !== productId) return p;
            const stock = Math.max(0, p.stock + delta);
            const incoming = type === "wareneingang" ? Math.max(0, p.incoming - delta) : p.incoming;
            return { ...p, stock, incoming, availability: deriveAvailability(stock, incoming) };
          }),
          movements: [
            { id: crypto.randomUUID(), productId, type, delta, note, date: new Date().toISOString() },
            ...s.movements,
          ],
        })),
      updateSettings: (patch) => setState((s) => ({ ...s, settings: { ...s.settings, ...patch } })),
      setAdminSession: (v) => setState((s) => ({ ...s, adminSession: v })),
      resetDemo: () => setState(initial),
    }),
    [state, cartOpen, addToCart, setQty],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export function useCartDetails() {
  const { cart, products } = useStore();
  const lines = cart
    .map((c) => ({ ...c, product: products.find((p) => p.id === c.productId) }))
    .filter((l): l is typeof l & { product: Product } => !!l.product);
  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0);
  const count = lines.reduce((n, l) => n + l.quantity, 0);
  return { lines, subtotal, count };
}
