import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AdminPage, Panel, btnGhost } from "@/components/admin/ui";
import { AvailabilityBadge } from "@/components/store/ProductCard";
import { availabilityLabel, formatDate, LOW_STOCK_THRESHOLD } from "@/lib/format";
import { useStore } from "@/lib/store";
import type { Availability } from "@/lib/types";

export const Route = createFileRoute("/verwaltung/lagerbestand")({ component: Inventory });

function Inventory() {
  const { products, movements, adjustStock } = useStore();
  const [tab, setTab] = useState<Availability | "alle">("alle");
  const list = products.filter((p) => tab === "alle" || p.availability === tab);
  const count = (a: Availability) => products.filter((p) => p.availability === a).length;
  return (
    <AdminPage title="Lagerbestand" text="Bestände anpassen und Bewegungen nachvollziehen.">
      <div className="grid grid-cols-3 gap-4">{(["in-anlieferung", "auf-lager", "nicht-verfuegbar"] as const).map((a) => <button key={a} onClick={() => setTab(tab === a ? "alle" : a)} className={`border p-5 text-left ${tab === a ? "border-primary bg-card" : "border-border"}`}><p className="text-xs text-muted-foreground">{availabilityLabel[a]}</p><p className="font-display text-3xl">{count(a)}</p></button>)}</div>
      <div className="overflow-x-auto border border-border bg-card"><table className="w-full text-sm">
        <thead className="border-b border-border text-left text-xs text-muted-foreground"><tr><th className="p-3">Produkt</th><th className="p-3">Status</th><th className="p-3">Auf Lager</th><th className="p-3">In Anlieferung</th><th className="p-3">Korrektur</th></tr></thead>
        <tbody className="divide-y divide-border">{list.map((p) => (
          <tr key={p.id}><td className="p-3 font-medium">{p.name}{p.stock > 0 && p.stock <= LOW_STOCK_THRESHOLD && <span className="ml-2 inline-flex items-center gap-1 text-xs text-warning"><AlertTriangle className="h-3 w-3" />niedrig</span>}</td>
            <td className="p-3"><AvailabilityBadge value={p.availability} /></td><td className="p-3">{p.stock}</td><td className="p-3">{p.incoming}</td>
            <td className="p-3"><div className="flex gap-1"><button className={btnGhost} aria-label="Bestand verringern" onClick={() => { adjustStock(p.id, -1, "Manuelle Korrektur"); toast("Bestand −1"); }}>−1</button><button className={btnGhost} aria-label="Bestand erhöhen" onClick={() => { adjustStock(p.id, 1, "Manuelle Korrektur"); toast("Bestand +1"); }}>+1</button></div></td></tr>))}</tbody>
      </table></div>
      <Panel><h2 className="text-xl">Bewegungsverlauf</h2><ul className="mt-3 divide-y divide-border text-sm">{movements.map((m) => <li key={m.id} className="flex justify-between gap-3 py-2"><span>{formatDate(m.date)} · {products.find((p) => p.id === m.productId)?.name ?? "—"} · {m.type === "wareneingang" ? "Wareneingang" : "Korrektur"} · {m.note}</span><span className={m.delta > 0 ? "text-success" : "text-destructive"}>{m.delta > 0 ? "+" : ""}{m.delta}</span></li>)}</ul></Panel>
    </AdminPage>
  );
}
