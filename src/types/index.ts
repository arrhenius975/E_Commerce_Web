
export type ProductCategory = 'all' | 'meats' | 'vegetables' | 'fruits' | 'breads';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: ProductCategory;
  'data-ai-hint': string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface WishlistItem extends Product {}
