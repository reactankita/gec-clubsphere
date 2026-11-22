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
    <div className="group flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-200 overflow-hidden">
      {/* Banner */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={event.banner_url}
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
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
            {event.title}
          </h3>

          <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
            {event.description}
          </p>

          {/* Logistics meta */}
          <div className="mt-4 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>
                {formatTime(event.start_time)} – {formatTime(event.end_time)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>
          </div>
        </div>

        {/* Capacity & Action */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>Capacity</span>
            </span>
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {isFull ? (
                <span className="text-rose-600 dark:text-rose-400 font-bold">Housefull</span>
              ) : (
                <span>{seatsRemaining} seats left</span>
              )}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mb-3">
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

          <div className="flex items-center justify-between">
            <Link
              href={`/events/${event.slug}`}
              className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all group/btn"
            >
              <span>{isRegistered ? 'View Pass & Details' : 'View Details & Register'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
