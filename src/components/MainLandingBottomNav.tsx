
// src/components/MainLandingBottomNav.tsx
"use client";

import Link from 'next/link';
import { Home, LayoutGrid, HelpCircle, User, Settings as SettingsIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function MainLandingBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/sections', label: 'Stores', icon: LayoutGrid }, // Renamed 'Categories' to 'Stores' for clarity
    { href: '/help', label: 'Help', icon: HelpCircle },
    { href: '/account', label: 'Account', icon: User },
    { href: '/settings', label: 'Settings', icon: SettingsIcon },
  ];

  // Show this bottom nav only on the root page ('/') and the sections page ('/sections')
  if (pathname !== '/' && pathname !== '/sections') {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-background shadow-top md:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            href={item.href}
            key={item.label}
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
