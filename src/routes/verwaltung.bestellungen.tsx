import { createFileRoute } from "@tanstack/react-router";
import { AdminPage, DemoTag } from "@/components/admin/ui";
import { demoOrders } from "@/data/demo";
import { formatDate, formatPrice } from "@/lib/format";

const label = { offen: "Offen", "in-bearbeitung": "In Bearbeitung", versendet: "Versendet", storniert: "Storniert" };
export const Route = createFileRoute("/verwaltung/bestellungen")({
  component: () => (
    <AdminPage title="Bestellungen" text="Beispielhafte Demo-Datensätze — keine echten Bestellungen.">
      <div className="overflow-x-auto border border-border bg-card"><table className="w-full text-sm">
        <thead className="border-b border-border text-left text-xs text-muted-foreground"><tr><th className="p-3">Nr.</th><th className="p-3">Kunde</th><th className="p-3">Ort</th><th className="p-3">Datum</th><th className="p-3">Artikel</th><th className="p-3">Summe</th><th className="p-3">Status</th></tr></thead>
        <tbody className="divide-y divide-border">{demoOrders.map((o) => <tr key={o.id}><td className="p-3">{o.id} <DemoTag /></td><td className="p-3">{o.customer}</td><td className="p-3">{o.city}</td><td className="p-3">{formatDate(o.date)}</td><td className="p-3">{o.items}</td><td className="p-3">{formatPrice(o.total)}</td><td className="p-3">{label[o.status]}</td></tr>)}</tbody>
      </table></div>
    </AdminPage>
  ),
});
