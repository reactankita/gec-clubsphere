import { Club, Event, UserProfile, ClubMembership, EventRegistration, NotificationItem, ActivityLog } from '@/types';

export const DEMO_USERS: UserProfile[] = [
  {
    id: 'usr-admin-01',
    full_name: 'Dr. Rajeshwari Sawant',
    email: 'admin@gec.ac.in',
    roll_number: 'FAC-ADM-04',
    department: 'Dean of Student Affairs / Administration',
    academic_year: 'BE',
    profile_photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    role: 'super_admin',
    phone: '+91 98221 44521',
    bio: 'Dean of Student Affairs at Goa College of Engineering. Overseeing university extracurricular activities and student development.',
    created_at: '2024-01-10T09:00:00Z',
  },
  {
    id: 'usr-coord-01',
    full_name: 'Sanket Prabhu',
    email: 'coordinator.coders@gec.ac.in',
    roll_number: '23CO042',
    department: 'Computer Engineering',
    academic_year: 'TE',
    profile_photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    role: 'club_coordinator',
    phone: '+91 97654 32189',
    bio: 'Lead Student Coordinator for GEC Coders Club. Passionate about competitive programming and open-source software.',
    created_at: '2024-02-15T10:30:00Z',
  },
  {
    id: 'usr-faculty-01',
    full_name: 'Prof. Aisha Naik',
    email: 'faculty.coders@gec.ac.in',
    roll_number: 'FAC-CS-12',
    department: 'Computer Engineering',
    academic_year: 'BE',
    profile_photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    role: 'faculty_coordinator',
    phone: '+91 94220 55190',
    bio: 'Associate Professor, Department of Computer Engineering. Faculty Advisor for technical student chapters and hackathons.',
    created_at: '2024-01-05T08:00:00Z',
  },
  {
    id: 'usr-student-01',
    full_name: 'Rohan Fernandes',
    email: 'rohan.fernandes@gec.ac.in',
    roll_number: '24IT018',
    department: 'Information Technology',
    academic_year: 'SE',
    profile_photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
    role: 'student',
    phone: '+91 91583 72014',
    bio: 'Second-year IT student passionate about full-stack web development, robotics, and campus quizzing.',
    created_at: '2024-08-01T11:00:00Z',
  },
  {
    id: 'usr-student-02',
    full_name: 'Tanvi Shirodkar',
    email: 'tanvi.shirodkar@gec.ac.in',
    roll_number: '23EC089',
    department: 'Electronics & Telecommunication',
    academic_year: 'TE',
    profile_photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    role: 'student',
    phone: '+91 98901 23456',
    bio: 'Third-year ETC student interested in embedded robotics, IoT, and cultural dance.',
    created_at: '2024-08-05T14:20:00Z',
  },
  {
    id: 'usr-student-03',
    full_name: 'Aditya Dessai',
    email: 'aditya.dessai@gec.ac.in',
    roll_number: '22ME034',
    department: 'Mechanical Engineering',
    academic_year: 'BE',
    profile_photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    role: 'student',
    phone: '+91 94031 99881',
    bio: 'Final year Mechanical engineering undergrad, sports enthusiast and automotive designer.',
    created_at: '2024-07-20T10:15:00Z',
  }
];

const RAW_CLUBS: Club[] = [
  {
    id: 'club-01',
    name: 'GEC Coders Club',
    slug: 'gec-coders-club',
    category: 'Technical',
    tagline: 'Code, Innovate, Elevate',
    description: 'The premier technical and competitive programming club of Goa College of Engineering. We organize weekly code jams, hackathons, open-source bootcamps, and prepare students for ICPC, GSOC, and top tech interviews.',
    logo_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=200',
    banner_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200',
    faculty_coordinator: 'Prof. Aisha Naik',
    faculty_coordinator_email: 'faculty.coders@gec.ac.in',
    student_coordinator: 'Sanket Prabhu',
    student_coordinator_email: 'coordinator.coders@gec.ac.in',
    meeting_info: 'Every Wednesday at 4:30 PM, Central Computer Center (CCC) Lab 2',
    social_links: {
      instagram: 'https://instagram.com/geccoders',
      github: 'https://github.com/gec-coders-club',
      linkedin: 'https://linkedin.com/company/gec-coders'
    },
    achievements: [
      'Winners of Smart India Hackathon (SIH 2024)',
      'Qualified for ICPC Asia Amritapuri Regionals 2023 & 2024',
      'Hosted CodeSprint 2024 with 450+ participants across Goa'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600'
    ],
    status: 'active',
    member_count: 142,
    is_demo: true,
    established_year: 2017,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'club-02',
    name: 'ARM Robotics Club',
    slug: 'arm-robotics-club',
    category: 'Robotics',
    tagline: 'Engineering the Autonomous Future',
    description: 'GEC Robotics chapter focused on autonomous rovers, drone mechanics, embedded controllers, ROS2, and competitive robotics. Teams represent GEC at Robocon, Techfest IIT Bombay, and national arenas.',
    logo_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=200',
    banner_url: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&q=80&w=1200',
    faculty_coordinator: 'Dr. Vinay Shirodkar',
    faculty_coordinator_email: 'vshirodkar@gec.ac.in',
    student_coordinator: 'Aditya Sawant',
    student_coordinator_email: 'aditya.robotics@gec.ac.in',
    meeting_info: 'Fridays at 3:30 PM, Robotics & Mechatronics Lab',
    social_links: {
      instagram: 'https://instagram.com/gec_robotics',
      linkedin: 'https://linkedin.com/company/gec-robotics'
    },
    achievements: [
      'Top 8 Finalist in National ABU Robocon India',
      '1st Place in RoboSoccer at MindSpark COEP',
      'Autonomous Terrain Rover deployed for campus mapping'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=600'
    ],
    status: 'active',
    member_count: 98,
    is_demo: true,
    established_year: 2015,
    created_at: '2024-01-18T10:00:00Z'
  },
  {
    id: 'club-03',
    name: 'Quiz Club',
    slug: 'quiz-club',
    category: 'Literary',
    tagline: 'Where Curiosity Meets Intellect',
    description: 'The intellectual hub of GEC. We explore trivia, history, pop culture, science, business, and current affairs. Regular intra-college MELA quizzes, state-level inter-collegiate quizzing championships, and buzzer battles.',
    logo_url: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=200',
    banner_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200',
    faculty_coordinator: 'Prof. Milind Sakhardande',
    faculty_coordinator_email: 'milind.s@gec.ac.in',
    student_coordinator: 'Gaurav Narvekar',
    student_coordinator_email: 'gaurav.quiz@gec.ac.in',
    meeting_info: 'Tuesdays at 4:30 PM, Library Seminar Room',
    social_links: {
      instagram: 'https://instagram.com/gec_quizclub'
    },
    achievements: [
      'Goa State Inter-Collegiate Quiz Champions 2023 & 2024',
      'Tata Crucible Campus Quiz National Semi-Finalists',
      'Annual Megabytes General Quiz with 60+ teams'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600'
    ],
    status: 'active',
    member_count: 76,
    is_demo: true,
    established_year: 2012,
    created_at: '2024-01-20T10:00:00Z'
  },
  {
    id: 'club-04',
    name: 'AI Innovators Club',
    slug: 'ai-innovators-club',
    category: 'Technical',
    tagline: 'Demystifying Artificial Intelligence & Deep Learning',
    description: 'Dedicated to machine learning, generative AI, computer vision, and neural network research. We host hands-on PyTorch workshops, LLM fine-tuning hackathons, and research paper reading groups.',
    logo_url: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=200',
    banner_url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200',
    faculty_coordinator: 'Dr. Nilesh Phaldesai',
    faculty_coordinator_email: 'nphaldesai@gec.ac.in',
    student_coordinator: 'Kavya Hegde',
    student_coordinator_email: 'kavya.ai@gec.ac.in',
    meeting_info: 'Thursdays at 4:00 PM, AI/ML Lab IT Department',
    social_links: {
      github: 'https://github.com/gec-ai-innovators',
      linkedin: 'https://linkedin.com/company/gec-ai'
    },
    achievements: [
      'Published 4 research papers in IEEE Conferences',
      'Created GEC Campus AI Multilingual Bot',
      '1st Place in Goa AI Sprint 2024'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600'
    ],
    status: 'active',
    member_count: 115,
    is_demo: true,
    established_year: 2021,
    created_at: '2024-02-01T10:00:00Z'
  },
  {
    id: 'club-05',
    name: 'Music Club',
    slug: 'music-club',
    category: 'Cultural',
    tagline: 'Harmonizing Beats, Igniting Melodies',
    description: 'The heartbeat of GEC musical culture. From acoustic jams under the banyan tree to high-voltage rock nights at the college fest Spectrum, we train vocalists, instrumentalists, audio mixers, and band ensembles.',
    logo_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=200',
    banner_url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=1200',
    faculty_coordinator: 'Prof. Sneha Prabhu',
    faculty_coordinator_email: 'sprabhu@gec.ac.in',
    student_coordinator: 'Varun Kamat',
    student_coordinator_email: 'varun.music@gec.ac.in',
    meeting_info: 'Mondays & Thursdays at 5:00 PM, Music Room Open Air Stage',
    social_links: {
      instagram: 'https://instagram.com/gec_music_club',
      youtube: 'https://youtube.com/@gecmusic'
    },
    achievements: [
      'Best College Band at BITS Waves 2023',
      'Winners of Battle of the Bands at Goa University Youth Fest',
      'Annual Acoustic Eve "SoundWaves" 2024'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600'
    ],
    status: 'active',
    member_count: 85,
    is_demo: true,
    established_year: 2010,
    created_at: '2024-01-25T10:00:00Z'
  },
  {
    id: 'club-06',
    name: 'Drama Club',
    slug: 'drama-club',
    category: 'Cultural',
    tagline: 'Life on the Wooden Boards',
    description: 'Nurturing theatrical talents, street play (Nukkad Natak), one-act plays, scriptwriting, and stage direction. Our productions tackle social realities, satire, and classic Konkani & English theatre.',
    logo_url: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&q=80&w=200',
    banner_url: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&q=80&w=1200',
    faculty_coordinator: 'Prof. Amey Kerkar',
    faculty_coordinator_email: 'akerkar@gec.ac.in',
    student_coordinator: 'Shruti Gaonkar',
    student_coordinator_email: 'shruti.drama@gec.ac.in',
    meeting_info: 'Tuesdays & Saturdays at 4:30 PM, Old Auditorium',
    social_links: {
      instagram: 'https://instagram.com/gec_theatre'
    },
    achievements: [
      '1st Prize in Street Play at IIT Goa CultFest',
      'Gold Medal in Konkani One-Act Play State Level',
      'Annual Drama Showcase "Rangmanch" 2024'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&q=80&w=600'
    ],
    status: 'active',
    member_count: 62,
    is_demo: true,
    established_year: 2008,
    created_at: '2024-01-28T10:00:00Z'
  },
  {
    id: 'club-07',
    name: 'Astronomy Club',
    slug: 'astronomy-club',
    category: 'Science',
    tagline: 'Looking Beyond The Earthly Horizon',
    description: 'Stargazers, astrophysicists, and astrophotographers of Farmagudi. Armed with computerized telescopes and binocular rigs, we conduct night sky observations, astrophotography workshops, and eclipse expeditions.',
    logo_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=200',
    banner_url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&q=80&w=1200',
    faculty_coordinator: 'Dr. Prakash Dharwadkar',
    faculty_coordinator_email: 'pdharwadkar@gec.ac.in',
    student_coordinator: 'Rishi Borkar',
    student_coordinator_email: 'rishi.astro@gec.ac.in',
    meeting_info: 'Clear Sky Fridays at 7:30 PM, Mining Dept Terrace / Ground',
    social_links: {
      instagram: 'https://instagram.com/gec_astronomy'
    },
    achievements: [
      'Captured ISS Transit across the Sun',
      'Hosted Farmagudi Stargazing Night with 300+ attendees',
      'ISRO Space Day Exhibition 2024 Organization'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&q=80&w=600'
    ],
    status: 'active',
    member_count: 88,
    is_demo: true,
    established_year: 2018,
    created_at: '2024-02-05T10:00:00Z'
  },
  {
    id: 'club-08',
    name: 'E-Cell',
    slug: 'e-cell',
    category: 'Entrepreneurship',
    tagline: 'Igniting the Spirit of Startup Innovation',
    description: 'The Entrepreneurship Cell of GEC, incubated under Goa State Innovation Council (GSInC). We mentor student founders, organize angel pitch battles, patent filing clinics, and startup bootcamps.',
    logo_url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=200',
    banner_url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200',
    faculty_coordinator: 'Dr. Geeta Nayak',
    faculty_coordinator_email: 'gnayak@gec.ac.in',
    student_coordinator: 'Pranav Vernekar',
    student_coordinator_email: 'pranav.ecell@gec.ac.in',
    meeting_info: 'Wednesdays at 3:30 PM, Innovation & Incubation Center',
    social_links: {
      instagram: 'https://instagram.com/gec_ecell',
      linkedin: 'https://linkedin.com/company/gec-ecell'
    },
    achievements: [
      'Facilitated 6 student startups registered under Startup Goa',
      'Secured 15 Lakhs in seed grants for student prototypes',
      'E-Summit 2024 with 20+ prominent angel investors'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=600'
    ],
    status: 'active',
    member_count: 104,
    is_demo: true,
    established_year: 2016,
    created_at: '2024-01-12T10:00:00Z'
  },
  {
    id: 'club-09',
    name: 'Sports Club',
    slug: 'sports-club',
    category: 'Sports',
    tagline: 'Sweat, Determination, Victory',
    description: 'Managing college athletic squads in Cricket, Football, Badminton, Table Tennis, Volleyball, Basketball, and Chess. We run intra-department leagues and prepare students for Goa University Inter-Collegiate Tournaments.',
    logo_url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=200',
    banner_url: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&q=80&w=1200',
    faculty_coordinator: 'Prof. Nilesh Bhende (Sports Director)',
    faculty_coordinator_email: 'nbhende@gec.ac.in',
    student_coordinator: 'Sahil Chodankar',
    student_coordinator_email: 'sahil.sports@gec.ac.in',
    meeting_info: 'Daily conditioning at 5:00 PM, GEC Main Sports Pavilion',
    social_links: {
      instagram: 'https://instagram.com/gec_sports'
    },
    achievements: [
      'Goa University Inter-Collegiate Football Champions 2024',
      'Gold in Men Badminton Inter-Collegiate 2023',
      'Organizers of Kurukshetra Inter-Branch Trophy'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=600'
    ],
    status: 'active',
    member_count: 180,
    is_demo: true,
    established_year: 1980,
    created_at: '2024-01-08T10:00:00Z'
  },
  {
    id: 'club-10',
    name: 'Dance Club',
    slug: 'dance-club',
    category: 'Cultural',
    tagline: 'Expressions in Rhythm and Motion',
    description: 'From contemporary and hip-hop to classical Bharatanatyam and folk Goan Fugdi. We represent GEC across university dance fests, perform high-energy campus flash mobs, and conduct choreography masterclasses.',
    logo_url: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80&w=200',
    banner_url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=1200',
    faculty_coordinator: 'Prof. Diksha Volvoikar',
    faculty_coordinator_email: 'dvolvoikar@gec.ac.in',
    student_coordinator: 'Sanika Tari',
    student_coordinator_email: 'sanika.dance@gec.ac.in',
    meeting_info: 'Tuesdays & Thursdays at 5:00 PM, Student Activity Center (SAC)',
    social_links: {
      instagram: 'https://instagram.com/gec_groove'
    },
    achievements: [
      '1st Place in Western Group Dance at Waves BITS Goa',
      'Champions of Tarang Youth Fest 2024',
      'Goa Cultural Heritage Dance Trophy'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&q=80&w=600'
    ],
    status: 'active',
    member_count: 72,
    is_demo: true,
    established_year: 2014,
    created_at: '2024-01-16T10:00:00Z'
  },
  {
    id: 'club-11',
    name: 'Photography Club',
    slug: 'photography-club',
    category: 'Cultural',
    tagline: 'Freezing Moments Through The Lens',
    description: 'Documenting the essence of Farmagudi life. Our crew handles photo & videography coverage for all college festivals, conducts nature photowalks in Western Ghats, and teaches Adobe Lightroom & DaVinci Resolve.',
    logo_url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=200',
    banner_url: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80&w=1200',
    faculty_coordinator: 'Prof. Hemant Palyekar',
    faculty_coordinator_email: 'hpalyekar@gec.ac.in',
    student_coordinator: 'Omkar Salgaonkar',
    student_coordinator_email: 'omkar.photo@gec.ac.in',
    meeting_info: 'Saturdays at 3:00 PM, Media Lab / Campus Photowalks',
    social_links: {
      instagram: 'https://instagram.com/gec_frames'
    },
    achievements: [
      'Official Media Partner for Spectrum & Kurukshetra',
      'Goa Biodiversity Photo Contest 1st & 2nd prize winners',
      'Annual Photo Gallery Exhibition "Drishti" 2024'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?auto=format&fit=crop&q=80&w=600'
    ],
    status: 'active',
    member_count: 65,
    is_demo: true,
    established_year: 2013,
    created_at: '2024-01-22T10:00:00Z'
  },
  {
    id: 'club-12',
    name: 'Literary Club',
    slug: 'literary-club',
    category: 'Literary',
    tagline: 'Words That Move Minds and Shake Worlds',
    description: 'A sanctuary for poets, debaters, essayists, and bibliophiles. We host Parliamentary Debates, Slam Poetry evenings, book exchanges, and edit the prestigious Annual GEC College Magazine.',
    logo_url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=200',
    banner_url: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=1200',
    faculty_coordinator: 'Prof. Natasha Costa',
    faculty_coordinator_email: 'ncosta@gec.ac.in',
    student_coordinator: 'Ananya Prabhu',
    student_coordinator_email: 'ananya.lit@gec.ac.in',
    meeting_info: 'Thursdays at 4:30 PM, Central Library Reading Hall',
    social_links: {
      instagram: 'https://instagram.com/gec_literary'
    },
    achievements: [
      'Goa Youth Parliamentary Debate 2024 Champions',
      'Published GEC Centenary Anthology "Echoes of Farmagudi"',
      'National Slam Poetry Finalist 2023'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600'
    ],
    status: 'active',
    member_count: 58,
    is_demo: true,
    established_year: 2005,
    created_at: '2024-01-14T10:00:00Z'
  },
  {
    id: 'club-13',
    name: 'IEEE Student Branch',
    slug: 'ieee-student-branch',
    category: 'Technical',
    tagline: 'Advancing Technology for Humanity',
    description: 'Official student chapter under IEEE Bombay Section. We conduct distinguished lecture series, technical paper writing seminars, IEEE Xplore access workshops, and facilitate international conference participation.',
    logo_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=200',
    banner_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200',
    faculty_coordinator: 'Dr. Hassanali Virani',
    faculty_coordinator_email: 'hvirani@gec.ac.in',
    student_coordinator: 'Nikhil Pai',
    student_coordinator_email: 'nikhil.ieee@gec.ac.in',
    meeting_info: 'Wednesdays at 4:00 PM, Electronics Seminar Hall',
    social_links: {
      website: 'https://ieee.gec.ac.in',
      linkedin: 'https://linkedin.com/company/gec-ieee'
    },
    achievements: [
      'Outstanding Student Branch Chapter Award 2023',
      'Organized IEEE DISCOVER International Conference co-host',
      '12 Best Paper Awards won by student members'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=600'
    ],
    status: 'active',
    member_count: 135,
    is_demo: true,
    established_year: 1998,
    created_at: '2024-01-02T10:00:00Z'
  },
  {
    id: 'club-14',
    name: 'Entrepreneurship Club',
    slug: 'entrepreneurship-club',
    category: 'Entrepreneurship',
    tagline: 'Bridging Classroom Theories to Enterprise Realities',
    description: 'Complementing the startup ecosystem with market research, financial modeling, product management, and corporate leadership masterclasses. We connect students with industry leaders across India.',
    logo_url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=200',
    banner_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
    faculty_coordinator: 'Prof. Rajesh Gaonkar',
    faculty_coordinator_email: 'rgaonkar@gec.ac.in',
    student_coordinator: 'Vandana Shenvi',
    student_coordinator_email: 'vandana.ent@gec.ac.in',
    meeting_info: 'Mondays at 4:00 PM, Mechanical Dept AV Hall',
    social_links: {
      linkedin: 'https://linkedin.com/company/gec-entrepreneurship'
    },
    achievements: [
      'Conducted 12 Industrial Visit immersion programs',
      'Case Study Challenge Winners at IIM Ahmedabad Chaos',
      'Campus Venture Incubator cohort of 2024'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600'
    ],
    status: 'active',
    member_count: 82,
    is_demo: true,
    established_year: 2019,
    created_at: '2024-01-19T10:00:00Z'
  },
  {
    id: 'club-15',
    name: 'Cultural Club',
    slug: 'cultural-club',
    category: 'Cultural',
    tagline: 'Celebrating The Rich Heritage of Goa & India',
    description: 'The premier umbrella cultural council of GEC. We celebrate traditional Goan Shigmo, Ganesh Chaturthi festivities, Diwali celebrations, Christmas carols, ethnic days, and coordinate GEC Spectrum fest.',
    logo_url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=200',
    banner_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1200',
    faculty_coordinator: 'Dr. Supriya Patil',
    faculty_coordinator_email: 'spatil@gec.ac.in',
    student_coordinator: 'Mihir Borkar',
    student_coordinator_email: 'mihir.cultural@gec.ac.in',
    meeting_info: 'Fridays at 4:30 PM, Open Air Theatre (OAT)',
    social_links: {
      instagram: 'https://instagram.com/gec_cultural'
    },
    achievements: [
      'Overall Champions at Goa Youth Festival 2023 & 2024',
      'Hosts of GEC Spectrum Mega Fest with 5000+ footfall',
      'Preservation of Goan Folk Arts citation from Govt of Goa'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600'
    ],
    status: 'active',
    member_count: 160,
    is_demo: true,
    established_year: 1975,
    created_at: '2024-01-04T10:00:00Z'
  },
  {
    id: 'club-16',
    name: 'Environmental Club',
    slug: 'environmental-club',
    category: 'Social and Community',
    tagline: 'Nurturing Green Farmagudi for Tomorrow',
    description: 'Committed to campus sustainability, native biodiversity conservation, e-waste recycling drives, solar awareness, and ecological treks across Western Ghats forests surrounding Farmagudi.',
    logo_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=200',
    banner_url: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=1200',
    faculty_coordinator: 'Prof. Ganesh Hegde',
    faculty_coordinator_email: 'ghegde@gec.ac.in',
    student_coordinator: 'Deepa Tari',
    student_coordinator_email: 'deepa.eco@gec.ac.in',
    meeting_info: 'Saturdays at 8:00 AM, Campus Botanical Garden',
    social_links: {
      instagram: 'https://instagram.com/gec_green'
    },
    achievements: [
      'Planted 1200+ indigenous trees across GEC campus hills',
      'Zero-Single-Use-Plastic campus policy implementation',
      'Green Campus Excellence Award by Goa State Pollution Control Board'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600'
    ],
    status: 'active',
    member_count: 94,
    is_demo: true,
    established_year: 2011,
    created_at: '2024-01-11T10:00:00Z'
  }
];

export const INITIAL_CLUBS: Club[] = RAW_CLUBS.map((club) => {
  if (club.slug === 'gec-coders-club') {
    return {
      ...club,
      faculty_advisor: {
        name: 'Prof. Aisha Naik',
        designation: 'Associate Professor & Dept Coordinator',
        department: 'Computer Engineering',
        email: 'faculty.coders@gec.ac.in',
        cabin: 'IT & Comp Block, Room 204'
      },
      next_meeting: {
        title: 'Weekly Competitive Coding Sprint & SIH Brainstorming',
        date: '2026-11-26',
        time: '04:30 PM - 06:00 PM',
        venue: 'Central Computer Center (CCC) Lab 2',
        agenda: 'Tree dynamic programming, graph algorithms, and review of Smart India Hackathon internal submissions.',
        mode: 'In-Person' as const
      },
      flagship_events: [
        'CodeSprint 24-Hour Inter-Collegiate Hackathon',
        'Goa Collegiate CodeJam & AlgoSprint',
        'Winter of Open Source Bootcamp',
        'ICPC Orientation & Regional Mock Contests'
      ],
      council: [
        { name: 'Sanket Prabhu', role: 'President / Student Lead', department: 'Computer Engineering', year: 'TE' as const, email: 'sanket.p@gec.ac.in', github: 'https://github.com' },
        { name: 'Neha Varde', role: 'Vice President / Co-Lead', department: 'Information Technology', year: 'TE' as const, email: 'neha.v@gec.ac.in' },
        { name: 'Aryan Chari', role: 'Technical Head', department: 'Computer Engineering', year: 'BE' as const, email: 'aryan.c@gec.ac.in', github: 'https://github.com' },
        { name: 'Tanvi Shirodkar', role: 'Hackathons & Events Lead', department: 'Electronics & Telecom', year: 'TE' as const, email: 'tanvi.s@gec.ac.in' },
        { name: 'Rohan Fernandes', role: 'Open Source & PR Lead', department: 'Information Technology', year: 'SE' as const, email: 'rohan.f@gec.ac.in', github: 'https://github.com' },
        { name: 'Kunal Borkar', role: 'Treasurer & Logistics', department: 'Computer Engineering', year: 'SE' as const, email: 'kunal.b@gec.ac.in' }
      ],
      council_history: [
        {
          academic_year: '2024-25',
          theme: 'Scaling Open Source & SIH Victory',
          council: [
            { name: 'Sanket Prabhu', role: 'President', department: 'Computer Engineering', year: 'TE' as const },
            { name: 'Neha Varde', role: 'Vice President', department: 'Information Technology', year: 'TE' as const },
            { name: 'Aryan Chari', role: 'Technical Head', department: 'Computer Engineering', year: 'BE' as const },
            { name: 'Tanvi Shirodkar', role: 'Events Lead', department: 'Electronics & Telecom', year: 'TE' as const },
            { name: 'Kunal Borkar', role: 'Treasurer', department: 'Computer Engineering', year: 'SE' as const }
          ]
        },
        {
          academic_year: '2023-24',
          theme: 'ICPC Ascent & High-Performance Computing',
          council: [
            { name: 'Aditya Naik', role: 'President', department: 'Computer Engineering', year: 'BE' as const },
            { name: 'Simran Dessai', role: 'Vice President', department: 'Information Technology', year: 'BE' as const },
            { name: 'Sanket Prabhu', role: 'Technical Lead', department: 'Computer Engineering', year: 'SE' as const },
            { name: 'Rahul Shet', role: 'Events Coordinator', department: 'Computer Engineering', year: 'TE' as const },
            { name: 'Pooja Gaonkar', role: 'Treasurer', department: 'Electronics & Telecom', year: 'TE' as const }
          ]
        },
        {
          academic_year: '2022-23',
          theme: 'Post-Pandemic Revival & Web3 Bootcamps',
          council: [
            { name: 'Vikram Joshi', role: 'President', department: 'Computer Engineering', year: 'BE' as const },
            { name: 'Rhea Fernandes', role: 'Vice President', department: 'Computer Engineering', year: 'BE' as const },
            { name: 'Aditya Naik', role: 'Technical Lead', department: 'Computer Engineering', year: 'TE' as const },
            { name: 'Shreya Phadke', role: 'Events Head', department: 'Information Technology', year: 'BE' as const }
          ]
        }
      ]
    };
  }

  if (club.slug === 'entrepreneurship-club') {
    return {
      ...club,
      faculty_advisor: {
        name: 'Prof. Rajesh Gaonkar',
        designation: 'Assistant Professor & Venture Mentor',
        department: 'Mechanical Engineering',
        email: 'rgaonkar@gec.ac.in',
        cabin: 'Mechanical Block, Room 108'
      },
      next_meeting: {
        title: 'Startup Pitch Deck Clinic & GSInC Seed Grant Prep',
        date: '2026-11-25',
        time: '04:00 PM - 05:30 PM',
        venue: 'Mechanical Dept AV Hall',
        agenda: 'Pitch deck reviews, venture valuation models, and submission guidance for Goa State Innovation Council student grants.',
        mode: 'In-Person' as const
      },
      flagship_events: [
        'GEC Startup Pitch Conclave',
        'Venture Capital & Angel Investor Roundtable',
        'Industry Leader Immersion Series',
        'Product Strategy & Financial Modeling Bootcamp'
      ],
      council: [
        { name: 'Vandana Shenvi', role: 'President / Student Lead', department: 'Mechanical Engineering', year: 'BE' as const, email: 'vandana.ent@gec.ac.in' },
        { name: 'Pratik Naik', role: 'Vice President / Co-Lead', department: 'Computer Engineering', year: 'TE' as const, email: 'pratik.n@gec.ac.in' },
        { name: 'Anjali Shirodkar', role: 'Corporate Relations Head', department: 'Electronics & Telecom', year: 'TE' as const, email: 'anjali.s@gec.ac.in' },
        { name: 'Rohan Kare', role: 'Venture & Finance Lead', department: 'Mechanical Engineering', year: 'SE' as const, email: 'rohan.k@gec.ac.in' },
        { name: 'Shreya Prabhu', role: 'PR & Branding Lead', department: 'Information Technology', year: 'TE' as const, email: 'shreya.p@gec.ac.in' },
        { name: 'Nikhil Dessai', role: 'Incubation Operations', department: 'Civil Engineering', year: 'SE' as const, email: 'nikhil.d@gec.ac.in' }
      ],
      council_history: [
        {
          academic_year: '2024-25',
          theme: 'Scaling Student Ventures & Angel Seed Connect',
          council: [
            { name: 'Vandana Shenvi', role: 'President', department: 'Mechanical Engineering', year: 'BE' as const },
            { name: 'Pratik Naik', role: 'Vice President', department: 'Computer Engineering', year: 'TE' as const },
            { name: 'Anjali Shirodkar', role: 'Corporate Relations', department: 'Electronics & Telecom', year: 'TE' as const },
            { name: 'Rohan Kare', role: 'Finance Head', department: 'Mechanical Engineering', year: 'SE' as const }
          ]
        },
        {
          academic_year: '2023-24',
          theme: 'Corporate Immersion & Market Discovery',
          council: [
            { name: 'Gaurav Dessai', role: 'President', department: 'Mechanical Engineering', year: 'BE' as const },
            { name: 'Vandana Shenvi', role: 'Vice President', department: 'Mechanical Engineering', year: 'TE' as const },
            { name: 'Pratik Naik', role: 'Finance Head', department: 'Computer Engineering', year: 'SE' as const },
            { name: 'Divya Naik', role: 'PR Head', department: 'Information Technology', year: 'BE' as const }
          ]
        },
        {
          academic_year: '2022-23',
          theme: 'Foundational Incubation & GSInC Ties',
          council: [
            { name: 'Mihir Varde', role: 'President', department: 'Mechanical Engineering', year: 'BE' as const },
            { name: 'Gaurav Dessai', role: 'Vice President', department: 'Mechanical Engineering', year: 'TE' as const },
            { name: 'Rhea Sawant', role: 'Secretary', department: 'Computer Engineering', year: 'BE' as const }
          ]
        }
      ]
    };
  }

  if (club.slug === 'arm-robotics-club') {
    return {
      ...club,
      faculty_advisor: {
        name: 'Dr. Vinay Shirodkar',
        designation: 'Associate Professor & Robotics Lab Head',
        department: 'Electronics & Telecommunication',
        email: 'vshirodkar@gec.ac.in',
        cabin: 'ETC Block, Room 302'
      },
      next_meeting: {
        title: 'ROS2 Autonomous Navigation & Rover Field Testing',
        date: '2026-11-28',
        time: '03:30 PM - 05:30 PM',
        venue: 'Robotics & Mechatronics Lab',
        agenda: 'Differential drive calibration, LiDAR sensor fusion, and field testing for Robocon arena obstacles.',
        mode: 'In-Person' as const
      },
      flagship_events: [
        'RoboWars & Autonomous Obstacle Derby',
        'National ABU Robocon Delegation',
        'Drone Dynamics & FPV Racing Workshop',
        'Embedded Systems & Microcontroller Hack'
      ],
      council: [
        { name: 'Aditya Sawant', role: 'President / Team Captain', department: 'Electronics & Telecom', year: 'BE' as const, email: 'aditya.robotics@gec.ac.in' },
        { name: 'Gautam Kamat', role: 'Mechanical & Chassis Head', department: 'Mechanical Engineering', year: 'TE' as const, email: 'gautam.k@gec.ac.in' },
        { name: 'Tanvi Shirodkar', role: 'Embedded Systems Lead', department: 'Electronics & Telecom', year: 'TE' as const, email: 'tanvi.s@gec.ac.in' },
        { name: 'Siddhesh Parab', role: 'Software & ROS Lead', department: 'Computer Engineering', year: 'TE' as const, email: 'siddhesh.p@gec.ac.in' },
        { name: 'Rahul Chari', role: 'Logistics & Fabrication', department: 'Mechanical Engineering', year: 'SE' as const, email: 'rahul.c@gec.ac.in' }
      ],
      council_history: [
        {
          academic_year: '2024-25',
          theme: 'Autonomous Navigation & National Arena Breakthrough',
          council: [
            { name: 'Aditya Sawant', role: 'President', department: 'Electronics & Telecom', year: 'BE' as const },
            { name: 'Gautam Kamat', role: 'Mechanical Head', department: 'Mechanical Engineering', year: 'TE' as const },
            { name: 'Tanvi Shirodkar', role: 'Embedded Lead', department: 'Electronics & Telecom', year: 'TE' as const }
          ]
        },
        {
          academic_year: '2023-24',
          theme: 'ABU Robocon National Finalist Run',
          council: [
            { name: 'Omkar Naik', role: 'President', department: 'Mechanical Engineering', year: 'BE' as const },
            { name: 'Aditya Sawant', role: 'Vice President', department: 'Electronics & Telecom', year: 'TE' as const },
            { name: 'Sneha Vernekar', role: 'Software Head', department: 'Computer Engineering', year: 'BE' as const }
          ]
        }
      ]
    };
  }

  if (club.slug === 'quiz-club') {
    return {
      ...club,
      faculty_advisor: {
        name: 'Prof. Milind Sakhardande',
        designation: 'Associate Professor & Quizmaster',
        department: 'Civil Engineering',
        email: 'milind.s@gec.ac.in',
        cabin: 'Civil Annex, Room C-12'
      },
      next_meeting: {
        title: 'Weekly MELA Trivia Jam & Buzzer Battle',
        date: '2026-11-27',
        time: '04:30 PM - 06:00 PM',
        venue: 'Central Library Seminar Room',
        agenda: 'Audio-visual pop culture, sci-tech trivia, and team allocations for the upcoming Tata Crucible rounds.',
        mode: 'In-Person' as const
      },
      flagship_events: [
        'Megabytes Annual Open General Quiz',
        'Goa Inter-Collegiate Quiz Open',
        'MELA (Music, Entertainment, Lit, Arts) Quiz',
        'BizTech Corporate Trivia Challenge'
      ],
      council: [
        { name: 'Gaurav Narvekar', role: 'President / Head Quizmaster', department: 'Information Technology', year: 'BE' as const, email: 'gaurav.quiz@gec.ac.in' },
        { name: 'Rohan Fernandes', role: 'Vice President / Tech Quizmaster', department: 'Information Technology', year: 'SE' as const, email: 'rohan.f@gec.ac.in' },
        { name: 'Ananya Prabhu', role: 'General & Literary Lead', department: 'Computer Engineering', year: 'TE' as const, email: 'ananya.p@gec.ac.in' },
        { name: 'Soham Naik', role: 'Logistics & Buzzer In-Charge', department: 'Electronics & Telecom', year: 'TE' as const, email: 'soham.n@gec.ac.in' }
      ],
      council_history: [
        {
          academic_year: '2024-25',
          theme: 'State Inter-Collegiate Championship Double',
          council: [
            { name: 'Gaurav Narvekar', role: 'President', department: 'Information Technology', year: 'BE' as const },
            { name: 'Rohan Fernandes', role: 'Vice President', department: 'Information Technology', year: 'SE' as const }
          ]
        },
        {
          academic_year: '2023-24',
          theme: 'Tata Crucible Semi-Finals Run',
          council: [
            { name: 'Varun Dessai', role: 'President', department: 'Computer Engineering', year: 'BE' as const },
            { name: 'Gaurav Narvekar', role: 'Vice President', department: 'Information Technology', year: 'TE' as const }
          ]
        }
      ]
    };
  }

  // Default rich data for any other club
  const deptMap: Record<string, string> = {
    Technical: 'Computer Engineering',
    Robotics: 'Electronics & Telecom',
    Cultural: 'Student Affairs Council',
    Entrepreneurship: 'Mechanical Engineering',
    Science: 'Mining & Basic Sciences',
    Sports: 'Physical Education Dept',
    Literary: 'Humanities & Information Tech',
    'Social and Community': 'Civil & Environmental Dept'
  };

  const assignedDept = deptMap[club.category] || 'Engineering Dept';

  return {
    ...club,
    faculty_advisor: {
      name: club.faculty_coordinator,
      designation: 'Faculty Advisor & Associate Professor',
      department: assignedDept,
      email: club.faculty_coordinator_email,
      cabin: `${assignedDept.split(' ')[0]} Block, Room 201`
    },
    next_meeting: {
      title: `${club.name} Regular Assembly & Strategy Session`,
      date: '2026-11-26',
      time: '04:30 PM - 05:45 PM',
      venue: club.meeting_info.split(',')[1]?.trim() || 'Central Activity Center',
      agenda: 'Project status review, upcoming competition delegation, and semester activity planning.',
      mode: 'In-Person' as const
    },
    flagship_events: [
      `${club.name} Annual Showcase`,
      `Inter-Collegiate ${club.category} Championship`,
      'Hands-on Masterclass & Workshop Series',
      'Campus Open Day Demonstration'
    ],
    council: [
      { name: club.student_coordinator, role: 'President / Student Lead', department: assignedDept, year: 'TE' as const, email: club.student_coordinator_email },
      { name: 'Aryan Shenvi', role: 'Vice President / Co-Lead', department: assignedDept, year: 'TE' as const },
      { name: 'Divya Gaonkar', role: 'Secretary & Documentation', department: 'Computer Engineering', year: 'SE' as const },
      { name: 'Prathamesh Naik', role: 'Events & Operations Lead', department: assignedDept, year: 'TE' as const },
      { name: 'Siddhi Borkar', role: 'Treasurer & Public Relations', department: 'Information Technology', year: 'SE' as const }
    ],
    council_history: [
      {
        academic_year: '2024-25',
        theme: 'Excellence & Inter-Departmental Collaboration',
        council: [
          { name: club.student_coordinator, role: 'President', department: assignedDept, year: 'TE' as const },
          { name: 'Aryan Shenvi', role: 'Vice President', department: assignedDept, year: 'TE' as const },
          { name: 'Divya Gaonkar', role: 'Secretary', department: 'Computer Engineering', year: 'SE' as const }
        ]
      },
      {
        academic_year: '2023-24',
        theme: 'State-Level Recognition & Campus Expansion',
        council: [
          { name: 'Nikhil Prabhu', role: 'President', department: assignedDept, year: 'BE' as const },
          { name: club.student_coordinator, role: 'Vice President', department: assignedDept, year: 'SE' as const },
          { name: 'Ananya Hegde', role: 'Secretary', department: assignedDept, year: 'TE' as const }
        ]
      },
      {
        academic_year: '2022-23',
        theme: 'Inaugural Expansion on Farmagudi Hill',
        council: [
          { name: 'Kavita Shet', role: 'President', department: assignedDept, year: 'BE' as const },
          { name: 'Nikhil Prabhu', role: 'Vice President', department: assignedDept, year: 'TE' as const }
        ]
      }
    ]
  };
});

export const INITIAL_EVENTS: Event[] = [
  {
    id: 'ev-01',
    club_id: 'club-01',
    title: 'CodeSprint 2026: 24-Hour Inter-Collegiate Hackathon',
    slug: 'codesprint-2026-hackathon',
    description: 'The flagship annual hackathon of GEC Coders Club. Solve real-world problem statements in AI, Web3, Smart Cities, and Healthcare. Mentorship from industry experts, free meals, cash prizes worth ₹60,000, and direct internship interviews.',
    event_category: 'Hackathon',
    event_date: '2026-12-05',
    start_time: '09:00',
    end_time: '09:00',
    venue: 'Central Computer Center (CCC) & Mech Seminar Hall',
    banner_url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200',
    registration_deadline: '2026-12-03T23:59:00Z',
    max_participants: 120,
    current_participants: 94,
    status: 'upcoming',
    is_published: true,
    created_at: '2026-11-01T10:00:00Z'
  },
  {
    id: 'ev-02',
    club_id: 'club-02',
    title: 'Robotics Workshop: ROS2 and Autonomous Mobile Robots',
    slug: 'robotics-workshop-ros2-autonomous-robots',
    description: 'Hands-on intensive bootcamp exploring Robot Operating System (ROS2), SLAM (Simultaneous Localization and Mapping), LiDAR sensors, and path planning algorithms on real 4-wheel differential drive robots.',
    event_category: 'Workshop',
    event_date: '2026-12-08',
    start_time: '14:00',
    end_time: '18:00',
    venue: 'Robotics & Mechatronics Lab, Electrical Dept',
    banner_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200',
    registration_deadline: '2026-12-06T18:00:00Z',
    max_participants: 50,
    current_participants: 48,
    status: 'upcoming',
    is_published: true,
    created_at: '2026-11-05T12:00:00Z'
  },
  {
    id: 'ev-03',
    club_id: 'club-03',
    title: 'GEC Quiz Championship: The Battle of Minds',
    slug: 'gec-quiz-championship-battle-of-minds',
    description: 'The biggest general quiz tournament of GEC. Rounds span Science & Tech, Goa Heritage & History, Pop Culture, Global Geopolitics, and Audio-Visual buzzer faceoffs. Open to all branches and years.',
    event_category: 'Competition',
    event_date: '2026-12-10',
    start_time: '15:30',
    end_time: '19:00',
    venue: 'Old Auditorium, Main Building',
    banner_url: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=1200',
    registration_deadline: '2026-12-09T20:00:00Z',
    max_participants: 80,
    current_participants: 62,
    status: 'upcoming',
    is_published: true,
    created_at: '2026-11-06T10:00:00Z'
  },
  {
    id: 'ev-04',
    club_id: 'club-07',
    title: 'Astronomy Night: Stargazing Jupiter & Saturn at Farmagudi',
    slug: 'astronomy-night-stargazing-jupiter-saturn',
    description: 'Join the GEC Astronomy Club atop the breezy Farmagudi hill. Using our 8-inch computerized Dobsonian telescope, we will observe Saturn rings, Jupiter Galilean moons, Orion Nebula, and learn astrophotography.',
    event_category: 'Seminar',
    event_date: '2026-12-12',
    start_time: '19:00',
    end_time: '23:00',
    venue: 'Mining Department Terrace & Open Lawn',
    banner_url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&q=80&w=1200',
    registration_deadline: '2026-12-11T18:00:00Z',
    max_participants: 150,
    current_participants: 110,
    status: 'upcoming',
    is_published: true,
    created_at: '2026-11-08T15:00:00Z'
  },
  {
    id: 'ev-05',
    club_id: 'club-04',
    title: 'AI Innovation Challenge: Building with Agentic LLMs',
    slug: 'ai-innovation-challenge-agentic-llms',
    description: 'Learn how to architect autonomous multi-agent workflows using modern AI tools and vector databases. Build a functioning prototype within 6 hours and compete for API credits and prizes.',
    event_category: 'Competition',
    event_date: '2026-12-14',
    start_time: '10:00',
    end_time: '17:00',
    venue: 'AI/ML Lab, IT Block 3rd Floor',
    banner_url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200',
    registration_deadline: '2026-12-13T12:00:00Z',
    max_participants: 60,
    current_participants: 55,
    status: 'upcoming',
    is_published: true,
    created_at: '2026-11-10T09:00:00Z'
  },
  {
    id: 'ev-06',
    club_id: 'club-06',
    title: 'Annual Drama Showcase: "Rangmanch 2026"',
    slug: 'annual-drama-showcase-rangmanch-2026',
    description: 'An evening of dramatic plays, musical street theatre, and classic Konkani satire performed by the talented student thespians of GEC Drama Club. Light snacks and coffee served.',
    event_category: 'Cultural Event',
    event_date: '2026-12-16',
    start_time: '17:30',
    end_time: '20:30',
    venue: 'Open Air Theatre (OAT)',
    banner_url: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&q=80&w=1200',
    registration_deadline: '2026-12-15T23:59:00Z',
    max_participants: 250,
    current_participants: 182,
    status: 'upcoming',
    is_published: true,
    created_at: '2026-11-12T14:00:00Z'
  },
  {
    id: 'ev-07',
    club_id: 'club-05',
    title: 'SoundWaves: Winter Acoustic Night & Jam Session',
    slug: 'soundwaves-winter-acoustic-night',
    description: 'Unplugged melodies, original indie compositions, retro Goan beats, and classic rock under the stars. Bring your guitars, cajons, or just your singing voice.',
    event_category: 'Cultural Event',
    event_date: '2026-12-18',
    start_time: '18:00',
    end_time: '21:30',
    venue: 'Banyan Tree Quadrangle, Civil Department',
    banner_url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=1200',
    registration_deadline: '2026-12-17T20:00:00Z',
    max_participants: 200,
    current_participants: 145,
    status: 'upcoming',
    is_published: true,
    created_at: '2026-11-14T11:00:00Z'
  },
  {
    id: 'ev-08',
    club_id: 'club-09',
    title: 'Kurukshetra 2026: Inter-Department Cricket Tournament',
    slug: 'kurukshetra-inter-department-cricket',
    description: 'The fiercest rivalry on campus! Comp, IT, ETC, Mech, Civil, Mining, and Electrical battle for the coveted GEC Rolling Sports Cup. 10-overs league format with live commentary.',
    event_category: 'Sports',
    event_date: '2026-12-20',
    start_time: '08:30',
    end_time: '17:30',
    venue: 'GEC Main Sports Ground',
    banner_url: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&q=80&w=1200',
    registration_deadline: '2026-12-18T18:00:00Z',
    max_participants: 120,
    current_participants: 120,
    status: 'upcoming',
    is_published: true,
    created_at: '2026-11-15T16:00:00Z'
  },
  {
    id: 'ev-09',
    club_id: 'club-08',
    title: 'Startup Pitch Fest: Farmagudi Angel Summit',
    slug: 'startup-pitch-fest-farmagudi-summit',
    description: 'Pitch your breakthrough tech innovation to angel investors from Goa and Bengaluru. Top 3 teams receive incubation space at GEC GSInC center and ₹2,00,000 prototype funding support.',
    event_category: 'Competition',
    event_date: '2026-12-22',
    start_time: '10:00',
    end_time: '16:00',
    venue: 'Mechanical Seminar Hall',
    banner_url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1200',
    registration_deadline: '2026-12-20T22:00:00Z',
    max_participants: 50,
    current_participants: 36,
    status: 'upcoming',
    is_published: true,
    created_at: '2026-11-16T10:00:00Z'
  },
  {
    id: 'ev-10',
    club_id: 'club-10',
    title: 'Rhythm 2026: Inter-Branch Western & Folk Dance Faceoff',
    slug: 'rhythm-dance-faceoff-2026',
    description: 'High-energy dance faceoff featuring solo, duet, and mega crew performances. Special exhibition performance by GEC Groove varsity team.',
    event_category: 'Cultural Event',
    event_date: '2026-12-24',
    start_time: '17:00',
    end_time: '21:00',
    venue: 'Open Air Theatre (OAT)',
    banner_url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=1200',
    registration_deadline: '2026-12-22T23:59:00Z',
    max_participants: 300,
    current_participants: 215,
    status: 'upcoming',
    is_published: true,
    created_at: '2026-11-17T11:00:00Z'
  },
  {
    id: 'ev-11',
    club_id: 'club-11',
    title: 'Campus Shutter: Macro & Nature Photowalk',
    slug: 'campus-shutter-photowalk',
    description: 'Explore the verdant monsoon and post-monsoon flora and fauna of Farmagudi. Master framing, shutter speed tricks, and macro lighting with award-winning alumni photographers.',
    event_category: 'Workshop',
    event_date: '2026-12-27',
    start_time: '07:30',
    end_time: '11:30',
    venue: 'Starts at College Main Porch',
    banner_url: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80&w=1200',
    registration_deadline: '2026-12-26T18:00:00Z',
    max_participants: 40,
    current_participants: 32,
    status: 'upcoming',
    is_published: true,
    created_at: '2026-11-18T10:00:00Z'
  },
  {
    id: 'ev-12',
    club_id: 'club-12',
    title: 'LitFest Debate: Parliamentary Model of Democracy',
    slug: 'litfest-parliamentary-debate',
    description: 'Debate motions concerning AI ethics, state economy, global climate action, and digital privacy in a competitive Oxford-style debating format.',
    event_category: 'Competition',
    event_date: '2026-12-29',
    start_time: '14:30',
    end_time: '18:00',
    venue: 'Library Seminar Room',
    banner_url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=1200',
    registration_deadline: '2026-12-28T20:00:00Z',
    max_participants: 48,
    current_participants: 40,
    status: 'upcoming',
    is_published: true,
    created_at: '2026-11-18T14:00:00Z'
  },
  {
    id: 'ev-13',
    club_id: 'club-13',
    title: 'IEEE TechSymposium: 5G/6G & Edge Computing in India',
    slug: 'ieee-techsymposium-5g-6g-edge',
    description: 'Distinguished lecture by leading IEEE Fellows and telecom architects on emerging 6G radio frequencies, edge intelligence, and career pathways in hardware and VLSI design.',
    event_category: 'Seminar',
    event_date: '2027-01-05',
    start_time: '11:00',
    end_time: '14:00',
    venue: 'ETC Seminar Hall',
    banner_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200',
    registration_deadline: '2027-01-04T18:00:00Z',
    max_participants: 100,
    current_participants: 78,
    status: 'upcoming',
    is_published: true,
    created_at: '2026-11-19T09:00:00Z'
  },
  {
    id: 'ev-14',
    club_id: 'club-16',
    title: 'Green Campus: Farmagudi Hill Plantation Drive',
    slug: 'green-campus-plantation-drive',
    description: 'Help plant 300 endemic Goan fruit and flowering trees along the slope behind Mining Department. Gardening tools and saplings provided. Free eco-badge and certificate for volunteers.',
    event_category: 'Social and Community',
    event_date: '2027-01-08',
    start_time: '08:00',
    end_time: '12:00',
    venue: 'Behind Mining Dept Campus Hill',
    banner_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200',
    registration_deadline: '2027-01-07T18:00:00Z',
    max_participants: 100,
    current_participants: 86,
    status: 'upcoming',
    is_published: true,
    created_at: '2026-11-19T11:00:00Z'
  },
  {
    id: 'ev-15',
    club_id: 'club-01',
    title: 'Web3 & Cloud Native Hands-on Bootcamp',
    slug: 'web3-cloud-native-bootcamp',
    description: 'Deploy microservices with Docker, Kubernetes, and explore decentralized storage contracts with IPFS. Free cloud credits given to all registered attendees.',
    event_category: 'Workshop',
    event_date: '2027-01-12',
    start_time: '14:00',
    end_time: '17:30',
    venue: 'Central Computer Center (CCC) Lab 1',
    banner_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200',
    registration_deadline: '2027-01-11T20:00:00Z',
    max_participants: 60,
    current_participants: 58,
    status: 'upcoming',
    is_published: true,
    created_at: '2026-11-20T10:00:00Z'
  },
  {
    id: 'ev-16',
    club_id: 'club-02',
    title: 'RoboSoccer Championship: Autonomous Bot Arena',
    slug: 'robosoccer-championship-arena',
    description: 'Two teams, one arena, zero human remotes! Watch custom bots locate the ball using computer vision and score goals in our high-octane autonomous tournament.',
    event_category: 'Competition',
    event_date: '2027-01-15',
    start_time: '15:00',
    end_time: '18:30',
    venue: 'Gymkhana Indoor Badminton Court',
    banner_url: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&q=80&w=1200',
    registration_deadline: '2027-01-14T18:00:00Z',
    max_participants: 120,
    current_participants: 110,
    status: 'upcoming',
    is_published: true,
    created_at: '2026-11-20T12:00:00Z'
  },
  {
    id: 'ev-17',
    club_id: 'club-15',
    title: 'Spectrum 2027: Annual National Technical & Cultural Fest',
    slug: 'spectrum-2027-annual-fest',
    description: 'The premier college festival of Goa! 3 days of battle of the bands, pro-nites, hackathons, robotics arenas, gaming LANs, street plays, and cultural extravaganzas with 6000+ students.',
    event_category: 'Fest',
    event_date: '2027-02-18',
    start_time: '09:00',
    end_time: '23:00',
    venue: 'GEC Campus Grounds & Open Air Theatre',
    banner_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1200',
    registration_deadline: '2027-02-15T23:59:00Z',
    max_participants: 1000,
    current_participants: 640,
    status: 'upcoming',
    is_published: true,
    created_at: '2026-11-21T09:00:00Z'
  },
  {
    id: 'ev-18',
    club_id: 'club-09',
    title: 'Inter-Department Badminton & Table Tennis Tournament',
    slug: 'inter-department-badminton-table-tennis',
    description: 'Singles and doubles knockout tournament for boys and girls across all engineering streams. Trophies and college sports kit for champions.',
    event_category: 'Sports',
    event_date: '2027-01-20',
    start_time: '16:00',
    end_time: '20:00',
    venue: 'Student Activity Center Indoor Courts',
    banner_url: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=1200',
    registration_deadline: '2027-01-19T18:00:00Z',
    max_participants: 64,
    current_participants: 45,
    status: 'upcoming',
    is_published: true,
    created_at: '2026-11-21T11:00:00Z'
  },
  {
    id: 'ev-19',
    club_id: 'club-14',
    title: 'Financial Modeling & Venture Valuation Masterclass',
    slug: 'financial-modeling-venture-valuation',
    description: 'Learn cap tables, unit economics, discounting cash flows, and how VC funds evaluate early stage engineering ventures. Led by fintech founder alumni.',
    event_category: 'Seminar',
    event_date: '2027-01-23',
    start_time: '14:00',
    end_time: '17:00',
    venue: 'Mechanical Dept Seminar Hall',
    banner_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
    registration_deadline: '2027-01-22T20:00:00Z',
    max_participants: 75,
    current_participants: 60,
    status: 'upcoming',
    is_published: true,
    created_at: '2026-11-21T13:00:00Z'
  },
  {
    id: 'ev-20',
    club_id: 'club-01',
    title: 'Freshers Orientation & Git/GitHub Onboarding 2026',
    slug: 'freshers-orientation-git-github',
    description: 'Welcoming First-Year (FE) students to the developer community! Set up Git, make your first commit, collaborate on issues, and build your developer portfolio.',
    event_category: 'Orientation',
    event_date: '2026-10-15',
    start_time: '15:00',
    end_time: '17:30',
    venue: 'Central Computer Center (CCC) Lab 3',
    banner_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200',
    registration_deadline: '2026-10-14T18:00:00Z',
    max_participants: 90,
    current_participants: 90,
    status: 'completed',
    is_published: true,
    created_at: '2026-10-01T10:00:00Z'
  }
];

export const INITIAL_MEMBERSHIPS: ClubMembership[] = [
  {
    id: 'mem-01',
    user_id: 'usr-student-01',
    club_id: 'club-01', // GEC Coders Club
    membership_status: 'approved',
    role_in_club: 'member',
    joined_at: '2024-08-10T12:00:00Z'
  },
  {
    id: 'mem-02',
    user_id: 'usr-student-01',
    club_id: 'club-02', // ARM Robotics
    membership_status: 'approved',
    role_in_club: 'member',
    joined_at: '2024-08-15T14:30:00Z'
  },
  {
    id: 'mem-03',
    user_id: 'usr-student-01',
    club_id: 'club-03', // Quiz Club
    membership_status: 'pending',
    role_in_club: 'member',
    joined_at: '2024-11-10T09:15:00Z'
  },
  {
    id: 'mem-04',
    user_id: 'usr-student-02',
    club_id: 'club-01',
    membership_status: 'approved',
    role_in_club: 'core_team',
    joined_at: '2024-03-01T10:00:00Z'
  },
  {
    id: 'mem-05',
    user_id: 'usr-student-02',
    club_id: 'club-10', // Dance Club
    membership_status: 'approved',
    role_in_club: 'core_team',
    joined_at: '2024-02-14T11:00:00Z'
  },
  {
    id: 'mem-06',
    user_id: 'usr-student-03',
    club_id: 'club-09', // Sports Club
    membership_status: 'approved',
    role_in_club: 'lead',
    joined_at: '2023-08-01T08:00:00Z'
  },
  {
    id: 'mem-07',
    user_id: 'usr-student-03',
    club_id: 'club-01',
    membership_status: 'pending',
    role_in_club: 'member',
    joined_at: '2024-11-18T16:45:00Z'
  }
];

export const INITIAL_REGISTRATIONS: EventRegistration[] = [
  {
    id: 'reg-01',
    event_id: 'ev-01', // CodeSprint
    user_id: 'usr-student-01',
    registration_status: 'confirmed',
    registered_at: '2026-11-02T11:20:00Z'
  },
  {
    id: 'reg-02',
    event_id: 'ev-02', // Robotics Workshop
    user_id: 'usr-student-01',
    registration_status: 'confirmed',
    registered_at: '2026-11-06T15:00:00Z'
  },
  {
    id: 'reg-03',
    event_id: 'ev-04', // Astronomy Night
    user_id: 'usr-student-01',
    registration_status: 'confirmed',
    registered_at: '2026-11-09T18:30:00Z'
  },
  {
    id: 'reg-04',
    event_id: 'ev-01',
    user_id: 'usr-student-02',
    registration_status: 'confirmed',
    registered_at: '2026-11-03T10:00:00Z'
  },
  {
    id: 'reg-05',
    event_id: 'ev-10',
    user_id: 'usr-student-02',
    registration_status: 'confirmed',
    registered_at: '2026-11-18T12:00:00Z'
  },
  {
    id: 'reg-06',
    event_id: 'ev-08',
    user_id: 'usr-student-03',
    registration_status: 'confirmed',
    registered_at: '2026-11-16T17:00:00Z'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-01',
    user_id: 'usr-student-01',
    title: 'Registration Confirmed: CodeSprint 2026',
    message: 'You have successfully registered for CodeSprint 2026: 24-Hour Inter-Collegiate Hackathon. Venue: Central Computer Center.',
    type: 'event',
    is_read: false,
    created_at: '2026-11-02T11:20:00Z',
    link: '/events/codesprint-2026-hackathon'
  },
  {
    id: 'notif-02',
    user_id: 'usr-student-01',
    title: 'Membership Approved!',
    message: 'Your membership request for ARM Robotics Club has been approved by the coordinator.',
    type: 'membership',
    is_read: false,
    created_at: '2026-08-16T10:00:00Z',
    link: '/clubs/arm-robotics-club'
  },
  {
    id: 'notif-03',
    user_id: 'usr-coord-01',
    title: 'New Membership Request',
    message: 'Aditya Dessai (22ME034) applied to join GEC Coders Club.',
    type: 'membership',
    is_read: false,
    created_at: '2026-11-18T16:45:00Z',
    link: '/club-dashboard'
  },
  {
    id: 'notif-04',
    user_id: 'usr-admin-01',
    title: 'New Event Published',
    message: 'ARM Robotics Club created new event: RoboSoccer Championship 2027.',
    type: 'event',
    is_read: true,
    created_at: '2026-11-20T12:05:00Z',
    link: '/admin'
  }
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'act-01',
    user_id: 'usr-coord-01',
    user_name: 'Sanket Prabhu',
    action: 'CREATED_EVENT',
    entity_type: 'event',
    entity_id: 'ev-01',
    details: 'Created event CodeSprint 2026: 24-Hour Inter-Collegiate Hackathon',
    created_at: '2026-11-01T10:00:00Z'
  },
  {
    id: 'act-02',
    user_id: 'usr-student-01',
    user_name: 'Rohan Fernandes',
    action: 'REGISTERED_EVENT',
    entity_type: 'registration',
    entity_id: 'reg-01',
    details: 'Registered for CodeSprint 2026',
    created_at: '2026-11-02T11:20:00Z'
  },
  {
    id: 'act-03',
    user_id: 'usr-coord-01',
    user_name: 'Sanket Prabhu',
    action: 'APPROVED_MEMBER',
    entity_type: 'membership',
    entity_id: 'mem-01',
    details: 'Approved Rohan Fernandes membership to GEC Coders Club',
    created_at: '2024-08-11T09:30:00Z'
  },
  {
    id: 'act-04',
    user_id: 'usr-admin-01',
    user_name: 'Dr. Rajeshwari Sawant',
    action: 'ACTIVATED_CLUB',
    entity_type: 'club',
    entity_id: 'club-16',
    details: 'Activated Environmental Club for academic year 2026-27',
    created_at: '2024-01-11T10:00:00Z'
  }
];
