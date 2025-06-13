
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

export type SearchFilterType = 'all' | 'name' | 'description';

// Added for Admin/Order features (mock structures)
export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'editor'; // Example roles
}

export interface OrderItemSummary {
  productId: string;
  name: string;
  quantity: number;
  price: number; // Price at time of purchase
  image: string;
}
export interface Order {
  id: string;
  userId: string; // Link to user
  date: string; // ISO date string
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: OrderItemSummary[];
  totalAmount: number;
  shippingAddress: string; // Simplified
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  authorName: string;
  rating: number; // 1-5
  comment: string;
  date: string; // ISO date string
}
