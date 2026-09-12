import { useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  ArrowLeft,
  Check,
  AlertTriangle,
  Truck,
  Shield,
  RotateCcw,
} from 'lucide-react';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/format';
import ProductCard from '@/components/ProductCard';

const availabilityConfig = {
  'in-stock': { label: 'In Stock', className: 'text-emerald-600 bg-emerald-50', icon: Check },
  'low-stock': { label: 'Low Stock — Order Soon', className: 'text-amber-600 bg-amber-50', icon: AlertTriangle },
  'out-of-stock': { label: 'Out of Stock', className: 'text-red-600 bg-red-50', icon: AlertTriangle },
};

export default function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const product = useMemo(() => products.find((p) => p.slug === slug), [slug]);

  const related = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-ink-900 mb-2">Product not found</h1>
        <p className="text-sm text-ink-500 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/shop" className="btn-primary">Back to Shop</Link>
      </div>
    );
  }

  const avail = availabilityConfig[product.availability];
  const AvailIcon = avail.icon;
  const categoryName = categories.find((c) => c.slug === product.category)?.name || product.category;

  const handleAddAndGo = () => {
    addItem(product);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-ink-100">
        <div className="container-page py-4">
          <nav className="flex items-center gap-2 text-xs text-ink-500">
            <Link to="/" className="hover:text-ink-900 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-ink-900 transition-colors">Shop</Link>
            <span>/</span>
            <Link to={`/shop?category=${product.category}`} className="hover:text-ink-900 transition-colors">
              {categoryName}
            </Link>
            <span>/</span>
            <span className="text-ink-900 font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container-page py-8 lg:py-12">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-ink-900 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-square rounded-2xl overflow-hidden bg-ink-100 border border-ink-100"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${avail.className}`}>
                <AvailIcon className="h-3.5 w-3.5" />
                {avail.label}
              </span>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-600 mb-2">
              {product.brand}
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink-900 leading-tight">
              {product.name}
            </h1>
            <p className="text-sm text-ink-500 mt-2">{product.shortDescription}</p>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-display text-3xl font-bold text-ink-900">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm text-ink-400">excl. tax & shipping</span>
            </div>

            {/* Description */}
            <p className="text-sm text-ink-600 leading-relaxed mt-6">{product.description}</p>

            {/* Features */}
            {product.features.length > 0 && (
              <div className="mt-6">
                <h3 className="label-text">Key Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-ink-700">
                      <Check className="h-4 w-4 text-accent-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddAndGo}
                disabled={product.availability === 'out-of-stock'}
                className="btn-primary flex-1 !py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </button>
              <Link to="/shop" className="btn-outline !py-3">
                Continue Shopping
              </Link>
            </div>

            {/* Trust mini-badges */}
            <div className="mt-8 grid grid-cols-3 gap-3 pt-6 border-t border-ink-100">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-ink-500" />
                <span className="text-xs text-ink-600">Free shipping over $99</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-ink-500" />
                <span className="text-xs text-ink-600">2-year warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4 text-ink-500" />
                <span className="text-xs text-ink-600">30-day returns</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Specifications */}
        <div className="mt-12 lg:mt-16">
          <h2 className="font-display text-xl font-bold text-ink-900 mb-4">Specifications</h2>
          <div className="card-surface overflow-hidden">
            <table className="w-full">
              <tbody>
                {product.specifications.map((spec, i) => (
                  <tr
                    key={spec.label}
                    className={i % 2 === 0 ? 'bg-white' : 'bg-ink-50/50'}
                  >
                    <td className="px-4 py-3 text-sm font-medium text-ink-500 w-1/3">{spec.label}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-ink-900">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-12 lg:mt-16">
            <h2 className="font-display text-xl font-bold text-ink-900 mb-4">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
