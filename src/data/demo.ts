// DEMO DATA — all products, prices, stock and orders are fictional examples.
// Replace with responses from the self-hosted backend (see src/services/api.ts).
import hero from "@/assets/hero-amethyst.jpg";
import rosenquarz from "@/assets/rosenquarz.jpg";
import bergkristall from "@/assets/bergkristall.jpg";
import achat from "@/assets/achat.jpg";
import armband from "@/assets/armband.jpg";
import dekoration from "@/assets/dekoration.jpg";
import skiwachs from "@/assets/skiwachs.jpg";
import winter from "@/assets/winter.jpg";
import type { Category, InventoryMovement, Order, Product, ShopSettings } from "@/lib/types";

export const images = { hero, rosenquarz, bergkristall, achat, armband, dekoration, skiwachs, winter };

export const categories: Category[] = [
  { id: "mineralien", name: "Mineralien & Kristalle", navLabel: "Mineralien", description: "Drusen, Stufen und Kristalle mit eindrucksvoller Struktur.", image: hero },
  { id: "edelsteine", name: "Edelsteine", navLabel: "Edelsteine", description: "Rohsteine und polierte Scheiben in natürlicher Farbtiefe.", image: achat },
  { id: "schmuck", name: "Schmuck", navLabel: "Schmuck", description: "Schlichte Stücke mit natürlichen Steinen.", image: armband },
  { id: "wohnen", name: "Wohnen & Dekoration", navLabel: "Wohnen & Geschenke", description: "Mineralien als ruhige Akzente im Raum.", image: dekoration },
  { id: "ski-outdoor", name: "Ski & Outdoor", navLabel: "Ski & Outdoor", description: "Ausgewählte Begleiter für den Winter in den Bergen.", image: skiwachs },
];

const base = { tags: [] as string[], status: "veroeffentlicht" as const, createdAt: "2026-10-01" };

export const demoProducts: Product[] = [
  { ...base, id: "p1", slug: "amethyst-druse", name: "Amethyst-Druse", category: "mineralien", price: 489, stock: 1, incoming: 0, availability: "auf-lager", unique: true, images: [hero, dekoration], shortDescription: "Tiefviolette Kristallhöhle, Einzelstück.", description: "Eine eindrucksvolle Druse mit dicht gewachsenen, tiefvioletten Kristallen und naturbelassener Außenschale. Jedes Exemplar ist ein Einzelstück — Form, Farbe und Größe variieren.", mineral: "Amethyst (Quarz)", color: "Violett", weight: "ca. 4,2 kg", dimensions: "ca. 24 × 18 × 15 cm", sku: "MS-AME-001", tags: ["einzelstück", "druse"] },
  { ...base, id: "p2", slug: "rosenquarz", name: "Rosenquarz", category: "edelsteine", price: 64, stock: 0, incoming: 12, availability: "in-anlieferung", unique: false, images: [rosenquarz], shortDescription: "Zartrosa Rohstein mit seidigem Schimmer.", description: "Naturbelassener Rosenquarz in sanftem Rosa. Ideal als ruhiger Akzent auf Regal, Schreibtisch oder Fensterbank.", mineral: "Rosenquarz", color: "Rosa", weight: "ca. 600 g", dimensions: "ca. 10 × 8 × 6 cm", sku: "MS-ROS-010" },
  { ...base, id: "p3", slug: "bergkristall", name: "Bergkristall", category: "mineralien", price: 148, stock: 4, incoming: 6, availability: "auf-lager", unique: false, images: [bergkristall], shortDescription: "Klare Kristallgruppe mit scharfen Spitzen.", description: "Eine Gruppe klarer Quarzkristalle mit ausgeprägten Spitzen. Kleine natürliche Einschlüsse unterstreichen den Charakter.", mineral: "Bergkristall (Quarz)", color: "Klar", weight: "ca. 850 g", dimensions: "ca. 13 × 10 × 9 cm", sku: "MS-BER-004" },
  { ...base, id: "p4", slug: "achat-scheibe", name: "Achat-Scheibe", category: "edelsteine", price: 39, stock: 9, incoming: 0, availability: "auf-lager", unique: false, images: [achat], shortDescription: "Polierte Scheibe mit feiner Bänderung.", description: "Eine polierte Achat-Scheibe mit konzentrischen Bändern in Blau-, Grau- und Bernsteintönen. Wirkt besonders schön im Gegenlicht.", mineral: "Achat", color: "Blau", weight: "ca. 180 g", dimensions: "ca. 11 × 8 × 0,6 cm", sku: "MS-ACH-022" },
  { ...base, id: "p5", slug: "naturstein-armband", name: "Naturstein-Armband", category: "schmuck", price: 58, stock: 2, incoming: 20, availability: "auf-lager", unique: false, images: [armband], shortDescription: "Amethyst und Bergkristall mit Messingakzent.", description: "Elastisches Armband aus Amethyst- und Bergkristallperlen mit einem fein strukturierten Zwischenelement in Messingoptik.", mineral: "Amethyst, Bergkristall", color: "Violett", weight: "ca. 25 g", dimensions: "Perlen 8 mm, Umfang ca. 18 cm", sku: "MS-SCH-101" },
  { ...base, id: "p6", slug: "mineralische-dekoration", name: "Mineralische Dekoration", category: "wohnen", price: 129, stock: 3, incoming: 0, availability: "auf-lager", unique: false, images: [dekoration], shortDescription: "Kuratiertes Set aus drei Mineralstufen.", description: "Ein abgestimmtes Ensemble aus Calcit, Coelestin und einer kleinen Amethyststufe — für Sideboard oder Bücherregal.", mineral: "Calcit, Coelestin, Amethyst", color: "Natur", weight: "ca. 1,6 kg", dimensions: "verschieden", sku: "MS-WOH-030" },
  { ...base, id: "p7", slug: "skiwachs-set", name: "Skiwachs-Set", category: "ski-outdoor", price: 49, stock: 14, incoming: 0, availability: "auf-lager", unique: false, images: [skiwachs], shortDescription: "Vier Wachse, Bürste und Abziehklinge.", description: "Kompaktes Pflegeset für die Saison: vier Temperaturwachse, Rosshaarbürste und Abziehklinge in einer Aufbewahrungsbox.", color: "Mehrfarbig", weight: "ca. 700 g", dimensions: "ca. 25 × 18 × 8 cm", sku: "MS-SKI-200" },
  { ...base, id: "p8", slug: "winteraccessoires", name: "Winteraccessoires", category: "ski-outdoor", price: 119, stock: 0, incoming: 0, availability: "nicht-verfuegbar", unique: false, images: [winter], shortDescription: "Mütze, Schal und Lederhandschuhe.", description: "Ein warmes Set aus gerippter Strickmütze, kariertem Wollschal und gefütterten Lederhandschuhen.", color: "Grün", weight: "ca. 450 g", dimensions: "Einheitsgröße", sku: "MS-SKI-210" },
];

export const demoOrders: Order[] = [
  { id: "DEMO-1042", customer: "Beispielkunde A", city: "Innsbruck", date: "2026-11-05", total: 547, items: 2, status: "offen" },
  { id: "DEMO-1041", customer: "Beispielkunde B", city: "Salzburg", date: "2026-11-03", total: 64, items: 1, status: "in-bearbeitung" },
  { id: "DEMO-1040", customer: "Beispielkunde C", city: "Wien", date: "2026-10-29", total: 177, items: 3, status: "versendet" },
  { id: "DEMO-1039", customer: "Beispielkunde D", city: "Kitzbühel", date: "2026-10-27", total: 49, items: 1, status: "storniert" },
];

export const demoMovements: InventoryMovement[] = [
  { id: "m1", productId: "p3", type: "wareneingang", delta: 4, note: "Erste Teillieferung", date: "2026-10-20" },
  { id: "m2", productId: "p7", type: "korrektur", delta: -1, note: "Inventurdifferenz", date: "2026-10-22" },
];

export const defaultSettings: ShopSettings = {
  shopName: "Mader Steinwelt",
  owner: "[Inhaber / Firmenname bestätigen]",
  street: "[Straße und Hausnummer]",
  zip: "6384",
  city: "Waidring",
  country: "Österreich",
  email: "[E-Mail-Adresse]",
  phone: "[Telefonnummer]",
  uid: "[UID-Nummer]",
  shippingAustria: 6.9,
  freeShippingFrom: 120,
  shippingEU: 14.9,
};
