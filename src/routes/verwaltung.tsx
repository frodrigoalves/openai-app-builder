import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { Box, ClipboardList, FileText, Image, LayoutDashboard, Menu, PackageOpen, Settings, ShoppingCart, Tags, Truck, UserCog, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/shared/Logo";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/verwaltung")({
  head: () => ({ meta: [{ title: "Verwaltung — Mader Steinwelt" }, { name: "description", content: "Demo-Verwaltung" }, { name: "robots", content: "noindex" }] }),
  component: AdminLayout,
});

const menu = [
  ["/verwaltung", "Übersicht", LayoutDashboard], ["/verwaltung/produkte", "Produkte", Box], ["/verwaltung/kategorien", "Kategorien", Tags],
  ["/verwaltung/lagerbestand", "Lagerbestand", ClipboardList], ["/verwaltung/wareneingang", "Wareneingang", Truck], ["/verwaltung/bestellungen", "Bestellungen", ShoppingCart],
  ["/verwaltung/kunden", "Kunden", Users], ["/verwaltung/medien", "Medien", Image], ["/verwaltung/website-inhalte", "Website-Inhalte", FileText],
  ["/verwaltung/einstellungen", "Einstellungen", Settings], ["/verwaltung/benutzer", "Benutzer", UserCog],
] as const;

function AdminLayout() {
  const { adminSession, setAdminSession } = useStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  useEffect(() => { const t = setTimeout(() => { if (!localStorage.getItem("mader-steinwelt-demo-v1")?.includes('"adminSession":true')) navigate({ to: "/verwaltung/anmelden" }); }, 50); return () => clearTimeout(t); }, [adminSession, navigate]);
  const side = (
    <nav className="flex flex-col gap-0.5" onClick={() => setOpen(false)}>
      {menu.map(([to, label, Icon]) => (
        <Link key={to} to={to} activeOptions={{ exact: to === "/verwaltung" }} className="flex items-center gap-3 px-3 py-2.5 text-sm text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" activeProps={{ className: "bg-sidebar-accent text-sidebar-accent-foreground" }}>
          <Icon className="h-4 w-4" />{label}
        </Link>
      ))}
    </nav>
  );
  return (
    <div className="min-h-screen bg-background lg:flex">
      <aside className={`${open ? "fixed inset-0 z-50 block" : "hidden"} w-64 shrink-0 bg-sidebar p-5 text-sidebar-foreground lg:sticky lg:top-0 lg:block lg:h-screen`}>
        <div className="mb-8 flex items-center justify-between text-ivory"><Logo inverted /><button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Menü schließen">✕</button></div>
        {side}
        <div className="mt-8 space-y-2 border-t border-sidebar-border pt-5 text-xs">
          <Link to="/" className="block text-sidebar-foreground/70 hover:text-ivory">← Zum Shop</Link>
          <button onClick={() => { setAdminSession(false); navigate({ to: "/verwaltung/anmelden" }); }} className="text-sidebar-foreground/70 hover:text-ivory">Abmelden</button>
        </div>
      </aside>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 border-b border-border bg-warning/10 px-5 py-2.5 text-xs md:px-10">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Menü öffnen"><Menu className="h-4 w-4" /></button>
          <PackageOpen className="h-3.5 w-3.5" /> Demo-Modus · Alle Werte sind Beispieldaten und werden nur in diesem Browser gespeichert.
        </div>
        <main className="mx-auto max-w-6xl px-5 py-10 md:px-10"><Outlet /></main>
      </div>
    </div>
  );
}
