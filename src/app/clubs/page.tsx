'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ClubCard } from '@/components/club-card';
import { ClubCategory } from '@/types';
import {
  Search,
  Filter,
  LayoutGrid,
  List as ListIcon,
  Sparkles,
  Users,
  Compass,
  ArrowUpDown,
  CheckCircle2,
  X,
  ExternalLink
} from 'lucide-react';
import { getCategoryColor } from '@/lib/utils';

export default function ClubsPage() {
  const { clubs, getUserMembershipForClub, currentUser } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [membershipFilter, setMembershipFilter] = useState<'All' | 'Joined' | 'Available'>('All');
  const [sortBy, setSortBy] = useState<'members' | 'name' | 'year'>('members');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories: (ClubCategory | 'All')[] = [
    'All',
    'Technical',
    'Cultural',
    'Literary',
    'Robotics',
    'Entrepreneurship',
    'Science',
    'Sports',
    'Social and Community',
  ];

  // Filtering and Sorting logic
  const filteredClubs = useMemo(() => {
    return clubs
      .filter((club) => {
        // Search
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          club.name.toLowerCase().includes(query) ||
          club.description.toLowerCase().includes(query) ||
          club.tagline.toLowerCase().includes(query) ||
          club.faculty_coordinator.toLowerCase().includes(query);

        // Category
        const matchesCategory =
          selectedCategory === 'All' || club.category === selectedCategory;

        // Membership filter
        const membership = getUserMembershipForClub(club.id);
        const isJoined = membership && membership.membership_status === 'approved';

        let matchesMembership = true;
        if (membershipFilter === 'Joined') {
          matchesMembership = Boolean(isJoined);
        } else if (membershipFilter === 'Available') {
          matchesMembership = !isJoined;
        }

        return matchesSearch && matchesCategory && matchesMembership;
      })
      .sort((a, b) => {
        if (sortBy === 'members') {
          return b.member_count - a.member_count;
        } else if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        } else if (sortBy === 'year') {
          return (b.established_year || 2020) - (a.established_year || 2020);
        }
        return 0;
      });
  }, [clubs, searchQuery, selectedCategory, membershipFilter, sortBy, getUserMembershipForClub]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Breadcrumb & Title */}
      <div className="max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Campus Club Directory
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Discover all 16 official student bodies at GEC Farmagudi. Filter by technical, cultural, literary, or sports domains.
        </p>
      </div>

        {/* Controls: Search, Filters, View toggle */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm space-y-4 mb-8">
          {/* Search bar + Sort + View */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search clubs by name, keywords, faculty advisor..."
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
              {/* Membership Status filter */}
              <select
                value={membershipFilter}
                onChange={(e) => setMembershipFilter(e.target.value as any)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Clubs</option>
                <option value="Joined">Joined Clubs</option>
                <option value="Available">Available to Join</option>
              </select>

              {/* Sort by */}
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-200">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent focus:outline-none font-semibold cursor-pointer"
                >
                  <option value="members">Sort: Most Members</option>
                  <option value="name">Sort: A-Z Alphabetical</option>
                  <option value="year">Sort: Established Year</option>
                </select>
              </div>

              {/* Grid / List toggle */}
              <div className="flex items-center p-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                  }`}
                  title="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                  }`}
                  title="List view"
                >
                  <ListIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Chips Bar */}
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
            Showing <strong className="text-slate-900 dark:text-white">{filteredClubs.length}</strong> of{' '}
            {clubs.length} Clubs
          </span>
          {currentUser.role === 'super_admin' && (
            <Link
              href="/admin"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1"
            >
              <span>+ Add / Manage Clubs in Admin</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          )}
        </div>

        {/* Club Listing */}
        {filteredClubs.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-500 mx-auto mb-4">
              <Compass className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No matching clubs found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              We couldn't find any clubs matching "{searchQuery}" with the current filters. Try resetting the search or category filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setMembershipFilter('All');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredClubs.map((club) => {
              const categoryStyle = getCategoryColor(club.category);
              const membership = getUserMembershipForClub(club.id);

              return (
                <div
                  key={club.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-600 transition-all shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={club.logo_url}
                      alt={club.name}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-base text-slate-900 dark:text-white">
                          {club.name}
                        </h3>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${categoryStyle.bg} ${categoryStyle.text} border ${categoryStyle.border}`}
                        >
                          {club.category}
                        </span>
                        {membership?.membership_status === 'approved' && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                            Member
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {club.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                        <span className="flex items-center gap-1 font-medium text-slate-600 dark:text-slate-300">
                          <Users className="w-3.5 h-3.5 text-blue-500" />
                          {club.member_count} Members
                        </span>
                        <span>•</span>
                        <span>Faculty: {club.faculty_coordinator}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/clubs/${club.slug}`}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-slate-700 dark:text-slate-200 text-xs font-semibold text-center transition-colors"
                  >
                    View Club Details
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
