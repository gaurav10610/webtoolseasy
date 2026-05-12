# Security Headers Review for Workflow, Template, and Embed Routes (TB-173)

## Reviewed Routes

- /workflows
- /workflows/[slug]
- /templates
- /templates/[slug]
- /embed/[workflowSlug] (via embed-mode utilities)

## Current Coverage

## Embed Route Headers

Implemented via embed configuration utility:

- X-Frame-Options
- Content-Security-Policy
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

Notes:

- Denied requests return strict CSP default-src 'none'.
- Allowed embed requests constrain frame-ancestors and script/style sources.

## Workflow/Template Route Gaps

Workflow and template app routes are rendered through Next.js pages and rely on global platform defaults.
Recommended hardening additions:

1. Add explicit global headers in Next config for:
   - X-Content-Type-Options: nosniff
   - Referrer-Policy: strict-origin-when-cross-origin
   - X-Frame-Options: SAMEORIGIN for non-embed pages
2. Apply route-specific CSP for workflow/template pages where inline scripts are avoidable.
3. Keep embed exceptions isolated to embed-specific handlers only.

## Actionable Follow-up

- Keep embed headers managed in route-level logic.
- Add central headers policy mapping by route group.
- Re-run security header smoke checks after each route addition.
