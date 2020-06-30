import Cache from './cache';
import Api from './api';
import { Portfolio, FetchError } from '../types';

class ApiPortfolioRepository {
  constructor(private cache: Cache, private api: Api) {}

  async get(): Promise<Portfolio | FetchError> {
    const cache = this.cache.get();

    if (cache) {
      return cache.portfolio;
    }

    const portfolio = await this.api.fetch();

    if (!('error' in portfolio)) {
      this.cache.update(portfolio);
    }

    return portfolio;
  }
}

export default ApiPortfolioRepository;
