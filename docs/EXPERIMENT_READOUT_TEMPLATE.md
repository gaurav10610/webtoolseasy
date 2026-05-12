# Experiment Readout Templates and Decision Criteria (TB-086)

## Template

- Experiment ID:
- Hypothesis:
- Variants:
- Start Date:
- End Date:
- Owner:

## Baseline

- Primary metric baseline:
- Secondary metric baseline:
- Guardrail metrics baseline:

## Results

- Sample size by variant:
- Primary conversion by variant:
- Secondary metric deltas:
- Guardrail metric deltas:

## Decision Criteria

1. Ship winning variant only if primary metric lift >= 10% and no guardrail regression > 3%.
2. Re-run if sample size is below threshold or confidence is weak.
3. Roll back if guardrail regression exceeds threshold even when primary improves.

## Decision

- Outcome: ship | iterate | rollback | inconclusive
- Rationale:
- Follow-up tasks:
