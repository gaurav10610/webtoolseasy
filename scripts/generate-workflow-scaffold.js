#!/usr/bin/env node

/**
 * Workflow Scaffold Generator
 *
 * Generates boilerplate files for a new workflow pack.
 * Usage: node scripts/generate-workflow-scaffold.js <workflow-name> [category]
 * Example: node scripts/generate-workflow-scaffold.js "api-payload-cleanup" "developer"
 */

const fs = require("fs");
const path = require("path");

function toPascalCase(str) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/\s+/g, "-");
}

function validateInputs(args) {
  if (args.length < 1) {
    console.error(
      "Usage: node scripts/generate-workflow-scaffold.js <name> [category]",
    );
    console.error("Categories: developer, content, seo, document, media");
    process.exit(1);
  }

  const name = args[0];
  const category = args[1] || "developer";

  const validCategories = ["developer", "content", "seo", "document", "media"];
  if (!validCategories.includes(category)) {
    console.error(
      `Invalid category. Must be one of: ${validCategories.join(", ")}`,
    );
    process.exit(1);
  }

  const slug = toKebabCase(name);
  const pascalName = toPascalCase(slug);

  return { name, slug, pascalName, category };
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function generateConfigTemplate(opts) {
  return `{
    id: "wf-${opts.slug}",
    slug: "${opts.slug}",
    name: "${opts.pascalName}",
    summary: "TODO: Add workflow summary (1-2 sentences describing what this workflow does and why users benefit)",
    category: "${opts.category}",
    tags: ["TODO", "add", "relevant", "tags"],
    steps: [
      {
        id: "step-1",
        title: "Step One Title",
        description: "Describe what this step does in 1-2 sentences.",
        executionMode: "local-only",
      },
      {
        id: "step-2",
        title: "Step Two Title",
        description: "Describe what this step does in 1-2 sentences.",
        executionMode: "export-only",
      },
    ],
    outputArtifacts: ["output1.json", "output2.csv"],
  },`;
}

function generateStepComponentTemplate(opts, stepNum) {
  const stepName = `Step${stepNum}`;
  const stepId = `step-${stepNum}`;

  return `import React, { useState } from "react";
import { AppBox, AppText, AppButton } from "@/components/common";
import { WorkflowStepConfig } from "@/types/workflow";

interface ${stepName}StepProps {
  step: WorkflowStepConfig;
  previousOutput?: any;
  onComplete: (output: any) => void;
}

export const ${stepName}Step: React.FC<${stepName}StepProps> = ({
  step,
  previousOutput,
  onComplete,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProcess = async () => {
    try {
      setIsProcessing(true);
      setError(null);

      // TODO: Implement step logic
      // This is where you add the core business logic for this step
      const result = {
        stepId: step.id,
        data: previousOutput,
        // Add your processing results here
      };

      onComplete(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AppBox sx={{ p: 2, border: "1px solid #e0e0e0", borderRadius: 1 }}>
      <AppText variant="h6" sx={{ mb: 1 }}>
        {step.title}
      </AppText>
      <AppText variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
        {step.description}
      </AppText>

      {error && (
        <AppBox sx={{ mb: 2, p: 1, bgcolor: "#ffebee", borderRadius: 1 }}>
          <AppText variant="body2" sx={{ color: "#d32f2f" }}>
            Error: {error}
          </AppText>
        </AppBox>
      )}

      <AppButton
        onClick={handleProcess}
        disabled={isProcessing}
        variant="contained"
      >
        {isProcessing ? "Processing..." : "Execute Step"}
      </AppButton>
    </AppBox>
  );
};
`;
}

function generateUnitTestTemplate(opts) {
  return `import { describe, it, expect } from "vitest";
import { WorkflowPackConfig } from "@/types/workflow";
import { workflowPacks } from "@/data/workflows";

describe("${opts.pascalName} Workflow", () => {
  let workflowConfig: WorkflowPackConfig | undefined;

  it("should have workflow pack registered", () => {
    workflowConfig = workflowPacks.find((p) => p.slug === "${opts.slug}");
    expect(workflowConfig).toBeDefined();
  });

  it("should have valid configuration structure", () => {
    if (!workflowConfig) throw new Error("Workflow not found");

    expect(workflowConfig.id).toBe("wf-${opts.slug}");
    expect(workflowConfig.slug).toBe("${opts.slug}");
    expect(workflowConfig.category).toBe("${opts.category}");
    expect(workflowConfig.steps.length).toBeGreaterThan(0);
    expect(workflowConfig.outputArtifacts.length).toBeGreaterThan(0);
  });

  it("should have at least 2 steps", () => {
    if (!workflowConfig) throw new Error("Workflow not found");
    expect(workflowConfig.steps.length).toBeGreaterThanOrEqual(2);
  });

  it("should have valid execution modes", () => {
    if (!workflowConfig) throw new Error("Workflow not found");

    const validModes = ["local-only", "network", "export-only"];
    workflowConfig.steps.forEach((step) => {
      expect(validModes).toContain(step.executionMode);
    });
  });

  it("should have at least one local-only step", () => {
    if (!workflowConfig) throw new Error("Workflow not found");

    const hasLocalOnly = workflowConfig.steps.some(
      (s) => s.executionMode === "local-only"
    );
    expect(hasLocalOnly).toBe(true);
  });

  it("should have export step at the end", () => {
    if (!workflowConfig) throw new Error("Workflow not found");

    const lastStep = workflowConfig.steps[workflowConfig.steps.length - 1];
    expect(lastStep.executionMode).toBe("export-only");
  });

  it("should have descriptive tags", () => {
    if (!workflowConfig) throw new Error("Workflow not found");

    expect(workflowConfig.tags.length).toBeGreaterThanOrEqual(3);
    expect(workflowConfig.tags.some((t) => t !== "TODO")).toBe(true);
  });

  it("should have unique step IDs within workflow", () => {
    if (!workflowConfig) throw new Error("Workflow not found");

    const stepIds = workflowConfig.steps.map((s) => s.id);
    const uniqueIds = new Set(stepIds);
    expect(uniqueIds.size).toBe(stepIds.length);
  });

  // TODO: Add business logic tests for individual steps
});
`;
}

function generateE2ETestTemplate(opts) {
  return `import { test, expect } from "@playwright/test";

test.describe("${opts.pascalName} Workflow E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/workflows/${opts.slug}");
  });

  test("should load workflow page", async ({ page }) => {
    await expect(page).toHaveTitle(/.*${opts.pascalName}.*/);
    const heading = page.locator("h1");
    await expect(heading).toContainText("${opts.pascalName}");
  });

  test("should display all workflow steps", async ({ page }) => {
    const steps = page.locator('[data-testid^="workflow-step-"]');
    const count = await steps.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test("should display workflow summary", async ({ page }) => {
    const summary = page.locator('[data-testid="workflow-summary"]');
    await expect(summary).toBeVisible();
  });

  test("should have valid execution mode badges", async ({ page }) => {
    const badges = page.locator('[data-testid="execution-mode-badge"]');
    const count = await badges.count();
    expect(count).toBeGreaterThanOrEqual(1);

    // Verify at least one badge shows local-only or export-only
    const badgeTexts = await badges.allTextContents();
    const hasValidMode = badgeTexts.some(
      (text) => text.includes("local-only") || text.includes("export-only")
    );
    expect(hasValidMode).toBe(true);
  });

  test("should navigate to first step", async ({ page }) => {
    const firstStepBtn = page.locator('[data-testid="step-selector-0"]').first();
    await firstStepBtn.click();

    const stepTitle = page.locator('[data-testid="current-step-title"]');
    await expect(stepTitle).toBeVisible();
  });

  // TODO: Add tests for step interactions and data flow
});
`;
}

function createScaffold(opts) {
  console.log(`\n📋 Generating workflow scaffold for: ${opts.pascalName}`);
  console.log(`   Slug: ${opts.slug}`);
  console.log(`   Category: ${opts.category}\n`);

  const baseDir = process.cwd();
  const filesToCreate = [];

  try {
    // 1. Create components directory
    const componentDir = path.join(
      baseDir,
      "src/components/workflows",
      opts.slug,
      "steps",
    );
    ensureDir(componentDir);
    console.log(
      `✓ Created directory: src/components/workflows/${opts.slug}/steps`,
    );

    // 2. Create step components
    for (let i = 1; i <= 2; i++) {
      const stepFile = path.join(componentDir, `Step${i}.tsx`);
      fs.writeFileSync(stepFile, generateStepComponentTemplate(opts, i));
      filesToCreate.push(
        `src/components/workflows/${opts.slug}/steps/Step${i}.tsx`,
      );
    }

    // 3. Create index file for steps
    const stepsIndexFile = path.join(componentDir, "index.ts");
    fs.writeFileSync(
      stepsIndexFile,
      `export { Step1Step } from "./Step1";\nexport { Step2Step } from "./Step2";\n`,
    );
    filesToCreate.push(`src/components/workflows/${opts.slug}/steps/index.ts`);

    // 4. Create main runner component
    const runnerFile = path.join(
      baseDir,
      `src/components/workflows/${opts.slug}`,
      `${opts.pascalName}Runner.tsx`,
    );
    fs.writeFileSync(
      runnerFile,
      `import React from "react";
import { WorkflowPackConfig } from "@/types/workflow";

interface ${opts.pascalName}RunnerProps {
  workflowConfig: WorkflowPackConfig;
}

export const ${opts.pascalName}Runner: React.FC<${opts.pascalName}RunnerProps> = ({
  workflowConfig,
}) => {
  return (
    <div>
      <h2>{workflowConfig.name}</h2>
      <p>{workflowConfig.summary}</p>
      {/* TODO: Implement workflow runner UI */}
    </div>
  );
};
`,
    );
    filesToCreate.push(
      `src/components/workflows/${opts.slug}/${opts.pascalName}Runner.tsx`,
    );

    // 5. Create unit test
    const testFile = path.join(baseDir, `src/__tests__/${opts.slug}.test.ts`);
    fs.writeFileSync(testFile, generateUnitTestTemplate(opts));
    filesToCreate.push(`src/__tests__/${opts.slug}.test.ts`);

    // 6. Create E2E test
    const e2eFile = path.join(baseDir, `e2e/${opts.slug}.spec.ts`);
    fs.writeFileSync(e2eFile, generateE2ETestTemplate(opts));
    filesToCreate.push(`e2e/${opts.slug}.spec.ts`);

    // 7. Create configuration template for clipboard
    const configTemplate = generateConfigTemplate(opts);
    const configFile = path.join(
      baseDir,
      `.scaffold-config-template-${opts.slug}.txt`,
    );
    fs.writeFileSync(configFile, configTemplate);
    filesToCreate.push(`.scaffold-config-template-${opts.slug}.txt`);

    console.log("\n✅ Files created:");
    filesToCreate.forEach((f) => console.log(`   • ${f}`));

    console.log("\n📝 Next steps:");
    console.log(`   1. Add workflow config to src/data/workflows.ts`);
    console.log(
      `      Copy template from: .scaffold-config-template-${opts.slug}.txt`,
    );
    console.log(`   2. Update TODO placeholders in generated files`);
    console.log(`   3. Run tests: npm run test:unit && npm run test:e2e`);
    console.log(`   4. Build: npm run build`);
    console.log(`   5. Update IMPLEMENTATION_TECH_BACKLOG.md\n`);
  } catch (error) {
    console.error("❌ Error generating scaffold:", error);
    process.exit(1);
  }
}

// Main execution
const args = process.argv.slice(2);
const options = validateInputs(args);
createScaffold(options);
