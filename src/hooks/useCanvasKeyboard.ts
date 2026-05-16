"use client";

import { useCallback, useEffect, useState } from "react";
import { useReactFlow } from "@xyflow/react";
import { useArchitectureStore } from "@/store/useArchitectureStore";

/**
 * Registers all keyboard shortcut handlers for the ArchCost canvas.
 *
 * Shortcuts:
 * - Delete / Backspace — delete selected nodes/edges
 * - Cmd/Ctrl+A — select all nodes
 * - Cmd/Ctrl+D — duplicate selected nodes
 * - Cmd/Ctrl+Z — undo
 * - Cmd/Ctrl+Shift+Z / Cmd/Ctrl+Y — redo
 * - Escape — deselect all / close panels
 * - Arrow keys — nudge selected nodes by 10px (Shift: 50px)
 * - ? — toggle keyboard shortcuts modal
 */
export function useCanvasKeyboard() {
  const { fitView, getNodes, setNodes } = useReactFlow();
  const { deleteNode, duplicateNodes } = useArchitectureStore();
  const [showShortcuts, setShowShortcuts] = useState(false);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      // Don't intercept when typing in inputs
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable
      ) {
        return;
      }

      const isModKey = event.metaKey || event.ctrlKey;

      // Delete / Backspace — delete selected
      if (event.key === "Delete" || event.key === "Backspace") {
        const selectedNodes = getNodes().filter((n) => n.selected);
        for (const node of selectedNodes) {
          deleteNode(node.id);
        }
        event.preventDefault();
        return;
      }

      // Cmd/Ctrl+A — select all
      if (isModKey && event.key === "a") {
        setNodes((nodes) => nodes.map((n) => ({ ...n, selected: true })));
        event.preventDefault();
        return;
      }

      // Cmd/Ctrl+D — duplicate selected
      if (isModKey && event.key === "d") {
        const selectedIds = getNodes()
          .filter((n) => n.selected)
          .map((n) => n.id);
        if (selectedIds.length > 0) {
          duplicateNodes(selectedIds);
        }
        event.preventDefault();
        return;
      }

      // Cmd/Ctrl+Z — undo
      if (isModKey && event.key === "z" && !event.shiftKey) {
        useArchitectureStore.temporal.getState().undo();
        event.preventDefault();
        return;
      }

      // Cmd/Ctrl+Shift+Z or Cmd/Ctrl+Y — redo
      if (
        (isModKey && event.shiftKey && event.key === "z") ||
        (isModKey && event.key === "y")
      ) {
        useArchitectureStore.temporal.getState().redo();
        event.preventDefault();
        return;
      }

      // Escape — deselect all
      if (event.key === "Escape") {
        setNodes((nodes) => nodes.map((n) => ({ ...n, selected: false })));
        event.preventDefault();
        return;
      }

      // ? — toggle keyboard shortcuts
      if (event.key === "?" || (event.shiftKey && event.key === "/")) {
        setShowShortcuts((prev) => !prev);
        event.preventDefault();
        return;
      }

      // Arrow keys — nudge selected nodes
      const arrowKeys: Record<string, { x: number; y: number }> = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
      };

      if (arrowKeys[event.key]) {
        const delta = event.shiftKey ? 50 : 10;
        const direction = arrowKeys[event.key];
        setNodes((nodes) =>
          nodes.map((node) =>
            node.selected
              ? {
                  ...node,
                  position: {
                    x: node.position.x + direction.x * delta,
                    y: node.position.y + direction.y * delta,
                  },
                }
              : node,
          ),
        );
        event.preventDefault();
        return;
      }

      // f — fit view
      if (event.key === "f" && !isModKey) {
        fitView({ padding: 0.2, duration: 300 });
        event.preventDefault();
      }
    },
    [fitView, getNodes, setNodes, deleteNode, duplicateNodes],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return { showShortcuts, setShowShortcuts };
}
