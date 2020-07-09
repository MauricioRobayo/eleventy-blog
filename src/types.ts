type Partial<T> = {
  [P in keyof T]?: T[P];
};

export interface CacheItem<T> {
  data: T;
  expiration: number;
}

export interface FetchError {
  error: string;
}

export interface Portfolio {
  owner: Owner;
  projects: Project[];
}

export type PartialPortfolio = Partial<Portfolio>;

export type RawPortfolio = PartialPortfolio & { basics: Portfolio['owner'] };

export interface Owner {
  name: string;
  website: string;
  profiles: Profile[];
  headline: string;
  summary: string;
  email: string;
  blog: string;
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
  url?: string;
}

export type PageName = 'About' | 'Projects' | 'Contact' | 'Blog';
