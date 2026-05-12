import { describe, expect, it } from "vitest";
import {
  _checkBundleBudget,
  _evaluateLighthouseScores,
  _getWebVitalsAlerts,
  _initializeWebVitalsStore,
  _recordWebVital,
  _summarizeWebVitals,
} from "@/lib/performanceQuality";

describe("Performance Quality Gates (TB-176/TB-177/TB-178)", () => {
  describe("Lighthouse Score Evaluation", () => {
    it("passes when all categories meet threshold", () => {
      const result = _evaluateLighthouseScores(
        {
          performance: 0.9,
          accessibility: 0.95,
          bestPractices: 0.92,
          seo: 0.91,
        },
        {
          performance: 0.85,
          accessibility: 0.9,
          bestPractices: 0.9,
          seo: 0.9,
        },
      );

      expect(result.passed).toBe(true);
      expect(result.failures).toEqual([]);
    });

    it("fails when any category drops below threshold", () => {
      const result = _evaluateLighthouseScores(
        {
          performance: 0.75,
          accessibility: 0.95,
          bestPractices: 0.88,
          seo: 0.91,
        },
        {
          performance: 0.85,
          accessibility: 0.9,
          bestPractices: 0.9,
          seo: 0.9,
        },
      );

      expect(result.passed).toBe(false);
      expect(result.failures.length).toBe(2);
    });
  });

  describe("Bundle Budget Checks", () => {
    it("passes within budget", () => {
      const result = _checkBundleBudget(
        [
          { name: "workflow.js", sizeBytes: 120000 },
          { name: "templates.js", sizeBytes: 100000 },
        ],
        {
          maxTotalBytes: 300000,
          maxLargestAssetBytes: 180000,
        },
      );

      expect(result.passed).toBe(true);
      expect(result.totalBytes).toBe(220000);
      expect(result.largestAssetBytes).toBe(120000);
    });

    it("fails when total or largest asset exceeds budget", () => {
      const result = _checkBundleBudget(
        [
          { name: "workflow.js", sizeBytes: 250000 },
          { name: "templates.js", sizeBytes: 200000 },
        ],
        {
          maxTotalBytes: 400000,
          maxLargestAssetBytes: 220000,
        },
      );

      expect(result.passed).toBe(false);
      expect(result.failures.length).toBe(2);
    });
  });

  describe("Web Vitals Tracking", () => {
    it("records vitals and summarizes averages", () => {
      let store = _initializeWebVitalsStore();
      store = _recordWebVital(store, {
        name: "LCP",
        value: 2200,
        page: "/workflows/api-payload-cleanup",
      });
      store = _recordWebVital(store, {
        name: "LCP",
        value: 2400,
        page: "/templates/api-payload-cleanup",
      });
      store = _recordWebVital(store, {
        name: "CLS",
        value: 0.08,
        page: "/workflows/api-payload-cleanup",
      });

      const summary = _summarizeWebVitals(store);
      expect(summary.count).toBe(3);
      expect(summary.averages.LCP).toBe(2300);
      expect(summary.averages.CLS).toBe(0.08);
    });

    it("emits alerts for degraded vitals", () => {
      let store = _initializeWebVitalsStore();
      store = _recordWebVital(store, {
        name: "LCP",
        value: 3000,
        page: "/workflows/api-payload-cleanup",
      });
      store = _recordWebVital(store, {
        name: "CLS",
        value: 0.2,
        page: "/workflows/api-payload-cleanup",
      });
      store = _recordWebVital(store, {
        name: "INP",
        value: 260,
        page: "/workflows/api-payload-cleanup",
      });

      const alerts = _getWebVitalsAlerts(store);
      expect(alerts.some((a) => a.includes("LCP"))).toBe(true);
      expect(alerts.some((a) => a.includes("CLS"))).toBe(true);
      expect(alerts.some((a) => a.includes("INP"))).toBe(true);
    });
  });
});
