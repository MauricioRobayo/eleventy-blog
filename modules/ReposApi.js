export default class ReposApi {
  #url;
  constructor({ cache, query }) {
    this.cache = cache;
    const searchParams = new URLSearchParams({
      ...query,
      per_page: 3,
      q: "user:MauricioRobayo",
    });
    this.#url = `https://api.github.com/search/repositories?${searchParams}`;
  }

  async fetch() {
    const cachedData = this.cache.get();
    if (cachedData) {
      return {
        cacheHit: true,
        expirationTime: cachedData.expirationTime,
        repos: cachedData.data,
      };
    }

    const response = await fetch(this.url, {
      headers: {
        accept: "application/vnd.github.v3+json",
      },
    });
    const data = await response.json();

    if (!response.ok) {
      return {
        error: response.status,
        message: data.message || response.statusText || "",
      };
    }

    const repos = data.items;

    this.cache.set(repos);

    return {
      cacheHit: false,
      repos,
    };
  }

  get url() {
    return decodeURIComponent(this.#url);
  }
}
