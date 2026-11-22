'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Compass,
  Calendar,
  Info,
  Mail,
  Bell,
  Sun,
  Moon,
  Shield,
  User,
  Users,
  Award,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import { UserRole } from '@/types';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const {
    currentUser,
    switchUser,
    unreadNotificationCount,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    isDarkMode,
    toggleDarkMode,
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Explore Clubs', href: '/clubs' },
    { label: 'Events', href: '/events' },
    { label: 'About GEC', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const getDashboardLink = () => {
    switch (currentUser.role) {
      case 'super_admin':
        return { href: '/admin', label: 'Admin Portal', icon: Shield };
      case 'club_coordinator':
        return { href: '/club-dashboard', label: 'Club Console', icon: Award };
      case 'faculty_coordinator':
        return { href: '/club-dashboard', label: 'Faculty View', icon: Users };
      case 'student':
      default:
        return { href: '/dashboard', label: 'My Dashboard', icon: User };
    }
  };

  const dashboardInfo = getDashboardLink();
  const DashboardIcon = dashboardInfo.icon;

  const roleLabels: Record<UserRole, { title: string; color: string; icon: string }> = {
    student: { title: 'Student', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300', icon: '🎓' },
    club_coordinator: { title: 'Club Coordinator', color: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300', icon: '⚡' },
    faculty_coordinator: { title: 'Faculty Coordinator', color: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300', icon: '🏛️' },
    super_admin: { title: 'Super Admin', color: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300', icon: '🛡️' },
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 transition-colors">
      {/* Top micro banner */}
      <div className="bg-[#0B1F3A] text-slate-200 text-xs py-1 px-4 flex justify-between items-center tracking-wide border-b border-blue-950/40">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Goa College of Engineering (GEC), Farmagudi, Ponda — Estd. 1967</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-slate-300">
            <span className="text-[11px] bg-blue-900/80 px-2 py-0.5 rounded border border-blue-700/50 text-blue-200">
              Student Activities Council
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-xs">Affiliated to Goa University • Approved by AICTE</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0B1F3A] via-[#1E3A8A] to-[#2563EB] flex items-center justify-center text-white shadow-md shadow-blue-950/20 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-[#0B1F3A] dark:text-white">
                GEC
              </span>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ClubSphere
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wider uppercase -mt-1">
              Campus Activities Portal
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls & Role Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Persona / Role Quick Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 transition-colors text-xs font-medium"
              title="Switch demo persona for testing"
            >
              <span>{roleLabels[currentUser.role].icon}</span>
              <span className="hidden sm:inline-block font-semibold text-slate-700 dark:text-slate-200">
                {roleLabels[currentUser.role].title}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isRoleDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                onClick={() => setIsRoleDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Interactive Role Switcher
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Test different dashboard privileges:
                  </p>
                </div>
                {(['student', 'club_coordinator', 'faculty_coordinator', 'super_admin'] as UserRole[]).map(
                  (role) => (
                    <button
                      key={role}
                      onClick={() => switchUser(role)}
                      className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                        currentUser.role === role ? 'font-bold bg-blue-50/50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{roleLabels[role].icon}</span>
                        <div>
                          <div>{roleLabels[role].title}</div>
                          <div className="text-[10px] text-slate-400 font-normal">
                            {role === 'student' && 'Join clubs & register events'}
                            {role === 'club_coordinator' && 'Manage GEC Coders Club'}
                            {role === 'faculty_coordinator' && 'Faculty Advisor oversight'}
                            {role === 'super_admin' && 'Full GEC System Authority'}
                          </div>
                        </div>
                      </div>
                      {currentUser.role === role && (
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      )}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white shadow">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="font-semibold text-sm text-slate-900 dark:text-white">
                    Notifications
                  </span>
                  {unreadNotificationCount > 0 && (
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                  {notifications.filter((n) => n.user_id === currentUser.id).length === 0 ? (
                    <div className="py-6 text-center text-xs text-slate-400">
                      No notifications right now
                    </div>
                  ) : (
                    notifications
                      .filter((n) => n.user_id === currentUser.id)
                      .slice(0, 5)
                      .map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => markNotificationAsRead(notif.id)}
                          className={`p-3 text-xs cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors ${
                            !notif.is_read ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''
                          }`}
                        >
                          <div className="font-semibold text-slate-800 dark:text-slate-100 flex items-center justify-between">
                            <span>{notif.title}</span>
                            {!notif.is_read && (
                              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></span>
                            )}
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                            {notif.message}
                          </p>
                        </div>
                      ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Primary Dashboard Link */}
          <Link
            href={dashboardInfo.href}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0B1F3A] hover:bg-[#152e52] text-white text-xs font-semibold shadow-sm transition-all hover:shadow"
          >
            <DashboardIcon className="w-4 h-4 text-blue-300" />
            <span>{dashboardInfo.label}</span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <Link
              href={dashboardInfo.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#0B1F3A] text-white text-sm font-semibold"
            >
              <DashboardIcon className="w-4 h-4 text-blue-300" />
              <span>{dashboardInfo.label}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
