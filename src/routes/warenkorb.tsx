import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro, StoreLayout } from "@/components/store/StoreLayout";
import { QtyStepper } from "@/components/store/CartDrawer";
import { formatPrice } from "@/lib/format";
import { useCartDetails, useStore } from "@/lib/store";

export const Route = createFileRoute("/warenkorb")({
  head: () => ({ meta: [
    { title: "Warenkorb — Mader Steinwelt" },
    { name: "description", content: "Ihr Demo-Warenkorb bei Mader Steinwelt." },
    { property: "og:title", content: "Warenkorb — Mader Steinwelt" },
    { property: "og:description", content: "Ihr Demo-Warenkorb." },
  ] }),
  component: Cart,
});

function Cart() {
  const { setQty, removeFromCart } = useStore();
  const { lines, subtotal } = useCartDetails();
  return (
    <StoreLayout>
      <PageIntro eyebrow="Warenkorb" title="Ihre Auswahl" />
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 pb-24 md:grid-cols-[1fr_360px] md:px-10">
        {lines.length === 0 ? <p className="font-display text-2xl">Ihr Warenkorb ist leer. <Link to="/produkte" className="underline">Kollektion entdecken</Link></p> : (
          <ul className="divide-y divide-border border-y border-border">{lines.map((l) => (
            <li key={l.productId} className="flex items-center gap-5 py-5">
              <img src={l.product.images[0]} alt={l.product.name} className="h-28 w-24 object-cover" />
              <div className="flex-1"><p className="font-display text-xl">{l.product.name}</p><p className="text-sm text-muted-foreground">{formatPrice(l.product.price)}</p></div>
              <QtyStepper value={l.quantity} max={l.product.stock} onChange={(n) => setQty(l.productId, n)} />
              <button onClick={() => removeFromCart(l.productId)} className="text-sm underline">Entfernen</button>
            </li>))}</ul>
        )}
        <aside className="h-fit bg-card p-6 shadow-soft">
          <div className="flex justify-between"><span>Zwischensumme</span><span className="font-semibold">{formatPrice(subtotal)}</span></div>
          <button disabled className="mt-6 w-full bg-primary py-3 text-sm text-primary-foreground opacity-40">Zur Kasse (nicht aktiv)</button>
          <p className="mt-3 text-xs text-muted-foreground">Prototyp: Bestellung und Zahlung sind noch nicht aktiv. Es werden keine Zahlungen verarbeitet.</p>
        </aside>
      </div>
    </StoreLayout>
  );
}
