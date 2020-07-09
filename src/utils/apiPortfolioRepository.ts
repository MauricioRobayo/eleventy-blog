import Cache from './cache';
import Api from './api';
import { Portfolio, FetchError } from '../types';

class ApiPortfolioRepository {
  constructor(private cache: Cache<Portfolio>, private api: Api<Portfolio>) {}

  async get(): Promise<Portfolio | FetchError> {
    const cache = this.cache.get();

    if (cache) {
      return cache.data;
    }

    const data = await this.api.fetch();

    if (!('error' in data)) {
      this.cache.update(data);
    }

    return data;
  }
}

export default ApiPortfolioRepository;
