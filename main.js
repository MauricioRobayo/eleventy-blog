import Loader from "./modules/Loader.js";
import Projects from "./modules/Projects.js";

const recentProjects = new Projects({
  container: document.getElementById("recent-projects"),
  sort: "updated",
  metaFields: ["language", "updated_at"],
  loader: new Loader(),
});
const popularProjects = new Projects({
  container: document.getElementById("starred-projects"),
  sort: "stars",
  metaFields: ["language", "stargazers_count"],
  loader: new Loader(),
});

recentProjects.load();
popularProjects.load();
