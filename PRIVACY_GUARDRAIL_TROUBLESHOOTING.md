# Privacy Guardrail Troubleshooting Guide

**Purpose**: Help developers diagnose and fix privacy guardrail violations in workflow steps and adapters.

## Overview

Privacy guardrails prevent accidental PII exposure, network leaks, and data persistence violations. This guide helps identify, debug, and resolve guardrail failures.

## Common Guardrail Violations

### 1. Network Call in Local-Only Step

**Error Message**:

```
Privacy Boundary Violation: Network request attempted in local-only step "step-id"
Step config specifies executionMode: "local-only" but network call detected.
```

**Root Causes**:

- Importing `fetch` or `XMLHttpRequest` in local-only adapter
- Calling `makeApiRequestFlow` without checking execution mode
- Using third-party library that makes HTTP requests
- Async function making background API calls

**Diagnosis**:

```bash
# Check step configuration
grep -n "executionMode" src/components/workflows/YourPack/*.ts

# Verify adapter doesn't import network libraries
grep -n "fetch\|XMLHttpRequest\|makeApiRequestFlow" src/components/workflows/YourPack/adapters/*.ts
```

**Fix Pattern**:

```typescript
// WRONG: Local-only step making network call
export const adapter: WorkflowStepAdapter = {
  executionMode: "local-only",
  async execute(input: unknown) {
    // ❌ This violates the guardrail
    const result = await fetch("https://api.example.com/process", {
      method: "POST",
      body: JSON.stringify(input),
    });
    return result.json();
  },
};

// RIGHT: Conditionally make network call or use network mode
export const adapter: WorkflowStepAdapter = {
  executionMode: "network", // Declare network capability
  async execute(input: unknown) {
    // ✅ Network call allowed
    const result = await makeApiRequestFlow({
      endpoint: "https://api.example.com/process",
      method: "POST",
      body: input,
    });
    return result;
  },
};

// RIGHT: Local-only without network
export const adapter: WorkflowStepAdapter = {
  executionMode: "local-only",
  execute(input: unknown) {
    // ✅ Only pure functions, no network
    return {
      success: true,
      output: transform(input),
    };
  },
};
```

### 2. Sensitive Data Logged to Console

**Error Message**:

```
Privacy Boundary Violation: Potential sensitive data detected in console output
Pattern matched: "password", "token", "api_key", "secret"
```

**Root Causes**:

- Using `console.log()` with user input or API responses
- Logging entire step input/output without filtering
- Debug statements left in production code

**Diagnosis**:

```bash
# Find console statements
grep -n "console\." src/components/workflows/YourPack/adapters/*.ts

# Check test logs
npm run test:unit -- src/__tests__/your-adapter.test.ts --reporter=verbose
```

**Fix Pattern**:

```typescript
// WRONG: Logging sensitive data
async execute(input: unknown) {
  console.log("Processing:", input); // ❌ May expose secrets
  const result = await process(input);
  console.log("Result:", result);    // ❌ May expose keys
  return { success: true, output: result };
}

// RIGHT: Redact sensitive fields
async execute(input: unknown) {
  const sanitized = redactSensitiveFields(input);
  if (process.env.NODE_ENV === "development") {
    console.log("Processing:", sanitized); // ✅ Safe debug logging
  }
  const result = await process(input);
  return { success: true, output: result };
}

// Helper function for redaction
function redactSensitiveFields(obj: unknown): unknown {
  if (!obj || typeof obj !== "object") return obj;

  const sensitivePatterns = [
    /password/i,
    /token/i,
    /api_?key/i,
    /secret/i,
  ];

  const copy = JSON.parse(JSON.stringify(obj));
  const redact = (obj: any, depth = 0) => {
    if (depth > 10) return obj;

    for (const key in obj) {
      if (sensitivePatterns.some(p => p.test(key))) {
        obj[key] = "***REDACTED***";
      } else if (typeof obj[key] === "object") {
        redact(obj[key], depth + 1);
      }
    }
  };

  redact(copy);
  return copy;
}
```

### 3. Private File Content Persistence

**Error Message**:

```
Privacy Boundary Violation: Attempting to persist user file content
Steps marked "local-only" or "export-only" should not store to server.
Use localStorage with "wte_" prefix for client-side only storage.
```

**Root Causes**:

- Calling API to save step output
- Using IndexedDB or other persistent storage without encryption
- Storing intermediate results server-side
- Auto-saving to cloud storage

**Diagnosis**:

```bash
# Check for API calls in adapters
grep -n "POST\|PUT\|apiService\|fetch" src/components/workflows/YourPack/adapters/*.ts

# Verify localStorage usage
grep -n "localStorage" src/components/workflows/YourPack/*.tsx
# Should use "wte_" prefix pattern
```

**Fix Pattern**:

```typescript
// WRONG: Persisting file content to server
async execute(input: unknown) {
  const output = process(input);

  // ❌ Persists user content to server
  await fetch("/api/save-workflow-result", {
    method: "POST",
    body: JSON.stringify({ output }),
  });

  return { success: true, output };
}

// RIGHT: Client-side only storage
async execute(input: unknown) {
  const output = process(input);

  // ✅ Client-side localStorage only
  const stepState = {
    output,
    timestamp: Date.now(),
  };
  localStorage.setItem(
    `wte_workflow_step_${stepId}`,
    JSON.stringify(stepState)
  );

  return { success: true, output };
}

// RIGHT: If server storage needed, encrypt first
async execute(input: unknown) {
  const output = process(input);

  // ✅ Encrypt before persisting
  const encrypted = await encryptData(
    JSON.stringify(output),
    userEncryptionKey
  );

  await apiService.post("/api/encrypted-results", {
    encryptedData: encrypted,
    // Don't send unencrypted content
  });

  return { success: true, output };
}
```

### 4. PII Detected in Export

**Error Message**:

```
Privacy Boundary Violation: Potential PII detected in export output
Patterns matched: email addresses, phone numbers, SSN, credit card numbers
File will not be exported until data is sanitized or confirmed.
```

**Root Causes**:

- Adapter processes user data without PII filtering
- Output includes test data with real personal information
- Copying full input to output without filtering
- API responses containing user details

**Diagnosis**:

```bash
# Run export validation
npm run test:unit -- src/__tests__/export-validation.test.ts

# Check your adapter output against patterns
grep -n "@.*\.com\|\\b[0-9]{3}-[0-9]{2}-[0-9]{4}\|\\b[0-9]{16}" \
  src/components/workflows/YourPack/adapters/*.ts
```

**Fix Pattern**:

```typescript
// WRONG: Exporting PII
async execute(input: unknown) {
  // Assumes input has full user profile
  return {
    success: true,
    output: input, // ❌ May contain email, phone, etc.
  };
}

// RIGHT: Filter and anonymize
async execute(input: unknown) {
  const safeOutput = sanitizeForExport(input);
  return {
    success: true,
    output: safeOutput, // ✅ Sanitized, safe to export
  };
}

function sanitizeForExport(data: unknown): unknown {
  if (!data || typeof data !== "object") return data;

  const copy = JSON.parse(JSON.stringify(data));

  // Remove known PII fields
  const piiFields = ["email", "phone", "ssn", "creditCard", "password"];
  const removePii = (obj: any) => {
    for (const field of piiFields) {
      delete obj[field];
    }
    for (const key in obj) {
      if (typeof obj[key] === "object") removePii(obj[key]);
    }
  };

  removePii(copy);
  return copy;
}
```

### 5. API Key Exposed in Step Configuration

**Error Message**:

```
Privacy Boundary Violation: Hardcoded API key detected in workflow step
Keys should never be hardcoded; use environment variables or secure storage.
```

**Root Causes**:

- Hardcoding API keys in adapter code
- Checking secrets into version control
- Storing keys in workflow configuration JSON
- Environment variables not being used

**Diagnosis**:

```bash
# Search for hardcoded keys
grep -n "sk_\|pk_\|Bearer\|Authorization" src/components/workflows/**/*.ts

# Verify .env.local is in .gitignore
grep ".env" .gitignore
```

**Fix Pattern**:

```typescript
// WRONG: Hardcoded API key
export const adapter: WorkflowStepAdapter = {
  async execute(input: unknown) {
    const response = await fetch("https://api.stripe.com/process", {
      headers: {
        Authorization: "Bearer sk_test_123456789", // ❌ EXPOSED!
      },
    });
    return response.json();
  },
};

// RIGHT: Use environment variables
export const adapter: WorkflowStepAdapter = {
  async execute(input: unknown) {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY; // ✅ Env var
    const response = await fetch("https://api.stripe.com/process", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    return response.json();
  },
};

// RIGHT: For secrets, use server-side API route
// src/app/api/process-payment/route.ts
export async function POST(req: Request) {
  const apiKey = process.env.STRIPE_SECRET_KEY; // ✅ Server-only env var
  const data = await req.json();

  const response = await fetch("https://api.stripe.com/process", {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(data),
  });

  return response.json();
}
```

## Guardrail Testing Patterns

### Test Privacy Boundary Validation

```typescript
// src/__tests__/your-adapter-privacy.test.ts
import { describe, it, expect } from "vitest";
import { yourAdapter } from "@/components/workflows/YourPack/adapters";
import { analyzePrivacyChain } from "@/lib/serverClientBoundary";

describe("YourAdapter Privacy", () => {
  describe("executionMode boundary", () => {
    it("should respect local-only execution boundary", () => {
      const step = { executionMode: "local-only" } as any;

      // Verify adapter doesn't make network calls
      expect(yourAdapter.execute.toString()).not.toContain("fetch");
      expect(yourAdapter.execute.toString()).not.toContain("XMLHttpRequest");
    });
  });

  describe("console logging", () => {
    it("should not log sensitive patterns", async () => {
      const consoleSpy = vi.spyOn(console, "log");

      await yourAdapter.execute({ data: "test", password: "secret123" });

      consoleSpy.mock.calls.forEach((call) => {
        expect(call[0].toString()).not.toContain("password");
        expect(call[0].toString()).not.toContain("secret");
      });
    });
  });

  describe("export validation", () => {
    it("should sanitize PII before export", async () => {
      const result = await yourAdapter.execute({
        data: "test",
        email: "user@example.com",
      });

      const exportedData = JSON.stringify(result.output);
      expect(exportedData).not.toContain("@example.com");
    });
  });
});
```

## Debug Checklist

When a guardrail violation occurs:

- [ ] Check step configuration `executionMode` setting
- [ ] Search adapter code for network calls (`fetch`, `XMLHttpRequest`, `makeApiRequestFlow`)
- [ ] Review console output for sensitive data patterns
- [ ] Check for hardcoded API keys or credentials
- [ ] Verify localStorage uses "wte\_" prefix
- [ ] Run export validation on output
- [ ] Check for PII patterns in test data
- [ ] Review error messages for clues
- [ ] Check browser console for warnings
- [ ] Run `npm run test:unit` with privacy tests

## Resolution Workflow

1. **Identify** the specific guardrail violation from error message
2. **Locate** the offending code using grep patterns provided
3. **Review** the fix pattern for your specific violation type
4. **Implement** the recommended fix
5. **Test** with `npm run test:unit -- src/__tests__/*privacy*.test.ts`
6. **Verify** with local dev server: `npm run dev`
7. **Build** to ensure no regressions: `npm run build`
8. **Commit** with issue reference: `git commit -m "Fix privacy violation in TB-XXX"`

## When to Ask for Help

If you encounter:

- Multiple simultaneous guardrail violations
- Guardrail conflict (e.g., must use network but privacy boundary forbids it)
- Unclear error messages
- Questions about encryption/key management
- Need to bypass guardrail (requires security review)

**Process**:

1. Create a GitHub issue with reproduction steps
2. Include full error message and code snippet
3. Tag with `privacy`, `guardrail`, and relevant adapter name
4. Reference this troubleshooting guide in description
5. Request design review if guardrail seems overly restrictive

## Related Documentation

- [WORKFLOW_CODING_CONVENTIONS.md](./WORKFLOW_CODING_CONVENTIONS.md) - Privacy boundaries section
- [WORKFLOW_PACK_ADAPTER_GUIDE.md](./WORKFLOW_PACK_ADAPTER_GUIDE.md) - Security checklist
- [src/lib/serverClientBoundary.ts](./src/lib/serverClientBoundary.ts) - Boundary implementation
- [src/lib/exportValidation.ts](./src/lib/exportValidation.ts) - Export validation details
