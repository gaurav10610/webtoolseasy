# CSP Review for Runner and Template Pages (TB-174)

## Scope

- Workflow runner pages: /workflows, /workflows/[slug]
- Template pages: /templates, /templates/[slug]
- Embed pages: /embed/[workflowSlug]

## Current CSP Signals

Embed-mode code currently generates CSP for embed responses and uses frame-ancestors control.
Primary finding:

- Embed route has explicit CSP logic.
- Workflow/template pages currently rely on framework-level behavior and should adopt explicit CSP policy.

## Recommended CSP Baseline

For non-embed workflow/template pages:

```text
default-src 'self';
script-src 'self';
style-src 'self' 'unsafe-inline';
img-src 'self' data: blob:;
font-src 'self' data:;
connect-src 'self';
frame-ancestors 'self';
base-uri 'self';
form-action 'self';
```

For embed pages:

- Keep route-level CSP with restricted frame-ancestors allowlist.
- Minimize use of unsafe-inline where practical.

## Follow-up Controls

1. Add CSP report-only first to monitor violations.
2. Migrate inline scripts/styles to nonce or hashed strategy where possible.
3. Enforce policy after two clean release cycles.
