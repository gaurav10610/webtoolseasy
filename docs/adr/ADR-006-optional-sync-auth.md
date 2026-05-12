# ADR-006: Optional Sync Authentication Strategy

**Date**: 2026-05-12  
**Status**: Accepted  
**Deciders**: Web Tools Team

## Context

WebToolsEasy is local-first and must preserve anonymous usage parity, while offering optional cross-device metadata sync for users who want it.

We need a simple, low-friction authentication approach that:

1. Keeps local anonymous mode as the default.
2. Adds optional sign-in only for sync.
3. Avoids mandatory account creation for core workflows.
4. Minimizes PII storage and auth complexity.

## Decision

We select a **dual-mode auth model**:

1. **Default Mode**: Anonymous local-only operation (no login required).
2. **Optional Sync Mode**: Email magic-link authentication for metadata sync.

### Why Magic Links

- Lower friction than password-based flows.
- Reduced credential handling risk.
- Strong usability on mobile/desktop.
- Aligns with optional sync posture and privacy constraints.

## Consequences

### Positive

- Preserves anonymous local parity for all core workflows.
- Introduces optional account identity only when user explicitly enables sync.
- Limits auth state complexity.

### Tradeoffs

- Requires email delivery provider for magic links.
- Sync users need inbox access for sign-in.

## Guardrails

- No file content is synced regardless of auth mode.
- Anonymous local data remains fully functional without auth.
- Auth token/session expires and can be revoked.

## Implementation Notes

- Auth mode is environment-configurable with `AUTH_MODE=optional` (default).
- If auth provider is unavailable, system falls back to anonymous local mode.
- UI should clearly distinguish local-only mode and signed-in sync mode.
