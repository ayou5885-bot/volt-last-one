import { createClient } from '@supabase/supabase-js';
import type { Product } from '@/types/product';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface DbProduct {
  id: string;
  brand: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  image: string;
  short_description: string;
  description: string;
  specifications: { label: string; value: string }[];
  features: string[];
  availability: 'in-stock' | 'low-stock' | 'out-of-stock';
  featured: boolean;
  created_at: string;
}

// Uploads an image to the public "store-images" bucket under products/ or
// categories/, and returns its public URL. Used by the admin product and
// category forms instead of asking for a hosted image URL.
export async function uploadImage(
  file: File,
  folder: 'products' | 'categories'
): Promise<{ url: string | null; error: string | null }> {
  const ext = file.name.split('.').pop() || 'jpg';
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('store-images')
    .upload(path, file, { cacheControl: '3600', upsert: false });

  if (uploadError) {
    return { url: null, error: uploadError.message };
  }

  const { data } = supabase.storage.from('store-images').getPublicUrl(path);
  return { url: data.publicUrl, error: null };
}

export function mapDbProductToProduct(row: DbProduct): Product {
  return {
    id: row.id,
    brand: row.brand,
    name: row.name,
    slug: row.slug,
    category: row.category,
    price: Number(row.price),
    image: row.image,
    shortDescription: row.short_description,
    description: row.description,
    specifications: row.specifications ?? [],
    features: row.features ?? [],
    availability: row.availability,
    featured: row.featured,
  };
}
