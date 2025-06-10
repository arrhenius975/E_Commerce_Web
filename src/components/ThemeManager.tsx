
"use client";

import { useEffect } from 'react';

interface ThemeManagerProps {
  themeClass: string;
}

export function ThemeManager({ themeClass }: ThemeManagerProps) {
  useEffect(() => {
    // Clear previous theme classes
    document.documentElement.classList.remove('theme-grocery', 'theme-cosmetics', 'theme-fastfood');
    // Add current theme class
    if (themeClass) {
      document.documentElement.classList.add(themeClass);
    }
    // Handle dark mode separately if needed, or ensure theme classes also handle dark mode specifics.
    // For now, assuming theme classes correctly invert for .dark
  }, [themeClass]);

  return null; // This component does not render anything
}
