import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/shared/Logo";

export const Route = createFileRoute("/verwaltung/anmelden")({
  head: () => ({ meta: [
    { title: "Verwaltung anmelden — Mader Steinwelt" },
    { name: "description", content: "Demo-Anmeldung zur Verwaltung." },
    { name: "robots", content: "noindex" },
  ] }),
  component: () => (
    <div className="flex min-h-screen items-center justify-center bg-forest px-5">
      <div className="w-full max-w-sm bg-background p-8 shadow-soft">
        <Logo />
        <h1 className="mt-8 text-3xl">Verwaltung</h1>
        <p className="mt-3 bg-warning/15 p-3 text-xs">Demo-Modus: Die Anmeldung ist noch nicht aktiv und nicht abgesichert.</p>
        <Link to="/" className="mt-6 block bg-primary py-3 text-center text-sm text-primary-foreground">Zurück zum Shop</Link>
      </div>
    </div>
  ),
});
