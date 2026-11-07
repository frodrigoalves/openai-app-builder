import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { formatPrice } from "@/lib/format";
import { useCartDetails, useStore } from "@/lib/store";

export function QtyStepper({ value, max, onChange }: { value: number; max: number; onChange: (n: number) => void }) {
  return (
    <div className="inline-flex items-center border border-border">
      <button aria-label="Menge verringern" className="p-2 disabled:opacity-30" disabled={value <= 1} onClick={() => onChange(value - 1)}><Minus className="h-3 w-3" /></button>
      <span className="w-8 text-center text-sm tabular-nums">{value}</span>
      <button aria-label="Menge erhöhen" className="p-2 disabled:opacity-30" disabled={value >= max} onClick={() => onChange(value + 1)}><Plus className="h-3 w-3" /></button>
    </div>
  );
}

export function CartDrawer() {
  const { cartOpen, setCartOpen, setQty, removeFromCart } = useStore();
  const { lines, subtotal } = useCartDetails();

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="flex w-full flex-col bg-background p-0 sm:max-w-md">
        <div className="border-b border-border px-6 py-5">
          <SheetTitle className="font-display text-2xl font-medium">Warenkorb</SheetTitle>
        </div>
        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-display text-xl">Ihr Warenkorb ist leer.</p>
            <Link to="/produkte" onClick={() => setCartOpen(false)} className="eyebrow border-b border-foreground pb-1">Kollektion entdecken</Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-6">
              {lines.map((l) => (
                <li key={l.productId} className="flex gap-4 py-5">
                  <img src={l.product.images[0]} alt={l.product.name} className="h-24 w-20 object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <p className="font-display text-lg leading-tight">{l.product.name}</p>
                      <button aria-label="Entfernen" onClick={() => removeFromCart(l.productId)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
                    </div>
                    <p className="text-sm text-muted-foreground">{formatPrice(l.product.price)}</p>
                    <div className="mt-auto">
                      <QtyStepper value={l.quantity} max={l.product.stock} onChange={(n) => setQty(l.productId, n)} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="space-y-4 border-t border-border bg-card px-6 py-6">
              <div className="flex justify-between text-sm"><span>Zwischensumme</span><span className="font-semibold">{formatPrice(subtotal)}</span></div>
              <p className="text-xs text-muted-foreground">Demo-Preise inkl. MwSt. Der Bestellvorgang ist im Prototyp nicht aktiv.</p>
              <Link to="/warenkorb" onClick={() => setCartOpen(false)} className="block bg-primary py-3.5 text-center text-sm tracking-wide text-primary-foreground transition hover:bg-ink">
                Zum Warenkorb
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
