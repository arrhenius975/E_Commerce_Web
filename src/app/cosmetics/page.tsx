
"use client";

import { useMemo, useEffect } from 'react';
import { ProductGrid } from '@/components/ProductGrid';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';
import { Lightbulb } from 'lucide-react';

export default function CosmeticsHomePage() {
  const { 
    currentSectionConfig,
    fetchRecommendations, 
    isLoadingRecommendations, 
    addToViewedProducts,
    selectedCategory,
    searchTerm,
    searchFilterType // Get searchFilterType from context
  } = useAppContext();

  const allProductsData = currentSectionConfig?.products || [];

  useEffect(() => {
    if (allProductsData.length > 0) {
      addToViewedProducts(allProductsData[0].id);
      if (allProductsData.length > 1) {
         addToViewedProducts(allProductsData[1].id);
      }
    }
  }, [addToViewedProducts, allProductsData]);

  const filteredProducts = useMemo(() => {
    if (!allProductsData) return [];
    let products = allProductsData;

    if (selectedCategory !== 'all' && selectedCategory) {
      products = products.filter((product) => product.category === selectedCategory);
    }

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      products = products.filter(product => {
        const nameMatch = product.name.toLowerCase().includes(lowerSearchTerm);
        const descriptionMatch = product.description.toLowerCase().includes(lowerSearchTerm);

        if (searchFilterType === 'name') {
          return nameMatch;
        }
        if (searchFilterType === 'description') {
          return descriptionMatch;
        }
        // Default 'all'
        return nameMatch || descriptionMatch;
      });
    }
    return products;
  }, [selectedCategory, allProductsData, searchTerm, searchFilterType]);

  if (!currentSectionConfig) {
    return <div>Loading section...</div>;
  }
  
  const { hero } = currentSectionConfig;

  return (
    <div className="container mx-auto py-8 px-4">
      <section className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold mb-4 text-primary">{hero.title}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {hero.subtitle}
        </p>
      </section>
      
      <div id="product-grid-section">
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
