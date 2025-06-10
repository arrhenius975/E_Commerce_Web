
"use client";

import Link from 'next/link';
import { ShoppingCart, Heart, ShoppingBag, Lightbulb, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '@/contexts/AppContext';

export function Header() {
  const { cart, wishlist, toggleCart, toggleWishlist, fetchRecommendations, isLoadingRecommendations } = useAppContext();

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistItemCount = wishlist.length;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <ShoppingBag className="h-7 w-7 text-primary" />
            <span className="font-headline text-2xl font-bold text-primary">BoutiqueBox</span>
          </Link>
          <div className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>Delivering to: California, USA</span>
          </div>
        </div>
        <nav className="flex items-center gap-2 sm:gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={fetchRecommendations}
            aria-label="Get Personalized Recommendations"
            disabled={isLoadingRecommendations}
            title="Personalized Recommendations"
          >
            <Lightbulb className="h-6 w-6" />
             {isLoadingRecommendations && <span className="sr-only">Loading recommendations...</span>}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleWishlist}
            aria-label="Open Wishlist"
            className="relative"
            title="Wishlist"
          >
            <Heart className="h-6 w-6" />
            {wishlistItemCount > 0 && (
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0 text-xs">
                {wishlistItemCount}
              </Badge>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCart}
            aria-label="Open Shopping Cart"
            className="relative"
            title="Shopping Cart"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartItemCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0 text-xs">
                {cartItemCount}
              </Badge>
            )}
          </Button>
        </nav>
      </div>
    </header>
  );
}
