const { pool } = require('../config/database');
const { fetchGithubProfile, fetchUserRepositories } = require('./githubService');

function getTopLanguage(repositories) {
  const counts = repositories.reduce((acc, repo) => {
    if (repo.language) {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
    }
    return acc;
  }, {});

  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
}

function buildInsights(githubProfile, repositories) {
  const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repositories.reduce((sum, repo) => sum + repo.forks_count, 0);
  const mostStarredRepo = repositories
    .slice()
    .sort((a, b) => b.stargazers_count - a.stargazers_count)[0];

  return {
    github_id: githubProfile.id,
    username: githubProfile.login,
    name: githubProfile.name,
    avatar_url: githubProfile.avatar_url,
    profile_url: githubProfile.html_url,
    bio: githubProfile.bio,
    company: githubProfile.company,
    location: githubProfile.location,
    blog: githubProfile.blog,
    public_repos: githubProfile.public_repos,
    public_gists: githubProfile.public_gists,
    followers: githubProfile.followers,
    following: githubProfile.following,
    account_created_at: githubProfile.created_at ? new Date(githubProfile.created_at) : null,
    github_updated_at: githubProfile.updated_at ? new Date(githubProfile.updated_at) : null,
    top_language: getTopLanguage(repositories),
    total_stars: totalStars,
    total_forks: totalForks,
    average_stars: repositories.length ? Number((totalStars / repositories.length).toFixed(2)) : 0,
    most_starred_repo: mostStarredRepo?.name || null,
    most_starred_repo_url: mostStarredRepo?.html_url || null
  };
}

async function saveProfileAnalysis(profile) {
  await pool.query(
    `
      INSERT INTO analyzed_profiles (
        github_id, username, name, avatar_url, profile_url, bio, company, location, blog,
        public_repos, public_gists, followers, following, account_created_at, github_updated_at,
        top_language, total_stars, total_forks, average_stars, most_starred_repo,
        most_starred_repo_url, last_analyzed_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        avatar_url = VALUES(avatar_url),
        profile_url = VALUES(profile_url),
        bio = VALUES(bio),
        company = VALUES(company),
        location = VALUES(location),
        blog = VALUES(blog),
        public_repos = VALUES(public_repos),
        public_gists = VALUES(public_gists),
        followers = VALUES(followers),
        following = VALUES(following),
        account_created_at = VALUES(account_created_at),
        github_updated_at = VALUES(github_updated_at),
        top_language = VALUES(top_language),
        total_stars = VALUES(total_stars),
        total_forks = VALUES(total_forks),
        average_stars = VALUES(average_stars),
        most_starred_repo = VALUES(most_starred_repo),
        most_starred_repo_url = VALUES(most_starred_repo_url),
        last_analyzed_at = NOW()
    `,
    [
      profile.github_id,
      profile.username,
      profile.name,
      profile.avatar_url,
      profile.profile_url,
      profile.bio,
      profile.company,
      profile.location,
      profile.blog,
      profile.public_repos,
      profile.public_gists,
      profile.followers,
      profile.following,
      profile.account_created_at,
      profile.github_updated_at,
      profile.top_language,
      profile.total_stars,
      profile.total_forks,
      profile.average_stars,
      profile.most_starred_repo,
      profile.most_starred_repo_url
    ]
  );

  return getProfileByUsername(profile.username);
}

async function analyzeAndSaveProfile(username) {
  const [githubProfile, repositories] = await Promise.all([
    fetchGithubProfile(username),
    fetchUserRepositories(username)
  ]);

  const insights = buildInsights(githubProfile, repositories);
  return saveProfileAnalysis(insights);
}

async function getAllProfiles() {
  const [rows] = await pool.query(`
    SELECT *
    FROM analyzed_profiles
    ORDER BY last_analyzed_at DESC
  `);

  return rows;
}

async function getProfileByUsername(username) {
  const [rows] = await pool.query(
    `
      SELECT *
      FROM analyzed_profiles
      WHERE username = ?
      LIMIT 1
    `,
    [username]
  );

  return rows[0] || null;
}

module.exports = {
  analyzeAndSaveProfile,
  getAllProfiles,
  getProfileByUsername
};
