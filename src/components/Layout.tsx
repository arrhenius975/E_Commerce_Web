
"use client";

import React from 'react';
import { Header } from '@/components/Header';
import { CartSidebar } from '@/components/CartSidebar';
import { WishlistSidebar } from '@/components/WishlistSidebar';
import { PersonalizedRecommendationsModal } from '@/components/PersonalizedRecommendationsModal';

interface LayoutProps {
  children: React.ReactNode;
}

export function LayoutComponent({ children }: LayoutProps) { // Renamed to LayoutComponent
  return (
    // Add pb-16 (padding-bottom: 4rem, height of BottomNavBar) to main content area if BottomNavBar is fixed and overlaps
    <div className="flex min-h-screen flex-col pb-16 md:pb-0"> {/* Added padding for bottom nav on mobile */}
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <CartSidebar />
      <WishlistSidebar />
      <PersonalizedRecommendationsModal />
      <footer className="py-6 md:px-8 md:py-0 border-t hidden md:block"> {/* Hide footer on mobile if bottom nav is present */}
        <div className="container flex flex-col items-center justify-center gap-4 md:h-20 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} BoutiqueBox. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
