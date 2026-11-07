import { createFileRoute } from "@tanstack/react-router";
import { AdminPage, DemoTag } from "@/components/admin/ui";

export const Route = createFileRoute("/verwaltung/benutzer")({
  component: () => (
    <AdminPage title="Benutzer" text="Zugänge zur Verwaltung. Echte Anmeldung folgt mit dem eigenen Server.">
      <div className="border border-border bg-card"><div className="flex items-center justify-between p-4 text-sm"><div><p className="font-medium">Hubert Mader</p><p className="text-xs text-muted-foreground">Inhaber · Administrator</p></div><DemoTag /></div></div>
    </AdminPage>
  ),
});
