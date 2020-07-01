import { Portfolio } from '../types';

class Api {
  constructor(private url: string) {}

  async fetch(): Promise<Portfolio> {
    const response = await fetch(this.url);

    if (response.ok) {
      return response.json();
    }

    throw new Error(response.statusText);
  }
}

export default Api;
