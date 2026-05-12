/**
 * TB-124: Undo/back navigation and state management for workflows
 * Provides undo/redo stack management with step configuration history
 * Maintains workflow state snapshots for full history traversal
 */

export interface WorkflowSnapshot {
  /** Unique identifier for this snapshot */
  snapshotId: string;
  /** Timestamp when snapshot was created */
  createdAt: Date;
  /** Complete workflow step configuration at this point */
  steps: Record<string, unknown>;
  /** Human-readable description of the action */
  actionDescription: string;
  /** Type of action that caused this snapshot */
  actionType: "add" | "remove" | "modify" | "reorder" | "import" | "initial";
  /** Step that was modified in this action (if applicable) */
  affectedStepId?: string;
  /** Previous snapshot ID for linked history */
  previousSnapshotId?: string;
  /** Whether this snapshot is a checkpoint (explicitly saved) */
  isCheckpoint: boolean;
}

export interface UndoRedoState {
  /** Current snapshot */
  current: WorkflowSnapshot;
  /** Stack of previous snapshots (LIFO - most recent at end) */
  undoStack: WorkflowSnapshot[];
  /** Stack of redone snapshots (LIFO - most recent at end) */
  redoStack: WorkflowSnapshot[];
  /** Maximum snapshots to keep in undo stack */
  maxStackSize: number;
  /** Whether undo/redo is currently in progress */
  isNavigating: boolean;
}

export interface UndoRedoResult {
  success: boolean;
  snapshot: WorkflowSnapshot | null;
  message: string;
  canUndo: boolean;
  canRedo: boolean;
}

export interface NavigationHistoryItem {
  snapshotId: string;
  timestamp: Date;
  actionDescription: string;
  actionType: WorkflowSnapshot["actionType"];
}

/**
 * Initialize undo/redo state with initial snapshot
 */
export function _initializeUndoRedoState(
  steps: Record<string, unknown>,
  maxStackSize: number = 50,
): UndoRedoState {
  const initialSnapshot: WorkflowSnapshot = {
    snapshotId: `snap-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    createdAt: new Date(),
    steps,
    actionDescription: "Workflow initialized",
    actionType: "initial",
    isCheckpoint: true,
  };

  return {
    current: initialSnapshot,
    undoStack: [],
    redoStack: [],
    maxStackSize,
    isNavigating: false,
  };
}

/**
 * Create a snapshot and push to undo stack
 */
export function _createSnapshot(
  state: UndoRedoState,
  steps: Record<string, unknown>,
  actionDescription: string,
  actionType: WorkflowSnapshot["actionType"],
  affectedStepId?: string,
): UndoRedoState {
  if (state.isNavigating) {
    return state;
  }

  const newSnapshot: WorkflowSnapshot = {
    snapshotId: `snap-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    createdAt: new Date(),
    steps,
    actionDescription,
    actionType,
    affectedStepId,
    previousSnapshotId: state.current.snapshotId,
    isCheckpoint: false,
  };

  // Push current snapshot to undo stack
  const newUndoStack = [...state.undoStack, state.current];
  if (newUndoStack.length > state.maxStackSize) {
    newUndoStack.shift(); // Remove oldest
  }

  // Clear redo stack when new action is taken
  return {
    ...state,
    current: newSnapshot,
    undoStack: newUndoStack,
    redoStack: [],
  };
}

/**
 * Navigate to previous snapshot (undo)
 */
export function _undo(state: UndoRedoState): UndoRedoResult {
  if (state.undoStack.length === 0) {
    return {
      success: false,
      snapshot: null,
      message: "No undo history available",
      canUndo: false,
      canRedo: state.redoStack.length > 0,
    };
  }

  const previousSnapshot = state.undoStack[state.undoStack.length - 1];
  const newUndoStack = state.undoStack.slice(0, -1);
  const newRedoStack = [...state.redoStack, state.current];

  return {
    success: true,
    snapshot: previousSnapshot,
    message: `Undo: ${previousSnapshot.actionDescription}`,
    canUndo: newUndoStack.length > 0,
    canRedo: true,
  };
}

/**
 * Navigate to next snapshot (redo)
 */
export function _redo(state: UndoRedoState): UndoRedoResult {
  if (state.redoStack.length === 0) {
    return {
      success: false,
      snapshot: null,
      message: "No redo history available",
      canUndo: state.undoStack.length > 0,
      canRedo: false,
    };
  }

  const nextSnapshot = state.redoStack[state.redoStack.length - 1];
  const newRedoStack = state.redoStack.slice(0, -1);
  const newUndoStack = [...state.undoStack, state.current];

  return {
    success: true,
    snapshot: nextSnapshot,
    message: `Redo: ${nextSnapshot.actionDescription}`,
    canUndo: true,
    canRedo: newRedoStack.length > 0,
  };
}

/**
 * Get undo/redo capabilities
 */
export function _getNavigationState(state: UndoRedoState): {
  canUndo: boolean;
  canRedo: boolean;
  undoDescription: string | null;
  redoDescription: string | null;
} {
  return {
    canUndo: state.undoStack.length > 0,
    canRedo: state.redoStack.length > 0,
    undoDescription:
      state.undoStack.length > 0
        ? state.undoStack[state.undoStack.length - 1].actionDescription
        : null,
    redoDescription:
      state.redoStack.length > 0
        ? state.redoStack[state.redoStack.length - 1].actionDescription
        : null,
  };
}

/**
 * Get complete navigation history
 */
export function _getNavigationHistory(
  state: UndoRedoState,
): NavigationHistoryItem[] {
  const history: NavigationHistoryItem[] = [];

  // Add undo stack (oldest first)
  for (const snapshot of state.undoStack) {
    history.push({
      snapshotId: snapshot.snapshotId,
      timestamp: snapshot.createdAt,
      actionDescription: snapshot.actionDescription,
      actionType: snapshot.actionType,
    });
  }

  // Add current
  history.push({
    snapshotId: state.current.snapshotId,
    timestamp: state.current.createdAt,
    actionDescription: state.current.actionDescription,
    actionType: state.current.actionType,
  });

  // Add redo stack (oldest first)
  for (let i = state.redoStack.length - 1; i >= 0; i--) {
    const snapshot = state.redoStack[i];
    history.push({
      snapshotId: snapshot.snapshotId,
      timestamp: snapshot.createdAt,
      actionDescription: snapshot.actionDescription,
      actionType: snapshot.actionType,
    });
  }

  return history;
}

/**
 * Jump directly to a specific snapshot by ID
 */
export function _jumpToSnapshot(
  state: UndoRedoState,
  targetSnapshotId: string,
): UndoRedoResult {
  const allSnapshots = [...state.undoStack, state.current, ...state.redoStack];
  const targetIndex = allSnapshots.findIndex(
    (s) => s.snapshotId === targetSnapshotId,
  );

  if (targetIndex === -1) {
    return {
      success: false,
      snapshot: null,
      message: `Snapshot ${targetSnapshotId} not found`,
      canUndo: state.undoStack.length > 0,
      canRedo: state.redoStack.length > 0,
    };
  }

  const targetSnapshot = allSnapshots[targetIndex];
  const currentIndex = state.undoStack.length;

  let newUndoStack: WorkflowSnapshot[];
  let newRedoStack: WorkflowSnapshot[];

  if (targetIndex < currentIndex) {
    // Jump backward
    newUndoStack = allSnapshots.slice(0, targetIndex);
    newRedoStack = allSnapshots.slice(targetIndex + 1).reverse();
  } else {
    // Jump forward
    newUndoStack = allSnapshots.slice(0, currentIndex + 1);
    newRedoStack = allSnapshots
      .slice(currentIndex + 1, targetIndex + 1)
      .reverse();
  }

  return {
    success: true,
    snapshot: targetSnapshot,
    message: `Jumped to: ${targetSnapshot.actionDescription}`,
    canUndo: newUndoStack.length > 0,
    canRedo: newRedoStack.length > 0,
  };
}

/**
 * Clear undo/redo history
 */
export function _clearHistory(state: UndoRedoState): UndoRedoState {
  return {
    ...state,
    undoStack: [],
    redoStack: [],
  };
}

/**
 * Mark current snapshot as a checkpoint
 */
export function _markCheckpoint(state: UndoRedoState): UndoRedoState {
  return {
    ...state,
    current: {
      ...state.current,
      isCheckpoint: true,
    },
  };
}

/**
 * Get all checkpoints in history
 */
export function _getCheckpoints(state: UndoRedoState): WorkflowSnapshot[] {
  const allSnapshots = [
    ...state.undoStack,
    state.current,
    ...state.redoStack.slice().reverse(),
  ];
  return allSnapshots.filter((s) => s.isCheckpoint);
}

/**
 * Calculate memory usage of undo/redo state
 */
export function _getMemoryUsage(state: UndoRedoState): number {
  const snapshots = [...state.undoStack, state.current, ...state.redoStack];
  let totalSize = 0;

  for (const snapshot of snapshots) {
    const json = JSON.stringify(snapshot.steps);
    totalSize += json.length;
  }

  return totalSize;
}

/**
 * Compress history by removing non-checkpoint snapshots between checkpoints
 */
export function _compressHistory(state: UndoRedoState): UndoRedoState {
  const compress = (snapshots: WorkflowSnapshot[]): WorkflowSnapshot[] => {
    const compressed: WorkflowSnapshot[] = [];
    let lastCheckpoint: WorkflowSnapshot | null = null;

    for (const snapshot of snapshots) {
      if (snapshot.isCheckpoint) {
        compressed.push(snapshot);
        lastCheckpoint = snapshot;
      } else if (lastCheckpoint === null) {
        // Keep first non-checkpoint if no checkpoint yet
        compressed.push(snapshot);
      }
    }

    return compressed;
  };

  return {
    ...state,
    undoStack: compress(state.undoStack),
    redoStack: compress(state.redoStack),
  };
}
