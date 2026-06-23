# GitHub Profile Analyzer API

Backend service built with Node.js, Express.js, MySQL, and the GitHub public API. It analyzes a GitHub user profile, stores useful insights in MySQL, and exposes APIs to read saved analysis results.

## Features

- Fetch public GitHub profile data by username.
- Analyze useful profile insights:
  - Public repository count
  - Followers and following count
  - Public gists
  - Top repository language
  - Total stars and forks
  - Average stars per fetched repository
  - Most starred repository
- Store or update analysis results in MySQL.
- Fetch all stored analyzed profiles.
- Fetch one stored profile by username.
- Optional `GITHUB_TOKEN` support for better GitHub API rate limits.

## Tech Stack

- Node.js
- Express.js
- MySQL
- GitHub REST API

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/` | API information |
| GET | `/health` | Health check |
| POST | `/api/profiles/analyze` | Analyze and save a GitHub profile |
| GET | `/api/profiles` | Fetch all saved analyzed profiles |
| GET | `/api/profiles/:username` | Fetch one saved analyzed profile |

## Setup Instructions

1. Install dependencies:

```bash
npm install
```

2. Create the MySQL database and table:

```bash
mysql -u root -p < database/schema.sql
```

3. Create `.env` from the example:

```bash
cp .env.example .env
```

4. Update `.env` with your MySQL credentials:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=github_profile_analyzer
GITHUB_TOKEN=
```

5. Start the server:

```bash
npm run dev
```

For production:

```bash
npm start
```

## Example Requests

### Analyze Profile

```http
POST /api/profiles/analyze
Content-Type: application/json

{
  "username": "octocat"
}
```

### Fetch All Profiles

```http
GET /api/profiles
```

### Fetch Single Profile

```http
GET /api/profiles/octocat
```

## Submission Details

- GitHub repository link: `Add your GitHub repository URL here`
- Live deployed API URL: `Add your deployed API URL here`
- Database schema/export: [`database/schema.sql`](database/schema.sql)
- Postman collection: [`postman/GitHub_Profile_Analyzer_API.postman_collection.json`](postman/GitHub_Profile_Analyzer_API.postman_collection.json)

## Deployment Notes

When deploying, configure the same environment variables from `.env.example` in your hosting provider. Use a hosted MySQL service and set `DB_HOST`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` accordingly.
