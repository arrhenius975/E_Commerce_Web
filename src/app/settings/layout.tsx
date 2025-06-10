
// src/app/settings/layout.tsx
import { LayoutComponent } from '@/components/Layout';
import { BottomNavBar } from '@/components/BottomNavBar';
import { ThemeManager } from '@/components/ThemeManager';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ThemeManager themeClass="" />
      <LayoutComponent>
        {children}
      </LayoutComponent>
      <BottomNavBar />
    </>
  );
}
