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
  Globe
} from 'lucide-react';

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

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isConfirmLeaveOpen, setIsConfirmLeaveOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Top Banner */}
      <div className="relative h-64 sm:h-80 lg:h-96 w-full overflow-hidden bg-slate-900">
        <img
          src={club.banner_url}
          alt={club.name}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

        {/* Back navigation button */}
        <div className="container mx-auto px-4 sm:px-6 absolute top-6 left-0 right-0 z-10">
          <Link
            href="/clubs"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-white text-xs font-medium backdrop-blur-md transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to All Clubs</span>
          </Link>
        </div>

        {/* Banner Details */}
        <div className="container mx-auto px-4 sm:px-6 absolute bottom-6 left-0 right-0 z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-4 border-white dark:border-slate-900 overflow-hidden shadow-2xl bg-white dark:bg-slate-800 shrink-0">
                <img
                  src={club.logo_url}
                  alt={club.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-white pb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${categoryStyle.bg} ${categoryStyle.text} border ${categoryStyle.border}`}
                  >
                    {club.category}
                  </span>
                  <span className="text-xs bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full font-medium">
                    Estd. {club.established_year}
                  </span>
                  {club.is_demo && (
                    <span className="text-[10px] bg-amber-500/80 text-white px-2 py-0.5 rounded-full font-semibold">
                      Demo Chapter
                    </span>
                  )}
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mt-1.5">
                  {club.name}
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 italic mt-0.5">
                  "{club.tagline}"
                </p>
              </div>
            </div>

            {/* Actions: Join / Leave / Manage */}
            <div className="flex items-center gap-2.5">
              {currentUser.role === 'club_coordinator' || currentUser.role === 'super_admin' ? (
                <Link
                  href={currentUser.role === 'super_admin' ? '/admin' : '/club-dashboard'}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg transition-all"
                >
                  Edit Club in Console
                </Link>
              ) : isApprovedMember ? (
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Joined Member</span>
                  </span>
                  <button
                    onClick={() => setIsConfirmLeaveOpen(true)}
                    className="px-3 py-2 rounded-xl bg-rose-500/80 hover:bg-rose-600 text-white text-xs font-semibold transition-colors"
                  >
                    Leave Club
                  </button>
                </div>
              ) : isPendingMember ? (
                <span className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 text-white text-xs font-bold shadow">
                  <Clock className="w-4 h-4" />
                  <span>Membership Pending</span>
                </span>
              ) : (
                <button
                  onClick={() => joinClub(club.id)}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg transition-all"
                >
                  Join This Club
                </button>
              )}

              <button
                onClick={() => setIsContactModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/20 transition-all"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="container mx-auto px-4 sm:px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Details, Description, Achievements, Events */}
          <div className="lg:col-span-2 space-y-8">
            {/* About the Club */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                About the Club
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {club.description}
              </p>

              {/* Meeting Info */}
              <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Official Meeting Schedule
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                    {club.meeting_info}
                  </p>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Key Achievements & Accolades
                </h2>
              </div>
              <ul className="space-y-3">
                {club.achievements.map((ach, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                  >
                    <span className="w-6 h-6 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 font-bold shrink-0 text-xs">
                      {idx + 1}
                    </span>
                    <span className="pt-0.5">{ach}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Upcoming Events of this Club */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span>Upcoming Events ({upcomingClubEvents.length})</span>
                </h2>
              </div>

              {upcomingClubEvents.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center text-xs text-slate-500">
                  No upcoming events scheduled right now. Check back soon!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {upcomingClubEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              )}
            </div>

            {/* Past Events */}
            {pastClubEvents.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Past Events
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pastClubEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            )}

            {/* Photo Gallery */}
            {club.gallery && club.gallery.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                  Activity Gallery
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {club.gallery.map((img, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl overflow-hidden h-48 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                    >
                      <img
                        src={img}
                        alt={`${club.name} activity`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Leadership, Meta & Social */}
          <div className="space-y-6">
            {/* Leadership Box */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Club Leadership
              </h3>

              {/* Faculty Advisor */}
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Faculty Coordinator
                </span>
                <p className="font-bold text-sm text-slate-900 dark:text-white mt-0.5">
                  {club.faculty_coordinator}
                </p>
                <a
                  href={`mailto:${club.faculty_coordinator_email}`}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 dark:text-slate-400 mt-1"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{club.faculty_coordinator_email}</span>
                </a>
              </div>

              {/* Student Lead */}
              <div>
                <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  Student Coordinator
                </span>
                <p className="font-bold text-sm text-slate-900 dark:text-white mt-0.5">
                  {club.student_coordinator}
                </p>
                <a
                  href={`mailto:${club.student_coordinator_email}`}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 dark:text-slate-400 mt-1"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{club.student_coordinator_email}</span>
                </a>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4 text-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Quick Facts
              </h3>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Total Enrolled Members</span>
                <span className="font-bold text-slate-900 dark:text-white">{club.member_count}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Status</span>
                <span className="font-bold text-emerald-600 capitalize">{club.status}</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-500 dark:text-slate-400">Domain</span>
                <span className="font-bold text-slate-900 dark:text-white">{club.category}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                Connect With Club
              </h3>
              <div className="space-y-2 text-xs">
                {club.social_links?.instagram && (
                  <a
                    href={club.social_links.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-pink-50 dark:hover:bg-pink-950/20 hover:border-pink-300 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-pink-600" />
                    <span>Instagram Profile</span>
                  </a>
                )}
                {club.social_links?.linkedin && (
                  <a
                    href={club.social_links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:border-blue-300 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-blue-600" />
                    <span>LinkedIn Page</span>
                  </a>
                )}
                {club.social_links?.github && (
                  <a
                    href={club.social_links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Organization</span>
                  </a>
                )}
                {club.social_links?.website && (
                  <a
                    href={club.social_links.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/20 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <Globe className="w-4 h-4 text-blue-500" />
                    <span>Official Portal</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Club Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl relative">
            <button
              onClick={() => setIsContactModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Contact {club.name}
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Your inquiry will be routed to {club.student_coordinator} and {club.faculty_coordinator}.
            </p>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="e.g. Inquiring about joining the core design team"
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Type your message here..."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Leave Club Confirmation Dialog */}
      {isConfirmLeaveOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl text-center">
            <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Leave {club.name}?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Are you sure you want to withdraw your membership? You can reapply anytime.
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={() => setIsConfirmLeaveOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200"
              >
                Stay in Club
              </button>
              <button
                onClick={() => {
                  leaveClub(club.id);
                  setIsConfirmLeaveOpen(false);
                }}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold"
              >
                Yes, Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
