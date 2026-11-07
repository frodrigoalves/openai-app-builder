import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/shared/Logo";
import { categories } from "@/data/demo";

export function Footer() {
  return (
    <footer className="bg-ink text-ivory/80">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 md:grid-cols-4 md:px-10">
        <div className="md:col-span-2">
          <Logo inverted className="text-ivory" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/60">
            Mineralien, Edelsteine, Schmuck und ausgewählte Produkte für das Leben in den Alpen. Waidring, Tirol.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-5 text-brass">Kollektion</p>
          <ul className="space-y-3 text-sm">
            {categories.map((c) => (
              <li key={c.id}><Link to="/produkte" search={{ kategorie: c.id }} className="hover:text-ivory">{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-5 text-brass">Service</p>
          <ul className="space-y-3 text-sm">
            <li><Link to="/ueber-uns" className="hover:text-ivory">Über uns</Link></li>
            <li><Link to="/kontakt" className="hover:text-ivory">Kontakt</Link></li>
            <li><Link to="/warenkorb" className="hover:text-ivory">Warenkorb</Link></li>
            <li><Link to="/verwaltung/anmelden" className="hover:text-ivory">Verwaltung</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-6 text-xs text-ivory/45 md:flex-row md:justify-between md:px-10">
          <span>© 2026 Mader Steinwelt · Impressum, AGB und Datenschutz folgen</span>
          <span>Prototyp — Produkte, Preise und Bestände sind Beispieldaten. Kein Verkauf.</span>
        </div>
      </div>
    </footer>
  );
}
