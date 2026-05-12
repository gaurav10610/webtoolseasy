# Post-Release Watch Window Playbook (TB-182)

## Watch Window

- Duration: first 24 hours after workflow pack release.
- Owners: release engineer + on-call reviewer.
- Triage cadence: every 30 minutes for first 4 hours, hourly thereafter.

## Metrics to Monitor

1. Error rate (%).
2. P95 latency (ms).
3. Crash-free sessions (%).
4. Template publication/moderation failure counts.
5. Key user funnel signals (run start -> completion).

## Guardrails

- Error rate >= 5%: immediate rollback consideration.
- P95 latency >= 2500ms: immediate rollback consideration.
- Crash-free < 98%: immediate rollback consideration.

## Triage Flow

1. Confirm alert signal and affected scope.
2. Check if issue is transient or sustained over 2 windows.
3. Apply rollback switch if guardrail is breached.
4. Post incident summary with impact + mitigation.

## Communication Template

```md
### Watch Window Update

- Time: <UTC>
- Status: green|yellow|red
- Metrics: error=<x>, p95=<x>, crash-free=<x>
- Action: none|investigating|rollback-enabled
- Owner: <name>
```

## Exit Criteria

- All core metrics stable for 12 consecutive hours.
- No Sev-1/Sev-2 incidents open.
- Rollback switch remains off.
