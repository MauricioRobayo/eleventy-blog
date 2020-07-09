import ApiPortfolioRepository from './apiPortfolioRepository';
import Cache from './cache';
import Api from './api';
import rawPortfolio from './__mocks__/gitconnectedMockData';
import { Portfolio } from '../types';

jest.mock('./api');

describe('ApiPortfolioRepository', () => {
  it('should return a fetch error', async () => {
    const cache = new Cache<Portfolio>('portfolio', 15);
    const api = new Api('https://wrong-url');

    const apiPortfolioRepository = new ApiPortfolioRepository(cache, api);

    const portfolio = await apiPortfolioRepository.get();

    expect(portfolio).toEqual({ error: 'Test error' });
  });

  it('should return the portfolio', async () => {
    const cache = new Cache<Portfolio>('portfolio', 15);
    const api = new Api('https://gitconnected.com/v1/portfolio/mauriciorobayo');

    const apiPortfolioRepository = new ApiPortfolioRepository(cache, api);

    const portfolio = await apiPortfolioRepository.get();
    expect(portfolio).toEqual(rawPortfolio);

    const cachedPortfolio = await apiPortfolioRepository.get();
    expect(cachedPortfolio).toEqual(rawPortfolio);
  });
});
