'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ClubCard } from '@/components/club-card';
import { EventCard } from '@/components/event-card';
import { formatDate, formatTime } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Compass,
  User,
  Ticket,
  CheckCircle2,
  Clock,
  ArrowRight,
  LogOut,
  QrCode,
  ShieldAlert,
  Edit,
  Save,
  GraduationCap,
  Sparkles,
  Award
} from 'lucide-react';

export default function StudentDashboard() {
  const {
    currentUser,
    updateProfile,
    clubs,
    events,
    memberships,
    registrations,
    leaveClub,
    cancelRegistration,
    activityLogs,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'clubs' | 'events' | 'explore' | 'profile'>('overview');
  const [selectedTicketEvent, setSelectedTicketEvent] = useState<any>(null);

  // Profile edit states
  const [fullName, setFullName] = useState(currentUser.full_name);
  const [rollNumber, setRollNumber] = useState(currentUser.roll_number);
  const [department, setDepartment] = useState(currentUser.department);
  const [academicYear, setAcademicYear] = useState(currentUser.academic_year);
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [bio, setBio] = useState(currentUser.bio || '');

  // Computed data
  const userMemberships = memberships.filter((m) => m.user_id === currentUser.id);
  const approvedClubIds = userMemberships
    .filter((m) => m.membership_status === 'approved')
    .map((m) => m.club_id);
  const joinedClubs = clubs.filter((c) => approvedClubIds.includes(c.id));
  const pendingClubIds = userMemberships
    .filter((m) => m.membership_status === 'pending')
    .map((m) => m.club_id);
  const pendingClubs = clubs.filter((c) => pendingClubIds.includes(c.id));

  const userRegs = registrations.filter(
    (r) => r.user_id === currentUser.id && r.registration_status === 'confirmed'
  );
  const registeredEventIds = userRegs.map((r) => r.event_id);
  const registeredEvents = events.filter((e) => registeredEventIds.includes(e.id));
  const upcomingRegisteredEvents = registeredEvents.filter((e) => e.status === 'upcoming');

  const recommendedClubs = clubs
    .filter((c) => !approvedClubIds.includes(c.id) && !pendingClubIds.includes(c.id))
    .slice(0, 3);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      full_name: fullName,
      roll_number: rollNumber,
      department,
      academic_year: academicYear,
      phone,
      bio,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 shrink-0">
        {/* User Card */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 mb-6">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.profile_photo}
              alt={currentUser.full_name}
              className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
            />
            <div className="min-w-0">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                {currentUser.full_name}
              </h3>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                {currentUser.roll_number}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {currentUser.department} ({currentUser.academic_year})
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'clubs', label: `My Clubs (${joinedClubs.length})`, icon: Users },
            { id: 'events', label: `My Events (${registeredEvents.length})`, icon: Calendar },
            { id: 'explore', label: 'Explore Campus', icon: Compass },
            { id: 'profile', label: 'Student Profile', icon: User },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#0B1F3A] text-white shadow dark:bg-blue-600'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 space-y-1">
          <p className="font-semibold text-slate-500">Goa College of Engineering</p>
          <p>Farmagudi, Ponda — Student Portal</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-10 max-w-6xl overflow-y-auto">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Welcome Greeting Banner */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0B1F3A] via-[#152e52] to-[#1E3A8A] text-white shadow-md relative overflow-hidden">
              <div className="max-w-xl relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/50 text-blue-200 text-xs font-semibold mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Welcome Back, Rohan!</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Student Dashboard
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Track your club memberships, view your event entry passes, and stay updated with GEC extracurricular activities.
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Joined Clubs
                  </span>
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2">
                  {joinedClubs.length}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  {pendingClubs.length > 0 ? `+${pendingClubs.length} pending request` : 'Active member'}
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Upcoming Events
                  </span>
                  <Calendar className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2">
                  {upcomingRegisteredEvents.length}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Passes ready for check-in
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Academic Year
                  </span>
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2">
                  {currentUser.academic_year} IT
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Roll: {currentUser.roll_number}
                </p>
              </div>
            </div>

            {/* Upcoming Registered Events Quick List */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-blue-600" />
                  <span>My Upcoming Event Passes ({upcomingRegisteredEvents.length})</span>
                </h3>
                <button
                  onClick={() => setActiveTab('events')}
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  View All
                </button>
              </div>

              {upcomingRegisteredEvents.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  You haven't registered for any upcoming events yet.{' '}
                  <Link href="/events" className="text-blue-600 font-semibold hover:underline">
                    Browse events
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingRegisteredEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                          {event.title}
                        </h4>
                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 dark:text-slate-400">
                          <span>{formatDate(event.event_date)}</span>
                          <span>•</span>
                          <span>{formatTime(event.start_time)}</span>
                          <span>•</span>
                          <span>{event.venue}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedTicketEvent(event)}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                          <span>Show Pass</span>
                        </button>
                        <Link
                          href={`/events/${event.slug}`}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* My Clubs Snapshot */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>My Active Club Memberships</span>
                </h3>
                <button
                  onClick={() => setActiveTab('clubs')}
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  Manage Memberships
                </button>
              </div>

              {joinedClubs.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  You haven't joined any clubs yet.{' '}
                  <Link href="/clubs" className="text-blue-600 font-semibold hover:underline">
                    Explore 16 clubs
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {joinedClubs.map((club) => (
                    <div
                      key={club.id}
                      className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center gap-3"
                    >
                      <img
                        src={club.logo_url}
                        alt={club.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                          {club.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {club.category} • {club.member_count} members
                        </p>
                      </div>
                      <Link
                        href={`/clubs/${club.slug}`}
                        className="p-2 rounded-lg bg-white dark:bg-slate-800 text-blue-600 hover:text-blue-700 shadow-sm shrink-0"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: MY CLUBS */}
        {activeTab === 'clubs' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                My Club Memberships
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                View your active and pending club affiliations at Goa College of Engineering.
              </p>
            </div>

            {/* Pending Requests */}
            {pendingClubs.length > 0 && (
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-2xl p-5">
                <h3 className="font-bold text-sm text-amber-800 dark:text-amber-300 flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4" />
                  <span>Pending Coordinator Approval ({pendingClubs.length})</span>
                </h3>
                <div className="space-y-2">
                  {pendingClubs.map((club) => (
                    <div
                      key={club.id}
                      className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-200/60 dark:border-amber-900/40 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={club.logo_url}
                          alt={club.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                            {club.name}
                          </h4>
                          <p className="text-[10px] text-slate-500">
                            Faculty: {club.faculty_coordinator}
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-md">
                        Under Review
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Approved Memberships */}
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Active Clubs ({joinedClubs.length})
              </h3>

              {joinedClubs.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
                  <Users className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-500">You are not a member of any club yet.</p>
                  <Link
                    href="/clubs"
                    className="mt-4 inline-block px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
                  >
                    Explore Clubs to Join
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {joinedClubs.map((club) => (
                    <div
                      key={club.id}
                      className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={club.logo_url}
                              alt={club.name}
                              className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                            />
                            <div>
                              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                                {club.name}
                              </h4>
                              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                                Approved Member
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 line-clamp-2">
                          {club.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <Link
                          href={`/clubs/${club.slug}`}
                          className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <span>Club Page</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                        <button
                          onClick={() => leaveClub(club.id)}
                          className="text-xs font-medium text-rose-500 hover:text-rose-600 hover:underline"
                        >
                          Leave Club
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: MY EVENTS */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                My Event Registrations
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Your registered workshop passes and competition entry badges.
              </p>
            </div>

            {registeredEvents.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
                <Ticket className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <p className="text-xs text-slate-500">You haven't registered for any events yet.</p>
                <Link
                  href="/events"
                  className="mt-4 inline-block px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
                >
                  Browse Campus Calendar
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {registeredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={event.banner_url}
                        alt={event.title}
                        className="w-20 h-20 rounded-xl object-cover shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                            {event.title}
                          </h4>
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                            CONFIRMED
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                          <span>{formatDate(event.event_date)}</span>
                          <span>•</span>
                          <span>{formatTime(event.start_time)}</span>
                          <span>•</span>
                          <span>{event.venue}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setSelectedTicketEvent(event)}
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>View Pass</span>
                      </button>
                      <button
                        onClick={() => cancelRegistration(event.id)}
                        className="px-3 py-2 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-600 text-xs font-semibold hover:bg-rose-50 dark:hover:bg-rose-950/30"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: EXPLORE */}
        {activeTab === 'explore' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Recommended For You
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Hand-picked clubs and upcoming events aligned with student life at GEC.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4">
                Clubs You Might Like
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recommendedClubs.map((club) => (
                  <ClubCard key={club.id} club={club} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4">
                Upcoming Hackathons & Contests
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {events.filter((e) => e.status === 'upcoming').slice(0, 2).map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: STUDENT PROFILE */}
        {activeTab === 'profile' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Student Profile
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Manage your official Goa College of Engineering student record.
              </p>
            </div>

            <form
              onSubmit={handleProfileSave}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    College Roll / Registration No.
                  </label>
                  <input
                    type="text"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Department / Engineering Branch
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Computer Engineering">Computer Engineering</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electronics & Telecommunication">Electronics & Telecommunication</option>
                    <option value="Electrical & Electronics">Electrical & Electronics</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Mining Engineering">Mining Engineering</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Academic Year
                  </label>
                  <select
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="FE">First Year (FE)</option>
                    <option value="SE">Second Year (SE)</option>
                    <option value="TE">Third Year (TE)</option>
                    <option value="BE">Final Year (BE)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    College Email (Read Only)
                  </label>
                  <input
                    type="email"
                    value={currentUser.email}
                    disabled
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-sm text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Bio / Interests
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile Updates</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Ticket QR Modal */}
      {selectedTicketEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#0B1F3A] to-[#1E3A8A] text-white p-5">
              <span className="text-[10px] font-bold tracking-wider text-blue-300 uppercase">
                GEC Digital Pass
              </span>
              <h3 className="font-bold text-base mt-1 text-white leading-tight">
                {selectedTicketEvent.title}
              </h3>
              <p className="text-xs text-blue-200 mt-1">{selectedTicketEvent.venue}</p>
            </div>

            <div className="p-5 text-center space-y-4">
              <div className="py-4 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <QrCode className="w-28 h-28 text-slate-800 dark:text-slate-200" />
                <span className="text-[10px] font-mono text-slate-400 mt-2">
                  ENTRY-{selectedTicketEvent.id.toUpperCase()}-{currentUser.roll_number}
                </span>
              </div>

              <div className="text-xs text-left text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-3 space-y-1">
                <div>
                  <strong>Attendee:</strong> {currentUser.full_name}
                </div>
                <div>
                  <strong>Date:</strong> {formatDate(selectedTicketEvent.event_date)}
                </div>
                <div>
                  <strong>Time:</strong> {formatTime(selectedTicketEvent.start_time)}
                </div>
              </div>

              <button
                onClick={() => setSelectedTicketEvent(null)}
                className="w-full py-2 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
