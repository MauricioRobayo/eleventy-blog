import Cache from './cache';
import rawPortfolio from './__mocks__/gitconnectedMockData';
import apiDataParser from './apiDataParser';

const portfolio = apiDataParser(rawPortfolio);
const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
const localStorageKey = 'test';

const storeMock = (function () {
  const store = {};
  return {
    getItem(key: string) {
      return store[key];
    },
    setItem(key: string, value: any) {
      store[key] = value;
    },
  };
})();

getItemSpy.mockImplementation(storeMock.getItem);
setItemSpy.mockImplementation(storeMock.setItem);

afterEach(() => {
  getItemSpy.mockClear();
  setItemSpy.mockClear();
});

describe('Cache', () => {
  it('should return null not updated', () => {
    const cache = new Cache(localStorageKey, 15);
    expect(cache.get()).toBe(null);
    expect(getItemSpy).toBeCalledTimes(1);
    expect(getItemSpy).toBeCalledWith(localStorageKey);
  });

  it('should update the cache', () => {
    const cache = new Cache('test', 15);
    cache.update(portfolio);
    expect(setItemSpy).toBeCalledTimes(1);
    const { portfolio: cachedPortfolio, expiration } = cache.get();
    expect(cachedPortfolio).toEqual(portfolio);
    expect(expiration).toBeGreaterThan(Date.now());
    expect(getItemSpy).toBeCalledTimes(1);
  });

  it('should return null not updated', () => {
    const cache = new Cache('test', -15);
    cache.update(portfolio);
    expect(setItemSpy).toBeCalledTimes(1);
    expect(cache.get()).toBe(null);
    expect(getItemSpy).toBeCalledTimes(1);
  });
});
