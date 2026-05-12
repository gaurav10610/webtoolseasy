# DB Cost and Usage Monitoring Thresholds

## Objective

Define practical cost and usage guardrails for optional metadata-sync database workloads.

## Monthly Cost Thresholds

- Green: < $50/month
- Yellow: $50-$100/month
- Red: > $100/month

## Storage Thresholds

- Green: < 2 GB
- Yellow: 2-5 GB
- Red: > 5 GB

## Connection Thresholds

- Green: < 40% of max connections
- Yellow: 40-70% of max connections
- Red: > 70% of max connections

## Query Performance Thresholds

- Green: p95 query latency < 150 ms
- Yellow: p95 query latency 150-350 ms
- Red: p95 query latency > 350 ms

## Write Volume Thresholds

- Green: < 250 writes/minute
- Yellow: 250-500 writes/minute
- Red: > 500 writes/minute

## Alerting Policy

- Yellow alerts: Slack notification, business-hours response.
- Red alerts: Pager escalation, immediate triage.

## Mitigation Actions

1. Enable stricter run archival cleanup.
2. Reduce verbose metadata write frequency.
3. Add/optimize indexes for hot query paths.
4. Move heavy analytics reads to replicas or periodic aggregates.
5. Review retention windows and trim old runs/recipes.

## Reporting Cadence

- Weekly: usage trend summary.
- Monthly: cost review with optimization decisions.
- Quarterly: provider/pricing portability reassessment.
