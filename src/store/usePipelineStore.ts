import { create } from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react';
import { nodeRegistry } from '@/components/canvas/nodeRegistry';

export type NodeData = {
  label: string;
  value?: string;
  output?: string;
  error?: string;
  isProcessing?: boolean;
  [key: string]: any;
};

export type PipelineNode = Node<NodeData>;

type PipelineState = {
  nodes: PipelineNode[];
  edges: Edge[];
  onNodesChange: OnNodesChange<PipelineNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: (type: string, position: { x: number, y: number }) => void;
  updateNodeData: (nodeId: string, data: Partial<NodeData>) => void;
  runPipeline: () => Promise<void>;
  exportPipeline: () => string;
  importPipeline: (base64Config: string) => void;
  loadTemplate: (nodes: PipelineNode[], edges: Edge[]) => void;
};

const initialNodes: PipelineNode[] = [
  {
    id: 'input-1',
    type: 'inputNode',
    position: { x: 50, y: 100 },
    data: { label: 'Input text', value: '{"hello": "world"}' },
  },
  {
    id: 'transform-1',
    type: 'jsonFormatNode',
    position: { x: 350, y: 100 },
    data: { label: 'Format JSON' },
  },
  {
    id: 'output-1',
    type: 'outputNode',
    position: { x: 650, y: 100 },
    data: { label: 'Output' },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: 'input-1', target: 'transform-1' },
  { id: 'e2-3', source: 'transform-1', target: 'output-1' },
];

export const usePipelineStore = create<PipelineState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  onNodesChange: (changes: NodeChange<PipelineNode>[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  addNode: (type: string, position: { x: number, y: number }) => {
    const id = `${type}-${Date.now()}`;
    const registryEntry = nodeRegistry[type] || { label: type };
    set({
      nodes: [...get().nodes, {
        id,
        type,
        position,
        data: { label: registryEntry.label },
      }]
    });
  },
  updateNodeData: (nodeId: string, data: Partial<NodeData>) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, ...data } };
        }
        return node;
      }),
    });
  },
  runPipeline: async () => {
    const { nodes, edges, updateNodeData } = get();
    
    const inputNode = nodes.find(n => n.type === 'inputNode');
    if (!inputNode) return;

    let currentNodeId = inputNode.id;
    let currentValue = inputNode.data.value || '';

    for (const node of nodes) {
      updateNodeData(node.id, { error: undefined, output: undefined, isProcessing: false });
    }

    while (currentNodeId) {
      const node = nodes.find(n => n.id === currentNodeId);
      if (!node) break;

      updateNodeData(currentNodeId, { isProcessing: true });
      
      try {
        const registryEntry = nodeRegistry[node.type];
        
        if (registryEntry && registryEntry.transform) {
           currentValue = await registryEntry.transform(currentValue);
           updateNodeData(currentNodeId, { output: currentValue, isProcessing: false });
        } else if (node.type === 'outputNode') {
           updateNodeData(currentNodeId, { value: currentValue, output: currentValue, isProcessing: false });
           break; 
        } else {
           updateNodeData(currentNodeId, { output: currentValue, isProcessing: false });
        }
        
        const outgoingEdge = edges.find(e => e.source === currentNodeId);
        currentNodeId = outgoingEdge ? outgoingEdge.target : '';

      } catch (err: any) {
        updateNodeData(currentNodeId, { error: err.message || 'Execution error', isProcessing: false });
        break; 
      }
    }
  },
  exportPipeline: () => {
    const { nodes, edges } = get();
    // Strip sensitive values from the export to protect privacy
    const safeNodes = nodes.map(n => ({
      ...n,
      data: { label: n.data.label } // Only keep label, discard input value, output, and errors
    }));
    const config = JSON.stringify({ nodes: safeNodes, edges });
    return btoa(encodeURIComponent(config));
  },
  importPipeline: (base64Config: string) => {
    try {
      const decoded = decodeURIComponent(atob(base64Config));
      const config = JSON.parse(decoded);
      if (config.nodes && config.edges) {
        set({ nodes: config.nodes, edges: config.edges });
      }
    } catch (err) {
      console.error('Failed to import pipeline', err);
    }
  },
  loadTemplate: (nodes: PipelineNode[], edges: Edge[]) => {
    set({ nodes, edges });
  }
}));
