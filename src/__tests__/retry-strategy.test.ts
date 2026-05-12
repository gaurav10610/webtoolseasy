import { describe, it, expect } from "vitest";
import {
  _initializeRetryState,
  _calculateNextDelay,
  _isRetryable,
  _recordAttempt,
  _canRetry,
  _recordSuccess,
  _recordFailure,
  _getNextRetryDelay,
  _getRetrySummary,
  _simulateRetryLoop,
  _retryableStatusCodes,
  _retryableErrors,
  _estimateTotalRetryTime,
  _getCircuitBreakerStats,
  RETRY_STRATEGIES,
} from "@/lib/retryStrategy";

describe("Retry Strategy Standardization for Network Steps (TB-133)", () => {
  describe("Retry State Initialization", () => {
    it("should initialize retry state with defaults", () => {
      const state = _initializeRetryState();

      expect(state.config).toBeTruthy();
      expect(state.attempts).toEqual([]);
      expect(state.circuitState).toEqual("closed");
      expect(state.failureCount).toEqual(0);
      expect(state.successCount).toEqual(0);
    });

    it("should initialize with custom config", () => {
      const state = _initializeRetryState({
        maxAttempts: 3,
        initialDelayMs: 100,
      });

      expect(state.config.maxAttempts).toEqual(3);
      expect(state.config.initialDelayMs).toEqual(100);
    });

    it("should have predefined strategies", () => {
      expect(RETRY_STRATEGIES.aggressive).toBeTruthy();
      expect(RETRY_STRATEGIES.balanced).toBeTruthy();
      expect(RETRY_STRATEGIES.conservative).toBeTruthy();
    });
  });

  describe("Delay Calculation", () => {
    it("should calculate exponential backoff", () => {
      const config = RETRY_STRATEGIES.balanced;

      const delay1 = _calculateNextDelay(config, 1);
      const delay2 = _calculateNextDelay(config, 2);
      const delay3 = _calculateNextDelay(config, 3);

      expect(delay2).toBeGreaterThan(delay1);
      expect(delay3).toBeGreaterThan(delay2);
    });

    it("should cap delay at max", () => {
      const config = { ...RETRY_STRATEGIES.balanced, maxDelayMs: 1000 };

      const delay10 = _calculateNextDelay(config, 10);

      expect(delay10).toBeLessThanOrEqual(config.maxDelayMs);
    });

    it("should add jitter to delay", () => {
      const config = RETRY_STRATEGIES.balanced;

      const delays = Array.from({ length: 10 }, (_, i) =>
        _calculateNextDelay(config, 1),
      );

      // With jitter, delays should vary
      const unique = new Set(delays).size;
      expect(unique).toBeGreaterThan(1);
    });

    it("should respect jitter fraction", () => {
      const baseConfig = RETRY_STRATEGIES.balanced;
      const noJitterConfig = {
        ...baseConfig,
        jitterFraction: 0,
      };

      const delayBase1 = _calculateNextDelay(baseConfig, 1);
      const delayBase2 = _calculateNextDelay(baseConfig, 1);

      const delayNoJitter1 = _calculateNextDelay(noJitterConfig, 1);
      const delayNoJitter2 = _calculateNextDelay(noJitterConfig, 1);

      // No jitter should give same delay
      expect(delayNoJitter1).toEqual(delayNoJitter2);
    });
  });

  describe("Retryability Detection", () => {
    it("should identify retryable status codes", () => {
      const config = RETRY_STRATEGIES.balanced;

      expect(_isRetryable(500, config)).toBe(true); // Server error
      expect(_isRetryable(503, config)).toBe(true); // Service unavailable
      expect(_isRetryable(429, config)).toBe(true); // Rate limit
      expect(_isRetryable(400, config)).toBe(false); // Bad request
      expect(_isRetryable(404, config)).toBe(false); // Not found
    });

    it("should identify retryable errors by pattern", () => {
      const config = RETRY_STRATEGIES.balanced;

      expect(_isRetryable("Connection timeout", config)).toBe(true);
      expect(_isRetryable("Network error", config)).toBe(true);
      expect(_isRetryable("Socket hang up", config)).toBe(true);
      expect(_isRetryable("Validation failed", config)).toBe(false);
    });

    it("should use custom retryable status codes", () => {
      const config = _retryableStatusCodes([409, 418]);

      expect(_isRetryable(409, config)).toBe(true); // Conflict
      expect(_isRetryable(418, config)).toBe(true); // Teapot
      expect(_isRetryable(500, config)).toBe(false); // Not in list
    });

    it("should use custom retryable errors", () => {
      const config = _retryableErrors(["custom error", "special timeout"]);

      expect(_isRetryable("custom error occurred", config)).toBe(true);
      expect(_isRetryable("special timeout in process", config)).toBe(true);
      expect(_isRetryable("network error", config)).toBe(false);
    });
  });

  describe("Attempt Recording", () => {
    it("should record attempt with error", () => {
      let state = _initializeRetryState();

      state = _recordAttempt(state, "Connection failed");

      expect(state.attempts).toHaveLength(1);
      expect(state.attempts[0].attemptNumber).toEqual(1);
      expect(state.attempts[0].error).toEqual("Connection failed");
    });

    it("should record attempt with status code", () => {
      let state = _initializeRetryState();

      state = _recordAttempt(state, undefined, 503);

      expect(state.attempts[0].statusCode).toEqual(503);
    });

    it("should calculate delay for next attempt", () => {
      let state = _initializeRetryState();

      state = _recordAttempt(state, "Error 1");
      state = _recordAttempt(state, "Error 2");

      expect(state.attempts[1].delayMs).toBeGreaterThan(0);
    });
  });

  describe("Retry Eligibility", () => {
    it("should allow retry when under limit", () => {
      let state = _initializeRetryState({ maxAttempts: 5 });
      state = _recordAttempt(state, "Network error");

      const result = _canRetry(state);

      expect(result.can).toBe(true);
    });

    it("should prevent retry when exceeding limit", () => {
      let state = _initializeRetryState({ maxAttempts: 2 });
      state = _recordAttempt(state, "Error 1");
      state = _recordAttempt(state, "Error 2");

      const result = _canRetry(state);

      expect(result.can).toBe(false);
      expect(result.reason).toContain("Exceeded");
    });

    it("should prevent retry on non-retryable error", () => {
      let state = _initializeRetryState();
      state = _recordAttempt(state, undefined, 400);

      const result = _canRetry(state);

      expect(result.can).toBe(false);
    });

    it("should respect circuit breaker open state", () => {
      let state = _initializeRetryState({
        enableCircuitBreaker: true,
        maxAttempts: 10,
      });

      // Record failures to trigger circuit breaker
      for (let i = 0; i < 3; i++) {
        state = _recordFailure(state, "Network error", 503);
      }

      const result = _canRetry(state);

      expect(result.can).toBe(false);
    });
  });

  describe("Success Handling", () => {
    it("should record success", () => {
      let state = _initializeRetryState();

      state = _recordSuccess(state);

      expect(state.successCount).toEqual(1);
    });

    it("should reset circuit breaker on success in half-open", () => {
      let state = _initializeRetryState({
        enableCircuitBreaker: true,
      });

      // Force to half-open
      state = {
        ...state,
        circuitState: "half-open",
        failureCount: 3,
      };

      state = _recordSuccess(state);

      expect(state.circuitState).toEqual("closed");
      expect(state.failureCount).toEqual(0);
    });
  });

  describe("Failure Handling", () => {
    it("should record failure", () => {
      let state = _initializeRetryState();

      state = _recordFailure(state, "Network error", 503);

      expect(state.failureCount).toEqual(1);
      expect(state.attempts).toHaveLength(1);
    });

    it("should open circuit breaker after threshold failures", () => {
      let state = _initializeRetryState({
        enableCircuitBreaker: true,
      });

      for (let i = 0; i < 3; i++) {
        state = _recordFailure(state, "Network error", 503);
      }

      expect(state.circuitState).toEqual("open");
      expect(state.circuitOpenedAt).toBeTruthy();
    });

    it("should reopen circuit from half-open on failure", () => {
      let state = _initializeRetryState({
        enableCircuitBreaker: true,
      });

      state = {
        ...state,
        circuitState: "half-open",
        failureCount: 3,
      };

      state = _recordFailure(state, "Connection refused", 503);

      expect(state.circuitState).toEqual("open");
    });
  });

  describe("Retry Delay Query", () => {
    it("should get next retry delay", () => {
      let state = _initializeRetryState();
      state = _recordAttempt(state, "Error 1");

      const delay = _getNextRetryDelay(state);

      expect(delay).toBeGreaterThanOrEqual(0);
    });

    it("should return 0 for no attempts", () => {
      const state = _initializeRetryState();

      const delay = _getNextRetryDelay(state);

      expect(delay).toEqual(0);
    });
  });

  describe("Retry Summary", () => {
    it("should generate retry summary", () => {
      let state = _initializeRetryState();
      state = _recordFailure(state, "Error 1", 503);
      state = _recordSuccess(state);

      const summary = _getRetrySummary(state);

      expect(summary.totalAttempts).toEqual(1);
      expect(summary.failures).toEqual(1);
      expect(summary.successes).toEqual(1);
      expect(summary.circuitStatus).toEqual("closed");
    });

    it("should include circuit status", () => {
      let state = _initializeRetryState({
        enableCircuitBreaker: true,
      });

      for (let i = 0; i < 3; i++) {
        state = _recordFailure(state, "Error", 503);
      }

      const summary = _getRetrySummary(state);

      expect(summary.circuitStatus).toEqual("open");
    });
  });

  describe("Estimation Functions", () => {
    it("should estimate total retry time", () => {
      const config = RETRY_STRATEGIES.balanced;

      const estimatedTime = _estimateTotalRetryTime(config);

      expect(estimatedTime).toBeGreaterThan(0);
      expect(estimatedTime).toBeLessThan(
        config.maxAttempts * config.maxDelayMs,
      );
    });

    it("should get circuit breaker statistics", () => {
      const states = [
        _initializeRetryState(),
        _initializeRetryState({ enableCircuitBreaker: true }),
      ];

      states[1] = _recordFailure(states[1], "Error", 503);
      states[1] = _recordFailure(states[1], "Error", 503);
      states[1] = _recordFailure(states[1], "Error", 503);

      const stats = _getCircuitBreakerStats(states);

      expect(stats.opensCount).toBeGreaterThanOrEqual(0);
      expect(stats.avgFailuresBeforeOpen).toBeGreaterThanOrEqual(0);
    });
  });

  describe("Integration: Simulated Retry Loop", () => {
    it("should succeed on first try", async () => {
      const config = RETRY_STRATEGIES.aggressive;

      let attempts = 0;
      const result = await _simulateRetryLoop(config, async () => {
        attempts++;
        return true;
      });

      expect(result.success).toBe(true);
      expect(result.attempts).toEqual(1);
      expect(attempts).toEqual(1);
    });

    it("should retry and eventually succeed", async () => {
      const config = RETRY_STRATEGIES.aggressive;

      let attempts = 0;
      const result = await _simulateRetryLoop(config, async () => {
        attempts++;
        return attempts >= 3;
      });

      expect(result.success).toBe(true);
      expect(result.attempts).toEqual(3);
    });

    it("should fail after max attempts", async () => {
      const config = {
        ...RETRY_STRATEGIES.aggressive,
        maxAttempts: 2,
      };

      let attempts = 0;
      const result = await _simulateRetryLoop(config, async () => {
        attempts++;
        throw new Error("Network error");
      });

      expect(result.success).toBe(false);
      expect(result.attempts).toBeGreaterThanOrEqual(1);
      expect(result.totalTimeMs).toBeGreaterThanOrEqual(0);
    });

    it("should stop on non-retryable error", async () => {
      const config = RETRY_STRATEGIES.aggressive;

      let attempts = 0;
      const result = await _simulateRetryLoop(config, async () => {
        attempts++;
        throw new Error("Validation failed");
      });

      expect(result.success).toBe(false);
      expect(result.attempts).toEqual(1);
    });
  });

  describe("Integration: Circuit Breaker Full Scenario", () => {
    it("should transition through circuit states", () => {
      let state = _initializeRetryState({
        enableCircuitBreaker: true,
        maxAttempts: 10,
      });

      // Record 3 failures to open circuit
      for (let i = 0; i < 3; i++) {
        state = _recordFailure(state, "Network error", 503);
      }

      expect(state.circuitState).toEqual("open");

      // Simulate time passing and try recovery
      state = {
        ...state,
        circuitOpenedAt: new Date(Date.now() - state.config.maxDelayMs - 1000),
      };

      const canRetry = _canRetry(state);
      expect(canRetry.can).toBe(true); // Can try half-open

      // Transition to half-open for testing
      state = {
        ...state,
        circuitState: "half-open",
      };

      // Record success in half-open
      state = _recordSuccess(state);
      expect(state.circuitState).toEqual("closed");
    });
  });

  describe("Strategy Selection", () => {
    it("should compare strategy delays", () => {
      const aggressiveDelay = _calculateNextDelay(
        RETRY_STRATEGIES.aggressive,
        2,
      );
      const balancedDelay = _calculateNextDelay(RETRY_STRATEGIES.balanced, 2);
      const conservativeDelay = _calculateNextDelay(
        RETRY_STRATEGIES.conservative,
        2,
      );

      expect(aggressiveDelay).toBeLessThan(balancedDelay);
      expect(balancedDelay).toBeLessThan(conservativeDelay);
    });

    it("should compare strategy attempt counts", () => {
      expect(RETRY_STRATEGIES.aggressive.maxAttempts).toBeLessThan(
        RETRY_STRATEGIES.balanced.maxAttempts,
      );
      expect(RETRY_STRATEGIES.balanced.maxAttempts).toBeLessThan(
        RETRY_STRATEGIES.conservative.maxAttempts,
      );
    });
  });
});
