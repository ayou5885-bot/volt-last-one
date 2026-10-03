import { useState, type FormEvent } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Zap, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLogin() {
  const { user, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (user) {
    const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin';
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) {
      setError('Incorrect email or password.');
      return;
    }
    navigate('/admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-50 px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-900 mb-3">
            <Zap className="h-5 w-5 text-accent-500" fill="currentColor" />
          </div>
          <h1 className="font-display text-xl font-bold text-ink-900">Admin Login</h1>
          <p className="text-sm text-ink-500 mt-1">Sign in to manage the store</p>
        </div>

        <form onSubmit={handleSubmit} className="card-surface p-6 space-y-4">
          <div>
            <label className="label-text" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="label-text" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit" disabled={submitting} className="btn-primary w-full !py-3 disabled:opacity-60">
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>

          <div className="flex items-center justify-between pt-1">
            <Link to="/admin/forgot-password" className="text-xs text-ink-500 hover:text-ink-900">
              Forgot password?
            </Link>
            <Link to="/" className="text-xs text-ink-500 hover:text-ink-900">
              Back to store
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
