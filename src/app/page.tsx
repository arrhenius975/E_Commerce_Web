// src/app/page.tsx (New Main Application Landing Page)
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

export default function NewMainHomepage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary/30 py-12 px-4 text-center">
      <ShoppingBag className="w-24 h-24 text-primary mb-8" />
      <h1 className="font-headline text-5xl font-bold text-primary mb-6">
        Welcome to BoutiqueBox!
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
        Your ultimate destination for a variety of shopping experiences.
        Explore different stores, find unique products, and enjoy seamless shopping.
      </p>
      <Button asChild size="lg">
        <Link href="/sections">Explore Our Stores</Link>
      </Button>
      <footer className="mt-20 text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} BoutiqueBox. All rights reserved.</p>
      </footer>
    </div>
  );
}
