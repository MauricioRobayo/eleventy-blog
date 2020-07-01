import portfolio from './gitconnectedMockData';
import { Portfolio } from '../../types';

class Api {
  constructor(private url: string) {}

  async fetch(): Promise<Portfolio> {
    if (this.url === 'https://gitconnected.com/v1/portfolio/mauriciorobayo') {
      return portfolio;
    }

    throw new Error('Error test');
  }
}

export default Api;
