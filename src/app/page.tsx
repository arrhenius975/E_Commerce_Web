
// src/app/page.tsx (Main Landing Page)
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShoppingBasket, Diamond, UtensilsCrossed } from 'lucide-react';
import Image from 'next/image';
import { useAppContext } from '@/contexts/AppContext';
import { useMemo } from 'react';

const sectionData = [
  {
    name: 'Fresh Groceries',
    description: 'Quality ingredients delivered to your door.',
    href: '/grocery',
    icon: ShoppingBasket,
    themeColor: 'bg-green-500', 
    image: 'https://placehold.co/600x400.png',
    'data-ai-hint': 'grocery store',
  },
  {
    name: 'Beauty & Cosmetics',
    description: 'Discover your new favorite beauty products.',
    href: '/cosmetics',
    icon: Diamond,
    themeColor: 'bg-pink-500',
    image: 'https://placehold.co/600x400.png',
    'data-ai-hint': 'cosmetics makeup',
  },
  {
    name: 'Fast Food Cravings',
    description: 'Quick and delicious meals, ready in minutes.',
    href: '/fastfood',
    icon: UtensilsCrossed,
    themeColor: 'bg-red-500',
    image: 'https://placehold.co/600x400.png',
    'data-ai-hint': 'fast food',
  },
];

export default function MainPage() {
  const { searchTerm } = useAppContext();

  const displayedSections = useMemo(() => {
    if (!searchTerm) return sectionData;
    return sectionData.filter(section =>
      section.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-br from-background to-secondary/30">
      <header className="text-center mb-16 px-4">
        <h1 className="font-headline text-5xl font-bold text-primary mb-4">
          Welcome to BoutiqueBox!
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your one-stop shop for Groceries, Cosmetics, and Fast Food. Explore our curated sections.
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-6xl w-full">
        {displayedSections.length > 0 ? displayedSections.map((section) => (
          <Link href={section.href} key={section.name} legacyBehavior>
            <a className="block group">
              <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 h-full flex flex-col">
                <CardHeader className="p-0">
                  <div className="relative w-full h-48">
                    <Image 
                      src={section.image} 
                      alt={section.name} 
                      layout="fill" 
                      objectFit="cover" 
                      className="transition-transform duration-300 group-hover:scale-110"
                      data-ai-hint={section['data-ai-hint']}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent`}></div>
                     <div className={`absolute top-4 right-4 p-3 rounded-full bg-card/80 shadow-lg`}>
                       <section.icon className={`w-8 h-8 ${section.href === '/grocery' ? 'text-green-500' : section.href === '/cosmetics' ? 'text-pink-500' : 'text-red-500' }`} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow p-6 flex flex-col justify-between">
                  <div>
                    <CardTitle className="font-headline text-2xl mb-2 text-foreground">{section.name}</CardTitle>
                    <CardDescription className="text-muted-foreground mb-4">{section.description}</CardDescription>
                  </div>
                  <Button className={`w-full mt-auto ${section.themeColor} hover:opacity-90 text-white`} size="lg">
                    Explore {section.href.substring(1)}
                    <span aria-hidden="true" className="ml-2">→</span>
                  </Button>
                </CardContent>
              </Card>
            </a>
          </Link>
        )) : (
          <p className="md:col-span-3 text-center text-muted-foreground text-lg py-10">
            No sections match your search.
          </p>
        )}
      </main>

      <footer className="mt-20 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} BoutiqueBox. All rights reserved.</p>
         <div className="mt-4 space-x-4">
            <Link href="/help" className="hover:text-primary">Help Center</Link>
            <Link href="/account" className="hover:text-primary">My Account</Link>
            <Link href="/settings" className="hover:text-primary">Settings</Link>
          </div>
      </footer>
    </div>
  );
}
