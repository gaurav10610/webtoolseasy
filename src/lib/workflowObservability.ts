/**
 * Workflow Observability and Metrics Framework
 *
 * TB-110: Add observable "time-to-first-output" metric and alarms
 * TB-111: Add "completion under 2 minutes" success indicator per pack
 * TB-112: Add retention cohort tracking for users with vs without presets
 * TB-113: Add repeat usage tracking by project workspace utilization
 * TB-114: Add recipe viewer-to-clone conversion tracking
 * TB-115: Add baseline KPI docs aligned to WCW and funnel goals
 */

/**
 * Observable Metrics - collected during workflow execution
 * No PII, workflow-scoped, privacy-safe
 */

export interface WorkflowMetrics {
  // Timing metrics
  timeToFirstOutput?: number; // ms from start to first step completion
  totalExecutionTime?: number; // ms from start to end
  stepDurations?: Record<string, number>; // ms per step

  // Success metrics
  isComplete: boolean;
  isSuccessful: boolean;
  completedUnder2Min: boolean; // TB-111: 2-minute success indicator

  // Resource metrics
  maxMemoryUsed?: number; // bytes
  inputSize?: number; // bytes
  outputSize?: number; // bytes

  // Step metrics
  stepsAttempted: number;
  stepsCompleted: number;
  stepFailures: number;

  // Artifact metrics
  artifactCount: number;
  artifactTypes: string[]; // e.g., ['json', 'csv', 'pdf']
}

export interface WorkflowPackMetrics {
  packId: string;
  packName: string;
  totalRuns: number;
  successRate: number; // 0-1
  avgExecutionTime: number; // ms
  avgTimeToFirstOutput: number; // TB-110
  completion2MinRate: number; // TB-111: % of runs < 120s
  uniqueUsers: number;
  averageRunsPerUser: number;
}

/**
 * Cohort Analysis - TB-112: Retention for users with vs without presets
 */
export interface CohortMetrics {
  cohortDate: string; // YYYY-MM-DD
  cohortName: "with_presets" | "without_presets";
  cohortSize: number;
  retentionByDay: Record<number, number>; // day -> retention %
  totalReturners: number;
  totalChurned: number;
}

/**
 * Usage Tracking - TB-113: Repeat usage by workspace utilization
 */
export interface WorkspaceUtilizationMetrics {
  workspaceId: string;
  runCount: number;
  presetCount: number;
  recipeCount: number;
  totalArtifacts: number;
  lastActiveAt: Date;
  utilisationScore: number; // 0-100, based on items and activity
  category: "low" | "medium" | "high" | "power"; // utilization tier
}

/**
 * Conversion Tracking - TB-114: Recipe viewer to clone conversion
 */
export interface RecipeConversionMetrics {
  recipeId: string;
  viewCount: number;
  cloneCount: number;
  conversionRate: number; // clones / views
  timeToFirstClone?: number; // ms from first view to first clone
  uniqueViewers: number;
  repeatViewers: number;
}

/**
 * Calculate observable time-to-first-output (TB-110)
 */
export function calculateTimeToFirstOutput(
  stepTimings: Array<{ stepId: string; startTime: number; endTime: number }>,
): number | null {
  if (stepTimings.length === 0) return null;

  // Find first step completion
  const firstCompletion = stepTimings.reduce((min, current) =>
    current.endTime < min.endTime ? current : min,
  );

  // Return duration of first step
  return firstCompletion.endTime - firstCompletion.startTime;
}

/**
 * Determine 2-minute completion status (TB-111)
 */
export function isCompletionUnder2Minutes(
  totalExecutionTime: number, // milliseconds
): boolean {
  return totalExecutionTime < 120 * 1000; // 120 seconds
}

/**
 * Calculate pack-level metrics
 */
export function calculatePackMetrics(
  runs: Array<{
    executionTime: number;
    isSuccessful: boolean;
    timeToFirstOutput?: number;
  }>,
  packId: string,
  packName: string,
): WorkflowPackMetrics {
  const totalRuns = runs.length;
  const successfulRuns = runs.filter((r) => r.isSuccessful).length;
  const avgExecutionTime =
    runs.length > 0
      ? runs.reduce((sum, r) => sum + r.executionTime, 0) / runs.length
      : 0;

  const runsUnder2Min = runs.filter((r) =>
    isCompletionUnder2Minutes(r.executionTime),
  ).length;

  const avgTimeToFirstOutput =
    runs.filter((r) => r.timeToFirstOutput).length > 0
      ? runs
          .filter((r) => r.timeToFirstOutput)
          .reduce((sum, r) => sum + (r.timeToFirstOutput || 0), 0) /
        runs.filter((r) => r.timeToFirstOutput).length
      : 0;

  return {
    packId,
    packName,
    totalRuns,
    successRate: totalRuns > 0 ? successfulRuns / totalRuns : 0,
    avgExecutionTime,
    avgTimeToFirstOutput,
    completion2MinRate: totalRuns > 0 ? runsUnder2Min / totalRuns : 0,
    uniqueUsers: 0, // Would be populated from user data
    averageRunsPerUser: 0, // Would be populated from user data
  };
}

/**
 * Calculate utilization score for workspace (TB-113)
 */
export function calculateUtilisationScore(
  runCount: number,
  presetCount: number,
  recipeCount: number,
  totalArtifacts: number,
  daysSinceLastActive: number,
): number {
  let score = 0;

  // Run activity: up to 40 points
  score += Math.min(40, (runCount / 100) * 40);

  // Preset usage: up to 30 points
  score += Math.min(30, (presetCount / 10) * 30);

  // Recipe creation: up to 20 points
  score += Math.min(20, (recipeCount / 5) * 20);

  // Artifact generation: up to 10 points
  score += Math.min(10, (totalArtifacts / 50) * 10);

  // Penalize inactivity: reduce score by 5% per day
  const inactivityPenalty = (daysSinceLastActive / 30) * 100; // Full loss after 30 days
  score = Math.max(0, score - inactivityPenalty);

  return Math.max(Math.round(score), 0); // Ensure non-negative
}

/**
 * Categorize workspace by utilization (TB-113)
 */
export function categorizeUtilization(
  utilisationScore: number,
): "low" | "medium" | "high" | "power" {
  if (utilisationScore >= 70) return "power";
  if (utilisationScore >= 50) return "high";
  if (utilisationScore >= 25) return "medium";
  return "low";
}

/**
 * Calculate recipe conversion metrics (TB-114)
 */
export function calculateRecipeConversion(
  viewCount: number,
  cloneCount: number,
  firstViewTime?: Date,
  firstCloneTime?: Date,
): RecipeConversionMetrics {
  const conversionRate = viewCount > 0 ? cloneCount / viewCount : 0;

  let timeToFirstClone: number | undefined;
  if (firstViewTime && firstCloneTime) {
    timeToFirstClone = firstCloneTime.getTime() - firstViewTime.getTime();
  }

  return {
    recipeId: "",
    viewCount,
    cloneCount,
    conversionRate,
    timeToFirstClone,
    uniqueViewers: 0,
    repeatViewers: 0,
  };
}

/**
 * Generate KPI Report - TB-115: Baseline KPIs aligned to WCW and funnel goals
 */
export interface KPIReport {
  period: {
    startDate: Date;
    endDate: Date;
  };

  // Funnel KPIs (WCW - Workflow Completion Waterfall)
  funnel: {
    visitorsCount: number;
    toolInteractions: number;
    workflowStarts: number;
    workflowCompletions: number;
    artifactDownloads: number;
    shareActions: number;
    returnVisits: number;
  };

  // Workflow Performance KPIs
  performance: {
    avgExecutionTime: number;
    avgTimeToFirstOutput: number;
    completion2MinRate: number;
    successRate: number;
    errorRate: number;
  };

  // User Engagement KPIs
  engagement: {
    uniqueUsers: number;
    repeatUsers: number;
    retentionRate: number;
    avgSessionDuration: number;
    presetUsageRate: number;
    recipeShareRate: number;
  };

  // Quality KPIs
  quality: {
    workflowQualityScore: number; // 0-100
    templateUniquenessScore: number;
    contentFreshness: number; // % of recent updates
  };
}

export function generateKPIReport(data: {
  packMetrics: WorkflowPackMetrics[];
  cohortMetrics: CohortMetrics[];
  recipeConversions: RecipeConversionMetrics[];
}): KPIReport {
  // Calculate aggregated metrics
  const totalRuns = data.packMetrics.reduce((sum, p) => sum + p.totalRuns, 0);
  const avgSuccessRate =
    data.packMetrics.length > 0
      ? data.packMetrics.reduce((sum, p) => sum + p.successRate, 0) /
        data.packMetrics.length
      : 0;

  const avgCompletion2Min =
    data.packMetrics.length > 0
      ? data.packMetrics.reduce((sum, p) => sum + p.completion2MinRate, 0) /
        data.packMetrics.length
      : 0;

  const totalClones = data.recipeConversions.reduce(
    (sum, r) => sum + r.cloneCount,
    0,
  );
  const totalViews = data.recipeConversions.reduce(
    (sum, r) => sum + r.viewCount,
    0,
  );

  return {
    period: {
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
      endDate: new Date(),
    },

    funnel: {
      visitorsCount: 0, // Would be populated from analytics
      toolInteractions: totalRuns,
      workflowStarts: totalRuns,
      workflowCompletions: Math.round(totalRuns * avgSuccessRate),
      artifactDownloads: 0, // Would be populated from artifacts
      shareActions: totalClones,
      returnVisits: 0, // Would be populated from sessions
    },

    performance: {
      avgExecutionTime:
        data.packMetrics.length > 0
          ? data.packMetrics.reduce((sum, p) => sum + p.avgExecutionTime, 0) /
            data.packMetrics.length
          : 0,
      avgTimeToFirstOutput:
        data.packMetrics.length > 0
          ? data.packMetrics.reduce(
              (sum, p) => sum + p.avgTimeToFirstOutput,
              0,
            ) / data.packMetrics.length
          : 0,
      completion2MinRate: avgCompletion2Min,
      successRate: avgSuccessRate,
      errorRate: 1 - avgSuccessRate,
    },

    engagement: {
      uniqueUsers: 0, // Would be populated
      repeatUsers: 0, // Would be populated
      retentionRate: 0, // Would be calculated from cohort data
      avgSessionDuration: 0, // Would be populated
      presetUsageRate: 0, // Would be calculated
      recipeShareRate: totalViews > 0 ? totalClones / totalViews : 0,
    },

    quality: {
      workflowQualityScore: Math.round(avgSuccessRate * 100),
      templateUniquenessScore: 0, // Would be calculated from quality checker
      contentFreshness: 0, // Would be calculated from update timestamps
    },
  };
}

/**
 * Export for testing
 */
export {
  calculateTimeToFirstOutput as _calculateTimeToFirstOutput,
  isCompletionUnder2Minutes as _isCompletionUnder2Minutes,
  calculatePackMetrics as _calculatePackMetrics,
  calculateUtilisationScore as _calculateUtilisationScore,
  categorizeUtilization as _categorizeUtilization,
  calculateRecipeConversion as _calculateRecipeConversion,
  generateKPIReport as _generateKPIReport,
};
