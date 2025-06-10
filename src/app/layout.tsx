
import type {Metadata} from 'next';
import './globals.css';
import { AppProvider } from '@/contexts/AppContext';
import { Toaster } from "@/components/ui/toaster";
import { LayoutComponent } from '@/components/Layout';

export const metadata: Metadata = {
  title: 'BoutiqueBox - Your Curated Shopping Experience',
  description: 'Discover unique products in groceries, cosmetics, fast food, and tech with BoutiqueBox.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <AppProvider>
          <LayoutComponent>
            {children}
          </LayoutComponent>
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
