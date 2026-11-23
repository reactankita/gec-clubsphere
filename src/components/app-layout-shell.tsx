'use client';

import React, { useState } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { AppHeader } from '@/components/app-header';

export const AppLayoutShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex">
      {/* Sidebar for Desktop & Drawer for Mobile */}
      <AppSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Overlay backdrop for mobile when drawer open */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden animate-in fade-in"
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all">
        <AppHeader onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 p-4 sm:p-8">{children}</main>
        
        {/* Simple Minimal Footer */}
        <footer className="border-t border-slate-200/60 dark:border-slate-800 px-6 sm:px-8 py-4 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Goa College of Engineering (GEC), Farmagudi, Ponda. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span>Student Affairs Council</span>
            <span>•</span>
            <span>AICTE Approved</span>
          </div>
        </footer>
      </div>
    </div>
  );
};
