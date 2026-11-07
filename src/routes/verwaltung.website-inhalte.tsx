import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { AdminPage, Panel, btn, field } from "@/components/admin/ui";

export const Route = createFileRoute("/verwaltung/website-inhalte")({
  component: () => (
    <AdminPage title="Website-Inhalte" text="Texte der Startseite (Demo — Änderungen werden nicht übernommen).">
      <Panel><form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast("Demo: Inhalte nicht gespeichert."); }}>
        <label className="block text-xs font-medium">Hero-Überschrift<input className={`${field} mt-1`} defaultValue="Schätze der Natur. Inspiriert von den Alpen." /></label>
        <label className="block text-xs font-medium">Hero-Text<textarea rows={3} className={`${field} mt-1`} defaultValue="Entdecken Sie ausgewählte Mineralien, Edelsteine, Schmuck und besondere Produkte für das Leben in den Alpen." /></label>
        <label className="block text-xs font-medium">Über uns<textarea rows={4} className={`${field} mt-1`} defaultValue="Mader Steinwelt ist ein neues Angebot von Hubert Mader in Waidring, Tirol." /></label>
        <button className={btn}>Speichern</button>
      </form></Panel>
    </AdminPage>
  ),
});
