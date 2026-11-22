'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Event, Club, EventCategory } from '@/types';
import { formatDate, formatTime, getCategoryColor } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  Plus,
  Trash2,
  Edit,
  Download,
  Search,
  Check,
  X,
  TrendingUp,
  BarChart3,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function ClubCoordinatorDashboard() {
  const {
    currentUser,
    clubs,
    events,
    memberships,
    registrations,
    users,
    updateClub,
    createEvent,
    updateEvent,
    deleteEvent,
    approveMembership,
    rejectMembership,
    removeMember,
    attendances,
    markAttendance,
    showToast,
  } = useApp();

  // Active assigned club (Default to GEC Coders Club for coordinator, or allow picking if multi)
  const assignedClub = clubs.find((c) => c.slug === 'gec-coders-club') || clubs[0];

  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'events' | 'attendance' | 'club_profile' | 'analytics'>('overview');

  // Search & Filters
  const [memberSearch, setMemberSearch] = useState('');
  const [memberStatusFilter, setMemberStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  // Create Event Modal state
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  // New/Edit Event Form state
  const [eventTitle, setEventTitle] = useState('');
  const [eventSlug, setEventSlug] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventCategory, setEventCategory] = useState<EventCategory>('Workshop');
  const [eventDate, setEventDate] = useState('2026-12-15');
  const [eventStartTime, setEventStartTime] = useState('14:00');
  const [eventEndTime, setEventEndTime] = useState('17:00');
  const [eventVenue, setEventVenue] = useState('Central Computer Center (CCC) Lab 2');
  const [eventBanner, setEventBanner] = useState('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200');
  const [eventMaxParticipants, setEventMaxParticipants] = useState(80);

  // Club profile edit form state
  const [clubTagline, setClubTagline] = useState(assignedClub.tagline);
  const [clubDesc, setClubDesc] = useState(assignedClub.description);
  const [clubMeetingInfo, setClubMeetingInfo] = useState(assignedClub.meeting_info);
  const [clubLogoUrl, setClubLogoUrl] = useState(assignedClub.logo_url);
  const [clubBannerUrl, setClubBannerUrl] = useState(assignedClub.banner_url);

  // Attendance selected event
  const clubEvents = events.filter((e) => e.club_id === assignedClub.id);
  const [selectedAttendanceEventId, setSelectedAttendanceEventId] = useState<string>(
    clubEvents[0]?.id || ''
  );

  // Club members data
  const clubMemberships = memberships.filter((m) => m.club_id === assignedClub.id);
  const filteredMembers = clubMemberships.filter((m) => {
    const user = users.find((u) => u.id === m.user_id);
    const matchesSearch =
      (user && user.full_name.toLowerCase().includes(memberSearch.toLowerCase())) ||
      (user && user.roll_number.toLowerCase().includes(memberSearch.toLowerCase()));
    const matchesStatus =
      memberStatusFilter === 'all' || m.membership_status === memberStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = clubMemberships.filter((m) => m.membership_status === 'pending').length;
  const approvedCount = clubMemberships.filter((m) => m.membership_status === 'approved').length;

  // Total registrations across this club's events
  const totalRegistrations = registrations.filter((r) =>
    clubEvents.map((e) => e.id).includes(r.event_id)
  ).length;

  // Handle Event Submit (Create or Update)
  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle) {
      showToast('Event title is required', 'error');
      return;
    }

    const slugToUse = eventSlug || eventTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (editingEventId) {
      updateEvent(editingEventId, {
        title: eventTitle,
        slug: slugToUse,
        description: eventDescription,
        event_category: eventCategory,
        event_date: eventDate,
        start_time: eventStartTime,
        end_time: eventEndTime,
        venue: eventVenue,
        banner_url: eventBanner,
        max_participants: Number(eventMaxParticipants),
      });
      setEditingEventId(null);
    } else {
      createEvent({
        club_id: assignedClub.id,
        title: eventTitle,
        slug: slugToUse,
        description: eventDescription,
        event_category: eventCategory,
        event_date: eventDate,
        start_time: eventStartTime,
        end_time: eventEndTime,
        venue: eventVenue,
        banner_url: eventBanner,
        registration_deadline: `${eventDate}T23:59:00Z`,
        max_participants: Number(eventMaxParticipants),
        status: 'upcoming',
        is_published: true,
      });
    }

    setIsCreateEventOpen(false);
    resetEventForm();
  };

  const startEditEvent = (ev: Event) => {
    setEditingEventId(ev.id);
    setEventTitle(ev.title);
    setEventSlug(ev.slug);
    setEventDescription(ev.description);
    setEventCategory(ev.event_category);
    setEventDate(ev.event_date);
    setEventStartTime(ev.start_time);
    setEventEndTime(ev.end_time);
    setEventVenue(ev.venue);
    setEventBanner(ev.banner_url);
    setEventMaxParticipants(ev.max_participants);
    setIsCreateEventOpen(true);
  };

  const resetEventForm = () => {
    setEventTitle('');
    setEventSlug('');
    setEventDescription('');
    setEventCategory('Workshop');
    setEventDate('2026-12-15');
    setEventStartTime('14:00');
    setEventEndTime('17:00');
    setEventVenue('Central Computer Center (CCC) Lab 2');
    setEventMaxParticipants(80);
    setEditingEventId(null);
  };

  // Handle Club Profile Save
  const handleClubProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateClub(assignedClub.id, {
      tagline: clubTagline,
      description: clubDesc,
      meeting_info: clubMeetingInfo,
      logo_url: clubLogoUrl,
      banner_url: clubBannerUrl,
    });
  };

  // Export Participant list as CSV
  const handleExportCSV = () => {
    const activeEvent = events.find((e) => e.id === selectedAttendanceEventId);
    if (!activeEvent) return;

    const eventRegs = registrations.filter((r) => r.event_id === activeEvent.id);
    const rows = [
      ['Full Name', 'Roll Number', 'Department', 'Email', 'Registered At', 'Attendance Status'],
      ...eventRegs.map((reg) => {
        const u = users.find((usr) => usr.id === reg.user_id);
        const att = attendances.find((a) => a.event_id === activeEvent.id && a.user_id === reg.user_id);
        return [
          u?.full_name || 'N/A',
          u?.roll_number || 'N/A',
          u?.department || 'N/A',
          u?.email || 'N/A',
          reg.registered_at,
          att?.attendance_status?.toUpperCase() || 'NOT_MARKED',
        ];
      }),
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${activeEvent.slug}_participants.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Participant CSV roster downloaded!', 'success');
  };

  // Analytics mock data for charts
  const registrationTrendData = [
    { month: 'Jul', registrations: 12 },
    { month: 'Aug', registrations: 34 },
    { month: 'Sep', registrations: 58 },
    { month: 'Oct', registrations: 95 },
    { month: 'Nov', registrations: 142 },
  ];

  const categoryParticipationData = [
    { name: 'Hackathons', value: 94, color: '#2563EB' },
    { name: 'Workshops', value: 68, color: '#7C3AED' },
    { name: 'Bootcamps', value: 45, color: '#059669' },
    { name: 'Quizzes', value: 30, color: '#D97706' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 shrink-0">
        {/* Active Club Box */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 mb-6">
          <div className="flex items-center gap-3">
            <img
              src={assignedClub.logo_url}
              alt={assignedClub.name}
              className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
            />
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                Console Mode
              </span>
              <h3 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                {assignedClub.name}
              </h3>
              <p className="text-[10px] text-slate-400">
                Coord: {currentUser.full_name}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {[
            { id: 'overview', label: 'Console Overview', icon: LayoutDashboard },
            { id: 'members', label: `Manage Members (${pendingCount > 0 ? `+${pendingCount}` : approvedCount})`, icon: Users },
            { id: 'events', label: `Manage Events (${clubEvents.length})`, icon: Calendar },
            { id: 'attendance', label: 'Attendance & CSV', icon: CheckCircle2 },
            { id: 'club_profile', label: 'Club Information', icon: Award },
            { id: 'analytics', label: 'Growth Analytics', icon: BarChart3 },
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
          <p className="font-semibold text-slate-500">Coordinator Access</p>
          <p>Managing {assignedClub.name}</p>
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 p-6 lg:p-10 max-w-6xl overflow-y-auto">
        {/* TAB 1: CONSOLE OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Club Coordinator Command Center</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {assignedClub.name} Console
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Manage memberships, publish campus hackathons, track attendance, and inspect club growth.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    resetEventForm();
                    setIsCreateEventOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-2 shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Event</span>
                </button>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Total Active Members
                </span>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {assignedClub.member_count}
                </div>
                <p className="text-[11px] text-emerald-600 mt-1 font-semibold">
                  +12% this semester
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Pending Applications
                </span>
                <div className="text-2xl font-extrabold text-amber-500 mt-1">
                  {pendingCount}
                </div>
                <button
                  onClick={() => setActiveTab('members')}
                  className="text-[11px] text-blue-600 hover:underline mt-1 block"
                >
                  Review membership queue →
                </button>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Total Registrations
                </span>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {totalRegistrations}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Across {clubEvents.length} events
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Upcoming Events
                </span>
                <div className="text-2xl font-extrabold text-blue-600 mt-1">
                  {clubEvents.filter((e) => e.status === 'upcoming').length}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Scheduled on campus calendar
                </p>
              </div>
            </div>

            {/* Quick Pending Members Section */}
            {pendingCount > 0 && (
              <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-sm text-amber-900 dark:text-amber-300 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>Action Required: Pending Applications ({pendingCount})</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('members')}
                    className="text-xs font-semibold text-amber-800 dark:text-amber-300 underline"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-2">
                  {clubMemberships
                    .filter((m) => m.membership_status === 'pending')
                    .slice(0, 3)
                    .map((mem) => {
                      const applicant = users.find((u) => u.id === mem.user_id);
                      return (
                        <div
                          key={mem.id}
                          className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-200/60 dark:border-amber-900/40 flex items-center justify-between"
                        >
                          <div>
                            <span className="font-bold text-xs text-slate-900 dark:text-white">
                              {applicant?.full_name} ({applicant?.roll_number})
                            </span>
                            <span className="text-[10px] text-slate-400 block">
                              {applicant?.department} • Applied {formatDate(mem.joined_at)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => approveMembership(mem.id)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-semibold hover:bg-emerald-500 flex items-center gap-1"
                            >
                              <Check className="w-3 h-3" />
                              <span>Approve</span>
                            </button>
                            <button
                              onClick={() => rejectMembership(mem.id)}
                              className="px-2.5 py-1 rounded-lg border border-rose-300 text-rose-600 text-[11px] font-semibold hover:bg-rose-50"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Quick Event Summary */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Active Club Events ({clubEvents.length})
                </h3>
                <button
                  onClick={() => setActiveTab('events')}
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  Manage All Events →
                </button>
              </div>

              <div className="space-y-3">
                {clubEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {ev.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {formatDate(ev.event_date)} • {ev.venue} • {ev.current_participants}/{ev.max_participants} seats filled
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEditEvent(ev)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setSelectedAttendanceEventId(ev.id);
                          setActiveTab('attendance');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500"
                      >
                        Attendance
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MANAGE MEMBERS */}
        {activeTab === 'members' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Club Members Directory
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Review student membership requests and manage enrolled club members.
                </p>
              </div>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search members by name or roll number..."
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <select
                value={memberStatusFilter}
                onChange={(e) => setMemberStatusFilter(e.target.value as any)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses ({clubMemberships.length})</option>
                <option value="pending">Pending Queue ({pendingCount})</option>
                <option value="approved">Approved Members ({approvedCount})</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Student</th>
                      <th className="py-3 px-4">Roll No.</th>
                      <th className="py-3 px-4">Department & Year</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Joined Date</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredMembers.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400 text-xs">
                          No members matching filter.
                        </td>
                      </tr>
                    ) : (
                      filteredMembers.map((mem) => {
                        const user = users.find((u) => u.id === mem.user_id);
                        return (
                          <tr key={mem.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                            <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                              {user?.full_name || 'Student'}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">
                              {user?.roll_number || 'N/A'}
                            </td>
                            <td className="py-3.5 px-4 text-slate-500">
                              {user?.department} ({user?.academic_year})
                            </td>
                            <td className="py-3.5 px-4">
                              {mem.membership_status === 'approved' && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                  Approved
                                </span>
                              )}
                              {mem.membership_status === 'pending' && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                                  Pending
                                </span>
                              )}
                              {mem.membership_status === 'rejected' && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                                  Rejected
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-slate-400">
                              {formatDate(mem.joined_at)}
                            </td>
                            <td className="py-3.5 px-4 text-right space-x-1">
                              {mem.membership_status === 'pending' ? (
                                <>
                                  <button
                                    onClick={() => approveMembership(mem.id)}
                                    className="p-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white"
                                    title="Approve"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => rejectMembership(mem.id)}
                                    className="p-1 rounded border border-rose-300 text-rose-600 hover:bg-rose-50"
                                    title="Reject"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </>
                              ) : (
                                <button
                                  onClick={() => removeMember(mem.id)}
                                  className="text-xs text-rose-500 hover:text-rose-700 font-medium"
                                >
                                  Remove
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MANAGE EVENTS */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Manage Events ({clubEvents.length})
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Create, edit, and publish campus hackathons, workshops, and competitions.
                </p>
              </div>

              <button
                onClick={() => {
                  resetEventForm();
                  setIsCreateEventOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-2 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Event</span>
              </button>
            </div>

            {/* Events Grid */}
            <div className="space-y-4">
              {clubEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={ev.banner_url}
                      alt={ev.title}
                      className="w-24 h-24 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-base text-slate-900 dark:text-white">
                          {ev.title}
                        </h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                          {ev.event_category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                        {ev.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                        <span>{formatDate(ev.event_date)}</span>
                        <span>•</span>
                        <span>{ev.venue}</span>
                        <span>•</span>
                        <span className="font-semibold text-blue-600">
                          {ev.current_participants} / {ev.max_participants} Registered
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => startEditEvent(ev)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedAttendanceEventId(ev.id);
                        setActiveTab('attendance');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500"
                    >
                      Roster
                    </button>
                    <button
                      onClick={() => deleteEvent(ev.id)}
                      className="p-2 text-rose-500 hover:text-rose-700 rounded-lg hover:bg-rose-50"
                      title="Delete event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ATTENDANCE & CSV EXPORT */}
        {activeTab === 'attendance' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Event Attendance & CSV Roster
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Track present and absent attendees and export full participant rolls.
                </p>
              </div>

              <button
                onClick={handleExportCSV}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 shadow"
              >
                <Download className="w-4 h-4" />
                <span>Export Roster as CSV</span>
              </button>
            </div>

            {/* Event Selector */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-500">Selected Event:</span>
              <select
                value={selectedAttendanceEventId}
                onChange={(e) => setSelectedAttendanceEventId(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
              >
                {clubEvents.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {ev.title} ({formatDate(ev.event_date)})
                  </option>
                ))}
              </select>
            </div>

            {/* Participant Attendance Table */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Participant</th>
                      <th className="py-3 px-4">Roll Number</th>
                      <th className="py-3 px-4">Department</th>
                      <th className="py-3 px-4">Registered At</th>
                      <th className="py-3 px-4">Attendance Status</th>
                      <th className="py-3 px-4 text-right">Mark Attendance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {registrations
                      .filter((r) => r.event_id === selectedAttendanceEventId)
                      .length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400">
                          No students registered yet for this event.
                        </td>
                      </tr>
                    ) : (
                      registrations
                        .filter((r) => r.event_id === selectedAttendanceEventId)
                        .map((reg) => {
                          const user = users.find((u) => u.id === reg.user_id);
                          const att = attendances.find(
                            (a) => a.event_id === selectedAttendanceEventId && a.user_id === reg.user_id
                          );

                          return (
                            <tr key={reg.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                              <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                                {user?.full_name || 'Participant'}
                              </td>
                              <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">
                                {user?.roll_number || 'N/A'}
                              </td>
                              <td className="py-3.5 px-4 text-slate-500">
                                {user?.department}
                              </td>
                              <td className="py-3.5 px-4 text-slate-400">
                                {formatDate(reg.registered_at)}
                              </td>
                              <td className="py-3.5 px-4">
                                {att?.attendance_status === 'present' ? (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                    PRESENT
                                  </span>
                                ) : att?.attendance_status === 'absent' ? (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                                    ABSENT
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                    UNMARKED
                                  </span>
                                )}
                              </td>
                              <td className="py-3.5 px-4 text-right space-x-1">
                                <button
                                  onClick={() => markAttendance(selectedAttendanceEventId, reg.user_id, 'present')}
                                  className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors ${
                                    att?.attendance_status === 'present'
                                      ? 'bg-emerald-600 text-white'
                                      : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-emerald-50'
                                  }`}
                                >
                                  Present
                                </button>
                                <button
                                  onClick={() => markAttendance(selectedAttendanceEventId, reg.user_id, 'absent')}
                                  className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors ${
                                    att?.attendance_status === 'absent'
                                      ? 'bg-rose-600 text-white'
                                      : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-rose-50'
                                  }`}
                                >
                                  Absent
                                </button>
                              </td>
                            </tr>
                          );
                        })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CLUB PROFILE */}
        {activeTab === 'club_profile' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Edit {assignedClub.name} Profile
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Update public descriptions, banners, and meeting schedules visible on the college portal.
              </p>
            </div>

            <form
              onSubmit={handleClubProfileSave}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tagline / Motto
                </label>
                <input
                  type="text"
                  value={clubTagline}
                  onChange={(e) => setClubTagline(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Club Description
                </label>
                <textarea
                  rows={4}
                  value={clubDesc}
                  onChange={(e) => setClubDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Meeting Info & Schedule
                </label>
                <input
                  type="text"
                  value={clubMeetingInfo}
                  onChange={(e) => setClubMeetingInfo(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Logo Image URL
                  </label>
                  <input
                    type="text"
                    value={clubLogoUrl}
                    onChange={(e) => setClubLogoUrl(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Banner Image URL
                  </label>
                  <input
                    type="text"
                    value={clubBannerUrl}
                    onChange={(e) => setClubBannerUrl(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow"
                >
                  Save Club Profile
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 6: ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Club Performance & Analytics
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Visualizations of membership growth and hackathon engagement metrics.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Registration Trend Line */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4">
                  Monthly Event Registrations (2026)
                </h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={registrationTrendData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                      <YAxis stroke="#94a3b8" fontSize={11} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="registrations"
                        stroke="#2563EB"
                        strokeWidth={3}
                        dot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Event Domain Distribution */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4">
                  Participation Breakdown
                </h3>
                <div className="h-64 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryParticipationData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                      >
                        {categoryParticipationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* CREATE / EDIT EVENT MODAL */}
      {isCreateEventOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-xl w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsCreateEventOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              {editingEventId ? 'Edit Event' : 'Create New Campus Event'}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Publish an event under {assignedClub.name} on the GEC ClubSphere calendar.
            </p>

            <form onSubmit={handleEventSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. CodeSprint 2026: SIH Hackathon"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Event Category
                  </label>
                  <select
                    value={eventCategory}
                    onChange={(e) => setEventCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold"
                  >
                    <option value="Workshop">Workshop</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Competition">Competition</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Cultural Event">Cultural Event</option>
                    <option value="Sports">Sports</option>
                    <option value="Fest">Fest</option>
                    <option value="Orientation">Orientation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Max Participant Capacity
                  </label>
                  <input
                    type="number"
                    value={eventMaxParticipants}
                    onChange={(e) => setEventMaxParticipants(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={eventStartTime}
                    onChange={(e) => setEventStartTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={eventEndTime}
                    onChange={(e) => setEventEndTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Campus Venue
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mech Seminar Hall or Central Computer Center"
                  value={eventVenue}
                  onChange={(e) => setEventVenue(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Description & Guidelines
                </label>
                <textarea
                  rows={3}
                  placeholder="Details, problem statements, rules..."
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Banner Image URL
                </label>
                <input
                  type="text"
                  value={eventBanner}
                  onChange={(e) => setEventBanner(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCreateEventOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                >
                  {editingEventId ? 'Save Changes' : 'Publish Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
