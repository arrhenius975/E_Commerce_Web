
// src/app/page.tsx (New Main Application Landing Page with About Us)
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Info, Users, Smile } from 'lucide-react';
import { MainLandingBottomNav } from '@/components/MainLandingBottomNav';

export default function NewMainHomepage() {
  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-background to-secondary/30 py-12 px-4 text-center pb-20 md:pb-12"> {/* Added pb-20 for bottom nav space on mobile */}
        <ShoppingBag className="w-20 h-20 md:w-24 md:h-24 text-primary mb-6" />
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-6">
          Welcome to BoutiqueBox!
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Your ultimate destination for a variety of shopping experiences.
          Explore different stores, find unique products, and enjoy seamless shopping.
        </p>

        <section className="mt-10 mb-12 max-w-3xl mx-auto text-left space-y-8">
          <div className="flex items-start gap-4">
            <Info className="w-12 h-12 text-accent shrink-0 mt-1" />
            <div>
              <h2 className="font-headline text-2xl font-semibold text-primary mb-2">About BoutiqueBox</h2>
              <p className="font-body text-muted-foreground leading-relaxed">
                BoutiqueBox started with a simple idea: to bring the diversity and charm of specialized boutique shopping
                into one convenient online destination. We believe that whether you're looking for fresh groceries,
                the latest cosmetics, or a quick and delicious meal, your experience should be delightful and easy.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Users className="w-12 h-12 text-accent shrink-0 mt-1" />
            <div>
              <h2 className="font-headline text-2xl font-semibold text-primary mb-2">Our Mission</h2>
              <p className="font-body text-muted-foreground leading-relaxed">
                Our mission is to curate a selection of high-quality products across various categories,
                offering you a personalized and enjoyable shopping journey. We partner with trusted suppliers
                and brands to ensure you receive the best, every time.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <Smile className="w-12 h-12 text-accent shrink-0 mt-1" />
            <div>
              <h2 className="font-headline text-2xl font-semibold text-primary mb-2">Why Choose Us?</h2>
              <p className="font-body text-muted-foreground leading-relaxed">
                From farm-fresh produce in our Grocery section, to trend-setting items in Cosmetics, and
                satisfying cravings with FastFood, BoutiqueBox is designed with you in mind. Enjoy easy navigation,
                secure checkout, and dedicated customer support.
              </p>
            </div>
          </div>
        </section>

        <Button asChild size="lg" className="mt-8">
          <Link href="/sections">Explore Our Stores</Link>
        </Button>
        
        <footer className="mt-16 md:mt-20 text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} BoutiqueBox. All rights reserved.</p>
        </footer>
      </div>
      <MainLandingBottomNav />
    </>
  );
}
