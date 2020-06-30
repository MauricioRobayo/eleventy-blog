import { FetchError, Portfolio } from '../types';

class Api {
  constructor(private url: string) {}

  async fetch(): Promise<Portfolio | FetchError> {
    const response = await fetch(this.url);

    if (response.ok) {
      return response.json();
    }

    return { error: response.statusText };
  }
}

export default Api;
