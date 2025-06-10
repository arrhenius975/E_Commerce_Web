
import { LayoutComponent } from '@/components/Layout';
import { BottomNavBar } from '@/components/BottomNavBar';
import { ThemeManager } from '@/components/ThemeManager';

export default function CosmeticsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ThemeManager themeClass="theme-cosmetics" />
      <LayoutComponent>
        {children}
      </LayoutComponent>
      <BottomNavBar />
    </>
  );
}
