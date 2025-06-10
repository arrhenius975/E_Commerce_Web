
"use client";

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useAppContext } from '@/contexts/AppContext';
import { ProductCard } from './ProductCard'; // Re-use ProductCard for consistency
import { ScrollArea } from './ui/scroll-area';

export function PersonalizedRecommendationsModal() {
  const { isRecommendationsModalOpen, closeRecommendationsModal, recommendations, isLoadingRecommendations } = useAppContext();

  return (
    <Dialog open={isRecommendationsModalOpen} onOpenChange={closeRecommendationsModal}>
      <DialogContent className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Personalized Recommendations</DialogTitle>
          <DialogDescription>
            Here are some products we think you might like based on your activity.
          </DialogDescription>
        </DialogHeader>
        {isLoadingRecommendations ? (
           <div className="flex-grow flex items-center justify-center">
            <p>Loading recommendations...</p>
           </div>
        ) : recommendations.length > 0 ? (
          <ScrollArea className="flex-grow pr-2 -mr-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
              {recommendations.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex-grow flex items-center justify-center">
            <p className="text-muted-foreground">No recommendations available right now. Keep exploring!</p>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={closeRecommendationsModal}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
