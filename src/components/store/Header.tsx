import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/shared/Logo";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { categories } from "@/data/demo";
import { useCartDetails, useStore } from "@/lib/store";

const linkCls = "text-[0.8rem] tracking-wide text-foreground/75 transition-colors hover:text-foreground";

export function Header() {
  const { setCartOpen } = useStore();
  const { count } = useCartDetails();
  const [open, setOpen] = useState(false);

  const nav = (
    <>
      <Link to="/" className={linkCls} activeOptions={{ exact: true }} activeProps={{ className: "text-foreground" }}>Startseite</Link>
      {categories.map((c) => (
        <Link key={c.id} to="/produkte" search={{ kategorie: c.id }} className={linkCls}>{c.navLabel}</Link>
      ))}
      <Link to="/ueber-uns" className={linkCls}>Über uns</Link>
      <Link to="/kontakt" className={linkCls}>Kontakt</Link>
    </>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-6 px-5 md:px-10">
        <div className="flex items-center gap-3 xl:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger aria-label="Menü öffnen" className="p-1"><Menu className="h-5 w-5" /></SheetTrigger>
            <SheetContent side="left" className="w-80 bg-background">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <nav className="mt-10 flex flex-col gap-5 [&_a]:text-lg" onClick={() => setOpen(false)}>{nav}</nav>
            </SheetContent>
          </Sheet>
        </div>
        <Link to="/" aria-label="Mader Steinwelt Startseite"><Logo /></Link>
        <nav className="hidden items-center gap-7 xl:flex">{nav}</nav>
        <div className="flex items-center gap-4">
          <Link to="/produkte" aria-label="Suche" className="p-1 text-foreground/80 hover:text-foreground"><Search className="h-[18px] w-[18px]" /></Link>
          <button aria-label={`Warenkorb (${count})`} onClick={() => setCartOpen(true)} className="relative p-1 text-foreground/80 hover:text-foreground">
            <ShoppingBag className="h-[18px] w-[18px]" />
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-amethyst px-1 text-[0.6rem] font-semibold text-primary-foreground">{count}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
