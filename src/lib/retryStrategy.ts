/**
 * TB-133: Retry strategy standardization for network-required non-local steps
 * Handles exponential backoff, jitter, and circuit breaker patterns
 */

export interface RetryConfig {
  /** Maximum number of retry attempts */
  maxAttempts: number;
  /** Initial delay in milliseconds */
  initialDelayMs: number;
  /** Maximum delay in milliseconds */
  maxDelayMs: number;
  /** Backoff multiplier (exponential) */
  backoffMultiplier: number;
  /** Add random jitter to delay (0-1) */
  jitterFraction: number;
  /** Retry only on these status codes */
  retryableStatusCodes?: number[];
  /** Retry only for these error types */
  retryableErrors?: string[];
  /** Timeout per attempt in milliseconds */
  timeoutMs: number;
  /** Enable circuit breaker */
  enableCircuitBreaker: boolean;
}

export interface RetryAttempt {
  /** Attempt number (1-based) */
  attemptNumber: number;
  /** Error from previous attempt */
  error?: Error | string;
  /** Status code if HTTP error */
  statusCode?: number;
  /** Timestamp of attempt */
  timestamp: Date;
  /** Delay before this attempt (ms) */
  delayMs: number;
}

export interface RetryState {
  /** Current configuration */
  config: RetryConfig;
  /** Attempt history */
  attempts: RetryAttempt[];
  /** Circuit breaker state: closed (healthy) | open (failing) | half-open (testing) */
  circuitState: "closed" | "open" | "half-open";
  /** Failure count for circuit breaker */
  failureCount: number;
  /** Success count (for recovery) */
  successCount: number;
  /** Circuit breaker open time */
  circuitOpenedAt?: Date;
  /** Total retry duration so far (ms) */
  totalDurationMs: number;
}

export interface RetryResult {
  /** Was operation successful */
  success: boolean;
  /** Number of attempts made */
  attempts: number;
  /** Final error if failed */
  error?: Error | string;
  /** Total time spent retrying (ms) */
  totalTimeMs: number;
  /** Can retry again */
  canRetry: boolean;
  /** Reason if no more retries available */
  retryReason?: string;
}

// Predefined strategies
export const RETRY_STRATEGIES = {
  aggressive: {
    maxAttempts: 3,
    initialDelayMs: 100,
    maxDelayMs: 5000,
    backoffMultiplier: 2,
    jitterFraction: 0.1,
    timeoutMs: 5000,
    enableCircuitBreaker: false,
  } as RetryConfig,

  balanced: {
    maxAttempts: 5,
    initialDelayMs: 500,
    maxDelayMs: 30000,
    backoffMultiplier: 2,
    jitterFraction: 0.3,
    timeoutMs: 10000,
    enableCircuitBreaker: true,
  } as RetryConfig,

  conservative: {
    maxAttempts: 10,
    initialDelayMs: 1000,
    maxDelayMs: 60000,
    backoffMultiplier: 1.5,
    jitterFraction: 0.5,
    timeoutMs: 30000,
    enableCircuitBreaker: true,
  } as RetryConfig,
};

/**
 * Initialize retry state
 */
export function _initializeRetryState(
  config: Partial<RetryConfig> = {},
): RetryState {
  const fullConfig: RetryConfig = {
    ...RETRY_STRATEGIES.balanced,
    ...config,
  };

  return {
    config: fullConfig,
    attempts: [],
    circuitState: "closed",
    failureCount: 0,
    successCount: 0,
    totalDurationMs: 0,
  };
}

/**
 * Calculate delay for next attempt with exponential backoff and jitter
 */
export function _calculateNextDelay(
  config: RetryConfig,
  attemptNumber: number,
): number {
  // Exponential backoff: delay = initialDelay * (backoffMultiplier ^ attemptNumber)
  let delay =
    config.initialDelayMs *
    Math.pow(config.backoffMultiplier, attemptNumber - 1);

  // Add jitter before capping
  const jitter = delay * config.jitterFraction * Math.random();
  delay = delay + jitter;

  // Cap at max delay (after jitter)
  delay = Math.min(delay, config.maxDelayMs);
  delay = Math.round(delay);

  return delay;
}

/**
 * Determine if an error is retryable
 */
export function _isRetryable(
  error: Error | string | number,
  config: RetryConfig,
): boolean {
  // If status code provided, check retryableStatusCodes
  if (typeof error === "number") {
    if (config.retryableStatusCodes) {
      return config.retryableStatusCodes.includes(error);
    }
    // Default: retry on 5xx and 429 (rate limit)
    return error >= 500 || error === 429;
  }

  // If error object or string
  const errorStr = error instanceof Error ? error.message : String(error);

  // Check retryableErrors patterns
  if (config.retryableErrors) {
    return config.retryableErrors.some((pattern) =>
      errorStr.toLowerCase().includes(pattern.toLowerCase()),
    );
  }

  // Default: retry on timeout, connection, network errors
  const retryablePatterns = [
    "timeout",
    "network",
    "econnrefused",
    "econnreset",
    "socket",
    "fetch",
    "broken",
  ];

  return retryablePatterns.some((pattern) =>
    errorStr.toLowerCase().includes(pattern),
  );
}

/**
 * Record an attempt in retry history
 */
export function _recordAttempt(
  state: RetryState,
  error?: Error | string,
  statusCode?: number,
): RetryState {
  const attempt: RetryAttempt = {
    attemptNumber: state.attempts.length + 1,
    error,
    statusCode,
    timestamp: new Date(),
    delayMs:
      state.attempts.length > 0
        ? _calculateNextDelay(state.config, state.attempts.length)
        : 0,
  };

  return {
    ...state,
    attempts: [...state.attempts, attempt],
  };
}

/**
 * Check if can retry based on config and circuit breaker
 */
export function _canRetry(state: RetryState): {
  can: boolean;
  reason?: string;
} {
  // Check attempt limit
  if (state.attempts.length >= state.config.maxAttempts) {
    return {
      can: false,
      reason: `Exceeded max attempts (${state.config.maxAttempts})`,
    };
  }

  // Check circuit breaker
  if (state.config.enableCircuitBreaker) {
    if (state.circuitState === "open") {
      // Check if circuit should be half-opened
      if (state.circuitOpenedAt) {
        const timeSinceOpened = Date.now() - state.circuitOpenedAt.getTime();
        const resetTimeMs = state.config.maxDelayMs; // Use max delay as reset time

        if (timeSinceOpened > resetTimeMs) {
          // Try half-open state
          return { can: true, reason: "Circuit half-open, testing" };
        }
      }

      return {
        can: false,
        reason: "Circuit breaker is open",
      };
    }
  }

  // Check if last error is retryable
  if (state.attempts.length > 0) {
    const lastAttempt = state.attempts[state.attempts.length - 1];
    if (lastAttempt.statusCode) {
      if (!_isRetryable(lastAttempt.statusCode, state.config)) {
        return {
          can: false,
          reason: `Non-retryable status code: ${lastAttempt.statusCode}`,
        };
      }
    } else if (lastAttempt.error) {
      if (!_isRetryable(lastAttempt.error, state.config)) {
        return {
          can: false,
          reason: "Non-retryable error",
        };
      }
    }
  }

  return { can: true };
}

/**
 * Handle successful operation
 */
export function _recordSuccess(state: RetryState): RetryState {
  let newState = {
    ...state,
    successCount: state.successCount + 1,
  };

  // Reset circuit breaker on success
  if (state.circuitState === "half-open") {
    newState = {
      ...newState,
      circuitState: "closed",
      failureCount: 0,
      successCount: 1,
    };
  }

  return newState;
}

/**
 * Handle failure and update circuit breaker
 */
export function _recordFailure(
  state: RetryState,
  error: Error | string,
  statusCode?: number,
): RetryState {
  let newState = _recordAttempt(state, error, statusCode);
  newState = {
    ...newState,
    failureCount: state.failureCount + 1,
  };

  // Update circuit breaker
  if (state.config.enableCircuitBreaker) {
    const failureThreshold = 3; // Open circuit after 3 failures
    if (newState.failureCount >= failureThreshold) {
      if (state.circuitState !== "open") {
        newState = {
          ...newState,
          circuitState: "open",
          circuitOpenedAt: new Date(),
        };
      }
    } else if (state.circuitState === "half-open") {
      // Failure in half-open state reopens circuit
      newState = {
        ...newState,
        circuitState: "open",
        circuitOpenedAt: new Date(),
      };
    }
  }

  return newState;
}

/**
 * Get next retry delay
 */
export function _getNextRetryDelay(state: RetryState): number {
  if (state.attempts.length === 0) {
    return 0;
  }

  return _calculateNextDelay(state.config, state.attempts.length);
}

/**
 * Get retry summary
 */
export function _getRetrySummary(state: RetryState): {
  totalAttempts: number;
  failures: number;
  successes: number;
  canRetryAgain: boolean;
  circuitStatus: string;
  avgDelayMs: number;
} {
  const failures = state.attempts.filter((a) => a.error || a.statusCode).length;
  const avgDelay =
    state.attempts.length > 0
      ? state.attempts.reduce((sum, a) => sum + a.delayMs, 0) /
        state.attempts.length
      : 0;

  return {
    totalAttempts: state.attempts.length,
    failures,
    successes: state.successCount,
    canRetryAgain: _canRetry(state).can,
    circuitStatus: state.circuitState,
    avgDelayMs: Math.round(avgDelay),
  };
}

/**
 * Simulate retry loop (for testing)
 */
export async function _simulateRetryLoop(
  config: RetryConfig,
  attemptsFn: () => Promise<boolean>,
): Promise<RetryResult> {
  let state = _initializeRetryState(config);
  const startTime = Date.now();

  for (let i = 0; i < config.maxAttempts; i++) {
    try {
      const success = await attemptsFn();
      if (success) {
        // Record this attempt before returning
        state = _recordAttempt(state);
        state = _recordSuccess(state);
        return {
          success: true,
          attempts: state.attempts.length,
          totalTimeMs: Date.now() - startTime,
          canRetry: false,
        };
      }
      // If false is returned, just record attempt and continue to retry
      state = _recordAttempt(state);

      // Check if we should continue retrying
      if (state.attempts.length >= config.maxAttempts) {
        return {
          success: false,
          attempts: state.attempts.length,
          error: "Max attempts exceeded",
          totalTimeMs: Date.now() - startTime,
          canRetry: false,
          retryReason: "Exceeded max attempts",
        };
      }

      // Wait before next attempt
      const delay = _getNextRetryDelay(state);
      if (delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);

      // Check retryability before recording
      if (!_isRetryable(errorMsg, state.config)) {
        // Non-retryable error - return immediately
        state = _recordAttempt(state, errorMsg);
        return {
          success: false,
          attempts: state.attempts.length,
          error: errorMsg,
          totalTimeMs: Date.now() - startTime,
          canRetry: false,
          retryReason: "Non-retryable error",
        };
      }

      state = _recordFailure(state, errorMsg);

      const canRetryCheck = _canRetry(state);

      if (!canRetryCheck.can) {
        return {
          success: false,
          attempts: state.attempts.length,
          error: errorMsg,
          totalTimeMs: Date.now() - startTime,
          canRetry: false,
          retryReason: canRetryCheck.reason,
        };
      }

      // Wait before next attempt
      const delay = _getNextRetryDelay(state);
      if (delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  return {
    success: false,
    attempts: state.attempts.length,
    error: "Max attempts exceeded",
    totalTimeMs: Date.now() - startTime,
    canRetry: _canRetry(state).can,
    retryReason: _canRetry(state).reason,
  };
}

/**
 * Create retry predicate for specific status codes
 */
export function _retryableStatusCodes(codes: number[]): RetryConfig {
  return {
    ...RETRY_STRATEGIES.balanced,
    retryableStatusCodes: codes,
  };
}

/**
 * Create retry predicate for specific error messages
 */
export function _retryableErrors(patterns: string[]): RetryConfig {
  return {
    ...RETRY_STRATEGIES.balanced,
    retryableErrors: patterns,
  };
}

/**
 * Calculate total estimated time for all retries
 */
export function _estimateTotalRetryTime(config: RetryConfig): number {
  let total = 0;

  for (let i = 1; i < config.maxAttempts; i++) {
    total += _calculateNextDelay(config, i);
  }

  return total;
}

/**
 * Get circuit breaker statistics
 */
export function _getCircuitBreakerStats(states: RetryState[]): {
  opensCount: number;
  closeCount: number;
  avgFailuresBeforeOpen: number;
} {
  const opens = states.filter((s) => s.circuitState === "open").length;
  const closed = states.filter((s) => s.circuitState === "closed").length;
  const avgFailures =
    states.length > 0
      ? states.reduce((sum, s) => sum + s.failureCount, 0) / states.length
      : 0;

  return {
    opensCount: opens,
    closeCount: closed,
    avgFailuresBeforeOpen: Math.round(avgFailures * 10) / 10,
  };
}
