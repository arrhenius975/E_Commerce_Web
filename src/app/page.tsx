
"use client";

import { useState, useEffect, useMemo } from 'react';
import { products as allProductsData } from '@/data/products';
import type { Product, ProductCategory } from '@/types';
import { ProductGrid } from '@/components/ProductGrid';
import { CategoryTabs } from '@/components/CategoryTabs';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';
import { Lightbulb } from 'lucide-react';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>(allProductsData);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const { fetchRecommendations, isLoadingRecommendations, addToViewedProducts } = useAppContext();

  useEffect(() => {
    // Example: Add some products to viewedProducts on load for demo purposes
    // In a real app, this would happen upon user interaction
    if (allProductsData.length > 0) {
      addToViewedProducts(allProductsData[0].id);
      if (allProductsData.length > 1) {
         addToViewedProducts(allProductsData[1].id);
      }
    }
  }, [addToViewedProducts]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return products;
    }
    return products.filter((product) => product.category === selectedCategory);
  }, [products, selectedCategory]);

  const handleCategoryChange = (category: ProductCategory) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <section className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold mb-4 text-primary">Welcome to BoutiqueBox!</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover a curated selection of quality products across groceries, cosmetics, fast food, and tech.
        </p>
      </section>

      <CategoryTabs selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
      
      <ProductGrid products={filteredProducts} />

      <section className="mt-16 py-12 bg-secondary/50 rounded-lg text-center">
        <h2 className="font-headline text-3xl font-bold mb-4">Need Inspiration?</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Let our AI assistant help you find products you'll love based on what you've viewed.
        </p>
        <Button size="lg" onClick={fetchRecommendations} disabled={isLoadingRecommendations}>
          <Lightbulb className="mr-2 h-5 w-5" />
          {isLoadingRecommendations ? 'Getting Recommendations...' : 'Get Personalized Recommendations'}
        </Button>
      </section>
    </div>
  );
}
