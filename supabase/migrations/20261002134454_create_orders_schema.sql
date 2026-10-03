/*
# Create orders table schema and policies

1. Creates the orders table with all columns
2. Enables RLS
3. Adds 4 CRUD policies (public insert, authenticated read/update/delete)
4. Creates index on created_at
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_phone text NOT NULL DEFAULT '',
  customer_email text NOT NULL DEFAULT '',
  wilaya_code text NOT NULL DEFAULT '',
  wilaya_name text NOT NULL DEFAULT '',
  address text NOT NULL DEFAULT '',
  notes text,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  subtotal numeric(12,2) NOT NULL DEFAULT 0,
  shipping numeric(12,2) NOT NULL DEFAULT 0,
  total numeric(12,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Only authenticated (admin) can view orders — protects customer privacy
DROP POLICY IF EXISTS "auth_select_orders" ON orders;
CREATE POLICY "auth_select_orders"
ON orders FOR SELECT
TO authenticated
USING (true);

-- Anyone (anon + authenticated) can place an order — no sign-in required
DROP POLICY IF EXISTS "public_insert_orders" ON orders;
CREATE POLICY "public_insert_orders"
ON orders FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated (admin) can update orders (e.g. change status)
DROP POLICY IF EXISTS "auth_update_orders" ON orders;
CREATE POLICY "auth_update_orders"
ON orders FOR UPDATE
TO authenticated
USING (true) WITH CHECK (true);

-- Only authenticated (admin) can delete orders
DROP POLICY IF EXISTS "auth_delete_orders" ON orders;
CREATE POLICY "auth_delete_orders"
ON orders FOR DELETE
TO authenticated
USING (true);

-- Index for sorting orders by date
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders (created_at DESC);