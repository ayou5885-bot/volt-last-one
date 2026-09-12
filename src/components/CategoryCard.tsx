import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Category } from '@/types/product';

interface CategoryCardProps {
  category: Category;
  index?: number;
}

export default function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3), ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/shop?category=${category.slug}`}
        className="group relative block aspect-[4/5] rounded-xl overflow-hidden bg-ink-900"
      >
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-70 transition-all duration-500 ease-out-expo group-hover:opacity-50 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
        <div className="absolute inset-0 p-5 flex flex-col justify-end">
          <h3 className="font-display text-lg font-bold text-white mb-1">{category.name}</h3>
          <p className="text-xs text-ink-300 line-clamp-2 mb-3">{category.description}</p>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-400 group-hover:gap-2.5 transition-all duration-300">
            Browse
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
