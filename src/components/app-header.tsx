'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import {
  Search,
  Bell,
  Menu,
  ChevronDown,
  User,
  Shield,
  Award,
  Users,
  LogOut,
  Sun,
  Moon
} from 'lucide-react';

interface AppHeaderProps {
  onToggleSidebar?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onToggleSidebar }) => {
  const router = useRouter();
  const {
    currentUser,
    switchUser,
    notifications,
    unreadNotificationCount,
    markAllNotificationsAsRead,
    isDarkMode,
    toggleDarkMode,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/clubs?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const personaList: { role: UserRole; name: string; label: string }[] = [
    { role: 'student', name: 'Ankita Suttar', label: 'Student (SE IT)' },
    { role: 'club_coordinator', name: 'Sanket Prabhu', label: 'Club Coordinator' },
    { role: 'faculty_coordinator', name: 'Prof. Aisha Naik', label: 'Faculty Advisor' },
    { role: 'super_admin', name: 'Dr. Rajeshwari Sawant', label: 'Super Admin' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F8F9FA]/90 dark:bg-slate-950/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 border-b border-slate-200/60 dark:border-slate-800/60 transition-colors">
      {/* Left: Mobile hamburger & Search bar */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800"
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search clubs, events..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/40 shadow-sm transition-all"
          />
        </form>
      </div>

      {/* Right Controls: Dark Mode, Notifications, User Avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Dark Mode */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-900 border border-transparent hover:border-slate-200/80 dark:hover:border-slate-800 transition-all"
          title="Toggle Dark / Light theme"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications Bell with unread dot */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all shadow-sm"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900"></span>
            )}
          </button>

          {isNotifOpen && (
            <div
              className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl py-3 z-50 animate-in fade-in zoom-in-95"
              onClick={() => setIsNotifOpen(false)}
            >
              <div className="px-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white">Notifications</span>
                {unreadNotificationCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-blue-600 hover:underline text-[11px]"
                  >
                    Clear All
                  </button>
                )}
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {notifications.slice(0, 4).map((n) => (
                  <div key={n.id} className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <p className="font-semibold text-slate-800 dark:text-slate-100">{n.title}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5 line-clamp-2">
                      {n.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Pill Dropdown: Ankita Suttar ▾ */}
        <div className="relative">
          <button
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm group"
          >
            {/* Avatar Circle with Initial 'A' */}
            <div className="w-7 h-7 rounded-full bg-[#0C1526] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-inner">
              {currentUser.role === 'student' ? 'A' : currentUser.full_name[0]}
            </div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {currentUser.role === 'student' ? 'Ankita Suttar' : currentUser.full_name.split(' ')[0]}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
          </button>

          {isUserDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-60 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95"
              onClick={() => setIsUserDropdownOpen(false)}
            >
              <div className="px-3.5 py-2 border-b border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Active Persona Switcher
                </p>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 mt-0.5">
                  {currentUser.role === 'student' ? 'Ankita Suttar' : currentUser.full_name}
                </p>
              </div>

              <div className="p-1 space-y-0.5 text-xs">
                {personaList.map((p) => (
                  <button
                    key={p.role}
                    onClick={() => switchUser(p.role)}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors ${
                      currentUser.role === p.role
                        ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{p.label}</span>
                    {currentUser.role === p.role && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    )}
                  </button>
                ))}
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-1 mt-1 px-1">
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors font-medium"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Switch Account / Sign In</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
