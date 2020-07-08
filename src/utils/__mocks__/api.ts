import portfolio from './gitconnectedMockData';
import { RawPortfolio, FetchError } from '../../types';

class Api {
  constructor(private url: string) {}

  async fetch(): Promise<RawPortfolio | FetchError> {
    if (this.url === 'https://gitconnected.com/v1/portfolio/mauriciorobayo') {
      return portfolio;
    }

    return { error: 'Test error' };
  }
}

export default Api;
