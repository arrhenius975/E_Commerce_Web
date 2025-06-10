// src/app/sections/layout.tsx
import { LayoutComponent } from '@/components/Layout';
import { ThemeManager } from '@/components/ThemeManager';
// MainLandingBottomNav is no longer included here, its own logic controls visibility.

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
      {/* <MainLandingBottomNav />  Ensure this is removed */}
    </>
  );
}
