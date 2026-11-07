import { createFileRoute } from "@tanstack/react-router";
import { AdminPage, Panel } from "@/components/admin/ui";

export const Route = createFileRoute("/verwaltung/kunden")({
  component: () => (
    <AdminPage title="Kunden" text="Kundendaten werden nach Anbindung des eigenen Servers angezeigt.">
      <Panel className="py-16 text-center"><p className="font-display text-2xl">Noch keine Kunden</p><p className="mt-2 text-sm text-muted-foreground">Im Prototyp werden keine personenbezogenen Daten gespeichert.</p></Panel>
    </AdminPage>
  ),
});
