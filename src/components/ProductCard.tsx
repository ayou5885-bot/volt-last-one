import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowRight, Check, AlertTriangle } from 'lucide-react';
import type { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/format';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const availabilityConfig = {
  'in-stock': { label: 'In Stock', className: 'text-emerald-600 bg-emerald-50', icon: Check },
  'low-stock': { label: 'Low Stock', className: 'text-amber-600 bg-amber-50', icon: AlertTriangle },
  'out-of-stock': { label: 'Out of Stock', className: 'text-red-600 bg-red-50', icon: AlertTriangle },
};

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const avail = availabilityConfig[product.availability];
  const AvailIcon = avail.icon;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4), ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/product/${product.slug}`}
        className="group block card-surface overflow-hidden transition-all duration-300 hover:border-ink-200 hover:shadow-xl hover:shadow-ink-900/8 hover:-translate-y-0.5"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-ink-100">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${avail.className} backdrop-blur-sm`}>
              <AvailIcon className="h-3 w-3" />
              {avail.label}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-400 mb-1">
              {product.brand}
            </p>
            <h3 className="font-display text-sm font-semibold text-ink-900 leading-snug line-clamp-2 group-hover:text-ink-700 transition-colors">
              {product.name}
            </h3>
            <p className="text-xs text-ink-500 mt-1 line-clamp-1">{product.shortDescription}</p>
          </div>

          <div className="flex items-end justify-between gap-2 pt-1 border-t border-ink-50">
            <span className="font-display text-xl font-bold text-ink-900 pt-2">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleAdd}
              disabled={product.availability === 'out-of-stock'}
              className="flex-1 btn-accent !py-2.5 !text-xs disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              Add to Cart
            </button>
            <span className="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-lg border border-ink-200 text-ink-600 text-xs font-medium transition-colors group-hover:border-ink-900 group-hover:text-ink-900 group-hover:bg-ink-50">
              Details
              <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
