import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/components/admin/ui";
import { images } from "@/data/demo";

export const Route = createFileRoute("/verwaltung/medien")({
  component: () => (
    <AdminPage title="Medien" text="Generierte Symbolbilder — keine Fotos des tatsächlichen Bestands.">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{Object.entries(images).map(([k, src]) => <figure key={k}><img src={src} alt={k} className="aspect-square w-full object-cover" /><figcaption className="mt-1 text-xs text-muted-foreground">{k}.jpg</figcaption></figure>)}</div>
    </AdminPage>
  ),
});
