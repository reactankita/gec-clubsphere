'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { EventCard } from '@/components/event-card';
import { EventCategory } from '@/types';
import {
  Calendar,
  Search,
  Filter,
  Users,
  Award,
  Sparkles,
  Clock,
  ArrowUpDown,
  X,
  ExternalLink
} from 'lucide-react';

export default function EventsPage() {
  const { events, clubs, currentUser } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedClubId, setSelectedClubId] = useState<string>('All');
  const [timelineFilter, setTimelineFilter] = useState<'All' | 'Upcoming' | 'Past'>('Upcoming');

  const categories: (EventCategory | 'All')[] = [
    'All',
    'Hackathon',
    'Workshop',
    'Competition',
    'Cultural Event',
    'Sports',
    'Seminar',
    'Fest',
    'Orientation',
  ];

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Search
      const query = searchQuery.toLowerCase();
      const club = clubs.find((c) => c.id === event.club_id);
      const matchesSearch =
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.venue.toLowerCase().includes(query) ||
        (club && club.name.toLowerCase().includes(query));

      // Category
      const matchesCategory =
        selectedCategory === 'All' || event.event_category === selectedCategory;

      // Club filter
      const matchesClub =
        selectedClubId === 'All' || event.club_id === selectedClubId;

      // Timeline filter
      let matchesTimeline = true;
      if (timelineFilter === 'Upcoming') {
        matchesTimeline = event.status === 'upcoming';
      } else if (timelineFilter === 'Past') {
        matchesTimeline = event.status === 'completed';
      }

      return matchesSearch && matchesCategory && matchesClub && matchesTimeline;
    });
  }, [events, clubs, searchQuery, selectedCategory, selectedClubId, timelineFilter]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header Breadcrumb & Title */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">
            <Calendar className="w-4 h-4" />
            <span>Goa College of Engineering Event Calendar</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Campus Events & Hackathons
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Register for university workshops, national hackathons, cultural festivals, and sports leagues organized by student chapters at GEC Farmagudi.
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm space-y-4 mb-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search events by name, venue, organizer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              {/* Timeline Toggle */}
              <div className="flex items-center p-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium">
                {(['Upcoming', 'Past', 'All'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimelineFilter(t)}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      timelineFilter === t
                        ? 'bg-[#0B1F3A] text-white shadow font-semibold dark:bg-blue-600'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Filter by Club */}
              <select
                value={selectedClubId}
                onChange={(e) => setSelectedClubId(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-[160px] truncate"
              >
                <option value="All">All Clubs</option>
                {clubs.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
            <span className="text-slate-400 font-semibold flex items-center gap-1 shrink-0">
              <Filter className="w-3 h-3" />
              Category:
            </span>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full font-medium shrink-0 transition-all ${
                    isSelected
                      ? 'bg-[#0B1F3A] text-white shadow-sm font-semibold dark:bg-blue-600'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-6 px-1">
          <span>
            Showing <strong className="text-slate-900 dark:text-white">{filteredEvents.length}</strong> of{' '}
            {events.length} Events
          </span>
          {(currentUser.role === 'club_coordinator' || currentUser.role === 'super_admin') && (
            <Link
              href={currentUser.role === 'super_admin' ? '/admin' : '/club-dashboard'}
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1"
            >
              <span>+ Create / Manage Events in Console</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          )}
        </div>

        {/* Event Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-500 mx-auto mb-4">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No matching events found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              No events found matching your current search and filters. Try adjusting your query or category selection.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedClubId('All');
                setTimelineFilter('All');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
