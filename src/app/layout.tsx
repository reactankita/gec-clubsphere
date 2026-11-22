import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ToastContainer } from '@/components/toast-container';

export const metadata: Metadata = {
  title: 'GEC ClubSphere — Goa College of Engineering Club Management System',
  description:
    'Discover student clubs, register for campus events, and manage extracurricular activities at Goa College of Engineering, Farmagudi, Goa.',
  keywords: [
    'Goa College of Engineering',
    'GEC Farmagudi',
    'GEC Clubs',
    'ClubSphere',
    'College Club Management System',
    'Engineering Clubs Goa',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
        <AppProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}
