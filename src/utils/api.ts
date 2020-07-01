import { Portfolio, FetchError } from '../types';

class Api {
  constructor(private url: string) {}

  async fetch(): Promise<Portfolio | FetchError> {
    try {
      const response = await fetch(this.url);

      if (response.ok) {
        return response.json();
      }

      return { error: response.statusText };
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default Api;
