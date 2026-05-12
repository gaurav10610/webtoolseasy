/**
 * Server/Client Boundary Enforcement Utilities
 *
 * Provides type-safe utilities to enforce local-only step constraints and prevent
 * accidental network calls or server execution in client-isolated steps.
 *
 * Key concepts:
 * - local-only: Can only run in browser, must not make network calls
 * - network: Can make authenticated/public API calls
 * - export-only: Produces downloadable artifacts, no side effects
 */

import {
  WorkflowStepConfig,
  WorkflowStepExecutionMode,
} from "@/types/workflow";

/**
 * Type guard: check if step can only run on client
 */
export const isLocalOnlyStep = (step: WorkflowStepConfig): boolean => {
  return step.executionMode === "local-only";
};

/**
 * Type guard: check if step requires network access
 */
export const isNetworkStep = (step: WorkflowStepConfig): boolean => {
  return step.executionMode === "network";
};

/**
 * Type guard: check if step is export-only (no state mutation)
 */
export const isExportOnlyStep = (step: WorkflowStepConfig): boolean => {
  return step.executionMode === "export-only";
};

/**
 * Enforces that code runs only in browser context (not server-side)
 * Throws error if called in server environment
 *
 * Usage:
 * ```
 * export const MyClientComponent = ({ step }) => {
 *   assertClientOnly(step);
 *   // ...
 * };
 * ```
 */
export const assertClientOnly = (step: WorkflowStepConfig): void => {
  if (typeof window === "undefined") {
    throw new Error(
      `Local-only step "${step.id}" cannot execute in server environment. ` +
        `Move this code to a client component or use 'use client' directive.`,
    );
  }

  if (!isLocalOnlyStep(step)) {
    throw new Error(
      `Step "${step.id}" has execution mode "${step.executionMode}" ` +
        `but was passed to assertClientOnly. Only local-only steps are allowed.`,
    );
  }
};

/**
 * Enforces that step can make network calls
 * Throws error if step is local-only
 *
 * Usage before making fetch/API calls:
 * ```
 * const response = await fetch(url);
 * assertNetworkAllowed(step);
 * ```
 */
export const assertNetworkAllowed = (step: WorkflowStepConfig): void => {
  if (isLocalOnlyStep(step)) {
    throw new Error(
      `Local-only step "${step.id}" attempted network call. ` +
        `Local-only steps must process data entirely in the browser without network access.`,
    );
  }
};

/**
 * Guard function: only allow network calls from network-capable steps
 * Returns true if network is allowed, throws otherwise
 */
export const canMakeNetworkCall = (step: WorkflowStepConfig): boolean => {
  assertNetworkAllowed(step);
  return true;
};

/**
 * Classifies execution mode with human-readable description
 */
export const getExecutionModeDescription = (
  mode: WorkflowStepExecutionMode,
): string => {
  const descriptions: Record<WorkflowStepExecutionMode, string> = {
    "local-only": "Runs entirely in your browser. No data leaves your device.",
    network: "Requires network access. May communicate with external APIs.",
    "export-only": "Generates downloadable output only. No permanent storage.",
  };
  return descriptions[mode];
};

/**
 * Creates a proxy wrapper around potentially unsafe functions
 * to enforce boundary constraints at runtime
 *
 * Usage:
 * ```
 * const safeApiCall = makeLocalOnlyProxy(
 *   async (step, url) => fetch(url),
 *   step
 * );
 * // Will throw if step is not local-only
 * ```
 */
export const makeLocalOnlyProxy = <T extends (...args: any[]) => any>(
  fn: T,
  step: WorkflowStepConfig,
): T => {
  assertClientOnly(step);
  return ((...args: any[]) => fn(...args)) as T;
};

/**
 * Creates a proxy wrapper for network-safe operations
 */
export const makeNetworkProxy = <T extends (...args: any[]) => any>(
  fn: T,
  step: WorkflowStepConfig,
): T => {
  assertNetworkAllowed(step);
  return ((...args: any[]) => fn(...args)) as T;
};

/**
 * Validates that all steps in a workflow have compatible execution modes
 * for composition (e.g., can't chain output from network step to local-only step)
 */
export const validateStepChaining = (
  fromStep: WorkflowStepConfig,
  toStep: WorkflowStepConfig,
): boolean => {
  // Can chain from export-only to any step
  if (isExportOnlyStep(fromStep)) {
    return true;
  }

  // Can chain from local-only only to local-only or export-only
  if (isLocalOnlyStep(fromStep)) {
    return !isNetworkStep(toStep);
  }

  // Can chain from network to any step
  if (isNetworkStep(fromStep)) {
    return true;
  }

  return false;
};

/**
 * Analyzes privacy implications of chaining two steps
 */
export const analyzePrivacyChain = (
  fromStep: WorkflowStepConfig,
  toStep: WorkflowStepConfig,
): { safe: boolean; warning?: string } => {
  if (!validateStepChaining(fromStep, toStep)) {
    return {
      safe: false,
      warning:
        `Cannot chain local-only step "${fromStep.id}" to network step "${toStep.id}". ` +
        `Data from local-only steps must not be transmitted to external services.`,
    };
  }

  // Warn if network data enters a local-only context
  if (isNetworkStep(fromStep) && isLocalOnlyStep(toStep)) {
    return {
      safe: true,
      warning:
        `Step "${toStep.id}" will process data from network source "${fromStep.id}". ` +
        `Ensure this data has been sanitized and does not contain sensitive information.`,
    };
  }

  return { safe: true };
};

/**
 * Type-safe factory for creating boundary-checked steps
 */
export const createBoundaryCheckedStep = <
  T extends Record<string, any> = Record<string, any>,
>(
  stepConfig: WorkflowStepConfig,
  handlers: {
    localOnly?: (config: WorkflowStepConfig, data: T) => Promise<T>;
    network?: (config: WorkflowStepConfig, data: T) => Promise<T>;
    exportOnly?: (config: WorkflowStepConfig, data: T) => T;
  },
): ((data: T) => Promise<T>) => {
  return async (data: T): Promise<T> => {
    if (isLocalOnlyStep(stepConfig) && handlers.localOnly) {
      assertClientOnly(stepConfig);
      return handlers.localOnly(stepConfig, data);
    }

    if (isNetworkStep(stepConfig) && handlers.network) {
      assertNetworkAllowed(stepConfig);
      return handlers.network(stepConfig, data);
    }

    if (isExportOnlyStep(stepConfig) && handlers.exportOnly) {
      return handlers.exportOnly(stepConfig, data);
    }

    throw new Error(
      `No handler registered for step "${stepConfig.id}" ` +
        `with execution mode "${stepConfig.executionMode}"`,
    );
  };
};
