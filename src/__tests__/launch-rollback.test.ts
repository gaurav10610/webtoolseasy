import { describe, expect, it } from "vitest";
import {
  _applyRollbackSwitch,
  _evaluateRollbackDecision,
  _readLaunchFlagState,
} from "@/lib/launchRollback";

describe("Launch Rollback Switch via Feature Flags (TB-181)", () => {
  it("reads default launch state from env", () => {
    const state = _readLaunchFlagState({});

    expect(state.workflowsEnabled).toBe(true);
    expect(state.templatesEnabled).toBe(true);
    expect(state.workflowSyncEnabled).toBe(false);
    expect(state.rollbackModeEnabled).toBe(false);
  });

  it("applies rollback switch and disables workflow surfaces", () => {
    const result = _applyRollbackSwitch({
      workflowsEnabled: true,
      templatesEnabled: true,
      workflowSyncEnabled: true,
      rollbackModeEnabled: true,
    });

    expect(result.workflowsEnabled).toBe(false);
    expect(result.templatesEnabled).toBe(false);
    expect(result.workflowSyncEnabled).toBe(false);
  });

  it("does not rollback when metrics are healthy", () => {
    const decision = _evaluateRollbackDecision({
      state: {
        workflowsEnabled: true,
        templatesEnabled: true,
        workflowSyncEnabled: true,
        rollbackModeEnabled: false,
      },
      errorRatePercent: 1.2,
      p95LatencyMs: 900,
      crashFreeRatePercent: 99.5,
    });

    expect(decision.shouldRollback).toBe(false);
    expect(decision.reason).toContain("guardrails");
  });

  it("triggers rollback on critical error rate", () => {
    const decision = _evaluateRollbackDecision({
      state: {
        workflowsEnabled: true,
        templatesEnabled: true,
        workflowSyncEnabled: true,
        rollbackModeEnabled: false,
      },
      errorRatePercent: 5.5,
      p95LatencyMs: 1100,
      crashFreeRatePercent: 99.1,
    });

    expect(decision.shouldRollback).toBe(true);
    expect(decision.resultingFlags.workflowsEnabled).toBe(false);
    expect(decision.reason).toContain("error rate");
  });

  it("triggers rollback on critical latency", () => {
    const decision = _evaluateRollbackDecision({
      state: {
        workflowsEnabled: true,
        templatesEnabled: true,
        workflowSyncEnabled: false,
        rollbackModeEnabled: false,
      },
      errorRatePercent: 2,
      p95LatencyMs: 3000,
      crashFreeRatePercent: 99,
    });

    expect(decision.shouldRollback).toBe(true);
    expect(decision.reason).toContain("latency");
  });

  it("respects manual rollback mode if already enabled", () => {
    const decision = _evaluateRollbackDecision({
      state: {
        workflowsEnabled: true,
        templatesEnabled: true,
        workflowSyncEnabled: true,
        rollbackModeEnabled: true,
      },
      errorRatePercent: 0,
      p95LatencyMs: 300,
      crashFreeRatePercent: 100,
    });

    expect(decision.shouldRollback).toBe(true);
    expect(decision.reason).toContain("already enabled");
  });
});
