# Telemetry Schema Versioning Policy (TB-184)

## Objective

Keep telemetry event contracts evolvable while maintaining safe compatibility checks.

## Versioning Model

- Semver for telemetry schema versions.
- Major version mismatch is incompatible by default.
- Minor/patch differences within same major are compatible.

## Event Requirements

Every telemetry event must include:

- schemaVersion
- name
- workflowSlug
- timestamp

## Rollout Rules

1. Additive changes: minor version bump.
2. Breaking field changes/removals: major version bump.
3. Consumer compatibility checks required before ingestion.

## Operational Guardrails

- Reject incompatible major-version events.
- Log version mismatch counts for triage.
- Keep mapping docs for deprecated fields during transition windows.
