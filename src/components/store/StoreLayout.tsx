import type { ReactNode } from "react";
import { CartDrawer } from "./CartDrawer";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="bg-forest py-2 text-center text-[0.7rem] tracking-wide text-ivory/80">
        Prototyp · Alle Produkte, Preise und Bestände sind Demo-Daten · Bestellungen sind noch nicht möglich
      </div>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

export function PageIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-10 pt-16 md:px-10 md:pt-24">
      <p className="eyebrow rise text-brass">{eyebrow}</p>
      <h1 className="rise mt-4 max-w-3xl text-5xl leading-[1.02] md:text-7xl" style={{ animationDelay: "80ms" }}>{title}</h1>
      {text && <p className="rise mt-6 max-w-xl text-muted-foreground" style={{ animationDelay: "160ms" }}>{text}</p>}
    </section>
  );
}
