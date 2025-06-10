// src/app/sections/layout.tsx
import { LayoutComponent } from '@/components/Layout';
import { ThemeManager } from '@/components/ThemeManager';
import { MainLandingBottomNav } from '@/components/MainLandingBottomNav';

export default function SectionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ThemeManager themeClass="" /> {/* Use default/global theme for sections page */}
      <LayoutComponent> {/* This includes Header, main content area, global footer etc. */}
        {children}
      </LayoutComponent>
      <MainLandingBottomNav /> {/* This is the new bottom nav for the /sections page */}
    </>
  );
}
