import { CacheItem, Portfolio } from '../types';

class Cache {
  constructor(private key: string, private durationInMinutes: number) {}

  get(): CacheItem | null {
    const cache = localStorage.getItem(this.key);
    if (!cache) {
      return null;
    }

    const parsedCache = JSON.parse(cache);

    if (Date.now > parsedCache.expiration) {
      return null;
    }

    return parsedCache;
  }

  update(portfolio: Portfolio): void {
    const durationInMilliseconds = this.durationInMinutes * 60 * 1000;
    localStorage.setItem(
      this.key,
      JSON.stringify({
        portfolio,
        expiration: Date.now() + durationInMilliseconds,
      })
    );
  }
}

export default Cache;
