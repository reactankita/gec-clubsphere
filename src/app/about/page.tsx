import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Award,
  Shield,
  Users,
  Compass,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  MapPin
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            <GraduationCap className="w-4 h-4" />
            <span>Goa College of Engineering (Estd. 1967)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            About GEC ClubSphere
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            The official centralized extracurricular management portal of Goa College of Engineering, Farmagudi, Ponda, Goa.
          </p>
        </div>

        {/* Institution Overview */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span>The Premier Engineering Institution of Goa</span>
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Established in 1967, Goa College of Engineering (GEC) is the oldest and most prestigious engineering institution in the state of Goa. Situated atop the serene, picturesque Farmagudi hill in Ponda, GEC spans over 285 scenic acres and offers accredited undergraduate, postgraduate, and doctoral degree programs in Civil, Mechanical, Electrical & Electronics, Electronics & Telecommunication, Computer, Information Technology, and Mining Engineering.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            GEC ClubSphere was conceived as a state-of-the-art Software Engineering initiative to bridge academic rigor with vibrant student-led co-curricular and extracurricular engagement.
          </p>
        </div>

        {/* Governance Structure */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-600" />
            <span>Club Governance & Administrative Framework</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                Tier 1: Central Authority
              </span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Dean of Student Affairs
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Approves new student club charters, oversees annual budgetary allocations, ensures compliance with university code of conduct.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                Tier 2: Faculty Advisory
              </span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Faculty Coordinators
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Senior professors assigned to each club providing academic mentorship, safety approvals for off-campus trips, and venue authorization.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
              <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider block mb-1">
                Tier 3: Executive Leadership
              </span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Student Coordinators
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Elected student leads who curate weekly workshop schedules, organize hackathons, manage membership rosters, and drive participation.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                Tier 4: General Assembly
              </span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Student Members & Participants
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Undergraduate and postgraduate students collaborating on projects, earning AICTE activity points, and competing at state & national levels.
              </p>
            </div>
          </div>
        </div>

        {/* AICTE Activity Points info */}
        <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs sm:text-sm text-blue-900 dark:text-blue-200 space-y-2">
          <div className="flex items-center gap-2 font-bold">
            <Award className="w-5 h-5 text-blue-600" />
            <span>AICTE Activity Point Accreditation</span>
          </div>
          <p className="leading-relaxed">
            All registered events and core membership contributions completed on GEC ClubSphere count directly toward the mandatory 100 AICTE Activity Points required for the award of B.E. Degree with Honors.
          </p>
        </div>

        {/* Return link */}
        <div className="text-center pt-4">
          <Link
            href="/clubs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md transition-all"
          >
            <Compass className="w-4 h-4" />
            <span>Explore GEC Student Clubs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
