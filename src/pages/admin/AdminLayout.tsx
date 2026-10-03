import { NavLink, Outlet } from 'react-router-dom';
import { ClipboardList, Package, Tag, LogOut, ExternalLink, Zap } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { to: '/admin', label: 'Orders', icon: ClipboardList, end: true },
  { to: '/admin/products', label: 'Products', icon: Package, end: false },
  { to: '/admin/categories', label: 'Categories', icon: Tag, end: false },
];

export default function AdminLayout() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen flex bg-ink-50">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-ink-100 bg-white">
        <div className="flex items-center gap-2 px-5 h-16 border-b border-ink-100">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink-900">
            <Zap className="h-3.5 w-3.5 text-accent-500" fill="currentColor" />
          </div>
          <span className="font-display text-sm font-bold text-ink-900">VOLT Admin</span>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-ink-900 text-white' : 'text-ink-600 hover:bg-ink-50'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-ink-100 space-y-1">
          <p className="px-3 text-xs text-ink-400 truncate mb-1">{user?.email}</p>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-ink-600 hover:bg-ink-50"
          >
            <ExternalLink className="h-4 w-4" />
            View Store
          </a>
          <button
            onClick={signOut}
            className="flex w-full items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-ink-600 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 bg-white border-b border-ink-100 h-14 flex items-center justify-between px-4">
        <span className="font-display text-sm font-bold text-ink-900">VOLT Admin</span>
        <button onClick={signOut} className="text-xs font-medium text-ink-500">
          Sign Out
        </button>
      </div>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-ink-100 flex">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium ${
                isActive ? 'text-ink-900' : 'text-ink-400'
              }`
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <main className="flex-1 min-w-0 pt-14 md:pt-0 pb-16 md:pb-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
