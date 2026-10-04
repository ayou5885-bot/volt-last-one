import { useEffect, useState } from 'react';
import type { Product } from '@/types/product';
import { supabase, mapDbProductToProduct } from '@/lib/supabase';

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      setLoading(true);
      setError(null);

      const { data, error: dbError } = await supabase.from('products').select('*');

      if (cancelled) return;

      if (dbError) {
        setError(dbError.message);
        setProducts([]);
      } else {
        setProducts((data ?? []).map(mapDbProductToProduct));
      }

      setLoading(false);
    }

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  return { products, loading, error };
}
