'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Club, Event, UserProfile, UserRole, ClubCategory } from '@/types';
import { formatDate, formatTime, getCategoryColor } from '@/lib/utils';
import {
  Shield,
  Layers,
  Calendar,
  Users,
  Award,
  Plus,
  Trash2,
  Edit,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  BarChart3,
  TrendingUp,
  Activity,
  UserCheck,
  FileText,
  AlertTriangle,
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Save
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

export default function SuperAdminDashboard() {
  const {
    currentUser,
    clubs,
    events,
    memberships,
    registrations,
    users,
    createClub,
    updateClub,
    deleteClub,
    toggleClubStatus,
    updateUserRole,
    deleteEvent,
    activityLogs,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'clubs' | 'events' | 'users' | 'activity' | 'settings'>('overview');

  // Search & Filters
  const [clubSearch, setClubSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<string>('all');
  const [eventSearch, setEventSearch] = useState('');

  // Modals
  const [isClubModalOpen, setIsClubModalOpen] = useState(false);
  const [editingClubId, setEditingClubId] = useState<string | null>(null);
  const [deleteConfirmClubId, setDeleteConfirmClubId] = useState<string | null>(null);
  const [deleteConfirmEventId, setDeleteConfirmEventId] = useState<string | null>(null);

  // Club Form State
  const [clubName, setClubName] = useState('');
  const [clubSlug, setClubSlug] = useState('');
  const [clubCategory, setClubCategory] = useState<ClubCategory>('Technical');
  const [clubTagline, setClubTagline] = useState('');
  const [clubDesc, setClubDesc] = useState('');
  const [clubFaculty, setClubFaculty] = useState('');
  const [clubFacultyEmail, setClubFacultyEmail] = useState('');
  const [clubStudentCoord, setClubStudentCoord] = useState('');
  const [clubStudentCoordEmail, setClubStudentCoordEmail] = useState('');
  const [clubMeeting, setClubMeeting] = useState('');
  const [clubLogo, setClubLogo] = useState('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=200');
  const [clubBanner, setClubBanner] = useState('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200');
  const [clubEstYear, setClubEstYear] = useState(2024);

  // Handle Create / Edit Club
  const handleClubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clubName) {
      showToast('Club name is required', 'error');
      return;
    }

    const slugToUse = clubSlug || clubName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (editingClubId) {
      updateClub(editingClubId, {
        name: clubName,
        slug: slugToUse,
        category: clubCategory,
        tagline: clubTagline,
        description: clubDesc,
        faculty_coordinator: clubFaculty,
        faculty_coordinator_email: clubFacultyEmail,
        student_coordinator: clubStudentCoord,
        student_coordinator_email: clubStudentCoordEmail,
        meeting_info: clubMeeting,
        logo_url: clubLogo,
        banner_url: clubBanner,
        established_year: Number(clubEstYear),
      });
      setEditingClubId(null);
    } else {
      createClub({
        name: clubName,
        slug: slugToUse,
        category: clubCategory,
        tagline: clubTagline,
        description: clubDesc,
        faculty_coordinator: clubFaculty,
        faculty_coordinator_email: clubFacultyEmail,
        student_coordinator: clubStudentCoord,
        student_coordinator_email: clubStudentCoordEmail,
        meeting_info: clubMeeting,
        logo_url: clubLogo,
        banner_url: clubBanner,
        established_year: Number(clubEstYear),
        status: 'active',
        is_demo: false,
        achievements: ['New student chapter approved by GEC Student Affairs'],
        gallery: [],
        social_links: {},
      });
    }

    setIsClubModalOpen(false);
    resetClubForm();
  };

  const startEditClub = (club: Club) => {
    setEditingClubId(club.id);
    setClubName(club.name);
    setClubSlug(club.slug);
    setClubCategory(club.category);
    setClubTagline(club.tagline);
    setClubDesc(club.description);
    setClubFaculty(club.faculty_coordinator);
    setClubFacultyEmail(club.faculty_coordinator_email);
    setClubStudentCoord(club.student_coordinator);
    setClubStudentCoordEmail(club.student_coordinator_email);
    setClubMeeting(club.meeting_info);
    setClubLogo(club.logo_url);
    setClubBanner(club.banner_url);
    setClubEstYear(club.established_year);
    setIsClubModalOpen(true);
  };

  const resetClubForm = () => {
    setClubName('');
    setClubSlug('');
    setClubCategory('Technical');
    setClubTagline('');
    setClubDesc('');
    setClubFaculty('');
    setClubFacultyEmail('');
    setClubStudentCoord('');
    setClubStudentCoordEmail('');
    setClubMeeting('Wednesdays at 4:30 PM');
    setClubEstYear(2026);
    setEditingClubId(null);
  };

  // Filtered lists
  const filteredClubs = clubs.filter((c) =>
    c.name.toLowerCase().includes(clubSearch.toLowerCase()) ||
    c.category.toLowerCase().includes(clubSearch.toLowerCase()) ||
    c.faculty_coordinator.toLowerCase().includes(clubSearch.toLowerCase())
  );

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.full_name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.roll_number.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = userRoleFilter === 'all' || u.role === userRoleFilter;
    return matchesSearch && matchesRole;
  });

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(eventSearch.toLowerCase()) ||
    e.event_category.toLowerCase().includes(eventSearch.toLowerCase()) ||
    e.venue.toLowerCase().includes(eventSearch.toLowerCase())
  );

  // Analytics datasets
  const categoryCounts: Record<string, number> = {};
  clubs.forEach((c) => {
    categoryCounts[c.category] = (categoryCounts[c.category] || 0) + 1;
  });
  const clubCategoryChartData = Object.keys(categoryCounts).map((cat) => ({
    name: cat,
    count: categoryCounts[cat],
  }));

  const membershipDistributionData = clubs.slice(0, 7).map((c) => ({
    name: c.name.replace(' Club', '').replace(' GEC', ''),
    members: c.member_count,
  }));

  const monthlyEventTrendData = [
    { month: 'Jul', events: 2 },
    { month: 'Aug', events: 5 },
    { month: 'Sep', events: 8 },
    { month: 'Oct', events: 12 },
    { month: 'Nov', events: 18 },
    { month: 'Dec', events: 14 },
  ];

  const COLORS = ['#2563EB', '#7C3AED', '#059669', '#D97706', '#DC2626', '#0891B2', '#4F46E5', '#DB2777'];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 shrink-0">
        <div className="p-4 rounded-xl bg-gradient-to-br from-[#0B1F3A] to-[#1E3A8A] text-white shadow-md mb-6">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-blue-300" />
            <span className="text-[10px] font-bold tracking-wider text-blue-200 uppercase">
              Super Admin Console
            </span>
          </div>
          <h3 className="font-bold text-sm truncate">{currentUser.full_name}</h3>
          <p className="text-[10px] text-blue-200">Dean of Student Affairs</p>
        </div>

        <nav className="space-y-1">
          {[
            { id: 'overview', label: 'System Overview', icon: BarChart3 },
            { id: 'clubs', label: `Clubs Registry (${clubs.length})`, icon: Layers },
            { id: 'events', label: `All Events (${events.length})`, icon: Calendar },
            { id: 'users', label: `Users & Roles (${users.length})`, icon: Users },
            { id: 'activity', label: 'Audit Trail Logs', icon: Activity },
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
          <p>Administration & Dean Office Portal</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-10 max-w-6xl overflow-y-auto">
        {/* TAB 1: SYSTEM OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-2">
                  <Shield className="w-3.5 h-3.5" />
                  <span>College Central Administration</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  University Extracurricular Dashboard
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  High-level oversight of all 16 GEC student organizations, campus events, and student engagement.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    resetClubForm();
                    setIsClubModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-2 shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Club</span>
                </button>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Total Active Clubs
                </span>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {clubs.length}
                </div>
                <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                  Across 8 Academic Domains
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Registered Students
                </span>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  1,240+
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  From FE, SE, TE, BE classes
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Events on Calendar
                </span>
                <div className="text-2xl font-extrabold text-indigo-600 mt-1">
                  {events.length}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  {events.filter((e) => e.status === 'upcoming').length} upcoming
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Total Registrations
                </span>
                <div className="text-2xl font-extrabold text-blue-600 mt-1">
                  {registrations.length + 420}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Extracurricular participation
                </p>
              </div>
            </div>

            {/* Recharts Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Membership Distribution Bar Chart */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Club Membership Distribution (Top 7)
                  </h3>
                  <span className="text-[10px] text-slate-400">Enrolled Students</span>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={membershipDistributionData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} />
                      <YAxis stroke="#94a3b8" fontSize={11} />
                      <Tooltip />
                      <Bar dataKey="members" fill="#2563EB" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Monthly Trend Chart */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Campus Event Trajectory (Monthly)
                  </h3>
                  <span className="text-[10px] text-slate-400">Events Organized</span>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyEventTrendData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                      <YAxis stroke="#94a3b8" fontSize={11} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="events"
                        stroke="#7C3AED"
                        strokeWidth={3}
                        dot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Recent System Activity Logs */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span>Recent Campus Activity Logs</span>
                </h3>
                <button
                  onClick={() => setActiveTab('activity')}
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  View Full Audit Trail →
                </button>
              </div>

              <div className="space-y-3">
                {activityLogs.slice(0, 4).map((log) => (
                  <div
                    key={log.id}
                    className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {log.user_name}
                      </span>{' '}
                      <span className="text-slate-500 dark:text-slate-400">{log.details}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 shrink-0">
                      {formatDate(log.created_at)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CLUBS REGISTRY */}
        {activeTab === 'clubs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  College Clubs Directory ({clubs.length})
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Create, edit, activate, deactivate, or delete official student chapters.
                </p>
              </div>

              <button
                onClick={() => {
                  resetClubForm();
                  setIsClubModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-2 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Club</span>
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search clubs by name, category, or faculty advisor..."
                value={clubSearch}
                onChange={(e) => setClubSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Club Name</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Faculty Advisor</th>
                      <th className="py-3 px-4">Members</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredClubs.map((club) => {
                      const categoryStyle = getCategoryColor(club.category);
                      return (
                        <tr key={club.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={club.logo_url}
                                alt={club.name}
                                className="w-8 h-8 rounded-lg object-cover"
                              />
                              <div>
                                <span className="font-bold text-slate-900 dark:text-white">
                                  {club.name}
                                </span>
                                <span className="text-[10px] text-slate-400 block">
                                  /{club.slug}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${categoryStyle.bg} ${categoryStyle.text} border ${categoryStyle.border}`}
                            >
                              {club.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                            {club.faculty_coordinator}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                            {club.member_count}
                          </td>
                          <td className="py-3.5 px-4">
                            <button
                              onClick={() => toggleClubStatus(club.id)}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                club.status === 'active'
                                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                  : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                              }`}
                            >
                              {club.status.toUpperCase()}
                            </button>
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-2">
                            <Link
                              href={`/clubs/${club.slug}`}
                              className="text-slate-400 hover:text-blue-600 p-1"
                              title="View page"
                            >
                              <ExternalLink className="w-3.5 h-3.5 inline" />
                            </Link>
                            <button
                              onClick={() => startEditClub(club)}
                              className="text-slate-400 hover:text-blue-600 p-1"
                              title="Edit club"
                            >
                              <Edit className="w-3.5 h-3.5 inline" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmClubId(club.id)}
                              className="text-slate-400 hover:text-rose-600 p-1"
                              title="Delete club"
                            >
                              <Trash2 className="w-3.5 h-3.5 inline" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ALL EVENTS */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  University Events Master List ({events.length})
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Monitor event registrations, approve proposed events, and inspect participant quotas.
                </p>
              </div>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search events across campus..."
                value={eventSearch}
                onChange={(e) => setEventSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Event Title</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Venue</th>
                      <th className="py-3 px-4">Capacity</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredEvents.map((ev) => (
                      <tr key={ev.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                          {ev.title}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                            {ev.event_category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-500">
                          {formatDate(ev.event_date)}
                        </td>
                        <td className="py-3.5 px-4 text-slate-500">
                          {ev.venue}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                          {ev.current_participants} / {ev.max_participants}
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-2">
                          <Link
                            href={`/events/${ev.slug}`}
                            className="text-slate-400 hover:text-blue-600 p-1"
                            title="View event"
                          >
                            <ExternalLink className="w-3.5 h-3.5 inline" />
                          </Link>
                          <button
                            onClick={() => setDeleteConfirmEventId(ev.id)}
                            className="text-slate-400 hover:text-rose-600 p-1"
                            title="Delete event"
                          >
                            <Trash2 className="w-3.5 h-3.5 inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: USERS & ROLES */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  User Roles & Permissions ({users.length})
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Assign administrative, faculty coordinator, or student coordinator roles.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search users by name, roll no, email..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <select
                value={userRoleFilter}
                onChange={(e) => setUserRoleFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Roles</option>
                <option value="student">Students</option>
                <option value="club_coordinator">Club Coordinators</option>
                <option value="faculty_coordinator">Faculty Coordinators</option>
                <option value="super_admin">Super Admins</option>
              </select>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">User</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Roll / Fac ID</th>
                      <th className="py-3 px-4">Department</th>
                      <th className="py-3 px-4">Assigned Role</th>
                      <th className="py-3 px-4 text-right">Modify Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                          {user.full_name}
                        </td>
                        <td className="py-3.5 px-4 text-slate-500">
                          {user.email}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">
                          {user.roll_number}
                        </td>
                        <td className="py-3.5 px-4 text-slate-500">
                          {user.department}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              user.role === 'super_admin'
                                ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                                : user.role === 'faculty_coordinator'
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                                : user.role === 'club_coordinator'
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                                : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            }`}
                          >
                            {user.role.replace('_', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <select
                            value={user.role}
                            onChange={(e) => updateUserRole(user.id, e.target.value as UserRole)}
                            className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[11px] font-medium"
                          >
                            <option value="student">Student</option>
                            <option value="club_coordinator">Club Coordinator</option>
                            <option value="faculty_coordinator">Faculty Coordinator</option>
                            <option value="super_admin">Super Admin</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: AUDIT TRAIL LOGS */}
        {activeTab === 'activity' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Extracurricular System Audit Trail
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Real-time chronological record of club creation, registrations, and administrative changes.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm divide-y divide-slate-100 dark:divide-slate-800">
              {activityLogs.map((log) => (
                <div key={log.id} className="p-4 flex items-start justify-between gap-4 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {log.user_name}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {log.action}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">{log.details}</p>
                  </div>
                  <span className="text-[11px] text-slate-400 shrink-0">
                    {formatDate(log.created_at)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* CREATE / EDIT CLUB MODAL */}
      {isClubModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-xl w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsClubModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              {editingClubId ? 'Edit Student Club' : 'Create New Student Club'}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Registered under Goa College of Engineering Student Affairs Council.
            </p>

            <form onSubmit={handleClubSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Club Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. AI Innovators Club"
                  value={clubName}
                  onChange={(e) => setClubName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Domain / Category
                  </label>
                  <select
                    value={clubCategory}
                    onChange={(e) => setClubCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold"
                  >
                    <option value="Technical">Technical</option>
                    <option value="Robotics">Robotics</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Literary">Literary</option>
                    <option value="Entrepreneurship">Entrepreneurship</option>
                    <option value="Science">Science</option>
                    <option value="Sports">Sports</option>
                    <option value="Social and Community">Social and Community</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Established Year
                  </label>
                  <input
                    type="number"
                    value={clubEstYear}
                    onChange={(e) => setClubEstYear(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tagline / Motto
                </label>
                <input
                  type="text"
                  placeholder="e.g. Code, Innovate, Elevate"
                  value={clubTagline}
                  onChange={(e) => setClubTagline(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={clubDesc}
                  onChange={(e) => setClubDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Faculty Coordinator Name
                  </label>
                  <input
                    type="text"
                    value={clubFaculty}
                    onChange={(e) => setClubFaculty(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Faculty Email
                  </label>
                  <input
                    type="email"
                    value={clubFacultyEmail}
                    onChange={(e) => setClubFacultyEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Student Coordinator Name
                  </label>
                  <input
                    type="text"
                    value={clubStudentCoord}
                    onChange={(e) => setClubStudentCoord(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Student Email
                  </label>
                  <input
                    type="email"
                    value={clubStudentCoordEmail}
                    onChange={(e) => setClubStudentCoordEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Meeting Schedule
                </label>
                <input
                  type="text"
                  placeholder="e.g. Every Friday at 4:30 PM, Robotics Lab"
                  value={clubMeeting}
                  onChange={(e) => setClubMeeting(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsClubModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                >
                  {editingClubId ? 'Save Changes' : 'Register Club'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CLUB CONFIRMATION DIALOG */}
      {deleteConfirmClubId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl text-center">
            <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Delete Club?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Are you sure you want to delete this club? All associated events and membership records will be permanently removed.
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={() => setDeleteConfirmClubId(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteClub(deleteConfirmClubId);
                  setDeleteConfirmClubId(null);
                }}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold"
              >
                Yes, Delete Club
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE EVENT CONFIRMATION DIALOG */}
      {deleteConfirmEventId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl text-center">
            <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Delete Campus Event?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              This will remove the event from the university calendar and invalidate all issued passes.
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={() => setDeleteConfirmEventId(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteEvent(deleteConfirmEventId);
                  setDeleteConfirmEventId(null);
                }}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold"
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
