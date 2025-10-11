# WebToolsEasy

A collection of small web utilities and developer tools built with Next.js and TypeScript.

This repository powers the webapps at https://webtoolseasy.com and includes a set of tools (editors, converters, formatters) plus scripts to generate screenshots, index pages, and share links to social platforms.

## Highlights

- Next.js (app router) + TypeScript
- Multiple small tools in `src/tools/`
- Scripts for indexing, sitemap updates, and social sharing in `scripts/`

## Quickstart (development)

1. Install dependencies

   npm install

2. Create environment files

   Copy `.env.development` or create your own `.env.local` with keys listed below. Do NOT commit real secrets.

3. Start dev server

   npm run dev

## Environment variables

- PRODUCTION - true/false
- HOSTNAME - base site URL
- FFMPEG_BASE_URL - static URL for ffmpeg core
- ADSENSE_PUBLISHER_ID - if using Adsense

## Secrets and credentials

This repository previously contained a Google service account JSON. Do NOT commit service account JSONs or private keys. Instead:

- Use platform-specific secret storage (GitHub Actions secrets, Vercel Environment Variables).
- Keep a local `.env.local` or use OS-level secret managers.

If you accidentally commit secrets

1. Remove the secret file and add patterns to `.gitignore`.
2. Purge sensitive data from git history using one of:
   - git filter-repo (recommended)
   - BFG Repo-Cleaner

Example reference:
- Remove file and rewrite history: `git filter-repo --path path/to/secrets.json --invert-paths`

## How to contribute

See `CONTRIBUTING.md` for contribution guidelines.

## License

This project is available under the MIT License - see `LICENSE`.
