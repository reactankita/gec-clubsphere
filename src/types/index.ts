export type UserRole = 'student' | 'club_coordinator' | 'faculty_coordinator' | 'super_admin';

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  roll_number: string;
  department: string;
  academic_year: 'FE' | 'SE' | 'TE' | 'BE';
  profile_photo: string;
  role: UserRole;
  phone?: string;
  bio?: string;
  created_at: string;
}

export type ClubCategory =
  | 'Technical'
  | 'Cultural'
  | 'Literary'
  | 'Robotics'
  | 'Entrepreneurship'
  | 'Science'
  | 'Sports'
  | 'Social and Community';

export interface SocialLinks {
  instagram?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  discord?: string;
  youtube?: string;
}

export interface CouncilMember {
  name: string;
  role: string;
  department: string;
  year: 'FE' | 'SE' | 'TE' | 'BE';
  email?: string;
  avatar?: string;
  linkedin?: string;
  github?: string;
}

export interface CouncilYearHistory {
  academic_year: string;
  theme?: string;
  council: CouncilMember[];
}

export interface ClubMeeting {
  title: string;
  date: string;
  time: string;
  venue: string;
  agenda: string;
  mode: 'In-Person' | 'Hybrid' | 'Online';
}

export interface FacultyAdvisor {
  name: string;
  designation: string;
  department: string;
  email: string;
  cabin?: string;
}

export interface Club {
  id: string;
  name: string;
  slug: string;
  category: ClubCategory;
  description: string;
  tagline: string;
  logo_url: string;
  banner_url: string;
  faculty_coordinator: string;
  faculty_coordinator_email: string;
  student_coordinator: string;
  student_coordinator_email: string;
  meeting_info: string;
  social_links: SocialLinks;
  achievements: string[];
  gallery: string[];
  status: 'active' | 'inactive';
  member_count: number;
  is_demo: boolean;
  established_year: number;
  created_at: string;
  faculty_advisor?: FacultyAdvisor;
  council?: CouncilMember[];
  council_history?: CouncilYearHistory[];
  next_meeting?: ClubMeeting;
  flagship_events?: string[];
}

export type MembershipStatus = 'pending' | 'approved' | 'rejected';

export interface ClubMembership {
  id: string;
  user_id: string;
  club_id: string;
  membership_status: MembershipStatus;
  role_in_club: 'member' | 'core_team' | 'lead';
  joined_at: string;
  club?: Club;
  user?: UserProfile;
}

export type EventCategory =
  | 'Workshop'
  | 'Competition'
  | 'Seminar'
  | 'Cultural Event'
  | 'Hackathon'
  | 'Sports'
  | 'Fest'
  | 'Orientation'
  | 'Social and Community';

export type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

export interface Event {
  id: string;
  club_id: string;
  title: string;
  slug: string;
  description: string;
  event_category: EventCategory;
  event_date: string; // YYYY-MM-DD
  start_time: string; // HH:mm
  end_time: string; // HH:mm
  venue: string;
  banner_url: string;
  registration_deadline: string;
  max_participants: number;
  current_participants: number;
  status: EventStatus;
  is_published: boolean;
  created_at: string;
  club?: Club;
}

export type RegistrationStatus = 'confirmed' | 'cancelled' | 'waitlisted';

export interface EventRegistration {
  id: string;
  event_id: string;
  user_id: string;
  registration_status: RegistrationStatus;
  registered_at: string;
  event?: Event;
  user?: UserProfile;
}

export interface ClubCoordinatorAssignment {
  id: string;
  user_id: string;
  club_id: string;
  coordinator_type: 'student' | 'faculty';
  assigned_at: string;
}

export type AttendanceStatus = 'present' | 'absent';

export interface EventAttendance {
  id: string;
  event_id: string;
  user_id: string;
  attendance_status: AttendanceStatus;
  marked_at: string;
  user?: UserProfile;
}

export interface NotificationItem {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'membership' | 'event' | 'system' | 'approval';
  is_read: boolean;
  created_at: string;
  link?: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  user_name: string;
  action: string;
  entity_type: 'club' | 'event' | 'membership' | 'registration' | 'user';
  entity_id: string;
  details: string;
  created_at: string;
}
