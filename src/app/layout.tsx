
import type {Metadata} from 'next';
import './globals.css';
import { AppProvider } from '@/contexts/AppContext';
import { Toaster } from "@/components/ui/toaster";
import { LayoutComponent } from '@/components/Layout'; // Renamed for clarity
import { BottomNavBar } from '@/components/BottomNavBar';


export const metadata: Metadata = {
  title: 'BoutiqueBox - Fresh Groceries Delivered',
  description: 'Your one-stop shop for fresh meats, vegetables, fruits, bread, and all your grocery needs.',
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
          <LayoutComponent> {/* Renamed from <Layout> to <LayoutComponent> if it was named Layout before */}
            {children}
          </LayoutComponent>
          <Toaster />
          <BottomNavBar /> {/* Add BottomNavBar here */}
        </AppProvider>
      </body>
    </html>
  );
}
