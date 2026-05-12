# API Payload Cleanup Workflow Playbook

This playbook helps you run API payload cleanup as a repeatable workflow instead of one-off manual edits.

## Workflow Steps

1. Validate and format JSON payloads.
2. Normalize key naming conventions.
3. Produce a diff snapshot for review.
4. Export cleaned JSON and CSV artifacts.

## Why This Workflow Repeats Well

- The same payload hygiene rules can be reused across projects.
- Output manifests provide deterministic checksums for handoff.
- Local-first execution keeps sensitive payloads in your browser.

## Suggested Preset

- Preset name: `API Cleanup Starter`
- Key mode: strict key normalization
- Export bundle: cleaned JSON + CSV + summary

## Next Links

- Run the workflow: /workflows/api-payload-cleanup
- Clone starter template: /templates/api-payload-cleanup
