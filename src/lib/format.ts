import type { Availability, PublishStatus } from "./types";

const eur = new Intl.NumberFormat("de-AT", { style: "currency", currency: "EUR" });
const date = new Intl.DateTimeFormat("de-AT", { day: "2-digit", month: "2-digit", year: "numeric" });

export const formatPrice = (value: number) => eur.format(value);
export const formatDate = (iso: string) => date.format(new Date(iso));

export const availabilityLabel: Record<Availability, string> = {
  "auf-lager": "Auf Lager",
  "in-anlieferung": "In Anlieferung",
  "nicht-verfuegbar": "Nicht verfügbar",
};

export const statusLabel: Record<PublishStatus, string> = {
  veroeffentlicht: "Veröffentlicht",
  entwurf: "Entwurf",
};

export function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Derives availability from stock numbers. */
export function deriveAvailability(stock: number, incoming: number): Availability {
  if (stock > 0) return "auf-lager";
  if (incoming > 0) return "in-anlieferung";
  return "nicht-verfuegbar";
}

export const LOW_STOCK_THRESHOLD = 3;
