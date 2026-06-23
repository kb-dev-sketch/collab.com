const axios = require('axios');

const githubClient = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github+json',
    ...(process.env.GITHUB_TOKEN
      ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
      : {})
  },
  timeout: 10000
});

async function fetchGithubProfile(username) {
  try {
    const { data } = await githubClient.get(`/users/${encodeURIComponent(username)}`);
    return data;
  } catch (error) {
    if (error.response?.status === 404) {
      const notFoundError = new Error('GitHub user not found');
      notFoundError.statusCode = 404;
      throw notFoundError;
    }

    if (error.response?.status === 403) {
      const rateLimitError = new Error('GitHub API rate limit exceeded. Add GITHUB_TOKEN in .env and try again.');
      rateLimitError.statusCode = 429;
      throw rateLimitError;
    }

    throw error;
  }
}

async function fetchUserRepositories(username) {
  const repos = [];
  let page = 1;
  const perPage = 100;

  while (page <= 3) {
    const { data } = await githubClient.get(`/users/${encodeURIComponent(username)}/repos`, {
      params: {
        per_page: perPage,
        page,
        sort: 'updated',
        direction: 'desc'
      }
    });

    repos.push(...data);

    if (data.length < perPage) {
      break;
    }

    page += 1;
  }

  return repos;
}

module.exports = {
  fetchGithubProfile,
  fetchUserRepositories
};
