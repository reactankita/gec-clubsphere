'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  Building,
  GraduationCap
} from 'lucide-react';

export default function ContactPage() {
  const { showToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [category, setCategory] = useState('Club Query');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please fill in required fields', 'error');
      return;
    }

    setIsSubmitted(true);
    showToast('Inquiry submitted to GEC Student Affairs Council!', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            <Mail className="w-4 h-4" />
            <span>Student Affairs & Co-Curricular Support</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Contact GEC ClubSphere
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Have questions about club registration, proposing a new technical chapter, or claiming event attendance certificates? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Campus Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Building className="w-4 h-4 text-blue-600" />
                <span>Goa College of Engineering</span>
              </h3>

              <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block">
                      Campus Address
                    </strong>
                    <span>Farmagudi, Ponda, Goa 403401, India</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block">
                      Club Affairs Email
                    </strong>
                    <span>clubsphere@gec.ac.in</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block">
                      College Epabx Line
                    </strong>
                    <span>+91 832 2398300 / 2398301</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block">
                      Office Working Hours
                    </strong>
                    <span>Monday to Friday: 9:00 AM – 5:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Note */}
            <div className="p-5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-300 space-y-1">
              <div className="flex items-center gap-2 font-bold">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Software Engineering Project</span>
              </div>
              <p className="leading-relaxed">
                Contact queries submitted here are processed within the local reactive application environment for academic demonstration.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Message Dispatched Successfully!
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Thank you, {name}. Your inquiry regarding "{subject}" has been queued for review by the Dean of Student Affairs.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setName('');
                    setEmail('');
                    setRollNo('');
                    setSubject('');
                    setMessage('');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Submit an Inquiry / Grievance
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rohan Fernandes"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      College Email *
                    </label>
                    <input
                      type="email"
                      placeholder="student@gec.ac.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Roll Number (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 24IT018"
                      value={rollNo}
                      onChange={(e) => setRollNo(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Topic Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Club Query">Club Membership Query</option>
                      <option value="Event Registration">Event Registration Issue</option>
                      <option value="Attendance / Certificate">AICTE Points & Certificate</option>
                      <option value="Propose Club">Proposing New Student Club</option>
                      <option value="Grievance">Student Grievance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Subject Line *
                  </label>
                  <input
                    type="text"
                    placeholder="Brief summary of your inquiry"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Detailed Message *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your issue or request in detail..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Inquiry</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
