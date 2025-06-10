
import type { Product, SectionCategory } from '@/types';
import { LayoutGrid, Utensils, Pizza, CupSoda, Vegan } from 'lucide-react'; // Using Vegan for Sides (generic food icon)

export const fastfoodCategories: SectionCategory[] = [
  { value: 'all', label: 'All', icon: LayoutGrid },
  { value: 'burgers', label: 'Burgers', icon: Utensils }, // Utensils is a bit generic, could be a custom SVG for a burger
  { value: 'pizza', label: 'Pizza', icon: Pizza },
  { value: 'sides', label: 'Sides', icon: Vegan }, // Placeholder for sides like fries, nuggets
  { value: 'drinks', label: 'Drinks', icon: CupSoda },
];

export const fastfoodProducts: Product[] = [
  // Burgers
  {
    id: 'ff-b1',
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty, cheddar cheese, lettuce, tomato, and special sauce.',
    price: 8.99,
    image: 'https://placehold.co/400x300.png',
    category: 'burgers',
    'data-ai-hint': 'cheeseburger fastfood',
  },
  {
    id: 'ff-b2',
    name: 'Spicy Chicken Burger',
    description: 'Crispy chicken fillet, spicy mayo, and pickles.',
    price: 9.50,
    image: 'https://placehold.co/400x300.png',
    category: 'burgers',
    'data-ai-hint': 'chicken burger',
  },
  // Pizza
  {
    id: 'ff-p1',
    name: 'Pepperoni Pizza',
    description: '12-inch classic pepperoni pizza with mozzarella.',
    price: 14.00,
    image: 'https://placehold.co/400x300.png',
    category: 'pizza',
    'data-ai-hint': 'pepperoni pizza',
  },
  {
    id: 'ff-p2',
    name: 'Margherita Pizza',
    description: '12-inch traditional Margherita with fresh basil.',
    price: 12.50,
    image: 'https://placehold.co/400x300.png',
    category: 'pizza',
    'data-ai-hint': 'margherita pizza',
  },
  // Sides
  {
    id: 'ff-s1',
    name: 'Crispy French Fries',
    description: 'Golden crispy french fries, large portion.',
    price: 4.50,
    image: 'https://placehold.co/400x300.png',
    category: 'sides',
    'data-ai-hint': 'french fries',
  },
  // Drinks
  {
    id: 'ff-d1',
    name: 'Cola Classic',
    description: 'Chilled 500ml bottle of classic cola.',
    price: 2.50,
    image: 'https://placehold.co/400x300.png',
    category: 'drinks',
    'data-ai-hint': 'cola drink',
  },
];
