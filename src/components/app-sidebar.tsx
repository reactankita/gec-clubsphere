'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Home,
  Users,
  Calendar,
  Layers,
  FileCheck2,
  FolderKanban,
  Settings,
  Sparkles,
  Shield,
  Award
} from 'lucide-react';

interface AppSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { currentUser } = useApp();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Clubs', href: '/clubs', icon: Layers },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Members', href: '/dashboard', icon: Users },
    { name: 'Applications', href: '/club-dashboard', icon: FileCheck2 },
    { name: 'Resources', href: '/about', icon: FolderKanban },
    { name: 'Settings', href: '/admin', icon: Settings },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0C1526] text-slate-300 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } border-r border-slate-800/80 shadow-2xl lg:shadow-none`}
    >
      {/* Top Brand Logo */}
      <div>
        <div className="p-6 border-b border-slate-800/60">
          <Link href="/" className="flex items-center gap-3 group" onClick={onClose}>
            {/* GEC Architectural Crest SVG */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700/80 via-indigo-600/60 to-slate-800 border border-slate-700 flex items-center justify-center text-white shrink-0 shadow-inner group-hover:scale-105 transition-transform">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-blue-200"
              >
                <path d="M3 21h18" />
                <path d="M5 21V9l7-6 7 6v12" />
                <path d="M9 21v-7h6v7" />
                <path d="M10 9a2 2 0 1 1 4 0" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-wider text-white font-serif">
                  GEC
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium leading-tight">
                Goa College
              </p>
              <p className="text-[11px] text-slate-400 font-medium leading-tight">
                of Engineering
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation List */}
        <nav className="p-4 space-y-1.5">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname === item.href || pathname.startsWith(item.href + '/');

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#1E293B] text-white shadow-sm border border-slate-700/60'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-blue-400' : 'text-slate-400'
                  }`}
                />
                <span className="tracking-wide">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Sidebar Artwork & Quote */}
      <div className="p-6 border-t border-slate-800/60 text-center relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-blue-300 text-xs font-medium italic">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Learn. Collaborate. Grow.</span>
          </div>

          {/* Architectural Line Illustration of GEC Building */}
          <div className="w-full h-14 opacity-25 flex items-center justify-center text-slate-400">
            <svg
              viewBox="0 0 120 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              className="w-28 h-auto"
            >
              <rect x="10" y="15" width="100" height="24" rx="2" />
              <path d="M20 15V8l10-4 10 4v7" />
              <path d="M80 15V8l10-4 10 4v7" />
              <path d="M50 15V5l10-3 10 3v10" />
              <path d="M55 24h10v15H55z" />
              <path d="M25 22h6v6h-6zM37 22h6v6h-6zM77 22h6v6h-6zM89 22h6v6h-6z" />
            </svg>
          </div>
          <p className="text-[10px] text-slate-500 font-medium">Farmagudi, Ponda • Estd. 1967</p>
        </div>
      </div>
    </aside>
  );
};
