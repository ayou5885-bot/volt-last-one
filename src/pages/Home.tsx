import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Truck, Headphones, Lock, Zap } from 'lucide-react';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { brands } from '@/data/brands';
import { site } from '@/data/site';
import { images } from '@/data/images';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';

const trustIcons = [Truck, Shield, Headphones, Lock];

export default function Home() {
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const popularCategories = categories.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0">
          <img
            src={images.heroMain}
            alt=""
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/20" />
        </div>
        <div className="relative container-page py-20 sm:py-28 lg:py-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 mb-6">
              <Zap className="h-3.5 w-3.5 text-accent-500" fill="currentColor" />
              <span className="text-xs font-semibold tracking-wide">Premium Computer Hardware</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-balance">
              Built for the way you work, create and play.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-ink-300 max-w-xl leading-relaxed">
              Curated components, peripherals, and systems from the brands you trust. Shipped fast, backed for years.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Link to="/shop" className="btn-accent !px-7 !py-3.5 !text-base !rounded-xl">
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/shop?category=gaming-pcs" className="btn-outline !bg-transparent !border-white/20 !text-white !px-7 !py-3.5 !text-base !rounded-xl hover:!bg-white/10 hover:!border-white/30">
                Explore Gaming PCs
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-xs text-ink-400">
              <span className="flex items-center gap-1.5"><Truck className="h-4 w-4 text-accent-500" /> Free shipping over $99</span>
              <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-accent-500" /> 2-year warranty</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-b border-ink-100 bg-white">
        <div className="container-page">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-ink-100">
            {site.trustBadges.map((badge, i) => {
              const Icon = trustIcons[i];
              return (
                <div key={badge.title} className="flex items-center gap-3 py-5 px-4 lg:px-6 hover:bg-ink-50/50 transition-colors">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink-50 border border-ink-100">
                    <Icon className="h-5 w-5 text-ink-700" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink-900">{badge.title}</p>
                    <p className="text-xs text-ink-500">{badge.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="container-page py-16 lg:py-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-600 mb-2">Featured</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink-900">Top picks right now</h2>
          </div>
          <Link to="/shop" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-ink-700 hover:text-ink-900 hover:gap-2.5 transition-all">
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Browse categories */}
      <section className="bg-white border-y border-ink-100">
        <div className="container-page py-16 lg:py-24">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-600 mb-2">Browse</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink-900">Shop by category</h2>
            <p className="text-sm text-ink-500 mt-2 max-w-md mx-auto">
              From full systems to individual components — find exactly what your build needs.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {popularCategories.map((cat, i) => (
              <CategoryCard key={cat.id} category={cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="container-page py-14">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-ink-400 mb-6">
          Trusted brands we carry
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {brands.slice(0, 12).map((brand) => (
            <span
              key={brand.id}
              className="font-display text-lg font-semibold text-ink-300 hover:text-ink-700 transition-colors cursor-default"
            >
              {brand.name}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-16 lg:pb-24">
        <div className="relative overflow-hidden rounded-2xl bg-ink-900 px-6 py-14 sm:px-12 sm:py-20 text-center shadow-xl shadow-ink-900/20">
          <div className="absolute inset-0 opacity-10">
            <img src={images.gamingPc} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 to-transparent" />
          <div className="relative">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white max-w-lg mx-auto text-balance">
              Ready to build your next setup?
            </h2>
            <p className="text-sm text-ink-300 mt-3 max-w-md mx-auto">
              Browse our full catalog of components, peripherals, and complete systems.
            </p>
            <Link to="/shop" className="btn-accent mt-7 !px-7 !py-3.5 !text-base !rounded-xl">
              Start Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
