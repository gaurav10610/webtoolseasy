'use client';

import React, { useCallback, useRef, useEffect, useState } from 'react';
import { ReactFlow, Background, Controls, MiniMap, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { usePipelineStore } from '@/store/usePipelineStore';
import { InputNode } from './nodes/InputNode';
import { OutputNode } from './nodes/OutputNode';
import { GenericNode } from './nodes/GenericNode';
import { Sidebar } from './Sidebar';
import { nodeRegistry } from './nodeRegistry';
import { PipelineNode } from '@/store/usePipelineStore';
import { Edge } from '@xyflow/react';

const nodeTypes: Record<string, React.ComponentType<any>> = {
  inputNode: InputNode,
  outputNode: OutputNode,
};

Object.keys(nodeRegistry).forEach((type) => {
  if (type !== 'inputNode' && type !== 'outputNode') {
    nodeTypes[type] = GenericNode;
  }
});

interface PipelineCanvasProps {
  initialTemplate?: { nodes: PipelineNode[], edges: Edge[] };
}

export function PipelineCanvas({ initialTemplate }: PipelineCanvasProps = {}) {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, runPipeline, addNode, exportPipeline, importPipeline, loadTemplate } = usePipelineStore();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        importPipeline(hash);
      } else if (initialTemplate) {
        loadTemplate(initialTemplate.nodes, initialTemplate.edges);
      }
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
      if (typeof type === 'undefined' || !type) return;

      const position = {
        x: event.clientX - (reactFlowWrapper.current?.getBoundingClientRect().left || 0),
        y: event.clientY - (reactFlowWrapper.current?.getBoundingClientRect().top || 0),
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
    setTimeout(() => setCopied(false), 2000);
  };

  const loadExample = () => {
    // A quick JWT decode example
    window.location.hash = 'eyJub2RlcyI6W3siaWQiOiJpbnB1dC0xIiwidHlwZSI6ImlucHV0Tm9kZSIsInBvc2l0aW9uIjp7IngiOjE1MCwieSI6MTUwfSwiZGF0YSI6eyJsYWJlbCI6IklucHV0IHRleHQifX0seyJpZCI6Imp3dERlY29kZU5vZGUtMSIsInR5cGUiOiJqd3REZWNvZGVOb2RlIiwicG9zaXRpb24iOnsieCI6NDUwLCJ5IjoxNTB9LCJkYXRhIjp7ImxhYmVsIjoiRGVjb2RlIEpXVCJ9fSx7ImlkIjoib3V0cHV0LTEiLCJ0eXBlIjoib3V0cHV0Tm9kZSIsInBvc2l0aW9uIjp7IngiOjc1MCwieSI6MTUwfSwiZGF0YSI6eyJsYWJlbCI6Ik91dHB1dCJ9fV0sImVkZ2VzIjpbeyJpZCI6ImUxLTIiLCJzb3VyY2UiOiJpbnB1dC0xIiwidGFyZ2V0Ijoiand0RGVjb2RlTm9kZS0xIn0seyJpZCI6ImUyLTMiLCJzb3VyY2UiOiJqd3REZWNvZGVOb2RlLTEiLCJ0YXJnZXQiOiJvdXRwdXQtMSJ9XX0=';
    window.location.reload();
  };

  return (
    <div className="w-full h-full flex flex-col font-sans bg-[#0A0A0B]">
      {/* Header */}
      <header className="h-16 bg-[#0A0A0B]/90 backdrop-blur-md border-b border-white/10 px-6 flex justify-between items-center shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">WebToolsEasy</h1>
            <p className="text-[10px] text-indigo-400 font-mono tracking-widest uppercase mt-[-2px]">Private Data Canvas</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={loadExample}
            className="text-sm text-gray-400 hover:text-white px-3 py-2 transition-colors"
          >
            Load Example
          </button>
          <button
            onClick={handleShare}
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-lg font-medium transition-all text-sm flex items-center gap-2"
          >
            {copied ? '✓ Link Copied' : '🔗 Share Configuration'}
          </button>
          <button
            onClick={() => runPipeline()}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg font-semibold transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] flex items-center gap-2 text-sm ml-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            Run Pipeline
          </button>
        </div>
      </header>
      
      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 relative" ref={reactFlowWrapper}>
          
          {nodes.length <= 2 && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10 opacity-40">
              <div className="text-center">
                <div className="w-24 h-24 border-2 border-dashed border-gray-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-400">Drag tools here</h2>
                <p className="text-gray-500 mt-2">Connect them to the input and output</p>
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
            >
              <Background color="#333" gap={20} size={1.5} />
              <Controls className="bg-gray-900 border-gray-800 fill-white" />
              <MiniMap 
                className="bg-gray-900/80 border border-gray-800 backdrop-blur-md" 
                maskColor="rgba(0,0,0,0.7)" 
                nodeColor="#4f46e5"
              />
            </ReactFlow>
          </ReactFlowProvider>
        </div>
      </div>
    </div>
  );
}
