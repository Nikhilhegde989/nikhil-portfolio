import type { Experience, Project, Certification, Publication, SkillCategory, NavItem } from '../types';

export const navItems: NavItem[] = [
  { href: '#home', label: 'Home' },
  { href: '#talk', label: 'Talk' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#publications', label: 'Research' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' }
];

export const experiences: Experience[] = [
  {
    id: 'stryv',
    company: 'Stryv.ai',
    role: 'Software Engineer',
    location: "Hyderabad",
    startDate: "2024-08-01",
    endDate: undefined,
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Redis', 'Kafka', 'WebSockets', 'Azure', 'LangChain'],
    achievements: [
      'Recognized with the Key Contributor Award for impactful contributions to backend systems',
      'Designed and implemented a supply-chain scoring engine to compute order-level business metrics from complex business rules',
      'Built an agent-based AI chatbot for a hospitality platform to automate customer support workflows',
      'Built a real-time user-facing event streaming system using Kafka and WebSockets to surface live process updates in the UI',
      'Reduced database load and improved API latency through Redis caching, async design, and PostgreSQL query optimization',
      'Migrated legacy .NET modules into FastAPI-based microservices, improving maintainability and system performance'
    ],
    link: 'https://www.stryv.ai'
  },
  {
    id: 'ganglia',
    company: 'Ganglia Technologies',
    role: 'Software Engineer Intern',
    location: "Manipal", 
    startDate: "2024-01-01",
    endDate: "2024-07-31",
    technologies: ['Python', 'LLMs', 'RAG', 'Node.js', 'Express', 'React', 'MongoDB'],
    achievements: [
      'Built a voice-to-form pipeline for hospital workflows: transcribed doctor narrations, used LLMs to extract key patient data, and auto-populated UI forms, cutting manual entry time for medical staff',
      'Designed and implemented backend APIs for a livestock marketplace, supporting product listings, search, filtering, and transaction workflows',
      'Implemented scalable RESTful APIs using Node.js, Python and MongoDB'
    ],
    link: 'https://ganglia.in'
  }
];

export const projects: Project[] = [
  {
    id: 'bookaride',
    title: 'Book A Ride',
    description: 'Full-stack ride-booking platform with real-time location tracking, JWT auth, Razorpay integration, WebSocket-based notifications, and location-aware ride matching using MongoDB geospatial queries.',
    tech: ['Node.js', 'MongoDB', 'WebSockets', 'JWT', 'Razorpay'],
    link: 'https://bookaride.nikhilhegde.com/'
  },
  {
    id: 'inspireai',
    title: 'InspireAI',
    description: 'Social media platform featuring deep learning for comment toxicity detection. Includes secure password hashing, image compression, pagination, post uploads, pin saving, and user follow/explore functionalities.',
    tech: ['React', 'Node.js', 'Deep Learning', 'MongoDB'],
    link: 'https://inspire-ai-ac32e65a4699.herokuapp.com/'
  },
  {
    id: 'livetrack',
    title: 'LiveTrack Pro',
    description: 'Real-time location tracker like Swiggy/Zomato/Whatsapp Live Location, built with WebSockets and Node.js. Integrated with Google Analytics for insights.',
    tech: ['Node.js', 'WebSockets', 'Google Analytics', 'Real-time Systems'],
    link: 'https://live-location-tracker-2e27c51954fc.herokuapp.com/'
  },
  {
    id: 'hotstar',
    title: 'Hotstar Clone',
    description: 'Interactive image and video sliders replicating the Hotstar homepage experience.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://nikhilhegde989.github.io/hotstarclone/'
  },
  {
    id: 'runsync',
    title: 'Run Sync (Android)',
    description: 'Cricket scoring manager with seamless score tracking and player stat visualization with graphs.',
    tech: ['Android XML', 'Java', 'SQL']
  }
];

export const certifications: Certification[] = [
  {
    id: '1',
    title: 'NodeJS Internals and Architecture',
    issuer: 'Hussein Nasser (Udemy)',
    link: 'https://www.udemy.com/certificate/UC-59a1cca5-cc55-4470-a828-057c2a515225/'
  },
  {
    id: '2',
    title: 'AWS Cloud Technical Essentials',
    issuer: 'Amazon Web Services (AWS)',
    link: 'https://www.coursera.org/account/accomplishments/verify/3MLROC94C95Y'
  },
  {
    id: '3',
    title: 'Machine Learning',
    issuer: 'Internshala Trainings',
    link: 'https://www.linkedin.com/in/nikhilhegde989/details/certifications/'
  },
  {
    id: '4',
    title: 'Complete Intro to React',
    issuer: 'Frontend Masters'
  }
];

export const publications: Publication[] = [
  {
    id: '1',
    title: 'Analyzing AI Regulation Through Literature and Current Trends',
    venue: 'Journal of Open Innovation (Scopus Q1, Top 1%)',
    link: 'https://www.sciencedirect.com/science/article/pii/S2199853125000435'
  },
  {
    id: '2',
    title: 'Hospital-Acquired Infection Management with AI',
    venue: 'International Conference on iDEAAS 2024',
    link: 'https://www.riverpublishers.com/research_article_details.php?book_id=1442&cid=7'
  },
  {
    id: '3',
    title: 'Diabetic Retinopathy Classification via Activation Function Optimization',
    venue: 'SIGMAA-2023, Springer Nature',
    link: 'https://link.springer.com/chapter/10.1007/978-981-97-6352-8_39'
  }
];

export const skillCategories: SkillCategory[] = [
  {
    id: 'backend',
    title: 'Backend & APIs',
    icon: 'Code2',
    skills: ['Python', 'Node.js', 'FastAPI', 'Express', 'REST APIs', 'WebSockets', 'SQLAlchemy']
  },
  {
    id: 'database',
    title: 'Databases & Caching',
    icon: 'Database',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Kafka', 'Vector DBs']
  },
  {
    id: 'ai',
    title: 'AI & ML',
    icon: 'Brain',
    skills: ['LLMs', 'RAG', 'LangChain', 'LangGraph', 'ML Fundamentals']
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    icon: 'Cloud',
    skills: ['AWS', 'Azure', 'GCP', 'Docker', 'Git']
  }
];

export const additionalSkills = ['React', 'Redux', 'Firebase', 'C++', 'Java'];