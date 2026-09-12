import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, Search, ChevronDown } from 'lucide-react';
import type { SortOption } from '@/types/product';
import { categories } from '@/data/categories';
import { brands } from '@/data/brands';

export interface FilterState {
  category: string;
  brand: string;
  availability: string;
  priceMax: number;
  sort: SortOption;
  search: string;
}

interface FilterBarProps {
  filters: FilterState;
  onChange: (patch: Partial<FilterState>) => void;
  onClear: () => void;
  resultCount: number;
  maxPrice: number;
}

const sortLabels: Record<SortOption, string> = {
  featured: 'Featured',
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  'name-asc': 'Name: A-Z',
};

export default function FilterBar({
  filters,
  onChange,
  onClear,
  resultCount,
  maxPrice,
}: FilterBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeCount =
    (filters.category !== 'all' ? 1 : 0) +
    (filters.brand !== 'all' ? 1 : 0) +
    (filters.availability !== 'all' ? 1 : 0) +
    (filters.priceMax < maxPrice ? 1 : 0);

  const selectClass =
    'appearance-none w-full pl-3 pr-9 py-2 rounded-lg border border-ink-200 bg-white text-sm font-medium text-ink-900 cursor-pointer transition-colors hover:border-ink-300 focus:border-ink-900 focus:outline-none';

  const Chevron = () => (
    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
  );

  const desktopControls = (
    <>
      {/* Category */}
      <div className="relative">
        <select
          value={filters.category}
          onChange={(e) => onChange({ category: e.target.value })}
          className={selectClass}
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>{c.name}</option>
          ))}
        </select>
        <Chevron />
      </div>

      {/* Brand */}
      <div className="relative">
        <select
          value={filters.brand}
          onChange={(e) => onChange({ brand: e.target.value })}
          className={selectClass}
        >
          <option value="all">All Brands</option>
          {brands.map((b) => (
            <option key={b.id} value={b.name}>{b.name}</option>
          ))}
        </select>
        <Chevron />
      </div>

      {/* Availability */}
      <div className="relative">
        <select
          value={filters.availability}
          onChange={(e) => onChange({ availability: e.target.value })}
          className={selectClass}
        >
          <option value="all">All Availability</option>
          <option value="in-stock">In Stock</option>
          <option value="low-stock">Low Stock</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
        <Chevron />
      </div>

      {/* Price */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-ink-200 bg-white min-w-[150px]">
        <span className="text-xs font-medium text-ink-500 whitespace-nowrap">Max</span>
        <input
          type="range"
          min={0}
          max={maxPrice}
          step={50}
          value={filters.priceMax}
          onChange={(e) => onChange({ priceMax: Number(e.target.value) })}
          className="flex-1 accent-ink-900 cursor-pointer"
        />
        <span className="text-xs font-semibold text-ink-900 whitespace-nowrap tabular-nums">
          ${filters.priceMax.toLocaleString()}
        </span>
      </div>

      {/* Sort */}
      <div className="relative">
        <select
          value={filters.sort}
          onChange={(e) => onChange({ sort: e.target.value as SortOption })}
          className={selectClass}
        >
          {Object.entries(sortLabels).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        <Chevron />
      </div>
    </>
  );

  const mobileControls = (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
        <input
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-ink-200 bg-ink-50 text-sm focus:border-ink-900 focus:outline-none focus:bg-white"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="relative">
          <select
            value={filters.category}
            onChange={(e) => onChange({ category: e.target.value })}
            className={selectClass}
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>{c.name}</option>
            ))}
          </select>
          <Chevron />
        </div>
        <div className="relative">
          <select
            value={filters.brand}
            onChange={(e) => onChange({ brand: e.target.value })}
            className={selectClass}
          >
            <option value="all">All Brands</option>
            {brands.map((b) => (
              <option key={b.id} value={b.name}>{b.name}</option>
            ))}
          </select>
          <Chevron />
        </div>
        <div className="relative">
          <select
            value={filters.availability}
            onChange={(e) => onChange({ availability: e.target.value })}
            className={selectClass}
          >
            <option value="all">All Availability</option>
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
          <Chevron />
        </div>
        <div className="relative">
          <select
            value={filters.sort}
            onChange={(e) => onChange({ sort: e.target.value as SortOption })}
            className={selectClass}
          >
            {Object.entries(sortLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <Chevron />
        </div>
      </div>

      {/* Price slider */}
      <div className="px-3 py-3 rounded-lg border border-ink-200 bg-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-ink-500">Max Price</span>
          <span className="text-sm font-bold text-ink-900 tabular-nums">
            ${filters.priceMax.toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={maxPrice}
          step={50}
          value={filters.priceMax}
          onChange={(e) => onChange({ priceMax: Number(e.target.value) })}
          className="w-full accent-ink-900 cursor-pointer"
        />
      </div>
    </div>
  );

  return (
    <div className="sticky top-16 z-30 bg-ink-50/95 backdrop-blur-sm border-b border-ink-100">
      <div className="container-page py-3">
        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input
              value={filters.search}
              onChange={(e) => onChange({ search: e.target.value })}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-ink-200 bg-white text-sm focus:border-ink-900 focus:outline-none transition-colors"
            />
          </div>
          {desktopControls}
          {activeCount > 0 && (
            <button
              onClick={onClear}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium text-ink-500 hover:text-ink-900 hover:bg-ink-100 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
              Clear ({activeCount})
            </button>
          )}
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input
              value={filters.search}
              onChange={(e) => onChange({ search: e.target.value })}
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-ink-200 bg-white text-sm focus:border-ink-900 focus:outline-none"
            />
          </div>
          <button
            onClick={() => setMobileOpen((s) => !s)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
              mobileOpen || activeCount > 0
                ? 'border-ink-900 bg-ink-900 text-white'
                : 'border-ink-200 bg-white text-ink-700'
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-500 text-[10px] font-bold text-white">
                {activeCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile filter panel */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="pt-4">
                {mobileControls}
                {activeCount > 0 && (
                  <button
                    onClick={onClear}
                    className="mt-3 w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-ink-200 text-sm font-medium text-ink-600 hover:bg-ink-100 transition-colors"
                  >
                    <X className="h-4 w-4" />
                    Clear all filters
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result count */}
        <div className="mt-2 flex items-center">
          <p className="text-xs text-ink-500">
            <span className="font-semibold text-ink-900">{resultCount}</span> {resultCount === 1 ? 'product' : 'products'}
          </p>
        </div>
      </div>
    </div>
  );
}
