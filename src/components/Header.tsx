import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ShoppingCart, Zap } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { site } from '@/data/site';
import { categories } from '@/data/categories';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchValue.trim())}`);
      setSearchOpen(false);
      setSearchValue('');
      setMobileOpen(false);
    }
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive ? 'text-ink-900' : 'text-ink-500 hover:text-ink-900'
    }`;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md border-b border-ink-100' : 'bg-white border-b border-ink-100'
      }`}
    >
      <div className="container-page">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-900">
              <Zap className="h-4 w-4 text-accent-500" fill="currentColor" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-ink-900">
              {site.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/" end className={navLinkClass}>{t.navigation.home}</NavLink>
            <NavLink to="/shop" className={navLinkClass}>{t.navigation.shop}</NavLink>
            <div className="relative group">
              <button className="text-sm font-medium text-ink-500 hover:text-ink-900 transition-colors duration-200 flex items-center gap-1">
                {t.navigation.categories}
              </button>
              <div className="absolute left-1/2 top-full pt-3 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="w-[640px] p-2 rounded-xl border border-ink-100 bg-white shadow-xl">
                  <div className="grid grid-cols-3 gap-1">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/shop?category=${cat.slug}`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-ink-50 transition-colors"
                      >
                        <img
                          src={cat.image}
                          alt={cat.name}
                          loading="lazy"
                          className="h-10 w-10 rounded-md object-cover"
                        />
                        <div>
                          <div className="text-sm font-semibold text-ink-900">{cat.name}</div>
                          <div className="text-xs text-ink-400 line-clamp-1">{cat.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <button
              onClick={() => setSearchOpen((s) => !s)}
              className="p-2.5 rounded-lg text-ink-600 hover:bg-ink-100 transition-colors"
              aria-label={t.search.search}
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              to="/cart"
              className="relative p-2.5 rounded-lg text-ink-600 hover:bg-ink-100 transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-accent-500 px-1 text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileOpen((s) => !s)}
              className="md:hidden p-2.5 rounded-lg text-ink-600 hover:bg-ink-100 transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Search bar expand */}
        <AnimatePresence>
          {searchOpen && (
            <motion.form
              onSubmit={handleSearch}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                  <input
                    autoFocus
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder={t.search.searchPlaceholder}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-ink-200 bg-ink-50 text-sm focus:border-ink-900 focus:outline-none focus:bg-white transition-all"
                  />
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-ink-100 bg-white"
          >
            <div className="container-page py-4 space-y-1">
              <NavLink
                to="/"
                end
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-lg text-sm font-medium ${isActive ? 'bg-ink-50 text-ink-900' : 'text-ink-600'}`
                }
              >
                {t.navigation.home}
              </NavLink>
              <NavLink
                to="/shop"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-lg text-sm font-medium ${isActive ? 'bg-ink-50 text-ink-900' : 'text-ink-600'}`
                }
              >
                {t.navigation.shop}
              </NavLink>
              <div className="pt-2 pb-1 px-3 text-xs font-semibold uppercase tracking-wider text-ink-400">
                {t.navigation.categories}
              </div>
              <div className="grid grid-cols-2 gap-1 max-h-64 overflow-y-auto">
                {categories.map((cat) => (
                  <NavLink
                    key={cat.id}
                    to={`/shop?category=${cat.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2 rounded-lg text-sm text-ink-600 hover:bg-ink-50"
                  >
                    {cat.name}
                  </NavLink>
                ))}
              </div>
              <div className="pt-3 px-3">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
