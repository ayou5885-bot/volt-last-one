export interface Product {
  id: string;
  brand: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  image: string;
  shortDescription: string;
  description: string;
  specifications: { label: string; value: string }[];
  //features: string[];
  availability: 'in-stock' | 'low-stock' | 'out-of-stock';
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface Brand {
  id: string;
  name: string;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';

export interface CartItem {
  product: Product;
  quantity: number;
}
