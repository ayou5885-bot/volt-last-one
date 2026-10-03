import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Category } from '@/types/product';

interface UseCategoriesResult {
  categories: Category[];
  loading: boolean;
}

export function useCategories(): UseCategoriesResult {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (!error && data) setCategories(data as Category[]);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { categories, loading };
}
