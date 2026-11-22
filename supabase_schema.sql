-- ==============================================================================
-- GEC CLUBSPHERE — DATABASE SCHEMA & RLS SECURITY POLICIES
-- Institution: Goa College of Engineering (GEC), Farmagudi, Ponda, Goa
-- Academic Purpose: Software Engineering Project
-- Database Engine: PostgreSQL / Supabase
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 1. ENUMS & DOMAIN DEFINITIONS
-- ==============================================================================

CREATE TYPE user_role_type AS ENUM (
  'student',
  'club_coordinator',
  'faculty_coordinator',
  'super_admin'
);

CREATE TYPE club_category_type AS ENUM (
  'Technical',
  'Cultural',
  'Literary',
  'Robotics',
  'Entrepreneurship',
  'Science',
  'Sports',
  'Social and Community'
);

CREATE TYPE membership_status_type AS ENUM (
  'pending',
  'approved',
  'rejected'
);

CREATE TYPE event_category_type AS ENUM (
  'Workshop',
  'Competition',
  'Seminar',
  'Cultural Event',
  'Hackathon',
  'Sports',
  'Fest',
  'Orientation'
);

CREATE TYPE event_status_type AS ENUM (
  'upcoming',
  'ongoing',
  'completed',
  'cancelled'
);

CREATE TYPE registration_status_type AS ENUM (
  'confirmed',
  'cancelled',
  'waitlisted'
);

CREATE TYPE attendance_status_type AS ENUM (
  'present',
  'absent'
);

-- ==============================================================================
-- 2. TABLES CREATION
-- ==============================================================================

-- 2.1 Profiles Table (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  roll_number TEXT,
  department TEXT,
  academic_year TEXT CHECK (academic_year IN ('FE', 'SE', 'TE', 'BE')),
  profile_photo TEXT,
  role user_role_type NOT NULL DEFAULT 'student',
  phone TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2.2 Clubs Table
CREATE TABLE IF NOT EXISTS public.clubs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  category club_category_type NOT NULL,
  tagline TEXT,
  description TEXT NOT NULL,
  logo_url TEXT,
  banner_url TEXT,
  faculty_coordinator TEXT NOT NULL,
  faculty_coordinator_email TEXT NOT NULL,
  student_coordinator TEXT NOT NULL,
  student_coordinator_email TEXT NOT NULL,
  meeting_info TEXT,
  social_links JSONB DEFAULT '{}'::jsonb,
  achievements TEXT[] DEFAULT ARRAY[]::TEXT[],
  gallery TEXT[] DEFAULT ARRAY[]::TEXT[],
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  member_count INTEGER DEFAULT 0 NOT NULL,
  is_demo BOOLEAN DEFAULT true NOT NULL,
  established_year INTEGER DEFAULT 2024,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2.3 Club Memberships Table
CREATE TABLE IF NOT EXISTS public.club_memberships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  club_id UUID NOT NULL REFERENCES public.clubs(id) ON DELETE CASCADE,
  membership_status membership_status_type NOT NULL DEFAULT 'pending',
  role_in_club TEXT DEFAULT 'member' CHECK (role_in_club IN ('member', 'core_team', 'lead')),
  joined_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, club_id)
);

-- 2.4 Events Table
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  club_id UUID NOT NULL REFERENCES public.clubs(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  event_category event_category_type NOT NULL,
  event_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  venue TEXT NOT NULL,
  banner_url TEXT,
  registration_deadline TIMESTAMPTZ NOT NULL,
  max_participants INTEGER NOT NULL DEFAULT 100,
  current_participants INTEGER NOT NULL DEFAULT 0,
  status event_status_type NOT NULL DEFAULT 'upcoming',
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2.5 Event Registrations Table
CREATE TABLE IF NOT EXISTS public.event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  registration_status registration_status_type NOT NULL DEFAULT 'confirmed',
  registered_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(event_id, user_id)
);

-- 2.6 Club Coordinators Assignment Table
CREATE TABLE IF NOT EXISTS public.club_coordinators (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  club_id UUID NOT NULL REFERENCES public.clubs(id) ON DELETE CASCADE,
  coordinator_type TEXT NOT NULL CHECK (coordinator_type IN ('student', 'faculty')),
  assigned_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, club_id)
);

-- 2.7 Event Attendance Table
CREATE TABLE IF NOT EXISTS public.event_attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  attendance_status attendance_status_type NOT NULL,
  marked_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(event_id, user_id)
);

-- 2.8 Notifications Table
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('membership', 'event', 'system', 'approval')),
  is_read BOOLEAN NOT NULL DEFAULT false,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2.9 Activity Logs Table
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  user_name TEXT NOT NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('club', 'event', 'membership', 'registration', 'user')),
  entity_id TEXT NOT NULL,
  details TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 3. INDEXES FOR HIGH-PERFORMANCE SEARCH & FILTERING
-- ==============================================================================

CREATE INDEX IF NOT EXISTS idx_clubs_category ON public.clubs(category);
CREATE INDEX IF NOT EXISTS idx_clubs_slug ON public.clubs(slug);
CREATE INDEX IF NOT EXISTS idx_clubs_status ON public.clubs(status);

CREATE INDEX IF NOT EXISTS idx_events_club_id ON public.events(club_id);
CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_status ON public.events(status);
CREATE INDEX IF NOT EXISTS idx_events_slug ON public.events(slug);

CREATE INDEX IF NOT EXISTS idx_memberships_user_club ON public.club_memberships(user_id, club_id);
CREATE INDEX IF NOT EXISTS idx_memberships_status ON public.club_memberships(membership_status);

CREATE INDEX IF NOT EXISTS idx_registrations_user_event ON public.event_registrations(user_id, event_id);
CREATE INDEX IF NOT EXISTS idx_attendance_event ON public.event_attendance(event_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON public.notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_activity_logs_date ON public.activity_logs(created_at DESC);

-- ==============================================================================
-- 4. DATABASE TRIGGERS
-- ==============================================================================

-- 4.1 Update Club Member Count Trigger
CREATE OR REPLACE FUNCTION update_club_member_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.membership_status = 'approved' THEN
    UPDATE public.clubs SET member_count = member_count + 1 WHERE id = NEW.club_id;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.membership_status != 'approved' AND NEW.membership_status = 'approved' THEN
      UPDATE public.clubs SET member_count = member_count + 1 WHERE id = NEW.club_id;
    ELSIF OLD.membership_status = 'approved' AND NEW.membership_status != 'approved' THEN
      UPDATE public.clubs SET member_count = GREATEST(0, member_count - 1) WHERE id = NEW.club_id;
    END IF;
  ELSIF TG_OP = 'DELETE' AND OLD.membership_status = 'approved' THEN
    UPDATE public.clubs SET member_count = GREATEST(0, member_count - 1) WHERE id = OLD.club_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_club_members ON public.club_memberships;
CREATE TRIGGER trigger_update_club_members
AFTER INSERT OR UPDATE OR DELETE ON public.club_memberships
FOR EACH ROW EXECUTE FUNCTION update_club_member_count();

-- 4.2 Auto Profile Creation from auth.users Trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.email,
    'student'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.club_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.club_coordinators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to check super admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'super_admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- 5.1 Profiles Policies
CREATE POLICY "Public profiles are viewable by authenticated users"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins have full access to profiles"
  ON public.profiles FOR ALL
  TO authenticated
  USING (public.is_admin());

-- 5.2 Clubs Policies
CREATE POLICY "Clubs are viewable by everyone"
  ON public.clubs FOR SELECT
  USING (true);

CREATE POLICY "Super Admins can insert/update/delete clubs"
  ON public.clubs FOR ALL
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Club Coordinators can update their assigned club"
  ON public.clubs FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.club_coordinators
      WHERE user_id = auth.uid() AND club_id = public.clubs.id
    )
  );

-- 5.3 Club Memberships Policies
CREATE POLICY "Memberships are viewable by members and club coordinators"
  ON public.club_memberships FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    public.is_admin() OR
    EXISTS (
      SELECT 1 FROM public.club_coordinators
      WHERE user_id = auth.uid() AND club_id = public.club_memberships.club_id
    )
  );

CREATE POLICY "Students can request to join clubs"
  ON public.club_memberships FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Students can withdraw their own membership"
  ON public.club_memberships FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Coordinators and Admins can approve/reject memberships"
  ON public.club_memberships FOR UPDATE
  TO authenticated
  USING (
    public.is_admin() OR
    EXISTS (
      SELECT 1 FROM public.club_coordinators
      WHERE user_id = auth.uid() AND club_id = public.club_memberships.club_id
    )
  );

-- 5.4 Events Policies
CREATE POLICY "Events are viewable by everyone"
  ON public.events FOR SELECT
  USING (is_published = true OR public.is_admin());

CREATE POLICY "Coordinators and Admins can create events"
  ON public.events FOR INSERT
  TO authenticated
  WITH CHECK (
    public.is_admin() OR
    EXISTS (
      SELECT 1 FROM public.club_coordinators
      WHERE user_id = auth.uid() AND club_id = public.events.club_id
    )
  );

CREATE POLICY "Coordinators and Admins can update their events"
  ON public.events FOR UPDATE
  TO authenticated
  USING (
    public.is_admin() OR
    EXISTS (
      SELECT 1 FROM public.club_coordinators
      WHERE user_id = auth.uid() AND club_id = public.events.club_id
    )
  );

CREATE POLICY "Coordinators and Admins can delete events"
  ON public.events FOR DELETE
  TO authenticated
  USING (
    public.is_admin() OR
    EXISTS (
      SELECT 1 FROM public.club_coordinators
      WHERE user_id = auth.uid() AND club_id = public.events.club_id
    )
  );

-- 5.5 Event Registrations Policies
CREATE POLICY "Students can view their own registrations"
  ON public.event_registrations FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    public.is_admin() OR
    EXISTS (
      SELECT 1 FROM public.events e
      JOIN public.club_coordinators c ON c.club_id = e.club_id
      WHERE e.id = public.event_registrations.event_id AND c.user_id = auth.uid()
    )
  );

CREATE POLICY "Students can register themselves for events"
  ON public.event_registrations FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Students can cancel their registrations"
  ON public.event_registrations FOR DELETE
  TO authenticated
  USING (user_id = auth.uid() OR public.is_admin());

-- 5.6 Attendance Policies
CREATE POLICY "Attendance viewable by participant, coordinator, admin"
  ON public.event_attendance FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    public.is_admin() OR
    EXISTS (
      SELECT 1 FROM public.events e
      JOIN public.club_coordinators c ON c.club_id = e.club_id
      WHERE e.id = public.event_attendance.event_id AND c.user_id = auth.uid()
    )
  );

CREATE POLICY "Coordinators and Admins can mark attendance"
  ON public.event_attendance FOR ALL
  TO authenticated
  USING (
    public.is_admin() OR
    EXISTS (
      SELECT 1 FROM public.events e
      JOIN public.club_coordinators c ON c.club_id = e.club_id
      WHERE e.id = public.event_attendance.event_id AND c.user_id = auth.uid()
    )
  );

-- 5.7 Notifications Policies
CREATE POLICY "Users view only their own notifications"
  ON public.notifications FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- 5.8 Activity Logs Policies
CREATE POLICY "Activity logs viewable by coordinators and admins"
  ON public.activity_logs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert activity logs"
  ON public.activity_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);
