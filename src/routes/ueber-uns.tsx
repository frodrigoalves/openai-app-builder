import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, StoreLayout } from "@/components/store/StoreLayout";
import alpine from "@/assets/alpine-panorama.jpg";

export const Route = createFileRoute("/ueber-uns")({
  head: () => ({ meta: [
    { title: "Über uns — Mader Steinwelt" },
    { name: "description", content: "Mader Steinwelt in Waidring, Tirol: Mineralien, Edelsteine und alpine Produkte." },
    { property: "og:title", content: "Über uns — Mader Steinwelt" },
    { property: "og:description", content: "Wer hinter Mader Steinwelt steht." },
  ] }),
  component: () => (
    <StoreLayout>
      <PageIntro eyebrow="Über uns" title="Aus Waidring, mit Blick auf die Berge." text="Mader Steinwelt ist ein neues Angebot von Hubert Mader in Waidring, Tirol. Unsere erste Mineralien- und Edelsteinkollektion ist bereits erworben und befindet sich auf dem Weg nach Österreich." />
      <img src={alpine} alt="Alpenpanorama" loading="lazy" className="h-[60vh] w-full object-cover" />
    </StoreLayout>
  ),
});
