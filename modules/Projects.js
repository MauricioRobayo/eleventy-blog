export default class Projects {
  #api;
  #container;
  #loader;
  #metaFields;
  constructor({ api, container, loader, metaFields }) {
    this.#api = api;
    this.#container = container;
    this.#loader = loader;
    this.#metaFields = metaFields;
  }

  async load() {
    const header = Projects.createHeader(this.#api.url, this.#loader);

    this.#container.append(header);
    this.#loader.start();

    const data = await this.#api.fetch();

    if (data.error) {
      this.#loader.stop("✗");

      this.#container.classList.add("error");
      this.#container.append(data.message);
    } else {
      this.#loader.stop("✔");

      if (data.cacheHit) {
        const cacheStatus = Projects.createCacheStatus(data.expirationTime);
        header.append(cacheStatus);
      } else {
        const rateLimit = Projects.createRateLimit(data.rateLimit);
        header.append(...rateLimit);
      }

      const body = Projects.createBody();
      const repos = Projects.createRepos({
        container: body,
        repos: data.repos,
        metaFields: this.#metaFields,
      });
      body.append(...repos);
      this.#container.append(body);
    }
  }

  static createRateLimit(rateLimit) {
    return rateLimit.map((info) => {
      const p = document.createElement("p");
      p.textContent = info.join(": ");
      return p;
    });
  }

  static createHeader(url, loader) {
    const header = document.createElement("header");
    const title = document.createElement("h2");
    const link = document.createElement("a");
    link.href = url;
    link.textContent = url;
    title.append(loader.ref, "Fetching ", link);
    header.append(title);

    return header;
  }

  static createBody() {
    const projectsBody = document.createElement("div");
    projectsBody.classList.add("projects-body");

    return projectsBody;
  }

  static createCacheStatus(expirationTime) {
    const container = document.createElement("div");
    container.innerHTML = `
      <p>Cache hit!</p>
      <p>Expires: ${expirationTime}</p>
    `;
    return container;
  }

  static createRepos({ repos, metaFields }) {
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
            ${Projects.createMeta(
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

  static createMeta(meta) {
    const rtf = new Intl.RelativeTimeFormat("en", { style: "narrow" });

    return Object.entries(meta)
      .map(([key, value]) => {
        if (key === "updated_at") {
          const updatedDate = new Date(value);
          const millisecondsDiff = updatedDate.getTime() - Date.now();
          const daysDiff = Math.floor(millisecondsDiff / 1000 / 60 / 60 / 24);
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
}
