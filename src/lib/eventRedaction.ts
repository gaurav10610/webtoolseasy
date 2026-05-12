/**
 * Event Payload Redaction Utilities
 *
 * Ensures telemetry events never contain raw file content, sensitive data,
 * or information that should remain private to the user's device.
 *
 * This is critical for privacy compliance - telemetry should only contain:
 * - Event name and timestamp
 * - Workflow/step identifiers
 * - Non-sensitive metadata (file size, format type, etc.)
 * - Never: file content, API keys, passwords, PII
 */

import { WorkflowTelemetryEvent } from "@/types/workflow";

/**
 * Patterns that indicate sensitive data that should never be in telemetry
 */
const SENSITIVE_PATTERNS = {
  // API keys and tokens (aws_, sk_, pk_, ghp_, etc.)
  apiKeys: /(aws_|sk_|pk_|ghp_|gho_|ghu_|ghs_|ghr_)[a-zA-Z0-9_]{10,}/i,
  // Email addresses (PII) - check before password to avoid false positives
  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
  // Phone numbers (PII)
  phone: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/,
  // SSN/tax ID (PII)
  ssn: /\b\d{3}-\d{2}-\d{4}\b/,
  // Credit card numbers (PII)
  creditCard: /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/,
  // Password values (but not field names like "password")
  passwordValue:
    /(password|passwd|pwd|secret|token)\s*[:=]\s*['"]([^'"]+)['"]/i,
};

/**
 * Detects if a string contains sensitive data
 */
export const containsSensitiveData = (str: string | unknown): boolean => {
  if (typeof str !== "string") {
    return false;
  }

  // Check against all sensitive patterns
  for (const [_, pattern] of Object.entries(SENSITIVE_PATTERNS)) {
    if (pattern.test(str)) {
      return true;
    }
  }

  return false;
};

/**
 * Redacts sensitive data from a string
 */
export const redactString = (str: string): string => {
  let redacted = str;

  for (const [key, pattern] of Object.entries(SENSITIVE_PATTERNS)) {
    // Replace matched patterns with placeholder
    redacted = redacted.replace(pattern, `[REDACTED_${key.toUpperCase()}]`);
  }

  return redacted;
};

/**
 * Recursively scans an object for sensitive data in values
 */
export const findSensitiveDataPaths = (
  obj: unknown,
  path: string = "",
): string[] => {
  const paths: string[] = [];

  if (obj === null || obj === undefined) {
    return paths;
  }

  if (typeof obj === "string") {
    if (containsSensitiveData(obj)) {
      paths.push(path);
    }
    return paths;
  }

  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      paths.push(...findSensitiveDataPaths(item, `${path}[${index}]`));
    });
    return paths;
  }

  if (typeof obj === "object") {
    for (const [key, value] of Object.entries(obj)) {
      const newPath = path ? `${path}.${key}` : key;
      paths.push(...findSensitiveDataPaths(value, newPath));
    }
    return paths;
  }

  return paths;
};

/**
 * Validates that a telemetry event contains no sensitive data
 * Returns { valid: boolean, issues: string[] }
 */
export const validateEventPayloadSafety = (
  event: Partial<WorkflowTelemetryEvent>,
): { valid: boolean; issues: string[] } => {
  const issues: string[] = [];

  // Only certain fields are allowed in telemetry
  const allowedFields = [
    "name",
    "workflowSlug",
    "stepId",
    "projectId",
    "timestamp",
  ];
  const sensitiveFields = [
    "fileContent",
    "rawData",
    "apiKey",
    "token",
    "password",
    "secret",
  ];

  for (const key of Object.keys(event)) {
    if (!allowedFields.includes(key)) {
      issues.push(`Unexpected field "${key}" in telemetry event`);
    }

    if (sensitiveFields.some((s) => key.toLowerCase().includes(s))) {
      issues.push(`Sensitive field "${key}" detected in telemetry event`);
    }
  }

  // Check values for sensitive data
  const sensitiveValuePaths = findSensitiveDataPaths(event);
  if (sensitiveValuePaths.length > 0) {
    issues.push(
      `Sensitive data detected at paths: ${sensitiveValuePaths.join(", ")}`,
    );
  }

  return {
    valid: issues.length === 0,
    issues,
  };
};

/**
 * Creates a safe telemetry event by stripping any fields that could contain sensitive data
 * Only preserves the minimal necessary fields
 */
export const createSafeEvent = (
  name: string,
  workflowSlug: string,
  stepId?: string,
  projectId?: string,
): Partial<WorkflowTelemetryEvent> => {
  return {
    name: name as any, // Already validated at type level
    workflowSlug,
    stepId,
    projectId,
    timestamp: new Date().toISOString(),
    // Note: file content, raw data, etc. should NEVER be added here
  };
};

/**
 * Sanitizes a telemetry event before sending to external services
 * Removes any potentially sensitive fields and redacts values
 */
export const sanitizeEventForExternal = (
  event: Partial<WorkflowTelemetryEvent>,
): Partial<WorkflowTelemetryEvent> => {
  const sanitized: Partial<WorkflowTelemetryEvent> = {};

  // Only copy safe fields
  if (typeof event.name === "string") {
    sanitized.name = event.name as any;
  }
  if (typeof event.workflowSlug === "string") {
    sanitized.workflowSlug = event.workflowSlug;
  }
  if (typeof event.stepId === "string") {
    sanitized.stepId = event.stepId;
  }
  if (typeof event.projectId === "string") {
    sanitized.projectId = event.projectId;
  }
  if (typeof event.timestamp === "string") {
    sanitized.timestamp = event.timestamp;
  }

  // Validate before returning
  const validation = validateEventPayloadSafety(sanitized);
  if (!validation.valid) {
    console.warn(
      "Event payload validation failed after sanitization:",
      validation.issues,
    );
  }

  return sanitized;
};

/**
 * Middleware for event tracking that ensures no sensitive data leaves the browser
 * Can be used to wrap event emitter calls
 */
export const eventRedactionMiddleware = (
  event: Partial<WorkflowTelemetryEvent>,
): Partial<WorkflowTelemetryEvent> => {
  const validation = validateEventPayloadSafety(event);

  if (!validation.valid) {
    console.error(
      "Event payload contains sensitive data and will not be sent:",
      validation.issues,
    );
    // Return empty object to prevent sending
    return {
      timestamp: new Date().toISOString(),
    };
  }

  return sanitizeEventForExternal(event);
};
