import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Brand } from '@/types/product';

interface UseBrandsResult {
  brands: Brand[];
  loading: boolean;
}

export function useBrands(): UseBrandsResult {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    supabase
      .from('brands')
      .select('*')
      .order('name', { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (!error && data) setBrands(data as Brand[]);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { brands, loading };
}
