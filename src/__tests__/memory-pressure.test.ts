import { describe, it, expect } from "vitest";
import {
  _initializeMemoryMonitor,
  _getMemoryMetrics,
  _evaluateMemoryPressure,
  _updateMemoryMetrics,
  _getMemoryPressureLevel,
  _isMemoryCritical,
  _estimateMemoryRecoveryTime,
  _applyMemoryThrottling,
  _releaseMemoryThrottling,
  _getMemoryStats,
  _formatMemorySize,
  _getMemoryCategory,
  _shouldPauseWorkflow,
  _canQueueTask,
  _getRecommendedCacheFlushSize,
  DEFAULT_MEMORY_THRESHOLDS,
} from "@/lib/memoryPressure";

describe("Memory Pressure Monitoring for Browsers (TB-132)", () => {
  describe("Monitor Initialization", () => {
    it("should initialize memory monitor with defaults", () => {
      const monitor = _initializeMemoryMonitor();

      expect(monitor.isMonitoring).toBe(false);
      expect(monitor.currentMetrics).toBeNull();
      expect(monitor.history).toEqual([]);
      expect(monitor.warningCount).toEqual(0);
      expect(monitor.isThrottled).toBe(false);
    });

    it("should initialize with custom config", () => {
      const monitor = _initializeMemoryMonitor({
        checkInterval: 10000,
        enableThrottling: false,
      });

      expect(monitor.config.checkInterval).toEqual(10000);
      expect(monitor.config.enableThrottling).toBe(false);
    });
  });

  describe("Memory Metrics Collection", () => {
    it("should collect memory metrics", () => {
      const metrics = _getMemoryMetrics();

      expect(metrics.available).toBeGreaterThanOrEqual(0);
      expect(metrics.total).toBeGreaterThanOrEqual(metrics.used);
      expect(metrics.pressure).toBeGreaterThanOrEqual(0);
      expect(metrics.pressure).toBeLessThanOrEqual(100);
      expect(metrics.measuredAt).toBeInstanceOf(Date);
    });

    it("should have reasonable values", () => {
      const metrics = _getMemoryMetrics();

      expect(metrics.used + metrics.available).toBeLessThanOrEqual(
        metrics.total * 1.01,
      ); // Allow 1% margin
      expect(metrics.isCritical).toEqual(metrics.available < 10);
    });
  });

  describe("Memory Pressure Evaluation", () => {
    it("should not warn for healthy memory", () => {
      const metrics = {
        available: 200,
        total: 512,
        used: 312,
        pressure: 60,
        isCritical: false,
        measuredAt: new Date(),
      };

      const warning = _evaluateMemoryPressure(
        metrics,
        DEFAULT_MEMORY_THRESHOLDS,
      );

      expect(warning).toBeNull();
    });

    it("should warn for low memory", () => {
      const metrics = {
        available: 80,
        total: 512,
        used: 432,
        pressure: 84,
        isCritical: false,
        measuredAt: new Date(),
      };

      const warning = _evaluateMemoryPressure(
        metrics,
        DEFAULT_MEMORY_THRESHOLDS,
      );

      expect(warning).toBeTruthy();
      expect(warning?.level).toEqual("low");
    });

    it("should warn for medium memory pressure", () => {
      const metrics = {
        available: 40,
        total: 512,
        used: 472,
        pressure: 92,
        isCritical: false,
        measuredAt: new Date(),
      };

      const warning = _evaluateMemoryPressure(
        metrics,
        DEFAULT_MEMORY_THRESHOLDS,
      );

      expect(warning?.level).toEqual("medium");
    });

    it("should warn for high memory pressure", () => {
      const metrics = {
        available: 20,
        total: 512,
        used: 492,
        pressure: 96,
        isCritical: false,
        measuredAt: new Date(),
      };

      const warning = _evaluateMemoryPressure(
        metrics,
        DEFAULT_MEMORY_THRESHOLDS,
      );

      expect(warning?.level).toEqual("high");
    });

    it("should warn for critical memory pressure", () => {
      const metrics = {
        available: 5,
        total: 512,
        used: 507,
        pressure: 99,
        isCritical: true,
        measuredAt: new Date(),
      };

      const warning = _evaluateMemoryPressure(
        metrics,
        DEFAULT_MEMORY_THRESHOLDS,
      );

      expect(warning?.level).toEqual("critical");
      expect(warning?.message).toContain("Critical");
    });
  });

  describe("Memory Monitor Updates", () => {
    it("should update metrics and track history", () => {
      let monitor = _initializeMemoryMonitor();

      const metrics1 = {
        available: 200,
        total: 512,
        used: 312,
        pressure: 60,
        isCritical: false,
        measuredAt: new Date(),
      };

      monitor = _updateMemoryMetrics(monitor, metrics1);

      expect(monitor.currentMetrics).toEqual(metrics1);
      expect(monitor.history).toHaveLength(1);
    });

    it("should generate warning on threshold breach", () => {
      let monitor = _initializeMemoryMonitor();

      const criticalMetrics = {
        available: 5,
        total: 512,
        used: 507,
        pressure: 99,
        isCritical: true,
        measuredAt: new Date(),
      };

      monitor = _updateMemoryMetrics(monitor, criticalMetrics);

      expect(monitor.lastWarning).toBeTruthy();
      expect(monitor.lastWarning?.level).toEqual("critical");
      expect(monitor.warningCount).toEqual(1);
    });

    it("should enable throttling on critical memory", () => {
      let monitor = _initializeMemoryMonitor({ enableThrottling: true });

      const criticalMetrics = {
        available: 5,
        total: 512,
        used: 507,
        pressure: 99,
        isCritical: true,
        measuredAt: new Date(),
      };

      monitor = _updateMemoryMetrics(monitor, criticalMetrics);

      expect(monitor.isThrottled).toBe(true);
    });

    it("should keep only last 10 measurements", () => {
      let monitor = _initializeMemoryMonitor();

      for (let i = 0; i < 15; i++) {
        const metrics = {
          available: 200 - i * 10,
          total: 512,
          used: 312 + i * 10,
          pressure: 60 + i,
          isCritical: false,
          measuredAt: new Date(),
        };
        monitor = _updateMemoryMetrics(monitor, metrics);
      }

      expect(monitor.history.length).toBeLessThanOrEqual(10);
    });
  });

  describe("Memory Pressure Level", () => {
    it("should calculate pressure level", () => {
      const metrics = {
        available: 100,
        total: 512,
        used: 412,
        pressure: 80.5,
        isCritical: false,
        measuredAt: new Date(),
      };

      const level = _getMemoryPressureLevel(metrics);

      expect(level).toEqual(80.5);
    });

    it("should identify critical memory", () => {
      const lowMemory = {
        available: 5,
        total: 512,
        used: 507,
        pressure: 99,
        isCritical: true,
        measuredAt: new Date(),
      };

      expect(_isMemoryCritical(lowMemory)).toBe(true);

      const healthyMemory = {
        available: 200,
        total: 512,
        used: 312,
        pressure: 60,
        isCritical: false,
        measuredAt: new Date(),
      };

      expect(_isMemoryCritical(healthyMemory)).toBe(false);
    });
  });

  describe("Memory Recovery Estimation", () => {
    it("should estimate recovery time", () => {
      const history = [
        {
          available: 50,
          total: 512,
          used: 462,
          pressure: 90,
          isCritical: false,
          measuredAt: new Date(Date.now() - 10000),
        },
        {
          available: 60,
          total: 512,
          used: 452,
          pressure: 88,
          isCritical: false,
          measuredAt: new Date(Date.now() - 5000),
        },
        {
          available: 70,
          total: 512,
          used: 442,
          pressure: 86,
          isCritical: false,
          measuredAt: new Date(),
        },
      ];

      const recoveryTime = _estimateMemoryRecoveryTime(history);

      expect(recoveryTime).toBeGreaterThanOrEqual(0);
    });

    it("should return 0 for insufficient history", () => {
      const recovery = _estimateMemoryRecoveryTime([]);
      expect(recovery).toEqual(0);
    });
  });

  describe("Throttling Control", () => {
    it("should apply memory throttling", () => {
      let monitor = _initializeMemoryMonitor();

      monitor = _applyMemoryThrottling(monitor, 75);

      expect(monitor.isThrottled).toBe(true);
      expect(monitor.throttleLevel).toEqual(75);
    });

    it("should clamp throttle level 0-100", () => {
      let monitor = _initializeMemoryMonitor();

      monitor = _applyMemoryThrottling(monitor, 150);
      expect(monitor.throttleLevel).toEqual(100);

      monitor = _applyMemoryThrottling(monitor, -50);
      expect(monitor.throttleLevel).toEqual(0);
    });

    it("should release throttling", () => {
      let monitor = _initializeMemoryMonitor();
      monitor = _applyMemoryThrottling(monitor, 50);

      monitor = _releaseMemoryThrottling(monitor);

      expect(monitor.isThrottled).toBe(false);
      expect(monitor.throttleLevel).toEqual(0);
    });
  });

  describe("Memory Statistics", () => {
    it("should calculate memory stats", () => {
      const history = [
        {
          available: 200,
          total: 512,
          used: 312,
          pressure: 60,
          isCritical: false,
          measuredAt: new Date(),
        },
        {
          available: 180,
          total: 512,
          used: 332,
          pressure: 64,
          isCritical: false,
          measuredAt: new Date(),
        },
        {
          available: 150,
          total: 512,
          used: 362,
          pressure: 70,
          isCritical: false,
          measuredAt: new Date(),
        },
      ];

      const stats = _getMemoryStats(history);

      expect(stats.currentUsage).toEqual(362);
      expect(stats.averageUsage).toBeCloseTo(335.3, 1);
      expect(stats.peakUsage).toEqual(362);
      expect(stats.lowestAvailable).toEqual(150);
    });

    it("should return zeros for empty history", () => {
      const stats = _getMemoryStats([]);

      expect(stats.currentUsage).toEqual(0);
      expect(stats.averageUsage).toEqual(0);
      expect(stats.peakUsage).toEqual(0);
    });
  });

  describe("Utility Functions", () => {
    it("should format memory size", () => {
      expect(_formatMemorySize(512)).toContain("B");
      expect(_formatMemorySize(1024)).toContain("KB");
      expect(_formatMemorySize(1024 * 1024)).toContain("MB");
    });

    it("should categorize memory status", () => {
      const healthy = {
        available: 200,
        total: 512,
        used: 312,
        pressure: 60,
        isCritical: false,
        measuredAt: new Date(),
      };

      expect(_getMemoryCategory(healthy)).toEqual("healthy");

      const warning = {
        available: 50,
        total: 512,
        used: 462,
        pressure: 90,
        isCritical: false,
        measuredAt: new Date(),
      };

      expect(_getMemoryCategory(warning)).toEqual("warning");

      const critical = {
        available: 5,
        total: 512,
        used: 507,
        pressure: 99,
        isCritical: true,
        measuredAt: new Date(),
      };

      expect(_getMemoryCategory(critical)).toEqual("critical");
    });

    it("should determine if workflow should pause", () => {
      const healthyMetrics = {
        available: 100,
        total: 512,
        used: 412,
        pressure: 80,
        isCritical: false,
        measuredAt: new Date(),
      };

      expect(_shouldPauseWorkflow(healthyMetrics)).toBe(false);

      const criticalMetrics = {
        available: 5,
        total: 512,
        used: 507,
        pressure: 99,
        isCritical: true,
        measuredAt: new Date(),
      };

      expect(_shouldPauseWorkflow(criticalMetrics)).toBe(true);
    });

    it("should determine if task can be queued", () => {
      const enoughMemory = {
        available: 100,
        total: 512,
        used: 412,
        pressure: 80,
        isCritical: false,
        measuredAt: new Date(),
      };

      expect(_canQueueTask(enoughMemory, 50)).toBe(true);

      const limitedMemory = {
        available: 50,
        total: 512,
        used: 462,
        pressure: 90,
        isCritical: false,
        measuredAt: new Date(),
      };

      expect(_canQueueTask(limitedMemory, 50)).toBe(false);
    });

    it("should recommend cache flush size", () => {
      const criticalMemory = {
        available: 5,
        total: 512,
        used: 507,
        pressure: 99,
        isCritical: true,
        measuredAt: new Date(),
      };

      const flushSize = _getRecommendedCacheFlushSize(criticalMemory);
      expect(flushSize).toEqual(507 * 0.5); // 50%

      const lowMemory = {
        available: 30,
        total: 512,
        used: 482,
        pressure: 94,
        isCritical: false,
        measuredAt: new Date(),
      };

      const lowFlush = _getRecommendedCacheFlushSize(lowMemory);
      expect(lowFlush).toEqual(482 * 0.25); // 25%

      const healthyMemory = {
        available: 200,
        total: 512,
        used: 312,
        pressure: 60,
        isCritical: false,
        measuredAt: new Date(),
      };

      const noFlush = _getRecommendedCacheFlushSize(healthyMemory);
      expect(noFlush).toEqual(0);
    });
  });

  describe("Integration: Full Monitoring Lifecycle", () => {
    it("should handle complete monitoring scenario", () => {
      let monitor = _initializeMemoryMonitor({ enableThrottling: true });

      // Simulate memory pressure over time
      const scenario = [
        { available: 200, used: 312, pressure: 60 }, // Healthy
        { available: 180, used: 332, pressure: 65 }, // Still okay
        { available: 100, used: 412, pressure: 80 }, // Warning
        { available: 50, used: 462, pressure: 90 }, // High pressure
        { available: 8, used: 504, pressure: 98 }, // Critical
      ];

      for (const data of scenario) {
        const metrics = {
          ...data,
          total: 512,
          isCritical: data.available < 10,
          measuredAt: new Date(),
        };
        monitor = _updateMemoryMetrics(monitor, metrics);
      }

      // Should have tracked escalating warnings
      expect(monitor.history).toHaveLength(scenario.length);
      expect(monitor.lastWarning?.level).toEqual("critical");
      expect(monitor.isThrottled).toBe(true);

      // Check stats
      const stats = _getMemoryStats(monitor.history);
      expect(stats.peakUsage).toEqual(504);
      expect(stats.lowestAvailable).toEqual(8);
    });
  });
});
