import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Minus, Plus, ArrowLeft, ArrowRight, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/format';

export default function Cart() {
  const { items, subtotal, updateQuantity, removeItem, clearCart, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-page py-20">
        <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-100 mb-5">
            <ShoppingCart className="h-8 w-8 text-ink-400" />
          </div>
          <h1 className="font-display text-2xl font-bold text-ink-900 mb-2">Your cart is empty</h1>
          <p className="text-sm text-ink-500 mb-6">
            Browse our catalog and add the components you need for your next build.
          </p>
          <Link to="/shop" className="btn-primary">
            Browse Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-8 lg:py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink-900">
          Shopping Cart
        </h1>
        <button
          onClick={clearCart}
          className="text-sm text-ink-500 hover:text-red-600 transition-colors flex items-center gap-1.5"
        >
          <Trash2 className="h-4 w-4" />
          Clear all
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={item.product.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="card-surface p-4 flex items-center gap-4"
              >
                <Link
                  to={`/product/${item.product.slug}`}
                  className="shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-ink-100"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                    {item.product.brand}
                  </p>
                  <Link
                    to={`/product/${item.product.slug}`}
                    className="font-display text-sm font-semibold text-ink-900 hover:text-ink-700 transition-colors line-clamp-1"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-xs text-ink-500 mt-0.5 line-clamp-1">{item.product.shortDescription}</p>
                  <p className="text-sm font-bold text-ink-900 mt-1">{formatPrice(item.product.price)}</p>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="p-1.5 rounded-lg border border-ink-200 text-ink-600 hover:border-ink-400 hover:text-ink-900 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold tabular-nums">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="p-1.5 rounded-lg border border-ink-200 text-ink-600 hover:border-ink-400 hover:text-ink-900 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="shrink-0 p-2 rounded-lg text-ink-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="card-surface p-6 sticky top-24">
            <h2 className="font-display text-lg font-bold text-ink-900 mb-4">Order Summary</h2>
            <div className="space-y-3 pb-4 border-b border-ink-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-500">Items ({itemCount})</span>
                <span className="font-semibold text-ink-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-500">Shipping</span>
                <span className="font-semibold text-ink-900">
                  {subtotal >= 99 ? 'Free' : formatPrice(12)}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between py-4">
              <span className="font-display text-base font-bold text-ink-900">Total</span>
              <span className="font-display text-xl font-bold text-ink-900">
                {formatPrice(subtotal + (subtotal >= 99 ? 0 : 12))}
              </span>
            </div>
            <Link to="/checkout" className="btn-primary w-full !py-3 mt-2">
              Proceed to Checkout
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/shop"
              className="mt-3 w-full inline-flex items-center justify-center gap-2 text-sm font-medium text-ink-500 hover:text-ink-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
