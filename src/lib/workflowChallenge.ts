export interface ChallengeStory {
  workflowSlug: string;
  title: string;
  beforeSummary: string;
  afterSummary: string;
  createdAt: Date;
}

export interface BenchmarkEvent {
  metricName: string;
  beforeValue: number;
  afterValue: number;
  unit: "ms" | "count" | "kb" | "percent";
  sampleSize: number;
  capturedAt: Date;
}

export interface AggregateBenchmark {
  workflowSlug: string;
  totals: {
    events: number;
    sampleSize: number;
  };
  metrics: Record<
    string,
    {
      beforeSum: number;
      afterSum: number;
      sampleSize: number;
      unit: BenchmarkEvent["unit"];
    }
  >;
  updatedAt: Date;
}

export function _initializeChallengeStory(input: {
  workflowSlug: string;
  title: string;
  beforeSummary: string;
  afterSummary: string;
}): ChallengeStory {
  return {
    workflowSlug: input.workflowSlug,
    title: input.title,
    beforeSummary: input.beforeSummary,
    afterSummary: input.afterSummary,
    createdAt: new Date(),
  };
}

export function _initializeAggregateBenchmark(
  workflowSlug: string,
): AggregateBenchmark {
  return {
    workflowSlug,
    totals: {
      events: 0,
      sampleSize: 0,
    },
    metrics: {},
    updatedAt: new Date(),
  };
}

export function _sanitizeBenchmarkPayload(payload: Record<string, unknown>): {
  safe: Record<string, number | string>;
  droppedKeys: string[];
} {
  const safe: Record<string, number | string> = {};
  const droppedKeys: string[] = [];

  Object.entries(payload).forEach(([key, value]) => {
    // Keep only aggregate-safe scalar values.
    if (typeof value === "number" || typeof value === "string") {
      if (/file|content|raw|token|password|secret|key/i.test(key)) {
        droppedKeys.push(key);
        return;
      }
      safe[key] = value;
      return;
    }

    droppedKeys.push(key);
  });

  return { safe, droppedKeys };
}

export function _captureBenchmarkEvent(
  aggregate: AggregateBenchmark,
  event: BenchmarkEvent,
): AggregateBenchmark {
  const existing = aggregate.metrics[event.metricName] || {
    beforeSum: 0,
    afterSum: 0,
    sampleSize: 0,
    unit: event.unit,
  };

  return {
    ...aggregate,
    totals: {
      events: aggregate.totals.events + 1,
      sampleSize: aggregate.totals.sampleSize + event.sampleSize,
    },
    metrics: {
      ...aggregate.metrics,
      [event.metricName]: {
        beforeSum: existing.beforeSum + event.beforeValue,
        afterSum: existing.afterSum + event.afterValue,
        sampleSize: existing.sampleSize + event.sampleSize,
        unit: existing.unit,
      },
    },
    updatedAt: new Date(),
  };
}

export function _computeBenchmarkDelta(aggregate: AggregateBenchmark): Array<{
  metricName: string;
  unit: BenchmarkEvent["unit"];
  beforeAverage: number;
  afterAverage: number;
  improvement: number;
}> {
  return Object.entries(aggregate.metrics).map(([metricName, metric]) => {
    const beforeAverage = metric.sampleSize
      ? metric.beforeSum / metric.sampleSize
      : 0;
    const afterAverage = metric.sampleSize
      ? metric.afterSum / metric.sampleSize
      : 0;

    const improvement =
      beforeAverage === 0
        ? 0
        : ((beforeAverage - afterAverage) / beforeAverage) * 100;

    return {
      metricName,
      unit: metric.unit,
      beforeAverage: Math.round(beforeAverage * 100) / 100,
      afterAverage: Math.round(afterAverage * 100) / 100,
      improvement: Math.round(improvement * 100) / 100,
    };
  });
}

export function _buildChallengeNarrative(
  story: ChallengeStory,
  aggregate: AggregateBenchmark,
): {
  headline: string;
  highlights: string[];
} {
  const deltas = _computeBenchmarkDelta(aggregate).sort(
    (a, b) => b.improvement - a.improvement,
  );

  const top = deltas[0];
  const headline = top
    ? `${story.title}: ${top.improvement}% improvement in ${top.metricName}`
    : `${story.title}: benchmark in progress`;

  const highlights = deltas.slice(0, 3).map((d) => {
    return `${d.metricName}: ${d.beforeAverage}${d.unit} -> ${d.afterAverage}${d.unit} (${d.improvement}% better)`;
  });

  return {
    headline,
    highlights,
  };
}
