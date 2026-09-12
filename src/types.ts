export interface ProjectArchitecture {
  frontend?: string;
  backend?: string;
  database?: string;
  infrastructure?: string;
}

export interface ProjectViewImage {
  url: string;
  title: string;
  caption?: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  featured: boolean;
  tier?: 'primary' | 'secondary' | 'enterprise' | 'other';
  category?: string;
  overview?: string;
  problem: string;
  solution: string;
  role?: string;
  myContribution?: string[];
  architecture?: ProjectArchitecture;
  architectureDetails: string[];
  technicalHighlights?: string[];
  challenges?: string[];
  outcome?: string[];
  results?: string[];
  techStack: string[];
  imageUrl?: string;
  imageAlt?: string;
  galleryImages?: ProjectViewImage[];
  architectureTag?: string;
  links?: {
    github?: string;
    npm?: string;
    live?: string;
    caseStudy?: string;
  };
  cliCommand?: string;
}

export interface WorkRole {
  role: string;
  company: string;
  period: string;
  current?: boolean;
  summary: string;
  responsibilities: string[];
  achievements?: string[];
}

export interface StackCategory {
  category: string;
  items: string[];
}

export interface ColorToken {
  name: string;
  hex: string;
  usage: string;
}

export interface WhatIDoItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  points: string[];
}

export interface ProfileInfo {
  name: string;
  shortName: string;
  title: string;
  heroDescription: string;
  location: string;
  status: string;
  timezone: string;
  currentRole: string;
  teamScope: string;
  email: string;
  github: string;
  linkedin: string;
  aboutIntro: string;
  buildingPhilosophy: string;
}
