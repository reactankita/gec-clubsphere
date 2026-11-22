'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
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
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { switchUser, currentUser, showToast } = useApp();

  const [authMode, setAuthMode] = useState<'persona' | 'credentials'>('persona');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const personas: {
    role: UserRole;
    name: string;
    email: string;
    title: string;
    badge: string;
    dest: string;
    icon: any;
    color: string;
  }[] = [
    {
      role: 'student',
      name: 'Rohan Fernandes',
      email: 'rohan.fernandes@gec.ac.in',
      title: 'Student Account',
      badge: 'SE IT (24IT018)',
      dest: '/dashboard',
      icon: User,
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
    },
    {
      role: 'club_coordinator',
      name: 'Sanket Prabhu',
      email: 'coordinator.coders@gec.ac.in',
      title: 'Club Coordinator',
      badge: 'Coders Club Lead',
      dest: '/club-dashboard',
      icon: Award,
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    },
    {
      role: 'faculty_coordinator',
      name: 'Prof. Aisha Naik',
      email: 'faculty.coders@gec.ac.in',
      title: 'Faculty Advisor',
      badge: 'Associate Professor',
      dest: '/club-dashboard',
      icon: Users,
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800',
    },
    {
      role: 'super_admin',
      name: 'Dr. Rajeshwari Sawant',
      email: 'admin@gec.ac.in',
      title: 'Super Admin',
      badge: 'Dean of Student Affairs',
      dest: '/admin',
      icon: Shield,
      color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800',
    },
  ];

  const handlePersonaSelect = (role: UserRole, dest: string) => {
    switchUser(role);
    showToast(`Signed in as ${role.replace('_', ' ').toUpperCase()}`, 'success');
    router.push(dest);
  };

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter college email and password', 'error');
      return;
    }

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0B1F3A] to-[#2563EB] text-white flex items-center justify-center mx-auto shadow-md">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            GEC ClubSphere
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Goa College of Engineering • Single Sign-On Portal
          </p>
        </div>

        {/* Mode Selector */}
        <div className="grid grid-cols-2 gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setAuthMode('persona')}
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              authMode === 'persona'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>1-Click Personas</span>
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('credentials')}
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              authMode === 'credentials'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Email Sign In</span>
          </button>
        </div>

        {/* 1-Click Fast Persona Switcher */}
        {authMode === 'persona' && (
          <div className="space-y-2.5">
            <p className="text-[11px] text-slate-400 text-center pb-1">
              Select any verified college role to enter instantly:
            </p>
            {personas.map((p) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.role}
                  type="button"
                  onClick={() => handlePersonaSelect(p.role, p.dest)}
                  className="w-full p-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-left flex items-center justify-between group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${p.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-slate-900 dark:text-white">
                          {p.title}
                        </span>
                        <span className="text-[10px] font-medium text-slate-400">
                          ({p.badge})
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {p.name}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:text-blue-600 transition-all" />
                </button>
              );
            })}
          </div>
        )}

        {/* Traditional Credentials Form */}
        {authMode === 'credentials' && (
          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                GEC College Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rollno@gec.ac.in"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Footer */}
        <div className="pt-2 text-center text-[11px] text-slate-400 border-t border-slate-100 dark:border-slate-800">
          <span>Goa College of Engineering, Farmagudi, Ponda</span>
        </div>
      </div>
    </div>
  );
}