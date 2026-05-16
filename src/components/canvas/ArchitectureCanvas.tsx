"use client";

import React, { useRef, useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useReactFlow,
  SelectionMode,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  compressArchitecture,
  decompressArchitecture,
} from "@/lib/archcost/shareUrl";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

import { useArchitectureStore } from "@/store/useArchitectureStore";
import { trackEvent } from "@/lib/analytics";
import { Sidebar } from "./Sidebar";
import { Edge } from "@xyflow/react";
import { InfraService, pricingStatus } from "@/data/pricingEngine";
import { ContextMenu } from "./ContextMenu";
import { InfraNode as InfraNodeComponent } from "./nodes/InfraNode";
import { AnnotationNode } from "./nodes/AnnotationNode";
import { useCanvasKeyboard } from "@/hooks/useCanvasKeyboard";

const nodeTypes: any = {
  infraNode: InfraNodeComponent,
  annotationNode: AnnotationNode,
};

interface ArchitectureCanvasProps {
  initialTemplate?: { nodes: any[]; edges: Edge[] };
}

function FlowInner() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    deleteNode,
    duplicateNodes,
    updateEdgeTransfer,
    getUnconfiguredTransferEdgesCount,
  } = useArchitectureStore();
  useCanvasKeyboard();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition, fitView } = useReactFlow();
  const [menu, setMenu] = useState<{
    x: number;
    y: number;
    type: "node" | "pane";
    id?: string;
  } | null>(null);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const service = event.dataTransfer.getData(
        "application/reactflow/service",
      ) as InfraService;
      if (!service) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      addNode(service, position);
    },
    [addNode, screenToFlowPosition],
  );

  const onNodeContextMenu = useCallback((event: any, node: any) => {
    event.preventDefault();
    setMenu({ x: event.clientX, y: event.clientY, type: "node", id: node.id });
  }, []);

  const onPaneContextMenu = useCallback((event: any) => {
    event.preventDefault();
    setMenu({ x: event.clientX, y: event.clientY, type: "pane" });
  }, []);

  const onEdgeClick = useCallback(
    (_event: any, edge: Edge) => {
      const currentGb = Number(edge.data?.gbPerMonth || 0);
      const input = window.prompt(
        "Edge transfer (GB/month)",
        String(currentGb),
      );
      if (input === null) return;

      const parsed = Number(input);
      if (!Number.isFinite(parsed) || parsed < 0) {
        alert("Please enter a valid non-negative number.");
        return;
      }

      const crossRegion = window.confirm(
        "Mark this transfer as cross-region? Click OK for cross-region, Cancel for same-region.",
      );
      updateEdgeTransfer(edge.id, parsed, crossRegion);
    },
    [updateEdgeTransfer],
  );

  const hiddenTransferWarnings = getUnconfiguredTransferEdgesCount();

  return (
    <div className="flex-1 relative" ref={reactFlowWrapper}>
      {nodes.length === 0 && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10 opacity-30">
          <div className="text-center">
            <div className="w-20 h-20 border-2 border-dashed border-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6b7280"
                strokeWidth="1.5"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">
              Drag AWS resources here to build architecture
            </p>
          </div>
        </div>
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeContextMenu={onNodeContextMenu}
        onPaneContextMenu={onPaneContextMenu}
        onEdgeClick={onEdgeClick}
        fitView
        colorMode="dark"
        className="bg-[#0A0A0B]"
        selectionOnDrag={true}
        panOnDrag={[1, 2]} // middle click and right click to pan
        selectionMode={SelectionMode.Partial}
        snapToGrid={true}
        snapGrid={[20, 20]}
        defaultEdgeOptions={{
          style: { stroke: "#6366f1", strokeWidth: 2 },
          type: "smoothstep",
        }}
      >
        <Background color="#1f1f23" gap={30} size={1.5} />
        <Controls className="bg-[#121214] border border-white/10 rounded-xl overflow-hidden" />
        <MiniMap
          className="bg-[#121214]/90 border border-white/10 backdrop-blur-md rounded-xl overflow-hidden"
          maskColor="rgba(0,0,0,0.6)"
          nodeColor="#6366f1"
        />
      </ReactFlow>

      {hiddenTransferWarnings > 0 ? (
        <div className="absolute left-1/2 top-4 z-20 -translate-x-1/2 rounded-full border border-amber-500/40 bg-amber-500/15 px-4 py-1.5 text-xs font-semibold text-amber-300 shadow-lg">
          Hidden costs warning: {hiddenTransferWarnings} edge
          {hiddenTransferWarnings === 1 ? " has " : "s have "}
          transfer cost not configured.
        </div>
      ) : null}

      {menu && menu.type === "node" && (
        <ContextMenu
          x={menu.x}
          y={menu.y}
          onClose={() => setMenu(null)}
          options={[
            {
              label: "Duplicate",
              onClick: () => menu.id && duplicateNodes([menu.id]),
            },
            { label: "Copy", onClick: () => {} }, // stub
            { divider: true, label: "" },
            {
              label: "Delete",
              onClick: () => menu.id && deleteNode(menu.id),
              danger: true,
            },
          ]}
        />
      )}

      {menu && menu.type === "pane" && (
        <ContextMenu
          x={menu.x}
          y={menu.y}
          onClose={() => setMenu(null)}
          options={[
            { label: "Fit View", onClick: () => fitView({ duration: 300 }) },
            { divider: true, label: "" },
            {
              label: "Clear Canvas",
              onClick: () => useArchitectureStore.getState().clearCanvas(),
              danger: true,
            },
          ]}
        />
      )}
    </div>
  );
}

export function ArchitectureCanvas({
  initialTemplate,
}: ArchitectureCanvasProps = {}) {
  const { loadTemplate, nodes, edges, getTotalCost } = useArchitectureStore();
  const [copied, setCopied] = useState(false);
  const [readOnlyMode, setReadOnlyMode] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [isComparePane, setIsComparePane] = useState(false);
  const [compareVersionA, setCompareVersionA] = useState(0);
  const [compareVersionB, setCompareVersionB] = useState(0);
  const [compareTotals, setCompareTotals] = useState({ a: 0, b: 0 });
  const compareFrameARef = useRef<HTMLIFrameElement>(null);
  const compareFrameBRef = useRef<HTMLIFrameElement>(null);

  const AUTOSAVE_KEY = "wte_arch_autosave";

  const parseCurrency = (text: string) => {
    const normalized = text.replace(/[^0-9.-]/g, "");
    return Number(normalized || 0);
  };

  const getPaneTotal = (frame: HTMLIFrameElement | null): number => {
    try {
      const doc = frame?.contentWindow?.document;
      if (!doc) return 0;
      const totalNode = doc.querySelector("aside .text-3xl");
      if (!totalNode) return 0;
      return parseCurrency(totalNode.textContent || "0");
    } catch {
      return 0;
    }
  };

  const seedComparePanes = useCallback(() => {
    if (typeof window === "undefined") return;
    const payload = JSON.stringify({ nodes, edges });
    localStorage.setItem(`${AUTOSAVE_KEY}_A`, payload);
    localStorage.setItem(`${AUTOSAVE_KEY}_B`, payload);
    setCompareVersionA((value) => value + 1);
    setCompareVersionB((value) => value + 1);
  }, [nodes, edges]);

  const importToPane = useCallback((pane: "A" | "B") => {
    const input = window.prompt(
      "Paste shared architecture URL (with ?arch=) or raw JSON containing {nodes,edges}",
    );
    if (!input) return;

    try {
      let payload: string | null = null;
      if (input.trim().startsWith("{")) {
        const parsed = JSON.parse(input);
        if (!parsed.nodes || !parsed.edges) {
          throw new Error("Missing nodes/edges in JSON payload");
        }
        payload = JSON.stringify(parsed);
      } else {
        const url = new URL(input);
        const arch = url.searchParams.get("arch");
        if (!arch) throw new Error("No arch query param found in URL");
        const modern = decompressArchitecture(arch);
        if ("error" in modern) {
          throw new Error(modern.error);
        }
        const parsed = modern.payload;

        if (!parsed.nodes || !parsed.edges) {
          throw new Error("Invalid architecture payload");
        }
        payload = JSON.stringify(parsed);
      }

      localStorage.setItem(`${AUTOSAVE_KEY}_${pane}`, payload);
      if (pane === "A") setCompareVersionA((value) => value + 1);
      if (pane === "B") setCompareVersionB((value) => value + 1);
    } catch (error) {
      console.error(error);
      alert(
        "Invalid import. Use a shared /canvas URL or JSON with nodes and edges.",
      );
    }
  }, []);

  const handleUndo = () => {
    const getMeaningfulSnapshot = (
      state: ReturnType<typeof useArchitectureStore.getState>,
    ) =>
      JSON.stringify({
        nodes: state.nodes.map((node) => ({
          id: node.id,
          position: node.position,
          data: {
            service: node.data.service,
            label: node.data.label,
            region: node.data.region,
            config: node.data.config,
            costPerMonth: node.data.costPerMonth,
          },
        })),
        edges: state.edges.map((edge) => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          data: edge.data,
          label: edge.label,
        })),
      });

    const before = useArchitectureStore.getState();
    const beforeSnapshot = getMeaningfulSnapshot(before);
    useArchitectureStore.temporal.getState().undo();

    const after = useArchitectureStore.getState();
    const afterSnapshot = getMeaningfulSnapshot(after);

    // Fallback: if temporal did not change anything, remove the most recently added node.
    if (beforeSnapshot === afterSnapshot && after.nodes.length > 0) {
      const newestNode = [...after.nodes].sort((a, b) => {
        const aTs = Number(String(a.id).split("-").pop()) || 0;
        const bTs = Number(String(b.id).split("-").pop()) || 0;
        return bTs - aTs;
      })[0];

      const nextNodes = after.nodes.filter((n) => n.id !== newestNode.id);
      const nextEdges = after.edges.filter(
        (e) => e.source !== newestNode.id && e.target !== newestNode.id,
      );
      loadTemplate(nextNodes, nextEdges);
    }
  };

  const handleRedo = () => {
    useArchitectureStore.temporal.getState().redo();
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    setIsComparePane(
      new URLSearchParams(window.location.search).has("comparePane"),
    );

    // Check URL parameters for ?arch=
    const params = new URLSearchParams(window.location.search);
    const archParam = params.get("arch");

    if (archParam) {
      try {
        const modern = decompressArchitecture(archParam);
        if ("error" in modern) {
          throw new Error(modern.error);
        }
        const parsed = modern.payload;

        if (parsed.nodes && parsed.edges) {
          loadTemplate(parsed.nodes as any[], parsed.edges as Edge[]);
          setReadOnlyMode(true);
        }
      } catch (err) {
        console.error("Failed to decode architecture from URL:", err);
      }
    } else if (initialTemplate) {
      loadTemplate(initialTemplate.nodes, initialTemplate.edges);
      setReadOnlyMode(true);
    }
  }, [initialTemplate, loadTemplate]);

  useEffect(() => {
    if (!compareMode) return;

    const tick = () => {
      const a = getPaneTotal(compareFrameARef.current);
      const b = getPaneTotal(compareFrameBRef.current);
      setCompareTotals({ a, b });
    };

    tick();
    const interval = window.setInterval(tick, 750);
    return () => window.clearInterval(interval);
  }, [compareMode]);

  const handleClear = () => {
    if (confirm("Are you sure you want to clear the canvas?")) {
      loadTemplate([], []);
      setReadOnlyMode(false);

      // Remove arch query param from URL
      const url = new URL(window.location.href);
      url.searchParams.delete("arch");
      window.history.replaceState({}, "", url.toString());
    }
  };

  const handleShare = async () => {
    try {
      const sharePayload = {
        nodes: nodes.map((node) => ({
          id: node.id,
          type: node.type ?? "infraNode",
          position: node.position,
          data: node.data as Record<string, unknown>,
        })),
        edges: edges.map((edge) => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          animated: edge.animated,
        })),
      };

      const result = compressArchitecture(sharePayload);
      if ("error" in result) {
        alert(result.error);
        return;
      }

      const url = new URL(window.location.origin + "/canvas");
      url.searchParams.set("arch", result.encoded);
      navigator.clipboard.writeText(url.toString());

      trackEvent("architecture_shared", {
        share_type: "url_param",
      });

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
      alert("Failed to generate share link.");
    }
  };

  const handleExportCSV = () => {
    if (nodes.length === 0) return;

    const rows = [
      [
        "Service",
        "Node Label",
        "Config Summary",
        "Monthly Cost (USD)",
        "Annual Cost (USD)",
      ],
    ];

    let totalMonthly = 0;

    nodes.forEach((node) => {
      const { service, label, config, costPerMonth } = node.data;
      const configStr = Object.entries(config)
        .map(([k, v]) => `${k}:${v}`)
        .join("; ");
      const annual = costPerMonth * 12;
      totalMonthly += costPerMonth;

      rows.push([
        service,
        `"${label}"`,
        `"${configStr}"`,
        costPerMonth.toFixed(2),
        annual.toFixed(2),
      ]);
    });

    // Summary row
    rows.push([]);
    rows.push([
      "TOTAL",
      "",
      "",
      totalMonthly.toFixed(2),
      (totalMonthly * 12).toFixed(2),
    ]);

    const csvContent = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", `archcost-breakdown-${Date.now()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    trackEvent("export_used", { format: "csv" });
  };

  const buildCanvasSnapshot = async (): Promise<string> => {
    const flowElement = document.querySelector(
      ".react-flow",
    ) as HTMLElement | null;
    if (!flowElement) throw new Error("Canvas not found");

    const baseImage = await toPng(flowElement, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: "#0A0A0B",
    });

    const image = new Image();
    image.src = baseImage;
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Failed to load canvas image"));
    });

    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas context unavailable");

    context.drawImage(image, 0, 0);

    const totalMonthly = getTotalCost();
    const totalAnnual = totalMonthly * 12;
    const boxWidth = 360;
    const boxHeight = 120;
    const boxX = canvas.width - boxWidth - 32;
    const boxY = canvas.height - boxHeight - 32;

    context.fillStyle = "rgba(10, 10, 11, 0.88)";
    context.strokeStyle = "rgba(255,255,255,0.25)";
    context.lineWidth = 2;
    context.fillRect(boxX, boxY, boxWidth, boxHeight);
    context.strokeRect(boxX, boxY, boxWidth, boxHeight);

    context.fillStyle = "#e5e7eb";
    context.font = "bold 24px system-ui";
    context.fillText("ArchCost Summary", boxX + 16, boxY + 34);
    context.font = "16px system-ui";
    context.fillText(
      `Monthly: $${totalMonthly.toFixed(2)}   Annual: $${totalAnnual.toFixed(2)}`,
      boxX + 16,
      boxY + 68,
    );
    context.fillText(
      `Nodes: ${nodes.length}   Edges: ${edges.length}`,
      boxX + 16,
      boxY + 96,
    );

    return canvas.toDataURL("image/png");
  };

  const handleExportPNG = async () => {
    try {
      const pngDataUrl = await buildCanvasSnapshot();
      const link = document.createElement("a");
      link.href = pngDataUrl;
      link.download = `architecture-${Date.now()}.png`;
      link.click();
      setShowExportMenu(false);
      trackEvent("export_used", { format: "png" });
    } catch (error) {
      console.error(error);
      alert("Failed to export PNG.");
    }
  };

  const handleExportPDF = async () => {
    try {
      const pngDataUrl = await buildCanvasSnapshot();
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: "a4",
      });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      doc.setFontSize(16);
      doc.text("Architecture Diagram", 32, 32);
      doc.addImage(pngDataUrl, "PNG", 24, 44, pageWidth - 48, pageHeight - 72);

      doc.addPage();
      doc.setFontSize(16);
      doc.text("Service Cost Breakdown", 32, 32);
      doc.setFontSize(11);
      let y = 56;
      nodes.forEach((node) => {
        const configSummary = Object.entries(node.data.config)
          .map(([key, value]) => `${key}:${value}`)
          .join("; ");
        const row = `${node.data.service} | ${node.data.label} | $${node.data.costPerMonth.toFixed(2)} / mo | ${configSummary}`;
        const wrapped = doc.splitTextToSize(row, pageWidth - 64);
        doc.text(wrapped, 32, y);
        y += wrapped.length * 14 + 6;
        if (y > pageHeight - 80) {
          doc.addPage();
          y = 44;
        }
      });
      doc.setFontSize(12);
      doc.text(
        `Total Monthly: $${getTotalCost().toFixed(2)}`,
        32,
        pageHeight - 36,
      );
      doc.text(
        `Total Annual: $${(getTotalCost() * 12).toFixed(2)}`,
        260,
        pageHeight - 36,
      );

      doc.addPage();
      doc.setFontSize(16);
      doc.text("Data Transfer Costs", 32, 32);
      doc.setFontSize(11);
      const transferEdges = edges.filter(
        (edge) => edge.data?.transferConfigured,
      );
      if (transferEdges.length === 0) {
        doc.text("No configured transfer edges.", 32, 56);
      } else {
        let edgeY = 56;
        transferEdges.forEach((edge) => {
          const row = `${edge.id}: ${edge.source} -> ${edge.target} | ${Number(edge.data?.gbPerMonth || 0).toLocaleString()} GB/mo | ${edge.label || "n/a"}`;
          const wrapped = doc.splitTextToSize(row, pageWidth - 64);
          doc.text(wrapped, 32, edgeY);
          edgeY += wrapped.length * 14 + 6;
          if (edgeY > pageHeight - 80) {
            doc.addPage();
            edgeY = 44;
          }
        });
      }
      doc.setFontSize(12);
      doc.text(
        `Total Monthly: $${getTotalCost().toFixed(2)}`,
        32,
        pageHeight - 36,
      );
      doc.text(
        `Total Annual: $${(getTotalCost() * 12).toFixed(2)}`,
        260,
        pageHeight - 36,
      );

      doc.save(`architecture-cost-estimate-${Date.now()}.pdf`);
      setShowExportMenu(false);
      trackEvent("export_used", { format: "pdf" });
    } catch (error) {
      console.error(error);
      alert("Failed to export PDF.");
    }
  };

  const handleFork = () => {
    setReadOnlyMode(false);
    const url = new URL(window.location.href);
    url.searchParams.delete("arch");
    window.history.replaceState({}, "", url.toString());
  };

  const handleEnterCompareMode = () => {
    seedComparePanes();
    setCompareMode(true);
  };

  const handleExitCompareMode = () => {
    setCompareMode(false);
  };

  return (
    <div className="w-full h-full flex flex-col font-sans bg-[#0A0A0B]">
      {/* Header */}
      <header className="bg-[#0A0A0B]/90 backdrop-blur-md border-b border-white/10 px-3 py-2 sm:px-6 sm:py-0 sm:h-16 flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center shrink-0 z-20">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-gray-500">
              Workspace
            </div>
            <div className="text-base sm:text-lg font-bold text-white tracking-tight">
              ArchCost Canvas
            </div>
          </div>
          <div className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold text-gray-200">
            <span
              className={`h-1.5 w-1.5 rounded-full ${pricingStatus.isFallback ? "bg-amber-400" : "bg-emerald-400"}`}
            />
            {pricingStatus.isFallback
              ? "Quarterly baseline pricing"
              : "Weekly synced pricing"}
          </div>
          <a
            href="/architectures"
            className="hidden md:inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold text-indigo-200 hover:bg-indigo-500/20"
          >
            Start from ArchCost templates
          </a>
        </div>

        {readOnlyMode && (
          <div className="absolute left-1/2 top-full mt-2 w-[calc(100%-1rem)] max-w-2xl -translate-x-1/2 flex flex-wrap items-center justify-center gap-2 bg-blue-900/30 border border-blue-500/30 px-3 py-2 rounded-2xl z-30">
            <span className="text-xs text-blue-300 font-medium">
              Viewing shared architecture (Read-only)
            </span>
            <button
              onClick={handleFork}
              className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-md transition-colors font-semibold"
            >
              Fork to Edit
            </button>
          </div>
        )}

        <div className="flex w-full flex-wrap gap-2 sm:w-auto sm:justify-end">
          <button
            onClick={handleUndo}
            className="text-xs sm:text-sm text-gray-300 hover:text-white px-3 py-2 transition-colors"
            aria-label="Undo"
            title="Undo"
          >
            Undo
          </button>
          <button
            onClick={handleRedo}
            className="text-xs sm:text-sm text-gray-300 hover:text-white px-3 py-2 transition-colors"
            aria-label="Redo"
            title="Redo"
          >
            Redo
          </button>
          <button
            onClick={handleClear}
            className="text-sm text-gray-500 hover:text-red-400 px-3 py-2 transition-colors hidden sm:block"
          >
            Clear Canvas
          </button>
          <button
            onClick={handleShare}
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-xs sm:text-sm flex items-center gap-2"
          >
            {copied ? "✓ Copied!" : "🔗 Share"}
          </button>
          {!isComparePane ? (
            compareMode ? (
              <button
                onClick={handleExitCompareMode}
                className="bg-amber-600 hover:bg-amber-500 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all text-xs sm:text-sm"
              >
                Exit Comparison
              </button>
            ) : (
              <button
                onClick={handleEnterCompareMode}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all text-xs sm:text-sm"
              >
                Compare
              </button>
            )
          ) : null}
          <div className="relative ml-1">
            <button
              onClick={() => setShowExportMenu((current) => !current)}
              className="bg-indigo-600 hover:bg-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.3)] text-white px-4 sm:px-5 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 text-xs sm:text-sm"
            >
              Export
            </button>
            {showExportMenu ? (
              <div className="absolute right-0 mt-2 w-56 rounded-lg border border-white/10 bg-[#121214] p-1.5 shadow-2xl z-40">
                <button
                  onClick={handleExportCSV}
                  className="w-full text-left rounded-md px-3 py-2 text-sm text-gray-200 hover:bg-white/10"
                >
                  Export Architecture CSV
                </button>
                <button
                  onClick={handleExportPNG}
                  className="w-full text-left rounded-md px-3 py-2 text-sm text-gray-200 hover:bg-white/10"
                >
                  Export PNG
                </button>
                <button
                  onClick={handleExportPDF}
                  className="w-full text-left rounded-md px-3 py-2 text-sm text-gray-200 hover:bg-white/10"
                >
                  Export PDF
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      {compareMode && !isComparePane ? (
        <div className="flex-1 flex flex-col overflow-hidden bg-[#080809]">
          <div className="border-b border-white/10 px-6 py-3">
            <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200">
              {compareTotals.a === compareTotals.b
                ? `Options are equal at $${compareTotals.a.toFixed(2)}/month`
                : compareTotals.a < compareTotals.b
                  ? `Option A saves $${(compareTotals.b - compareTotals.a).toFixed(2)}/month ($${((compareTotals.b - compareTotals.a) * 12).toFixed(2)}/year)`
                  : `Option B saves $${(compareTotals.a - compareTotals.b).toFixed(2)}/month ($${((compareTotals.a - compareTotals.b) * 12).toFixed(2)}/year)`}
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-3 p-3 overflow-hidden">
            <div className="flex h-full min-h-0 flex-col rounded-xl border border-white/10 bg-[#0A0A0B]">
              <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
                <div className="text-sm font-semibold text-gray-200">
                  Option A · ${compareTotals.a.toFixed(2)}/mo
                </div>
                <button
                  onClick={() => importToPane("A")}
                  className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-200 hover:bg-white/10"
                >
                  Import Existing Canvas
                </button>
              </div>
              <iframe
                key={`compare-a-${compareVersionA}`}
                ref={compareFrameARef}
                src={`/canvas?comparePane=A&v=${compareVersionA}`}
                title="Comparison option A"
                className="h-full w-full border-0"
              />
            </div>

            <div className="flex h-full min-h-0 flex-col rounded-xl border border-white/10 bg-[#0A0A0B]">
              <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
                <div className="text-sm font-semibold text-gray-200">
                  Option B · ${compareTotals.b.toFixed(2)}/mo
                </div>
                <button
                  onClick={() => importToPane("B")}
                  className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-200 hover:bg-white/10"
                >
                  Import Existing Canvas
                </button>
              </div>
              <iframe
                key={`compare-b-${compareVersionB}`}
                ref={compareFrameBRef}
                src={`/canvas?comparePane=B&v=${compareVersionB}`}
                title="Comparison option B"
                className="h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex overflow-hidden">
          <Sidebar />
          <ReactFlowProvider>
            <FlowInner />
          </ReactFlowProvider>
        </div>
      )}
    </div>
  );
}
