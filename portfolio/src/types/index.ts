// src/types/index.ts

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  github?: string;
  liveDemo?: string;
  featured: boolean;
  category: 'blockchain' | 'frontend' | 'fullstack';
}

export interface Skill {
  category: string;
  skills: string[];
  proficiency: number;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  badgeUrl: string;
  credlyUrl: string;
  category: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string[];
  technologies: string[];
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal?: string;
  conference?: string;
  year: string;
  doi?: string;
  pdfUrl?: string;
  abstract: string;
  keywords: string[];
  status: 'published' | 'under-review' | 'preprint';
}