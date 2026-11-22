# GEC ClubSphere — Step-by-Step Setup & Deployment Guide

This guide provides complete instructions for setting up, running, configuring Supabase, and deploying **GEC ClubSphere**.

---

## 1. Local Development Setup

### Step 1: Clone Repository & Open Terminal
Open terminal in the project directory:
```bash
cd "c:\Users\sutar\Documents\sem5notes\Lab\CIS_lab\exp4"
```

### Step 2: Install Node Dependencies
```bash
npm install
```

### Step 3: Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

The application starts immediately with all 16 clubs, 20 events, and 4 test personas preloaded in local dual-mode persistence.

---

## 2. Supabase Integration Setup (Optional / Production)

To connect GEC ClubSphere to a live cloud Supabase PostgreSQL database:

### Step 1: Create a Free Supabase Project
1. Visit [https://supabase.com](https://supabase.com) and create an account.
2. Click **New Project** and select your organization.
3. Name your project (e.g. `gec-clubsphere-prod`) and set a strong database password.

### Step 2: Run Database Schema Script
1. In your Supabase dashboard, click **SQL Editor** on the left menu.
2. Click **New Query**.
3. Open the `supabase_schema.sql` file from this project repository.
4. Copy and paste the entire SQL contents into the Supabase SQL editor.
5. Click **Run** (or `Cmd/Ctrl + Enter`).
6. All 9 tables, custom ENUMs, indexes, automated triggers, and Row Level Security (RLS) policies will be created and enabled.

### Step 3: Configure Environment Variables
1. In your Supabase dashboard, navigate to **Project Settings** -> **API**.
2. Locate your **Project URL** and **anon public API Key**.
3. Create a `.env.local` file in your root folder:
```bash
cp .env.example .env.local
```
4. Paste the credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xyzcompany.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
5. Restart your Next.js server (`npm run dev`). GEC ClubSphere will detect the Supabase configuration and synchronize with your live cloud PostgreSQL instance.

---

## 3. Testing User Roles & Permissions

Use the **1-Click Persona Switcher** on the top navigation bar or the `/login` page to test:

1. **Student Persona (`rohan.fernandes@gec.ac.in`):**
   - Navigate to `/clubs` and click **Join This Club**.
   - Navigate to `/events` and register for an event (e.g. *CodeSprint 2026*).
   - Go to `/dashboard` to view your digital ticket pass and QR code.

2. **Club Coordinator Persona (`coordinator.coders@gec.ac.in`):**
   - Click the console badge or navigate to `/club-dashboard`.
   - In **Manage Members**, approve pending student applications.
   - In **Manage Events**, create a new workshop or hackathon.
   - In **Attendance & CSV**, mark student attendees Present / Absent and click **Export Roster as CSV**.

3. **Super Admin Persona (`admin@gec.ac.in`):**
   - Click **Admin Portal** or navigate to `/admin`.
   - Inspect live Recharts analytics (membership distribution and event frequency).
   - Create, edit, activate/deactivate, or delete clubs in **Clubs Registry**.
   - Promote or reassign user roles in **Users & Roles**.
   - Review audit trail in **Audit Trail Logs**.

---

## 4. Building for Production

To create an optimized production build:
```bash
npm run build
npm run start
```
The server will run on production mode at port 3000.
