import { Link } from "@tanstack/react-router";
import { Eye, Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { categories } from "@/data/demo";
import { availabilityLabel, formatPrice } from "@/lib/format";
import { useStore } from "@/lib/store";
import type { Availability, Product } from "@/lib/types";
import { cn } from "@/lib/utils";

export function AvailabilityBadge({ value, className }: { value: Availability; className?: string }) {
  const tone = {
    "auf-lager": "bg-success/12 text-success",
    "in-anlieferung": "bg-brass/15 text-brass",
    "nicht-verfuegbar": "bg-muted text-muted-foreground",
  }[value];
  return <span className={cn("inline-flex items-center gap-1.5 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em]", tone, className)}><span className="h-1.5 w-1.5 rounded-full bg-current" />{availabilityLabel[value]}</span>;
}

export const categoryName = (id: string) => categories.find((c) => c.id === id)?.name ?? id;

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { favorites, toggleFavorite, addToCart, setCartOpen } = useStore();
  const [quick, setQuick] = useState(false);
  const fav = favorites.includes(product.id);
  const canBuy = product.stock > 0;

  return (
    <article className="group rise" style={{ animationDelay: `${index * 60}ms` }}>
      <div className="relative aspect-[4/5] overflow-hidden bg-stone">
        <Link to="/produkte/$slug" params={{ slug: product.slug }} aria-label={product.name}>
          <img src={product.images[0]} alt={product.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]" />
        </Link>
        <div className="absolute left-3 top-3"><AvailabilityBadge value={product.availability} className="bg-background/90" /></div>
        <button
          aria-label={fav ? "Von Favoriten entfernen" : "Zu Favoriten hinzufügen"}
          onClick={() => toggleFavorite(product.id)}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 transition hover:bg-background"
        >
          <Heart className={cn("h-4 w-4", fav && "fill-amethyst text-amethyst")} />
        </button>
        <div className="absolute inset-x-3 bottom-3 flex translate-y-3 gap-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <button onClick={() => setQuick(true)} className="flex flex-1 items-center justify-center gap-2 bg-background/95 py-2.5 text-xs tracking-wide hover:bg-background">
            <Eye className="h-3.5 w-3.5" /> Schnellansicht
          </button>
          <Link to="/produkte/$slug" params={{ slug: product.slug }} className="flex flex-1 items-center justify-center bg-primary py-2.5 text-xs tracking-wide text-primary-foreground hover:bg-ink">
            Details
          </Link>
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow text-[0.6rem] text-muted-foreground">{categoryName(product.category)}</p>
          <h3 className="mt-1 font-display text-xl leading-tight">
            <Link to="/produkte/$slug" params={{ slug: product.slug }}>{product.name}</Link>
          </h3>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium tabular-nums">{formatPrice(product.price)}</p>
          <p className="text-[0.6rem] uppercase tracking-wider text-muted-foreground">Demo-Preis</p>
        </div>
      </div>

      <Dialog open={quick} onOpenChange={setQuick}>
        <DialogContent className="max-w-3xl gap-0 overflow-hidden rounded-none p-0 sm:rounded-none">
          <div className="grid md:grid-cols-2">
            <img src={product.images[0]} alt={product.name} className="aspect-[4/5] h-full w-full object-cover" />
            <div className="flex flex-col gap-4 p-8">
              <p className="eyebrow text-brass">{categoryName(product.category)}</p>
              <DialogTitle className="font-display text-3xl font-medium">{product.name}</DialogTitle>
              <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
              <AvailabilityBadge value={product.availability} className="self-start" />
              <p className="text-xl tabular-nums">{formatPrice(product.price)} <span className="text-xs text-muted-foreground">Demo-Preis</span></p>
              <div className="mt-auto flex flex-col gap-2">
                <button
                  disabled={!canBuy}
                  onClick={() => { addToCart(product.id); setQuick(false); setCartOpen(true); toast.success(`${product.name} im Warenkorb`); }}
                  className="bg-primary py-3 text-sm text-primary-foreground transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {canBuy ? "In den Warenkorb" : availabilityLabel[product.availability]}
                </button>
                <Link to="/produkte/$slug" params={{ slug: product.slug }} className="py-2 text-center text-sm underline underline-offset-4">Alle Details ansehen</Link>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div>
      <div className="aspect-[4/5] animate-pulse bg-stone" />
      <div className="mt-4 h-3 w-1/3 animate-pulse bg-stone" />
      <div className="mt-2 h-5 w-2/3 animate-pulse bg-stone" />
    </div>
  );
}
