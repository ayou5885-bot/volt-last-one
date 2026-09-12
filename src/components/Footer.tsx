import { Link } from 'react-router-dom';
import { Zap, Twitter, Instagram, Youtube } from 'lucide-react';
import { site } from '@/data/site';
import { categories } from '@/data/categories';

export default function Footer() {
  return (
    <footer className="bg-ink-950 text-ink-300 mt-auto">
      <div className="container-page py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
                <Zap className="h-4 w-4 text-accent-500" fill="currentColor" />
              </div>
              <span className="font-display text-lg font-bold text-white">{site.name}</span>
            </Link>
            <p className="text-sm text-ink-400 max-w-sm leading-relaxed">
              {site.description}
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href={site.social.twitter} className="p-2 rounded-lg bg-ink-800 hover:bg-ink-700 transition-colors" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </a>
              <a href={site.social.instagram} className="p-2 rounded-lg bg-ink-800 hover:bg-ink-700 transition-colors" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href={site.social.youtube} className="p-2 rounded-lg bg-ink-800 hover:bg-ink-700 transition-colors" aria-label="YouTube">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Shop</h4>
            <ul className="space-y-2.5">
              <li><Link to="/shop" className="text-sm text-ink-400 hover:text-white transition-colors">All Products</Link></li>
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link to={`/shop?category=${cat.slug}`} className="text-sm text-ink-400 hover:text-white transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More categories */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">More</h4>
            <ul className="space-y-2.5">
              {categories.slice(5, 10).map((cat) => (
                <li key={cat.id}>
                  <Link to={`/shop?category=${cat.slug}`} className="text-sm text-ink-400 hover:text-white transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Contact</h4>
            <ul className="space-y-2.5 text-sm text-ink-400">
              <li>{site.address}</li>
              <li>{site.phone}</li>
              <li className="break-all">{site.email}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-ink-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-500">
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-ink-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Warranty</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
