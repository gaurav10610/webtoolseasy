/**
 * TB-134: Resilience tests for interrupted sessions and tab reloads
 * Tests browser crashes, network failures, and state recovery
 */

export interface SessionRecoveryState {
  /** Session ID for recovery */
  sessionId: string;
  /** Persisted workflow steps */
  steps: Array<{
    id: string;
    name: string;
    status: "pending" | "running" | "completed" | "failed";
  }>;
  /** Checkpoint timestamp */
  checkpointAt: Date;
  /** Last successfully completed step */
  lastCompletedStep?: string;
  /** Progress percentage */
  progress: number;
  /** Temporary data cache (localStorage key) */
  cacheKey: string;
  /** Recovery metadata */
  metadata: {
    startedAt: Date;
    browserTab?: string;
    userAgent?: string;
    isRecovered?: boolean;
    recoveredAt?: Date;
  };
}

export interface InterruptionScenario {
  /** Type of interruption: crash, networkfailure, timeout, reload, tabswitch */
  type: "crash" | "network_failure" | "timeout" | "reload" | "tab_switch";
  /** Step that was interrupted */
  interruptedAt: string;
  /** Time until interruption in ms */
  timeToInterruption: number;
  /** Can be recovered */
  isRecoverable: boolean;
  /** Recovery strategy */
  recoveryStrategy: "resume" | "restart" | "manual";
}

export interface ResilienceTestResult {
  /** Test scenario */
  scenario: InterruptionScenario;
  /** Was recovery successful */
  recovered: boolean;
  /** Final state after recovery */
  finalState: SessionRecoveryState | null;
  /** Data loss detected */
  dataLoss: boolean;
  /** Lost items count */
  lostCount: number;
  /** Recovery time in ms */
  recoveryTimeMs: number;
  /** Error if recovery failed */
  error?: string;
}

/**
 * Initialize session recovery state
 */
export function _initializeSessionRecovery(
  sessionId: string,
  steps: Array<{ id: string; name: string }>,
): SessionRecoveryState {
  return {
    sessionId,
    steps: steps.map((s) => ({
      ...s,
      status: "pending" as const,
    })),
    checkpointAt: new Date(),
    progress: 0,
    cacheKey: `workflow_${sessionId}`,
    metadata: {
      startedAt: new Date(),
      isRecovered: false,
    },
  };
}

/**
 * Save session state to persistent storage
 */
export function _saveSessionCheckpoint(
  state: SessionRecoveryState,
  storage: Record<string, string> = {},
): Record<string, string> {
  const checkpoint = {
    sessionId: state.sessionId,
    steps: state.steps,
    checkpointAt: state.checkpointAt.toISOString(),
    lastCompletedStep: state.lastCompletedStep,
    progress: state.progress,
    metadata: state.metadata,
  };

  const updated = { ...storage };
  updated[state.cacheKey] = JSON.stringify(checkpoint);
  updated[`${state.cacheKey}_time`] = Date.now().toString();

  return updated;
}

/**
 * Recover session state from persistent storage
 */
export function _recoverSessionFromStorage(
  sessionId: string,
  storage: Record<string, string>,
): SessionRecoveryState | null {
  const cacheKey = `workflow_${sessionId}`;
  const stored = storage[cacheKey];

  if (!stored) {
    return null;
  }

  try {
    const parsed = JSON.parse(stored);
    return {
      sessionId: parsed.sessionId,
      steps: parsed.steps,
      checkpointAt: new Date(parsed.checkpointAt),
      lastCompletedStep: parsed.lastCompletedStep,
      progress: parsed.progress,
      cacheKey: parsed.cacheKey || cacheKey,
      metadata: {
        ...parsed.metadata,
        isRecovered: true,
        recoveredAt: new Date(),
      },
    };
  } catch (error) {
    return null;
  }
}

/**
 * Update step status
 */
export function _updateStepStatus(
  state: SessionRecoveryState,
  stepId: string,
  status: "pending" | "running" | "completed" | "failed",
): SessionRecoveryState {
  const updatedSteps = state.steps.map((s) =>
    s.id === stepId ? { ...s, status } : s,
  );

  const completed = updatedSteps.filter((s) => s.status === "completed").length;
  const progress = Math.round((completed / updatedSteps.length) * 100);

  return {
    ...state,
    steps: updatedSteps,
    lastCompletedStep:
      status === "completed" ? stepId : state.lastCompletedStep,
    progress,
    checkpointAt: new Date(),
  };
}

/**
 * Detect interruption scenario
 */
export function _detectInterruptionScenario(
  failureType: string,
  stepId: string,
  elapsedTime: number,
): InterruptionScenario {
  let type: InterruptionScenario["type"] = "network_failure";
  let recoveryStrategy: InterruptionScenario["recoveryStrategy"] = "resume";
  let isRecoverable = true;

  if (
    failureType.toLowerCase().includes("crash") ||
    failureType.toLowerCase().includes("died")
  ) {
    type = "crash";
    recoveryStrategy = elapsedTime > 60000 ? "resume" : "restart"; // Resume if >1min into workflow
  } else if (
    failureType.toLowerCase().includes("network") ||
    failureType.toLowerCase().includes("timeout")
  ) {
    type = "timeout";
    recoveryStrategy = "resume";
  } else if (failureType.toLowerCase().includes("reload")) {
    type = "reload";
    recoveryStrategy = "resume";
  } else if (failureType.toLowerCase().includes("tab")) {
    type = "tab_switch";
    recoveryStrategy = "resume";
  }

  // Some scenarios aren't recoverable
  if (
    failureType.toLowerCase().includes("unrecoverable") ||
    failureType.toLowerCase().includes("fatal")
  ) {
    isRecoverable = false;
    recoveryStrategy = "manual";
  }

  return {
    type,
    interruptedAt: stepId,
    timeToInterruption: elapsedTime,
    isRecoverable,
    recoveryStrategy,
  };
}

/**
 * Attempt recovery from interruption
 */
export function _attemptRecovery(
  state: SessionRecoveryState | null,
  scenario: InterruptionScenario,
  storage: Record<string, string>,
): ResilienceTestResult {
  const startTime = Date.now();

  // Check if recovery is possible
  if (!scenario.isRecoverable) {
    return {
      scenario,
      recovered: false,
      finalState: null,
      dataLoss: true,
      lostCount: state?.steps.length || 0,
      recoveryTimeMs: Date.now() - startTime,
      error: "Scenario marked as unrecoverable",
    };
  }

  // Try to recover from storage
  let recoveredState: SessionRecoveryState | null = null;

  if (state) {
    recoveredState = _recoverSessionFromStorage(state.sessionId, storage);
  }

  if (!recoveredState) {
    return {
      scenario,
      recovered: false,
      finalState: null,
      dataLoss: true,
      lostCount: state?.steps.length || 0,
      recoveryTimeMs: Date.now() - startTime,
      error: "Could not recover state from storage",
    };
  }

  // Count data loss BEFORE applying recovery strategy
  const failedStepsBefore = recoveredState.steps.filter(
    (s) => s.status === "failed",
  );
  const dataLoss = failedStepsBefore.length > 0;

  // Apply recovery strategy
  if (scenario.recoveryStrategy === "resume") {
    // Find the last failed step and resume from there
    const failedStep = recoveredState.steps.find((s) => s.status === "failed");
    if (failedStep) {
      recoveredState = _updateStepStatus(
        recoveredState,
        failedStep.id,
        "pending",
      );
    }
  } else if (scenario.recoveryStrategy === "restart") {
    // Reset all steps to pending
    recoveredState = {
      ...recoveredState,
      steps: recoveredState.steps.map((s) => ({
        ...s,
        status: "pending" as const,
      })),
      progress: 0,
    };
  }

  return {
    scenario,
    recovered: true,
    finalState: recoveredState,
    dataLoss,
    lostCount: failedStepsBefore.length,
    recoveryTimeMs: Date.now() - startTime,
  };
}

/**
 * Simulate workflow interruption
 */
export async function _simulateInterruption(
  state: SessionRecoveryState,
  scenario: InterruptionScenario,
  storage: Record<string, string>,
): Promise<ResilienceTestResult> {
  const startTime = Date.now();

  // Save checkpoint before interruption
  const updatedStorage = _saveSessionCheckpoint(state, storage);

  // Simulate some work
  await new Promise((resolve) =>
    setTimeout(resolve, scenario.timeToInterruption % 100),
  );

  // Mark interrupted step as failed if applicable
  let interruptedState = state;
  if (scenario.interruptedAt) {
    interruptedState = _updateStepStatus(
      state,
      scenario.interruptedAt,
      "failed",
    );
  }

  // Save interrupted state
  const storageAfterInterruption = _saveSessionCheckpoint(
    interruptedState,
    updatedStorage,
  );

  // Attempt recovery
  return _attemptRecovery(interruptedState, scenario, storageAfterInterruption);
}

/**
 * Test tab reload recovery
 */
export function _testTabReloadRecovery(
  state: SessionRecoveryState,
  storage: Record<string, string>,
): {
  recovered: boolean;
  stateLost: number;
  recoverySuccessful: boolean;
} {
  // Save before "reload"
  const savedStorage = _saveSessionCheckpoint(state, storage);

  // Simulate page reload (clear session storage but keep localStorage)
  const sessionCleared = {};
  const localStorageRetained = { ...savedStorage };

  // Try to recover
  const recovered = _recoverSessionFromStorage(
    state.sessionId,
    localStorageRetained,
  );

  if (!recovered) {
    return {
      recovered: false,
      stateLost: state.steps.length,
      recoverySuccessful: false,
    };
  }

  // Check what state is retained
  const retained = recovered.steps.filter((s) => s.id).length;
  const lost = state.steps.length - retained;

  return {
    recovered: true,
    stateLost: lost,
    recoverySuccessful: lost === 0,
  };
}

/**
 * Test network failure during step execution
 */
export function _testNetworkFailureDuringStep(
  state: SessionRecoveryState,
  failingStepId: string,
  storage: Record<string, string>,
): {
  stepInterrupted: boolean;
  canRecoverStep: boolean;
  stateConsistency: boolean;
} {
  // Mark step as running
  let runningState = _updateStepStatus(state, failingStepId, "running");
  const savedStorage = _saveSessionCheckpoint(runningState, storage);

  // Simulate network failure
  const failedState = _updateStepStatus(runningState, failingStepId, "failed");

  // Save failed state
  const failedStorage = _saveSessionCheckpoint(failedState, savedStorage);

  // Try to recover
  const recovered = _recoverSessionFromStorage(state.sessionId, failedStorage);

  if (!recovered) {
    return {
      stepInterrupted: true,
      canRecoverStep: false,
      stateConsistency: false,
    };
  }

  // Verify state consistency
  const recoveredStep = recovered.steps.find((s) => s.id === failingStepId);
  const consistent = recoveredStep?.status === "failed";

  return {
    stepInterrupted: true,
    canRecoverStep: true,
    stateConsistency: consistent,
  };
}

/**
 * Test concurrent tab execution with recovery
 */
export function _testConcurrentTabRecovery(
  sessionId: string,
  steps: Array<{ id: string; name: string }>,
  storage: Record<string, string>,
): {
  tab1Recovered: boolean;
  tab2Recovered: boolean;
  conflictDetected: boolean;
  latestStateWins: boolean;
} {
  // Simulate two tabs with same session
  const state1 = _initializeSessionRecovery(sessionId, steps);
  const state2 = _initializeSessionRecovery(sessionId, steps);

  // Tab 1 completes first step
  const tab1State = _updateStepStatus(state1, steps[0].id, "completed");
  const tab1Storage = _saveSessionCheckpoint(tab1State, storage);

  // Tab 2 completes first step and second (conflicting)
  const tab2State1 = _updateStepStatus(state2, steps[0].id, "completed");
  const tab2State2 = _updateStepStatus(tab2State1, steps[1].id, "completed");
  const tab2Storage = _saveSessionCheckpoint(tab2State2, tab1Storage); // Tab 2 writes after Tab 1

  // Recover - should get Tab 2's version (latest write)
  const recovered = _recoverSessionFromStorage(sessionId, tab2Storage);

  const tab1Recovered = !!recovered;
  const tab2Recovered = !!recovered;
  const latestStateWins = recovered?.steps[1]?.status === "completed";
  const conflictDetected = tab1State.progress !== tab2State2.progress;

  return {
    tab1Recovered,
    tab2Recovered,
    conflictDetected,
    latestStateWins,
  };
}

/**
 * Calculate recovery overhead
 */
export function _calculateRecoveryOverhead(
  originalDuration: number,
  recoveryDuration: number,
): {
  overhead: number;
  percentageIncrease: number;
  isAcceptable: boolean;
} {
  const overhead = recoveryDuration - originalDuration;
  const percentageIncrease = (overhead / originalDuration) * 100;
  const isAcceptable = percentageIncrease <= 25; // Accept up to 25% overhead

  return {
    overhead,
    percentageIncrease: Math.round(percentageIncrease * 10) / 10,
    isAcceptable,
  };
}

/**
 * Test data consistency across interruptions
 */
export function _testDataConsistency(states: SessionRecoveryState[]): {
  isConsistent: boolean;
  dataIntegrity: number; // 0-100
  corruptedSteps: number;
} {
  if (states.length === 0) {
    return {
      isConsistent: true,
      dataIntegrity: 100,
      corruptedSteps: 0,
    };
  }

  let corruptedSteps = 0;
  const allStepIds = new Set<string>();

  // Collect all step IDs
  states.forEach((state) => {
    state.steps.forEach((step) => {
      allStepIds.add(step.id);
    });
  });

  // Check consistency across all states
  allStepIds.forEach((stepId) => {
    const statuses: string[] = [];
    states.forEach((state) => {
      const step = state.steps.find((s) => s.id === stepId);
      if (step?.status) {
        statuses.push(step.status);
      }
    });
    // Check if status only progresses forward (pending -> running -> completed/failed)
    const statusOrder = { pending: 0, running: 1, completed: 2, failed: 2 };
    for (let i = 1; i < statuses.length; i++) {
      const prev = statusOrder[statuses[i - 1] as keyof typeof statusOrder];
      const curr = statusOrder[statuses[i] as keyof typeof statusOrder];
      if (curr < prev) {
        corruptedSteps++;
      }
    }
  });

  const dataIntegrity = Math.max(
    0,
    100 - (corruptedSteps / Math.max(1, allStepIds.size)) * 100,
  );

  return {
    isConsistent: corruptedSteps === 0,
    dataIntegrity: Math.round(dataIntegrity),
    corruptedSteps,
  };
}
