'use client';

import React, { useCallback, useRef, useEffect, useState } from 'react';
import { ReactFlow, Background, Controls, MiniMap, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { usePipelineStore } from '@/store/usePipelineStore';
import { InputNode } from './nodes/InputNode';
import { OutputNode } from './nodes/OutputNode';
import { GenericNode } from './nodes/GenericNode';
import { FileInputNode } from './nodes/FileInputNode';
import { Sidebar } from './Sidebar';
import { nodeRegistry } from './nodeRegistry';
import { PipelineNode } from '@/store/usePipelineStore';
import { Edge } from '@xyflow/react';

const nodeTypes: Record<string, React.ComponentType<any>> = {
  inputNode: InputNode,
  outputNode: OutputNode,
  fileInputNode: FileInputNode,
};

Object.keys(nodeRegistry).forEach((type) => {
  if (!['inputNode', 'outputNode', 'fileInputNode'].includes(type)) {
    nodeTypes[type] = GenericNode;
  }
});

interface PipelineCanvasProps {
  initialTemplate?: { nodes: PipelineNode[]; edges: Edge[] };
}

export function PipelineCanvas({ initialTemplate }: PipelineCanvasProps = {}) {
  const {
    nodes, edges, onNodesChange, onEdgesChange, onConnect,
    runPipeline, addNode, exportPipeline, importPipeline, loadTemplate,
  } = usePipelineStore();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      importPipeline(hash);
    } else if (initialTemplate) {
      loadTemplate(initialTemplate.nodes, initialTemplate.edges);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTemplate]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;
      const bounds = reactFlowWrapper.current?.getBoundingClientRect();
      const position = {
        x: event.clientX - (bounds?.left || 0),
        y: event.clientY - (bounds?.top || 0),
      };
      addNode(type, position);
    },
    [addNode]
  );

  const handleShare = () => {
    const base64Config = exportPipeline();
    const url = `${window.location.origin}${window.location.pathname}#${base64Config}`;
    window.history.pushState(null, '', url);
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleRun = async () => {
    setIsRunning(true);
    await runPipeline();
    setIsRunning(false);
  };

  const loadExample = () => {
    // JWT decode example encoded as a pre-built template
    window.location.hash = 'eyJub2RlcyI6W3siaWQiOiJpbnB1dC0xIiwidHlwZSI6ImlucHV0Tm9kZSIsInBvc2l0aW9uIjp7IngiOjgwLCJ5IjoxMjB9LCJkYXRhIjp7ImxhYmVsIjoiUGFzdGUgSldUIn19LHsiaWQiOiJqd3QtMSIsInR5cGUiOiJqd3REZWNvZGVOb2RlIiwicG9zaXRpb24iOnsieCI6NDAwLCJ5IjoxMjB9LCJkYXRhIjp7ImxhYmVsIjoiRGVjb2RlIEpXVCJ9fSx7ImlkIjoib3V0cHV0LTEiLCJ0eXBlIjoib3V0cHV0Tm9kZSIsInBvc2l0aW9uIjp7IngiOjcyMCwieSI6MTIwfSwiZGF0YSI6eyJsYWJlbCI6Ik91dHB1dCJ9fV0sImVkZ2VzIjpbeyJpZCI6ImUxIiwic291cmNlIjoiaW5wdXQtMSIsInRhcmdldCI6Imp3dC0xIn0seyJpZCI6ImUyIiwic291cmNlIjoiand0LTEiLCJ0YXJnZXQiOiJvdXRwdXQtMSJ9XX0=';
    window.location.reload();
  };

  return (
    <div className="w-full h-full flex flex-col font-sans bg-[#0A0A0B]">
      {/* Header */}
      <header className="h-16 bg-[#0A0A0B]/90 backdrop-blur-md border-b border-white/10 px-6 flex justify-between items-center shrink-0 z-20">
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-3 no-underline group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)] group-hover:shadow-[0_0_20px_rgba(99,102,241,0.7)] transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight block">WebToolsEasy</span>
              <span className="text-[10px] text-indigo-400 font-mono tracking-widest uppercase block mt-[-2px]">Pipeline Canvas</span>
            </div>
          </a>
          <a href="/" className="text-xs text-gray-500 hover:text-gray-300 transition-colors no-underline hidden sm:inline-flex items-center gap-1 ml-2 px-2 py-1 rounded bg-white/5 border border-white/5 hover:border-white/10">
            ← Home
          </a>
        </div>

        <div className="flex gap-2">
          <button
            onClick={loadExample}
            className="text-sm text-gray-500 hover:text-white px-3 py-2 transition-colors hidden sm:block"
          >
            Load Example
          </button>
          <button
            onClick={handleShare}
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-lg font-medium transition-all text-sm flex items-center gap-2"
          >
            {copied ? '✓ Copied!' : '🔗 Share'}
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className={`text-white px-5 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 text-sm ml-1 ${isRunning
              ? 'bg-indigo-800 cursor-wait'
              : 'bg-indigo-600 hover:bg-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)]'
            }`}
          >
            {isRunning ? (
              <>
                <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Running…
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                Run Pipeline
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 relative" ref={reactFlowWrapper}>
          {nodes.length <= 2 && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10 opacity-30">
              <div className="text-center">
                <div className="w-20 h-20 border-2 border-dashed border-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                </div>
                <p className="text-gray-500 font-medium">Drag tools here to build a pipeline</p>
              </div>
            </div>
          )}

          <ReactFlowProvider>
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
              defaultEdgeOptions={{ style: { stroke: '#4f46e5', strokeWidth: 2 } }}
            >
              <Background color="#1f1f23" gap={24} size={1} />
              <Controls className="bg-[#121214] border border-white/10 rounded-xl overflow-hidden" />
              <MiniMap
                className="bg-[#121214]/90 border border-white/10 backdrop-blur-md rounded-xl overflow-hidden"
                maskColor="rgba(0,0,0,0.6)"
                nodeColor="#4f46e5"
              />
            </ReactFlow>
          </ReactFlowProvider>
        </div>
      </div>
    </div>
  );
}
