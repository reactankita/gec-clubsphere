'use client';

import React from 'react';
import Link from 'next/link';
import { Event } from '@/types';
import { useApp } from '@/context/AppContext';
import { formatDate, formatTime, getCategoryColor } from '@/lib/utils';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Award
} from 'lucide-react';
import { SafeImage } from '@/components/safe-image';

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { isUserRegisteredForEvent, getClubById } = useApp();
  const isRegistered = isUserRegisteredForEvent(event.id);
  const club = getClubById(event.club_id);
  const categoryStyle = getCategoryColor(event.event_category);

  const isFull = event.current_participants >= event.max_participants;
  const seatsRemaining = Math.max(0, event.max_participants - event.current_participants);
  const fillPercentage = Math.min(100, (event.current_participants / event.max_participants) * 100);

  return (
    <div className="group flex flex-col rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-200 overflow-hidden">
      {/* Banner */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <SafeImage
          src={event.banner_url || '/images/gec-building.jpg'}
          alt={event.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold backdrop-blur-md bg-white/90 dark:bg-slate-900/90 ${categoryStyle.text} border ${categoryStyle.border}`}
          >
            {event.event_category}
          </span>
        </div>

        {/* Registered Badge */}
        {isRegistered && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-600 text-white shadow-md">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Registered
            </span>
          </div>
        )}

        {/* Club Chip */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
          <span className="text-xs font-semibold text-white/90 truncate drop-shadow flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            {club?.name || 'GEC Club'}
          </span>
          <span className="text-[11px] font-bold text-amber-300 drop-shadow shrink-0">
            {formatDate(event.event_date)}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {event.title}
          </h3>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
            {event.description}
          </p>

          {/* Meta details */}
          <div className="mt-3.5 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span>
                {formatTime(event.start_time)} - {formatTime(event.end_time)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>
          </div>
        </div>

        {/* Capacity Progress Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1.5">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3 text-slate-400" />
              <span>Capacity</span>
            </span>
            <span>
              {event.current_participants} / {event.max_participants} Seats
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                isFull
                  ? 'bg-rose-500'
                  : fillPercentage > 80
                  ? 'bg-amber-500'
                  : 'bg-blue-600'
              }`}
              style={{ width: `${fillPercentage}%` }}
            ></div>
          </div>

          <div className="mt-3.5 flex items-center justify-between">
            {isFull ? (
              <span className="text-xs font-semibold text-rose-600 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                <span>Housefull</span>
              </span>
            ) : (
              <span className="text-xs font-semibold text-emerald-600">
                {seatsRemaining} Seats Open
              </span>
            )}

            <Link
              href={`/events/${event.slug}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              <span>View Event</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
