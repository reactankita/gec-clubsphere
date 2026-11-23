'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { EventCard } from '@/components/event-card';
import { getCategoryColor, formatDate } from '@/lib/utils';
import {
  Users,
  Calendar,
  Award,
  Sparkles,
  MapPin,
  Clock,
  Mail,
  ExternalLink,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  Share2,
  ShieldAlert,
  Send,
  X,
  Instagram,
  Linkedin,
  Github,
  Globe,
  Building,
  UserCheck,
  History,
  FileCheck,
  BookmarkCheck,
  Check,
  Download,
  CalendarCheck
} from 'lucide-react';

import { SafeImage } from '@/components/safe-image';

export default function ClubDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();

  const {
    getClubBySlug,
    events,
    currentUser,
    joinClub,
    leaveClub,
    getUserMembershipForClub,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'council' | 'history' | 'events' | 'gallery'>('overview');
  const [selectedHistoryYear, setSelectedHistoryYear] = useState<string>('2024-25');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isConfirmLeaveOpen, setIsConfirmLeaveOpen] = useState(false);
  const [isRsvpd, setIsRsvpd] = useState(false);

  const club = getClubBySlug(slug);

  if (!club) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
        <div className="text-center max-w-md bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Club Not Found</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            The club you are looking for does not exist or has been modified.
          </p>
          <Link
            href="/clubs"
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Club Directory</span>
          </Link>
        </div>
      </div>
    );
  }

  const membership = getUserMembershipForClub(club.id);
  const isApprovedMember = membership?.membership_status === 'approved';
  const isPendingMember = membership?.membership_status === 'pending';

  // Club events
  const clubEvents = events.filter((e) => e.club_id === club.id);
  const upcomingClubEvents = clubEvents.filter((e) => e.status === 'upcoming');
  const pastClubEvents = clubEvents.filter((e) => e.status === 'completed');

  const categoryStyle = getCategoryColor(club.category);

  // Real GEC Goa campus image fallback
  const gecCampusBanner = '/images/gec-building.jpg';

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactSubject || !contactMessage) {
      showToast('Please fill in both subject and message', 'error');
      return;
    }
    showToast(`Inquiry sent to ${club.faculty_coordinator} and ${club.student_coordinator}!`, 'success');
    setIsContactModalOpen(false);
    setContactSubject('');
    setContactMessage('');
  };

  const handleRsvp = () => {
    setIsRsvpd(true);
    showToast(`RSVP confirmed for ${club.next_meeting?.title || 'next club meeting'}!`, 'success');
  };

  const handleDownloadIcs = () => {
    if (!club.next_meeting) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//GEC ClubSphere//EN
BEGIN:VEVENT
SUMMARY:${club.name}: ${club.next_meeting.title}
DESCRIPTION:${club.next_meeting.agenda}
LOCATION:${club.next_meeting.venue}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${club.slug}-meeting.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Calendar invite (.ics) downloaded!', 'info');
  };

  // History council data
  const historyYears = club.council_history || [];
  const currentHistoryCouncil = historyYears.find((h) => h.academic_year === selectedHistoryYear) || historyYears[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Top Banner with Real GEC Goa Campus Photo */}
      <div className="relative h-64 sm:h-72 lg:h-80 w-full overflow-hidden bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <SafeImage
          src={club.banner_url || gecCampusBanner}
          fallbackSrc="/images/gec-building.jpg"
          alt={club.name}
          className="w-full h-full object-cover opacity-75 filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

        {/* Back navigation */}
        <div className="container mx-auto px-4 sm:px-6 absolute top-5 left-0 right-0 z-10">
          <Link
            href="/clubs"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/50 hover:bg-black/70 text-white text-xs font-medium backdrop-blur-md transition-all border border-white/10"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>All GEC Clubs</span>
          </Link>
        </div>

        {/* Hero Details */}
        <div className="container mx-auto px-4 sm:px-6 absolute bottom-6 left-0 right-0 z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-white/90 dark:border-slate-800 overflow-hidden shadow-2xl bg-white dark:bg-slate-800 shrink-0">
                <SafeImage
                  src={club.logo_url}
                  fallbackSrc="/images/gec-building.jpg"
                  alt={`${club.name} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-white pb-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${categoryStyle.bg} ${categoryStyle.text} border ${categoryStyle.border}`}
                  >
                    {club.category}
                  </span>
                  <span className="text-[11px] bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full font-medium">
                    Estd. {club.established_year}
                  </span>
                  <span className="text-[11px] bg-blue-900/60 text-blue-200 border border-blue-700/50 backdrop-blur-md px-2.5 py-0.5 rounded-full font-medium">
                    Goa College of Engineering
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-white">
                  {club.name}
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 italic mt-0.5">
                  "{club.tagline}"
                </p>
              </div>
            </div>

            {/* Actions: Join / Leave / Contact */}
            <div className="flex items-center gap-2">
              {isApprovedMember ? (
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Member</span>
                  </span>
                  <button
                    onClick={() => setIsConfirmLeaveOpen(true)}
                    className="px-3 py-2 rounded-xl bg-rose-600/90 hover:bg-rose-700 text-white text-xs font-medium transition-colors"
                  >
                    Leave
                  </button>
                </div>
              ) : isPendingMember ? (
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold shadow">
                  <Clock className="w-4 h-4" />
                  <span>Pending Approval</span>
                </span>
              ) : (
                <button
                  onClick={() => joinClub(club.id)}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md transition-all"
                >
                  Join Club
                </button>
              )}

              <button
                onClick={() => setIsContactModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/20 transition-all flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-4 sm:px-6 pt-6">
        {/* KPI Strip: Fast Visual Insights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-base font-extrabold text-slate-900 dark:text-white leading-none">
                {club.member_count}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Enrolled Members</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900 flex items-center justify-center shrink-0">
              <CalendarCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <div className="text-base font-extrabold text-slate-900 dark:text-white leading-none">
                {clubEvents.length}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Events & Contests</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-100 dark:border-amber-900 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <div className="text-base font-extrabold text-slate-900 dark:text-white leading-none">
                {club.achievements.length}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Key Accolades</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900 flex items-center justify-center shrink-0">
              <Building className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {club.faculty_advisor?.cabin || 'Farmagudi Campus'}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Faculty Cabin</p>
            </div>
          </div>
        </div>

        {/* Designer Interactive Segmented Tabs */}
        <div className="flex items-center gap-1 border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'overview', label: 'Overview & Meetups', icon: Clock },
            { id: 'council', label: 'Current Council & Roles', icon: Users },
            { id: 'history', label: 'Council Archive & History', icon: History },
            { id: 'events', label: `Events (${clubEvents.length})`, icon: Calendar },
            { id: 'gallery', label: 'Achievements & Gallery', icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all shrink-0 border-b-2 -mb-1 ${
                  isActive
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900 shadow-sm'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW & NEXT MEETUP */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 space-y-6">
              {/* Scheduled Next Meeting Banner Card */}
              {club.next_meeting && (
                <div className="rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-white dark:from-blue-950/40 dark:via-slate-900 dark:to-slate-900 p-5 sm:p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white shadow-sm mb-2 uppercase tracking-wide">
                        <Clock className="w-3 h-3" />
                        <span>Next Scheduled Meeting</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {club.next_meeting.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleDownloadIcs}
                        className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-1"
                        title="Add to Google / Apple / Outlook calendar"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>.ics</span>
                      </button>
                      <button
                        onClick={handleRsvp}
                        disabled={isRsvpd}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all flex items-center gap-1 ${
                          isRsvpd
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#0B1F3A] hover:bg-[#152e52] text-white'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{isRsvpd ? 'RSVP Confirmed' : 'RSVP to Attend'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-blue-100 dark:border-slate-800 text-xs">
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-semibold text-slate-700 dark:text-slate-300 block">Date & Time</span>
                        <span className="text-slate-500 dark:text-slate-400">{club.next_meeting.date} • {club.next_meeting.time}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-semibold text-slate-700 dark:text-slate-300 block">Campus Venue</span>
                        <span className="text-slate-500 dark:text-slate-400">{club.next_meeting.venue}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <BookmarkCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-semibold text-slate-700 dark:text-slate-300 block">Mode</span>
                        <span className="text-slate-500 dark:text-slate-400">{club.next_meeting.mode} on Farmagudi Hill</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3.5 p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-blue-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">Agenda: </strong>
                    {club.next_meeting.agenda}
                  </div>
                </div>
              )}

              {/* About the Club Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  About {club.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {club.description}
                </p>

                {/* Flagship Events Organized */}
                {club.flagship_events && (
                  <div className="pt-2">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2.5">
                      Flagship Events Conducted
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {club.flagship_events.map((fe, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                        >
                          {fe}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Faculty Advisor & Contacts */}
            <div className="lg:col-span-4 space-y-4">
              {/* Faculty Advisor Card */}
              {club.faculty_advisor && (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
                  <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    Assigned Faculty Advisor
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 flex items-center justify-center font-bold text-base text-blue-700 dark:text-blue-300 shrink-0">
                      {club.faculty_advisor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {club.faculty_advisor.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {club.faculty_advisor.designation}
                      </p>
                      <p className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                        {club.faculty_advisor.department}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{club.faculty_advisor.cabin}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <a href={`mailto:${club.faculty_advisor.email}`} className="text-blue-600 hover:underline truncate">
                        {club.faculty_advisor.email}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Student Coordinator Quick Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3">
                <div className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  Lead Student Coordinator
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {club.student_coordinator}
                </h4>
                <a
                  href={`mailto:${club.student_coordinator_email}`}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 dark:text-slate-400"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span className="truncate">{club.student_coordinator_email}</span>
                </a>
              </div>

              {/* Social Channels */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Connect & Socials
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  {club.social_links?.instagram && (
                    <a
                      href={club.social_links.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-pink-300 hover:bg-pink-50 dark:hover:bg-pink-950/30 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors"
                    >
                      <Instagram className="w-3.5 h-3.5 text-pink-600" />
                      <span>Instagram</span>
                    </a>
                  )}
                  {club.social_links?.linkedin && (
                    <a
                      href={club.social_links.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/30 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {club.social_links?.github && (
                    <a
                      href={club.social_links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CURRENT COUNCIL & MEMBERS */}
        {activeTab === 'council' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-blue-600" />
                  <span>Current Executive Council (Academic Year 2024–2025)</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Elected student leadership governing {club.name} activities, budgets, and competitions.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                Official Student Body
              </span>
            </div>

            {/* Council Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(club.council || []).map((member, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm hover:border-blue-400 dark:hover:border-blue-600 transition-all flex items-start gap-3.5"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-950 border border-slate-700 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 mb-1">
                      {member.role}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                      {member.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {member.department} • Year {member.year}
                    </p>
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:underline mt-1.5"
                      >
                        <Mail className="w-3 h-3" />
                        <span>{member.email}</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* General Membership Statistics Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                Active Member Roster Summary
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                Currently, <strong>{club.member_count} undergraduate engineering students</strong> across Computer, IT, Electronics, Mechanical, Electrical, Civil, and Mining branches are actively registered in {club.name}.
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: COUNCIL ARCHIVE & HISTORY */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <History className="w-5 h-5 text-indigo-600" />
                  <span>Yearly Council Archive & Legacy</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Historical record of student office bearers and themes by academic year.
                </p>
              </div>

              {/* Year Switcher Selector */}
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
                {historyYears.map((hy) => (
                  <button
                    key={hy.academic_year}
                    onClick={() => setSelectedHistoryYear(hy.academic_year)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedHistoryYear === hy.academic_year
                        ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    AY {hy.academic_year}
                  </button>
                ))}
              </div>
            </div>

            {/* Year Showcase Card */}
            {currentHistoryCouncil && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div>
                    <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                      Academic Year Council: {currentHistoryCouncil.academic_year}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                      Theme: "{currentHistoryCouncil.theme}"
                    </h4>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {currentHistoryCouncil.council.length} Recorded Office Bearers
                  </span>
                </div>

                {/* Historical Council Members Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentHistoryCouncil.council.map((cMember, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-800/40 space-y-1.5"
                    >
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                        {cMember.role}
                      </span>
                      <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                        {cMember.name}
                      </h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {cMember.department} ({cMember.year})
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: EVENTS & HACKATHONS */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span>Upcoming & Recent Events ({clubEvents.length})</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Workshops, hackathons, seminars, and technical challenges hosted by {club.name}.
              </p>
            </div>

            {clubEvents.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center text-xs text-slate-500">
                No events scheduled at this moment. Stay tuned!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {clubEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: ACHIEVEMENTS & GALLERY */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span>Accolades, State Trophies & Campus Moments</span>
              </h3>
            </div>

            {/* Achievements Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {club.achievements.map((ach, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900 text-amber-600 flex items-center justify-center font-bold text-xs shrink-0">
                    #{idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                    {ach}
                  </p>
                </div>
              ))}
            </div>

            {/* Real Campus Photos Gallery */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                Campus Activity Photographs
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(club.gallery || [gecCampusBanner]).map((img, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl overflow-hidden h-48 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 group"
                  >
                    <SafeImage
                      src={img}
                      fallbackSrc="/images/gec-building.jpg"
                      alt={`${club.name} capture`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contact Club Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Contact {club.name}
              </h3>
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Subject / Inquiry Type
                </label>
                <input
                  type="text"
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  placeholder="e.g. Workshop question, collaboration inquiry"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Message for Coordinator & Faculty Advisor
                </label>
                <textarea
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  rows={4}
                  placeholder="Type your message here..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiry</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Leave Club Confirmation Modal */}
      {isConfirmLeaveOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-sm w-full p-6 shadow-2xl text-center space-y-4">
            <ShieldAlert className="w-10 h-10 text-rose-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Leave {club.name}?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              You will lose access to member-only code jams, workshops, and meeting notifications.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsConfirmLeaveOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Stay Enrolled
              </button>
              <button
                onClick={() => {
                  leaveClub(club.id);
                  setIsConfirmLeaveOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow"
              >
                Confirm Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}