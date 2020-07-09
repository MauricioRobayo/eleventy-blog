import { RawPortfolio } from '../../types';

const portfolio: RawPortfolio = {
  basics: {
    name: 'Mauricio Robayo',
    headline:
      'Building for the web is my passion. Constantly learning and getting better.',
    summary:
      'I enjoy refactoring code and value simplicity.\nWriting clean and maintainable code and automating workflows are my main goals every day.\nI am an active open source contributor and work every day to improve my programming skills.',
    website: 'https://www.mauriciorobayo.com',
    blog: 'https://blog.mauriciorobayo.com',
    email: 'hi@mauriciorobayo.com',
    profiles: [
      {
        network: 'GitHub',
        username: 'MauricioRobayo',
        url: 'https://github.com/MauricioRobayo',
      },
      {
        network: 'LinkedIn',
        url: 'https://www.linkedin.com/in/mauriciorobayo/',
        username: 'mauriciorobayo',
      },
      {
        network: 'Twitter',
        url: 'https://twitter.com/mauriciorobayo_',
        username: 'mauriciorobayo_',
      },
    ],
  },
  projects: [
    {
      name: 'api-key-proxy-server',
      displayName: 'api-key-proxy-server',
      summary:
        'A dead easy proxy server to remove the API keys from your front-end code',
      website: '',
      githubUrl: 'https://github.com/MauricioRobayo/api-key-proxy-server',
      primaryLanguage: 'JavaScript',
      languages: ['JavaScript'],
    },
    {
      name: 'twitterize',
      displayName: 'twitterize',
      summary:
        'Generate OAuth 1.0a authorization header for Twitter API using native https nodejs module',
      website: '',
      githubUrl: 'https://github.com/MauricioRobayo/twitterize',
      primaryLanguage: 'JavaScript',
      languages: ['JavaScript'],
    },
    {
      name: 'pascua',
      displayName: 'pascua',
      summary:
        'Lightweight and dependency-free module to get Colombian holidays',
      website: 'https://www.mauriciorobayo.com/colombian-holidays',
      githubUrl: 'https://github.com/MauricioRobayo/pascua',
      primaryLanguage: 'JavaScript',
      languages: ['JavaScript'],
    },
    {
      name: 'pr-reviewers',
      displayName: 'pr-reviewers',
      summary:
        'Simple interface to get a GitHub Pull Request reviewers list using GitHub API',
      website: 'https://www.mauriciorobayo.com/pr-reviewers',
      githubUrl: 'https://github.com/MauricioRobayo/pr-reviewers',
      primaryLanguage: 'JavaScript',
      languages: ['JavaScript', 'HTML', 'CSS'],
    },
    {
      name: 'microvot',
      displayName: 'microvot',
      summary: 'Spreading the word about Microverse',
      website: 'https://twitter.com/microvot',
      githubUrl: 'https://github.com/MauricioRobayo/microvot',
      primaryLanguage: 'JavaScript',
      languages: ['JavaScript'],
    },
    {
      name: 'colombian-holidays',
      displayName: 'colombian-holidays',
      summary: 'React app to get Colombian holidays for any given date',
      website: 'https://www.mauriciorobayo.com/colombian-holidays',
      githubUrl: 'https://github.com/MauricioRobayo/colombian-holidays',
      primaryLanguage: 'JavaScript',
      languages: ['HTML', 'JavaScript'],
    },
    {
      name: 'tasa-representativa-del-mercado',
      displayName: 'tasa-representativa-del-mercado',
      summary:
        'Sitio web para consultar la Tasa Representativa del Mercado en Colombia',
      website: 'https://www.mauriciorobayo.com/tasa-representativa-del-mercado',
      githubUrl:
        'https://github.com/MauricioRobayo/tasa-representativa-del-mercado',
      primaryLanguage: 'JavaScript',
      languages: ['JavaScript', 'HTML'],
    },
    {
      name: 'restaurant-page',
      displayName: 'restaurant-page',
      summary:
        'Single-page application pulling random content from different sources to dynamically render a restaurant page',
      website: 'https://www.mauriciorobayo.com/restaurant-page',
      githubUrl: 'https://github.com/MauricioRobayo/restaurant-page',
      primaryLanguage: 'JavaScript',
      languages: ['HTML', 'JavaScript', 'CSS'],
    },
  ],
};

export default portfolio;
