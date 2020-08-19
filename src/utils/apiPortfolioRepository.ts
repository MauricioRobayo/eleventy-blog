import Cache from 'simple-storage-cache';
import Api from './api';
import apiDataParser from './apiDataParser';
import { Portfolio, FetchError } from '../types';

class ApiPortfolioRepository {
  constructor(private cache: Cache<Portfolio>, private api: Api<Portfolio>) {}

  async get(): Promise<Portfolio | FetchError> {
    const cached = this.cache.get();

    if (cached) {
      return cached.data;
    }

    const data = await this.api.fetch();

    if ('basics' in data) {
      const parsedData = apiDataParser(data);
      this.cache.update(parsedData);
      return parsedData;
    }

    return data;
  }
}

export default ApiPortfolioRepository;
