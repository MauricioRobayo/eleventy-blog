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