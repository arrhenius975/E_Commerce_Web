
import { LayoutComponent } from '@/components/Layout';
import { BottomNavBar } from '@/components/BottomNavBar';
import { ThemeManager } from '@/components/ThemeManager';

export default function GroceryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ThemeManager themeClass="theme-grocery" />
      <LayoutComponent>
        {children}
      </LayoutComponent>
      <BottomNavBar />
    </>
  );
}
