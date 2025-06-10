
import type { Product } from '@/types';

export const products: Product[] = [
  // Meats
  {
    id: 'm1',
    name: 'Chicken Breast',
    description: 'Boneless, skinless chicken breast, 1 lb.',
    price: 7.99,
    image: 'https://placehold.co/400x300.png',
    category: 'meats',
    'data-ai-hint': 'chicken meat',
  },
  {
    id: 'm2',
    name: 'Ground Beef',
    description: '80/20 ground beef, 1 lb.',
    price: 6.49,
    image: 'https://placehold.co/400x300.png',
    category: 'meats',
    'data-ai-hint': 'beef mince',
  },
  // Vegetables
  {
    id: 'v1',
    name: 'Beetroot',
    description: 'Fresh organic beetroot, bunch of 3.',
    price: 2.99,
    image: 'https://placehold.co/400x300.png',
    category: 'vegetables',
    'data-ai-hint': 'beetroot vegetable',
  },
  {
    id: 'v2',
    name: 'Italian Avocado',
    description: 'Creamy Italian avocados, ripe and ready to eat, pack of 2.',
    price: 4.50,
    image: 'https://placehold.co/400x300.png',
    category: 'vegetables', // Often treated as a fruit botanically, but culinarily as a vegetable.
    'data-ai-hint': 'avocado green',
  },
  {
    id: 'v3',
    name: 'Deshi Gajor (Carrots)',
    description: 'Sweet and crunchy Deshi carrots, 1 lb bag.',
    price: 1.99,
    image: 'https://placehold.co/400x300.png',
    category: 'vegetables',
    'data-ai-hint': 'carrots orange',
  },
  {
    id: 'v4',
    name: 'Organic Spinach',
    description: 'Fresh organic spinach, 10 oz container.',
    price: 3.99,
    image: 'https://placehold.co/400x300.png',
    category: 'vegetables',
    'data-ai-hint': 'spinach leafy',
  },
  // Fruits
  {
    id: 'f1',
    name: 'Organic Apples',
    description: 'Crisp and sweet organic Gala apples, pack of 6.',
    price: 4.99,
    image: 'https://placehold.co/400x300.png',
    category: 'fruits',
    'data-ai-hint': 'apples red',
  },
  {
    id: 'f2',
    name: 'Bananas',
    description: 'A bunch of ripe bananas, approximately 5-7.',
    price: 2.50,
    image: 'https://placehold.co/400x300.png',
    category: 'fruits',
    'data-ai-hint': 'bananas yellow',
  },
  {
    id: 'f3',
    name: 'Oranges',
    description: 'Juicy navel oranges, pack of 4.',
    price: 3.20,
    image: 'https://placehold.co/400x300.png',
    category: 'fruits',
    'data-ai-hint': 'oranges citrus',
  },
  // Breads
  {
    id: 'b1',
    name: 'Whole Wheat Bread',
    description: 'Sliced whole wheat bread, perfect for sandwiches.',
    price: 3.49,
    image: 'https://placehold.co/400x300.png',
    category: 'breads',
    'data-ai-hint': 'bread sliced',
  },
  {
    id: 'b2',
    name: 'Sourdough Loaf',
    description: 'Artisan sourdough bread with a crusty exterior.',
    price: 5.99,
    image: 'https://placehold.co/400x300.png',
    category: 'breads',
    'data-ai-hint': 'sourdough artisan',
  },
  {
    id: 'b3',
    name: 'Fresh Baguette',
    description: 'Classic French baguette, baked fresh daily.',
    price: 2.99,
    image: 'https://placehold.co/400x300.png',
    category: 'breads',
    'data-ai-hint': 'baguette french',
  }
];
