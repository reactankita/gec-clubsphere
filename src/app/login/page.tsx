'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import {
  GraduationCap,
  Shield,
  Award,
  Users,
  User,
  CheckCircle2,
  Lock,
  Mail,
  ArrowRight,
  Database,
  Sparkles
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { switchUser, currentUser, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [department, setDepartment] = useState('Computer Engineering');
  const [academicYear, setAcademicYear] = useState<'FE' | 'SE' | 'TE' | 'BE'>('SE');

  const demoAccounts: {
    role: UserRole;
    name: string;
    email: string;
    title: string;
    desc: string;
    badge: string;
    dest: string;
    icon: any;
  }[] = [
    {
      role: 'student',
      name: 'Rohan Fernandes',
      email: 'rohan.fernandes@gec.ac.in',
      title: 'Student Account',
      desc: 'Join clubs, register for hackathons, manage passes & view personal dashboard.',
      badge: 'SE IT (24IT018)',
      dest: '/dashboard',
      icon: User,
    },
    {
      role: 'club_coordinator',
      name: 'Sanket Prabhu',
      email: 'coordinator.coders@gec.ac.in',
      title: 'Club Coordinator',
      desc: 'Manage GEC Coders Club, approve memberships, create events & mark attendance.',
      badge: 'Lead Student Coord',
      dest: '/club-dashboard',
      icon: Award,
    },
    {
      role: 'faculty_coordinator',
      name: 'Prof. Aisha Naik',
      email: 'faculty.coders@gec.ac.in',
      title: 'Faculty Coordinator',
      desc: 'Faculty advisor oversight, review club events & monitor student attendance.',
      badge: 'Associate Professor',
      dest: '/club-dashboard',
      icon: Users,
    },
    {
      role: 'super_admin',
      name: 'Dr. Rajeshwari Sawant',
      email: 'admin@gec.ac.in',
      title: 'Super Admin Portal',
      desc: 'Full administrative access: all 16 clubs, user roles, system analytics & logs.',
      badge: 'Dean of Student Affairs',
      dest: '/admin',
      icon: Shield,
    },
  ];

  const handleDemoLogin = (role: UserRole, dest: string) => {
    switchUser(role);
    showToast(`Signed in as ${role.replace('_', ' ').toUpperCase()}`, 'success');
    router.push(dest);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please provide both email and password', 'error');
      return;
    }

    // Match role based on email if demo
    if (email.includes('admin')) {
      switchUser('super_admin');
      router.push('/admin');
    } else if (email.includes('coord')) {
      switchUser('club_coordinator');
      router.push('/club-dashboard');
    } else if (email.includes('faculty')) {
      switchUser('faculty_coordinator');
      router.push('/club-dashboard');
    } else {
      switchUser('student');
      router.push('/dashboard');
    }

    showToast('Signed in successfully!', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: 1-Click Fast Persona Switcher for Examiners / Evaluators */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Viva & Evaluation Quick Access</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Instant 1-Click Demo Logins
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Test all 4 distinct role-based access tiers configured for Goa College of Engineering:
            </p>

            <div className="mt-6 space-y-3">
              {demoAccounts.map((account) => {
                const Icon = account.icon;
                const isCurrent = currentUser.role === account.role;

                return (
                  <button
                    key={account.role}
                    onClick={() => handleDemoLogin(account.role, account.dest)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                      isCurrent
                        ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          isCurrent
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900 dark:text-white">
                            {account.title}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                            {account.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {account.name} ({account.email})
                        </p>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 line-clamp-1">
                          {account.desc}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 mt-1">
                      <span>Login</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Supabase connection indicator */}
            <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-500" />
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  {isSupabaseConfigured
                    ? 'Connected to live Supabase Backend'
                    : 'Running in Local Dual-Mode Persistence'}
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded font-mono font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                ACTIVE
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Standard Credential Form */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#0B1F3A] text-white flex items-center justify-center mx-auto mb-3 shadow">
              <GraduationCap className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
              GEC Single Sign-On
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Enter your college email credentials
            </p>
          </div>

          <form onSubmit={handleCustomSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                College Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="student@gec.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <span>Authenticate & Sign In</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-400">
            <span>Forgot college credentials? </span>
            <Link href="/contact" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Contact GEC IT Cell
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
