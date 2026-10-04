import { useEffect, useState } from 'react';
import type { Product } from '@/types/product';
import { supabase, mapDbProductToProduct } from '@/lib/supabase';

interface UseProductResult {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

export function useProduct(slug: string | undefined): UseProductResult {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setProduct(null);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchProduct() {
      setLoading(true);
      setError(null);

      const { data, error: dbError } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (cancelled) return;

      if (dbError) {
        setError(dbError.message);
        setProduct(null);
      } else if (data) {
        setProduct(mapDbProductToProduct(data));
      } else {
        setProduct(null);
      }

      setLoading(false);
    }

    fetchProduct();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { product, loading, error };
}
