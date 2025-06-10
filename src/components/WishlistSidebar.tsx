
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { useAppContext } from '@/contexts/AppContext';
import { X, ShoppingCart } from 'lucide-react';

export function WishlistSidebar() {
  const { wishlist, isWishlistOpen, toggleWishlist, removeFromWishlist, addToCart } = useAppContext();

  const handleMoveToCart = (item: typeof wishlist[0]) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  return (
    <Sheet open={isWishlistOpen} onOpenChange={toggleWishlist}>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader className="pr-6">
          <SheetTitle>Your Wishlist</SheetTitle>
        </SheetHeader>
        {wishlist.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center">
            <p className="text-muted-foreground">Your wishlist is empty.</p>
             <SheetClose asChild>
                <Button variant="link" className="mt-4">Discover Products</Button>
            </SheetClose>
          </div>
        ) : (
          <ScrollArea className="flex-1 pr-6">
            <div className="space-y-4 py-4">
              {wishlist.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-md border">
                    <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                    <Button variant="outline" size="sm" className="mt-2" onClick={() => handleMoveToCart(item)}>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Move to Cart
                    </Button>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeFromWishlist(item.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
}
