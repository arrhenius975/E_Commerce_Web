
"use client";

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { ProductCategory } from '@/types';
import { LayoutGrid, Drumstick, Carrot, Grape, Cookie } from 'lucide-react';

interface CategoryTabsProps {
  selectedCategory: ProductCategory;
  onCategoryChange: (category: ProductCategory) => void;
}

const categories: { value: ProductCategory; label: string; icon: React.ElementType }[] = [
  { value: 'all', label: 'All', icon: LayoutGrid },
  { value: 'meats', label: 'Meats', icon: Drumstick },
  { value: 'vegetables', label: 'Vegetables', icon: Carrot },
  { value: 'fruits', label: 'Fruits', icon: Grape },
  { value: 'breads', label: 'Breads', icon: Cookie },
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
