// Service interface for the future self-hosted backend (PostgreSQL on a private VPS).
// The prototype uses the browser-only DemoStore (src/lib/store.tsx). Implement this
// interface with fetch calls later and swap it in without touching UI components.
import type { InventoryMovement, Order, Product, ShopSettings } from "@/lib/types";

export interface ShopApi {
  listProducts(): Promise<Product[]>;
  getProduct(slug: string): Promise<Product | null>;
  createProduct(input: Omit<Product, "id" | "createdAt">): Promise<Product>;
  updateProduct(id: string, patch: Partial<Product>): Promise<Product>;
  deleteProduct(id: string): Promise<void>;
  adjustStock(productId: string, delta: number, note: string): Promise<InventoryMovement>;
  receiveGoods(productId: string, quantity: number): Promise<InventoryMovement>;
  listMovements(): Promise<InventoryMovement[]>;
  listOrders(): Promise<Order[]>;
  getSettings(): Promise<ShopSettings>;
  updateSettings(patch: Partial<ShopSettings>): Promise<ShopSettings>;
}

export const API_BASE_URL = import.meta.env["VITE_API_BASE_URL"] ?? "";
