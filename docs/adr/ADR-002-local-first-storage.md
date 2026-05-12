# ADR-002: Local-First Storage Strategy - Client-Side State with Optional Server Sync

**Date**: 2026-05-12  
**Status**: Accepted  
**Deciders**: Web Tools Team

## Context

WebToolsEasy processes sensitive data (API payloads, personal content, financial records) that users want to keep private. The system needs:

1. **Privacy Default**: Workflow states and intermediates stored client-side by default
2. **User Control**: User explicitly opts into cloud sync, not forced
3. **Deterministic Behavior**: Offline-first means predictable functionality
4. **Data Residency**: Comply with regional data regulations (GDPR, CCPA)
5. **Performance**: No network latency for local-only workflows
6. **Scalability**: Millions of users without proportional backend scale

### Problem Statement

**Legacy Cloud-First Approach** (Rejected):

- Every workflow step synced to server immediately
- Privacy issue: User data persisted server-side without opt-in
- Performance: Network latency even for local transformations
- Cost: Storage and bandwidth proportional to users × workflows

**Full Client-Only Approach** (Insufficient):

- No ability to share workflows across devices
- No backup if browser data cleared
- No analytics or usage metrics
- Users frustrated when phone storage full

## Decision

Implement **Local-First Storage** with:

- **Default**: All workflow state in browser localStorage
- **Opt-in**: User can enable cloud sync for backup and cross-device access
- **Encryption**: Server-side data always encrypted (user holds decryption key)
- **Data Minimalism**: Only essential state persisted (not intermediate outputs)

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│ Web Browser (Client)                                            │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ localStorage (client-side, persists across sessions)    │  │
│  │  ├─ wte_workflows: {[packId]: WorkflowState}           │  │
│  │  ├─ wte_presets: {[presetId]: PresetConfig}            │  │
│  │  ├─ wte_activity: {[packId]: ActivityLog[]}            │  │
│  │  └─ wte_settings: {theme, language, privacy}           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           │                                     │
│  ┌──────────────────────┼──────────────────────────────────┐   │
│  │ Runtime State (memory-only)                            │   │
│  │  ├─ currentWorkflow: WorkflowState                     │   │
│  │  ├─ stepOutputs: Map<stepId, unknown>                 │   │
│  │  └─ userSettings: {...}                               │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────┐                       │
│  │ IndexedDB (optional, large files)   │                       │
│  │  └─ wte_file_cache: {[hash]: blob}  │                       │
│  └─────────────────────────────────────┘                       │
└─────────────────────────────────────────────────────────────────┘
         │ (sync api call, encrypted) │
         ▼
┌──────────────────────────────────────────────────────┐
│ Server (Backend) - Optional                          │
│                                                      │
│ ┌────────────────────────────────────────────────┐  │
│ │ Encrypted Sync Storage (opt-in)               │  │
│ │  ├─ userId/workflows.json.encrypted          │  │
│ │  ├─ userId/presets.json.encrypted            │  │
│ │  └─ metadata: {lastSync, version, checksum}  │  │
│ └────────────────────────────────────────────────┘  │
│                                                      │
│ ┌────────────────────────────────────────────────┐  │
│ │ Optional Analytics (privacy-safe)             │  │
│ │  └─ aggregated metrics (no user data)         │  │
│ └────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

### Storage Layers

#### Layer 1: localStorage (Persistent Client-Side)

**Purpose**: Default persistent storage across browser sessions  
**Scope**: Workflow state, presets, settings  
**Key Prefix**: `wte_` (WebToolsEasy)  
**Quota**: ~5-10MB per domain (browser dependent)  
**Lifetime**: Survives browser close, cleared by user "Clear Site Data"

**Usage Pattern**:

```typescript
// Store workflow state after each step
const workflowState = {
  packId: "wf-api-payload-cleanup",
  stepOutputs: new Map([
    ["step-1", { valid: true }],
    ["step-2", { cleaned: true }],
  ]),
  completedAt: Date.now(),
};

localStorage.setItem(`wte_workflows/${packId}`, JSON.stringify(workflowState));

// Load on app start
const saved = localStorage.getItem(`wte_workflows/${packId}`);
if (saved) {
  const state = JSON.parse(saved);
  restoreWorkflow(state);
}
```

**Data Retention Policy**:

- Workflows keep last 10 completed runs per pack
- Activity logs keep 100-item FIFO queue (oldest dropped)
- Automatic cleanup when storage exceeds 8MB

#### Layer 2: IndexedDB (Large Files, Optional)

**Purpose**: Store large intermediate file blobs without localStorage limits  
**Scope**: File caches, temporary processing data  
**Key Pattern**: Hash of file content (dedup)  
**Quota**: Up to 50MB or 50% of available disk space  
**Lifetime**: Browser managed (LRU eviction)

**Usage Pattern**:

```typescript
// Store large file result
const fileBlob = new Blob([largeOutput], { type: "text/json" });
const hash = await hashBlob(fileBlob);

const db = await openDatabase("wte-files", 1);
const tx = db.transaction("files", "readwrite");
tx.objectStore("files").put({ hash, blob: fileBlob, createdAt: Date.now() });

// Retrieve later
const cached = await tx.objectStore("files").get(hash);
```

#### Layer 3: Runtime State (Memory Only)

**Purpose**: Fast access to current workflow execution state  
**Scope**: Current step inputs/outputs, UI state  
**Lifetime**: Single browser session (cleared on reload)

**Usage Pattern**:

```typescript
// React hook for workflow state
const useWorkflowState = (packId: string) => {
  const [stepOutputs, setStepOutputs] = useState<Map<string, unknown>>(
    loadFromLocalStorage(packId) || new Map(),
  );

  // On step completion, update both memory and localStorage
  const completeStep = (stepId: string, output: unknown) => {
    const newMap = new Map(stepOutputs);
    newMap.set(stepId, output);
    setStepOutputs(newMap);
    localStorage.setItem(`wte_workflows/${packId}`, JSON.stringify(newMap));
  };

  return { stepOutputs, completeStep };
};
```

#### Layer 4: Server Storage (Encrypted, Opt-In)

**Purpose**: Cross-device sync and backup  
**Scope**: Only when user enables sync toggle  
**Encryption**: User-side encryption before sending to server  
**Privacy**: Server cannot read unencrypted data

**Implementation**:

```typescript
// User enables sync
async function enableCloudSync(email: string, password: string) {
  // Derive encryption key from password (scrypt)
  const encryptionKey = await deriveKey(password, email);

  // Encrypt local workflows
  const workflows = getAllWorkflows();
  const encrypted = await encryptData(JSON.stringify(workflows), encryptionKey);

  // Send to server
  await apiService.post("/api/sync/enable", {
    email,
    encryptedData: encrypted,
  });

  // Mark sync enabled in localStorage
  localStorage.setItem("wte_sync_enabled", "true");
}

// Sync on interval
setInterval(
  async () => {
    if (!localStorage.getItem("wte_sync_enabled")) return;

    const workflows = getAllWorkflows();
    const encrypted = await encryptData(JSON.stringify(workflows), key);

    await apiService.post("/api/sync/upload", {
      encryptedData: encrypted,
      version: getLocalVersion(),
    });
  },
  5 * 60 * 1000,
); // Every 5 minutes
```

### Data Retention Policy

| Storage         | Content          | Retention               | Cleanup                |
| --------------- | ---------------- | ----------------------- | ---------------------- |
| localStorage    | Workflow states  | Indefinite              | Manual by user         |
| localStorage    | Activity logs    | 100 items FIFO          | Auto on size limit     |
| IndexedDB       | File cache       | LRU, 30 days            | Auto on size limit     |
| Server (opt-in) | Encrypted backup | As long as sync enabled | Manual or 1yr inactive |

### Privacy & Security Guarantees

1. **Default Private**: All data stays client-side unless user opts in
2. **Encrypted Transit**: If sync enabled, all data encrypted before leaving browser
3. **End-to-End Encryption**: Server never has unencrypted keys/data
4. **Data Minimalism**: Only essential state persisted (not raw inputs/outputs)
5. **User Control**: Clear on/off toggle for cloud sync
6. **Compliance**: Supports GDPR (right to delete) and CCPA (data portability)

### Code Example: Complete Workflow Persistence

```typescript
// Hook managing full workflow lifecycle
export function useWorkflowPersistence(packId: string) {
  const [workflow, setWorkflow] = useState<WorkflowState | null>(null);

  // Load on mount
  useEffect(() => {
    const key = `wte_workflows/${packId}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      setWorkflow(JSON.parse(saved));
    }
  }, [packId]);

  // Save on change
  const updateWorkflow = (updates: Partial<WorkflowState>) => {
    const newState = { ...workflow, ...updates };
    setWorkflow(newState);

    // Persist to localStorage
    localStorage.setItem(`wte_workflows/${packId}`, JSON.stringify(newState));

    // If cloud sync enabled, sync to server
    if (localStorage.getItem("wte_sync_enabled")) {
      syncToServer(packId, newState);
    }
  };

  const deleteWorkflow = () => {
    localStorage.removeItem(`wte_workflows/${packId}`);
    if (localStorage.getItem("wte_sync_enabled")) {
      notifyServerDelete(packId);
    }
  };

  return { workflow, updateWorkflow, deleteWorkflow };
}
```

## Consequences

### Positive

- ✅ **Privacy by Default**: No server storage without consent
- ✅ **Performance**: No network latency for local workflows
- ✅ **Offline Support**: Works completely offline (no forced sync)
- ✅ **User Control**: Clear opt-in for cloud features
- ✅ **Scalability**: Server only handles optional syncs
- ✅ **GDPR Compliant**: User data doesn't leave their browser by default
- ✅ **Reduced Backend Costs**: No mandatory data storage

### Trade-offs

- ⚠ **Limited Quota**: localStorage only ~5-10MB per domain
  - Mitigation: Archive old workflows, use IndexedDB for large files
- ⚠ **Data Loss Risk**: User clearing browser storage loses everything
  - Mitigation: Recommend enabling cloud sync for backup
- ⚠ **No Built-in Sharing**: Can't share workflows without external link
  - Mitigation: Export/import workflows, share encrypted links
- ⚠ **No Version History**: Only latest state stored
  - Mitigation: Keep timestamped snapshots, implement audit log

### Risks Mitigated

- **Privacy Violation**: User data not server-stored without consent
- **Regulatory Compliance**: No forced data residency outside user's choice
- **Data Breach**: Server breach only exposes encrypted data (useless)
- **Service Dependency**: App functions offline, doesn't require backend
- **Cost Scaling**: Storage costs don't scale with user count

## Alternatives Considered

### 1. Cloud-First (All Server-Side)

- Pros: Easy backup, cross-device sync built-in
- Cons: Privacy issue, user data persisted without consent, compliance risk
- Rejected: Violates privacy principles

### 2. Hybrid Required (Server Always)

- Pros: Centralized, easier to monetize
- Cons: Backend complexity, privacy concerns, forces network dependency
- Rejected: Not user-respecting

### 3. Client-Only (No Server)

- Pros: Maximum privacy, no backend
- Cons: No backup, no cross-device, lost if storage cleared
- Rejected: Insufficient for users wanting backup

### 4. Blockchain/Decentralized

- Pros: No single point of failure
- Cons: Complex, slow, overkill for current needs
- Rejected: Over-engineered

## Implementation Phases

### Phase 1: localStorage Defaults (Current)

- Implement workflow persistence to `wte_*` keys
- Activity logging with FIFO queue
- Settings persistence
- Manual export/import for backup

### Phase 2: IndexedDB for Large Files

- Store file caches in IndexedDB
- Implement LRU eviction
- Fall back to localStorage when IndexedDB unavailable

### Phase 3: Encrypted Cloud Sync (Optional)

- Implement user-side encryption
- Create `/api/sync/*` endpoints
- Add sync toggle in settings
- Implement conflict resolution

### Phase 4: Advanced Features

- Workflow sharing with encrypted links
- Collaborative workflows (CRDTs)
- Offline-first with eventual consistency
- Version history and restore points

## Storage Limits Testing

```typescript
// Test localStorage capacity
async function testStorageCapacity() {
  const key = "wte_test";
  let size = 0;

  try {
    while (size < 10 * 1024 * 1024) {
      // 10MB
      const data = "x".repeat(1024 * 1024); // 1MB chunks
      localStorage.setItem(key + size, data);
      size += 1024 * 1024;
    }
  } catch (e) {
    console.log("Storage limit:", size / 1024 / 1024, "MB");
  } finally {
    // Clean up test data
    Object.keys(localStorage)
      .filter((k) => k.startsWith("wte_test"))
      .forEach((k) => localStorage.removeItem(k));
  }
}

// Run in CI to document capacity
testStorageCapacity();
```

## References

- [ADR-001: Workflow Engine Architecture](./ADR-001-workflow-engine-architecture.md)
- [src/hooks/useToolState.ts](./src/hooks/useToolState.ts) - State management implementation
- [src/hooks/useToolCache.ts](./src/hooks/useToolCache.ts) - Cache implementation
- [Privacy Architecture Decision](./BLOG_ARCHITECTURE.md) - Related privacy decisions
