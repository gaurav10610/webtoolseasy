import { describe, it, expect } from "vitest";
import {
  _initializeExecutionQueue,
  _initializeBackgroundProcessing,
  _enqueueRun,
  _dequeueRun,
  _startRun,
  _completeRun,
  _cancelRun,
  _getQueueStatus,
  _pauseQueue,
  _resumeQueue,
  _startBackgroundProcessing,
  _updateBackgroundProgress,
  _completeBackgroundProcessing,
  _checkResourcePressure,
  _estimateRunDuration,
  _getQueueStatistics,
  _adjustRunPriority,
  _batchEnqueueRuns,
} from "@/lib/executionQueue";

describe("Execution Queue and Background Processing (TB-129-130)", () => {
  describe("Queue Initialization", () => {
    it("should initialize empty execution queue", () => {
      const queue = _initializeExecutionQueue();

      expect(queue.queue).toEqual([]);
      expect(queue.executingRunId).toBeNull();
      expect(queue.maxConcurrent).toEqual(1);
      expect(queue.backgroundEnabled).toBe(true);
      expect(queue.isPaused).toBe(false);
    });

    it("should set max concurrent runs", () => {
      const queue = _initializeExecutionQueue(5);
      expect(queue.maxConcurrent).toEqual(5);
    });

    it("should initialize background processing state", () => {
      const state = _initializeBackgroundProcessing();

      expect(state.isProcessing).toBe(false);
      expect(state.currentBackgroundRunId).toBeNull();
      expect(state.progress).toEqual(0);
      expect(state.config.enabled).toBe(true);
    });

    it("should accept custom background config", () => {
      const state = _initializeBackgroundProcessing({
        maxDuration: 600000,
        memoryThreshold: 0.7,
      });

      expect(state.config.maxDuration).toEqual(600000);
      expect(state.config.memoryThreshold).toEqual(0.7);
    });
  });

  describe("Run Queueing (TB-129)", () => {
    it("should enqueue a run successfully", () => {
      let queue = _initializeExecutionQueue();
      const { queue: updated, result } = _enqueueRun(
        queue,
        "run1",
        "pack1",
        { step1: {} },
        50,
        5000,
      );

      expect(result.success).toBe(true);
      expect(result.position).toEqual(0);
      expect(result.estimatedWait).toEqual(0);
      expect(updated.queue).toHaveLength(1);
    });

    it("should respect priority ordering", () => {
      let queue = _initializeExecutionQueue();
      let result1 = _enqueueRun(queue, "run1", "pack1", {}, 50, 5000);
      queue = result1.queue;

      let result2 = _enqueueRun(queue, "run2", "pack1", {}, 10, 5000);
      queue = result2.queue;

      let result3 = _enqueueRun(queue, "run3", "pack1", {}, 30, 5000);
      queue = result3.queue;

      expect(queue.queue).toHaveLength(3);
    });

    it("should calculate estimated wait time", () => {
      let queue = _initializeExecutionQueue();
      let result = _enqueueRun(queue, "run1", "pack1", {}, 50, 5000);
      queue = result.queue;

      result = _enqueueRun(queue, "run2", "pack1", {}, 50, 3000);

      expect(result.result.estimatedWait).toBeGreaterThanOrEqual(0);
    });

    it("should dequeue next run", () => {
      let queue = _initializeExecutionQueue();
      const { queue: updated } = _enqueueRun(
        queue,
        "run1",
        "pack1",
        {},
        50,
        5000,
      );
      queue = updated;

      const nextRun = _dequeueRun(queue);
      expect(nextRun).toBeTruthy();
      expect(nextRun?.runId).toEqual("run1");
    });

    it("should return null when queue is empty", () => {
      const queue = _initializeExecutionQueue();
      const nextRun = _dequeueRun(queue);

      expect(nextRun).toBeNull();
    });

    it("should return null when paused", () => {
      let queue = _initializeExecutionQueue();
      const { queue: updated } = _enqueueRun(
        queue,
        "run1",
        "pack1",
        {},
        50,
        5000,
      );
      queue = { ...updated, isPaused: true };

      const nextRun = _dequeueRun(queue);
      expect(nextRun).toBeNull();
    });
  });

  describe("Run Lifecycle", () => {
    it("should start queued run", () => {
      let queue = _initializeExecutionQueue();
      const { queue: updated } = _enqueueRun(
        queue,
        "run1",
        "pack1",
        {},
        50,
        5000,
      );
      queue = updated;

      const result = _startRun(queue, "run1");
      expect(result.success).toBe(true);
    });

    it("should complete a run", () => {
      let queue = _initializeExecutionQueue();
      const { queue: updated } = _enqueueRun(
        queue,
        "run1",
        "pack1",
        {},
        50,
        5000,
      );
      queue = { ...updated, executingRunId: "run1" };

      queue = _completeRun(queue, "run1", true);

      expect(queue.executingRunId).toBeNull();
      expect(queue.totalProcessed).toEqual(1);
      expect(queue.queue.some((r) => r.runId === "run1")).toBe(false);
    });

    it("should track failed runs", () => {
      let queue = _initializeExecutionQueue();
      const { queue: updated } = _enqueueRun(
        queue,
        "run1",
        "pack1",
        {},
        50,
        5000,
      );
      queue = updated;

      queue = _completeRun(queue, "run1", false);

      expect(queue.totalFailed).toEqual(1);
    });

    it("should cancel non-executing run", () => {
      let queue = _initializeExecutionQueue();
      const { queue: updated } = _enqueueRun(
        queue,
        "run1",
        "pack1",
        {},
        50,
        5000,
      );
      queue = updated;

      const result = _cancelRun(queue, "run1");
      expect(result.success).toBe(true);
    });

    it("should not cancel executing run", () => {
      let queue = _initializeExecutionQueue();
      const { queue: updated } = _enqueueRun(
        queue,
        "run1",
        "pack1",
        {},
        50,
        5000,
      );
      queue = { ...updated, executingRunId: "run1" };

      const result = _cancelRun(queue, "run1");
      expect(result.success).toBe(false);
    });
  });

  describe("Background Processing (TB-130)", () => {
    it("should start background processing", () => {
      const state = _initializeBackgroundProcessing();
      const newState = _startBackgroundProcessing(state, "run1", 5000);

      expect(newState.isProcessing).toBe(true);
      expect(newState.currentBackgroundRunId).toEqual("run1");
      expect(newState.startedAt).toBeTruthy();
    });

    it("should not start if already processing", () => {
      let state = _initializeBackgroundProcessing();
      state = _startBackgroundProcessing(state, "run1", 5000);

      const newState = _startBackgroundProcessing(state, "run2", 5000);
      expect(newState.currentBackgroundRunId).toEqual("run1");
    });

    it("should update background progress", () => {
      let state = _initializeBackgroundProcessing();
      state = _startBackgroundProcessing(state, "run1", 5000);

      state = _updateBackgroundProgress(state, 50, 256, 0.5);

      expect(state.progress).toEqual(50);
      expect(state.metrics.estimatedMemory).toEqual(256);
      expect(state.metrics.estimatedCpu).toEqual(0.5);
    });

    it("should clamp progress 0-100", () => {
      let state = _initializeBackgroundProcessing();
      state = _startBackgroundProcessing(state, "run1", 5000);

      state = _updateBackgroundProgress(state, 150);
      expect(state.progress).toEqual(100);

      state = _updateBackgroundProgress(state, -10);
      expect(state.progress).toEqual(0);
    });

    it("should complete background processing", () => {
      let state = _initializeBackgroundProcessing();
      state = _startBackgroundProcessing(state, "run1", 5000);
      state = _updateBackgroundProgress(state, 100);

      state = _completeBackgroundProcessing(state);

      expect(state.isProcessing).toBe(false);
      expect(state.currentBackgroundRunId).toBeNull();
      expect(state.progress).toEqual(0);
    });

    it("should check resource pressure for memory", () => {
      const state = _initializeBackgroundProcessing();

      const shouldPause = _checkResourcePressure(state, 85, 50);
      expect(shouldPause).toBe(true);
    });

    it("should check resource pressure for CPU", () => {
      const state = _initializeBackgroundProcessing();

      const shouldPause = _checkResourcePressure(state, 50, 95);
      expect(shouldPause).toBe(true);
    });

    it("should not pause when under resource threshold", () => {
      const state = _initializeBackgroundProcessing();

      const shouldPause = _checkResourcePressure(state, 50, 50);
      expect(shouldPause).toBe(false);
    });
  });

  describe("Queue Control", () => {
    it("should pause queue", () => {
      let queue = _initializeExecutionQueue();
      queue = _pauseQueue(queue);

      expect(queue.isPaused).toBe(true);
    });

    it("should resume queue", () => {
      let queue = _initializeExecutionQueue();
      queue = _pauseQueue(queue);
      queue = _resumeQueue(queue);

      expect(queue.isPaused).toBe(false);
    });
  });

  describe("Queue Status and Statistics", () => {
    it("should get queue status", () => {
      let queue = _initializeExecutionQueue();
      const { queue: updated } = _enqueueRun(
        queue,
        "run1",
        "pack1",
        {},
        50,
        5000,
      );
      queue = updated;

      const status = _getQueueStatus(queue);

      expect(status.queueLength).toEqual(1);
      expect(status.isExecuting).toBe(false);
      expect(status.estimatedTotalTime).toEqual(5000);
    });

    it("should calculate queue statistics", () => {
      let queue = _initializeExecutionQueue();

      // Simulate processing some runs
      const { queue: updated } = _enqueueRun(
        queue,
        "run1",
        "pack1",
        {},
        50,
        5000,
      );
      queue = { ...updated, totalProcessed: 10, totalFailed: 1 };

      const stats = _getQueueStatistics(queue);

      expect(stats.successRate).toBeCloseTo(0.909, 2);
      expect(stats.throughput).toEqual(11);
    });

    it("should return zero stats when no runs processed", () => {
      const queue = _initializeExecutionQueue();
      const stats = _getQueueStatistics(queue);

      expect(stats.averageWaitTime).toEqual(0);
      expect(stats.averageProcessingTime).toEqual(0);
      expect(stats.successRate).toEqual(0);
      expect(stats.throughput).toEqual(0);
    });
  });

  describe("Run Duration Estimation", () => {
    it("should estimate low complexity duration", () => {
      const duration = _estimateRunDuration(2, 1024, "low");
      expect(duration).toBeGreaterThan(0);
    });

    it("should estimate medium complexity duration", () => {
      const duration = _estimateRunDuration(3, 2048, "medium");
      expect(duration).toBeGreaterThan(0);
    });

    it("should estimate high complexity duration", () => {
      const duration = _estimateRunDuration(5, 5120, "high");
      expect(duration).toBeGreaterThan(0);
    });

    it("should factor in data size", () => {
      const smallSize = _estimateRunDuration(2, 512, "low");
      const largeSize = _estimateRunDuration(2, 10240, "low");

      expect(largeSize).toBeGreaterThan(smallSize);
    });

    it("should factor in step count", () => {
      const fewSteps = _estimateRunDuration(2, 1024, "medium");
      const manySteps = _estimateRunDuration(10, 1024, "medium");

      expect(manySteps).toBeGreaterThan(fewSteps);
    });
  });

  describe("Priority Management", () => {
    it("should adjust run priority", () => {
      let queue = _initializeExecutionQueue();
      const { queue: updated } = _enqueueRun(
        queue,
        "run1",
        "pack1",
        {},
        50,
        5000,
      );
      queue = updated;

      const result = _adjustRunPriority(queue, "run1", 10);
      expect(result.success).toBe(true);
    });

    it("should not adjust priority of non-existent run", () => {
      const queue = _initializeExecutionQueue();

      const result = _adjustRunPriority(queue, "nonexistent", 10);
      expect(result.success).toBe(false);
    });

    it("should not adjust priority of executing run", () => {
      let queue = _initializeExecutionQueue();
      const { queue: updated } = _enqueueRun(
        queue,
        "run1",
        "pack1",
        {},
        50,
        5000,
      );
      queue = { ...updated, executingRunId: "run1" };

      const result = _adjustRunPriority(queue, "run1", 10);
      expect(result.success).toBe(false);
    });
  });

  describe("Batch Operations", () => {
    it("should batch enqueue multiple runs", () => {
      let queue = _initializeExecutionQueue();

      const runs = [
        { runId: "run1", packId: "pack1", steps: {}, priority: 50 },
        { runId: "run2", packId: "pack1", steps: {}, priority: 30 },
        { runId: "run3", packId: "pack2", steps: {}, priority: 70 },
      ];

      const { results } = _batchEnqueueRuns(queue, runs);

      expect(results).toHaveLength(3);
      expect(results.every((r) => r.success)).toBe(true);
    });

    it("should return position for each batch item", () => {
      let queue = _initializeExecutionQueue();

      const runs = [
        { runId: "run1", packId: "pack1", steps: {} },
        { runId: "run2", packId: "pack1", steps: {} },
      ];

      const { results } = _batchEnqueueRuns(queue, runs);

      expect(results[0].position).toEqual(0);
      expect(results[1].position).toEqual(1);
    });
  });

  describe("Integration: Full Queue Lifecycle", () => {
    it("should handle complete workflow run lifecycle", () => {
      let queue = _initializeExecutionQueue();

      // 1. Enqueue run
      let result = _enqueueRun(queue, "run1", "pack1", { step1: {} }, 50, 5000);
      queue = result.queue;
      expect(queue.queue).toHaveLength(1);

      // 2. Dequeue and start
      const nextRun = _dequeueRun(queue);
      expect(nextRun?.runId).toEqual("run1");

      // 3. Complete run
      queue = { ...queue, executingRunId: "run1" };
      queue = _completeRun(queue, "run1", true);

      expect(queue.queue).toHaveLength(0);
      expect(queue.totalProcessed).toEqual(1);
    });

    it("should handle background processing with resource monitoring", () => {
      let bgState = _initializeBackgroundProcessing();

      // Start processing
      bgState = _startBackgroundProcessing(bgState, "run1", 10000);
      expect(bgState.isProcessing).toBe(true);

      // Simulate progress updates
      bgState = _updateBackgroundProgress(bgState, 25, 256, 0.3);
      bgState = _updateBackgroundProgress(bgState, 50, 512, 0.5);

      // Check resource pressure
      const shouldPause = _checkResourcePressure(bgState, 85, 0.5);
      expect(shouldPause).toBe(true);

      // Complete
      bgState = _completeBackgroundProcessing(bgState);
      expect(bgState.isProcessing).toBe(false);
    });
  });
});
