import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '@/data/products';
import ProductGrid from '@/components/ProductGrid';
import FilterBar, { type FilterState } from '@/components/FilterBar';
import type { SortOption } from '@/types/product';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  // يُحسب تلقائيًا من أعلى سعر موجود فعليًا في المنتجات (بالدينار)
  const MAX_PRICE = useMemo(() => {
    if (products.length === 0) return 0;
    const highest = Math.max(...products.map((p) => p.price));
    return Math.ceil(highest / 1000) * 1000; // تقريب لأقرب 1000 لشكل أنظف للسلايدر
  }, []);

  const defaultFilters: FilterState = {
    category: 'all',
    brand: 'all',
    availability: 'all',
    priceMax: MAX_PRICE,
    sort: 'featured',
    search: '',
  };

  const [filters, setFilters] = useState<FilterState>(() => ({
    ...defaultFilters,
    category: searchParams.get('category') || 'all',
    brand: searchParams.get('brand') || 'all',
    search: searchParams.get('q') || '',
  }));

  // Sync URL params to filters when URL changes (e.g. header nav)
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    const q = searchParams.get('q') || '';
    setFilters((prev) => ({
      ...prev,
      category: cat,
      search: q,
    }));
  }, [searchParams]);

  const updateFilter = (patch: Partial<FilterState>) => {
    setFilters((prev) => {
      const next = { ...prev, ...patch };
      // Sync category back to URL
      const params: Record<string, string> = {};
      if (next.category !== 'all') params.category = next.category;
      if (next.search) params.q = next.search;
      setSearchParams(params, { replace: true });
      return next;
    });
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
    setSearchParams({}, { replace: true });
  };

  const filtered = useMemo(() => {
    let result = [...products];

    if (filters.category !== 'all') {
      result = result.filter((p) => p.category === filters.category);
    }
    if (filters.brand !== 'all') {
      result = result.filter((p) => p.brand === filters.brand);
    }
    if (filters.availability !== 'all') {
      result = result.filter((p) => p.availability === filters.availability);
    }
    if (filters.priceMax < MAX_PRICE) {
      result = result.filter((p) => p.price <= filters.priceMax);
    }
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    switch (filters.sort as SortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        result.sort((a, b) => Number(b.featured) - Number(a.featured));
        break;
    }

    return result;
  }, [filters, MAX_PRICE]);

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="bg-white border-b border-ink-100">
        <div className="container-page py-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-600 mb-1">Catalog</p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink-900">
              {filters.category !== 'all'
                ? products.find((p) => p.category === filters.category)?.category
                  ? (() => {
                      const cat = products.find((p) =>
