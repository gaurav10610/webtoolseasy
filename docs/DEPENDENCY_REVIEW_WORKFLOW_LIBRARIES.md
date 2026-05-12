# Dependency Review for Workflow-related Libraries (TB-175)

## Objective

Review recently introduced workflow-focused libraries and utilities for maintenance and risk posture.

## Reviewed Dependencies (package.json)

- next, react, react-dom
- jose
- uuid
- @mui/\*
- vitest
- playwright
- tsx

## Review Summary

1. Critical framework stack (next/react/react-dom)

- Versions are aligned and modern.
- Keep synchronized minor updates to avoid runtime mismatch.

2. Security-sensitive utility (jose)

- Appropriate for token/signature workflows.
- Keep pinned within tested compatibility range.

3. Identifier generation (uuid)

- Current major version is acceptable.
- Ensure all IDs are non-sensitive and not used as auth secrets.

4. Test/runtime tooling

- Vitest and Playwright versions are compatible with current Node 22 baseline.

## Workflow Feature Libraries Added in Recent Batches

- Local-first submission/moderation utilities
- Retry/memory/cache/queue management utilities
- Embed configuration and security header helpers
- Recipe link signing utility (node:crypto)

These additions use mostly built-in runtime capabilities and internal modules, minimizing external supply-chain expansion.

## Risk Controls

1. Continue lockfile review in PRs.
2. Run npm audit in CI (non-blocking first, then gated for high severity).
3. Prefer built-in platform crypto and browser APIs over additional packages when feasible.
4. Re-run dependency review when adding auth/sync provider SDKs.
