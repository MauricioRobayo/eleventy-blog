import { Portfolio } from '../types';

function apiDataParser({ basics, projects }: any): Portfolio {
  return {
    owner: basics,
    projects,
  };
}

export default apiDataParser;
