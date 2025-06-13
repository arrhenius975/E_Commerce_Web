
// src/app/page.tsx
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Home as HomeIcon, Truck, Search } from 'lucide-react';
import Link from 'next/link';

export default function NewMainHomepage() {
  const slidesContent = [
    {
      id: 'welcome',
      content: (
        <div className="relative flex flex-col items-center justify-center text-center px-4 md:px-8 h-full text-white">
          <Image
            src="https://placehold.co/1920x1080.png"
            alt="BoutiqueBox welcome background"
            layout="fill"
            objectFit="cover"
            className="z-[-1]"
            data-ai-hint="welcome background"
            priority // Prioritize loading for the first slide image
          />
          <div className="absolute inset-0 bg-black/50 z-0"></div> {/* Overlay for text readability */}
          <div className="relative z-10"> {/* Content container */}
            <ShoppingBag className="w-24 h-24 text-primary mb-6" />
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-white mb-4"> {/* Changed text to white */}
              Welcome to BoutiqueBox!
            </h1>
            <p className="font-body text-lg md:text-xl text-gray-200 max-w-2xl"> {/* Changed text to light gray */}
              Your one-stop destination for curated collections of groceries, cosmetics, and fast food,
              all delivered with convenience and care. Discover quality, variety, and seamless shopping tailored to your lifestyle.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'why-us',
      content: (
        <div className="flex flex-col md:flex-row items-center justify-center h-full w-full max-w-6xl gap-8 px-6 md:px-12 py-8 md:py-0">
          <div className="w-full md:w-1/3 lg:w-2/5 relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl max-h-[70vh] md:max-h-full">
            <Image
              src="https://placehold.co/600x800.png" // You can change this link
              alt="Modern convenient lifestyle"
              layout="fill"
              objectFit="cover"
              data-ai-hint="lifestyle modern"
            />
          </div>
          <div className="w-full md:w-2/3 lg:w-3/5 text-center md:text-left mt-8 md:mt-0">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-accent mb-6 uppercase tracking-wide leading-tight">
              Too busy with household/work? <br className="hidden md:inline" /> We can make that easy for you.
            </h2>
            <div>
              <h3 className="font-headline text-2xl font-semibold text-primary mb-3">Why Choose Us?</h3>
              <ul className="font-body list-none md:list-disc md:list-inside text-muted-foreground space-y-2 text-left md:pl-4 text-base md:text-lg">
                <li>Curated selections across diverse categories.</li>
                <li>High-quality products from trusted partners.</li>
                <li>Seamless and personalized shopping experience.</li>
                <li>Dedicated customer support ready to assist.</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'services',
      content: (
        <div className="flex flex-col items-center justify-center text-center px-4 md:px-8">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-10">
            Explore Our Range of Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-4xl w-full mb-12">
            <div className="flex flex-col items-center p-6 bg-card rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <HomeIcon className="w-12 h-12 text-accent mb-4" />
              <h3 className="font-headline text-xl font-semibold text-card-foreground mb-2">Home Delivery</h3>
              <p className="font-body text-sm text-muted-foreground">
                Get your essentials and favorites delivered right to your doorstep.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-card rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <Truck className="w-12 h-12 text-accent mb-4" />
              <h3 className="font-headline text-xl font-semibold text-card-foreground mb-2">Fast & Reliable</h3>
              <p className="font-body text-sm text-muted-foreground">
                We prioritize speedy delivery so you get what you need, when you need it.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-card rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <Search className="w-12 h-12 text-accent mb-4" />
              <h3 className="font-headline text-xl font-semibold text-card-foreground mb-2">Local Sourcing</h3>
              <p className="font-body text-sm text-muted-foreground">
                We can help you find and deliver locally available items. Just ask!
              </p>
            </div>
          </div>
          <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow px-10 py-6 text-lg">
            <Link href="/sections">Explore Our Stores</Link>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="h-screen overflow-y-scroll scroll-snap-type-y-mandatory bg-gradient-to-br from-background to-secondary/20">
      {slidesContent.map((slide) => (
        <section
          key={slide.id}
          className="min-h-screen flex flex-col items-center justify-center p-0 scroll-snap-align-start relative overflow-hidden" // Added p-0, relative, overflow-hidden
        >
          {/* The content for each slide is now a self-contained structure */}
          {slide.content}
        </section>
      ))}
    </div>
  );
}
