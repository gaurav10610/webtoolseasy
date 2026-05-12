export type ExperimentVariant =
  | "control"
  | "workflow_first"
  | "privacy_explicit";

export interface ExperimentAssignment {
  experimentId: string;
  variant: ExperimentVariant;
}

export interface ExperimentEvent {
  experimentId: string;
  variant: ExperimentVariant;
  eventName: string;
  timestamp: string;
  workflowSlug?: string;
}

const EXPERIMENT_KEY = "wte_experiment_assignments";
const EVENT_KEY = "wte_experiment_events";

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    return (JSON.parse(localStorage.getItem(key) || "") as T) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage failures
  }
}

export function _getExperimentAssignment(
  experimentId: string,
  variants: ExperimentVariant[] = ["control", "workflow_first"],
): ExperimentAssignment {
  const assignments = readStorage<Record<string, ExperimentVariant>>(
    EXPERIMENT_KEY,
    {},
  );
  const existing = assignments[experimentId];

  if (existing) {
    return { experimentId, variant: existing };
  }

  const assigned =
    variants[Math.floor(Math.random() * variants.length)] || "control";
  const next = { ...assignments, [experimentId]: assigned };
  writeStorage(EXPERIMENT_KEY, next);

  return { experimentId, variant: assigned };
}

export function _trackExperimentEvent(event: ExperimentEvent): void {
  const existing = readStorage<ExperimentEvent[]>(EVENT_KEY, []);
  const next = [...existing, event].slice(-1000);
  writeStorage(EVENT_KEY, next);
}

export function _summarizeExperimentConversion(
  events: ExperimentEvent[],
  input: {
    experimentId: string;
    startEvent: string;
    conversionEvent: string;
  },
) {
  const scoped = events.filter(
    (event) => event.experimentId === input.experimentId,
  );
  const byVariant = new Map<
    ExperimentVariant,
    { starts: number; conversions: number }
  >();

  for (const event of scoped) {
    const row = byVariant.get(event.variant) || { starts: 0, conversions: 0 };
    if (event.eventName === input.startEvent) row.starts += 1;
    if (event.eventName === input.conversionEvent) row.conversions += 1;
    byVariant.set(event.variant, row);
  }

  return Array.from(byVariant.entries()).map(([variant, row]) => ({
    variant,
    starts: row.starts,
    conversions: row.conversions,
    conversionRate: row.starts > 0 ? row.conversions / row.starts : 0,
  }));
}
