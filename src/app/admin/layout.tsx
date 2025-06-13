
// src/app/admin/layout.tsx
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { ThemeManager } from '@/components/ThemeManager';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Admin section might have its own theme or use a neutral one
  // For now, ensure it doesn't inherit store-specific themes
  return (
    <>
      <ThemeManager themeClass="" /> {/* Clears section-specific themes */}
      <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900">
        <AdminSidebar />
        <main className="flex-1 p-6 md:p-8 ml-64"> {/* Add ml-64 to offset sidebar */}
          {children}
        </main>
      </div>
    </>
  );
}
