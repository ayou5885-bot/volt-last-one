import { useEffect, useState, type FormEvent } from 'react';
import { Loader2, Plus, Pencil, Trash2, X, ImagePlus } from 'lucide-react';
import { supabase, uploadImage } from '@/lib/supabase';
import { slugify } from '@/lib/format';
import type { Category } from '@/types/product';

const emptyForm = { name: '', slug: '', description: '', image: '' };

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('categories').select('*').order('name');
    setCategories((data as Category[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openNew = () => {
    setForm(emptyForm);
    setEditingId(null);
    setImageFile(null);
    setImagePreview('');
    setError('');
    setShowForm(true);
  };

  const openEdit = (cat: Category) => {
    setForm({ name: cat.name, slug: cat.slug, description: cat.description, image: cat.image });
    setEditingId(cat.id);
    setImageFile(null);
    setImagePreview(cat.image);
    setError('');
    setShowForm(true);
  };

  const handleImageChange = (file: File | null) => {
    setImageFile(file);
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleNameChange = (name: string) => {
    setForm((prev) => ({
      ...prev,
      name,
      slug: editingId ? prev.slug : slugify(name),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim() || !form.slug.trim()) {
      setError('Name and slug are required.');
      return;
    }
    if (!imageFile && !form.image) {
      setError('Please choose a category image.');
      return;
    }

    setSaving(true);

    let imageUrl = form.image;
    if (imageFile) {
      setUploading(true);
      const { url, error: uploadError } = await uploadImage(imageFile, 'categories');
      setUploading(false);
      if (uploadError || !url) {
        setError(uploadError || 'Image upload failed.');
        setSaving(false);
        return;
      }
      imageUrl = url;
    }

    if (editingId) {
      const { error } = await supabase
        .from('categories')
        .update({ name: form.name, slug: form.slug, description: form.description, image: imageUrl })
        .eq('id', editingId);
      if (error) {
        setError(error.message);
        setSaving(false);
        return;
      }
    } else {
      const { error } = await supabase.from('categories').insert({
        id: form.slug,
        name: form.name,
        slug: form.slug,
        description: form.description,
        image: imageUrl,
      });
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
    if (!confirm('Delete this category? Products using it will keep the old category value until you re-assign them.')) return;
    await supabase.from('categories').delete().eq('id', id);
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
          <h1 className="font-display text-2xl font-bold text-ink-900">Categories</h1>
          <p className="text-sm text-ink-500">{categories.length} categories</p>
        </div>
        <button onClick={openNew} className="btn-primary !py-2.5">
          <Plus className="h-4 w-4" />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="card-surface overflow-hidden">
            <div className="aspect-[3/1] bg-ink-100">
              {cat.image && <img src={cat.image} alt={cat.name} className="h-full w-full object-cover" />}
            </div>
            <div className="p-4">
              <p className="font-semibold text-sm text-ink-900">{cat.name}</p>
              <p className="text-xs text-ink-500 mt-0.5 line-clamp-1">{cat.description}</p>
              <div className="flex items-center gap-2 mt-3">
                <button onClick={() => openEdit(cat)} className="btn-outline !py-1.5 !px-3 !text-xs flex-1">
                  <Pencil className="h-3 w-3" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="p-1.5 rounded-lg text-ink-400 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/40 p-4"
          onClick={() => setShowForm(false)}
        >
          <div className="card-surface w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-bold text-ink-900">
                {editingId ? 'Edit Category' : 'Add Category'}
              </h2>
              <button onClick={() => setShowForm(false)} className="p-1 text-ink-400 hover:text-ink-900">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label-text">Name</label>
                <input value={form.name} onChange={(e) => handleNameChange(e.target.value)} className="input-field" required />
              </div>
              <div>
                <label className="label-text">Slug</label>
                <input value={form.slug} onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))} className="input-field" required />
              </div>
              <div>
                <label className="label-text">Description</label>
                <input value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} className="input-field" />
              </div>
              <div>
                <label className="label-text">Category Image</label>
                <div className="flex items-center gap-3">
                  <div className="h-16 w-24 shrink-0 rounded-lg bg-ink-100 overflow-hidden flex items-center justify-center">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                    ) : (
                      <ImagePlus className="h-5 w-5 text-ink-300" />
                    )}
                  </div>
                  <label className="btn-outline !py-2 !px-3 !text-xs cursor-pointer">
                    {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ImagePlus className="h-3.5 w-3.5" />}
                    {imagePreview ? 'Change Image' : 'Choose Image'}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)}
                    />
                  </label>
                </div>
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button type="submit" disabled={saving || uploading} className="btn-primary w-full !py-3 disabled:opacity-60">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : editingId ? 'Save Changes' : 'Add Category'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
