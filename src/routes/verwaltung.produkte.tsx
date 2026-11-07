import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Copy, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminPage, btn, btnGhost, field } from "@/components/admin/ui";
import { AvailabilityBadge, categoryName } from "@/components/store/ProductCard";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { categories } from "@/data/demo";
import { formatPrice, slugify, statusLabel } from "@/lib/format";
import { useStore } from "@/lib/store";
import type { CategoryId, Product } from "@/lib/types";

export const Route = createFileRoute("/verwaltung/produkte")({
  validateSearch: (s: Record<string, unknown>): { neu?: boolean | undefined } => ({ neu: s["neu"] === true || s["neu"] === "true" ? true : undefined }),
  component: Products,
});

const empty = (): Product => ({ id: crypto.randomUUID(), slug: "", name: "", category: "mineralien", price: 0, stock: 1, incoming: 0, availability: "auf-lager", unique: false, images: [], shortDescription: "", description: "", sku: "", tags: [], status: "veroeffentlicht", createdAt: new Date().toISOString() });

function Products() {
  const { products, saveProduct, deleteProducts } = useStore();
  const { neu } = Route.useSearch();
  const [q, setQ] = useState("");
  const [sel, setSel] = useState<string[]>([]);
  const [edit, setEdit] = useState<Product | null>(null);
  useEffect(() => { if (neu) setEdit(empty()); }, [neu]);
  const list = products.filter((p) => (p.name + p.sku).toLowerCase().includes(q.toLowerCase()));
  const toggle = (id: string) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  return (
    <AdminPage title="Produkte" text={`${products.length} Produkte`} action={<button className={btn} onClick={() => setEdit(empty())}>+ Neues Produkt</button>}>
      <div className="flex flex-wrap gap-3">
        <input aria-label="Produkte suchen" placeholder="Name oder SKU suchen…" value={q} onChange={(e) => setQ(e.target.value)} className={`${field} max-w-xs`} />
        {sel.length > 0 && <>
          <button className={btnGhost} onClick={() => { sel.forEach((id) => { const p = products.find((x) => x.id === id); if (p) saveProduct({ ...p, status: "entwurf" }); }); toast.success("Als Entwurf archiviert"); setSel([]); }}>Archivieren ({sel.length})</button>
          <button className={btnGhost} onClick={() => { deleteProducts(sel); toast.success("Gelöscht"); setSel([]); }}><Trash2 className="h-4 w-4" />Löschen</button>
        </>}
      </div>
      <div className="overflow-x-auto border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border text-left text-xs text-muted-foreground"><tr>
            <th className="p-3"><input type="checkbox" aria-label="Alle auswählen" checked={sel.length === list.length && list.length > 0} onChange={(e) => setSel(e.target.checked ? list.map((p) => p.id) : [])} /></th>
            <th className="p-3">Produkt</th><th className="p-3">Kategorie</th><th className="p-3">Preis</th><th className="p-3">Bestand</th><th className="p-3">Verfügbarkeit</th><th className="p-3">Veröffentlicht</th><th className="p-3" />
          </tr></thead>
          <tbody className="divide-y divide-border">{list.map((p) => (
            <tr key={p.id} className="hover:bg-accent/50">
              <td className="p-3"><input type="checkbox" aria-label={`${p.name} auswählen`} checked={sel.includes(p.id)} onChange={() => toggle(p.id)} /></td>
              <td className="p-3"><div className="flex items-center gap-3">{p.images[0] ? <img src={p.images[0]} alt="" className="h-10 w-10 object-cover" /> : <div className="h-10 w-10 bg-stone" />}<div><p className="font-medium">{p.name}</p><p className="text-xs text-muted-foreground">{p.sku}</p></div></div></td>
              <td className="p-3">{categoryName(p.category)}</td><td className="p-3 tabular-nums">{formatPrice(p.price)}</td><td className="p-3">{p.stock}</td>
              <td className="p-3"><AvailabilityBadge value={p.availability} /></td>
              <td className="p-3"><Switch aria-label="Veröffentlichen" checked={p.status === "veroeffentlicht"} onCheckedChange={(v) => { saveProduct({ ...p, status: v ? "veroeffentlicht" : "entwurf" }); toast.success(v ? "Veröffentlicht" : "Als Entwurf gespeichert"); }} /></td>
              <td className="p-3"><div className="flex gap-1">
                <button aria-label="Bearbeiten" className="p-2 hover:bg-accent" onClick={() => setEdit(p)}><Pencil className="h-4 w-4" /></button>
                <button aria-label="Duplizieren" className="p-2 hover:bg-accent" onClick={() => { saveProduct({ ...p, id: crypto.randomUUID(), name: `${p.name} (Kopie)`, slug: `${p.slug}-kopie-${Date.now() % 1000}`, sku: `${p.sku}-K`, status: "entwurf" }); toast.success("Dupliziert als Entwurf"); }}><Copy className="h-4 w-4" /></button>
              </div></td>
            </tr>))}</tbody>
        </table>
        {list.length === 0 && <p className="p-10 text-center text-muted-foreground">Keine Produkte gefunden.</p>}
      </div>
      <ProductForm product={edit} onClose={() => setEdit(null)} />
    </AdminPage>
  );
}

function ProductForm({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { saveProduct, products } = useStore();
  const [p, setP] = useState<Product | null>(product);
  const [adv, setAdv] = useState(false);
  useEffect(() => setP(product), [product]);
  const isNew = product ? !products.some((x) => x.id === product.id) : true;
  const set = <K extends keyof Product>(k: K, v: Product[K]) => setP((s) => (s ? { ...s, [k]: v } : s));
  const avail = p ? (p.stock > 0 ? "auf-lager" : p.incoming > 0 ? "in-anlieferung" : "nicht-verfuegbar") : "auf-lager";
  return (
    <Sheet open={!!product} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full overflow-y-auto bg-background sm:max-w-lg">
        <SheetTitle className="font-display text-3xl font-medium">{isNew ? "Neues Produkt" : "Produkt bearbeiten"}</SheetTitle>
        {p && <form className="mt-6 space-y-4" onSubmit={(e) => {
          e.preventDefault();
          if (!p.name.trim()) { toast.error("Bitte einen Produktnamen eingeben."); return; }
          if (p.price <= 0) { toast.error("Bitte einen gültigen Verkaufspreis eingeben."); return; }
          saveProduct({ ...p, slug: p.slug || slugify(p.name), sku: p.sku || `MS-${slugify(p.name).slice(0, 3).toUpperCase()}-${Date.now() % 1000}`, shortDescription: p.shortDescription || p.description.slice(0, 60) });
          toast.success(isNew ? "Produkt angelegt — im Katalog sichtbar" : "Änderungen gespeichert"); onClose();
        }}>
          <label className="block text-xs font-medium">Produktname *<input autoFocus className={`${field} mt-1`} value={p.name} onChange={(e) => set("name", e.target.value)} /></label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-xs font-medium">Kategorie<select className={`${field} mt-1`} value={p.category} onChange={(e) => set("category", e.target.value as CategoryId)}>{categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
            <label className="block text-xs font-medium">Verkaufspreis (€) *<input type="number" min="0" step="0.01" className={`${field} mt-1`} value={p.price || ""} onChange={(e) => set("price", Number(e.target.value))} /></label>
            <label className="block text-xs font-medium">Menge auf Lager<input type="number" min="0" className={`${field} mt-1`} value={p.stock} onChange={(e) => set("stock", Number(e.target.value))} /></label>
            <label className="block text-xs font-medium">In Anlieferung<input type="number" min="0" className={`${field} mt-1`} value={p.incoming} onChange={(e) => set("incoming", Number(e.target.value))} /></label>
          </div>
          <p className="text-xs">Verfügbarkeit (automatisch): <AvailabilityBadge value={avail} /></p>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={p.unique} onChange={(e) => set("unique", e.target.checked)} />Einzelstück</label>
          <div>
            <p className="text-xs font-medium">Produktbilder</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {p.images.map((src, i) => <div key={i} className="relative"><img src={src} alt="" className="h-20 w-20 object-cover" /><button type="button" aria-label="Bild entfernen" onClick={() => set("images", p.images.filter((_, j) => j !== i))} className="absolute right-0 top-0 bg-background px-1 text-xs">✕</button></div>)}
              <label className="flex h-20 w-20 cursor-pointer items-center justify-center border border-dashed border-input text-xs text-muted-foreground">+ Bild<input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => {
                Array.from(e.target.files ?? []).forEach((f) => { const r = new FileReader(); r.onload = () => setP((s) => (s ? { ...s, images: [...s.images, String(r.result)] } : s)); r.readAsDataURL(f); });
              }} /></label>
            </div>
          </div>
          <div className="flex items-center justify-between border-y border-border py-3 text-sm">Veröffentlicht<Switch checked={p.status === "veroeffentlicht"} onCheckedChange={(v) => set("status", v ? "veroeffentlicht" : "entwurf")} /></div>
          <button type="button" onClick={() => setAdv(!adv)} className="flex w-full items-center justify-between text-sm font-medium">Erweiterte Angaben <ChevronDown className={`h-4 w-4 transition ${adv ? "rotate-180" : ""}`} /></button>
          {adv && <div className="space-y-3">
            <label className="block text-xs font-medium">Beschreibung<textarea rows={4} className={`${field} mt-1`} value={p.description} onChange={(e) => set("description", e.target.value)} /></label>
            {([["mineral", "Material / Mineralart"], ["color", "Farbe"], ["weight", "Gewicht"], ["dimensions", "Maße"], ["sku", "SKU"]] as const).map(([k, l]) => <label key={k} className="block text-xs font-medium">{l}<input className={`${field} mt-1`} value={p[k] ?? ""} onChange={(e) => set(k, e.target.value)} /></label>)}
            <label className="block text-xs font-medium">Tags (kommagetrennt)<input className={`${field} mt-1`} value={p.tags.join(", ")} onChange={(e) => set("tags", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))} /></label>
          </div>}
          <div className="flex gap-2 pt-2"><button className={btn}>Speichern</button><button type="button" className={btnGhost} onClick={onClose}>Abbrechen</button></div>
          <p className="text-xs text-muted-foreground">Status: {statusLabel[p.status]} · Demo — nur in diesem Browser gespeichert.</p>
        </form>}
      </SheetContent>
    </Sheet>
  );
}
