'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { formatDate, formatTime, getCategoryColor } from '@/lib/utils';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Award,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  Share2,
  QrCode,
  Ticket,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export default function EventDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();

  const {
    getEventBySlug,
    getClubById,
    currentUser,
    registerForEvent,
    cancelRegistration,
    isUserRegisteredForEvent,
    showToast,
  } = useApp();

  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);

  const event = getEventBySlug(slug);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
        <div className="text-center max-w-md bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Event Not Found</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            The event you are looking for does not exist or has concluded.
          </p>
          <Link
            href="/events"
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Event Calendar</span>
          </Link>
        </div>
      </div>
    );
  }

  const club = getClubById(event.club_id);
  const isRegistered = isUserRegisteredForEvent(event.id);
  const isFull = event.current_participants >= event.max_participants;
  const seatsRemaining = Math.max(0, event.max_participants - event.current_participants);
  const fillPercentage = Math.min(100, (event.current_participants / event.max_participants) * 100);

  const categoryStyle = getCategoryColor(event.event_category);

  const handleRegister = () => {
    const success = registerForEvent(event.id);
    if (success) {
      setShowTicketModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Banner */}
      <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-900">
        <img
          src={event.banner_url}
          alt={event.title}
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

        {/* Navigation Breadcrumb */}
        <div className="container mx-auto px-4 sm:px-6 absolute top-6 left-0 right-0 z-10">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-white text-xs font-medium backdrop-blur-md transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to All Events</span>
          </Link>
        </div>

        {/* Banner Overlay Info */}
        <div className="container mx-auto px-4 sm:px-6 absolute bottom-6 left-0 right-0 z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span
                className={`px-3 py-0.5 rounded-full text-xs font-bold ${categoryStyle.bg} ${categoryStyle.text} border ${categoryStyle.border}`}
              >
                {event.event_category}
              </span>
              {club && (
                <Link
                  href={`/clubs/${club.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs text-white/90 hover:text-white bg-white/20 backdrop-blur-md px-3 py-0.5 rounded-full font-medium"
                >
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  <span>Organized by {club.name}</span>
                </Link>
              )}
              {isRegistered && (
                <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white shadow">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  You are registered
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="container mx-auto px-4 sm:px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Description, Schedule, Venue, FAQ */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Description */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                About This Event
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>

              {/* Venue Card */}
              <div className="mt-8 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-rose-500" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Campus Location & Venue
                  </h3>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                  {event.venue}
                </p>
                <p className="text-[11px] text-slate-400">
                  Goa College of Engineering (GEC), Farmagudi, Ponda, Goa 403401
                </p>
              </div>
            </div>

            {/* Organizing Club Card */}
            {club && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                  Organizing Student Body
                </h3>
                <div className="flex items-start gap-4">
                  <img
                    src={club.logo_url}
                    alt={club.name}
                    className="w-14 h-14 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-base text-slate-900 dark:text-white">
                      {club.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                      "{club.tagline}"
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2">
                      {club.description}
                    </p>

                    <div className="mt-4 flex items-center gap-4">
                      <Link
                        href={`/clubs/${club.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <span>View Club Profile</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Registration Card & Logistics */}
          <div className="space-y-6">
            {/* Registration Box */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-lg space-y-6 sticky top-24">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Registration Status
                </span>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    {isFull ? 'Housefull' : 'Free Entry'}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                    Official College Event
                  </span>
                </div>
              </div>

              {/* Date & Time */}
              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                      {formatDate(event.event_date)}
                    </span>
                    <span className="text-slate-400">Date</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                      {formatTime(event.start_time)} to {formatTime(event.end_time)}
                    </span>
                    <span className="text-slate-400">Timing</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                      {event.venue}
                    </span>
                    <span className="text-slate-400">Venue</span>
                  </div>
                </div>
              </div>

              {/* Capacity Progress Bar */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-500 dark:text-slate-400">Seat Capacity</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {event.current_participants} / {event.max_participants}
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isFull ? 'bg-rose-500' : fillPercentage > 85 ? 'bg-amber-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${fillPercentage}%` }}
                  ></div>
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5 text-right">
                  {seatsRemaining} seats remaining
                </p>
              </div>

              {/* Action Button */}
              <div>
                {isRegistered ? (
                  <div className="space-y-2">
                    <button
                      onClick={() => setShowTicketModal(true)}
                      className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <Ticket className="w-4 h-4" />
                      <span>View Confirmed Digital Pass</span>
                    </button>
                    <button
                      onClick={() => setIsCancelConfirmOpen(true)}
                      className="w-full py-2.5 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-xs font-semibold transition-colors"
                    >
                      Cancel Registration
                    </button>
                  </div>
                ) : isFull ? (
                  <button
                    disabled
                    className="w-full py-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-400 font-bold text-xs cursor-not-allowed"
                  >
                    Maximum Capacity Reached
                  </button>
                ) : (
                  <button
                    onClick={handleRegister}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Register For Event</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="text-[11px] text-slate-400 text-center leading-relaxed">
                Registered student details ({currentUser.full_name}, {currentUser.roll_number}) will be automatically attached to event roster.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Digital Ticket / Pass Modal */}
      {showTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden relative">
            {/* Ticket Header */}
            <div className="bg-gradient-to-r from-[#0B1F3A] to-[#1E3A8A] text-white p-6 relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300">
                  GEC Official E-Pass
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500 text-white font-bold">
                  CONFIRMED
                </span>
              </div>
              <h3 className="font-extrabold text-lg text-white mt-2 leading-tight">
                {event.title}
              </h3>
              <p className="text-xs text-blue-200 mt-1">
                {club?.name || 'GEC Campus Event'}
              </p>
            </div>

            {/* Ticket Body */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-xs border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <span className="text-slate-400 block">Attendee</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {currentUser.full_name}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Roll / Reg Number</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {currentUser.roll_number}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Date</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {formatDate(event.event_date)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Time</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {formatTime(event.start_time)}
                  </span>
                </div>
              </div>

              <div className="text-xs">
                <span className="text-slate-400 block">Venue</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {event.venue}
                </span>
              </div>

              {/* QR Mock code */}
              <div className="py-4 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
                <QrCode className="w-24 h-24 text-slate-800 dark:text-slate-200" />
                <span className="text-[10px] font-mono text-slate-400 mt-1 tracking-widest">
                  PASS-{event.id.toUpperCase()}-{currentUser.id.slice(0, 6).toUpperCase()}
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                  Ready for attendance scanning at entrance
                </span>
              </div>

              <button
                onClick={() => setShowTicketModal(false)}
                className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-500"
              >
                Close Pass
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Registration Confirmation Dialog */}
      {isCancelConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl text-center">
            <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Cancel Registration?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Are you sure you want to cancel your seat for "{event.title}"? Your seat will be made available to other students.
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={() => setIsCancelConfirmOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200"
              >
                Keep My Seat
              </button>
              <button
                onClick={() => {
                  cancelRegistration(event.id);
                  setIsCancelConfirmOpen(false);
                }}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
