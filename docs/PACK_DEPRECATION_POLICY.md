# Workflow Pack Deprecation and Redirect Policy (TB-183)

## Goal

Provide a predictable long-term path for retiring workflow packs without breaking user journeys.

## Lifecycle States

1. Active
2. Deprecated (soft phase, warning + redirect target announced)
3. Sunset (hard phase, redirect enforced)

## Time Windows

- Deprecation notice period: minimum 90 days.
- Sunset cutoff: after notice period completes.

## Redirect Rules

- Deprecated and sunset packs must define a successor slug where possible.
- Redirect path pattern:
  - /workflows/old-slug -> /workflows/new-slug

## Communication Requirements

- Changelog entry for deprecation start.
- Sunset reminder at least 14 days before cutoff.
- Migration note with capability differences.
