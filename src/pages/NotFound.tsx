import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container-page py-20">
      <div className="max-w-md mx-auto text-center">
        <p className="font-display text-7xl font-bold text-ink-100">404</p>
        <h1 className="font-display text-2xl font-bold text-ink-900 mt-2 mb-2">Page not found</h1>
        <p className="text-sm text-ink-500 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/" className="btn-outline">
            <Home className="h-4 w-4" />
            Home
          </Link>
          <Link to="/shop" className="btn-primary">
            <ArrowLeft className="h-4 w-4" />
            Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
