import { Portfolio as PortfolioType } from './types';

interface Cache {
  portfolio: PortfolioType;
  expiration: number;
}

class Portfolio {
  private url = 'https://gitconnected.com/v1/portfolio/mauriciorobayo';
  private cacheDurationInMilliseconds: number;

  constructor(cacheDurationInMinutes: number) {
    this.cacheDurationInMilliseconds = cacheDurationInMinutes * 60 * 1000;
  }

  getCache(): Cache | undefined {
    const data = localStorage.getItem('portfolio');

    if (!data) {
      return;
    }

    const cache = JSON.parse(data);

    if (Date.now() > cache.expiration) {
      return;
    }

    return cache;
  }

  setCache(data: Cache) {
    localStorage.setItem('portfolio', JSON.stringify(data));
  }

  async getPortfolio(): Promise<PortfolioType> {
    const cache = this.getCache();

    if (cache) {
      return cache.portfolio;
    }

    const response = await fetch(this.url);
    if (response.ok) {
      const portfolio = await response.json();

      this.setCache({
        portfolio,
        expiration: Date.now() + this.cacheDurationInMilliseconds,
      });

      return portfolio;
    }
    throw new Error(response.statusText);
  }
}

export default Portfolio;
