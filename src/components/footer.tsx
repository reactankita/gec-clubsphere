import React from 'react';
import Link from 'next/link';
import { GraduationCap, Mail, Phone, MapPin, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-[#071324] text-slate-300">
      {/* Upper Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Column 1: Institution & Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-500 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white">GEC </span>
                <span className="font-bold text-xl tracking-tight text-blue-400">ClubSphere</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The official centralized club management & student extracurricular platform of Goa College of Engineering (GEC), Farmagudi, Ponda, Goa.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p className="font-semibold text-slate-300">Goa College of Engineering</p>
              <p>Government of Goa Premier Engineering Institution (Estd. 1967)</p>
              <p>Farmagudi, Ponda, Goa 403401, India</p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/clubs" className="hover:text-blue-400 transition-colors">
                  Club Directory
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-blue-400 transition-colors">
                  Campus Events
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">
                  About GEC
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-blue-400 transition-colors">
                  Login / Portals
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Club Categories */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Club Categories
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/clubs?category=Technical" className="hover:text-blue-400 transition-colors">
                  Technical Clubs
                </Link>
              </li>
              <li>
                <Link href="/clubs?category=Robotics" className="hover:text-blue-400 transition-colors">
                  Robotics & Automation
                </Link>
              </li>
              <li>
                <Link href="/clubs?category=Cultural" className="hover:text-blue-400 transition-colors">
                  Cultural & Music
                </Link>
              </li>
              <li>
                <Link href="/clubs?category=Entrepreneurship" className="hover:text-blue-400 transition-colors">
                  E-Cell & Startups
                </Link>
              </li>
              <li>
                <Link href="/clubs?category=Sports" className="hover:text-blue-400 transition-colors">
                  Athletics & Sports
                </Link>
              </li>
              <li>
                <Link href="/clubs?category=Literary" className="hover:text-blue-400 transition-colors">
                  Literary & Quiz
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Institution & Contact info */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Campus Contact
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Farmagudi, Ponda, Goa 403401</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>clubsphere@gec.ac.in</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>+91 832 2398300 (GEC Epabx)</span>
              </li>
              <li className="pt-2">
                <a
                  href="https://gec.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300"
                >
                  <span>Official College Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Academic Project Viva Disclaimer Banner */}
        <div className="mt-12 p-4 rounded-xl bg-blue-950/40 border border-blue-900/50 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <span className="font-semibold text-white">Software Engineering Project: </span>
              <span>
                Demonstration platform featuring full role-based access control (Student, Club Coordinator, Faculty Coordinator, Super Admin).
              </span>
            </div>
          </div>
          <div className="text-[11px] text-slate-400 shrink-0">
            Tech: Next.js 16 + React 19 + Supabase + Tailwind CSS
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/80 bg-[#050e1a] py-6 text-xs text-slate-500">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Goa College of Engineering (GEC). All rights reserved.</p>
          <div className="flex items-center gap-6 text-slate-400">
            <Link href="/about" className="hover:text-slate-200">
              Governance Guidelines
            </Link>
            <Link href="/contact" className="hover:text-slate-200">
              Student Grievances
            </Link>
            <Link href="/admin" className="hover:text-slate-200">
              Admin Access
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
