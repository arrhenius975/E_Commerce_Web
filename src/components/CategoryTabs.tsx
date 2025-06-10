
"use client";

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { ProductCategory } from '@/types';
import { Apple, Palette, Pizza, Laptop, LayoutGrid } from 'lucide-react'; // Package for 'all'

interface CategoryTabsProps {
  selectedCategory: ProductCategory;
  onCategoryChange: (category: ProductCategory) => void;
}

const categories: { value: ProductCategory; label: string; icon: React.ElementType }[] = [
  { value: 'all', label: 'All', icon: LayoutGrid },
  { value: 'groceries', label: 'Groceries', icon: Apple },
  { value: 'cosmetics', label: 'Cosmetics', icon: Palette },
  { value: 'fastfood', label: 'Fast Food', icon: Pizza },
  { value: 'tech', label: 'Tech', icon: Laptop },
];

export function CategoryTabs({ selectedCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <Tabs value={selectedCategory} onValueChange={(value) => onCategoryChange(value as ProductCategory)} className="w-full mb-8">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
        {categories.map((category) => (
          <TabsTrigger key={category.value} value={category.value} className="flex items-center gap-2 py-2.5">
            <category.icon className="h-5 w-5" />
            <span className="font-medium">{category.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
