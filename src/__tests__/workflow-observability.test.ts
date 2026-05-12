import { describe, it, expect } from "vitest";
import {
  calculateTimeToFirstOutput as _calculateTimeToFirstOutput,
  isCompletionUnder2Minutes as _isCompletionUnder2Minutes,
  calculatePackMetrics as _calculatePackMetrics,
  calculateUtilisationScore as _calculateUtilisationScore,
  categorizeUtilization as _categorizeUtilization,
  calculateRecipeConversion as _calculateRecipeConversion,
  generateKPIReport as _generateKPIReport,
} from "@/lib/workflowObservability";

describe("Workflow Observability Framework", () => {
  describe("calculateTimeToFirstOutput (TB-110)", () => {
    it("should calculate time to first output correctly", () => {
      const stepTimings = [
        { stepId: "step1", startTime: 0, endTime: 100 },
        { stepId: "step2", startTime: 100, endTime: 250 },
      ];
      const result = _calculateTimeToFirstOutput(stepTimings);
      expect(result).toEqual(100);
    });

    it("should return first step duration regardless of order", () => {
      const stepTimings = [
        { stepId: "step2", startTime: 100, endTime: 250 },
        { stepId: "step1", startTime: 0, endTime: 100 },
      ];
      const result = _calculateTimeToFirstOutput(stepTimings);
      expect(result).toEqual(100);
    });

    it("should handle single step", () => {
      const stepTimings = [{ stepId: "step1", startTime: 1000, endTime: 1500 }];
      const result = _calculateTimeToFirstOutput(stepTimings);
      expect(result).toEqual(500);
    });

    it("should return null for empty timings", () => {
      const result = _calculateTimeToFirstOutput([]);
      expect(result).toBeNull();
    });
  });

  describe("isCompletionUnder2Minutes (TB-111)", () => {
    it("should return true for execution under 2 minutes", () => {
      const result = _isCompletionUnder2Minutes(60 * 1000);
      expect(result).toBe(true);
    });

    it("should return true for exactly 2 minutes minus 1ms", () => {
      const result = _isCompletionUnder2Minutes(120 * 1000 - 1);
      expect(result).toBe(true);
    });

    it("should return false for exactly 2 minutes", () => {
      const result = _isCompletionUnder2Minutes(120 * 1000);
      expect(result).toBe(false);
    });

    it("should return false for execution over 2 minutes", () => {
      const result = _isCompletionUnder2Minutes(150 * 1000);
      expect(result).toBe(false);
    });

    it("should handle very small times", () => {
      const result = _isCompletionUnder2Minutes(100);
      expect(result).toBe(true);
    });
  });

  describe("calculatePackMetrics", () => {
    it("should calculate average execution time correctly", () => {
      const runs = [
        { executionTime: 1000, isSuccessful: true },
        { executionTime: 2000, isSuccessful: true },
        { executionTime: 3000, isSuccessful: false },
      ];
      const metrics = _calculatePackMetrics(runs, "pack1", "Test Pack");
      expect(metrics.avgExecutionTime).toEqual(2000);
    });

    it("should calculate success rate correctly", () => {
      const runs = [
        { executionTime: 1000, isSuccessful: true },
        { executionTime: 2000, isSuccessful: true },
        { executionTime: 3000, isSuccessful: false },
      ];
      const metrics = _calculatePackMetrics(runs, "pack1", "Test Pack");
      expect(metrics.successRate).toBeCloseTo(0.667, 2);
    });

    it("should calculate 2-minute completion rate", () => {
      const runs = [
        { executionTime: 60 * 1000, isSuccessful: true },
        { executionTime: 90 * 1000, isSuccessful: true },
        { executionTime: 150 * 1000, isSuccessful: true },
      ];
      const metrics = _calculatePackMetrics(runs, "pack1", "Test Pack");
      expect(metrics.completion2MinRate).toBeCloseTo(0.667, 2);
    });

    it("should calculate average time-to-first-output", () => {
      const runs = [
        { executionTime: 1000, isSuccessful: true, timeToFirstOutput: 100 },
        { executionTime: 2000, isSuccessful: true, timeToFirstOutput: 150 },
      ];
      const metrics = _calculatePackMetrics(runs, "pack1", "Test Pack");
      expect(metrics.avgTimeToFirstOutput).toEqual(125);
    });

    it("should handle empty runs", () => {
      const metrics = _calculatePackMetrics([], "pack1", "Test Pack");
      expect(metrics.totalRuns).toEqual(0);
      expect(metrics.successRate).toEqual(0);
      expect(metrics.avgExecutionTime).toEqual(0);
    });
  });

  describe("calculateUtilisationScore (TB-113)", () => {
    it("should calculate basic utilization score", () => {
      const score = _calculateUtilisationScore(10, 2, 1, 20, 7);
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
    });

    it("should give higher score for power users", () => {
      const powerUserScore = _calculateUtilisationScore(200, 30, 10, 500, 1);
      expect(powerUserScore).toBeGreaterThan(70);
    });

    it("should give lower score for inactive users", () => {
      const inactiveScore = _calculateUtilisationScore(5, 0, 0, 10, 30);
      expect(inactiveScore).toBeLessThan(20);
    });

    it("should not exceed 100", () => {
      const maxScore = _calculateUtilisationScore(1000, 100, 50, 1000, 0);
      expect(maxScore).toBeLessThanOrEqual(100);
    });
  });

  describe("categorizeUtilization (TB-113)", () => {
    it("should categorize power users", () => {
      expect(_categorizeUtilization(75)).toEqual("power");
    });

    it("should categorize high users", () => {
      expect(_categorizeUtilization(55)).toEqual("high");
    });

    it("should categorize medium users", () => {
      expect(_categorizeUtilization(35)).toEqual("medium");
    });

    it("should categorize low users", () => {
      expect(_categorizeUtilization(15)).toEqual("low");
    });

    it("should handle boundary values", () => {
      expect(_categorizeUtilization(70)).toEqual("power");
      expect(_categorizeUtilization(69)).toEqual("high");
      expect(_categorizeUtilization(50)).toEqual("high");
      expect(_categorizeUtilization(49)).toEqual("medium");
      expect(_categorizeUtilization(25)).toEqual("medium");
      expect(_categorizeUtilization(24)).toEqual("low");
    });
  });

  describe("calculateRecipeConversion (TB-114)", () => {
    it("should calculate conversion rate correctly", () => {
      const metrics = _calculateRecipeConversion(100, 20);
      expect(metrics.conversionRate).toEqual(0.2);
    });

    it("should return 0 conversion for no views", () => {
      const metrics = _calculateRecipeConversion(0, 0);
      expect(metrics.conversionRate).toEqual(0);
    });

    it("should calculate time to first clone", () => {
      const firstView = new Date("2024-01-22T10:00:00Z");
      const firstClone = new Date("2024-01-22T10:05:00Z");
      const metrics = _calculateRecipeConversion(50, 10, firstView, firstClone);
      expect(metrics.timeToFirstClone).toEqual(5 * 60 * 1000);
    });

    it("should handle undefined time values", () => {
      const metrics = _calculateRecipeConversion(100, 20);
      expect(metrics.timeToFirstClone).toBeUndefined();
    });

    it("should indicate high conversion rates", () => {
      const metrics = _calculateRecipeConversion(50, 45);
      expect(metrics.conversionRate).toEqual(0.9);
    });
  });

  describe("generateKPIReport (TB-115)", () => {
    it("should generate valid KPI report", () => {
      const report = _generateKPIReport({
        packMetrics: [],
        cohortMetrics: [],
        recipeConversions: [],
      });
      expect(report).toBeDefined();
      expect(report.period).toBeDefined();
      expect(report.funnel).toBeDefined();
      expect(report.performance).toBeDefined();
      expect(report.engagement).toBeDefined();
      expect(report.quality).toBeDefined();
    });

    it("should include funnel metrics", () => {
      const report = _generateKPIReport({
        packMetrics: [
          {
            packId: "pack1",
            packName: "Pack One",
            totalRuns: 100,
            successRate: 0.8,
            avgExecutionTime: 5000,
            avgTimeToFirstOutput: 500,
            completion2MinRate: 0.9,
            uniqueUsers: 10,
            averageRunsPerUser: 10,
          },
        ],
        cohortMetrics: [],
        recipeConversions: [],
      });
      expect(report.funnel.workflowStarts).toEqual(100);
      expect(report.funnel.workflowCompletions).toEqual(80);
    });

    it("should aggregate performance metrics", () => {
      const report = _generateKPIReport({
        packMetrics: [
          {
            packId: "pack1",
            packName: "Pack One",
            totalRuns: 100,
            successRate: 0.8,
            avgExecutionTime: 5000,
            avgTimeToFirstOutput: 500,
            completion2MinRate: 0.9,
            uniqueUsers: 10,
            averageRunsPerUser: 10,
          },
        ],
        cohortMetrics: [],
        recipeConversions: [],
      });
      expect(report.performance.successRate).toEqual(0.8);
      expect(report.performance.completion2MinRate).toEqual(0.9);
      expect(report.performance.errorRate).toBeCloseTo(0.2, 10);
    });

    it("should calculate recipe sharing rates", () => {
      const report = _generateKPIReport({
        packMetrics: [],
        cohortMetrics: [],
        recipeConversions: [
          {
            recipeId: "recipe1",
            viewCount: 100,
            cloneCount: 30,
            conversionRate: 0.3,
            uniqueViewers: 80,
            repeatViewers: 20,
          },
        ],
      });
      expect(report.engagement.recipeShareRate).toEqual(0.3);
      expect(report.funnel.shareActions).toEqual(30);
    });

    it("should calculate quality score from success rate", () => {
      const report = _generateKPIReport({
        packMetrics: [
          {
            packId: "pack1",
            packName: "Pack One",
            totalRuns: 100,
            successRate: 0.95,
            avgExecutionTime: 5000,
            avgTimeToFirstOutput: 500,
            completion2MinRate: 0.9,
            uniqueUsers: 10,
            averageRunsPerUser: 10,
          },
        ],
        cohortMetrics: [],
        recipeConversions: [],
      });
      expect(report.quality.workflowQualityScore).toEqual(95);
    });

    it("should handle multiple packs", () => {
      const report = _generateKPIReport({
        packMetrics: [
          {
            packId: "pack1",
            packName: "Pack One",
            totalRuns: 100,
            successRate: 0.8,
            avgExecutionTime: 5000,
            avgTimeToFirstOutput: 500,
            completion2MinRate: 0.8,
            uniqueUsers: 10,
            averageRunsPerUser: 10,
          },
          {
            packId: "pack2",
            packName: "Pack Two",
            totalRuns: 50,
            successRate: 1.0,
            avgExecutionTime: 3000,
            avgTimeToFirstOutput: 300,
            completion2MinRate: 1.0,
            uniqueUsers: 5,
            averageRunsPerUser: 10,
          },
        ],
        cohortMetrics: [],
        recipeConversions: [],
      });
      expect(report.performance.successRate).toEqual(0.9);
      expect(report.performance.completion2MinRate).toEqual(0.9);
    });

    it("should provide period information", () => {
      const beforeGeneration = new Date();
      const report = _generateKPIReport({
        packMetrics: [],
        cohortMetrics: [],
        recipeConversions: [],
      });
      const afterGeneration = new Date();

      expect(report.period.startDate).toBeDefined();
      expect(report.period.endDate).toBeDefined();
      expect(report.period.endDate.getTime()).toBeGreaterThanOrEqual(
        beforeGeneration.getTime(),
      );
      expect(report.period.endDate.getTime()).toBeLessThanOrEqual(
        afterGeneration.getTime(),
      );
    });
  });

  describe("KPI alignment to funnel goals", () => {
    it("should track complete user journey", () => {
      const report = _generateKPIReport({
        packMetrics: [
          {
            packId: "pack1",
            packName: "Pack One",
            totalRuns: 100,
            successRate: 0.8,
            avgExecutionTime: 5000,
            avgTimeToFirstOutput: 500,
            completion2MinRate: 0.9,
            uniqueUsers: 50,
            averageRunsPerUser: 2,
          },
        ],
        cohortMetrics: [],
        recipeConversions: [
          {
            recipeId: "recipe1",
            viewCount: 200,
            cloneCount: 40,
            conversionRate: 0.2,
            uniqueViewers: 180,
            repeatViewers: 20,
          },
        ],
      });

      expect(report.funnel.workflowStarts).toEqual(100);
      expect(report.funnel.workflowCompletions).toBeLessThanOrEqual(
        report.funnel.workflowStarts,
      );
      expect(report.funnel.shareActions).toEqual(40);
      expect(report.funnel.shareActions).toBeLessThanOrEqual(
        report.funnel.workflowCompletions,
      );
    });

    it("should correlate performance and engagement", () => {
      const report = _generateKPIReport({
        packMetrics: [
          {
            packId: "pack1",
            packName: "Pack One",
            totalRuns: 200,
            successRate: 0.95,
            avgExecutionTime: 30 * 1000,
            avgTimeToFirstOutput: 2 * 1000,
            completion2MinRate: 1.0,
            uniqueUsers: 100,
            averageRunsPerUser: 2,
          },
        ],
        cohortMetrics: [],
        recipeConversions: [],
      });
      expect(report.performance.successRate).toEqual(0.95);
      expect(report.funnel.workflowCompletions).toEqual(190);
    });
  });

  describe("Retention cohort tracking (TB-112)", () => {
    it("should include cohort metrics in KPI report", () => {
      const report = _generateKPIReport({
        packMetrics: [],
        cohortMetrics: [
          {
            cohortDate: "2024-01-01",
            cohortName: "with_presets",
            cohortSize: 100,
            retentionByDay: {
              1: 0.95,
              7: 0.7,
              30: 0.45,
            },
            totalReturners: 70,
            totalChurned: 30,
          },
        ],
        recipeConversions: [],
      });
      expect(report).toBeDefined();
    });
  });
});
