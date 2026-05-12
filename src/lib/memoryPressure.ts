/**
 * TB-132: Memory pressure monitoring for browsers
 * Detects memory constraints and triggers workflow throttling/warnings
 */

export interface MemoryMetrics {
  /** Available memory in MB (from Performance API) */
  available: number;
  /** Total memory (estimated) in MB */
  total: number;
  /** Used memory in MB (estimated) */
  used: number;
  /** Memory pressure percentage (0-100) */
  pressure: number;
  /** Is memory pressure critical */
  isCritical: boolean;
  /** Timestamp of measurement */
  measuredAt: Date;
}

export interface MemoryWarning {
  /** Warning level: low, medium, high, critical */
  level: "low" | "medium" | "high" | "critical";
  /** Human-readable message */
  message: string;
  /** Recommended action */
  action: string;
  /** Memory pressure that triggered this */
  pressure: number;
}

export interface MemoryThresholds {
  /** Low memory threshold (MB) */
  low: number;
  /** Medium memory threshold (MB) */
  medium: number;
  /** High memory threshold (MB) */
  high: number;
  /** Critical memory threshold (MB) */
  critical: number;
}

export interface MemoryMonitorConfig {
  /** Check interval in milliseconds */
  checkInterval: number;
  /** Enable automatic throttling */
  enableThrottling: boolean;
  /** Memory pressure thresholds */
  thresholds: MemoryThresholds;
  /** Max retries before giving up */
  maxRetries: number;
  /** Callback on warning threshold */
  onWarning?: (warning: MemoryWarning) => void;
  /** Callback on critical threshold */
  onCritical?: (warning: MemoryWarning) => void;
}

export interface MemoryMonitorState {
  /** Configuration */
  config: MemoryMonitorConfig;
  /** Current metrics */
  currentMetrics: MemoryMetrics | null;
  /** Historical metrics (last 10) */
  history: MemoryMetrics[];
  /** Is monitoring active */
  isMonitoring: boolean;
  /** Monitor interval ID */
  intervalId: NodeJS.Timeout | null;
  /** Last warning issued */
  lastWarning: MemoryWarning | null;
  /** Warning count */
  warningCount: number;
  /** Whether memory is throttled */
  isThrottled: boolean;
  /** Throttle level (0-100) */
  throttleLevel: number;
}

export const DEFAULT_MEMORY_THRESHOLDS: MemoryThresholds = {
  low: 100, // 100MB available
  medium: 50, // 50MB available
  high: 25, // 25MB available
  critical: 10, // 10MB available
};

export const DEFAULT_MONITOR_CONFIG: MemoryMonitorConfig = {
  checkInterval: 5000, // 5 seconds
  enableThrottling: true,
  thresholds: DEFAULT_MEMORY_THRESHOLDS,
  maxRetries: 3,
};

/**
 * Initialize memory monitor state
 */
export function _initializeMemoryMonitor(
  config: Partial<MemoryMonitorConfig> = {},
): MemoryMonitorState {
  return {
    config: { ...DEFAULT_MONITOR_CONFIG, ...config },
    currentMetrics: null,
    history: [],
    isMonitoring: false,
    intervalId: null,
    lastWarning: null,
    warningCount: 0,
    isThrottled: false,
    throttleLevel: 0,
  };
}

/**
 * Get current memory metrics (uses Performance API if available)
 */
export function _getMemoryMetrics(): MemoryMetrics {
  const now = new Date();

  // Check if Performance API with memory info is available
  const perf = (performance as any).memory;

  if (perf) {
    // jsHeapSizeLimit is total allocated, jsHeapUsedSize is currently used
    const total = perf.jsHeapSizeLimit / (1024 * 1024); // Convert to MB
    const used = perf.jsHeapUsedSize / (1024 * 1024); // Convert to MB
    const available = total - used;
    const pressure = (used / total) * 100;

    return {
      available: Math.round(available * 10) / 10,
      total: Math.round(total * 10) / 10,
      used: Math.round(used * 10) / 10,
      pressure: Math.round(pressure * 10) / 10,
      isCritical: available < 10, // Less than 10MB available
      measuredAt: now,
    };
  }

  // Fallback: estimate based on typical browser constraints
  // This is a rough estimation when Performance API is not available
  return {
    available: 256, // Assume 256MB available as default
    total: 512, // Assume 512MB total
    used: 256,
    pressure: 50,
    isCritical: false,
    measuredAt: now,
  };
}

/**
 * Evaluate memory pressure and generate warning if needed
 */
export function _evaluateMemoryPressure(
  metrics: MemoryMetrics,
  thresholds: MemoryThresholds,
): MemoryWarning | null {
  if (metrics.available < thresholds.critical) {
    return {
      level: "critical",
      message: `Critical memory pressure: Only ${metrics.available}MB available`,
      action: "Stop running workflows immediately and clear cache",
      pressure: metrics.pressure,
    };
  }

  if (metrics.available < thresholds.high) {
    return {
      level: "high",
      message: `High memory pressure: ${metrics.available}MB available`,
      action: "Consider pausing background tasks or clearing cache",
      pressure: metrics.pressure,
    };
  }

  if (metrics.available < thresholds.medium) {
    return {
      level: "medium",
      message: `Medium memory pressure: ${metrics.available}MB available`,
      action: "Monitor memory usage closely",
      pressure: metrics.pressure,
    };
  }

  if (metrics.available < thresholds.low) {
    return {
      level: "low",
      message: `Low memory pressure: ${metrics.available}MB available`,
      action: "Performance may be degraded",
      pressure: metrics.pressure,
    };
  }

  return null;
}

/**
 * Update memory monitor with new metrics
 */
export function _updateMemoryMetrics(
  state: MemoryMonitorState,
  metrics: MemoryMetrics,
): MemoryMonitorState {
  const updatedHistory = [...state.history, metrics];

  // Keep only last 10 measurements
  if (updatedHistory.length > 10) {
    updatedHistory.shift();
  }

  // Evaluate pressure
  const warning = _evaluateMemoryPressure(metrics, state.config.thresholds);

  let updatedState = {
    ...state,
    currentMetrics: metrics,
    history: updatedHistory,
  };

  if (warning && warning.level !== state.lastWarning?.level) {
    updatedState = {
      ...updatedState,
      lastWarning: warning,
      warningCount: state.warningCount + 1,
    };

    // Apply throttling if critical
    if (warning.level === "critical" && state.config.enableThrottling) {
      updatedState = {
        ...updatedState,
        isThrottled: true,
        throttleLevel: 100,
      };
    }
  }

  return updatedState;
}

/**
 * Get memory pressure level (0-100)
 */
export function _getMemoryPressureLevel(metrics: MemoryMetrics): number {
  return Math.round(metrics.pressure * 10) / 10;
}

/**
 * Check if memory is critically low
 */
export function _isMemoryCritical(
  metrics: MemoryMetrics,
  threshold: number = 10,
): boolean {
  return metrics.available < threshold;
}

/**
 * Estimate recovery time based on memory trend
 */
export function _estimateMemoryRecoveryTime(history: MemoryMetrics[]): number {
  if (history.length < 2) {
    return 0;
  }

  const recent = history.slice(-5);
  if (recent.length < 2) {
    return 0;
  }

  // Calculate trend (bytes/second)
  const first = recent[0];
  const last = recent[recent.length - 1];
  const timeDiffSecs =
    (last.measuredAt.getTime() - first.measuredAt.getTime()) / 1000;
  const usedDiff = last.used - first.used;
  const trendMBPerSec = usedDiff / timeDiffSecs;

  // If trend is negative (memory being freed), estimate recovery time
  if (trendMBPerSec < 0) {
    const criticalThreshold = 10;
    const timeToRecovery =
      (last.available - criticalThreshold) / Math.abs(trendMBPerSec);
    return Math.max(0, Math.round(timeToRecovery * 1000)); // Convert to ms
  }

  return 0; // Memory is not being freed
}

/**
 * Apply memory throttling to workflow
 */
export function _applyMemoryThrottling(
  state: MemoryMonitorState,
  throttleLevel: number = 50,
): MemoryMonitorState {
  const clampedLevel = Math.min(100, Math.max(0, throttleLevel));

  return {
    ...state,
    isThrottled: true,
    throttleLevel: clampedLevel,
  };
}

/**
 * Release memory throttling
 */
export function _releaseMemoryThrottling(
  state: MemoryMonitorState,
): MemoryMonitorState {
  return {
    ...state,
    isThrottled: false,
    throttleLevel: 0,
  };
}

/**
 * Get memory statistics
 */
export function _getMemoryStats(history: MemoryMetrics[]): {
  currentUsage: number;
  averageUsage: number;
  peakUsage: number;
  lowestAvailable: number;
  averagePressure: number;
} {
  if (history.length === 0) {
    return {
      currentUsage: 0,
      averageUsage: 0,
      peakUsage: 0,
      lowestAvailable: 0,
      averagePressure: 0,
    };
  }

  const current = history[history.length - 1];
  const avgUsed = history.reduce((sum, m) => sum + m.used, 0) / history.length;
  const peakUsed = Math.max(...history.map((m) => m.used));
  const lowestAvail = Math.min(...history.map((m) => m.available));
  const avgPressure =
    history.reduce((sum, m) => sum + m.pressure, 0) / history.length;

  return {
    currentUsage: current.used,
    averageUsage: Math.round(avgUsed * 10) / 10,
    peakUsage: Math.round(peakUsed * 10) / 10,
    lowestAvailable: Math.round(lowestAvail * 10) / 10,
    averagePressure: Math.round(avgPressure * 10) / 10,
  };
}

/**
 * Format memory size for display
 */
export function _formatMemorySize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)}KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(2)}MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)}GB`;
}

/**
 * Get memory pressure category
 */
export function _getMemoryCategory(
  metrics: MemoryMetrics,
): "healthy" | "warning" | "critical" {
  if (metrics.isCritical) {
    return "critical";
  }
  if (metrics.pressure > 80) {
    return "warning";
  }
  return "healthy";
}

/**
 * Should workflow be paused due to memory
 */
export function _shouldPauseWorkflow(
  metrics: MemoryMetrics,
  criticalThreshold: number = 10,
): boolean {
  return metrics.available < criticalThreshold;
}

/**
 * Can new task be queued given memory constraints
 */
export function _canQueueTask(
  metrics: MemoryMetrics,
  estimatedTaskSize: number,
  safetyMargin: number = 20,
): boolean {
  // Require at least estimatedTaskSize + safetyMargin MB available
  return metrics.available > estimatedTaskSize + safetyMargin;
}

/**
 * Get recommended cache flush size based on memory pressure
 */
export function _getRecommendedCacheFlushSize(metrics: MemoryMetrics): number {
  if (metrics.available < 10) {
    return metrics.used * 0.5; // Flush 50% of cache
  }
  if (metrics.available <= 30) {
    return metrics.used * 0.25; // Flush 25% of cache
  }
  if (metrics.available < 50) {
    return metrics.used * 0.1; // Flush 10% of cache
  }
  return 0; // No cache flush needed
}
