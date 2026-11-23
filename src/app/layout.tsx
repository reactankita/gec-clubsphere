import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { AppLayoutShell } from '@/components/app-layout-shell';
import { ToastContainer } from '@/components/toast-container';

export const metadata: Metadata = {
  title: 'GEC Club Management System — Goa College of Engineering',
  description:
    'Official student club management platform of Goa College of Engineering (GEC), Farmagudi, Ponda, Goa.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full font-sans antialiased bg-[#F8F9FA] dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-600 selection:text-white">
        <AppProvider>
          <AppLayoutShell>{children}</AppLayoutShell>
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}
