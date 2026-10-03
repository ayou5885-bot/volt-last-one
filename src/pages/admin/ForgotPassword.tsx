import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function ForgotPassword() {
  const { sendPasswordReset } = useAuth();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const { error } = await sendPasswordReset(email);
    setSubmitting(false);
    if (error) {
      setError(error);
      return;
    }
    setSent(true);
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink-50 px-4">
        <div className="w-full max-w-sm text-center card-surface p-6">
          <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
          <h1 className="font-display text-lg font-bold text-ink-900 mb-1">Check your email</h1>
          <p className="text-sm text-ink-500">We sent a password reset link to {email}.</p>
          <Link to="/admin/login" className="text-sm text-ink-900 font-semibold mt-5 inline-block">
            Back to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-50 px-4">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-xl font-bold text-ink-900 mb-1 text-center">Reset Password</h1>
        <p className="text-sm text-ink-500 mb-6 text-center">
          Enter your admin email and we'll send a reset link.
        </p>
        <form onSubmit={handleSubmit} className="card-surface p-6 space-y-4">
          <div>
            <label className="label-text" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={submitting} className="btn-primary w-full !py-3 disabled:opacity-60">
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Send Reset Link'
            )}
          </button>
          <Link to="/admin/login" className="block text-center text-xs text-ink-500 hover:text-ink-900">
            Back to login
          </Link>
        </form>
      </div>
    </div>
  );
}
