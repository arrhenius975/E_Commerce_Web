
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
    <header className="sticky top-0 z-40 w-full border-b border-[hsl(var(--header-bg-hsl)/0.5)] bg-[hsl(var(--header-bg-hsl)/0.85)] text-[hsl(var(--header-fg-hsl))] backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--header-bg-hsl)/0.65)]">
      {/* Main header bar content */}
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-[hsl(var(--header-fg-hsl))]">
            <ShoppingBag className="h-7 w-7" />
            <span className="font-headline text-2xl font-bold">BoutiqueBox</span>
          </Link>
          <div className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>Delivering to: California, USA</span>
          </div>
        </div>
        <nav className="flex items-center gap-2 sm:gap-4 text-[hsl(var(--header-fg-hsl))]">
          <Button
            variant="ghost"
            size="icon"
            onClick={fetchRecommendations}
            aria-label="Get Personalized Recommendations"
            disabled={isLoadingRecommendations}
            title="Personalized Recommendations"
            className="hover:bg-[hsl(var(--header-fg-hsl)/0.1)] focus-visible:ring-[hsl(var(--header-fg-hsl))]"
          >
            <Lightbulb className="h-6 w-6" />
            {isLoadingRecommendations && <span className="sr-only">Loading recommendations...</span>}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleWishlist}
            aria-label="Open Wishlist"
            className="relative hover:bg-[hsl(var(--header-fg-hsl)/0.1)] focus-visible:ring-[hsl(var(--header-fg-hsl))]"
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
            className="relative hover:bg-[hsl(var(--header-fg-hsl)/0.1)] focus-visible:ring-[hsl(var(--header-fg-hsl))]"
            title="Shopping Cart"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartItemCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0 text-xs bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]">
                {cartItemCount}
              </Badge>
            )}
          </Button>
        </nav>
      </div>

      {/* Semicircular Category Display */}
      <div className="relative h-20 md:h-28 mt-2 flex justify-center items-end">
        <div className="relative w-[280px] h-[70px] sm:w-[360px] sm:h-[90px] md:w-[420px] md:h-[105px]">
          {categoriesList.map((category, index) => {
            const angle = startAngle + (index / (numCategories -1)) * angleSpan;
            const radian = angle * (Math.PI / 180);
            const x = radius * Math.sin(radian);
            const y = -radius * Math.cos(radian) + radius -10; 

            return (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={cn(
                  "absolute p-2 rounded-full transition-all duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring", // ring is general, specific ring might be needed
                  selectedCategory === category.value ? 'bg-primary text-primary-foreground shadow-md scale-110' : 'bg-card text-card-foreground shadow-sm hover:bg-secondary',
                  "w-12 h-12 sm:w-14 sm:h-14 flex flex-col items-center justify-center"
                )}
                style={{
                  left: `calc(50% + ${x}px - 24px)`, 
                  top: `${y}px`, 
                  transform: `rotate(${angle}deg)`, 
                }}
                title={category.label}
              >
                <category.icon className={cn("h-5 w-5 sm:h-6 sm:w-6 mb-0.5", selectedCategory === category.value ? '' : 'text-primary')} style={{transform: `rotate(${-angle}deg)`}} />
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
