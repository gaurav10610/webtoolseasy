# Workflow Pack Adapter Development Guide

**Purpose**: Guide for developers creating new tool adapters that can be wrapped into workflow steps.

## Overview

A **workflow pack adapter** is a TypeScript module that wraps an existing tool's functionality into a reusable workflow step. Adapters follow a standardized interface to ensure consistency across the workflow system.

## Adapter Architecture

### Core Concepts

- **Tool**: Individual capability (e.g., "JSON Formatter", "CSV Parser")
- **Adapter**: Wrapper around tool that implements `WorkflowStepAdapter` interface
- **Step**: Instance of an adapter in a workflow pack configuration
- **Runner**: React component that executes the step and manages state

### Adapter Interface

```typescript
interface WorkflowStepAdapter {
  id: string; // Unique adapter identifier
  name: string; // Human-readable name
  category: "data" | "content" | "seo" | "media" | "crypto";
  description: string; // Brief description of capability
  inputSchema: JSONSchema; // Validates step input
  outputSchema: JSONSchema; // Validates step output

  // Execution function
  execute(
    input: unknown,
    options?: Record<string, unknown>,
  ): Promise<AdapterExecutionResult>;

  // Validation function
  validate(input: unknown): ValidationResult;

  // Optional: transformation before execution
  transform?: (input: unknown) => unknown;
}

interface AdapterExecutionResult {
  success: boolean;
  output?: unknown;
  error?: string;
  metadata?: {
    executionTime: number;
    inputSize: number;
    outputSize: number;
    warnings?: string[];
  };
}
```

## Step 1: Create Adapter Module

### File Structure

```
src/components/workflows/[PackName]/
├── adapters/
│   ├── YourToolAdapter.ts          # Adapter implementation
│   └── index.ts                     # Export
├── index.ts
└── [PackName]Config.ts              # Pack configuration
```

### Adapter Implementation Template

```typescript
// src/components/workflows/YourPack/adapters/YourToolAdapter.ts
import type {
  WorkflowStepAdapter,
  AdapterExecutionResult,
} from "@/types/config";

export const yourToolAdapter: WorkflowStepAdapter = {
  id: "your-tool-adapter",
  name: "Your Tool",
  category: "data",
  description: "Performs operation on input data",

  inputSchema: {
    type: "object",
    properties: {
      data: { type: "string", description: "Input data" },
      options: {
        type: "object",
        properties: {
          // Define options here
        },
      },
    },
    required: ["data"],
  },

  outputSchema: {
    type: "object",
    properties: {
      result: { type: "string", description: "Processed result" },
      stats: {
        type: "object",
        properties: {
          inputLength: { type: "number" },
          outputLength: { type: "number" },
        },
      },
    },
  },

  validate(input: unknown) {
    const errors: string[] = [];

    if (!input || typeof input !== "object") {
      errors.push("Input must be an object");
    } else {
      const obj = input as Record<string, unknown>;
      if (!obj.data || typeof obj.data !== "string") {
        errors.push("data property must be a non-empty string");
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  async execute(input: unknown): Promise<AdapterExecutionResult> {
    const startTime = performance.now();

    try {
      const validation = this.validate(input);
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.errors.join("; "),
        };
      }

      const obj = input as { data: string; options?: Record<string, unknown> };

      // Your tool logic here
      const result = obj.data.toUpperCase(); // Example

      return {
        success: true,
        output: {
          result,
          stats: {
            inputLength: obj.data.length,
            outputLength: result.length,
          },
        },
        metadata: {
          executionTime: performance.now() - startTime,
          inputSize: JSON.stringify(obj).length,
          outputSize: JSON.stringify(result).length,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        metadata: {
          executionTime: performance.now() - startTime,
          inputSize: 0,
          outputSize: 0,
        },
      };
    }
  },
};
```

## Step 2: Create Step Component

### StepComponent Template

```typescript
// src/components/workflows/YourPack/Step1.tsx
import React, { useState } from "react";
import { Box, TextField, Button, Card } from "@mui/material";
import type { WorkflowStepConfig } from "@/types/config";
import { yourToolAdapter } from "./adapters/YourToolAdapter";

interface Step1Props {
  config: WorkflowStepConfig;
  onNext: (data: unknown) => void;
  previousStepOutput?: unknown;
}

export const Step1: React.FC<Step1Props> = ({
  config,
  onNext,
  previousStepOutput,
}) => {
  const [input, setInput] = useState(
    typeof previousStepOutput === "string" ? previousStepOutput : ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExecute = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await yourToolAdapter.execute({ data: input });

      if (!result.success) {
        setError(result.error || "Execution failed");
        return;
      }

      onNext(result.output);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <TextField
        fullWidth
        multiline
        rows={6}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter input data..."
        disabled={loading}
      />

      {error && (
        <Box sx={{ mt: 2, color: "error.main" }}>
          {error}
        </Box>
      )}

      <Button
        variant="contained"
        onClick={handleExecute}
        disabled={!input || loading}
        sx={{ mt: 2 }}
      >
        {loading ? "Processing..." : config.title}
      </Button>
    </Card>
  );
};
```

## Step 3: Integration Patterns

### Local-Only Execution

For adapters that don't require network calls:

```typescript
// Mark execution mode in step config
const step: WorkflowStepConfig = {
  id: "step-1",
  title: "Process Data",
  description: "Transform data locally",
  executionMode: "local-only", // No network calls allowed
};

// Adapter can be safely imported and executed in browser
```

### Network-Based Execution

For adapters that need external APIs:

```typescript
// Mark execution mode in step config
const step: WorkflowStepConfig = {
  id: "step-2",
  title: "Validate with API",
  description: "Call external validation service",
  executionMode: "network", // Network calls permitted
};

// Use apiService with privacy boundaries
import { makeApiRequestFlow } from "@/service/apiService";

async execute(input: unknown) {
  const result = await makeApiRequestFlow({
    endpoint: "https://api.example.com/validate",
    method: "POST",
    body: input,
  });
  // ... handle result
}
```

### Export-Only Mode

For adapters that prepare data for download:

```typescript
const step: WorkflowStepConfig = {
  id: "step-3",
  title: "Generate Report",
  description: "Create downloadable report",
  executionMode: "export-only", // Output should be exported
};

async execute(input: unknown): Promise<AdapterExecutionResult> {
  // Process and prepare export format
  const csv = convertToCSV(input);
  return {
    success: true,
    output: {
      format: "text/csv",
      content: csv,
      filename: "report.csv",
    },
  };
}
```

## Step 4: Testing the Adapter

### Unit Test Template

```typescript
// src/__tests__/your-tool-adapter.test.ts
import { describe, it, expect } from "vitest";
import { yourToolAdapter } from "@/components/workflows/YourPack/adapters/YourToolAdapter";

describe("YourToolAdapter", () => {
  describe("validate", () => {
    it("should validate correct input", () => {
      const result = yourToolAdapter.validate({ data: "test" });
      expect(result.isValid).toBe(true);
    });

    it("should reject invalid input", () => {
      const result = yourToolAdapter.validate({ data: "" });
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe("execute", () => {
    it("should execute successfully with valid input", async () => {
      const result = await yourToolAdapter.execute({ data: "test" });
      expect(result.success).toBe(true);
      expect(result.output).toBeDefined();
    });

    it("should handle errors gracefully", async () => {
      const result = await yourToolAdapter.execute(null);
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it("should track execution metadata", async () => {
      const result = await yourToolAdapter.execute({ data: "test" });
      expect(result.metadata?.executionTime).toBeGreaterThanOrEqual(0);
    });
  });
});
```

### E2E Test Template

```typescript
// e2e/your-pack.spec.ts
import { test, expect } from "@playwright/test";

test.describe("YourPack Workflow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/workflows/your-pack");
  });

  test("should execute step successfully", async ({ page }) => {
    const inputField = page.locator('[data-testid="step-1-input"]');
    await inputField.fill("test input");

    const executeButton = page.locator('[data-testid="step-1-execute"]');
    await executeButton.click();

    const output = page.locator('[data-testid="step-1-output"]');
    await expect(output).toBeVisible();
  });

  test("should handle errors", async ({ page }) => {
    const executeButton = page.locator('[data-testid="step-1-execute"]');
    await executeButton.click();

    const errorMessage = page.locator('[data-testid="error-message"]');
    await expect(errorMessage).toBeVisible();
  });
});
```

## Step 5: Performance Considerations

### Memory Management

```typescript
// Process large inputs in chunks
async executeWithChunking(input: string, chunkSize = 10000) {
  const chunks = [];
  for (let i = 0; i < input.length; i += chunkSize) {
    const chunk = input.slice(i, i + chunkSize);
    const result = await this.processChunk(chunk);
    chunks.push(result);
  }
  return chunks.join("");
}
```

### Optimization Patterns

```typescript
// Use Web Workers for heavy computation
if (typeof Worker !== "undefined") {
  const worker = new Worker("/workers/computation.worker.js");
  worker.postMessage({ input });
  // Listen for results
}

// Cache results for repeated inputs
const cache = new Map();
async execute(input: unknown) {
  const key = JSON.stringify(input);
  if (cache.has(key)) return cache.get(key);

  const result = await this.process(input);
  cache.set(key, result);
  return result;
}
```

## Step 6: Privacy & Security Checklist

- [ ] Adapter validates all inputs before processing
- [ ] No console logging of sensitive data
- [ ] Local-only steps don't make network calls
- [ ] API calls use `makeApiRequestFlow` with privacy boundaries
- [ ] Export output validated with `validateExportData()`
- [ ] No credentials or keys hardcoded
- [ ] Error messages don't leak sensitive details
- [ ] Large files cleaned up after processing

## Quick Start Checklist

- [ ] Create adapter module with `WorkflowStepAdapter` interface
- [ ] Implement `validate()` and `execute()` methods
- [ ] Create step component wrapping adapter
- [ ] Add unit tests (80%+ coverage)
- [ ] Add E2E tests for happy path
- [ ] Update workflow pack configuration
- [ ] Test locally with `npm run dev`
- [ ] Verify production build succeeds
- [ ] Submit PR with linked issue

## Common Issues

### Issue: "Cannot read properties of undefined (reading 'data')"

**Solution**: Always validate input before accessing properties

```typescript
const obj = input as { data?: string } | null;
if (!obj?.data) return { success: false, error: "data is required" };
```

### Issue: Network call failing in local-only step

**Solution**: Ensure execution mode is set correctly and use boundary checks

```typescript
if (config.executionMode === "local-only") {
  if (requiresNetwork(input)) {
    return { success: false, error: "Network not allowed" };
  }
}
```

### Issue: Large outputs causing memory issues

**Solution**: Stream or chunk output, implement cleanup

```typescript
async execute(input: unknown) {
  const result = await this.process(input);
  // Clean up large intermediate data
  delete (result as any).tempData;
  return result;
}
```

## Related Documentation

- [WORKFLOW_CODING_CONVENTIONS.md](./WORKFLOW_CODING_CONVENTIONS.md) - General workflow development patterns
- [src/types/config.ts](./src/types/config.ts) - TypeScript type definitions
- [src/service/apiService.ts](./src/service/apiService.ts) - API request utilities
- [src/lib/exportValidation.ts](./src/lib/exportValidation.ts) - Export validation helpers
