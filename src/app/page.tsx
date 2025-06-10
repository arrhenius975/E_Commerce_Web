
"use client";

import { useMemo, useEffect } from 'react';
import { products as allProductsData } from '@/data/products';
import type { Product } from '@/types';
import { ProductGrid } from '@/components/ProductGrid';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';
import { Lightbulb } from 'lucide-react';

export default function HomePage() {
  const { 
    fetchRecommendations, 
    isLoadingRecommendations, 
    addToViewedProducts,
    selectedCategory // Get selectedCategory from context
  } = useAppContext();

  useEffect(() => {
    if (allProductsData.length > 0) {
      addToViewedProducts(allProductsData[0].id);
      if (allProductsData.length > 1) {
         addToViewedProducts(allProductsData[1].id);
      }
    }
  }, [addToViewedProducts]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return allProductsData;
    }
    return allProductsData.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="container mx-auto py-8 px-4">
      <section className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold mb-4 text-primary">Fresh Groceries, Delivered Fast!</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your one-stop shop for fresh meats, vegetables, fruits, bread, and more.
        </p>
      </section>

      {/* CategoryTabs component is removed from here, categories are now in Header */}
      
      <div id="product-grid-section"> {/* Added ID for scrolling */}
        <ProductGrid products={filteredProducts} />
      </div>

      <section className="mt-16 py-12 bg-secondary/50 rounded-lg text-center">
        <h2 className="font-headline text-3xl font-bold mb-4">You might need</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Let our AI assistant help you find products you'll love based on what you've viewed.
        </p>
        <Button size="lg" onClick={fetchRecommendations} disabled={isLoadingRecommendations}>
          <Lightbulb className="mr-2 h-5 w-5" />
          {isLoadingRecommendations ? 'Getting Suggestions...' : 'See Suggestions'}
        </Button>
      </section>
    </div>
  );
}
