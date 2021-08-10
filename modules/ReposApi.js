export default async function fetchRepos({ url, cache }) {
  const cachedData = cache.get();
  if (cachedData) {
    return {
      cacheHit: true,
      expirationTime: cachedData.expirationTime,
      repos: cachedData.data,
    };
  }

  const response = await fetch(url, {
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

  cache.set(repos);

  return {
    cacheHit: false,
    rateLimit: [...response.headers].filter(([key]) =>
      key.startsWith("x-ratelimit")
    ),
    repos,
  };
}
