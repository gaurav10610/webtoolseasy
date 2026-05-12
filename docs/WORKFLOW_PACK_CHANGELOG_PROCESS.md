# Workflow Pack Changelog Process (TB-179)

## Purpose

Define a consistent changelog process for major workflow pack updates so release context is clear to users and maintainers.

## When to Add Changelog Entries

Add an entry whenever a workflow pack has:

- Breaking behavior changes.
- New or removed steps.
- Input/output contract changes.
- Security/privacy-impacting behavior updates.

## Entry Template

```md
## YYYY-MM-DD | workflow-slug | vX.Y.Z

- Type: major|minor|patch
- Summary: one-line release summary
- Added:
  - ...
- Changed:
  - ...
- Removed:
  - ...
- Migration Notes:
  - ...
- Validation:
  - tests/build/perf checks run
```

## Semver Guidance

- Major: backward-incompatible pack behavior.
- Minor: backward-compatible feature additions.
- Patch: bug fixes and small adjustments.

## Process

1. Draft changelog during implementation PR.
2. Validate examples and migration notes before merge.
3. Link changelog entry in release PR description.
4. Publish changelog with pack release.

## Quality Gate

Release is blocked if:

- Major update has no migration note.
- Contract changes are undocumented.
- Validation section is missing.
