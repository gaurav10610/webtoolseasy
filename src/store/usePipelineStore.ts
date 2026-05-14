import { create } from 'zustand';
import {
  Connection, Edge, EdgeChange, Node, NodeChange, addEdge,
  OnNodesChange, OnEdgesChange, OnConnect,
  applyNodeChanges, applyEdgeChanges,
} from '@xyflow/react';
import { nodeRegistry } from '@/components/canvas/nodeRegistry';

export type NodeData = {
  label: string;
  value?: string;
  output?: string;
  error?: string;
  isProcessing?: boolean;
  fileName?: string;
  [key: string]: any;
};

export type PipelineNode = Node<NodeData>;

const AUTOSAVE_KEY = 'wte_canvas_autosave';

type PipelineState = {
  nodes: PipelineNode[];
  edges: Edge[];
  onNodesChange: OnNodesChange<PipelineNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: (type: string, position: { x: number; y: number }) => void;
  updateNodeData: (nodeId: string, data: Partial<NodeData>) => void;
  runPipeline: () => Promise<void>;
  exportPipeline: () => string;
  importPipeline: (base64Config: string) => void;
  loadTemplate: (nodes: PipelineNode[], edges: Edge[]) => void;
};

const defaultNodes: PipelineNode[] = [
  { id: 'input-1', type: 'inputNode', position: { x: 80, y: 120 }, data: { label: 'Input Text', value: '' } },
  { id: 'transform-1', type: 'jsonFormatNode', position: { x: 400, y: 120 }, data: { label: 'Format JSON' } },
  { id: 'output-1', type: 'outputNode', position: { x: 720, y: 120 }, data: { label: 'Output' } },
];
const defaultEdges: Edge[] = [
  { id: 'e1-2', source: 'input-1', target: 'transform-1', animated: false },
  { id: 'e2-3', source: 'transform-1', target: 'output-1', animated: false },
];

function loadFromStorage(): { nodes: PipelineNode[]; edges: Edge[] } | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(AUTOSAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.nodes && parsed.edges) return parsed;
  } catch { /* ignore */ }
  return null;
}

function saveToStorage(nodes: PipelineNode[], edges: Edge[]) {
  if (typeof window === 'undefined') return;
  try {
    // Strip sensitive runtime data before saving
    const safeNodes = nodes.map(n => ({
      ...n,
      data: {
        ...n.data,
        output: undefined,
        error: undefined,
        isProcessing: undefined,
        // Keep value (user's input) and any config fields - this is local only
      },
    }));
    localStorage.setItem(AUTOSAVE_KEY, JSON.stringify({ nodes: safeNodes, edges }));
  } catch { /* ignore */ }
}

const stored = loadFromStorage();
const initialNodes = stored?.nodes ?? defaultNodes;
const initialEdges = stored?.edges ?? defaultEdges;

export const usePipelineStore = create<PipelineState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,

  onNodesChange: (changes: NodeChange<PipelineNode>[]) => {
    const updated = applyNodeChanges(changes, get().nodes);
    set({ nodes: updated });
    saveToStorage(updated, get().edges);
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    const updated = applyEdgeChanges(changes, get().edges);
    set({ edges: updated });
    saveToStorage(get().nodes, updated);
  },

  onConnect: (connection: Connection) => {
    const updated = addEdge({ ...connection, animated: false }, get().edges);
    set({ edges: updated });
    saveToStorage(get().nodes, updated);
  },

  addNode: (type: string, position: { x: number; y: number }) => {
    const id = `${type}-${Date.now()}`;
    const registryEntry = nodeRegistry[type] || { label: type };
    // Pre-populate configField defaults if any
    const extraData: Record<string, any> = {};
    if (registryEntry.configFields) {
      for (const f of registryEntry.configFields) {
        if (f.options?.[0]) extraData[f.key] = f.options[0].value;
      }
    }
    const updated = [...get().nodes, { id, type, position, data: { label: registryEntry.label, ...extraData } }];
    set({ nodes: updated });
    saveToStorage(updated, get().edges);
  },

  updateNodeData: (nodeId: string, data: Partial<NodeData>) => {
    const updated = get().nodes.map((node) =>
      node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
    );
    set({ nodes: updated });
    // Debounce autosave on rapid typing
    saveToStorage(updated, get().edges);
  },

  runPipeline: async () => {
    const { nodes, edges, updateNodeData } = get();

    // Find start node (inputNode or fileInputNode)
    const inputNode = nodes.find(n => n.type === 'inputNode' || n.type === 'fileInputNode');
    if (!inputNode) return;

    // Clear all state and set edges to not-animated
    for (const node of nodes) {
      updateNodeData(node.id, { error: undefined, output: undefined, isProcessing: false });
    }

    // Animate all edges during run
    set(state => ({
      edges: state.edges.map(e => ({ ...e, animated: true })),
    }));

    let currentNodeId = inputNode.id;
    let currentValue = inputNode.data.value || '';

    while (currentNodeId) {
      const node = nodes.find(n => n.id === currentNodeId);
      if (!node) break;

      updateNodeData(currentNodeId, { isProcessing: true });
      await new Promise(r => setTimeout(r, 50)); // small tick for visual feedback

      try {
        const registryEntry = nodeRegistry[node.type];

        if (registryEntry?.transform) {
          currentValue = await registryEntry.transform(currentValue, node.data);
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

    // Stop animations after run
    setTimeout(() => {
      set(state => ({
        edges: state.edges.map(e => ({ ...e, animated: false })),
      }));
    }, 1500);
  },

  exportPipeline: () => {
    const { nodes, edges } = get();
    // Strip values and output when sharing — only share structure
    const safeNodes = nodes.map(n => ({
      ...n,
      data: Object.fromEntries(
        Object.entries(n.data).filter(([k]) => !['value', 'output', 'error', 'isProcessing', 'fileName'].includes(k))
      ),
    }));
    return btoa(encodeURIComponent(JSON.stringify({ nodes: safeNodes, edges })));
  },

  importPipeline: (base64Config: string) => {
    try {
      const decoded = decodeURIComponent(atob(base64Config));
      const config = JSON.parse(decoded);
      if (config.nodes && config.edges) {
        set({ nodes: config.nodes, edges: config.edges });
        saveToStorage(config.nodes, config.edges);
      }
    } catch (err) {
      console.error('Failed to import pipeline', err);
    }
  },

  loadTemplate: (nodes: PipelineNode[], edges: Edge[]) => {
    set({ nodes, edges });
    saveToStorage(nodes, edges);
  },
}));
