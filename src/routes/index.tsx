import { createFileRoute, Link } from "@tanstack/react-router";
import { StoreLayout } from "@/components/store/StoreLayout";
import { ProductCard } from "@/components/store/ProductCard";
import { categories, images } from "@/data/demo";
import alpine from "@/assets/alpine-panorama.jpg";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Mader Steinwelt — Schätze der Natur aus Tirol" },
    { name: "description", content: "Ausgewählte Mineralien, Edelsteine, Schmuck und alpine Produkte aus Waidring, Tirol." },
    { property: "og:title", content: "Mader Steinwelt — Schätze der Natur" },
    { property: "og:description", content: "Mineralien, Edelsteine, Schmuck und alpine Produkte." },
  ] }),
  component: Index,
});

function Index() {
  const { products } = useStore();
  return (
    <StoreLayout>
      <section className="relative overflow-hidden bg-ink text-ivory">
        <img src={images.hero} alt="Amethyst-Druse (Symbolbild)" className="slow-zoom absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-veil" />
        <div className="relative mx-auto flex min-h-[86vh] max-w-[1440px] flex-col justify-end px-5 pb-20 md:px-10">
          <p className="eyebrow rise text-brass">Mader Steinwelt · Tirol</p>
          <h1 className="rise mt-5 max-w-3xl text-5xl leading-[1] md:text-8xl">Schätze der Natur.<br /><em>Inspiriert von den Alpen.</em></h1>
          <p className="rise mt-6 max-w-lg text-ivory/75">Entdecken Sie ausgewählte Mineralien, Edelsteine, Schmuck und besondere Produkte für das Leben in den Alpen.</p>
          <div className="rise mt-9 flex flex-wrap gap-3">
            <Link to="/produkte" className="bg-brass px-7 py-3.5 text-sm tracking-wide text-ink hover:bg-ivory">Kollektion entdecken</Link>
            <Link to="/ueber-uns" className="border border-ivory/40 px-7 py-3.5 text-sm tracking-wide hover:bg-ivory/10">Unsere Geschichte</Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10">
        <p className="eyebrow text-brass">Kollektionen</p>
        <div className="mt-8 grid gap-4 md:grid-cols-5">
          {categories.map((c) => (
            <Link key={c.id} to="/produkte" search={{ kategorie: c.id }} className="group relative aspect-[3/4] overflow-hidden bg-ink">
              <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover transition duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-veil" />
              <span className="absolute bottom-5 left-5 font-display text-2xl text-ivory">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-5 pb-24 md:px-10">
        <h2 className="text-4xl md:text-5xl">Besondere Fundstücke</h2>
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
          {products.filter((p) => p.status === "veroeffentlicht").slice(0, 8).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>
      <section className="relative h-[70vh] overflow-hidden">
        <img src={alpine} alt="Verschneite Alpen" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-veil" />
        <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-end px-5 pb-16 text-ivory md:px-10">
          <h2 className="text-5xl md:text-7xl">Die Natur als Inspiration.</h2>
          <p className="mt-4 max-w-md text-ivory/80">Von faszinierenden Mineralien bis zu ausgewählten Produkten für das Leben in den Bergen.</p>
        </div>
      </section>
    </StoreLayout>
  );
}
