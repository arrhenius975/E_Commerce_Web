
// src/app/[section]/[productId]/layout.tsx
"use client";

import { LayoutComponent } from '@/components/Layout';
import { BottomNavBar } from '@/components/BottomNavBar';
import { ThemeManager } from '@/components/ThemeManager';
import { AppSection } from '@/types';
import { useParams } from 'next/navigation'; // Corrected import
import { useEffect } from 'react';
import { useAppContext } from '@/contexts/AppContext'; // Assuming AppContext can set section based on path

const sectionThemeMap: Record<string, string> = {
  grocery: 'theme-grocery',
  cosmetics: 'theme-cosmetics',
  fastfood: 'theme-fastfood',
};

export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const { currentSectionConfig } = useAppContext();
  const section = params?.section as AppSection | undefined;
  
  // Determine theme class: try from currentSectionConfig first (set by AppContext),
  // fallback to params if needed (e.g., direct navigation to product page before context fully updates)
  let themeClass = '';
  if (currentSectionConfig?.themeClass) {
    themeClass = currentSectionConfig.themeClass;
  } else if (section && sectionThemeMap[section]) {
    themeClass = sectionThemeMap[section];
  }

  return (
    <>
      <ThemeManager themeClass={themeClass} />
      <LayoutComponent>
        {children}
      </LayoutComponent>
      <BottomNavBar />
    </>
  );
}
