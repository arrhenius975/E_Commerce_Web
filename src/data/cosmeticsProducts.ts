
import type { Product, SectionCategory } from '@/types';
import { LayoutGrid, SprayCan, Sparkles, Gem } from 'lucide-react'; // Using Gem for Fragrance, Sparkles for Makeup, SprayCan for Skincare (general cosmetic)

export const cosmeticsCategories: SectionCategory[] = [
  { value: 'all', label: 'All', icon: LayoutGrid },
  { value: 'skincare', label: 'Skincare', icon: SprayCan },
  { value: 'makeup', label: 'Makeup', icon: Sparkles },
  { value: 'fragrance', label: 'Fragrance', icon: Gem },
];

export const cosmeticsProducts: Product[] = [
  // Skincare
  {
    id: 'c-s1',
    name: 'Hydrating Face Cream',
    description: 'Rich moisturizing cream for all skin types, 50ml.',
    price: 24.99,
    image: 'https://placehold.co/400x300.png',
    category: 'skincare',
    'data-ai-hint': 'face cream',
  },
  {
    id: 'c-s2',
    name: 'Vitamin C Serum',
    description: 'Brightening serum with 15% Vitamin C, 30ml.',
    price: 32.50,
    image: 'https://placehold.co/400x300.png',
    category: 'skincare',
    'data-ai-hint': 'skincare serum',
  },
  // Makeup
  {
    id: 'c-m1',
    name: 'Velvet Matte Lipstick',
    description: 'Long-lasting matte lipstick, shade "Ruby Red".',
    price: 18.00,
    image: 'https://placehold.co/400x300.png',
    category: 'makeup',
    'data-ai-hint': 'lipstick red',
  },
  {
    id: 'c-m2',
    name: 'HD Liquid Foundation',
    description: 'Full coverage foundation with a natural finish, 30ml.',
    price: 29.99,
    image: 'https://placehold.co/400x300.png',
    category: 'makeup',
    'data-ai-hint': 'foundation makeup',
  },
  // Fragrance
  {
    id: 'c-f1',
    name: 'Eau de Parfum "Mystique"',
    description: 'Elegant floral and woody scent, 100ml.',
    price: 75.00,
    image: 'https://placehold.co/400x300.png',
    category: 'fragrance',
    'data-ai-hint': 'perfume bottle',
  },
  {
    id: 'c-f2',
    name: 'Citrus Bliss Body Mist',
    description: 'Refreshing citrus body mist, 200ml.',
    price: 15.50,
    image: 'https://placehold.co/400x300.png',
    category: 'fragrance',
    'data-ai-hint': 'body mist',
  },
];
