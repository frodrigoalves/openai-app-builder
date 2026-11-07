import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/shared/Logo";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/verwaltung_/anmelden")({
  head: () => ({ meta: [
    { title: "Verwaltung anmelden — Mader Steinwelt" },
    { name: "description", content: "Demo-Anmeldung zur Verwaltung." },
    { name: "robots", content: "noindex" },
  ] }),
  component: Login,
});

function Login() {
  const { setAdminSession } = useStore();
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center bg-forest px-5">
      <form onSubmit={(e) => { e.preventDefault(); setAdminSession(true); navigate({ to: "/verwaltung" }); }} className="w-full max-w-sm bg-background p-8 shadow-soft">
        <Logo />
        <h1 className="mt-8 text-3xl">Verwaltung</h1>
        <p className="mt-3 bg-warning/15 p-3 text-xs">Demo-Modus: Es findet keine echte Anmeldung statt. Jede Eingabe öffnet die Demo-Verwaltung. Nicht abgesichert.</p>
        <label className="mt-6 block text-xs font-medium">E-Mail<input type="email" className="mt-1 w-full border border-input bg-card px-3 py-2.5" /></label>
        <label className="mt-4 block text-xs font-medium">Passwort<input type="password" className="mt-1 w-full border border-input bg-card px-3 py-2.5" /></label>
        <button className="mt-6 w-full bg-primary py-3 text-sm text-primary-foreground hover:bg-ink">Demo-Verwaltung öffnen</button>
      </form>
    </div>
  );
}
