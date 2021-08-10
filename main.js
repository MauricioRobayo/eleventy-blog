import Loader from "./modules/Loader.js";
import Projects from "./modules/Projects.js";
import ReposApi from "./modules/ReposApi.js";
import Cache from "./modules/Cache.js";

const recentProjectsCache = new Cache("recent-projects");
const popularProjectsCache = new Cache("popular-projects");
const recentProjectsApi = new ReposApi({
  cache: recentProjectsCache,
  query: {
    sort: "updated",
  },
});
const popularProjectsApi = new ReposApi({
  cache: popularProjectsCache,
  query: {
    sort: "stars",
  },
});
const recentProjects = new Projects({
  container: document.getElementById("recent-projects"),
  api: recentProjectsApi,
  metaFields: ["language", "updated_at"],
  loader: new Loader(),
});
const popularProjects = new Projects({
  container: document.getElementById("starred-projects"),
  api: popularProjectsApi,
  metaFields: ["language", "stargazers_count"],
  loader: new Loader(),
});

recentProjects.load();
popularProjects.load();
