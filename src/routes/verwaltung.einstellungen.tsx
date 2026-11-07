import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { AdminPage, Panel, btn, field } from "@/components/admin/ui";
import { useStore } from "@/lib/store";
import type { ShopSettings } from "@/lib/types";

export const Route = createFileRoute("/verwaltung/einstellungen")({ component: SettingsPage });

const groups: [string, [keyof ShopSettings, string][]][] = [
  ["Shop-Informationen", [["shopName", "Shopname"], ["owner", "Inhaber / Firma"], ["uid", "UID-Nummer"]]],
  ["Kontaktdaten", [["street", "Straße"], ["zip", "PLZ"], ["city", "Ort"], ["country", "Land"], ["email", "E-Mail"], ["phone", "Telefon"]]],
  ["Versand (€)", [["shippingAustria", "Versand Österreich"], ["freeShippingFrom", "Versandkostenfrei ab"], ["shippingEU", "Versand EU"]]],
];

function SettingsPage() {
  const { settings, updateSettings, resetDemo } = useStore();
  return (
    <AdminPage title="Einstellungen" text="Platzhalter in eckigen Klammern bitte mit bestätigten Firmendaten ersetzen.">
      <form className="space-y-6" onSubmit={(e) => {
        e.preventDefault(); const fd = new FormData(e.currentTarget); const patch: Record<string, string | number> = {};
        groups.flatMap((g) => g[1]).forEach(([k]) => { const v = String(fd.get(k) ?? ""); patch[k] = typeof settings[k] === "number" ? Number(v) : v; });
        updateSettings(patch as Partial<ShopSettings>); toast.success("Einstellungen gespeichert (Demo)");
      }}>
        {groups.map(([title, fields]) => <Panel key={title}><h2 className="mb-4 text-xl">{title}</h2><div className="grid gap-4 md:grid-cols-2">{fields.map(([k, l]) => <label key={k} className="block text-xs font-medium">{l}<input name={k} defaultValue={String(settings[k])} className={`${field} mt-1`} /></label>)}</div></Panel>)}
        <Panel><h2 className="text-xl">Zahlungen</h2><p className="mt-2 text-sm text-muted-foreground">Zahlungsanbieter werden in der nächsten Phase angebunden. Derzeit nicht aktiv.</p></Panel>
        <Panel><h2 className="text-xl">Rechtliche Seiten</h2><p className="mt-2 text-sm text-muted-foreground">Impressum, AGB, Datenschutz und Widerrufsbelehrung — Texte müssen von Ihnen bzw. einer Rechtsberatung bereitgestellt werden.</p></Panel>
        <div className="flex gap-3"><button className={btn}>Speichern</button><button type="button" className="text-sm underline" onClick={() => { resetDemo(); toast("Demo-Daten zurückgesetzt"); }}>Demo-Daten zurücksetzen</button></div>
      </form>
    </AdminPage>
  );
}
