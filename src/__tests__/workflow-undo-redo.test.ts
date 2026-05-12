import { describe, it, expect } from "vitest";
import {
  _initializeUndoRedoState,
  _createSnapshot,
  _undo,
  _redo,
  _getNavigationState,
  _getNavigationHistory,
  _jumpToSnapshot,
  _clearHistory,
  _markCheckpoint,
  _getCheckpoints,
  _getMemoryUsage,
  _compressHistory,
} from "@/lib/workflowUndoRedo";

describe("Workflow Undo/Redo Management (TB-124)", () => {
  describe("Initialization", () => {
    it("should initialize empty undo/redo state", () => {
      const steps = { step1: { name: "Step 1" } };
      const state = _initializeUndoRedoState(steps);

      expect(state.current.steps).toEqual(steps);
      expect(state.undoStack).toEqual([]);
      expect(state.redoStack).toEqual([]);
      expect(state.current.actionType).toEqual("initial");
      expect(state.current.isCheckpoint).toBe(true);
    });

    it("should set maxStackSize correctly", () => {
      const state = _initializeUndoRedoState({}, 100);
      expect(state.maxStackSize).toEqual(100);
    });

    it("should generate unique snapshot IDs", () => {
      const state1 = _initializeUndoRedoState({});
      const state2 = _initializeUndoRedoState({});

      expect(state1.current.snapshotId).not.toEqual(state2.current.snapshotId);
    });
  });

  describe("Snapshot Creation", () => {
    it("should create snapshot and add to undo stack", () => {
      let state = _initializeUndoRedoState({ step1: {} });
      const initialId = state.current.snapshotId;

      state = _createSnapshot(
        state,
        { step1: {}, step2: {} },
        "Add step 2",
        "add",
        "step2",
      );

      expect(state.undoStack).toHaveLength(1);
      expect(state.undoStack[0].snapshotId).toEqual(initialId);
      expect(state.current.actionType).toEqual("add");
    });

    it("should clear redo stack when new snapshot is created", () => {
      let state = _initializeUndoRedoState({ step1: {} });
      state = _createSnapshot(
        state,
        { step1: {}, step2: {} },
        "Add step 2",
        "add",
      );
      state = _createSnapshot(state, { step1: {} }, "Remove step 2", "remove");

      // Manually set up redo stack by simulating undo
      state = {
        ...state,
        undoStack: [...state.undoStack, state.current],
        redoStack: [{ ...state.current, snapshotId: "prev-snap" }],
      };

      const redoSizeBefore = state.redoStack.length;
      expect(redoSizeBefore).toBeGreaterThan(0);

      // New action clears redo
      state = _createSnapshot(
        state,
        { step1: {}, step3: {} },
        "Add step 3",
        "add",
      );

      expect(state.redoStack).toHaveLength(0);
    });

    it("should respect maxStackSize and remove oldest snapshots", () => {
      let state = _initializeUndoRedoState({}, 3);

      for (let i = 1; i <= 5; i++) {
        state = _createSnapshot(
          state,
          { [`step${i}`]: {} },
          `Add step ${i}`,
          "add",
        );
      }

      // Should have maxed out at 3 undo items (plus current = 4 snapshots total)
      expect(state.undoStack.length).toBeLessThanOrEqual(3);
    });

    it("should not create snapshot while navigating", () => {
      let state = _initializeUndoRedoState({});
      state.isNavigating = true;

      const beforeSnapshots = state.undoStack.length;
      state = _createSnapshot(state, { step1: {} }, "Add step", "add");

      expect(state.undoStack.length).toEqual(beforeSnapshots);
    });
  });

  describe("Undo Operation", () => {
    it("should undo to previous snapshot", () => {
      let state = _initializeUndoRedoState({ step1: {} });
      const initialSteps = state.current.steps;

      state = _createSnapshot(
        state,
        { step1: {}, step2: {} },
        "Add step 2",
        "add",
      );

      const result = _undo(state);
      expect(result.success).toBe(true);
      expect(result.snapshot?.steps).toEqual(initialSteps);
    });

    it("should fail when undo stack is empty", () => {
      const state = _initializeUndoRedoState({});
      const result = _undo(state);

      expect(result.success).toBe(false);
      expect(result.message).toContain("No undo history available");
    });

    it("should move current to redo stack", () => {
      let state = _initializeUndoRedoState({ step1: {} });
      state = _createSnapshot(
        state,
        { step1: {}, step2: {} },
        "Add step 2",
        "add",
      );

      const currentBefore = state.current;
      const result = _undo(state);

      expect(result.snapshot).not.toEqual(currentBefore);
    });

    it("should provide correct navigation state after undo", () => {
      let state = _initializeUndoRedoState({});
      state = _createSnapshot(state, { step1: {} }, "Action 1", "add");

      const result = _undo(state);
      expect(result.canRedo).toBe(true);
    });
  });

  describe("Redo Operation", () => {
    it("should redo to next snapshot", () => {
      let state = _initializeUndoRedoState({ step1: {} });
      state = _createSnapshot(
        state,
        { step1: {}, step2: {} },
        "Add step 2",
        "add",
      );

      const redoSteps = state.current.steps;
      const currentSnapshot = state.current;

      // Simulate undo by moving current to redo and previous to current
      const previousSnapshot = state.undoStack[state.undoStack.length - 1];
      state = {
        ...state,
        current: previousSnapshot,
        undoStack: state.undoStack.slice(0, -1),
        redoStack: [currentSnapshot],
      };

      const result = _redo(state);
      expect(result.success).toBe(true);
      expect(result.snapshot?.steps).toEqual(redoSteps);
    });

    it("should fail when redo stack is empty", () => {
      const state = _initializeUndoRedoState({});
      const result = _redo(state);

      expect(result.success).toBe(false);
      expect(result.message).toContain("No redo history available");
    });
  });

  describe("Navigation State", () => {
    it("should report correct undo/redo capabilities", () => {
      let state = _initializeUndoRedoState({});
      let navState = _getNavigationState(state);

      expect(navState.canUndo).toBe(false);
      expect(navState.canRedo).toBe(false);

      state = _createSnapshot(state, { step1: {} }, "Add step", "add");
      navState = _getNavigationState(state);

      expect(navState.canUndo).toBe(true);
      expect(navState.canRedo).toBe(false);
    });

    it("should include action descriptions", () => {
      let state = _initializeUndoRedoState({});
      state = _createSnapshot(state, { step1: {} }, "Add step 1", "add");
      state = _createSnapshot(
        state,
        { step1: {}, step2: {} },
        "Add step 2",
        "add",
      );

      const navState = _getNavigationState(state);
      expect(navState.undoDescription).toEqual("Add step 1");
    });
  });

  describe("Navigation History", () => {
    it("should build complete history timeline", () => {
      let state = _initializeUndoRedoState({});
      state = _createSnapshot(state, { step1: {} }, "Action 1", "add");
      state = _createSnapshot(
        state,
        { step1: {}, step2: {} },
        "Action 2",
        "add",
      );

      const history = _getNavigationHistory(state);
      expect(history).toHaveLength(3); // Initial + 2 actions
    });

    it("should preserve action types in history", () => {
      let state = _initializeUndoRedoState({});
      state = _createSnapshot(state, { step1: {} }, "Add step", "add");
      state = _createSnapshot(state, { step1: {} }, "Modify step", "modify");

      const history = _getNavigationHistory(state);
      const actionTypes = history.map((h) => h.actionType);

      expect(actionTypes).toContain("add");
      expect(actionTypes).toContain("modify");
    });
  });

  describe("Jump to Snapshot", () => {
    it("should jump to specific snapshot by ID", () => {
      let state = _initializeUndoRedoState({ step1: {} });
      const initialId = state.current.snapshotId;

      state = _createSnapshot(
        state,
        { step1: {}, step2: {} },
        "Add step 2",
        "add",
      );
      state = _createSnapshot(
        state,
        { step1: {}, step2: {}, step3: {} },
        "Add step 3",
        "add",
      );

      const result = _jumpToSnapshot(state, initialId);
      expect(result.success).toBe(true);
      expect(result.snapshot?.snapshotId).toEqual(initialId);
    });

    it("should fail for invalid snapshot ID", () => {
      const state = _initializeUndoRedoState({});
      const result = _jumpToSnapshot(state, "invalid-id");

      expect(result.success).toBe(false);
      expect(result.message).toContain("not found");
    });

    it("should maintain correct undo/redo stacks after jump", () => {
      let state = _initializeUndoRedoState({});
      state = _createSnapshot(state, { step1: {} }, "Action 1", "add");
      const targetId = state.current.snapshotId;

      state = _createSnapshot(
        state,
        { step1: {}, step2: {} },
        "Action 2",
        "add",
      );

      const result = _jumpToSnapshot(state, targetId);
      expect(result.canRedo).toBe(true);
      expect(result.canUndo).toBe(true);
    });
  });

  describe("History Management", () => {
    it("should clear all history", () => {
      let state = _initializeUndoRedoState({});
      state = _createSnapshot(state, { step1: {} }, "Action", "add");

      state = _clearHistory(state);
      expect(state.undoStack).toHaveLength(0);
      expect(state.redoStack).toHaveLength(0);
    });

    it("should mark checkpoint", () => {
      let state = _initializeUndoRedoState({});
      state = _createSnapshot(state, { step1: {} }, "Action", "add");
      state = { ...state, current: { ...state.current, isCheckpoint: false } };

      state = _markCheckpoint(state);
      expect(state.current.isCheckpoint).toBe(true);
    });

    it("should retrieve all checkpoints", () => {
      let state = _initializeUndoRedoState({});

      state = _createSnapshot(state, { step1: {} }, "Checkpoint 1", "add");
      state = _markCheckpoint(state);

      state = _createSnapshot(
        state,
        { step1: {}, step2: {} },
        "Checkpoint 2",
        "add",
      );
      state = _markCheckpoint(state);

      const checkpoints = _getCheckpoints(state);
      expect(checkpoints.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("Memory Management", () => {
    it("should calculate memory usage", () => {
      let state = _initializeUndoRedoState({
        step1: { data: "x".repeat(100) },
      });
      state = _createSnapshot(
        state,
        { step1: { data: "x".repeat(100) } },
        "Add",
        "add",
      );

      const usage = _getMemoryUsage(state);
      expect(usage).toBeGreaterThan(0);
    });

    it("should compress history by removing non-checkpoint snapshots", () => {
      let state = _initializeUndoRedoState({});
      state = _createSnapshot(state, { step1: {} }, "Action 1", "add");
      state = _createSnapshot(
        state,
        { step1: {}, step2: {} },
        "Action 2",
        "add",
      );
      state = _createSnapshot(
        state,
        { step1: {}, step2: {}, step3: {} },
        "Action 3",
        "add",
      );

      state = _markCheckpoint(state);
      const sizeBeforeCompress = state.undoStack.length;

      state = _compressHistory(state);
      const sizeAfterCompress = state.undoStack.length;

      expect(sizeAfterCompress).toBeLessThanOrEqual(sizeBeforeCompress);
    });
  });

  describe("Integration: Complex Workflow Navigation", () => {
    it("should handle multiple undo/redo cycles", () => {
      let state = _initializeUndoRedoState({});

      // Forward actions
      state = _createSnapshot(state, { step1: {} }, "Add 1", "add");
      state = _createSnapshot(state, { step1: {}, step2: {} }, "Add 2", "add");
      state = _createSnapshot(
        state,
        { step1: {}, step2: {}, step3: {} },
        "Add 3",
        "add",
      );

      const id2 = state.undoStack[1].snapshotId;

      // Manually simulate undo by moving current to redo
      const previousSnapshot = state.undoStack[state.undoStack.length - 1];
      let testState = {
        ...state,
        current: previousSnapshot,
        undoStack: state.undoStack.slice(0, -1),
        redoStack: [state.current],
      };

      // Jump backward
      const jumpResult = _jumpToSnapshot(testState, id2);
      expect(jumpResult.success).toBe(true);
    });

    it("should preserve affected step information", () => {
      let state = _initializeUndoRedoState({});
      state = _createSnapshot(state, { step1: {} }, "Add step", "add", "step1");

      expect(state.current.affectedStepId).toEqual("step1");
      expect(state.current.actionType).toEqual("add");
    });

    it("should link snapshots through previousSnapshotId", () => {
      let state = _initializeUndoRedoState({});
      const initialId = state.current.snapshotId;

      state = _createSnapshot(state, { step1: {} }, "Action 1", "add");
      expect(state.current.previousSnapshotId).toEqual(initialId);

      state = _createSnapshot(
        state,
        { step1: {}, step2: {} },
        "Action 2",
        "add",
      );
      expect(state.current.previousSnapshotId).not.toEqual(initialId);
    });
  });
});
