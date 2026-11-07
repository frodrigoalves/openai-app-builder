import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AdminPage, Panel, btn, field } from "@/components/admin/ui";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/verwaltung/wareneingang")({ component: Receiving });

function Receiving() {
  const { products, adjustStock } = useStore();
  const incoming = products.filter((p) => p.incoming > 0);
  const [id, setId] = useState("");
  const [qty, setQty] = useState(1);
  const [last, setLast] = useState<string | null>(null);
  const sel = products.find((p) => p.id === id);
  return (
    <AdminPage title="Wareneingang" text="Eingetroffene Ware aus der Edelstein-Lieferung bestätigen.">
      <div className="grid gap-6 md:grid-cols-2">
        <Panel>
          <h2 className="text-xl">Lieferung bestätigen</h2>
          {incoming.length === 0 ? <p className="mt-4 text-sm text-muted-foreground">Keine offenen Anlieferungen.</p> : (
            <form className="mt-4 space-y-4" onSubmit={(e) => { e.preventDefault(); if (!sel) return; const q = Math.min(qty, sel.incoming); adjustStock(sel.id, q, "Wareneingang bestätigt", "wareneingang"); setLast(`${sel.name}: Lager ${sel.stock} → ${sel.stock + q}, Anlieferung ${sel.incoming} → ${sel.incoming - q}`); toast.success("Wareneingang gebucht"); setId(""); setQty(1); }}>
              <label className="block text-xs font-medium">Produkt<select required className={`${field} mt-1`} value={id} onChange={(e) => setId(e.target.value)}><option value="">Bitte wählen…</option>{incoming.map((p) => <option key={p.id} value={p.id}>{p.name} ({p.incoming} erwartet)</option>)}</select></label>
              <label className="block text-xs font-medium">Erhaltene Menge<input type="number" min={1} max={sel?.incoming} className={`${field} mt-1`} value={qty} onChange={(e) => setQty(Number(e.target.value))} /></label>
              <button className={btn} disabled={!sel}>Eingang bestätigen</button>
            </form>)}
          {last && <p className="mt-4 bg-success/10 p-3 text-sm text-success">{last}</p>}
        </Panel>
        <Panel><h2 className="text-xl">Erwartete Ware</h2><ul className="mt-3 divide-y divide-border text-sm">{incoming.map((p) => <li key={p.id} className="flex justify-between py-2"><span>{p.name}</span><span>{p.incoming} Stk.</span></li>)}</ul></Panel>
      </div>
    </AdminPage>
  );
}
