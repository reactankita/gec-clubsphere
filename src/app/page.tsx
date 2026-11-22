'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ClubCard } from '@/components/club-card';
import { EventCard } from '@/components/event-card';
import {
  Compass,
  Calendar,
  Sparkles,
  ArrowRight,
  Award,
  Zap,
  Users,
  Lightbulb,
  CheckCircle,
  GraduationCap,
  Shield,
  Layers,
  Flame,
  ChevronRight
} from 'lucide-react';

export default function HomePage() {
  const { clubs, events, currentUser } = useApp();

  const featuredClubs = clubs.slice(0, 6);
  const upcomingEvents = events.filter((e) => e.status === 'upcoming').slice(0, 3);

  const stats = [
    { label: 'Total Student Clubs', value: `${clubs.length}`, sub: 'Across 8 Diverse Domains', icon: Layers },
    { label: 'Active Student Members', value: '1,240+', sub: 'From FE to BE across 7 branches', icon: Users },
    { label: 'Upcoming Campus Events', value: `${events.filter(e => e.status === 'upcoming').length}`, sub: 'Hackathons, Quizzes & Fests', icon: Calendar },
    { label: 'Events Conducted', value: '45+', sub: 'This Academic Year', icon: Award },
  ];

  const whyJoinPoints = [
    {
      title: 'Skill Development',
      desc: 'Gain hands-on expertise in robotics, competitive programming, AI, theatre, or event production beyond textbooks.',
      icon: Zap,
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      title: 'Leadership Opportunities',
      desc: 'Lead student delegations, manage budgets, direct state-level fests, and build leadership credentials for your resume.',
      icon: Award,
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      title: 'Innovation & Research',
      desc: 'Collaborate on Smart India Hackathons, publish IEEE papers, and incubate startups under Goa State Innovation Council.',
      icon: Lightbulb,
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      title: 'Vibrant Networking',
      desc: 'Forge lifelong friendships, connect with GEC alumni working at Fortune 500 tech firms, and build inter-branch camaraderie.',
      icon: Users,
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      title: 'Active Campus Engagement',
      desc: 'Be at the epicenter of college life on Farmagudi hill, organizing Kurukshetra, Spectrum, and cultural flash mobs.',
      icon: Flame,
      gradient: 'from-rose-500 to-red-600',
    },
    {
      title: 'Official Recognition',
      desc: 'Earn AICTE activity points and official certificates of extracurricular excellence endorsed by Dean of Student Affairs.',
      icon: CheckCircle,
      gradient: 'from-cyan-500 to-blue-600',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#071527] via-[#0B1F3A] to-[#071527] text-white pt-16 pb-20 lg:pt-20 lg:pb-28">
        {/* Real GEC Campus Photo Background Texture */}
        <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/67/Goa_Engineering_College.jpg"
            alt="Goa College of Engineering Campus"
            className="w-full h-full object-cover filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071527] via-[#0B1F3A]/80 to-[#071527]/90"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            {/* Institution Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/60 border border-blue-700/50 text-blue-200 text-xs font-semibold backdrop-blur-md shadow-sm">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              <span>Goa College of Engineering • Farmagudi, Ponda</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
              Discover Your Passion.{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Build Your Community.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
              Explore 16 active student clubs, register for hackathons, join weekly coding jams, and connect with faculty advisors at GEC Farmagudi.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/clubs"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-600/30 transition-all text-xs group"
              >
                <Compass className="w-4 h-4" />
                <span>Explore 16 Clubs</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/events"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold backdrop-blur-md transition-all text-xs"
              >
                <Calendar className="w-4 h-4 text-blue-300" />
                <span>Upcoming Events</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Real GEC Campus Landmarks Visual Strip */}
        <div className="container mx-auto px-4 sm:px-6 mt-12 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 h-28 group shadow-lg">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/67/Goa_Engineering_College.jpg"
                alt="GEC Main Building"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
              <div className="absolute bottom-2.5 left-3 text-left">
                <span className="text-[10px] text-blue-300 font-semibold uppercase tracking-wider block">Admin Block</span>
                <span className="text-xs font-bold text-white">Main Building</span>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-white/15 h-28 group shadow-lg">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/e6/Goa_Engineering_College_-_Library.jpg"
                alt="GEC Central Library"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
              <div className="absolute bottom-2.5 left-3 text-left">
                <span className="text-[10px] text-indigo-300 font-semibold uppercase tracking-wider block">Knowledge Hub</span>
                <span className="text-xs font-bold text-white">Central Library</span>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-white/15 h-28 group shadow-lg">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Goa_Engineering_College_-_Hostel_3.jpg"
                alt="GEC Student Hostels"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
              <div className="absolute bottom-2.5 left-3 text-left">
                <span className="text-[10px] text-emerald-300 font-semibold uppercase tracking-wider block">Student Life</span>
                <span className="text-xs font-bold text-white">Campus Hostels</span>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-white/15 h-28 group shadow-lg">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/ee/Goa_Engineering_College_-_Windmill.jpg"
                alt="GEC Farmagudi Peak"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
              <div className="absolute bottom-2.5 left-3 text-left">
                <span className="text-[10px] text-amber-300 font-semibold uppercase tracking-wider block">285 Acres</span>
                <span className="text-xs font-bold text-white">Farmagudi Hill</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="py-12 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Campus ClubSphere Metrics
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  Live Seeded Data
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Real-time extracurricular statistics from Goa College of Engineering
              </p>
            </div>
            <div className="text-xs text-slate-400 italic">
              *Demo database loaded with 16 GEC clubs & 20 campus events
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm flex items-start gap-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {s.value}
                    </div>
                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
                      {s.label}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{s.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED CLUBS */}
      <section className="py-16 lg:py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Student Communities</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Featured GEC Clubs
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
                Discover student-driven chapters fostering technical innovation, cultural expression, debate, robotics, and sports.
              </p>
            </div>
            <Link
              href="/clubs"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group"
            >
              <span>View All 16 Clubs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredClubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>Campus Calendar</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Upcoming Events & Hackathons
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
                Register for workshops, competitive challenges, cultural evenings, and athletic meets happening across Farmagudi.
              </p>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group"
            >
              <span>Explore All Events</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY JOIN A CLUB? */}
      <section className="py-16 lg:py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Student Growth</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Why Join a Club at GEC?
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Engineering isn't just about formulas and lectures. Extracurricular participation shapes well-rounded innovators, team leaders, and industry-ready graduates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyJoinPoints.map((point, idx) => {
              const Icon = point.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${point.gradient} flex items-center justify-center text-white mb-4 shadow`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 bg-[#0B1F3A] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#2563eb18_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to shape your college journey?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            Join a club today, participate in university competitions, or apply to lead your branch's flagship events.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/clubs"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/40 transition-all"
            >
              Explore Club Directory
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-sm transition-all"
            >
              Sign In to Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
