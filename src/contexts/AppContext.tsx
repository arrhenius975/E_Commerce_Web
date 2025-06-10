
"use client";

import type { Product, CartItem, WishlistItem, ProductCategory, AppSection, SectionConfig, SectionCategory, SearchFilterType } from '@/types';
import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { generatePersonalizedRecommendations, type PersonalizedRecommendationsOutput } from '@/ai/flows/personalized-recommendations';

// Import section-specific data
import { groceryProducts, groceryCategories } from '@/data/groceryProducts';
import { cosmeticsProducts, cosmeticsCategories } from '@/data/cosmeticsProducts';
import { fastfoodProducts, fastfoodCategories } from '@/data/fastfoodProducts';

const sectionsConfig: Record<AppSection, SectionConfig> = {
  grocery: {
    name: 'Grocery',
    path: '/grocery',
    themeClass: 'theme-grocery',
    products: groceryProducts,
    categories: groceryCategories,
    hero: {
      title: 'Fresh Groceries, Delivered Fast!',
      subtitle: 'Your one-stop shop for fresh meats, vegetables, fruits, bread, and more.'
    }
  },
  cosmetics: {
    name: 'Cosmetics',
    path: '/cosmetics',
    themeClass: 'theme-cosmetics',
    products: cosmeticsProducts,
    categories: cosmeticsCategories,
    hero: {
      title: 'Discover Your Radiance',
      subtitle: 'Explore premium skincare, makeup, and fragrances.'
    }
  },
  fastfood: {
    name: 'Fast Food',
    path: '/fastfood',
    themeClass: 'theme-fastfood',
    products: fastfoodProducts,
    categories: fastfoodCategories,
    hero: {
      title: 'Craveable Classics, Speedy Delivery',
      subtitle: 'Get your favorite burgers, pizzas, and sides in a flash.'
    }
  },
};


interface AppContextType {
  cart: CartItem[];
  wishlist: WishlistItem[];
  viewedProducts: string[];
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isRecommendationsModalOpen: boolean;
  recommendations: Product[];
  isLoadingRecommendations: boolean;

  currentSection: AppSection | null;
  currentSectionConfig: SectionConfig | null;

  selectedCategory: ProductCategory | 'all';
  setSelectedCategory: (category: ProductCategory | 'all') => void;

  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchFilterType: SearchFilterType;
  setSearchFilterType: (filterType: SearchFilterType) => void;

  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;

  addToViewedProducts: (productId: string) => void;

  toggleCart: () => void;
  toggleWishlist: () => void;

  openRecommendationsModal: () => void;
  closeRecommendationsModal: () => void;
  fetchRecommendations: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [currentSection, setCurrentSection] = useState<AppSection | null>(null);
  const [currentSectionConfig, setCurrentSectionConfig] = useState<SectionConfig | null>(null);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [viewedProducts, setViewedProducts] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isRecommendationsModalOpen, setIsRecommendationsModalOpen] = useState(false);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFilterType, setSearchFilterType] = useState<SearchFilterType>('all');

  const { toast } = useToast();

  useEffect(() => {
    if (pathname) {
      let activeSection: AppSection | null = null;
      if (pathname.startsWith('/grocery')) activeSection = 'grocery';
      else if (pathname.startsWith('/cosmetics')) activeSection = 'cosmetics';
      else if (pathname.startsWith('/fastfood')) activeSection = 'fastfood';

      // Determine if the current page is one where section-specific data/search applies
      const isAppFeaturePage = pathname === '/sections' || // Includes section selector
                               pathname.startsWith('/grocery') ||
                               pathname.startsWith('/cosmetics') ||
                               pathname.startsWith('/fastfood');

      if (activeSection && activeSection !== currentSection) {
        // Switching to a new product section
        setCurrentSection(activeSection);
        setCurrentSectionConfig(sectionsConfig[activeSection]);
        setCart([]);
        setWishlist([]);
        setViewedProducts([]);
        setRecommendations([]);
        setSelectedCategory('all');
        setSearchTerm('');
        setSearchFilterType('all');
      } else if (!activeSection && currentSection !== null) {
        // Navigating away from a product section to a global page like /help, /account, or / (new main landing)
        // but not /sections (which is also global-ish but handles search)
        if (pathname !== '/sections') {
            // setCurrentSection(null); // Keep currentSection if navigating to /help etc, header might need it.
            // setCurrentSectionConfig(null); // No, header needs this to show correct "BoutiqueBox" and link to "/"
                                          // The header should look "global" when currentSection is null
        }
        if (!isAppFeaturePage) { // Clear search if navigating to true global pages (not /sections)
            setSearchTerm('');
            setSearchFilterType('all');
        }
      } else if (!activeSection && (pathname === '/' || pathname === '/sections')) {
        // On the new main landing page '/' or the section selector page '/sections'
        // No specific product section is active.
        if (currentSection !== null) { // Was previously in a section, now on / or /sections
            setCurrentSection(null);
            setCurrentSectionConfig(null);
            // Keep search term if on /sections, clear if on new /
            if (pathname === '/') {
              setSearchTerm('');
              setSearchFilterType('all');
            }
             // Reset cart/wishlist etc. when leaving a section for / or /sections
            setCart([]);
            setWishlist([]);
            setViewedProducts([]);
            setRecommendations([]);
            setSelectedCategory('all');
        }
      }

      // General rule: if not on a page where search applies, clear search term
      if (!isAppFeaturePage && searchTerm) {
        setSearchTerm('');
        setSearchFilterType('all');
      }
    }
  }, [pathname, currentSection, searchTerm]);

  const addToCart = useCallback((product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  }, [toast]);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast({
      title: "Removed from Cart",
      description: `Item has been removed from your cart.`,
      variant: "destructive"
    });
  }, [toast]);

  const updateCartQuantity = useCallback((productId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    });
  }, [toast]);

  const addToWishlist = useCallback((product: Product) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.find((item) => item.id === product.id)) {
        toast({
          title: "Already in Wishlist",
          description: `${product.name} is already in your wishlist.`,
        });
        return prevWishlist;
      }
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
      return [...prevWishlist, product];
    });
  }, [toast]);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId));
    toast({
      title: "Removed from Wishlist",
      description: `Item has been removed from your wishlist.`,
      variant: "destructive"
    });
  }, [toast]);

  const addToViewedProducts = useCallback((productId: string) => {
    setViewedProducts((prev) => {
      if (prev.includes(productId)) return prev;
      const newViewed = [...prev, productId];
      return newViewed.slice(-10);
    });
  }, []);

  const toggleCart = useCallback(() => setIsCartOpen(prev => !prev), []);
  const toggleWishlist = useCallback(() => setIsWishlistOpen(prev => !prev), []);
  const openRecommendationsModal = useCallback(() => setIsRecommendationsModalOpen(true), []);
  const closeRecommendationsModal = useCallback(() => setIsRecommendationsModalOpen(false), []);

  const fetchRecommendations = useCallback(async () => {
    if (!currentSectionConfig || viewedProducts.length === 0) {
      toast({
        title: "Not enough data",
        description: "View some products in this section to get personalized recommendations.",
        variant: "destructive",
      });
      return;
    }
    setIsLoadingRecommendations(true);
    try {
      const result: PersonalizedRecommendationsOutput = await generatePersonalizedRecommendations({
        viewedProducts: viewedProducts,
      });
      const recommendedProducts = result.recommendations
        .map(id => currentSectionConfig.products.find(p => p.id === id))
        .filter((p): p is Product => Boolean(p));

      setRecommendations(recommendedProducts);
      if (recommendedProducts.length > 0) {
        openRecommendationsModal();
      } else {
        toast({
          title: "No specific recommendations",
          description: "We couldn't find specific recommendations for you at this time. Explore more products!",
        });
      }
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
      toast({
        title: "Error",
        description: "Could not fetch recommendations.",
        variant: "destructive",
      });
      setRecommendations([]);
    } finally {
      setIsLoadingRecommendations(false);
    }
  }, [viewedProducts, toast, openRecommendationsModal, currentSectionConfig]);

  return (
    <AppContext.Provider
      value={{
        cart,
        wishlist,
        viewedProducts,
        isCartOpen,
        isWishlistOpen,
        isRecommendationsModalOpen,
        recommendations,
        isLoadingRecommendations,
        currentSection,
        currentSectionConfig,
        selectedCategory,
        setSelectedCategory,
        searchTerm,
        setSearchTerm,
        searchFilterType,
        setSearchFilterType,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        addToViewedProducts,
        toggleCart,
        toggleWishlist,
        openRecommendationsModal,
        closeRecommendationsModal,
        fetchRecommendations,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
