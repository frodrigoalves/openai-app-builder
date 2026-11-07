import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageIntro, StoreLayout } from "@/components/store/StoreLayout";
import { ProductCard } from "@/components/store/ProductCard";
import { categories } from "@/data/demo";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/produkte/")({
  validateSearch: (s: Record<string, unknown>): { kategorie?: string } => ({ kategorie: typeof s.kategorie === "string" ? s.kategorie : undefined }),
  head: () => ({ meta: [
    { title: "Produkte — Mader Steinwelt" },
    { name: "description", content: "Alle Mineralien, Edelsteine, Schmuckstücke und alpinen Produkte im Überblick." },
    { property: "og:title", content: "Produkte — Mader Steinwelt" },
    { property: "og:description", content: "Die gesamte Kollektion im Überblick." },
  ] }),
  component: Catalog,
});

function Catalog() {
  const { kategorie } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { products } = useStore();
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("neu");
  let list = products.filter((p) => p.status === "veroeffentlicht" && (!kategorie || p.category === kategorie) && p.name.toLowerCase().includes(q.toLowerCase()));
  if (sort === "preis-auf") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "preis-ab") list = [...list].sort((a, b) => b.price - a.price);
  return (
    <StoreLayout>
      <PageIntro eyebrow="Kollektion" title="Alle Fundstücke" />
      <div className="mx-auto max-w-[1440px] px-5 pb-24 md:px-10">
        <div className="flex flex-wrap items-center gap-3 border-y border-border py-4">
          <button onClick={() => navigate({ search: { kategorie: undefined } })} className={`px-3 py-1.5 text-sm ${!kategorie ? "bg-primary text-primary-foreground" : ""}`}>Alle</button>
          {categories.map((c) => (
            <button key={c.id} onClick={() => navigate({ search: { kategorie: c.id } })} className={`px-3 py-1.5 text-sm ${kategorie === c.id ? "bg-primary text-primary-foreground" : ""}`}>{c.navLabel}</button>
          ))}
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Suchen…" aria-label="Suche" className="ml-auto border border-input bg-card px-3 py-2 text-sm" />
          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sortierung" className="border border-input bg-card px-3 py-2 text-sm">
            <option value="neu">Neueste</option><option value="preis-auf">Preis aufsteigend</option><option value="preis-ab">Preis absteigend</option>
          </select>
        </div>
        {list.length === 0 ? <p className="py-24 text-center font-display text-2xl">Keine Produkte gefunden.</p> : (
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">{list.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}</div>
        )}
      </div>
    </StoreLayout>
  );
}
