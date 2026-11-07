import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/components/admin/ui";
import { categories } from "@/data/demo";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/verwaltung/kategorien")({ component: Cats });
function Cats() {
  const { products } = useStore();
  return (
    <AdminPage title="Kategorien" text="Struktur des Sortiments.">
      <div className="grid gap-4 md:grid-cols-3">{categories.map((c) => <div key={c.id} className="overflow-hidden border border-border bg-card"><img src={c.image} alt="" className="h-36 w-full object-cover" /><div className="p-4"><p className="font-display text-xl">{c.name}</p><p className="text-xs text-muted-foreground">{products.filter((p) => p.category === c.id).length} Produkte · {c.description}</p></div></div>)}</div>
    </AdminPage>
  );
}
