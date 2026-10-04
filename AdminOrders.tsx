import { useEffect, useState } from 'react';
import { ChevronDown, Loader2, PackageOpen } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { formatPrice } from '@/lib/format';

interface OrderItem {
  productId: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  created_at: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  wilaya_code: string;
  wilaya_name: string;
  address: string;
  notes: string | null;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: string;
}

const statusOptions = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

const statusStyles: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700',
  confirmed: 'bg-blue-50 text-blue-700',
  shipped: 'bg-indigo-50 text-indigo-700',
  delivered: 'bg-emerald-50 text-emerald-700',
  cancelled: 'bg-red-50 text-red-700',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    setOrders((data as Order[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const changeStatus = async (id: string, status: string) => {
    setUpdating(id);
    const { error } = await supabase.from('orders').update({ status }).eq('id', id);
    if (!error) {
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    }
    setUpdating(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-ink-400" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink-900 mb-1">Orders</h1>
      <p className="text-sm text-ink-500 mb-6">
        {orders.length} order{orders.length !== 1 ? 's' : ''} total
      </p>

      {orders.length === 0 ? (
        <div className="card-surface p-12 text-center">
          <PackageOpen className="h-10 w-10 text-ink-300 mx-auto mb-3" />
          <p className="text-sm text-ink-500">No orders yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="card-surface overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                className="w-full flex flex-wrap items-center gap-3 p-4 text-left hover:bg-ink-50/50 transition-colors"
              >
                <div className="flex-1 min-w-[160px]">
                  <p className="text-sm font-semibold text-ink-900">{order.customer_name}</p>
                  <p className="text-xs text-ink-500">{formatDate(order.created_at)}</p>
                </div>
                <div className="text-xs text-ink-500 min-w-[100px]">{order.wilaya_name}</div>
                <div className="text-sm font-bold text-ink-900 min-w-[90px]">{formatPrice(order.total)}</div>
                <select
                  value={order.status}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => changeStatus(order.id, e.target.value)}
                  disabled={updating === order.id}
                  className={`text-xs font-semibold rounded-full px-3 py-1.5 border-0 cursor-pointer capitalize ${
                    statusStyles[order.status] ?? 'bg-ink-100 text-ink-700'
                  }`}
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className={`h-4 w-4 text-ink-400 transition-transform ${
                    expanded === order.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expanded === order.id && (
                <div className="border-t border-ink-100 p-4 bg-ink-50/40 text-sm space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase text-ink-400 mb-1">Contact</p>
                      <p className="text-ink-700">{order.customer_phone}</p>
                      <p className="text-ink-700">{order.customer_email}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-ink-400 mb-1">Address</p>
                      <p className="text-ink-700">{order.address}</p>
                      <p className="text-ink-700">
                        {order.wilaya_name} ({order.wilaya_code})
                      </p>
                    </div>
                  </div>
                  {order.notes && (
                    <div>
                      <p className="text-xs font-semibold uppercase text-ink-400 mb-1">Notes</p>
                      <p className="text-ink-700">{order.notes}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-semibold uppercase text-ink-400 mb-1.5">Items</p>
                    <div className="space-y-1.5">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-xs">
                          <span className="text-ink-700">
                            {item.brand} {item.name} × {item.quantity}
                          </span>
                          <span className="font-semibold text-ink-900">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-ink-200 text-xs">
                    <span className="text-ink-500">
                      Subtotal {formatPrice(order.subtotal)} + Shipping {formatPrice(order.shipping)}
                    </span>
                    <span className="font-bold text-ink-900">Total {formatPrice(order.total)}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
