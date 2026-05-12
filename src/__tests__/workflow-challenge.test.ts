import { describe, expect, it } from "vitest";
import {
  _buildChallengeNarrative,
  _captureBenchmarkEvent,
  _computeBenchmarkDelta,
  _initializeAggregateBenchmark,
  _initializeChallengeStory,
  _sanitizeBenchmarkPayload,
} from "@/lib/workflowChallenge";

describe("Workflow Challenge & Benchmarking (TB-144/TB-145)", () => {
  it("initializes challenge story", () => {
    const story = _initializeChallengeStory({
      workflowSlug: "api-payload-cleanup",
      title: "API cleanup challenge",
      beforeSummary: "Manual cleanup took too long.",
      afterSummary: "Workflow automates normalization.",
    });

    expect(story.workflowSlug).toBe("api-payload-cleanup");
    expect(story.title).toContain("challenge");
  });

  it("initializes aggregate benchmark state", () => {
    const aggregate = _initializeAggregateBenchmark("api-payload-cleanup");
    expect(aggregate.totals.events).toBe(0);
    expect(aggregate.workflowSlug).toBe("api-payload-cleanup");
  });

  it("captures benchmark events in aggregate-only mode", () => {
    const aggregate = _captureBenchmarkEvent(
      _initializeAggregateBenchmark("api-payload-cleanup"),
      {
        metricName: "processing_time",
        beforeValue: 120,
        afterValue: 35,
        unit: "ms",
        sampleSize: 10,
        capturedAt: new Date(),
      },
    );

    expect(aggregate.totals.events).toBe(1);
    expect(aggregate.metrics.processing_time.sampleSize).toBe(10);
  });

  it("computes benchmark deltas", () => {
    let aggregate = _initializeAggregateBenchmark("api-payload-cleanup");
    aggregate = _captureBenchmarkEvent(aggregate, {
      metricName: "processing_time",
      beforeValue: 200,
      afterValue: 100,
      unit: "ms",
      sampleSize: 10,
      capturedAt: new Date(),
    });

    const deltas = _computeBenchmarkDelta(aggregate);
    expect(deltas).toHaveLength(1);
    expect(deltas[0].improvement).toBeGreaterThan(0);
  });

  it("builds challenge narrative with highlights", () => {
    const story = _initializeChallengeStory({
      workflowSlug: "api-payload-cleanup",
      title: "Payload cleanup",
      beforeSummary: "Before",
      afterSummary: "After",
    });

    let aggregate = _initializeAggregateBenchmark("api-payload-cleanup");
    aggregate = _captureBenchmarkEvent(aggregate, {
      metricName: "error_rate",
      beforeValue: 40,
      afterValue: 5,
      unit: "percent",
      sampleSize: 10,
      capturedAt: new Date(),
    });

    const narrative = _buildChallengeNarrative(story, aggregate);
    expect(narrative.headline).toContain("improvement");
    expect(narrative.highlights.length).toBeGreaterThan(0);
  });

  it("sanitizes benchmark payload and drops sensitive fields", () => {
    const result = _sanitizeBenchmarkPayload({
      workflowSlug: "api-payload-cleanup",
      sampleSize: 25,
      rawFileContent: "secret",
      apiKey: "abc",
      nested: { nope: true },
    });

    expect(result.safe.workflowSlug).toBe("api-payload-cleanup");
    expect(result.safe.sampleSize).toBe(25);
    expect(result.droppedKeys).toContain("rawFileContent");
    expect(result.droppedKeys).toContain("apiKey");
    expect(result.droppedKeys).toContain("nested");
  });
});
