import { FetchError } from '../types';

class Api<T> {
  constructor(private url: string) {}

  async fetch(): Promise<T | FetchError> {
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
