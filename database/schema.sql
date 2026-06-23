CREATE DATABASE IF NOT EXISTS github_profile_analyzer;

USE github_profile_analyzer;

CREATE TABLE IF NOT EXISTS analyzed_profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  github_id BIGINT NOT NULL UNIQUE,
  username VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(255),
  avatar_url VARCHAR(500),
  profile_url VARCHAR(500),
  bio TEXT,
  company VARCHAR(255),
  location VARCHAR(255),
  blog VARCHAR(500),
  public_repos INT DEFAULT 0,
  public_gists INT DEFAULT 0,
  followers INT DEFAULT 0,
  following INT DEFAULT 0,
  account_created_at DATETIME,
  github_updated_at DATETIME,
  top_language VARCHAR(100),
  total_stars INT DEFAULT 0,
  total_forks INT DEFAULT 0,
  average_stars DECIMAL(10, 2) DEFAULT 0,
  most_starred_repo VARCHAR(255),
  most_starred_repo_url VARCHAR(500),
  last_analyzed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_username (username),
  INDEX idx_followers (followers),
  INDEX idx_public_repos (public_repos)
);
