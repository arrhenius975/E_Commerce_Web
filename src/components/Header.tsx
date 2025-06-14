
"use client";

import Link from 'next/link';
import { ShoppingCart, Heart, ShoppingBag, Lightbulb, MapPin, Search as SearchIcon, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAppContext } from '@/contexts/AppContext';
import type { SectionCategory, SearchFilterType } from '@/types';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const {
    cart,
    wishlist,
    toggleCart,
    toggleWishlist,
    fetchRecommendations,
    isLoadingRecommendations,
    selectedCategory,
    setSelectedCategory,
    currentSectionConfig,
    currentSection,
    searchTerm,
    setSearchTerm,
    searchFilterType,
    setSearchFilterType,
  } = useAppContext();
  const pathname = usePathname();

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistItemCount = wishlist.length;

  const categoriesList: SectionCategory[] = currentSectionConfig?.categories || [];
  const sectionName = currentSectionConfig?.name || 'BoutiqueBox';
  const sectionPath = currentSectionConfig?.path || '/';


  const isAppFeaturePage = pathname === '/sections' || // Search enabled on section selector
                           pathname.startsWith('/grocery') ||
                           pathname.startsWith('/cosmetics') ||
                           pathname.startsWith('/fastfood');

  useEffect(() => {
    // AppContext now handles resetting search term for non-feature pages
  }, [pathname, setSearchTerm]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const headerHeight = headerRef.current?.offsetHeight || 100;

      if (currentScrollY <= 10) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > headerHeight * 0.5) {
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsHeaderVisible(true);
      }
      setLastScrollY(currentScrollY <= 0 ? 0 : currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);


  const numCategories = categoriesList.length;
  const categoryArcRadius = 80;
  const yOffsetForArc = 5;
  const angleSpan = numCategories > 1 ? 180 : 0;
  const startAngle = numCategories > 1 ? -angleSpan / 2 : 0;
  const iconPixelWidth = 48;


  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-opacity-65",
        "rounded-b-[50px]",
        currentSectionConfig && currentSection
          ? "bg-[hsl(var(--header-bg-hsl)/0.85)] text-[hsl(var(--header-fg-hsl))] supports-[backdrop-filter]:bg-[hsl(var(--header-bg-hsl)/0.65)]"
          : "bg-background/85 text-foreground supports-[backdrop-filter]:bg-background/65", // Default for /sections or new /
        "transition-transform duration-300 ease-in-out",
        !isHeaderVisible && "-translate-y-full"
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-2 md:gap-4">
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <Link
            href={currentSection ? sectionPath : "/"} // Links to section home or main app home
            className={cn(
              "flex items-center gap-2",
              currentSectionConfig ? "text-[hsl(var(--header-fg-hsl))]" : "text-foreground"
            )}
          >
            <ShoppingBag className="h-7 w-7" />
            <span className="font-headline text-xl md:text-2xl font-bold">{sectionName}</span>
          </Link>
          {currentSection && ( // Only show "Delivering to" if in a specific section
            <div className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Delivering to: CA, USA</span>
            </div>
          )}
        </div>

        {isAppFeaturePage && ( // Search bar shown on /sections and section homepages
          <div className="flex-1 min-w-0 px-2 md:px-4">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto flex items-center">
              <SearchIcon className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="Search..."
                className={cn(
                  "w-full rounded-lg bg-transparent py-2 pl-8 h-9 text-sm",
                  (currentSectionConfig && currentSection) ? "border-[hsl(var(--header-fg-hsl)/0.3)] text-[hsl(var(--header-fg-hsl))] placeholder:text-[hsl(var(--header-fg-hsl)/0.7)] focus:bg-[hsl(var(--background))] focus:text-foreground" : "border-input placeholder:text-muted-foreground focus:bg-background/50",
                  (currentSectionConfig && currentSection) ? "pr-10" : "pr-2" // More padding if filter is present (only in sections)
                )}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {(currentSectionConfig && currentSection) && ( // Filter only shown inside a specific product section
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7",
                        (currentSectionConfig && currentSection) ? "text-[hsl(var(--header-fg-hsl)/0.8)] hover:bg-[hsl(var(--header-fg-hsl)/0.1)] hover:text-[hsl(var(--header-fg-hsl))]" : "text-muted-foreground hover:bg-accent/10 hover:text-accent-foreground"
                      )}
                      aria-label="Search filter options"
                    >
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[180px]">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={searchFilterType} onValueChange={(value) => setSearchFilterType(value as SearchFilterType)}>
                      <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="name">Product Name</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="description">Description</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        )}

        <nav className={cn(
          "flex items-center gap-1 sm:gap-2 shrink-0",
           (currentSectionConfig && currentSection) ? "text-[hsl(var(--header-fg-hsl))]" : "text-foreground"
        )}>
          {currentSection && ( // Recommendations only shown inside a specific section
            <Button
              variant="ghost"
              size="icon"
              onClick={fetchRecommendations}
              aria-label="Get Personalized Recommendations"
              disabled={isLoadingRecommendations}
              title="Personalized Recommendations"
              className={cn("hover:bg-opacity-10 focus-visible:ring-current", (currentSectionConfig && currentSection) ? "hover:bg-[hsl(var(--header-fg-hsl)/0.1)] focus-visible:ring-[hsl(var(--header-fg-hsl))]" : "hover:bg-accent/10 focus-visible:ring-foreground")}
            >
              <Lightbulb className="h-5 w-5 md:h-6 md:w-6" />
              {isLoadingRecommendations && <span className="sr-only">Loading...</span>}
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleWishlist}
            aria-label="Open Wishlist"
            className={cn("relative hover:bg-opacity-10 focus-visible:ring-current", (currentSectionConfig && currentSection) ? "hover:bg-[hsl(var(--header-fg-hsl)/0.1)] focus-visible:ring-[hsl(var(--header-fg-hsl))]" : "hover:bg-accent/10 focus-visible:ring-foreground")}
            title="Wishlist"
          >
            <Heart className="h-5 w-5 md:h-6 md:w-6" />
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
            className={cn("relative hover:bg-opacity-10 focus-visible:ring-current", (currentSectionConfig && currentSection) ? "hover:bg-[hsl(var(--header-fg-hsl)/0.1)] focus-visible:ring-[hsl(var(--header-fg-hsl))]" : "hover:bg-accent/10 focus-visible:ring-foreground")}
            title="Shopping Cart"
          >
            <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />
            {cartItemCount > 0 && (
              <Badge className={cn("absolute -top-1 -right-1 h-5 w-5 justify-center p-0 text-xs", (currentSectionConfig && currentSection) ? "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]" : "bg-accent text-accent-foreground" )}>
                {cartItemCount}
              </Badge>
            )}
          </Button>
        </nav>
      </div>

      {currentSection && categoriesList.length > 0 && ( // Category arc only shown inside a specific section
         <div className="relative h-36 md:h-40 mt-2 flex justify-center items-start"> {/* Increased height */}
          <div className="relative w-[280px] h-[140px] sm:w-[360px] sm:h-[140px] md:w-[420px] md:h-[140px]"> {/* Increased height */}
            {categoriesList.map((category, index) => {
              const angle = numCategories > 1 ? startAngle + (index / (numCategories - 1)) * angleSpan : 0;
              const radian = angle * (Math.PI / 180);

              const x = categoryArcRadius * Math.sin(radian);
              const y = categoryArcRadius * (1 - Math.cos(radian)) + yOffsetForArc;

              const iconSizeClass = "w-12 h-12 sm:w-14 sm:h-14";

              return (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={cn(
                    "absolute p-2 rounded-full transition-all duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-2",
                    (currentSectionConfig && currentSection) ? "focus:ring-[hsl(var(--ring))]" : "focus:ring-ring",
                    selectedCategory === category.value
                      ? 'bg-primary text-primary-foreground shadow-md scale-110'
                      : 'bg-[hsl(var(--primary)/0.15)] shadow-sm hover:bg-[hsl(var(--primary)/0.3)]',
                    iconSizeClass,
                    "flex flex-col items-center justify-center"
                  )}
                  style={{
                    left: `calc(50% + ${x}px - ${iconPixelWidth / 2}px)`,
                    top: `${y}px`,
                    transform: `rotate(${angle}deg)`,
                  }}
                  title={category.label}
                >
                  <category.icon
                    className={cn(
                      "h-5 w-5 sm:h-6 sm:h-6 mb-0.5",
                      selectedCategory === category.value ? ((currentSectionConfig && currentSection) ? '' : 'text-primary-foreground') : ((currentSectionConfig && currentSection) ? 'text-primary' : 'text-primary')
                    )} style={{transform: `rotate(${-angle}deg)`}} />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
