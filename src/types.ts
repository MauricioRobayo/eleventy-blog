export interface Portfolio {
  basics: Basics;
  projects?: Project[];
}

export interface Basics {
  name: string;
  website: string;
  profiles?: Profile[];
  summary?: string;
}

export interface Profile {
  network: string;
  username: string;
  url: string;
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
