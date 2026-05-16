"use client";

import { useReactFlow } from "@xyflow/react";
import { useArchitectureStore } from "@/store/useArchitectureStore";

type CanvasToolbarProps = {
  onToggleShortcuts: () => void;
};

export function CanvasToolbar({ onToggleShortcuts }: CanvasToolbarProps) {
  const { fitView, getNodes, setNodes } = useReactFlow();
  const { deleteNode, duplicateNodes, clearCanvas, getTotalCost } =
    useArchitectureStore();

  const totalCost = getTotalCost();
  const nodeCount = useArchitectureStore((s) => s.nodes.length);

  const handleUndo = () => {
    useArchitectureStore.temporal.getState().undo();
  };

  const handleRedo = () => {
    useArchitectureStore.temporal.getState().redo();
  };

  const handleSelectAll = () => {
    setNodes((nodes) => nodes.map((n) => ({ ...n, selected: true })));
  };

  const handleDeleteSelected = () => {
    const selected = getNodes().filter((n) => n.selected);
    for (const node of selected) {
      deleteNode(node.id);
    }
  };

  const handleDuplicateSelected = () => {
    const selectedIds = getNodes()
      .filter((n) => n.selected)
      .map((n) => n.id);
    if (selectedIds.length > 0) {
      duplicateNodes(selectedIds);
    }
  };

  const handleFitView = () => {
    fitView({ padding: 0.2, duration: 300 });
  };

  const handleClear = () => {
    if (nodeCount === 0) return;
    clearCanvas();
  };

  return (
    <div className="flex items-center justify-between gap-2 rounded-2xl border border-white/10 bg-[#121214]/90 px-3 py-2 backdrop-blur-md">
      <div className="flex items-center gap-1">
        {/* Undo/Redo */}
        <ToolbarButton
          title="Undo (⌘Z)"
          onClick={handleUndo}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 7v6h6" />
            <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13" />
          </svg>
        </ToolbarButton>
        <ToolbarButton
          title="Redo (⌘⇧Z)"
          onClick={handleRedo}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 7v6h-6" />
            <path d="M3 17a9 9 0 019-9 9 9 0 016 2.3L21 13" />
          </svg>
        </ToolbarButton>

        <ToolbarDivider />

        {/* Selection */}
        <ToolbarButton title="Select All (⌘A)" onClick={handleSelectAll}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 3v18" />
            <path d="M15 3v18" />
            <path d="M3 9h18" />
            <path d="M3 15h18" />
          </svg>
        </ToolbarButton>
        <ToolbarButton title="Delete Selected (Del)" onClick={handleDeleteSelected}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </ToolbarButton>
        <ToolbarButton title="Duplicate Selected (⌘D)" onClick={handleDuplicateSelected}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="8" y="8" width="14" height="14" rx="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
        </ToolbarButton>

        <ToolbarDivider />

        {/* View */}
        <ToolbarButton title="Fit View (F)" onClick={handleFitView}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3H5a2 2 0 00-2 2v3" />
            <path d="M21 8V5a2 2 0 00-2-2h-3" />
            <path d="M3 16v3a2 2 0 002 2h3" />
            <path d="M16 21h3a2 2 0 002-2v-3" />
          </svg>
        </ToolbarButton>

        <ToolbarDivider />

        {/* Shortcuts */}
        <ToolbarButton title="Keyboard Shortcuts (?)" onClick={onToggleShortcuts}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M6 8h.01" />
            <path d="M10 8h.01" />
            <path d="M14 8h.01" />
            <path d="M18 8h.01" />
            <path d="M8 12h8" />
            <path d="M6 16h.01" />
            <path d="M18 16h.01" />
            <path d="M10 16h4" />
          </svg>
        </ToolbarButton>

        <ToolbarDivider />

        {/* Clear */}
        <ToolbarButton
          title="Clear Canvas"
          onClick={handleClear}
          variant="danger"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </ToolbarButton>
      </div>

      {/* Right: Cost summary */}
      <div className="hidden items-center gap-3 md:flex">
        <span className="text-xs text-gray-500">
          {nodeCount} node{nodeCount !== 1 ? "s" : ""}
        </span>
        <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1">
          <span className="text-xs font-bold text-emerald-300">
            ${totalCost.toFixed(2)}/mo
          </span>
          <span className="text-[10px] text-emerald-400/60">
            ${(totalCost * 12).toFixed(0)}/yr
          </span>
        </div>
      </div>
    </div>
  );
}

function ToolbarButton({
  children,
  title,
  onClick,
  variant = "default",
}: {
  children: React.ReactNode;
  title: string;
  onClick: () => void;
  variant?: "default" | "danger";
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`rounded-xl p-2 text-gray-400 transition-colors ${
        variant === "danger"
          ? "hover:bg-rose-500/10 hover:text-rose-400"
          : "hover:bg-white/10 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function ToolbarDivider() {
  return <div className="mx-1 h-5 w-px bg-white/10" />;
}
