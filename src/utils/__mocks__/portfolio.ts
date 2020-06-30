import { PortfolioData } from '../../types';
import gitconnectedMockData from './gitconnectedMockData';

interface Cache {
  portfolio: PortfolioData;
  expiration: number;
}

class Portfolio {
  private cacheDurationInMilliseconds: number;

  constructor(private url: string, cacheDurationInMinutes: number) {
    this.cacheDurationInMilliseconds = cacheDurationInMinutes * 60 * 1000;
  }

  async getPortfolio(): Promise<PortfolioData | null> {
    if (this.url === 'https://gitconnected.com/v1/portfolio/mauriciorobayo') {
      return gitconnectedMockData;
    }
    return null;
  }
}

export default Portfolio;
