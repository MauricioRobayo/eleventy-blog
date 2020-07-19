import SLSC from 'simple-localstorage-cache';
import Api from './api';
import { Portfolio, FetchError } from '../types';

class ApiPortfolioRepository {
  constructor(private cache: SLSC<Portfolio>, private api: Api<Portfolio>) {}

  async get(): Promise<Portfolio | FetchError> {
    const cached = this.cache.get();

    if (cached) {
      return cached.data;
    }

    const data = await this.api.fetch();

    if (!('error' in data)) {
      this.cache.update(data);
    }

    return data;
  }
}

export default ApiPortfolioRepository;
