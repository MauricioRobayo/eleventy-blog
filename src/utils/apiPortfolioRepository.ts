import Cache from './cache';
import Api from './api';
import { Portfolio } from '../types';

class ApiPortfolioRepository {
  constructor(private cache: Cache, private api: Api) {}

  async get(): Promise<Portfolio> {
    const cache = this.cache.get();

    if (cache) {
      return cache.portfolio;
    }

    const portfolio = await this.api.fetch();

    return portfolio;
  }
}

export default ApiPortfolioRepository;
