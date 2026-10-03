/*
# Create products table schema and policies

1. Creates the products table with all columns
2. Enables RLS
3. Adds 4 CRUD policies (public read, authenticated write)
4. Creates indexes on slug, category, featured
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand text NOT NULL DEFAULT '',
  name text NOT NULL,
  slug text NOT NULL,
  category text NOT NULL DEFAULT '',
  price numeric(12,2) NOT NULL DEFAULT 0,
  image text NOT NULL DEFAULT '',
  short_description text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  specifications jsonb NOT NULL DEFAULT '[]'::jsonb,
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  availability text NOT NULL DEFAULT 'in-stock' CHECK (availability IN ('in-stock', 'low-stock', 'out-of-stock')),
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Public read: anyone can browse products
DROP POLICY IF EXISTS "public_select_products" ON products;
CREATE POLICY "public_select_products"
ON products FOR SELECT
TO anon, authenticated
USING (true);

-- Only authenticated (admin) can insert products
DROP POLICY IF EXISTS "auth_insert_products" ON products;
CREATE POLICY "auth_insert_products"
ON products FOR INSERT
TO authenticated
WITH CHECK (true);

-- Only authenticated (admin) can update products
DROP POLICY IF EXISTS "auth_update_products" ON products;
CREATE POLICY "auth_update_products"
ON products FOR UPDATE
TO authenticated
USING (true) WITH CHECK (true);

-- Only authenticated (admin) can delete products
DROP POLICY IF EXISTS "auth_delete_products" ON products;
CREATE POLICY "auth_delete_products"
ON products FOR DELETE
TO authenticated
USING (true);

-- Indexes
CREATE UNIQUE INDEX IF NOT EXISTS products_slug_idx ON products (slug);
CREATE INDEX IF NOT EXISTS products_category_idx ON products (category);
CREATE INDEX IF NOT EXISTS products_featured_idx ON products (featured) WHERE featured = true;