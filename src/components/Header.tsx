
"use client";

import Link from 'next/link';
import { ShoppingCart, Heart, ShoppingBag, Lightbulb, MapPin, LayoutGrid, Drumstick, Carrot, Grape, Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '@/contexts/AppContext';
import type { ProductCategory } from '@/types';
import { cn } from '@/lib/utils';

const categoriesList: { value: ProductCategory; label: string; icon: React.ElementType }[] = [
  { value: 'all', label: 'All', icon: LayoutGrid },
  { value: 'meats', label: 'Meats', icon: Drumstick },
  { value: 'vegetables', label: 'Vegetables', icon: Carrot },
  { value: 'fruits', label: 'Fruits', icon: Grape },
  { value: 'breads', label: 'Breads', icon: Cookie },
];

export function Header() {
  const { cart, wishlist, toggleCart, toggleWishlist, fetchRecommendations, isLoadingRecommendations, selectedCategory, setSelectedCategory } = useAppContext();

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistItemCount = wishlist.length;

  // Semicircle layout constants
  const numCategories = categoriesList.length;
  const radius = 120; // px, adjust as needed for the semicircle size
  const angleSpan = 140; // degrees, total angle covered by icons
  const startAngle = -angleSpan / 2; // Start angle for the first icon

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Main header bar content */}
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

      {/* Semicircular Category Display */}
      <div className="relative h-20 md:h-28 mt-2 flex justify-center items-end">
        {/* This div creates the visual arc shape. Icons are positioned relative to its center. */}
        {/* It's a bit of a hack for a pure CSS semicircle for icon placement. */}
        {/* A proper SVG path or more complex CSS would be more robust for perfect curves. */}
        <div className="relative w-[280px] h-[70px] sm:w-[360px] sm:h-[90px] md:w-[420px] md:h-[105px]">
          {categoriesList.map((category, index) => {
            const angle = startAngle + (index / (numCategories -1)) * angleSpan;
            const radian = angle * (Math.PI / 180);
            // Adjust x & y for a semicircle opening downwards. We want icons on the top arc of a conceptual circle.
            // The "center" of this conceptual circle is below the container.
            const x = radius * Math.sin(radian);
            const y = -radius * Math.cos(radian) + radius -10; // "+ radius" to bring it up, "-10" to fine-tune vertical position

            return (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={cn(
                  "absolute p-2 rounded-full transition-all duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary",
                  selectedCategory === category.value ? 'bg-primary text-primary-foreground shadow-md scale-110' : 'bg-card text-card-foreground shadow-sm hover:bg-secondary',
                  "w-12 h-12 sm:w-14 sm:h-14 flex flex-col items-center justify-center"
                )}
                style={{
                  left: `calc(50% + ${x}px - 24px)`, // 50% + x, then offset by half icon width (24px for w-12)
                  top: `${y}px`, // y position from the top of the relative container
                  transform: `rotate(${angle}deg)`, // Rotate the button itself slightly if desired, or keep 0
                }}
                title={category.label}
              >
                <category.icon className={cn("h-5 w-5 sm:h-6 sm:w-6 mb-0.5", selectedCategory === category.value ? '' : 'text-primary')} style={{transform: `rotate(${-angle}deg)`}} />
                {/* Text can be hidden on smaller icons or shown below if space allows - simplified here */}
                {/* <span className="text-xs mt-1" style={{transform: `rotate(${-angle}deg)`}} >{category.label}</span> */}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
