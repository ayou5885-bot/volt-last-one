import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowLeft, ChevronDown, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { site } from '@/data/site';
import { wilayas, getWilayaByCode } from '@/data/wilayas';
import { formatPrice } from '@/lib/format';

interface FormData {
  name: string;
  phone: string;
  email: string;
  wilaya: string;
  address: string;
  notes: string;
}

const emptyForm: FormData = { name: '', phone: '', email: '', wilaya: '', address: '', notes: '' };

export default function Checkout() {
  const { items, subtotal, clearCart, itemCount } = useCart();
  const { language } = useLanguage();
  const [form, setForm] = useState<FormData>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const selectedWilaya = getWilayaByCode(form.wilaya);
  const shipping = selectedWilaya ? selectedWilaya.shippingPrice : 0;
  const total = subtotal + shipping;

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const buildEmailBody = () => {
    const lines: string[] = [];
    lines.push('NEW ORDER — VOLT Store');
    lines.push('');
    lines.push('=== CUSTOMER ===');
    lines.push(`Name: ${form.name}`);
    lines.push(`Phone: ${form.phone}`);
    lines.push(`Email: ${form.email}`);
    lines.push(`Wilaya: ${selectedWilaya ? `${selectedWilaya.code} - ${selectedWilaya.nameFr}` : form.wilaya}`);
    lines.push(`Address: ${form.address}`);
    if (form.notes) lines.push(`Notes: ${form.notes}`);
    lines.push('');
    lines.push('=== ORDER ITEMS ===');
    items.forEach((item, i) => {
      lines.push(
        `${i + 1}. ${item.product.brand} ${item.product.name}`
      );
      lines.push(`   Qty: ${item.quantity} × ${formatPrice(item.product.price)} = ${formatPrice(item.quantity * item.product.price)}`);
    });
    lines.push('');
    lines.push('=== TOTALS ===');
    lines.push(`Subtotal: ${formatPrice(subtotal)}`);
    lines.push(`Shipping: ${shipping === 0 ? 'Free' : formatPrice(shipping)}`);
    lines.push(`Total: ${formatPrice(total)}`);
    return lines.join('\n');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (items.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('_subject', `New Order — ${site.name}`);
      formData.append('message', buildEmailBody());
      formData.append('_template', 'table');
      formData.append('_captcha', 'false');

      const res = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      if (!res.ok) throw new Error('Submission failed');

      setSuccess(true);
      clearCart();
    } catch {
      setError('Something went wrong submitting your order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="container-page py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md mx-auto text-center"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 mx-auto mb-5">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="font-display text-2xl font-bold text-ink-900 mb-2">Order received!</h1>
          <p className="text-sm text-ink-500 mb-6">
            Thank you for your order. We've received your request and will contact you shortly to confirm details and arrange payment.
          </p>
          <Link to="/shop" className="btn-primary">
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-ink-900 mb-2">Your cart is empty</h1>
        <p className="text-sm text-ink-500 mb-6">Add some products before checking out.</p>
        <Link to="/shop" className="btn-primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="container-page py-8 lg:py-12">
      <Link
        to="/cart"
        className="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-ink-900 transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Cart
      </Link>

      <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink-900 mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form fields */}
        <div className="lg:col-span-2 space-y-5">
          <div className="card-surface p-6 space-y-5">
            <h2 className="font-display text-lg font-bold text-ink-900">Contact Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label-text" htmlFor="name">Full Name *</label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  className="input-field"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="label-text" htmlFor="phone">Phone *</label>
                <input
                  id="phone"
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  className="input-field"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="label-text" htmlFor="email">Email *</label>
                <input
                  id="email"
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  className="input-field"
                  placeholder="john@example.com"
                />
              </div>
            </div>
          </div>

          <div className="card-surface p-6 space-y-5">
            <h2 className="font-display text-lg font-bold text-ink-900">Shipping Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label-text" htmlFor="wilaya">Wilaya *</label>
                <div className="relative">
                  <select
                    id="wilaya"
                    required
                    value={form.wilaya}
                    onChange={(e) => update('wilaya', e.target.value)}
                    className="input-field appearance-none pr-9 cursor-pointer"
                  >
                    <option value="" disabled>
                      Select your wilaya
                    </option>
                    {wilayas.map((w) => (
                      <option key={w.code} value={w.code}>
                        {w.code} - {language === 'ar' ? w.nameAr : w.nameFr}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="label-text" htmlFor="address">Address *</label>
                <input
                  id="address"
                  required
                  value={form.address}
                  onChange={(e) => update('address', e.target.value)}
                  className="input-field"
                  placeholder="123 Market St, Apt 4B"
                />
              </div>
            </div>
          </div>

          <div className="card-surface p-6 space-y-5">
            <h2 className="font-display text-lg font-bold text-ink-900">Order Notes (Optional)</h2>
            <textarea
              value={form.notes}
              onChange={(e) => update('notes', e.target.value)}
              rows={3}
              className="input-field resize-none"
              placeholder="Any special instructions for your order..."
            />
          </div>

          {error && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-100 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="card-surface p-6 sticky top-24">
            <h2 className="font-display text-lg font-bold text-ink-900 mb-4">Your Order</h2>
            <div className="space-y-3 max-h-64 overflow-y-auto pb-4 border-b border-ink-100">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-ink-100 shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-ink-900 line-clamp-1">{item.product.name}</p>
                    <p className="text-xs text-ink-500">Qty {item.quantity} × {formatPrice(item.product.price)}</p>
                  </div>
                  <span className="text-xs font-bold text-ink-900 whitespace-nowrap">
                    {formatPrice(item.quantity * item.product.price)}
                  </span>
                </div>
              ))}
            </div>
            <div className="space-y-2 py-4 border-b border-ink-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-500">Items ({itemCount})</span>
                <span className="font-semibold text-ink-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-500">Shipping</span>
                <span className="font-semibold text-ink-900">
                  {selectedWilaya ? formatPrice(shipping) : 'Select a wilaya'}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between py-4">
              <span className="font-display text-base font-bold text-ink-900">Total</span>
              <span className="font-display text-xl font-bold text-ink-900">{formatPrice(total)}</span>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full !py-3 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Place Order'
              )}
            </button>
            <p className="text-xs text-ink-400 text-center mt-3">
              No online payment required. We'll contact you to confirm.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
