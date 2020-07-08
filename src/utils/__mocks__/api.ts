import portfolio from './gitconnectedMockData';
import { RawPortfolio } from '../../types';

class Api {
  constructor(private url: string) {}

  async fetch(): Promise<RawPortfolio> {
    if (this.url === 'https://gitconnected.com/v1/portfolio/mauriciorobayo') {
      return portfolio;
    }

    throw new Error('Error test');
  }
}

export default Api;
