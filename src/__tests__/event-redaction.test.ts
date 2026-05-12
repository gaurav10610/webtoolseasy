import { describe, it, expect } from "vitest";
import {
  validateEventPayloadSafety,
  containsSensitiveData,
  redactString,
  findSensitiveDataPaths,
  sanitizeEventForExternal,
  eventRedactionMiddleware,
} from "@/lib/eventRedaction";

describe("Event Payload Redaction", () => {
  describe("containsSensitiveData", () => {
    it("detects AWS API keys", () => {
      expect(containsSensitiveData("aws_1234567890abcdef")).toBe(true);
    });

    it("detects Stripe keys", () => {
      expect(containsSensitiveData("sk_live_abc123def456")).toBe(true);
    });

    it("detects GitHub tokens", () => {
      expect(
        containsSensitiveData("ghp_1234567890abcdefghijklmnopqrstuvwxyz"),
      ).toBe(true);
    });

    it("detects email addresses", () => {
      expect(containsSensitiveData("user@example.com")).toBe(true);
    });

    it("detects phone numbers", () => {
      expect(containsSensitiveData("555-123-4567")).toBe(true);
      expect(containsSensitiveData("555.123.4567")).toBe(true);
      expect(containsSensitiveData("5551234567")).toBe(true);
    });

    it("detects SSN format", () => {
      expect(containsSensitiveData("123-45-6789")).toBe(true);
    });

    it("detects credit card numbers", () => {
      expect(containsSensitiveData("4111-1111-1111-1111")).toBe(true);
      expect(containsSensitiveData("4111 1111 1111 1111")).toBe(true);
    });

    it("allows safe strings", () => {
      expect(containsSensitiveData("api-payload-cleanup")).toBe(false);
      expect(containsSensitiveData("workflow_completed")).toBe(false);
      expect(containsSensitiveData("abc123xyz789")).toBe(false);
    });

    it("returns false for non-string inputs", () => {
      expect(containsSensitiveData(123)).toBe(false);
      expect(containsSensitiveData({ email: "test@example.com" })).toBe(false);
      expect(containsSensitiveData(null)).toBe(false);
    });
  });

  describe("redactString", () => {
    it("redacts API keys", () => {
      const input = "secret key is sk_live_1234567890abcdef here";
      const result = redactString(input);
      expect(result).toContain("[REDACTED_APIKEYS]");
      expect(result).not.toContain("sk_live");
    });

    it("redacts email addresses", () => {
      const input = "contact user@example.com for details";
      const result = redactString(input);
      expect(result).toContain("[REDACTED_EMAIL]");
      expect(result).not.toContain("@");
    });

    it("preserves non-sensitive content", () => {
      const input = "workflow_completed event logged";
      const result = redactString(input);
      expect(result).toBe(input);
    });

    it("handles multiple sensitive patterns", () => {
      const input =
        "user@example.com has key sk_live_1234567890 and phone 555-123-4567";
      const result = redactString(input);
      expect(result).toContain("[REDACTED_EMAIL]");
      expect(result).toContain("[REDACTED_APIKEYS]");
      expect(result).toContain("[REDACTED_PHONE]");
    });
  });

  describe("findSensitiveDataPaths", () => {
    it("finds sensitive data in object paths", () => {
      const obj = {
        name: "test",
        email: "user@example.com",
        apiKey: "sk_live_1234567890", // API key in value
      };
      const paths = findSensitiveDataPaths(obj);
      expect(paths).toContain("email");
      expect(paths).toContain("apiKey");
    });

    it("finds sensitive data in arrays", () => {
      const obj = {
        values: ["safe", "user@example.com", "also-safe"],
      };
      const paths = findSensitiveDataPaths(obj);
      expect(paths).toContain("values[1]");
    });

    it("returns empty array for safe objects", () => {
      const obj = {
        workflowSlug: "api-cleanup",
        stepId: "validate",
      };
      const paths = findSensitiveDataPaths(obj);
      expect(paths).toHaveLength(0);
    });
  });

  describe("validateEventPayloadSafety", () => {
    it("validates safe event payloads", () => {
      const event = {
        name: "workflow_completed" as const,
        workflowSlug: "api-cleanup",
        stepId: "validate",
        timestamp: new Date().toISOString(),
      };
      const result = validateEventPayloadSafety(event);
      expect(result.valid).toBe(true);
      expect(result.issues).toHaveLength(0);
    });

    it("rejects events with extra fields", () => {
      const event = {
        name: "workflow_completed" as const,
        workflowSlug: "api-cleanup",
        fileContent: "sensitive data here",
      } as any;
      const result = validateEventPayloadSafety(event);
      expect(result.valid).toBe(false);
      expect(result.issues.some((i) => i.includes("fileContent"))).toBe(true);
    });

    it("rejects events with sensitive field names", () => {
      const event = {
        name: "workflow_completed" as const,
        workflowSlug: "api-cleanup",
        apiKey: "sk_live_123",
      } as any;
      const result = validateEventPayloadSafety(event);
      expect(result.valid).toBe(false);
      expect(result.issues.some((i) => i.includes("apiKey"))).toBe(true);
    });

    it("rejects events with sensitive data in values", () => {
      const event = {
        name: "workflow_completed" as const,
        workflowSlug: "user@example.com", // PII in slug
        timestamp: new Date().toISOString(),
      };
      const result = validateEventPayloadSafety(event);
      expect(result.valid).toBe(false);
      expect(
        result.issues.some((i) => i.includes("Sensitive data detected")),
      ).toBe(true);
    });
  });

  describe("sanitizeEventForExternal", () => {
    it("preserves only safe fields", () => {
      const event = {
        name: "workflow_completed" as const,
        workflowSlug: "api-cleanup",
        stepId: "validate",
        timestamp: new Date().toISOString(),
        fileContent: "should be removed", // Not in allowed list
      } as any;
      const sanitized = sanitizeEventForExternal(event);
      expect(sanitized.name).toBe("workflow_completed");
      expect(sanitized.workflowSlug).toBe("api-cleanup");
      expect((sanitized as any).fileContent).toBeUndefined();
    });

    it("handles undefined and null values gracefully", () => {
      const event = {
        name: "workflow_completed" as const,
        workflowSlug: "api-cleanup",
        stepId: undefined,
      };
      const sanitized = sanitizeEventForExternal(event);
      expect(sanitized.stepId).toBeUndefined();
    });
  });

  describe("eventRedactionMiddleware", () => {
    it("allows safe events to pass through", () => {
      const event = {
        name: "workflow_completed" as const,
        workflowSlug: "api-cleanup",
        timestamp: new Date().toISOString(),
      };
      const result = eventRedactionMiddleware(event);
      expect(result.workflowSlug).toBe("api-cleanup");
    });

    it("blocks events with sensitive data", () => {
      const event = {
        name: "workflow_completed" as const,
        workflowSlug: "api-cleanup",
        apiKey: "sk_live_secret123", // Sensitive field
      } as any;
      const result = eventRedactionMiddleware(event);
      expect((result as any).apiKey).toBeUndefined();
    });

    it("always includes timestamp in result", () => {
      const event = {
        name: "workflow_completed" as const,
        workflowSlug: "user@example.com", // Sensitive value
      };
      const result = eventRedactionMiddleware(event);
      expect(result.timestamp).toBeDefined();
    });
  });

  describe("integration: sensitive data blocking", () => {
    it("prevents event emission with file content", () => {
      const malformedEvent = {
        name: "workflow_completed" as const,
        workflowSlug: "api-cleanup",
        fileContent: '{\n  large: "JSON object"\n}', // Should not be sent
      } as any;

      const result = eventRedactionMiddleware(malformedEvent);
      // fileContent should be stripped, workflowSlug removed due to extra field violation
      expect((result as any).fileContent).toBeUndefined();
      expect(result.timestamp).toBeDefined(); // Always includes timestamp
    });

    it("prevents event emission with API keys in metadata", () => {
      const event = {
        name: "workflow_completed" as const,
        workflowSlug: "api-cleanup",
        projectId: "ghp_1234567890abcdefghijklmnopqrstuvwxyz123", // Token instead of ID
      } as any;

      const result = eventRedactionMiddleware(event);
      expect(result.projectId).toBeUndefined();
    });

    it("allows safe events through middleware", () => {
      const safeEvent = {
        name: "workflow_completed" as const,
        workflowSlug: "api-cleanup",
        stepId: "validate",
        timestamp: new Date().toISOString(),
      };

      const result = eventRedactionMiddleware(safeEvent);
      expect(result.workflowSlug).toBe("api-cleanup");
      expect(result.stepId).toBe("validate");
    });
  });
});
