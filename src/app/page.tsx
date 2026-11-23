'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Users,
  Calendar,
  Star,
  Trophy,
  ArrowRight,
  Code,
  Palette,
  Camera,
  Cpu,
  Leaf,
  Megaphone,
  Bell,
  Clock,
  MapPin,
  Sparkles
} from 'lucide-react';
import { SafeImage } from '@/components/safe-image';

export default function HomePage() {
  const { clubs, events } = useApp();

  // Reference stats matching image
  const stats = [
    {
      label: 'Active Clubs',
      value: '12+',
      icon: Users,
      bg: 'bg-blue-100/70 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300',
    },
    {
      label: 'Upcoming Events',
      value: '5',
      icon: Calendar,
      bg: 'bg-amber-100/70 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300',
    },
    {
      label: 'Total Members',
      value: '1.2k+',
      icon: Star,
      bg: 'bg-purple-100/70 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300',
    },
    {
      label: 'Events This Year',
      value: '28',
      icon: Trophy,
      bg: 'bg-orange-100/70 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300',
    },
  ];

  // Reference upcoming events matching user design
  const featuredEvents = [
    {
      id: 'itcl-auction',
      month: 'NOV',
      day: '24',
      title: 'ITCL Auction 2026',
      time: '2:00 PM - 4:00 PM',
      venue: 'Seminar Hall',
      category: 'Sports',
      categoryColor: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
      slug: 'codesprint-2026-hackathon',
    },
    {
      id: 'techtalk-ai',
      month: 'NOV',
      day: '27',
      title: 'TechTalk: Building with AI',
      time: '4:00 PM - 5:30 PM',
      venue: 'LT-2',
      category: 'Tech',
      categoryColor: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
      slug: 'robotics-workshop-ros2-autonomous-robots',
    },
    {
      id: 'itcl-tournament',
      month: 'DEC',
      day: '04',
      title: 'ITCL 2026',
      time: '8:00 AM - 6:00 PM',
      venue: 'College Grounds',
      category: 'Sports',
      categoryColor: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
      slug: 'codesprint-2026-hackathon',
    },
  ];

  // 6 Featured clubs matching user image
  const showcaseClubs = [
    {
      name: 'Coding Club',
      tagline: 'Code. Build. Innovate.',
      slug: 'gec-coders-club',
      icon: Code,
    },
    {
      name: 'Fine Arts Club',
      tagline: 'Create. Express. Inspire.',
      slug: 'cultural-club',
      icon: Palette,
    },
    {
      name: 'Photography Club',
      tagline: 'Capture. Share. Explore.',
      slug: 'photography-club',
      icon: Camera,
    },
    {
      name: 'Robotics Club',
      tagline: 'Design. Build. Automate.',
      slug: 'arm-robotics-club',
      icon: Cpu,
    },
    {
      name: 'Nature Club',
      tagline: 'Explore. Conserve. Grow.',
      slug: 'environmental-club',
      icon: Leaf,
    },
    {
      name: 'Literary Club',
      tagline: 'Read. Write. Reflect.',
      slug: 'literary-club',
      icon: Megaphone,
    },
  ];

  // Reference campus announcements
  const announcements = [
    {
      title: 'ITCL 2026 - Registrations Open Now!',
      date: 'Nov 20, 2026',
    },
    {
      title: 'New Club: Aviation Club - Join Now!',
      date: 'Nov 18, 2026',
    },
    {
      title: "College Fest - Vibe '26 Coming Soon!",
      date: 'Nov 15, 2026',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* HERO BANNER MATCHING USER REFERENCE */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-gradient-to-r from-[#DFE9F6] via-[#E8EFF8] to-[#E3EAF4] dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 p-6 sm:p-10 shadow-sm">
        {/* Subtle decorative curved architectural lines */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-30 pointer-events-none">
          <svg viewBox="0 0 400 400" fill="none" className="w-full h-full text-slate-400">
            <circle cx="350" cy="50" r="280" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="350" cy="50" r="220" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          </svg>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left Text & CTA */}
          <div className="md:col-span-7 space-y-4">
            <div className="w-8 h-1 rounded-full bg-slate-700 dark:bg-slate-300"></div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                GEC Club Management System
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 font-medium">
                Be a part of something bigger.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/clubs"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#0C1526] hover:bg-[#1A263D] text-white text-xs font-bold shadow-md transition-all group"
              >
                <span>Explore Clubs</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right: REAL GEC Campus Building Photo */}
          <div className="md:col-span-5 flex justify-end">
            <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden shadow-lg border border-white/60 dark:border-slate-800">
              <SafeImage
                src="/images/gec-building.jpg"
                alt="Goa College of Engineering Main Building"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-2.5 left-3 text-white text-[11px] font-semibold backdrop-blur-sm bg-black/30 px-2.5 py-0.5 rounded-lg border border-white/20">
                Goa College of Engineering • Farmagudi
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 STATISTIC METRIC CARDS */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${stat.bg}`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-none">
                  {stat.value}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {/* 3-COLUMN MAIN CONTENT SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* COLUMN 1: UPCOMING EVENTS (lg:col-span-4) */}
        <section className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              Upcoming Events
            </h2>
            <Link
              href="/events"
              className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {featuredEvents.map((evt) => (
              <Link
                key={evt.id}
                href={`/events/${evt.slug}`}
                className="flex items-center gap-3.5 p-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group"
              >
                {/* Date Badge */}
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-slate-500 tracking-wider">
                    {evt.month}
                  </span>
                  <span className="text-lg font-black text-slate-900 dark:text-white leading-none">
                    {evt.day}
                  </span>
                </div>

                {/* Event Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600 transition-colors">
                    {evt.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    <Clock className="w-3 h-3 shrink-0" />
                    <span className="truncate">{evt.time}</span>
                    <span>•</span>
                    <span className="truncate">{evt.venue}</span>
                  </div>
                </div>

                {/* Category Tag */}
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full shrink-0 ${evt.categoryColor}`}
                >
                  {evt.category}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* COLUMN 2: OUR CLUBS 2x3 GRID (lg:col-span-5) */}
        <section className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              Our Clubs
            </h2>
            <Link
              href="/clubs"
              className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {showcaseClubs.map((club) => {
              const Icon = club.icon;
              return (
                <Link
                  key={club.slug}
                  href={`/clubs/${club.slug}`}
                  className="p-3.5 rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-[#FAFAFA] dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all text-center flex flex-col items-center justify-center group shadow-sm hover:shadow"
                >
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700 flex items-center justify-center text-slate-800 dark:text-slate-200 mb-2 group-hover:scale-110 transition-transform shadow-xs">
                    <Icon className="w-5 h-5 text-slate-800 dark:text-slate-100" />
                  </div>
                  <h3 className="text-xs font-extrabold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {club.name}
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1 italic">
                    {club.tagline}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* COLUMN 3: ANNOUNCEMENTS (lg:col-span-3) */}
        <section className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-100 dark:border-slate-800">
              <Megaphone className="w-4 h-4 text-blue-600" />
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Announcements
              </h2>
            </div>

            <div className="space-y-3.5">
              {announcements.map((ann, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs">
                  <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 leading-snug">
                      {ann.title}
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">{ann.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <Link
              href="/events"
              className="w-full py-2.5 px-3 rounded-2xl bg-[#0C1526] hover:bg-[#1A263D] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>View All Announcements</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
