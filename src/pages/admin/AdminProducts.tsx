import { useEffect, useState, type FormEvent } from 'react';
import { Loader2, Plus, Pencil, Trash2, X } from 'lucide-react';
import { supabase, mapDbProductToProduct, type DbProduct } from '@/lib/supabase';
import { useCategories } from '@/hooks/useCategories';
import { formatPrice, slugify } from '@/lib/format';
import type { Product } from '@/types/product';

interface FormState {
  brand: string;
  name: string;
  slug: string;
  category: string;
  price: string;
  image: string;
  shortDescription: string;
  description: string;
  specificationsText: string;
  featuresText: string;
  availability: 'in-stock' | 'low-stock' | 'out-of-stock';
  featured: boolean;
}

const emptyForm: FormState = {
  brand: '',
  name: '',
  slug: '',
  category: '',
  price: '',
  image: '',
  shortDescription: '',
  description: '',
  specificationsText: '',
  featuresText: '',
  availability: 'in-stock',
  featured: false,
};

function productToForm(p: Product): FormState {
  return {
    brand: p.brand,
    name: p.name,
    slug: p.slug,
    category: p.category,
    price: String(p.price),
    image: p.image,
    shortDescription: p.shortDescription,
    description: p.description,
    specificationsText: p.specifications.map((s) => `${s.label}: ${s.value}`).join('\n'),
    featuresText: p.features.join('\n'),
    availability: p.availability,
    featured: p.featured,
  };
}

function parseSpecifications(text: string) {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const idx = line.indexOf(':');
      if (idx === -1) return { label: line, value: '' };
      return { label: line.slice(0, idx).trim(), value: line.slice(idx + 1).trim() };
    });
}

function parseFeatures(text: string) {
  return text.split('\n').map((l) => l.trim()).filter(Boolean);
}

export default function AdminProducts() {
  const { categories } = useCategories();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    setProducts(((data as DbProduct[]) ?? []).map(mapDbProductToProduct));
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openNew = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError('');
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setForm(productToForm(p));
    setEditingId(p.id);
    setError('');
    setShowForm(true);
  };

  const handleNameChange = (name: string) => {
    setForm((prev) => ({ ...prev, name, slug: editingId ? prev.slug : slugify(name) }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const price = Number(form.price);
    if (!form.name.trim() || !form.brand.trim() || !form.category || !form.slug.trim() || !price) {
      setError('Name, brand, category, slug and a valid price are required.');
      return;
    }

    setSaving(true);

    const payload = {
      brand: form.brand,
      name: form.name,
      slug: form.slug,
      category: form.category,
      price,
      image: form.image,
      short_description: form.shortDescription,
      description: form.description,
      specifications: parseSpecifications(form.specificationsText),
      features: parseFeatures(form.featuresText),
      availability: form.availability,
      featured: form.featured,
    };

    if (editingId) {
      const { error } = await supabase.from('products').update(payload).eq('id', editingId);
      if (error) {
        setError(error.message);
        setSaving(false);
        return;
      }
    } else {
      const { error } = await supabase.from('products').insert({ id: form.slug, ...payload });
      if (error) {
        setError(error.message);
        setSaving(false);
        return;
      }
    }

    setSaving(false);
    setShowForm(false);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product permanently?')) return;
    await supabase.from('products').delete().eq('id', id);
    load();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-ink-400" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink-900">Products</h1>
          <p className="text-sm text-ink-500">{products.length} products</p>
        </div>
        <button onClick={openNew} className="btn-primary !py-2.5">
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      <div className="card-surface overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-100 text-left">
              <th className="px-4 py-3 text-xs font-semibold uppercase text-ink-400">Product</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase text-ink-400">Category</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase text-ink-400">Price</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase text-ink-400">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg object-cover bg-ink-100 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium text-ink-900 truncate max-w-[220px]">{p.name}</p>
                      <p className="text-xs text-ink-400">{p.brand}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-ink-600 whitespace-nowrap">{p.category}</td>
                <td className="px-4 py-3 font-semibold text-ink-900 whitespace-nowrap">{formatPrice(p.price)}</td>
                <td className="px-4 py-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-ink-100 text-ink-600 capitalize whitespace-nowrap">
                    {p.availability.replace('-', ' ')}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg text-ink-500 hover:text-ink-900 hover:bg-ink-100">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-1.5 rounded-lg text-ink-400 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-ink-950/40 p-4 overflow-y-auto"
          onClick={() => setShowForm(false)}
        >
          <div className="card-surface w-full max-w-lg p-6 my-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-bold text-ink-900">
                {editingId ? 'Edit Product' : 'Add Product'}
              </h2>
              <button onClick={() => setShowForm(false)} className="p-1 text-ink-400 hover:text-ink-900">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-text">Brand</label>
                  <input value={form.brand} onChange={(e) => setForm((p) => ({ ...p, brand: e.target.value }))} className="input-field" required />
                </div>
                <div>
                  <label className="label-text">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                    className="input-field"
                    required
                  >
                    <option value="">Select...</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="label-text">Name</label>
                <input value={form.name} onChange={(e) => handleNameChange(e.target.value)} className="input-field" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-text">Slug</label>
                  <input value={form.slug} onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))} className="input-field" required />
                </div>
                <div>
                  <label className="label-text">Price (DZD)</label>
                  <input
                    type="number"
                    min="0"
                    value={form.price}
                    onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
                    className="input-field"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="label-text">Image URL</label>
                <input value={form.image} onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))} className="input-field" />
              </div>
              <div>
                <label className="label-text">Short Description</label>
                <input
                  value={form.shortDescription}
                  onChange={(e) => setForm((p) => ({ ...p, shortDescription: e.target.value }))}
                  className="input-field"
                />
              </div>
              <div>
                <label className="label-text">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  rows={3}
                  className="input-field resize-none"
                />
              </div>
              <div>
                <label className="label-text">Features (one per line)</label>
                <textarea
                  value={form.featuresText}
                  onChange={(e) => setForm((p) => ({ ...p, featuresText: e.target.value }))}
                  rows={3}
                  className="input-field resize-none"
                  placeholder={'16GB RAM\n512GB SSD'}
                />
              </div>
              <div>
                <label className="label-text">Specifications (one per line, Label: Value)</label>
                <textarea
                  value={form.specificationsText}
                  onChange={(e) => setForm((p) => ({ ...p, specificationsText: e.target.value }))}
                  rows={4}
                  className="input-field resize-none"
                  placeholder={'Processor: Intel Core i7\nRAM: 16GB'}
                />
              </div>
              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <label className="label-text">Availability</label>
                  <select
                    value={form.availability}
                    onChange={(e) => setForm((p) => ({ ...p, availability: e.target.value as FormState['availability'] }))}
                    className="input-field"
                  >
                    <option value="in-stock">In Stock</option>
                    <option value="low-stock">Low Stock</option>
                    <option value="out-of-stock">Out of Stock</option>
                  </select>
                </div>
                <label className="flex items-center gap-2 text-sm text-ink-700 pt-5">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))}
                    className="h-4 w-4 rounded border-ink-300"
                  />
                  Featured
                </label>
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button type="submit" disabled={saving} className="btn-primary w-full !py-3 disabled:opacity-60">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : editingId ? 'Save Changes' : 'Add Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
