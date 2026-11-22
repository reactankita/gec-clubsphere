# GEC ClubSphere — College Club Management System

> **Official Extracurricular & Co-Curricular Platform for Goa College of Engineering (GEC), Farmagudi, Ponda, Goa (Estd. 1967)**  
> **Academic Purpose:** Software Engineering Project

[![Next.js](https://img.shields.io/badge/Next.js-16.3.0-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat&logo=supabase)](https://supabase.com/)

---

## 🏛️ Project Introduction & Objectives

**GEC ClubSphere** is an enterprise-grade, full-stack college club and extracurricular management system architected specifically for **Goa College of Engineering (GEC), Farmagudi, Goa**.

Prior to GEC ClubSphere, club announcements, event notices, membership forms, and attendance tracking were scattered across WhatsApp groups, physical notice boards in department porches, and uncoordinated Google Forms. 

### Key Objectives:
1. **Centralized Discovery:** Provide a unified registry for all 16 student clubs spanning Technical, Robotics, Cultural, Literary, Entrepreneurship, Sports, Science, and Community domains.
2. **Role-Based Access Control (RBAC):** Distinct interfaces and privileges for **Students**, **Club Coordinators**, **Faculty Coordinators**, and **Super Admins** (Dean of Student Affairs).
3. **End-to-End Event Management:** Complete lifecycle management for campus hackathons, workshops, cultural fests, and sports tournaments—including seat caps, duplicate prevention, and digital QR passes.
4. **Attendance Tracking & Reporting:** Live event attendance marking with one-click CSV roster export for AICTE Activity Points accreditation.
5. **Dual-Mode Architectural Resilience:** Seamlessly connects to **Supabase PostgreSQL** with Row-Level Security (RLS) when configured, while providing complete zero-crash local persistent state for offline viva demonstrations.

---

## 🚀 Key Features

### 1. Public Portal & Landing Page
- **Hero Section:** Official branding with quick exploration CTAs.
- **Live Statistics:** Total Clubs (16), Active Members (1,240+), Upcoming Events, and Completed Extracurriculars.
- **Featured Clubs:** Dynamic cards showcasing domain, faculty advisors, member counts, and achievements.
- **Campus Calendar:** Real-time event countdowns, venue tags, and seat capacity indicators.
- **Why Join a Club?:** Highlighting AICTE activity points, leadership credentials, and campus engagement.

### 2. Club Directory (`/clubs` & `/clubs/[slug]`)
- **Global Search:** Instant searching across names, tags, descriptions, and faculty advisors.
- **Multi-Filter System:** Filter by category (8 domains) and membership status (All, Joined, Available).
- **Sort & Views:** Sort by member count, alphabetical, or established year; toggle between Grid and List views.
- **Club Detail Page:** Official meeting schedules, faculty/student coordinator contacts, achievement timeline, photo gallery, upcoming & past events, and interactive contact modal.

### 3. Event Management System (`/events` & `/events/[slug]`)
- **Event Catalog:** Search and filter by category (Hackathon, Workshop, Fest, Sports, Seminar) and timeline (Upcoming vs Past).
- **Interactive Registration:**
  - One-click instant registration.
  - Automatic participant quota and capacity tracking.
  - Duplicate registration prevention.
  - Interactive Digital E-Pass with QR code and unique entry pass identifier.
  - Registration cancellation with confirmation dialog.

### 4. Role-Based Dashboards
- **Student Dashboard (`/dashboard`):**
  - Personal overview, joined clubs, active applications, upcoming event passes.
  - Profile manager: Legal name, roll number, department, academic year (FE/SE/TE/BE), phone, and bio.
- **Club Coordinator Dashboard (`/club-dashboard`):**
  - Command center for assigned club (e.g., GEC Coders Club).
  - Membership queue: Approve or reject student applications; remove members.
  - Event publishing: Modal to create, edit, publish, or delete events.
  - Attendance tracker: Mark students Present / Absent and export CSV rosters.
  - Visual Analytics: Recharts line & pie charts for registration trends.
- **Super Admin Dashboard (`/admin`):**
  - Full authority over all 16 clubs, user role promotions, event moderation, and system audit trail.

---

## 👥 Demo Personas & Instant Login

GEC ClubSphere includes 1-Click Instant Demo Access on the Login screen (`/login`) for viva evaluators:

| Persona | Name | Role | Email | Privileges |
| :--- | :--- | :--- | :--- | :--- |
| **Student** | Rohan Fernandes | `student` | `rohan.fernandes@gec.ac.in` | Join clubs, register events, view QR passes |
| **Club Coordinator** | Sanket Prabhu | `club_coordinator` | `coordinator.coders@gec.ac.in` | Manage GEC Coders Club, approve members, publish events |
| **Faculty Coordinator** | Prof. Aisha Naik | `faculty_coordinator` | `faculty.coders@gec.ac.in` | Faculty advisory oversight, review event registrations |
| **Super Admin** | Dr. Rajeshwari Sawant | `super_admin` | `admin@gec.ac.in` | Full authority over all clubs, users, events & logs |

---

## 🛠️ Technology Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5.x
- **UI Components:** Tailwind CSS, Lucide React Icons
- **Animation:** Framer Motion
- **Analytics:** Recharts
- **Database:** Supabase PostgreSQL with Row Level Security (RLS)
- **State & Storage:** React Context + HTML5 LocalStorage dual-mode persistence

---

## 📋 Installation & Running Locally

### 1. Prerequisites
- Node.js version 18.x or 20.x+ (Recommended: Node 20+)
- npm version 9+

### 2. Clone or Navigate to Directory
```bash
cd "c:\Users\sutar\Documents\sem5notes\Lab\CIS_lab\exp4"
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables (Optional)
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your Supabase project URL and anon key if you wish to connect to a remote Supabase instance. If omitted, the application runs automatically in local persistent mode!

### 5. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 6. Run Production Build
```bash
npm run build
npm run start
```

---

## 📂 Project Structure

```
├── public/                 # Static public assets
├── src/
│   ├── app/                # Next.js App Router routes
│   │   ├── page.tsx        # Landing Page (Hero, Stats, Featured Clubs)
│   │   ├── layout.tsx      # Root layout with AppProvider, Navbar, Footer
│   │   ├── globals.css     # Design tokens & color system
│   │   ├── clubs/          # Club directory & dynamic [slug] pages
│   │   ├── events/         # Event catalog & dynamic [slug] registration pages
│   │   ├── login/          # Authentication & 1-Click Persona switcher
│   │   ├── dashboard/      # Student Dashboard
│   │   ├── club-dashboard/ # Club Coordinator Dashboard (Attendance, CSV, Events)
│   │   ├── admin/          # Super Admin Dashboard (Analytics, Club CRUD, User RBAC)
│   │   ├── about/          # GEC Farmagudi Institutional History & Structure
│   │   └── contact/        # Student Affairs inquiries & grievances
│   ├── components/         # Reusable UI components (Navbar, Footer, ClubCard, EventCard)
│   ├── context/            # AppContext.tsx (Central reactive state & localStorage sync)
│   ├── data/               # mock-data.ts (16 GEC clubs, 20 campus events, seed data)
│   ├── lib/                # Utilities & Supabase client initialization
│   └── types/              # Comprehensive TypeScript interfaces & types
├── supabase_schema.sql     # Full PostgreSQL DDL, Triggers, Indexes & RLS Policies
├── PROJECT_DOCUMENTATION.md# Complete Software Engineering architecture report
├── DATABASE_SCHEMA.md      # Normalized database schema documentation
└── SETUP_GUIDE.md          # Step-by-step setup and Supabase guide
```

---

## 📜 Academic Integrity & Viva Notice
Developed for Goa College of Engineering (GEC), Farmagudi, Ponda, Goa as a Software Engineering Laboratory Project. All demo clubs, sample faculty advisors, and events are structured for demonstration of co-curricular workflow automation.
