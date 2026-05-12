# ADR-001: Workflow Engine Architecture - Step-Based Execution with Local-First State

**Date**: 2026-05-12  
**Status**: Accepted  
**Deciders**: Web Tools Team

## Context

WebToolsEasy needs a workflow system that:

1. Chains multiple transformation steps (e.g., import → validate → format → export)
2. Works entirely client-side for sensitive data (no forced server sync)
3. Supports different execution modes (local-only, network-enabled, export-only)
4. Maintains type safety and enables composable step adapters
5. Provides deterministic execution for testing and debugging
6. Allows steps to be reused across different workflow packs

### Problem Statement

Previous approaches considered:

- **Monolithic workflows**: Single function processing entire workflow
  - Con: Steps tightly coupled, hard to reuse
  - Con: Difficult to implement UI for step-by-step execution
  - Con: Cannot pause/resume between steps
- **Event streaming**: Reactive stream of step outputs
  - Con: Requires RxJS or similar dependency
  - Con: Harder to understand execution order
  - Con: Debugging distributed events challenging
- **Redux-like state management**: Centralized workflow state store
  - Con: Boilerplate for each workflow
  - Con: Difficult to version state across multiple steps
  - Con: Steep learning curve for contributors

## Decision

Implement a **step-based workflow execution engine** with the following design principles:

### Architecture

```
WorkflowPack (type system)
  ├─ steps: WorkflowStepConfig[]
  │   ├─ id: string
  │   ├─ title: string
  │   ├─ executionMode: "local-only" | "network" | "export-only"
  │   └─ adapter: WorkflowStepAdapter
  ├─ outputArtifacts: ArtifactDefinition[]
  └─ metadata: {category, tags, description}

WorkflowStepAdapter (pure function interface)
  ├─ validate(input): ValidationResult
  ├─ execute(input): Promise<AdapterExecutionResult>
  └─ transform?(input): unknown

WorkflowRunner (React component)
  ├─ currentStepIndex: number
  ├─ stepOutputs: Map<stepId, output>
  ├─ state: "idle" | "running" | "completed" | "error"
  └─ handlers: {onNext, onPrevious, onCancel}
```

### Execution Flow

1. **Step Definition**: Each step is a pure `WorkflowStepAdapter` with stateless `execute()` function
2. **Step Execution**: Runner passes current input to adapter
3. **Output Chaining**: Step output becomes next step's input (passthrough unless explicit transformation)
4. **State Accumulation**: All step outputs stored in OrderedMap with step IDs as keys
5. **Step Persistence**: After each step, full workflow state saved to localStorage (atomic)
6. **Error Handling**: Step failures don't clear prior successful steps; user can fix and retry
7. **Export Phase**: Final artifacts validated and bundled for download

### Code Example

```typescript
// Step definition (pure adapter)
export const jsonFormatterAdapter: WorkflowStepAdapter = {
  id: "json-formatter",
  executionMode: "local-only",

  validate(input: unknown) {
    // ... validation logic
  },

  async execute(input: unknown) {
    // ... transformation logic, returns result
  },
};

// Workflow pack (composition of steps)
export const apiPayloadCleanupPack: WorkflowPackConfig = {
  id: "wf-api-payload-cleanup",
  slug: "api-payload-cleanup",
  steps: [
    {
      id: "step-1-import",
      title: "Import API Payload",
      adapter: jsonFormatterAdapter,
      executionMode: "local-only",
    },
    {
      id: "step-2-validate",
      title: "Validate Structure",
      adapter: schemaValidatorAdapter,
      executionMode: "local-only",
    },
    {
      id: "step-3-clean",
      title: "Remove Sensitive Fields",
      adapter: fieldCleanerAdapter,
      executionMode: "local-only",
    },
    {
      id: "step-4-export",
      title: "Export Cleaned Payload",
      adapter: jsonExporterAdapter,
      executionMode: "export-only",
    },
  ],
};

// Usage in React
export const WorkflowRunner: React.FC<WorkflowRunnerProps> = ({ pack }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepOutputs, setStepOutputs] = useState<Map<string, unknown>>(new Map());

  const handleExecuteStep = async () => {
    const step = pack.steps[currentStepIndex];
    const previousOutput = stepOutputs.get(
      pack.steps[currentStepIndex - 1]?.id ?? ""
    );

    const result = await step.adapter.execute(previousOutput);

    if (result.success) {
      const newOutputs = new Map(stepOutputs);
      newOutputs.set(step.id, result.output);
      setStepOutputs(newOutputs);

      // Save to localStorage
      persistWorkflowState(pack.id, newOutputs);

      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  return (
    <Box>
      {pack.steps.map((step, idx) => (
        <StepComponent
          key={step.id}
          step={step}
          isPending={idx === currentStepIndex}
          isCompleted={idx < currentStepIndex}
          output={stepOutputs.get(step.id)}
        />
      ))}
    </Box>
  );
};
```

### Key Design Decisions

1. **Step Adapters are Pure Functions**
   - No side effects (except network calls in "network" mode)
   - Testable in isolation with `execute({ ...input })`
   - Composable: output of step N feeds to step N+1

2. **Execution Modes as Type Boundary**
   - `local-only`: Enforced at runtime - steps cannot import network libraries
   - `network`: Permitted to use `makeApiRequestFlow()`
   - `export-only`: Output validated before download
   - Enforced via ESLint rules and CI checks

3. **Output Chaining via Position**
   - Step output is input to next step (unless explicit transformation)
   - No need for explicit "pass output N to step M"
   - Simpler mental model: sequential transformation
   - Can override with `transform()` if needed

4. **State Stored Per-Step, Not Per-Run**
   - Each step's output persisted independently to localStorage
   - Allows user to modify input and retry step without losing others
   - Safer than single "workflow run" object (atomic writes per step)

5. **Error Recovery Without State Loss**
   - Step failure doesn't roll back previous steps
   - User can view prior outputs, debug, and retry
   - "Reset" button only clears current step onwards

## Consequences

### Positive

- ✅ Each adapter is testable in isolation (unit tests simple)
- ✅ Steps can be reused across different packs (composition)
- ✅ Execution model easy to understand (sequential, deterministic)
- ✅ UI naturally maps to step sequence (visual clarity)
- ✅ Error recovery intuitive (modify and retry)
- ✅ TypeScript strict mode fully supported
- ✅ No external dependencies (pure async/await)

### Trade-offs

- ⚠ Cannot express conditional branching (if/else between steps)
  - Mitigation: Add `condition()` optional field to step config
- ⚠ Cannot express loops (repeat a step N times)
  - Mitigation: Adapter can internally loop; UI shows as single step
- ⚠ Output transformation needs explicit field mapping
  - Mitigation: Use `transform()` hook in step config
- ⚠ Parallel step execution not supported
  - Mitigation: Document async patterns within adapter

### Risks Mitigated

- **Data Privacy**: Local-only steps enforce no network via linting + runtime checks
- **Type Safety**: Full TypeScript strict mode support, no implicit any
- **Performance**: Steps don't block UI (all async), can implement progress bars
- **Testability**: Each adapter testable in isolation + integration tests in E2E

## Alternatives Considered

### 1. Monolithic Single Function

**Implementation**: `function executeWorkflow(input, pack) => output`

- Pros: Simplest to implement initially
- Cons: Steps tightly coupled, hard to reuse, no step-by-step UI
- Rejected: Doesn't support step-by-step visualization

### 2. Reactive Stream (RxJS)

**Implementation**: `steps.pipe(map(step => adapter.execute(input)))`

- Pros: Powerful for complex workflows
- Cons: Steep learning curve, harder to debug, added dependency
- Rejected: Overkill for current use cases, too complex for contributors

### 3. Workflow State Machine

**Implementation**: Redux-style state + reducers for each step

- Pros: Centralized state management
- Cons: Boilerplate for each workflow, complex for simple sequences
- Rejected: Over-engineered for current needs

### 4. Plugin Architecture with Hooks

**Implementation**: Pre/Post hooks, middleware pattern

- Pros: Extensible for future complex workflows
- Cons: Added complexity, harder to understand execution order
- Rejected: Premature optimization

## Implementation Roadmap

1. **Phase 1** (Current): Core step execution with local-only adapters
   - Implement `WorkflowStepAdapter` interface
   - Create 3-5 initial adapters (JSON, markdown, CSV tools)
   - Build `WorkflowRunner` React component
   - Add localStorage persistence

2. **Phase 2**: Network-enabled steps and privacy boundaries
   - Implement network mode with `makeApiRequestFlow()`
   - Add privacy guardrails (ESLint rules, runtime checks)
   - Create adapters that call external APIs

3. **Phase 3**: Advanced features
   - Conditional step execution (based on previous output)
   - Loop adapters (repeat processing)
   - Adapter composition (chain multiple adapters in single step)

4. **Phase 4**: Optimization
   - Worker threads for heavy computation
   - Streaming output for large files
   - Adapter performance profiling

## Migration Path

If building workflows currently following old patterns:

```typescript
// OLD: Single function approach
export function cleanApiPayload(input) {
  const parsed = JSON.parse(input);
  const validated = validateSchema(parsed);
  const cleaned = removeFields(validated);
  return JSON.stringify(cleaned);
}

// NEW: Step-based approach
// 1. Split into adapters
const parseAdapter = { execute: (i) => JSON.parse(i) };
const validateAdapter = { execute: (i) => validateSchema(i) };
const cleanAdapter = { execute: (i) => removeFields(i) };

// 2. Compose into pack
export const pack = {
  steps: [parseAdapter, validateAdapter, cleanAdapter],
};

// 3. Update components to use WorkflowRunner
```

## References

- [WORKFLOW_CODING_CONVENTIONS.md](./WORKFLOW_CODING_CONVENTIONS.md) - Implements this ADR
- [WORKFLOW_PACK_ADAPTER_GUIDE.md](./WORKFLOW_PACK_ADAPTER_GUIDE.md) - Practical guide for building adapters
- [src/types/config.ts](./src/types/config.ts) - Type definitions
