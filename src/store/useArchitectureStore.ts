import { create } from "zustand";
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
} from "@xyflow/react";
import { InfraNodeData, calculateNodeCost } from "@/data/pricingEngine";

export type InfraNode = Node<InfraNodeData>;

const AUTOSAVE_KEY = "wte_arch_autosave";

type ArchitectureState = {
  nodes: InfraNode[];
  edges: Edge[];
  onNodesChange: OnNodesChange<InfraNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: (
    service: InfraNodeData["service"],
    position: { x: number; y: number },
  ) => void;
  deleteNode: (nodeId: string) => void;
  updateNodeConfig: (
    nodeId: string,
    configUpdates: Record<string, any>,
  ) => void;
  loadTemplate: (nodes: InfraNode[], edges: Edge[]) => void;
  getTotalCost: () => number;
};

const defaultNodes: InfraNode[] = [
  {
    id: "alb-1",
    type: "infraNode",
    position: { x: 400, y: 100 },
    data: {
      label: "Application Load Balancer",
      service: "ALB",
      region: "us-east-1",
      config: { hoursPerMonth: 730, lcuCount: 1 },
      costPerMonth: 22.26,
    },
  },
  {
    id: "ec2-1",
    type: "infraNode",
    position: { x: 300, y: 300 },
    data: {
      label: "Web Server 1",
      service: "EC2",
      region: "us-east-1",
      config: { instanceType: "t3.micro", count: 1, hoursPerMonth: 730 },
      costPerMonth: 7.59,
    },
  },
  {
    id: "ec2-2",
    type: "infraNode",
    position: { x: 500, y: 300 },
    data: {
      label: "Web Server 2",
      service: "EC2",
      region: "us-east-1",
      config: { instanceType: "t3.micro", count: 1, hoursPerMonth: 730 },
      costPerMonth: 7.59,
    },
  },
  {
    id: "rds-1",
    type: "infraNode",
    position: { x: 400, y: 500 },
    data: {
      label: "Primary Database",
      service: "RDS",
      region: "us-east-1",
      config: { instanceType: "db.t3.micro", storageGB: 20, multiAZ: true },
      costPerMonth: 27.12,
    },
  },
];

const defaultEdges: Edge[] = [
  { id: "e1", source: "alb-1", target: "ec2-1", animated: true },
  { id: "e2", source: "alb-1", target: "ec2-2", animated: true },
  { id: "e3", source: "ec2-1", target: "rds-1" },
  { id: "e4", source: "ec2-2", target: "rds-1" },
];

function loadFromStorage(): { nodes: InfraNode[]; edges: Edge[] } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTOSAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.nodes && parsed.edges) return parsed;
  } catch {
    /* ignore */
  }
  return null;
}

function saveToStorage(nodes: InfraNode[], edges: Edge[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(AUTOSAVE_KEY, JSON.stringify({ nodes, edges }));
  } catch {
    /* ignore */
  }
}

const stored = loadFromStorage();
const initialNodes = stored?.nodes ?? defaultNodes;
const initialEdges = stored?.edges ?? defaultEdges;

function recalculateNodeCost(node: InfraNode): InfraNode {
  return {
    ...node,
    data: {
      ...node.data,
      costPerMonth: calculateNodeCost(
        node.data.service,
        node.data.config,
        node.data.region,
      ),
    },
  };
}

export const useArchitectureStore = create<ArchitectureState>((set, get) => ({
  nodes: initialNodes.map(recalculateNodeCost),
  edges: initialEdges,

  onNodesChange: (changes: NodeChange<InfraNode>[]) => {
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

  addNode: (
    service: InfraNodeData["service"],
    position: { x: number; y: number },
  ) => {
    const id = `${service}-${Date.now()}`;
    // Default configs
    let config = {};
    if (service === "EC2")
      config = { instanceType: "t3.micro", count: 1, hoursPerMonth: 730 };
    if (service === "RDS")
      config = { instanceType: "db.t3.micro", storageGB: 20, multiAZ: false };
    if (service === "S3")
      config = { storageGB: 100, readReqsMillions: 0, writeReqsMillions: 0 };
    if (service === "Lambda")
      config = { invocationsMillions: 1, memoryMB: 128, durationMs: 100 };
    if (service === "ALB") config = { hoursPerMonth: 730, lcuCount: 1 };
    if (service === "CloudFront") config = { dataTransferOutGB: 1000 };

    const newNode: InfraNode = {
      id,
      type: "infraNode",
      position,
      data: {
        label: `New ${service}`,
        service,
        region: "us-east-1",
        config,
        costPerMonth: calculateNodeCost(service, config, "us-east-1"),
      },
    };

    const updated = [...get().nodes, newNode];
    set({ nodes: updated });
    saveToStorage(updated, get().edges);
  },

  deleteNode: (nodeId: string) => {
    const updatedNodes = get().nodes.filter((n) => n.id !== nodeId);
    const updatedEdges = get().edges.filter(
      (e) => e.source !== nodeId && e.target !== nodeId,
    );
    set({ nodes: updatedNodes, edges: updatedEdges });
    saveToStorage(updatedNodes, updatedEdges);
  },

  updateNodeConfig: (nodeId: string, configUpdates: Record<string, any>) => {
    const updated = get().nodes.map((node) => {
      if (node.id !== nodeId) return node;
      const newConfig = { ...node.data.config, ...configUpdates };
      return {
        ...node,
        data: {
          ...node.data,
          config: newConfig,
          costPerMonth: calculateNodeCost(
            node.data.service,
            newConfig,
            node.data.region,
          ),
        },
      };
    });
    set({ nodes: updated });
    saveToStorage(updated, get().edges);
  },

  loadTemplate: (nodes: InfraNode[], edges: Edge[]) => {
    const recalculated = nodes.map(recalculateNodeCost);
    set({ nodes: recalculated, edges });
    saveToStorage(recalculated, edges);
  },

  getTotalCost: () => {
    return get().nodes.reduce(
      (total, node) => total + (node.data.costPerMonth || 0),
      0,
    );
  },
}));
