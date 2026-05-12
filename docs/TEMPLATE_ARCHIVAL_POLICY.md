# Template Archival Policy for Stale or Low-Quality Entries (TB-185)

## Objective

Maintain a healthy template library by archiving stale, low-quality, or high-risk entries.

## Archival Signals

- Long inactivity window (default: >=180 days).
- Low popularity score.
- Low quality score.
- Elevated abuse report count.

## Protection Rule

Templates with strong community endorsement can be retained even when old:

- ratingCount >= 8 and averageRating >= 4.2

## Policy Outcomes

1. Keep active.
2. Mark for archival review.
3. Archive and hide from default listing.

## Review Cadence

- Weekly automated candidate generation.
- Monthly human moderation pass.
- Immediate archival path for severe abuse clusters.
