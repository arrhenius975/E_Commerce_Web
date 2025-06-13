
// src/app/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ShoppingBag, Home as HomeIcon, Truck, Search } from 'lucide-react'; // Changed SearchHeart to Search
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function NewMainHomepage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      id: 'welcome',
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center px-4 md:px-8">
          <ShoppingBag className="w-24 h-24 text-primary mb-6" />
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
            Welcome to BoutiqueBox!
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl">
            Your one-stop destination for curated collections of groceries, cosmetics, and fast food,
            all delivered with convenience and care. Discover quality, variety, and seamless shopping tailored to your lifestyle.
          </p>
        </div>
      ),
    },
    {
      id: 'why-us',
      content: (
        <div className="flex flex-col md:flex-row items-center justify-center h-full gap-8 px-6 md:px-12 py-8 md:py-0">
          <div className="w-full md:w-1/3 lg:w-2/5 relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl max-h-[70vh] md:max-h-full">
            {/* User can change this image URL, e.g., to a Pinterest image link */}
            <Image
              src="https://placehold.co/600x800.png"
              alt="Modern convenient lifestyle"
              layout="fill"
              objectFit="cover"
              data-ai-hint="lifestyle modern"
              priority={true}
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
        <div className="flex flex-col items-center justify-center h-full text-center px-4 md:px-8">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-10">
            Explore Our Range of Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-4xl w-full">
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
              <Search className="w-12 h-12 text-accent mb-4" /> {/* Changed SearchHeart to Search */}
              <h3 className="font-headline text-xl font-semibold text-card-foreground mb-2">Local Sourcing</h3>
              <p className="font-body text-sm text-muted-foreground">
                We can help you find and deliver locally available items. Just ask!
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const totalSlides = slides.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  // Optional: Auto-slide. Uncomment to enable.
  // useEffect(() => {
  //   const slideInterval = setInterval(nextSlide, 7000); // Change slide every 7 seconds
  //   return () => clearInterval(slideInterval);
  // }, []);


  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-secondary/20 relative">
      <div className="flex-grow relative pt-5 md:pt-0"> {/* Added padding top for mobile */}
        {/* Slides Container - aims for near full-screen height minus space for CTA button */}
        <div className="relative h-[calc(100vh-160px)] sm:h-[calc(100vh-180px)] md:h-[calc(100vh-120px)] overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)`, width: `${totalSlides * 100}%` }}
          >
            {slides.map((slide, index) => (
              <div 
                key={slide.id} 
                className="h-full flex-shrink-0 flex items-center justify-center p-2 sm:p-4"
                style={{ width: `${100 / totalSlides}%` }} // Corrected width for each slide
              >
                {slide.content}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons & Indicators Container */}
        <div className="absolute bottom-4 md:bottom-6 left-0 right-0 z-10 flex flex-col items-center space-y-3">
            {/* Slide Indicators */}
            <div className="flex space-x-2.5">
            {slides.map((_, index) => (
                <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/50",
                    currentSlide === index ? "bg-primary scale-125" : "bg-muted hover:bg-muted-foreground/50"
                )}
                aria-label={`Go to slide ${index + 1}`}
                />
            ))}
            </div>
            {/* Navigation Buttons */}
            <div className="flex space-x-4">
                <Button variant="outline" size="icon" onClick={prevSlide} className="bg-background/60 hover:bg-background/80 backdrop-blur-sm shadow-md rounded-full">
                    <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextSlide} className="bg-background/60 hover:bg-background/80 backdrop-blur-sm shadow-md rounded-full">
                    <ChevronRight className="h-5 w-5" />
                </Button>
            </div>
        </div>
      </div>

      <div className="text-center py-8 md:py-10">
        <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow px-10 py-6 text-lg">
          <Link href="/sections">Explore Our Stores</Link>
        </Button>
      </div>

      {/* MainLandingBottomNav is intentionally not included here, it's handled by MainLandingBottomNav.tsx logic */}
    </div>
  );
}
