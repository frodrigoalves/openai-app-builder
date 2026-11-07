import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageIntro, StoreLayout } from "@/components/store/StoreLayout";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/kontakt")({
  head: () => ({ meta: [
    { title: "Kontakt — Mader Steinwelt" },
    { name: "description", content: "Kontakt zu Mader Steinwelt in Waidring, Tirol." },
    { property: "og:title", content: "Kontakt — Mader Steinwelt" },
    { property: "og:description", content: "Schreiben Sie uns." },
  ] }),
  component: Contact,
});

function Contact() {
  const { settings: s } = useStore();
  return (
    <StoreLayout>
      <PageIntro eyebrow="Kontakt" title="Wir freuen uns auf Ihre Nachricht." />
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 pb-24 md:grid-cols-2 md:px-10">
        <div className="space-y-1 text-sm"><p>{s.owner}</p><p>{s.street}</p><p>{s.zip} {s.city}, {s.country}</p><p>{s.email}</p><p>{s.phone}</p></div>
        <form onSubmit={(e) => { e.preventDefault(); toast("Demo: Nachricht wurde nicht versendet."); }} className="space-y-4">
          <input required aria-label="Name" placeholder="Name" className="w-full border border-input bg-card px-4 py-3" />
          <input required type="email" aria-label="E-Mail" placeholder="E-Mail" className="w-full border border-input bg-card px-4 py-3" />
          <textarea required aria-label="Nachricht" placeholder="Nachricht" rows={5} className="w-full border border-input bg-card px-4 py-3" />
          <button className="bg-primary px-8 py-3 text-sm text-primary-foreground">Senden (Demo)</button>
        </form>
      </div>
    </StoreLayout>
  );
}
