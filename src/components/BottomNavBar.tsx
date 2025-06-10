
"use client";

import Link from 'next/link';
import { Home, LayoutGrid, HelpCircle, User, Settings as SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAppContext } from '@/contexts/AppContext';

export function BottomNavBar() {
  const pathname = usePathname();
  const { setSelectedCategory, currentSectionConfig } = useAppContext();

  const sectionHomePath = currentSectionConfig?.path || '/'; // Default to section path if in section, else '/'

  const navItems = [
    { href: sectionHomePath, label: 'Home', icon: Home }, // Points to current section's home
    { href: `${sectionHomePath}#product-grid-section`, label: 'Categories', icon: LayoutGrid, isScrollLink: true },
    { href: '/help', label: 'Help', icon: HelpCircle },
    { href: '/account', label: 'Account', icon: User },
    { href: '/settings', label: 'Settings', icon: SettingsIcon },
  ];

  const handleCategoriesClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    if (pathname === sectionHomePath) {
      e.preventDefault();
      const categoriesSection = document.getElementById('product-grid-section');
      if (categoriesSection) {
        categoriesSection.scrollIntoView({ behavior: 'smooth' });
      }
      setSelectedCategory('all');
    }
  };

  // Hide this section-specific BottomNavBar on the main landing page ('/')
  // and on the new section selector page ('/sections')
  if (pathname === '/' || pathname === '/sections') {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-background shadow-top md:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.isScrollLink && pathname === sectionHomePath);
        const Icon = item.icon;
        return (
          <Link
            href={item.href}
            key={item.label}
            onClick={(e) => {
              if (item.isScrollLink) {
                handleCategoriesClick(e, item.href);
              }
            }}
            className={cn(
              "flex flex-col items-center justify-center gap-1 p-2 rounded-md transition-colors",
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon className="h-6 w-6" />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
