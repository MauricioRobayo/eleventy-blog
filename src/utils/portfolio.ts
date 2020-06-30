import { PortfolioData } from '../types';

interface Cache {
  portfolio: PortfolioData;
  expiration: number;
}

class Portfolio {
  private cacheDurationInMilliseconds: number;

  constructor(private url: string, cacheDurationInMinutes: number) {
    this.cacheDurationInMilliseconds = cacheDurationInMinutes * 60 * 1000;
  }

  private getCache(): Cache | undefined {
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

  private setCache(data: Cache) {
    localStorage.setItem('portfolio', JSON.stringify(data));
  }

  async getPortfolio(): Promise<PortfolioData | null> {
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
    return null;
  }
}

export default Portfolio;
