import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { StoreLayout } from "@/components/store/StoreLayout";
import { AvailabilityBadge, ProductCard, categoryName } from "@/components/store/ProductCard";
import { QtyStepper } from "@/components/store/CartDrawer";
import { formatPrice } from "@/lib/format";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/produkte/$slug")({
  head: () => ({ meta: [
    { title: "Produktdetails — Mader Steinwelt" },
    { name: "description", content: "Details, Maße und Verfügbarkeit des Produkts." },
    { property: "og:title", content: "Produktdetails — Mader Steinwelt" },
    { property: "og:description", content: "Details, Maße und Verfügbarkeit." },
  ] }),
  component: Detail,
});

function Detail() {
  const { slug } = Route.useParams();
  const { products, addToCart, setCartOpen } = useStore();
  const p = products.find((x) => x.slug === slug);
  const [img, setImg] = useState(0);
  const [qty, setQty] = useState(1);
  if (!p) return <StoreLayout><p className="py-32 text-center font-display text-2xl">Produkt nicht gefunden. <Link to="/produkte" className="underline">Zur Kollektion</Link></p></StoreLayout>;
  const rows = [["Mineralart", p.mineral], ["Farbe", p.color], ["Maße", p.dimensions], ["Gewicht", p.weight], ["SKU", p.sku]].filter((r) => r[1]);
  return (
    <StoreLayout>
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-14 md:grid-cols-2 md:px-10">
        <div>
          <div className="group aspect-[4/5] overflow-hidden bg-stone"><img src={p.images[img]} alt={p.name} className="h-full w-full cursor-zoom-in object-cover transition duration-700 group-hover:scale-125" /></div>
          {p.images.length > 1 && <div className="mt-3 flex gap-3">{p.images.map((s, i) => <button key={i} onClick={() => setImg(i)} className={`h-20 w-16 overflow-hidden border ${i === img ? "border-foreground" : "border-transparent"}`}><img src={s} alt="" className="h-full w-full object-cover" /></button>)}</div>}
        </div>
        <div>
          <p className="eyebrow text-brass">{categoryName(p.category)}</p>
          <h1 className="mt-3 text-5xl">{p.name}</h1>
          <p className="mt-4 text-2xl tabular-nums">{formatPrice(p.price)} <span className="text-xs text-muted-foreground">Demo-Preis</span></p>
          <div className="mt-4 flex gap-2"><AvailabilityBadge value={p.availability} />{p.unique && <span className="bg-amethyst/15 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-amethyst">Einzelstück</span>}</div>
          <p className="mt-6 leading-relaxed text-muted-foreground">{p.description}</p>
          {p.stock > 0 && (
            <div className="mt-8 flex gap-3">
              {!p.unique && <QtyStepper value={qty} max={p.stock} onChange={setQty} />}
              <button onClick={() => { addToCart(p.id, qty); setCartOpen(true); toast.success(`${p.name} im Warenkorb`); }} className="flex-1 bg-primary py-3 text-sm text-primary-foreground hover:bg-ink">In den Warenkorb</button>
            </div>
          )}
          <dl className="mt-10 divide-y divide-border border-y border-border text-sm">{rows.map(([k, v]) => <div key={k} className="flex justify-between py-3"><dt className="text-muted-foreground">{k}</dt><dd>{v}</dd></div>)}</dl>
        </div>
      </div>
      <section className="mx-auto max-w-[1440px] px-5 pb-24 md:px-10">
        <h2 className="text-3xl">Das könnte Ihnen gefallen</h2>
        <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">{products.filter((x) => x.id !== p.id && x.status === "veroeffentlicht").slice(0, 4).map((x) => <ProductCard key={x.id} product={x} />)}</div>
      </section>
    </StoreLayout>
  );
}
