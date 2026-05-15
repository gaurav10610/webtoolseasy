"use client";

import React, { useRef, useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useArchitectureStore } from "@/store/useArchitectureStore";
import { InfraNode as InfraNodeComponent } from "./nodes/InfraNode";
import { Sidebar } from "./Sidebar";
import { Edge } from "@xyflow/react";
import { InfraService, pricingStatus } from "@/data/pricingEngine";

const nodeTypes: any = {
  infraNode: InfraNodeComponent,
};

interface ArchitectureCanvasProps {
  initialTemplate?: { nodes: any[]; edges: Edge[] };
}

function FlowInner() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } =
    useArchitectureStore();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

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
        fitView
        colorMode="dark"
        className="bg-[#0A0A0B]"
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
    </div>
  );
}

export function ArchitectureCanvas({
  initialTemplate,
}: ArchitectureCanvasProps = {}) {
  const { loadTemplate } = useArchitectureStore();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (initialTemplate) {
      loadTemplate(initialTemplate.nodes, initialTemplate.edges);
    }
  }, [initialTemplate, loadTemplate]);

  const handleClear = () => {
    if (confirm("Are you sure you want to clear the canvas?")) {
      loadTemplate([], []);
    }
  };

  const handleShare = () => {
    // Basic share: currently disabled until Base64 export is re-implemented
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col font-sans bg-[#0A0A0B]">
      {/* Header */}
      <header className="h-16 bg-[#0A0A0B]/90 backdrop-blur-md border-b border-white/10 px-6 flex justify-between items-center shrink-0 z-20">
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-3 no-underline group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.5)] group-hover:shadow-[0_0_20px_rgba(249,115,22,0.7)] transition-all">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                <line x1="6" y1="6" x2="6.01" y2="6" />
                <line x1="6" y1="18" x2="6.01" y2="18" />
              </svg>
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight block">
                ArchCost
              </span>
              <span className="text-[10px] text-orange-400 font-mono tracking-widest uppercase block mt-[-2px]">
                Visual Cloud Estimator
              </span>
            </div>
          </a>
          <div className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold text-gray-200">
            <span
              className={`h-1.5 w-1.5 rounded-full ${pricingStatus.isFallback ? "bg-amber-400" : "bg-emerald-400"}`}
            />
            {pricingStatus.isFallback
              ? "Quarterly baseline pricing"
              : "Weekly synced pricing"}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleClear}
            className="text-sm text-gray-500 hover:text-red-400 px-3 py-2 transition-colors hidden sm:block"
          >
            Clear Canvas
          </button>
          <button
            onClick={handleShare}
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-lg font-medium transition-all text-sm flex items-center gap-2"
          >
            {copied ? "✓ Copied!" : "🔗 Share"}
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.3)] text-white px-5 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 text-sm ml-1">
            Export Architecture CSV
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <ReactFlowProvider>
          <FlowInner />
        </ReactFlowProvider>
      </div>
    </div>
  );
}
