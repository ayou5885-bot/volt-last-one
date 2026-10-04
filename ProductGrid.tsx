import { AnimatePresence, motion } from 'framer-motion';
import { PackageSearch } from 'lucide-react';
import type { Product } from '@/types/product';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-100 mb-4">
          <PackageSearch className="h-8 w-8 text-ink-400" />
        </div>
        <h3 className="font-display text-lg font-semibold text-ink-900 mb-1">No products found</h3>
        <p className="text-sm text-ink-500 max-w-sm">
          Try adjusting your filters or search terms to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
    >
      <AnimatePresence mode="popLayout">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProductCard product={product} index={i} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
