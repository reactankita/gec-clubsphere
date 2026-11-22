'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Club } from '@/types';
import { useApp } from '@/context/AppContext';
import { getCategoryColor } from '@/lib/utils';
import { Users, ArrowRight, CheckCircle2, Clock, Sparkles } from 'lucide-react';

interface ClubCardProps {
  club: Club;
}

export const ClubCard: React.FC<ClubCardProps> = ({ club }) => {
  const { getUserMembershipForClub, currentUser } = useApp();
  const membership = getUserMembershipForClub(club.id);
  const categoryStyle = getCategoryColor(club.category);

  return (
    <div className="group relative flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-200 overflow-hidden">
      {/* Top Banner Image */}
      <div className="relative h-36 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={club.banner_url}
          alt={club.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold backdrop-blur-md bg-white/90 dark:bg-slate-900/90 ${categoryStyle.text} border ${categoryStyle.border}`}
          >
            {club.category}
          </span>
        </div>

        {/* Demo Badge */}
        {club.is_demo && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-900/80 text-slate-300 backdrop-blur-md border border-slate-700">
              <Sparkles className="w-2.5 h-2.5 text-amber-400" />
              Demo Club
            </span>
          </div>
        )}

        {/* Membership status overlay if joined */}
        {membership && (
          <div className="absolute bottom-2 right-3">
            {membership.membership_status === 'approved' ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold bg-emerald-600 text-white shadow">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Member
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold bg-amber-500 text-white shadow">
                <Clock className="w-3.5 h-3.5" />
                Pending
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          {/* Logo + Title */}
          <div className="flex items-start gap-3">
            <div className="relative -mt-9 w-14 h-14 rounded-xl border-2 border-white dark:border-slate-900 overflow-hidden shadow-md bg-white dark:bg-slate-800 shrink-0">
              <img
                src={club.logo_url}
                alt={`${club.name} logo`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-base text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {club.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 italic">
                "{club.tagline}"
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
            {club.description}
          </p>
        </div>

        {/* Card Footer Details */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5 font-medium">
            <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{club.member_count} Members</span>
          </div>

          <Link
            href={`/clubs/${club.slug}`}
            className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group/btn"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
