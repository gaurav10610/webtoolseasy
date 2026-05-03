# Open Source Release Checklist

Use this checklist before every public release.

## Security and Secrets

- [x] No real credentials or private keys committed.
- [x] Environment files are ignored by default (`.env`, `.env.*`) except `.env.example`.
- [x] Indexing script reads secrets from environment variables.
- [ ] Run a final pre-release secret scan.
- [ ] If any secret was ever committed, rotate it and clean git history if needed.

## Documentation Quality

- [x] README clearly explains purpose, setup, scripts, and contribution flow.
- [x] README includes links to live site, tools, and blog.
- [x] Governance docs exist (`CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`).
- [x] License file exists and is linked.
- [ ] Keep tool counts and feature claims synchronized with the codebase.

## SEO Readiness for the Open Source Repo

- [x] README includes product keywords naturally (online tools, JSON, PDF, image, SEO tools).
- [x] README points to canonical live URLs and core landing pages.
- [x] Public sitemap and robots directives are present in `public/`.
- [ ] Keep sitemap refreshed whenever tools/pages are added.

## Engineering Quality

- [ ] Run lint and tests before release.
- [ ] Build production bundle successfully.
- [ ] Confirm no broken internal docs links.

## Recommended Pre-Release Commands

```bash
npm run lint
npm run test
npm run build
```

## Notes for Maintainers

- Place local/private values only in `.env.local`.
- For CI and deployments, use your platform secret manager.
- If you expose an IndexNow key publicly (allowed by the protocol), keep it intentional and documented.
