export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;      
  endDate?: string;        
  technologies: string[];
  achievements: string[];
  link?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  link?: string;
}

export interface Publication {
  id: string;
  title: string;
  venue: string;
  link: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: string[];
}

export interface NavItem {
  href: string;
  label: string;
}