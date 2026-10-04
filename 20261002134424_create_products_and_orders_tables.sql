/*
# Create products and orders tables for VOLT computer hardware store

## Overview
Creates the core database schema for an e-commerce computer hardware store.
This is a single-tenant store with no user authentication — all product data
is public (readable by anyone), and orders can be submitted by anyone visiting
the site (anon + authenticated).

## New Tables

### 1. products
Stores the store's product catalog. Each product represents a computer hardware
item (laptops, desktop PCs, components, peripherals, accessories).
- `id` — UUID primary key
- `brand` — Brand name (e.g. "acer", "hp", "Apple")
- `name` — Full product name
- `slug` — URL-friendly unique identifier used in product detail pages
- `category` — Category slug (e.g. "laptops", "gaming-pcs", "monitors")
- `price` — Price in the store's currency (numeric, 2 decimal places)
- `image` — Full URL to the product image
- `short_description` — One-line summary shown in product cards
- `description` — Full product description shown on the detail page
- `specifications` — JSON array of {label, value} spec entries
- `features` — JSON array of feature highlight strings
- `availability` — Stock status: 'in-stock', 'low-stock', 'out-of-stock'
- `featured` — Boolean flag for homepage "Top picks" section
- `created_at` — Timestamp of creation

### 2. orders
Stores customer orders submitted through the checkout form. Each order captures
the customer's contact info, shipping address, and a snapshot of the items
ordered at the time of purchase.
- `id` — UUID primary key
- `customer_name` — Full name of the customer
- `customer_phone` — Phone number
- `customer_email` — Email address
- `wilaya_code` — Algerian wilaya code (e.g. "16" for Alger)
- `wilaya_name` — Human-readable wilaya name (localized)
- `address` — Delivery address
- `notes` — Optional order notes (nullable)
- `items` — JSON array of {productId, name, brand, price, quantity} snapshots
- `subtotal` — Subtotal amount (numeric)
- `shipping` — Shipping cost (numeric)
- `total` — Total amount including shipping (numeric)
- `status` — Order status: defaults to 'pending'
- `created_at` — Timestamp of order submission

## Security (Row Level Security)

### products table
- RLS enabled
- SELECT: public (anon + authenticated) — anyone browsing the store can see products
- INSERT/UPDATE/DELETE: restricted to authenticated users (store admin manages catalog)
  Note: the app has no admin UI yet, but these policies are in place so a future
  admin panel with Supabase auth can manage products. The anon frontend only reads.

### orders table
- RLS enabled
- SELECT: authenticated only — customers can't browse other people's orders
- INSERT: public (anon + authenticated) — anyone can place an order without signing in
- UPDATE/DELETE: authenticated only — only admin can modify or remove orders

## Indexes
- products.slug — unique index for fast slug lookups on product detail pages
- products.category — index for filtering by category on the shop page
- products.featured — index for efficiently fetching featured products
- orders.created_at — index for sorting orders by date in admin views

## Important Notes
1. This is a NO-AUTH store. The frontend uses the anon key. Products are publicly
   readable via `TO anon, authenticated` SELECT policy. Orders can be inserted
   by anyone via `TO anon, authenticated` INSERT policy.
2. Orders are NOT publicly readable — only authenticated (admin) users can view them.
   This protects customer privacy.
3. Product management (insert/update/delete) requires authentication — only a
   future admin panel with Supabase Auth can modify the catalog.
4. Prices use numeric(12,2) to accommodate large DZD values (up to 99 billion).
*/