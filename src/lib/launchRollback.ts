export interface LaunchFlagState {
  workflowsEnabled: boolean;
  templatesEnabled: boolean;
  workflowSyncEnabled: boolean;
  rollbackModeEnabled: boolean;
}

export interface RollbackDecision {
  shouldRollback: boolean;
  reason: string;
  resultingFlags: LaunchFlagState;
}

export function _readLaunchFlagState(
  env: Record<string, string | undefined>,
): LaunchFlagState {
  const toBool = (value: string | undefined, fallback: boolean): boolean => {
    if (value === undefined) return fallback;
    return value === "true";
  };

  return {
    workflowsEnabled: toBool(env.NEXT_PUBLIC_ENABLE_WORKFLOWS, true),
    templatesEnabled: toBool(env.NEXT_PUBLIC_ENABLE_TEMPLATES, true),
    workflowSyncEnabled: toBool(env.NEXT_PUBLIC_ENABLE_WORKFLOW_SYNC, false),
    rollbackModeEnabled: toBool(
      env.NEXT_PUBLIC_ENABLE_WORKFLOW_ROLLBACK,
      false,
    ),
  };
}

export function _applyRollbackSwitch(state: LaunchFlagState): LaunchFlagState {
  if (!state.rollbackModeEnabled) {
    return state;
  }

  return {
    ...state,
    workflowsEnabled: false,
    templatesEnabled: false,
    workflowSyncEnabled: false,
  };
}

export function _evaluateRollbackDecision(input: {
  state: LaunchFlagState;
  errorRatePercent: number;
  p95LatencyMs: number;
  crashFreeRatePercent: number;
}): RollbackDecision {
  const { state, errorRatePercent, p95LatencyMs, crashFreeRatePercent } = input;

  if (state.rollbackModeEnabled) {
    return {
      shouldRollback: true,
      reason: "Rollback flag already enabled",
      resultingFlags: _applyRollbackSwitch(state),
    };
  }

  const isErrorRateCritical = errorRatePercent >= 5;
  const isLatencyCritical = p95LatencyMs >= 2500;
  const isCrashFreeCritical = crashFreeRatePercent < 98;

  const shouldRollback =
    isErrorRateCritical || isLatencyCritical || isCrashFreeCritical;

  if (!shouldRollback) {
    return {
      shouldRollback: false,
      reason: "Metrics within launch guardrails",
      resultingFlags: state,
    };
  }

  const rolledBack = _applyRollbackSwitch({
    ...state,
    rollbackModeEnabled: true,
  });

  const reasons: string[] = [];
  if (isErrorRateCritical) reasons.push(`error rate ${errorRatePercent}%`);
  if (isLatencyCritical) reasons.push(`p95 latency ${p95LatencyMs}ms`);
  if (isCrashFreeCritical) reasons.push(`crash-free ${crashFreeRatePercent}%`);

  return {
    shouldRollback: true,
    reason: `Auto rollback triggered due to ${reasons.join(", ")}`,
    resultingFlags: rolledBack,
  };
}
