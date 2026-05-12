# Workflow Pack Release Checklist (TB-180)

Use this checklist for workflow pack publication readiness.

## 1. Implementation Readiness

- [ ] Pack config validated.
- [ ] Template compatibility confirmed.
- [ ] Tool URL continuity verified.

## 2. Quality Validation

- [ ] Unit tests pass.
- [ ] Build passes.
- [ ] Performance gates pass (`npm run perf:gates`).

## 3. Security and Privacy

- [ ] Audit logging behavior confirmed for moderation/publication.
- [ ] Security headers/CSP review checked for affected routes.
- [ ] No raw file content persisted in sync metadata paths.

## 4. Docs and Communication

- [ ] Changelog entry added.
- [ ] Migration notes included if contract changed.
- [ ] Support/contact docs updated if user behavior changed.

## 5. Launch Controls

- [ ] Rollback switch verified (`NEXT_PUBLIC_ENABLE_WORKFLOW_ROLLBACK`).
- [ ] Watch window owner assigned.
- [ ] Metrics alert thresholds confirmed.
