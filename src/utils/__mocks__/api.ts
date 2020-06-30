import portfolio from './gitconnectedMockData';
import { Portfolio, FetchError } from '../../types';

class Api {
  constructor(private url: string) {}

  async fetch(): Promise<Portfolio | FetchError> {
    if (this.url === 'https://gitconnected.com/v1/portfolio/mauriciorobayo') {
      return portfolio;
    }

    return { error: 'Error test' };
  }
}

export default Api;
