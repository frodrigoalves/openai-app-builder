import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminPage, DemoTag, Panel } from "@/components/admin/ui";
import { demoOrders } from "@/data/demo";
import { formatPrice, LOW_STOCK_THRESHOLD } from "@/lib/format";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/verwaltung/")({ component: Overview });

function Overview() {
  const { products, movements } = useStore();
  const low = products.filter((p) => p.stock > 0 && p.stock <= LOW_STOCK_THRESHOLD);
  const kpis = [["Umsatz", formatPrice(demoOrders.reduce((s, o) => s + o.total, 0))], ["Bestellungen", demoOrders.length], ["Aktive Produkte", products.filter((p) => p.status === "veroeffentlicht").length], ["Niedriger Lagerbestand", low.length], ["Neue Anfragen", 3]];
  return (
    <AdminPage title="Übersicht" text="Willkommen in der Demo-Verwaltung." action={<Link to="/verwaltung/produkte" search={{ neu: true }} className="bg-primary px-4 py-2.5 text-sm text-primary-foreground">+ Neues Produkt</Link>}>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">{kpis.map(([k, v]) => <Panel key={k}><div className="flex justify-between text-xs text-muted-foreground">{k}<DemoTag /></div><p className="mt-3 font-display text-3xl">{v}</p></Panel>)}</div>
      <div className="grid gap-4 md:grid-cols-2">
        <Panel><h2 className="text-xl">Niedriger Lagerbestand</h2><ul className="mt-3 divide-y divide-border text-sm">{low.length ? low.map((p) => <li key={p.id} className="flex justify-between py-2"><span>{p.name}</span><span className="text-warning">{p.stock} Stk.</span></li>) : <li className="py-2 text-muted-foreground">Keine Warnungen.</li>}</ul></Panel>
        <Panel><h2 className="text-xl">Letzte Lagerbewegungen</h2><ul className="mt-3 divide-y divide-border text-sm">{movements.slice(0, 5).map((m) => <li key={m.id} className="flex justify-between py-2"><span>{products.find((p) => p.id === m.productId)?.name ?? "—"} · {m.note}</span><span className={m.delta > 0 ? "text-success" : "text-destructive"}>{m.delta > 0 ? "+" : ""}{m.delta}</span></li>)}</ul></Panel>
      </div>
    </AdminPage>
  );
}
