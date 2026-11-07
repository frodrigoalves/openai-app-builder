// Shared domain types. These mirror the future backend API contracts (see src/services/api.ts).

export type CategoryId = "mineralien" | "edelsteine" | "schmuck" | "wohnen" | "ski-outdoor";

export interface Category {
  id: CategoryId;
  name: string;
  navLabel: string;
  description: string;
  image: string;
}

export type Availability = "auf-lager" | "in-anlieferung" | "nicht-verfuegbar";
export type PublishStatus = "veroeffentlicht" | "entwurf";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategoryId;
  price: number;
  stock: number;
  incoming: number;
  availability: Availability;
  unique: boolean;
  images: string[];
  shortDescription: string;
  description: string;
  mineral?: string;
  color?: string;
  weight?: string;
  dimensions?: string;
  sku: string;
  tags: string[];
  status: PublishStatus;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export type MovementType = "wareneingang" | "korrektur" | "verkauf";

export interface InventoryMovement {
  id: string;
  productId: string;
  type: MovementType;
  delta: number;
  note: string;
  date: string;
}

export type OrderStatus = "offen" | "in-bearbeitung" | "versendet" | "storniert";

export interface Order {
  id: string;
  customer: string;
  city: string;
  date: string;
  total: number;
  items: number;
  status: OrderStatus;
}

export interface ShopSettings {
  shopName: string;
  owner: string;
  street: string;
  zip: string;
  city: string;
  country: string;
  email: string;
  phone: string;
  uid: string;
  shippingAustria: number;
  freeShippingFrom: number;
  shippingEU: number;
}
