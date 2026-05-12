export interface TemplateHealthSignals {
  templateId: string;
  lastActivityAt?: Date;
  popularityScore: number;
  averageRating: number;
  ratingCount: number;
  abuseReportCount: number;
  qualityScore: number;
}

export interface TemplateArchivalConfig {
  staleDaysThreshold: number;
  minPopularityScore: number;
  minQualityScore: number;
  maxAbuseReports: number;
  minRatingsForProtection: number;
}

export interface TemplateArchivalDecision {
  templateId: string;
  shouldArchive: boolean;
  reasons: string[];
}

export const DEFAULT_ARCHIVAL_CONFIG: TemplateArchivalConfig = {
  staleDaysThreshold: 180,
  minPopularityScore: 10,
  minQualityScore: 60,
  maxAbuseReports: 3,
  minRatingsForProtection: 8,
};

export function _evaluateTemplateArchival(
  signals: TemplateHealthSignals,
  config: TemplateArchivalConfig = DEFAULT_ARCHIVAL_CONFIG,
  now: Date = new Date(),
): TemplateArchivalDecision {
  const reasons: string[] = [];

  const lastActivityMs = signals.lastActivityAt?.getTime();
  if (!lastActivityMs) {
    reasons.push("no recorded activity");
  } else {
    const ageDays = Math.floor(
      (now.getTime() - lastActivityMs) / (1000 * 60 * 60 * 24),
    );
    if (ageDays >= config.staleDaysThreshold) {
      reasons.push(`stale for ${ageDays} days`);
    }
  }

  if (signals.popularityScore < config.minPopularityScore) {
    reasons.push(`low popularity ${signals.popularityScore}`);
  }

  if (signals.qualityScore < config.minQualityScore) {
    reasons.push(`low quality ${signals.qualityScore}`);
  }

  if (signals.abuseReportCount > config.maxAbuseReports) {
    reasons.push(`abuse reports ${signals.abuseReportCount}`);
  }

  const protectedByRatings =
    signals.ratingCount >= config.minRatingsForProtection &&
    signals.averageRating >= 4.2;

  return {
    templateId: signals.templateId,
    shouldArchive: reasons.length > 0 && !protectedByRatings,
    reasons,
  };
}

export function _selectTemplatesForArchival(
  templates: TemplateHealthSignals[],
  config: TemplateArchivalConfig = DEFAULT_ARCHIVAL_CONFIG,
  now: Date = new Date(),
): TemplateArchivalDecision[] {
  return templates.map((template) =>
    _evaluateTemplateArchival(template, config, now),
  );
}
