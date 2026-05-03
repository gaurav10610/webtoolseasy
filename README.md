# WebToolsEasy

Open source platform for privacy-first browser tools at [webtoolseasy.com](https://webtoolseasy.com).

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-blue)](https://www.typescriptlang.org/)

WebToolsEasy offers 110+ free online tools for developers, creators, students, and teams. Tools run primarily in-browser so users can work with JSON, PDF, images, video, text, and SEO data quickly with a privacy-first experience.

## Live Product

- Website: [https://webtoolseasy.com](https://webtoolseasy.com)
- Blog: [https://webtoolseasy.com/blog](https://webtoolseasy.com/blog)

## Why This Project Exists

- Give people fast, free alternatives to install-heavy utility software.
- Ship practical tools that solve real daily workflow problems.
- Keep privacy strong by default with local/browser-first processing where possible.
- Build SEO-friendly tool pages and educational blog content that help users discover solutions via search.

## Core Features

- 110+ tools across development, media, text, finance, utility, and SEO workflows.
- SEO-focused page architecture: canonical URLs, structured metadata, sitemap, robots directives.
- Mobile-friendly and desktop-friendly UI.
- Strong test coverage for page behavior and metadata integrity.
- Fully open source under MIT.

## Popular Tools (Examples)

- JSON Formatter: [https://webtoolseasy.com/tools/json-formatter](https://webtoolseasy.com/tools/json-formatter)
- Image Compressor: [https://webtoolseasy.com/tools/image-compress](https://webtoolseasy.com/tools/image-compress)
- PDF Editor: [https://webtoolseasy.com/tools/pdf-editor](https://webtoolseasy.com/tools/pdf-editor)
- Password Generator: [https://webtoolseasy.com/tools/password-generator](https://webtoolseasy.com/tools/password-generator)
- Meta Tag Generator: [https://webtoolseasy.com/tools/meta-tag-generator](https://webtoolseasy.com/tools/meta-tag-generator)
- Robots.txt Generator: [https://webtoolseasy.com/tools/robots-txt-generator](https://webtoolseasy.com/tools/robots-txt-generator)

## Technology Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Material UI
- Vitest + Playwright
- Web APIs and WebAssembly tooling for browser-side processing

## Quick Start

### Prerequisites

- Node.js 22.x
- npm 10+

### Setup

1. Clone this repository.

```bash
git clone https://github.com/gaurav10610/webtoolseasy.git
cd webtoolseasy
```

2. Install dependencies.

```bash
npm install
```

3. Create local environment file.

```bash
cp .env.example .env.local
```

4. Run development server.

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

The repository intentionally does not contain real secrets.

Use `.env.local` (gitignored) and configure as needed:

```env
HOSTNAME=http://localhost:3000
SCREENSHOTS_BASE_URL=/screenshots
GA_CODE=G-XXXXXXX
ADSENSE_PUBLISHER_ID=ca-pub-xxxxxxxxxxxxxxxx

# Optional indexing integrations
INDEXNOW_API_KEY=your-indexnow-key
INDEXNOW_HOST=webtoolseasy.com
GOOGLE_SERVICE_ACCOUNT_PATH=/absolute/path/to/google-service-account.json
# or
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test:unit
npm run test:e2e
npm run test
npm run update:sitemap
npm run index:urls
npm run index:urls:all
npm run generate:screenshots
```

## Open Source Guidelines

- Contribution guide: [CONTRIBUTING.md](CONTRIBUTING.md)
- Security policy: [SECURITY.md](SECURITY.md)
- Code of conduct: [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- License: [LICENSE](LICENSE)

## SEO and Growth Notes

This repository supports growth of the live service by making quality transparent:

- Public code increases trust for users and technical reviewers.
- Better documentation helps contributors ship pages/features faster.
- Consistent metadata and sitemap updates improve discoverability.
- Open source contributions can expand long-tail keyword coverage through new tools and content improvements.

## How to Contribute

1. Pick an issue or propose one.
2. Fork and create a branch.
3. Add or improve a tool, UX, tests, or docs.
4. Run quality checks: `npm run lint && npm run test`.
5. Open a PR with clear context and screenshots for UI changes.

## Maintainer

Gaurav Kumar Yadav

- GitHub: [https://github.com/gaurav10610](https://github.com/gaurav10610)
- LinkedIn: [https://www.linkedin.com/in/gaurav-kumar-yadav-6125817a/](https://www.linkedin.com/in/gaurav-kumar-yadav-6125817a/)
