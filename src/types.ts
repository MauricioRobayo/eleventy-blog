export interface Basics {
  name: string;
  website: string;
  profiles?: Profile[];
}

export interface Profile {
  network: string;
  username: string;
  url: string;
}