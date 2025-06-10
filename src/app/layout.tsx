
import type {Metadata} from 'next';
import './globals.css';
import { AppProvider } from '@/contexts/AppContext';
import { Toaster } from "@/components/ui/toaster";
// LayoutComponent and BottomNavBar are now part of section-specific layouts or conditionally rendered.

export const metadata: Metadata = {
  title: 'BoutiqueBox - Your Multi-Store App',
  description: 'Explore groceries, cosmetics, and fast food all in one place!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {/* AppProvider is moved to section-specific layouts to re-initialize with section data */}
        {/* Or AppProvider in root needs to be section-aware via usePathname */}
        <AppProvider>
          {children}
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
