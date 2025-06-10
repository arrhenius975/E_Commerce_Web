
// Represents sub-categories within a main section (Grocery, Cosmetics, FastFood)
// 'all' is a general filter, specific sub-categories follow.
export type ProductCategory =
  | 'all'
  // Grocery
  | 'meats'
  | 'vegetables'
  | 'fruits'
  | 'breads'
  // Cosmetics
  | 'skincare'
  | 'makeup'
  | 'fragrance'
  // Fast Food
  | 'burgers'
  | 'pizza'
  | 'sides'
  | 'drinks';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: ProductCategory; // This is the sub-category
  'data-ai-hint': string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface WishlistItem extends Product {}

// Represents the main sections of the app
export type AppSection = 'grocery' | 'cosmetics' | 'fastfood';

export interface SectionCategory {
  value: ProductCategory;
  label: string;
  icon: React.ElementType; // Lucide icon component
}

export interface SectionConfig {
  name: string;
  path: string;
  themeClass: string;
  products: Product[];
  categories: SectionCategory[];
  hero: {
    title: string;
    subtitle: string;
  };
}
