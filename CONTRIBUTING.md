# Contributing to WebToolsEasy

Thanks for helping improve WebToolsEasy — a privacy-first, local-only developer tools hub.

## Open Source Scope

- This repository is the canonical open-source codebase for WebToolsEasy.
- The canonical product URL is [https://webtoolseasy.com](https://webtoolseasy.com).
- When discussing features in docs or PRs, avoid speculative wording and only describe behavior that exists in the current code.

## Ways to Contribute

- Report bugs.
- Improve accessibility, performance, and SEO.
- Add or improve tests (unit and end-to-end).
- Add new developer tools.
- Add new Specialist Views to DevLens (see [Adding a DevLens View](docs/ADDING_A_DEVLENS_VIEW.md)).
- Improve existing tool UX, documentation, or metadata.

## Development Setup

1. Fork and clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Create local env file:

```bash
cp .env.example .env.local
```

4. Start local dev server:

```bash
npm run dev
```

The app starts at [http://localhost:3000](http://localhost:3000). No database is required.

## Branch and Commit Guidelines

- Use focused branches, for example: `feat/new-tool-name` or `fix/tool-route-bug`.
- Keep commits small and descriptive.
- Reference issues when possible.

## Quality Checklist for Pull Requests

Before opening a PR, run:

```bash
npm run lint
npm run test
npm run build
```

PRs should include:

- Clear summary of what changed and why.
- Screenshots or short recordings for UI changes.
- Notes about any SEO-impacting changes (title, description, canonical paths, schema, sitemap).

## Documentation and Linking Guidelines

- Keep README and docs technically accurate and synchronized with shipped behavior.
- If you publish tutorials, blog posts, or videos about this project, prefer linking to canonical pages:
  - [https://webtoolseasy.com](https://webtoolseasy.com)
  - Individual tool pages (e.g., `https://webtoolseasy.com/tools/jwt-debugger`)
  - Mock API pages (e.g., `https://webtoolseasy.com/mock-api/ecommerce-products`)

## Tool Contribution Expectations

- Keep tool metadata accurate and user-focused.
- **Privacy First**: Ensure all processing happens locally in the browser (zero-trust architecture). No raw payload uploads.
- **No Watermarks**: Tool outputs should be clean and free of branding watermarks.
- **Documentation**: Provide a detailed explanation for users on what their input actually means, not just a decoded output.
- Follow the guidelines in the specific contributing files in `docs/`.

## Code Style

- Use TypeScript where applicable.
- Follow existing project structure and naming patterns.
- Avoid unrelated refactors in feature PRs.

## Issue Reporting

Please include:

- Expected behavior
- Actual behavior
- Steps to reproduce
- Browser and OS information
- Screenshots if relevant

## Security

Do not disclose vulnerabilities publicly. Please follow the process in [SECURITY.md](SECURITY.md).
