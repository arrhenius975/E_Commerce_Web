
"use client";

import Link from 'next/link';
import { Home, LayoutGrid, HelpCircle, User, Settings as SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';


const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/#categories', label: 'Categories', icon: LayoutGrid, isScrollLink: true }, // Special handling for categories scroll
  { href: '/help', label: 'Help', icon: HelpCircle },
  { href: '/account', label: 'Account', icon: User },
  { href: '/settings', label: 'Settings', icon: SettingsIcon },
];

export function BottomNavBar() {
  const pathname = usePathname();
  const { toast } = useToast();
  const { setSelectedCategory } = useAppContext();


  const handleCategoriesClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (pathname === '/') {
      e.preventDefault();
      const categoriesSection = document.getElementById('product-grid-section'); // Assuming ProductGrid has an ID or a parent
      if (categoriesSection) {
        categoriesSection.scrollIntoView({ behavior: 'smooth' });
      }
      setSelectedCategory('all'); // Reset to 'all' or focus the category section
    } else {
      // If not on home page, just navigate to home (categories are in header)
      // Or, implement a modal for categories if preferred for other pages
    }
  };
  
  const handlePlaceholderClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, label: string) => {
    if (label === 'Help' || label === 'Account' || label === 'Settings') {
        // Allow navigation for actual pages.
        // If they were pure placeholders, you might e.preventDefault() and toast.
    }
  };


  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-background shadow-top md:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            href={item.href}
            key={item.label}
            onClick={(e) => {
              if (item.isScrollLink) {
                handleCategoriesClick(e);
              } else {
                handlePlaceholderClick(e, item.label);
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
