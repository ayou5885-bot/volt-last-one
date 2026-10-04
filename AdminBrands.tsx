import { useEffect, useState, type FormEvent } from 'react';
import { Loader2, Plus, Pencil, Trash2, X, Tags } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { slugify } from '@/lib/format';
import type { Brand } from '@/types/product';

export default function AdminBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('brands').select('*').order('name');
    setBrands((data as Brand[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Brand name is required.');
      return;
    }

    setSaving(true);
    const { error } = await supabase.from('brands').insert({ id: slugify(name), name: name.trim() });
    setSaving(false);

    if (error) {
      setError(error.message);
      return;
    }

    setName('');
    setShowForm(false);
    load();
  };

  const startEdit = (brand: Brand) => {
    setEditingId(brand.id);
    setEditingName(brand.name);
  };

  const saveEdit = async (id: string) => {
    if (!editingName.trim()) return;
    await supabase.from('brands').update({ name: editingName.trim() }).eq('id', id);
    setEditingId(null);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this brand? Products using it will keep the old brand name.')) return;
    await supabase.from('brands').delete().eq('id', id);
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
          <h1 className="font-display text-2xl font-bold text-ink-900">Brands</h1>
          <p className="text-sm text-ink-500">{brands.length} brands</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary !py-2.5">
          <Plus className="h-4 w-4" />
          Add Brand
        </button>
      </div>

      {brands.length === 0 ? (
        <div className="card-surface p-12 text-center">
          <Tags className="h-10 w-10 text-ink-300 mx-auto mb-3" />
          <p className="text-sm text-ink-500">No brands yet.</p>
        </div>
      ) : (
        <div className="card-surface overflow-hidden">
          <ul className="divide-y divide-ink-50">
            {brands.map((brand) => (
              <li key={brand.id} className="flex items-center justify-between px-4 py-3 text-sm">
                {editingId === brand.id ? (
                  <input
                    autoFocus
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit(brand.id)}
                    onBlur={() => saveEdit(brand.id)}
                    className="input-field !py-1.5 max-w-xs"
                  />
                ) : (
                  <span className="font-medium text-ink-900">{brand.name}</span>
                )}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => (editingId === brand.id ? saveEdit(brand.id) : startEdit(brand))}
                    className="p-1.5 rounded-lg text-ink-500 hover:text-ink-900 hover:bg-ink-100"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(brand.id)}
                    className="p-1.5 rounded-lg text-ink-400 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/40 p-4"
          onClick={() => setShowForm(false)}
        >
          <div className="card-surface w-full max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-bold text-ink-900">Add Brand</h2>
              <button onClick={() => setShowForm(false)} className="p-1 text-ink-400 hover:text-ink-900">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="label-text">Brand Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="input-field" required />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button type="submit" disabled={saving} className="btn-primary w-full !py-3 disabled:opacity-60">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Add Brand'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
