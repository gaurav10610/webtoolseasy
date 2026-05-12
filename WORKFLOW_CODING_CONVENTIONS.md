# Workflow Coding Conventions

This document defines the coding standards and conventions for creating new workflow modules and packs in WebToolsEasy.

## Overview

A **workflow pack** is a multi-step tool orchestration that guides users through a common task. Each pack consists of:

- Configuration in `/src/data/workflows.ts`
- Components in `/src/components/workflows/`
- Optional adapters in `/src/lib/adapters/`
- E2E tests in `/e2e/`
- Unit tests in `/src/__tests__/`

## Naming Conventions

### Pack Identifiers

- **ID format**: `wf-{kebab-case-name}` (e.g., `wf-api-payload-cleanup`)
- **Slug format**: `{kebab-case-name}` (e.g., `api-payload-cleanup`)
- **Human name**: Title Case (e.g., `API Payload Cleanup`)
- **File naming**: Use kebab-case for all files

### Step Identifiers

- **Format**: `{workflow-slug}-{step-sequence}` or `{step-function}` (e.g., `validate-format-json`)
- **Consistency**: Use descriptive verbs + nouns
- **Examples**: `markdown-cleanup`, `image-optimize`, `schema-helper`

## Configuration Structure

### WorkflowPackConfig Interface

```typescript
interface WorkflowPackConfig {
  id: string; // Unique pack identifier
  slug: string; // URL-friendly slug (no slashes)
  name: string; // Human-readable title
  summary: string; // 1-2 sentence elevator pitch
  category: WorkflowCategory; // developer | content | seo | document | media
  tags: string[]; // 3-5 tags for discovery and filtering
  steps: WorkflowStepConfig[]; // Ordered list of execution steps
  outputArtifacts: string[]; // Expected output files (artifact names)
}
```

### WorkflowStepConfig Interface

```typescript
interface WorkflowStepConfig {
  id: string; // Unique step identifier within pack
  title: string; // UI-friendly step title
  description: string; // Brief description of what step does
  executionMode: ExecutionMode; // local-only | network | export-only
}
```

## Category Selection

Choose one category per pack:

- **developer**: Targets developers (API tools, code formatting, debugging)
- **content**: Targets content creators (writing, blog publishing, copywriting)
- **seo**: Targets SEO professionals (audits, metadata, structured data)
- **document**: Targets document management (PDF, Word, formatting)
- **media**: Targets media professionals (image, video, audio)

## Step Configuration

### Execution Modes

Each step must declare its execution mode:

- **local-only**: Runs entirely client-side; no network calls allowed
  - Use for: data transformation, formatting, validation, client-side compute
  - Privacy: User data never leaves browser
  - Performance: Fast; runs on user machine

- **network**: May call external APIs or services
  - Use for: API calls, external lookups, server-side operations
  - Privacy: Data may be transmitted (document the external service)
  - Performance: Depends on network; may show loading UI

- **export-only**: Generates output files; no computation allowed
  - Use for: artifact generation, bundling, download preparation
  - Privacy: No external calls; user controls export destination
  - Performance: Typically fast; local file operations

### Step Ordering

- Order steps from input → processing → output
- Group related operations (e.g., all validation before transformation)
- Place `local-only` steps before `network` steps where possible
- Always end with `export-only` step(s)

### Step Descriptions

- Be specific about what the step does (action-oriented)
- Mention key transformations (e.g., "Normalizes heading structure, spacing, and formatting")
- Avoid generic descriptions ("Process data", "Handle input")

## Component Architecture

### Workflow Pack Components

Each pack should have corresponding React components:

```
src/components/workflows/
├── [PackName]Config.tsx          // Configuration/preset selection
├── [PackName]Runner.tsx          // Main execution UI wrapper
├── steps/
│   ├── [StepName]Step.tsx        // Individual step component
│   ├── [StepName]Step.tsx
│   └── ...
└── [PackName].stories.tsx        // Storybook stories (optional)
```

### Step Component Pattern

```typescript
interface [StepName]StepProps {
  stepId: string;
  onStepComplete: (output: StepOutput) => void;
  onStepError: (error: Error) => void;
  previousOutput?: ArtifactData;
}

export const [StepName]Step: React.FC<[StepName]StepProps> = ({
  stepId,
  onStepComplete,
  onStepError,
  previousOutput,
}) => {
  // Implementation
};
```

## Data Flow

### Input Artifacts

- Accept data from previous steps via `previousOutput` prop
- Validate input structure before processing
- Provide meaningful error messages for invalid inputs

### Output Artifacts

- Include artifact name in output (must match `outputArtifacts` declaration)
- Include metadata: size, type, sourceStep, checksum
- Support multiple output formats where applicable

### State Management

- Use `useWorkflowState()` hook for run-level state
- Store in localStorage with `wte_` prefix
- Maintain 100-item FIFO queue per workflow for activity tracking
- Never store sensitive data in localStorage

## Testing Requirements

### Unit Tests

- File: `/src/__tests__/[workflow-name].test.ts`
- Coverage: Individual step logic, data transformation, validation
- Format: Vitest with TypeScript strict mode
- Minimum: 80% coverage for step logic

### E2E Tests

- File: `/e2e/[workflow-name].spec.ts`
- Coverage: Full workflow happy path, error states, export flow
- Format: Playwright test framework
- Tests should verify: navigation, input acceptance, processing, export

### Test Structure

```typescript
test.describe("[Workflow Name] Workflow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/workflows/[slug]");
  });

  test("should load workflow page", async ({ page }) => {
    // Test page load
  });

  test("should complete workflow successfully", async ({ page }) => {
    // Test happy path
  });

  test("should handle validation errors", async ({ page }) => {
    // Test error handling
  });
});
```

## Privacy and Security

### Privacy Boundaries

- **local-only steps**: Use `createBoundaryCheckedStep()` wrapper
- No outbound network calls in local-only steps
- No localStorage for sensitive data
- Validate with `analyzePrivacyChain(steps)` in tests

### Security Considerations

- Input validation: Reject oversized files (>10MB warning, >50MB error)
- Content validation: Check for code injection patterns
- Rate limiting: For network steps, implement exponential backoff
- Error messages: Never expose API keys or internal paths in errors

## Export and Output

### Artifact Declaration

```typescript
outputArtifacts: ["cleaned.json", "payload.csv", "summary.json"];
```

- Keep artifact names consistent and descriptive
- Include format in filename (e.g., `.json`, `.csv`, `.md`)
- Support multiple formats per workflow
- Validate size before export (see exportValidation.ts)

### Export UI

- Use `ExportValidationReportCard` component for pre-export checks
- Validate data with `validateExportData(data, step)`
- Provide download button with proper MIME types
- Track `export_generated` telemetry event

## Documentation and Examples

### Summary Writing

Good: "Validate, normalize, diff, and export API payloads without uploading data."

- Specificity: Lists actual capabilities
- Privacy message: Assures users
- Scope: Clear what it does in one sentence

Bad: "Process API data" (too vague)

### Tag Selection

- Use 3-5 relevant tags
- Prioritize primary function (e.g., "json", "api")
- Include format tags (e.g., "csv", "xml")
- Include privacy tag if local-only (rarely included; assume privacy unless noted)

## Implementation Checklist

- [ ] Add pack config to `/src/data/workflows.ts`
- [ ] Create step components in `/src/components/workflows/`
- [ ] Implement unit tests in `/src/__tests__/`
- [ ] Add E2E tests in `/e2e/`
- [ ] Verify TypeScript strict mode compliance
- [ ] Run full test suite: `npm run test:unit && npm run test:e2e`
- [ ] Verify production build: `npm run build`
- [ ] Add workflow card to templates list (if applicable)
- [ ] Create landing page under `/workflows/[slug]` (if applicable)
- [ ] Update backlog status in `IMPLEMENTATION_TECH_BACKLOG.md`

## References

- WorkflowPackConfig types: `src/types/workflow.ts`
- Export validation: `src/lib/exportValidation.ts`
- Privacy utilities: `src/lib/serverClientBoundary.ts`
- Example pack: `src/data/workflows.ts`
- Telemetry events: `src/types/workflow.ts`
