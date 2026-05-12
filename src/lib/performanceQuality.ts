export interface LighthouseCategoryScores {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
}

export interface LighthouseThresholds {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
}

export interface LighthouseEvaluation {
  passed: boolean;
  failures: string[];
}

export interface BundleAsset {
  name: string;
  sizeBytes: number;
}

export interface BundleBudget {
  maxTotalBytes: number;
  maxLargestAssetBytes: number;
}

export interface BundleBudgetResult {
  passed: boolean;
  totalBytes: number;
  largestAssetBytes: number;
  failures: string[];
}

export type WebVitalName = "LCP" | "CLS" | "INP" | "FCP" | "TTFB";

export interface WebVitalRecord {
  name: WebVitalName;
  value: number;
  page: string;
  capturedAt: Date;
}

export interface WebVitalsStore {
  records: WebVitalRecord[];
}

export function _evaluateLighthouseScores(
  scores: LighthouseCategoryScores,
  thresholds: LighthouseThresholds,
): LighthouseEvaluation {
  const failures: string[] = [];

  if (scores.performance < thresholds.performance) {
    failures.push(
      `Performance ${scores.performance} below ${thresholds.performance}`,
    );
  }
  if (scores.accessibility < thresholds.accessibility) {
    failures.push(
      `Accessibility ${scores.accessibility} below ${thresholds.accessibility}`,
    );
  }
  if (scores.bestPractices < thresholds.bestPractices) {
    failures.push(
      `Best Practices ${scores.bestPractices} below ${thresholds.bestPractices}`,
    );
  }
  if (scores.seo < thresholds.seo) {
    failures.push(`SEO ${scores.seo} below ${thresholds.seo}`);
  }

  return {
    passed: failures.length === 0,
    failures,
  };
}

export function _checkBundleBudget(
  assets: BundleAsset[],
  budget: BundleBudget,
): BundleBudgetResult {
  const totalBytes = assets.reduce((sum, asset) => sum + asset.sizeBytes, 0);
  const largestAssetBytes = assets.reduce(
    (max, asset) => Math.max(max, asset.sizeBytes),
    0,
  );

  const failures: string[] = [];

  if (totalBytes > budget.maxTotalBytes) {
    failures.push(
      `Total bundle size ${totalBytes} exceeds budget ${budget.maxTotalBytes}`,
    );
  }

  if (largestAssetBytes > budget.maxLargestAssetBytes) {
    failures.push(
      `Largest asset ${largestAssetBytes} exceeds budget ${budget.maxLargestAssetBytes}`,
    );
  }

  return {
    passed: failures.length === 0,
    totalBytes,
    largestAssetBytes,
    failures,
  };
}

export function _initializeWebVitalsStore(): WebVitalsStore {
  return {
    records: [],
  };
}

export function _recordWebVital(
  store: WebVitalsStore,
  record: Omit<WebVitalRecord, "capturedAt">,
): WebVitalsStore {
  return {
    ...store,
    records: [
      ...store.records,
      {
        ...record,
        capturedAt: new Date(),
      },
    ],
  };
}

export function _summarizeWebVitals(store: WebVitalsStore): {
  totals: Record<WebVitalName, number>;
  averages: Record<WebVitalName, number>;
  count: number;
} {
  const totals: Record<WebVitalName, number> = {
    LCP: 0,
    CLS: 0,
    INP: 0,
    FCP: 0,
    TTFB: 0,
  };

  const counts: Record<WebVitalName, number> = {
    LCP: 0,
    CLS: 0,
    INP: 0,
    FCP: 0,
    TTFB: 0,
  };

  for (const record of store.records) {
    totals[record.name] += record.value;
    counts[record.name] += 1;
  }

  const averages: Record<WebVitalName, number> = {
    LCP: counts.LCP ? totals.LCP / counts.LCP : 0,
    CLS: counts.CLS ? totals.CLS / counts.CLS : 0,
    INP: counts.INP ? totals.INP / counts.INP : 0,
    FCP: counts.FCP ? totals.FCP / counts.FCP : 0,
    TTFB: counts.TTFB ? totals.TTFB / counts.TTFB : 0,
  };

  return {
    totals,
    averages,
    count: store.records.length,
  };
}

export function _getWebVitalsAlerts(store: WebVitalsStore): string[] {
  const { averages } = _summarizeWebVitals(store);
  const alerts: string[] = [];

  if (averages.LCP > 2500) alerts.push("LCP above 2500ms threshold");
  if (averages.CLS > 0.1) alerts.push("CLS above 0.1 threshold");
  if (averages.INP > 200) alerts.push("INP above 200ms threshold");
  if (averages.FCP > 1800) alerts.push("FCP above 1800ms threshold");
  if (averages.TTFB > 800) alerts.push("TTFB above 800ms threshold");

  return alerts;
}
