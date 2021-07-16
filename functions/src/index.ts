import * as functions from "firebase-functions";
import { Octokit } from "@octokit/rest";
import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();
const octokit = new Octokit({
  auth: functions.config().github.public_repos_token,
});
const CACHE_EXPIRATION_PERIOD = 24 * 60 * 60 * 1000;
const sortTypes = ["stars", "forks", "help-wanted-issues", "updated"] as const;
type SortType = typeof sortTypes[number];

export const repos = functions.https.onRequest(async (req, res) => {
  const { sort = "updated", limit = 5 } = req.query;

  if (!isSortType(sort)) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `sort must be one of type ${sortTypes}.`
    );
  }

  const docRef = db.collection("cache").doc("repos");
  const cached = await docRef.get();

  if (
    cached.updateTime &&
    cached.updateTime.toMillis() > Date.now() - CACHE_EXPIRATION_PERIOD
  ) {
    functions.logger.log(
      `Cache hit! Updated time ${cached.updateTime.toDate()}`
    );
    res.json(cached.data()?.repos);
    return;
  }

  const { data } = await octokit.rest.search.repos({
    q: "user:MauricioRobayo",
    sort,
    per_page: Number(limit),
  });

  const repos = data.items.map((repo) => ({
    name: repo.name,
    html_url: repo.html_url,
    description: repo.description,
    stargazers_count: repo.stargazers_count,
    language: repo.language,
  }));

  await docRef.set({ repos });

  functions.logger.log("Cache miss!");
  res.json(repos);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isSortType(sortType: any): sortType is SortType {
  return sortTypes.includes(sortType);
}
