'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  UserRole,
  Club,
  Event,
  ClubMembership,
  EventRegistration,
  NotificationItem,
  ActivityLog,
  EventAttendance
} from '@/types';
import {
  DEMO_USERS,
  INITIAL_CLUBS,
  INITIAL_EVENTS,
  INITIAL_MEMBERSHIPS,
  INITIAL_REGISTRATIONS,
  INITIAL_NOTIFICATIONS,
  INITIAL_ACTIVITY_LOGS,
} from '@/data/mock-data';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  // Auth & User
  currentUser: UserProfile;
  switchUser: (role: UserRole) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  users: UserProfile[];
  updateUserRole: (userId: string, newRole: UserRole) => void;

  // Clubs
  clubs: Club[];
  getClubBySlug: (slug: string) => Club | undefined;
  getClubById: (id: string) => Club | undefined;
  createClub: (club: Omit<Club, 'id' | 'created_at' | 'member_count'>) => void;
  updateClub: (id: string, club: Partial<Club>) => void;
  deleteClub: (id: string) => void;
  toggleClubStatus: (id: string) => void;

  // Events
  events: Event[];
  getEventBySlug: (slug: string) => Event | undefined;
  getEventById: (id: string) => Event | undefined;
  createEvent: (event: Omit<Event, 'id' | 'created_at' | 'current_participants'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;

  // Memberships
  memberships: ClubMembership[];
  joinClub: (clubId: string) => void;
  leaveClub: (clubId: string) => void;
  approveMembership: (membershipId: string) => void;
  rejectMembership: (membershipId: string) => void;
  removeMember: (membershipId: string) => void;
  getUserMembershipForClub: (clubId: string, userId?: string) => ClubMembership | undefined;

  // Event Registrations
  registrations: EventRegistration[];
  registerForEvent: (eventId: string) => boolean;
  cancelRegistration: (eventId: string) => void;
  isUserRegisteredForEvent: (eventId: string, userId?: string) => boolean;
  getEventRegistrations: (eventId: string) => EventRegistration[];

  // Attendance
  attendances: EventAttendance[];
  markAttendance: (eventId: string, userId: string, status: 'present' | 'absent') => void;
  getEventAttendance: (eventId: string) => EventAttendance[];

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  // Activity Logs
  activityLogs: ActivityLog[];

  // Toast
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;

  // Dark mode
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'gec_clubsphere_';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state with default mock data, attempting to read from localStorage on client
  const [isClient, setIsClient] = useState(false);
  const [users, setUsers] = useState<UserProfile[]>(DEMO_USERS);
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEMO_USERS[3]); // Default to student
  const [clubs, setClubs] = useState<Club[]>(INITIAL_CLUBS);
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [memberships, setMemberships] = useState<ClubMembership[]>(INITIAL_MEMBERSHIPS);
  const [registrations, setRegistrations] = useState<EventRegistration[]>(INITIAL_REGISTRATIONS);
  const [attendances, setAttendances] = useState<EventAttendance[]>([
    { id: 'att-01', event_id: 'ev-20', user_id: 'usr-student-01', attendance_status: 'present', marked_at: '2026-10-15T16:00:00Z' },
    { id: 'att-02', event_id: 'ev-20', user_id: 'usr-student-02', attendance_status: 'present', marked_at: '2026-10-15T16:00:00Z' }
  ]);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(INITIAL_ACTIVITY_LOGS);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load from localStorage after mount
  useEffect(() => {
    setIsClient(true);
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY_PREFIX + 'currentUser');
      if (savedUser) setCurrentUser(JSON.parse(savedUser));

      const savedClubs = localStorage.getItem(STORAGE_KEY_PREFIX + 'clubs');
      if (savedClubs) setClubs(JSON.parse(savedClubs));

      const savedEvents = localStorage.getItem(STORAGE_KEY_PREFIX + 'events');
      if (savedEvents) setEvents(JSON.parse(savedEvents));

      const savedMemberships = localStorage.getItem(STORAGE_KEY_PREFIX + 'memberships');
      if (savedMemberships) setMemberships(JSON.parse(savedMemberships));

      const savedRegistrations = localStorage.getItem(STORAGE_KEY_PREFIX + 'registrations');
      if (savedRegistrations) setRegistrations(JSON.parse(savedRegistrations));

      const savedDark = localStorage.getItem(STORAGE_KEY_PREFIX + 'darkMode');
      if (savedDark) {
        const isDark = JSON.parse(savedDark);
        setIsDarkMode(isDark);
        if (isDark) document.documentElement.classList.add('dark');
      }
    } catch (e) {
      console.warn('Could not load cached demo data from localStorage', e);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isClient) return;
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'currentUser', JSON.stringify(currentUser));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'clubs', JSON.stringify(clubs));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'events', JSON.stringify(events));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'memberships', JSON.stringify(memberships));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'registrations', JSON.stringify(registrations));
    } catch (e) {
      console.warn('Could not save state to localStorage', e);
    }
  }, [currentUser, clubs, events, memberships, registrations, isClient]);

  // Toast helper
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Dark mode toggle
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem(STORAGE_KEY_PREFIX + 'darkMode', JSON.stringify(next));
      return next;
    });
  };

  // Switch role / user
  const switchUser = (role: UserRole) => {
    const targetUser = users.find((u) => u.role === role) || users[0];
    setCurrentUser(targetUser);
    showToast(`Switched persona to ${targetUser.full_name} (${role.replace('_', ' ').toUpperCase()})`, 'info');
  };

  const updateProfile = (updatedFields: Partial<UserProfile>) => {
    const updated = { ...currentUser, ...updatedFields };
    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updated : u)));
    showToast('Profile updated successfully!', 'success');
  };

  const updateUserRole = (userId: string, newRole: UserRole) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          return { ...u, role: newRole };
        }
        return u;
      })
    );
    if (currentUser.id === userId) {
      setCurrentUser((prev) => ({ ...prev, role: newRole }));
    }
    showToast(`User role updated to ${newRole}`, 'info');
  };

  // Helper getters
  const getClubBySlug = (slug: string) => clubs.find((c) => c.slug === slug);
  const getClubById = (id: string) => clubs.find((c) => c.id === id);
  const getEventBySlug = (slug: string) => events.find((e) => e.slug === slug);
  const getEventById = (id: string) => events.find((e) => e.id === id);

  // Club Operations
  const createClub = (clubData: Omit<Club, 'id' | 'created_at' | 'member_count'>) => {
    const newClub: Club = {
      ...clubData,
      id: `club-${Date.now()}`,
      member_count: 1,
      created_at: new Date().toISOString(),
    };
    setClubs((prev) => [newClub, ...prev]);

    // Add activity log
    const log: ActivityLog = {
      id: `act-${Date.now()}`,
      user_id: currentUser.id,
      user_name: currentUser.full_name,
      action: 'CREATED_CLUB',
      entity_type: 'club',
      entity_id: newClub.id,
      details: `Created new club "${newClub.name}" in category ${newClub.category}`,
      created_at: new Date().toISOString(),
    };
    setActivityLogs((prev) => [log, ...prev]);

    showToast(`Club "${newClub.name}" created successfully!`, 'success');
  };

  const updateClub = (id: string, updatedFields: Partial<Club>) => {
    setClubs((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedFields } : c))
    );
    showToast('Club details updated successfully!', 'success');
  };

  const deleteClub = (id: string) => {
    const club = clubs.find((c) => c.id === id);
    setClubs((prev) => prev.filter((c) => c.id !== id));
    setEvents((prev) => prev.filter((e) => e.club_id !== id));
    setMemberships((prev) => prev.filter((m) => m.club_id !== id));

    const log: ActivityLog = {
      id: `act-${Date.now()}`,
      user_id: currentUser.id,
      user_name: currentUser.full_name,
      action: 'DELETED_CLUB',
      entity_type: 'club',
      entity_id: id,
      details: `Deleted club "${club?.name || id}"`,
      created_at: new Date().toISOString(),
    };
    setActivityLogs((prev) => [log, ...prev]);

    showToast(`Club "${club?.name || 'Club'}" removed`, 'info');
  };

  const toggleClubStatus = (id: string) => {
    setClubs((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextStatus = c.status === 'active' ? 'inactive' : 'active';
          showToast(`Club status changed to ${nextStatus}`, 'info');
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  // Event Operations
  const createEvent = (eventData: Omit<Event, 'id' | 'created_at' | 'current_participants'>) => {
    const newEvent: Event = {
      ...eventData,
      id: `ev-${Date.now()}`,
      current_participants: 0,
      created_at: new Date().toISOString(),
    };
    setEvents((prev) => [newEvent, ...prev]);

    const log: ActivityLog = {
      id: `act-${Date.now()}`,
      user_id: currentUser.id,
      user_name: currentUser.full_name,
      action: 'CREATED_EVENT',
      entity_type: 'event',
      entity_id: newEvent.id,
      details: `Created new event "${newEvent.title}" on ${newEvent.event_date}`,
      created_at: new Date().toISOString(),
    };
    setActivityLogs((prev) => [log, ...prev]);

    showToast(`Event "${newEvent.title}" published!`, 'success');
  };

  const updateEvent = (id: string, updatedFields: Partial<Event>) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updatedFields } : e))
    );
    showToast('Event updated successfully!', 'success');
  };

  const deleteEvent = (id: string) => {
    const event = events.find((e) => e.id === id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setRegistrations((prev) => prev.filter((r) => r.event_id !== id));
    showToast(`Event "${event?.title || 'Event'}" removed`, 'info');
  };

  // Membership Operations
  const getUserMembershipForClub = (clubId: string, userId?: string) => {
    const uid = userId || currentUser.id;
    return memberships.find((m) => m.club_id === clubId && m.user_id === uid);
  };

  const joinClub = (clubId: string) => {
    const club = clubs.find((c) => c.id === clubId);
    if (!club) return;

    const existing = memberships.find(
      (m) => m.club_id === clubId && m.user_id === currentUser.id
    );
    if (existing) {
      showToast('You already applied to or joined this club', 'info');
      return;
    }

    const newMembership: ClubMembership = {
      id: `mem-${Date.now()}`,
      user_id: currentUser.id,
      club_id: clubId,
      membership_status: 'pending',
      role_in_club: 'member',
      joined_at: new Date().toISOString(),
    };

    setMemberships((prev) => [...prev, newMembership]);

    // Send notification to club coordinator & user
    const userNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      user_id: currentUser.id,
      title: 'Membership Application Submitted',
      message: `Your membership request for ${club.name} is submitted and awaiting coordinator approval.`,
      type: 'membership',
      is_read: false,
      created_at: new Date().toISOString(),
      link: `/clubs/${club.slug}`,
    };

    const coordNotif: NotificationItem = {
      id: `notif-${Date.now() + 1}`,
      user_id: 'usr-coord-01',
      title: 'New Club Application',
      message: `${currentUser.full_name} (${currentUser.roll_number}) requested to join ${club.name}.`,
      type: 'membership',
      is_read: false,
      created_at: new Date().toISOString(),
      link: '/club-dashboard',
    };

    setNotifications((prev) => [userNotif, coordNotif, ...prev]);

    showToast(`Applied for ${club.name} membership! Status: Pending Approval`, 'success');
  };

  const leaveClub = (clubId: string) => {
    const club = clubs.find((c) => c.id === clubId);
    setMemberships((prev) =>
      prev.filter((m) => !(m.club_id === clubId && m.user_id === currentUser.id))
    );
    if (club) {
      setClubs((prev) =>
        prev.map((c) =>
          c.id === clubId ? { ...c, member_count: Math.max(0, c.member_count - 1) } : c
        )
      );
    }
    showToast(`You have left ${club?.name || 'the club'}`, 'info');
  };

  const approveMembership = (membershipId: string) => {
    const mem = memberships.find((m) => m.id === membershipId);
    if (!mem) return;

    setMemberships((prev) =>
      prev.map((m) => (m.id === membershipId ? { ...m, membership_status: 'approved' } : m))
    );

    // Increment club member count
    setClubs((prev) =>
      prev.map((c) => (c.id === mem.club_id ? { ...c, member_count: c.member_count + 1 } : c))
    );

    // Notify student
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      user_id: mem.user_id,
      title: 'Membership Approved!',
      message: 'Your membership request has been approved! Welcome to the club.',
      type: 'approval',
      is_read: false,
      created_at: new Date().toISOString(),
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast('Membership approved!', 'success');
  };

  const rejectMembership = (membershipId: string) => {
    setMemberships((prev) =>
      prev.map((m) => (m.id === membershipId ? { ...m, membership_status: 'rejected' } : m))
    );
    showToast('Membership request rejected', 'info');
  };

  const removeMember = (membershipId: string) => {
    const mem = memberships.find((m) => m.id === membershipId);
    setMemberships((prev) => prev.filter((m) => m.id !== membershipId));
    if (mem && mem.membership_status === 'approved') {
      setClubs((prev) =>
        prev.map((c) =>
          c.id === mem.club_id ? { ...c, member_count: Math.max(0, c.member_count - 1) } : c
        )
      );
    }
    showToast('Member removed from club', 'info');
  };

  // Event Registration Operations
  const isUserRegisteredForEvent = (eventId: string, userId?: string) => {
    const uid = userId || currentUser.id;
    return registrations.some(
      (r) => r.event_id === eventId && r.user_id === uid && r.registration_status === 'confirmed'
    );
  };

  const getEventRegistrations = (eventId: string) => {
    return registrations.filter((r) => r.event_id === eventId);
  };

  const registerForEvent = (eventId: string): boolean => {
    const event = events.find((e) => e.id === eventId);
    if (!event) return false;

    // Check duplicate
    if (isUserRegisteredForEvent(eventId)) {
      showToast('You are already registered for this event!', 'error');
      return false;
    }

    // Check capacity
    if (event.current_participants >= event.max_participants) {
      showToast('This event has reached maximum capacity!', 'error');
      return false;
    }

    const newReg: EventRegistration = {
      id: `reg-${Date.now()}`,
      event_id: eventId,
      user_id: currentUser.id,
      registration_status: 'confirmed',
      registered_at: new Date().toISOString(),
    };

    setRegistrations((prev) => [...prev, newReg]);

    // Increment current participants
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId ? { ...e, current_participants: e.current_participants + 1 } : e
      )
    );

    // Notification
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      user_id: currentUser.id,
      title: 'Registration Confirmed',
      message: `You are registered for "${event.title}". Venue: ${event.venue}. Date: ${event.event_date}.`,
      type: 'event',
      is_read: false,
      created_at: new Date().toISOString(),
      link: `/events/${event.slug}`,
    };
    setNotifications((prev) => [notif, ...prev]);

    // Activity log
    const log: ActivityLog = {
      id: `act-${Date.now()}`,
      user_id: currentUser.id,
      user_name: currentUser.full_name,
      action: 'REGISTERED_EVENT',
      entity_type: 'registration',
      entity_id: newReg.id,
      details: `Registered for "${event.title}"`,
      created_at: new Date().toISOString(),
    };
    setActivityLogs((prev) => [log, ...prev]);

    showToast(`Successfully registered for "${event.title}"!`, 'success');
    return true;
  };

  const cancelRegistration = (eventId: string) => {
    const event = events.find((e) => e.id === eventId);
    setRegistrations((prev) =>
      prev.filter((r) => !(r.event_id === eventId && r.user_id === currentUser.id))
    );

    if (event) {
      setEvents((prev) =>
        prev.map((e) =>
          e.id === eventId
            ? { ...e, current_participants: Math.max(0, e.current_participants - 1) }
            : e
        )
      );
    }

    showToast(`Registration cancelled for "${event?.title || 'event'}"`, 'info');
  };

  // Attendance
  const markAttendance = (eventId: string, userId: string, status: 'present' | 'absent') => {
    setAttendances((prev) => {
      const existing = prev.find((a) => a.event_id === eventId && a.user_id === userId);
      if (existing) {
        return prev.map((a) =>
          a.id === existing.id
            ? { ...a, attendance_status: status, marked_at: new Date().toISOString() }
            : a
        );
      }
      return [
        ...prev,
        {
          id: `att-${Date.now()}`,
          event_id: eventId,
          user_id: userId,
          attendance_status: status,
          marked_at: new Date().toISOString(),
        },
      ];
    });
    showToast(`Attendance marked as ${status.toUpperCase()}`, 'success');
  };

  const getEventAttendance = (eventId: string) => {
    return attendances.filter((a) => a.event_id === eventId);
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => (n.user_id === currentUser.id ? { ...n, is_read: true } : n))
    );
    showToast('All notifications marked as read', 'info');
  };

  const unreadNotificationCount = notifications.filter(
    (n) => n.user_id === currentUser.id && !n.is_read
  ).length;

  return (
    <AppContext.Provider
      value={{
        currentUser,
        switchUser,
        updateProfile,
        users,
        updateUserRole,

        clubs,
        getClubBySlug,
        getClubById,
        createClub,
        updateClub,
        deleteClub,
        toggleClubStatus,

        events,
        getEventBySlug,
        getEventById,
        createEvent,
        updateEvent,
        deleteEvent,

        memberships,
        joinClub,
        leaveClub,
        approveMembership,
        rejectMembership,
        removeMember,
        getUserMembershipForClub,

        registrations,
        registerForEvent,
        cancelRegistration,
        isUserRegisteredForEvent,
        getEventRegistrations,

        attendances,
        markAttendance,
        getEventAttendance,

        notifications,
        unreadNotificationCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,

        activityLogs,

        toasts,
        showToast,
        removeToast,

        isDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
