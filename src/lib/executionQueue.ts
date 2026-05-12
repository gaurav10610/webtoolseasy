/**
 * TB-129-130: Execution queue and background processing for workflow runs
 * Handles multi-run requests gracefully with queue management and optional background processing
 */

export interface QueuedRun {
  /** Unique run ID */
  runId: string;
  /** Workflow pack identifier */
  packId: string;
  /** Timestamp when queued */
  queuedAt: Date;
  /** Steps configuration for this run */
  steps: Record<string, unknown>;
  /** Priority level (0 = highest, 100 = lowest) */
  priority: number;
  /** Whether this run is executing in background */
  isBackground: boolean;
  /** Estimated completion time in ms */
  estimatedDuration: number;
}

export interface ExecutionQueue {
  /** All queued runs (oldest first) */
  queue: QueuedRun[];
  /** Currently executing run ID */
  executingRunId: string | null;
  /** Maximum concurrent runs */
  maxConcurrent: number;
  /** Whether background execution is enabled */
  backgroundEnabled: boolean;
  /** Pause/resume flag */
  isPaused: boolean;
  /** Total processed count in this session */
  totalProcessed: number;
  /** Failed count in this session */
  totalFailed: number;
}

export interface QueueResult {
  success: boolean;
  runId: string;
  position: number;
  estimatedWait: number;
  message: string;
}

export interface BackgroundProcessingConfig {
  /** Enable background processing of queued runs */
  enabled: boolean;
  /** Max duration for background processing (ms) */
  maxDuration: number;
  /** Polling interval to check queue (ms) */
  pollInterval: number;
  /** Memory pressure threshold (0-1) to pause background processing */
  memoryThreshold: number;
  /** Whether to show background progress badge */
  showProgressBadge: boolean;
}

export interface ResourceMetrics {
  /** Estimated memory usage (MB) */
  estimatedMemory: number;
  /** Estimated CPU usage (0-1) */
  estimatedCpu: number;
  /** Estimated time to completion (ms) */
  estimatedTime: number;
  /** System memory available (MB) */
  systemMemoryAvailable: number;
}

export interface BackgroundProcessingState {
  /** Whether processing is active */
  isProcessing: boolean;
  /** Current background run ID */
  currentBackgroundRunId: string | null;
  /** Processing start time */
  startedAt: Date | null;
  /** Progress percentage (0-100) */
  progress: number;
  /** Queued runs waiting for background processing */
  backgroundQueue: QueuedRun[];
  /** Configuration */
  config: BackgroundProcessingConfig;
  /** Resource metrics */
  metrics: ResourceMetrics;
}

/**
 * Initialize execution queue with default configuration
 */
export function _initializeExecutionQueue(
  maxConcurrent: number = 1,
  backgroundEnabled: boolean = true,
): ExecutionQueue {
  return {
    queue: [],
    executingRunId: null,
    maxConcurrent,
    backgroundEnabled,
    isPaused: false,
    totalProcessed: 0,
    totalFailed: 0,
  };
}

/**
 * Initialize background processing state
 */
export function _initializeBackgroundProcessing(
  config: Partial<BackgroundProcessingConfig> = {},
): BackgroundProcessingState {
  const defaultConfig: BackgroundProcessingConfig = {
    enabled: true,
    maxDuration: 300000, // 5 minutes
    pollInterval: 500, // 500ms
    memoryThreshold: 0.8, // 80% system memory
    showProgressBadge: true,
    ...config,
  };

  return {
    isProcessing: false,
    currentBackgroundRunId: null,
    startedAt: null,
    progress: 0,
    backgroundQueue: [],
    config: defaultConfig,
    metrics: {
      estimatedMemory: 0,
      estimatedCpu: 0,
      estimatedTime: 0,
      systemMemoryAvailable: 0,
    },
  };
}

/**
 * Add run to execution queue
 */
export function _enqueueRun(
  queue: ExecutionQueue,
  runId: string,
  packId: string,
  steps: Record<string, unknown>,
  priority: number = 50,
  estimatedDuration: number = 5000,
  isBackground: boolean = false,
): { queue: ExecutionQueue; result: QueueResult } {
  const newRun: QueuedRun = {
    runId,
    packId,
    queuedAt: new Date(),
    steps,
    priority,
    isBackground,
    estimatedDuration,
  };

  // Insert based on priority (lower priority number = sooner)
  const newQueueList = [...queue.queue, newRun].sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }
    return new Date(a.queuedAt).getTime() - new Date(b.queuedAt).getTime();
  });

  const position = newQueueList.findIndex((r) => r.runId === runId);
  const estimatedWait = newQueueList
    .slice(0, position)
    .reduce((sum, r) => sum + r.estimatedDuration, 0);

  const result: QueueResult = {
    success: true,
    runId,
    position,
    estimatedWait,
    message: `Run queued at position ${position + 1}`,
  };

  return {
    queue: { ...queue, queue: newQueueList },
    result,
  };
}

/**
 * Dequeue next run from queue
 */
export function _dequeueRun(queue: ExecutionQueue): QueuedRun | null {
  if (queue.queue.length === 0 || queue.isPaused) {
    return null;
  }

  // Get first queued run that's not already executing
  const nextRun = queue.queue.find((r) => r.runId !== queue.executingRunId);
  return nextRun || null;
}

/**
 * Start executing a run from the queue
 */
export function _startRun(
  queue: ExecutionQueue,
  runId: string,
): { success: boolean; message: string } {
  const run = queue.queue.find((r) => r.runId === runId);

  if (!run) {
    return {
      success: false,
      message: `Run ${runId} not found in queue`,
    };
  }

  if (queue.executingRunId && !run.isBackground) {
    return {
      success: false,
      message: "A run is already executing",
    };
  }

  return {
    success: true,
    message: `Run ${runId} started`,
  };
}

/**
 * Mark run as complete and remove from queue
 */
export function _completeRun(
  queue: ExecutionQueue,
  runId: string,
  success: boolean = true,
): ExecutionQueue {
  const newQueue = queue.queue.filter((r) => r.runId !== runId);

  return {
    ...queue,
    queue: newQueue,
    executingRunId:
      queue.executingRunId === runId ? null : queue.executingRunId,
    totalProcessed: queue.totalProcessed + 1,
    totalFailed: queue.totalFailed + (success ? 0 : 1),
  };
}

/**
 * Cancel a queued run
 */
export function _cancelRun(
  queue: ExecutionQueue,
  runId: string,
): { success: boolean; message: string } {
  const run = queue.queue.find((r) => r.runId === runId);

  if (!run) {
    return {
      success: false,
      message: `Run ${runId} not found`,
    };
  }

  if (queue.executingRunId === runId) {
    return {
      success: false,
      message: "Cannot cancel currently executing run",
    };
  }

  return {
    success: true,
    message: `Run ${runId} cancelled`,
  };
}

/**
 * Get queue status and statistics
 */
export function _getQueueStatus(queue: ExecutionQueue): {
  queueLength: number;
  isExecuting: boolean;
  executingRunId: string | null;
  estimatedTotalTime: number;
  processingRate: number;
} {
  const estimatedTotalTime = queue.queue.reduce(
    (sum, r) => sum + r.estimatedDuration,
    0,
  );
  const avgDuration =
    queue.totalProcessed > 0 ? estimatedTotalTime / queue.totalProcessed : 0;
  const processingRate = avgDuration > 0 ? 1000 / avgDuration : 0; // runs per second

  return {
    queueLength: queue.queue.length,
    isExecuting: queue.executingRunId !== null,
    executingRunId: queue.executingRunId,
    estimatedTotalTime,
    processingRate,
  };
}

/**
 * Pause queue processing
 */
export function _pauseQueue(queue: ExecutionQueue): ExecutionQueue {
  return {
    ...queue,
    isPaused: true,
  };
}

/**
 * Resume queue processing
 */
export function _resumeQueue(queue: ExecutionQueue): ExecutionQueue {
  return {
    ...queue,
    isPaused: false,
  };
}

/**
 * Start background processing of a run
 */
export function _startBackgroundProcessing(
  state: BackgroundProcessingState,
  runId: string,
  estimatedDuration: number = 5000,
): BackgroundProcessingState {
  if (state.isProcessing) {
    return state;
  }

  return {
    ...state,
    isProcessing: true,
    currentBackgroundRunId: runId,
    startedAt: new Date(),
    progress: 0,
    metrics: {
      ...state.metrics,
      estimatedTime: estimatedDuration,
    },
  };
}

/**
 * Update background processing progress
 */
export function _updateBackgroundProgress(
  state: BackgroundProcessingState,
  progress: number,
  estimatedMemory: number = 0,
  estimatedCpu: number = 0,
): BackgroundProcessingState {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return {
    ...state,
    progress: clampedProgress,
    metrics: {
      ...state.metrics,
      estimatedMemory,
      estimatedCpu,
    },
  };
}

/**
 * Complete background processing
 */
export function _completeBackgroundProcessing(
  state: BackgroundProcessingState,
): BackgroundProcessingState {
  return {
    ...state,
    isProcessing: false,
    currentBackgroundRunId: null,
    startedAt: null,
    progress: 0,
  };
}

/**
 * Check if background processing should be paused due to resource pressure
 */
export function _checkResourcePressure(
  state: BackgroundProcessingState,
  systemMemoryPercent: number,
  estimatedCpuPercent: number,
): boolean {
  const memoryPressure = systemMemoryPercent / 100;
  const cpuPressure = estimatedCpuPercent / 100;

  if (memoryPressure > state.config.memoryThreshold) {
    return true; // Pause due to memory pressure
  }

  if (cpuPressure > 0.9) {
    return true; // Pause due to CPU pressure
  }

  return false;
}

/**
 * Estimate run duration based on input characteristics
 */
export function _estimateRunDuration(
  stepsCount: number,
  inputDataSize: number,
  packComplexity: string = "medium",
): number {
  const baseTime = 1000; // 1s base
  const stepsTime = stepsCount * 500; // 500ms per step
  const sizeTime = (inputDataSize / 1024 / 1024) * 100; // 100ms per MB

  const complexityMultiplier =
    packComplexity === "low" ? 1 : packComplexity === "high" ? 2 : 1.5;

  return Math.round((baseTime + stepsTime + sizeTime) * complexityMultiplier);
}

/**
 * Calculate queue processing statistics
 */
export function _getQueueStatistics(queue: ExecutionQueue): {
  averageWaitTime: number;
  averageProcessingTime: number;
  successRate: number;
  throughput: number;
} {
  const totalRuns = queue.totalProcessed + queue.totalFailed;

  if (totalRuns === 0) {
    return {
      averageWaitTime: 0,
      averageProcessingTime: 0,
      successRate: 0,
      throughput: 0,
    };
  }

  const totalQueuedTime = queue.queue.reduce((sum, r) => {
    const now = new Date();
    return sum + (now.getTime() - r.queuedAt.getTime());
  }, 0);

  const averageWaitTime =
    queue.queue.length > 0 ? totalQueuedTime / queue.queue.length : 0;
  const successRate = queue.totalProcessed / totalRuns;
  const averageProcessingTime =
    queue.queue.length > 0
      ? queue.queue.reduce((sum, r) => sum + r.estimatedDuration, 0) /
        queue.queue.length
      : 0;

  return {
    averageWaitTime,
    averageProcessingTime,
    successRate,
    throughput: totalRuns,
  };
}

/**
 * Adjust run priority in queue
 */
export function _adjustRunPriority(
  queue: ExecutionQueue,
  runId: string,
  newPriority: number,
): { success: boolean; message: string } {
  const runIndex = queue.queue.findIndex((r) => r.runId === runId);

  if (runIndex === -1) {
    return {
      success: false,
      message: `Run ${runId} not found`,
    };
  }

  // Can't adjust currently executing run
  if (queue.executingRunId === runId) {
    return {
      success: false,
      message: "Cannot adjust priority of executing run",
    };
  }

  return {
    success: true,
    message: `Priority updated to ${newPriority}`,
  };
}

/**
 * Batch enqueue multiple runs
 */
export function _batchEnqueueRuns(
  queue: ExecutionQueue,
  runs: Array<{
    runId: string;
    packId: string;
    steps: Record<string, unknown>;
    priority?: number;
    estimatedDuration?: number;
  }>,
): { queue: ExecutionQueue; results: QueueResult[] } {
  const results: QueueResult[] = [];
  let currentQueue = queue;

  for (const run of runs) {
    const { queue: updated, result } = _enqueueRun(
      currentQueue,
      run.runId,
      run.packId,
      run.steps,
      run.priority || 50,
      run.estimatedDuration || 5000,
      false,
    );
    results.push(result);
    currentQueue = updated;
  }

  return { queue: currentQueue, results };
}
