class Loader {
  #interval;
  constructor() {
    this.ref = document.createElement("span");
    this.ref.classList.add("repo-loader");
  }

  start() {
    const loaderSymbols = ["\\", "|", "/", "—"];
    let i = 0;
    this.ref.textContent = loaderSymbols[i % loaderSymbols.length];
    this.#interval = setInterval(() => {
      console.log("ticking");
      i += 1;
      this.ref.textContent = loaderSymbols[i % loaderSymbols.length];
    }, 500);
  }

  stop(textContent = "") {
    clearInterval(this.#interval);
    this.ref.textContent = textContent;
  }
}

class Cache {
  constructor(key) {
    this.key = key;
  }

  get() {
    const cache = JSON.parse(localStorage.getItem(this.key));
    if (cache?.expirationTime > Date.now()) {
      return cache;
    }

    return null;
  }

  set(data, expiration = 60 * 60 * 1000) {
    localStorage.setItem(
      this.key,
      JSON.stringify({
        data,
        expirationTime: Date.now() + expiration,
      })
    );
  }
}

class Project {
  constructor(containerId, sort, metaFields, limit = 3) {
    this.container = document.getElementById(containerId);
    this.sort = sort;
    this.metaFields = metaFields;
    this.limit = limit;
    this.loader = new Loader();
  }

  async load() {
    const url = `https://api.github.com/search/repositories?q=user:MauricioRobayo&sort=${this.sort}&per_page=${this.limit}`;
    const header = createHeader(url, this.loader);
    this.container.append(header);

    this.loader.start();

    const data = await fetchRepos({
      url,
      cache: new Cache(`${this.sort}-${this.limit}`),
    });

    if (data.error) {
      this.loader.stop("✗");

      this.container.classList.add("error");
      this.container.append(data.message);
    } else {
      this.loader.stop("✔");

      if (data.cacheHit) {
        const cacheStatus = createCacheStatus(data.expirationTime);
        header.append(cacheStatus);
      } else {
        const rateLimit = createRateLimit(data.rateLimit);
        header.append(...rateLimit);
      }

      const body = createBody();
      const repos = createRepos({
        container: body,
        repos: data.repos,
        metaFields: this.metaFields
      });
      body.append(...repos);
      this.container.append(body);
    }
  }
}

function createRateLimit(rateLimit) {
  return rateLimit.map((info) => {
    const p = document.createElement("p");
    p.textContent = info.join(": ");
    return p;
  });
}

function createHeader(url, loader) {
  const header = document.createElement("header");
  const title = document.createElement("h2");
  const link = document.createElement("a");
  link.href = url;
  link.textContent = url;
  title.append(loader.ref, "Fetching ", link);
  header.append(title);

  return header;
}

function createBody() {
  const projectsBody = document.createElement("div");
  projectsBody.classList.add("projects-body");

  return projectsBody;
}

function createCacheStatus(expirationTime) {
  const container = document.createElement("div");
  container.innerHTML = `
      <p>Cache hit!</p>
      <p>Expires: ${expirationTime}</p>
    `;
  return container;
}

function createRepos({ container, repos, metaFields }) {
  return repos.map(
    ({
      name,
      description,
      html_url,
      language,
      stargazers_count,
      updated_at,
    }) => {
      const repoContainer = document.createElement("div");
      const allMetaFields = { language, stargazers_count, updated_at };
      repoContainer.innerHTML = `
          <div class="repo-header">
            <h4>${name}</h4>
            ${createMeta(
        Object.fromEntries(
          Object.entries(allMetaFields).filter(([key]) =>
            metaFields.includes(key)
          )
        )
      )}
          </div>
          <div class="repo-body">
            <p>${description || ""}</p>
            <p><a href="${html_url}">${html_url}</p>
          </div>
        `;
      return repoContainer;
    }
  );
}

function createMeta(meta) {
  const rtf = new Intl.RelativeTimeFormat("en", { style: "narrow" });

  return Object.entries(meta)
    .map(([key, value]) => {
      if (key === "updated_at") {
        const updatedDate = new Date(value);
        const millisecondsDiff = updatedDate.getTime() - Date.now();
        const daysDiff = Math.floor(
          millisecondsDiff / 1000 / 60 / 60 / 24
        );
        const relativeTime = rtf.format(daysDiff, "day");
        return `<span class="meta">updated ${relativeTime}</span>`;
      }
      if (key === "stargazers_count") {
        return `<span class="meta">${value} stars</span>`;
      }
      return `<span class="meta">${value}</span>`;
    })
    .join("");
}

async function fetchRepos({ url, cache }) {
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

/**
 *  Main
 */

new Project("recent-projects", "updated", ["language", "updated_at"])
  .load()

new Project("starred-projects", "stars", ["language", "stargazers_count"])
  .load()
