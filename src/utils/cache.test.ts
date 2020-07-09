import Cache from './cache';
import rawPortfolio from './__mocks__/gitconnectedMockData';
import apiDataParser from './apiDataParser';

describe('Cache', () => {
  const portfolio = apiDataParser(rawPortfolio);
  it('should return null not updated', () => {
    const cache = new Cache('test', 15);
    expect(cache.get()).toBe(null);
  });

  it('should update the cache', () => {
    const cache = new Cache('test', 15);
    cache.update(portfolio);
    const { portfolio: cachedPortfolio, expiration } = cache.get();
    expect(cachedPortfolio).toEqual(portfolio);
    expect(expiration).toBeGreaterThan(Date.now());
  });
  it('should return null not updated', () => {
    const cache = new Cache('test', -15);
    cache.update(portfolio);
    expect(cache.get()).toBe(null);
  });
});
