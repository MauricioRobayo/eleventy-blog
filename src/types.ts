export interface PortfolioData {
  basics: Basics;
  projects?: Project[];
}

export interface Basics {
  name?: string;
  website?: string;
  profiles?: Profile[];
  headline?: string;
  summary?: string;
  email?: string;
}

export interface Profile {
  network: string;
  url: string;
  username: string;
}

export interface Project {
  name: string;
  displayName: string;
  summary: string;
  website: string;
  githubUrl: string;
  primaryLanguage: string;
  languages: string[];
}

export interface Page {
  name: PageName;
  url: string;
}

export type PageName = 'About' | 'Projects' | 'Contact' | 'Blog';
