
// src/app/help/layout.tsx
import { LayoutComponent } from '@/components/Layout';
import { BottomNavBar } from '@/components/BottomNavBar';
import { ThemeManager } from '@/components/ThemeManager';

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Help page can use the default theme or a specific one if desired.
  // Using default (no specific theme class means it inherits from html or body, or :root styles)
  // Or, to ensure a consistent theme for global pages:
  // <ThemeManager themeClass="theme-grocery" /> 
  return (
    <>
      <ThemeManager themeClass="" /> {/* Clears section-specific themes for global pages */}
      <LayoutComponent>
        {children}
      </LayoutComponent>
      <BottomNavBar />
    </>
  );
}
