import { create } from "zustand";
import { temporal } from "zundo";
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
import { getTransferCost } from "@/lib/archcost/dataTransferPricing";
import { trackEvent } from "@/lib/analytics";

export type InfraNode = Node<InfraNodeData>;

const DEFAULT_AUTOSAVE_KEY = "wte_arch_autosave";

function resolveAutosaveKey() {
  if (typeof window === "undefined") return DEFAULT_AUTOSAVE_KEY;
  const pane = new URLSearchParams(window.location.search).get("comparePane");
  return pane ? `${DEFAULT_AUTOSAVE_KEY}_${pane}` : DEFAULT_AUTOSAVE_KEY;
}

const AUTOSAVE_KEY = resolveAutosaveKey();

type ArchitectureState = {
  nodes: InfraNode[];
  edges: Edge[];
  selectedRegion: string;
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
  setRegion: (region: string) => void;
  loadTemplate: (nodes: InfraNode[], edges: Edge[]) => void;
  clearCanvas: () => void;
  duplicateNodes: (
    nodeIds: string[],
    offset?: { x: number; y: number },
  ) => void;
  updateEdgeTransfer: (
    edgeId: string,
    gbPerMonth: number,
    crossRegion?: boolean,
  ) => void;
  getUnconfiguredTransferEdgesCount: () => number;
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
      config: {
        instanceType: "t3.micro",
        count: 1,
        hoursPerMonth: 730,
        purchaseOption: "on-demand",
      },
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
      config: {
        instanceType: "t3.micro",
        count: 1,
        hoursPerMonth: 730,
        purchaseOption: "on-demand",
      },
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
      config: {
        instanceType: "db.t3.micro",
        storageGB: 20,
        multiAZ: true,
        purchaseOption: "on-demand",
      },
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

function buildTransferLabel(
  sourceNode: InfraNode | undefined,
  targetNode: InfraNode | undefined,
  gbPerMonth: number,
  transferConfigured: boolean,
  crossRegion: boolean,
): string | undefined {
  if (!sourceNode || !targetNode) return undefined;

  const effectiveCrossRegion =
    crossRegion || sourceNode.data.region !== targetNode.data.region;

  if (transferConfigured) {
    const configuredGb = Math.max(0, Number(gbPerMonth || 0));
    const monthlyCost = getTransferCost(
      sourceNode.data.service,
      targetNode.data.service,
      configuredGb,
      { crossRegion: effectiveCrossRegion },
    );
    return `$${monthlyCost.toFixed(2)}/mo (${configuredGb.toLocaleString()} GB)`;
  }

  const perGbCost = getTransferCost(
    sourceNode.data.service,
    targetNode.data.service,
    1,
    { crossRegion: effectiveCrossRegion },
  );
  if (perGbCost <= 0) return undefined;

  return `Potential ${perGbCost.toFixed(2)}/GB · click edge`;
}

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

export const useArchitectureStore = create<ArchitectureState>()(
  temporal(
    (set, get) => ({
      nodes: initialNodes.map(recalculateNodeCost),
      selectedRegion: initialNodes[0]?.data.region || "us-east-1",
      edges: initialEdges.map((edge) => {
        const sourceNode = initialNodes.find((node) => node.id === edge.source);
        const targetNode = initialNodes.find((node) => node.id === edge.target);
        const gbPerMonth = Number(edge.data?.gbPerMonth || 0);
        const transferConfigured = Boolean(edge.data?.transferConfigured);
        const crossRegion = Boolean(edge.data?.crossRegion);
        const label = buildTransferLabel(
          sourceNode,
          targetNode,
          gbPerMonth,
          transferConfigured,
          crossRegion,
        );

        if (!label) return edge;
        return { ...edge, label };
      }),

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
        const sourceNode = get().nodes.find(
          (node) => node.id === connection.source,
        );
        const targetNode = get().nodes.find(
          (node) => node.id === connection.target,
        );
        const label = buildTransferLabel(
          sourceNode,
          targetNode,
          0,
          false,
          false,
        );
        const updated = addEdge(
          {
            ...connection,
            animated: false,
            data: {
              gbPerMonth: 0,
              transferConfigured: false,
              crossRegion: false,
            },
            label,
          },
          get().edges,
        );
        set({ edges: updated });
        saveToStorage(get().nodes, updated);
      },

      addNode: (
        service: InfraNodeData["service"] | "Annotation",
        position: { x: number; y: number },
      ) => {
        const id = `${service}-${Date.now()}`;

        if (service === "Annotation") {
          const newNode: any = {
            id,
            type: "annotationNode",
            position,
            data: {
              text: "Double click to edit...",
              color: "yellow",
            },
          };
          const updated = [...get().nodes, newNode];
          set({ nodes: updated });
          saveToStorage(updated, get().edges);
          return;
        }
        // Default configs
        let config = {};
        if (service === "EC2")
          config = {
            instanceType: "t3.micro",
            count: 1,
            hoursPerMonth: 730,
            purchaseOption: "on-demand",
          };
        if (service === "RDS")
          config = {
            instanceType: "db.t3.micro",
            storageGB: 20,
            multiAZ: false,
            purchaseOption: "on-demand",
          };
        if (service === "S3")
          config = {
            storageGB: 100,
            readReqsMillions: 0,
            writeReqsMillions: 0,
          };
        if (service === "Lambda")
          config = { invocationsMillions: 1, memoryMB: 128, durationMs: 100 };
        if (service === "ALB") config = { hoursPerMonth: 730, lcuCount: 1 };
        if (service === "CloudFront") config = { dataTransferOutGB: 1000 };
        if (service === "ECS")
          config = { vcpu: 0.5, memoryGB: 1, taskCount: 2, hoursPerMonth: 730 };
        if (service === "EKS")
          config = {
            nodeCount: 3,
            instanceType: "t3.medium",
            clusterHours: 730,
          };
        if (service === "Lightsail") config = { plan: "10", instanceCount: 1 };
        if (service === "ElasticBeanstalk")
          config = {
            estimatedEc2Monthly: 75,
            estimatedRdsMonthly: 0,
            noAdditionalCharge: true,
          };
        if (service === "Batch")
          config = { vcpuHours: 500, jobType: "on-demand" };
        if (service === "DynamoDB")
          config = {
            readCapacityUnits: 100,
            writeCapacityUnits: 20,
            storageGB: 20,
            mode: "provisioned",
          };
        if (service === "ElastiCache")
          config = {
            nodeType: "cache.t3.micro",
            nodeCount: 1,
            engine: "redis",
            purchaseOption: "on-demand",
          };
        if (service === "DocumentDB")
          config = {
            instanceClass: "db.r5.large",
            instanceCount: 1,
            storageGB: 50,
          };
        if (service === "Neptune")
          config = {
            instanceClass: "db.r5.large",
            storageGB: 100,
            ioRequestsMillions: 100,
          };
        if (service === "AuroraServerlessV2")
          config = {
            minACU: 0.5,
            maxACU: 4,
            storageGB: 50,
            ioRequestsMillions: 20,
          };
        if (service === "Timestream")
          config = {
            memoryStoreGB: 5,
            magneticStoreGB: 100,
            writeRecordsMillions: 10,
          };
        if (service === "EFS")
          config = {
            storageClass: "standard",
            sizeGB: 200,
            throughputMode: "bursting",
          };
        if (service === "EBS")
          config = {
            volumeType: "gp3",
            sizeGB: 100,
            iops: 3000,
          };
        if (service === "Glacier")
          config = {
            storageGB: 1000,
            retrievalRequests: 100,
          };
        if (service === "FSx")
          config = {
            fileSystemType: "windows",
            storageCapacityGB: 1024,
            throughputMBps: 64,
          };
        if (service === "StorageGateway")
          config = {
            infoOnly: true,
          };
        if (service === "NLB")
          config = {
            hoursPerMonth: 730,
            lcuCount: 1,
          };
        if (service === "APIGatewayREST")
          config = {
            apiCallsMillions: 10,
            dataTransferGB: 100,
            cacheGBHours: 0,
          };
        if (service === "APIGatewayHTTP")
          config = {
            apiCallsMillions: 10,
          };
        if (service === "Route53")
          config = {
            hostedZones: 2,
            queriesMillions: 100,
            healthChecks: 2,
          };
        if (service === "NATGateway")
          config = {
            hoursPerMonth: 730,
            dataProcessedGB: 500,
          };
        if (service === "PrivateLink")
          config = {
            endpoints: 2,
            hoursPerMonth: 730,
            dataProcessedGB: 100,
          };
        if (service === "GlobalAccelerator")
          config = {
            hours: 730,
            dataTransferGB: 1000,
            transferTier: "standard",
          };
        if (service === "DataTransfer")
          config = {
            gbPerMonth: 1000,
            destination: "internet",
          };
        if (service === "SQS")
          config = {
            requestsMillions: 10,
            messageSizeKB: 32,
            fifo: false,
          };
        if (service === "SNS")
          config = {
            notificationsMillions: 10,
            protocol: "http",
          };
        if (service === "EventBridge")
          config = {
            eventsMillions: 10,
            eventBusType: "custom",
          };
        if (service === "KinesisDataStreams")
          config = {
            shardCount: 2,
            hoursPerMonth: 730,
            dataRetrievalGB: 100,
          };
        if (service === "KinesisFirehose")
          config = {
            dataIngestedGB: 500,
          };
        if (service === "MSK")
          config = {
            brokerType: "kafka.m5.large",
            brokerCount: 3,
          };
        if (service === "Bedrock")
          config = {
            model: "claude-3-5-sonnet",
            inputTokensMillions: 5,
            outputTokensMillions: 2,
          };
        if (service === "SageMaker")
          config = {
            instanceType: "ml.m5.large",
            hoursPerMonth: 730,
            endpointCount: 1,
          };
        if (service === "Textract")
          config = {
            pagesThousands: 10,
            feature: "basic",
          };
        if (service === "Rekognition")
          config = {
            imagesThousands: 100,
            videoMinutes: 0,
          };
        if (service === "Transcribe")
          config = {
            minutesPerMonth: 1000,
          };
        if (service === "Polly")
          config = {
            charactersMillions: 5,
            voiceType: "standard",
          };
        if (service === "CloudWatchMetrics")
          config = {
            customMetricsCount: 10,
            apiRequestsMillions: 5,
          };
        if (service === "CloudWatchLogs")
          config = {
            ingestionGB: 50,
            storageGB: 100,
            insightsQueriesGB: 10,
          };
        if (service === "CloudWatchAlarms")
          config = {
            alarmCount: 20,
          };
        if (service === "SecretsManager")
          config = {
            secretCount: 10,
            apiCallsPer10k: 20,
          };
        if (service === "KMS")
          config = {
            cmkCount: 5,
            apiRequestsPer10k: 50,
          };
        if (service === "CodeBuild")
          config = {
            buildMinutesPerMonth: 2000,
            computeType: "small",
          };
        if (service === "CodePipeline")
          config = {
            activePipelines: 3,
          };
        if (service === "XRay")
          config = {
            tracesMillions: 2,
          };
        if (service === "WAF")
          config = {
            webACLs: 1,
            rules: 10,
            requestsMillions: 100,
          };
        if (service === "ShieldStandard")
          config = {
            infoOnly: true,
          };
        if (service === "ShieldAdvanced")
          config = {
            enabled: true,
          };

        const newNode: InfraNode = {
          id,
          type: "infraNode",
          position,
          data: {
            label: `New ${service}`,
            service,
            region: get().selectedRegion || "us-east-1",
            config,
            costPerMonth: calculateNodeCost(
              service,
              config,
              get().selectedRegion || "us-east-1",
            ),
          },
        };

        const updated = [...get().nodes, newNode];
        set({ nodes: updated });
        saveToStorage(updated, get().edges);
        trackEvent("canvas_node_added", { service_type: service });
      },

      deleteNode: (nodeId: string) => {
        const updatedNodes = get().nodes.filter((n) => n.id !== nodeId);
        const updatedEdges = get().edges.filter(
          (e) => e.source !== nodeId && e.target !== nodeId,
        );
        set({ nodes: updatedNodes, edges: updatedEdges });
        saveToStorage(updatedNodes, updatedEdges);
      },

      updateNodeConfig: (
        nodeId: string,
        configUpdates: Record<string, any>,
      ) => {
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

      setRegion: (region: string) => {
        const updatedNodes = get().nodes.map((node) => {
          const updatedNode = {
            ...node,
            data: {
              ...node.data,
              region,
            },
          };
          return recalculateNodeCost(updatedNode);
        });
        const nodeMap = new Map(updatedNodes.map((node) => [node.id, node]));
        const updatedEdges = get().edges.map((edge) => {
          const sourceNode = nodeMap.get(edge.source);
          const targetNode = nodeMap.get(edge.target);
          const gbPerMonth = Number(edge.data?.gbPerMonth || 0);
          const transferConfigured = Boolean(edge.data?.transferConfigured);
          const crossRegion = Boolean(edge.data?.crossRegion);
          const label = buildTransferLabel(
            sourceNode,
            targetNode,
            gbPerMonth,
            transferConfigured,
            crossRegion,
          );
          if (!label) return edge;
          return { ...edge, label };
        });

        set({
          nodes: updatedNodes,
          edges: updatedEdges,
          selectedRegion: region,
        });
        saveToStorage(updatedNodes, updatedEdges);
      },

      loadTemplate: (nodes: InfraNode[], edges: Edge[]) => {
        const recalculated = nodes.map(recalculateNodeCost);
        const nodeMap = new Map(recalculated.map((node) => [node.id, node]));
        const edgesWithLabels = edges.map((edge) => {
          const sourceNode = nodeMap.get(edge.source);
          const targetNode = nodeMap.get(edge.target);
          const gbPerMonth = Number(edge.data?.gbPerMonth || 0);
          const transferConfigured = Boolean(edge.data?.transferConfigured);
          const crossRegion = Boolean(edge.data?.crossRegion);
          const label = buildTransferLabel(
            sourceNode,
            targetNode,
            gbPerMonth,
            transferConfigured,
            crossRegion,
          );

          if (!label) return edge;
          return { ...edge, label };
        });

        set({
          nodes: recalculated,
          edges: edgesWithLabels,
          selectedRegion: recalculated[0]?.data.region || "us-east-1",
        });
        saveToStorage(recalculated, edgesWithLabels);
      },

      clearCanvas: () => {
        set({ nodes: [], edges: [] });
        saveToStorage([], []);
      },

      duplicateNodes: (
        nodeIds: string[],
        offset: { x: number; y: number } = { x: 20, y: 20 },
      ) => {
        const state = get();
        const nodesToDuplicate = state.nodes.filter((n) =>
          nodeIds.includes(n.id),
        );
        const idMap = new Map<string, string>();

        const newNodes = nodesToDuplicate.map((node) => {
          const newId = `${node.data.service}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
          idMap.set(node.id, newId);

          return {
            ...node,
            id: newId,
            position: {
              x: node.position.x + offset.x,
              y: node.position.y + offset.y,
            },
            selected: false,
          };
        });

        // Duplicate edges between selected nodes
        const edgesToDuplicate = state.edges.filter(
          (e) => idMap.has(e.source) && idMap.has(e.target),
        );
        const newEdges = edgesToDuplicate.map((edge) => ({
          ...edge,
          id: `edge-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          source: idMap.get(edge.source)!,
          target: idMap.get(edge.target)!,
        }));

        const updatedNodes = [...state.nodes, ...newNodes];
        const updatedEdges = [...state.edges, ...newEdges];
        set({ nodes: updatedNodes, edges: updatedEdges });
        saveToStorage(updatedNodes, updatedEdges);
      },

      updateEdgeTransfer: (
        edgeId: string,
        gbPerMonth: number,
        crossRegion = false,
      ) => {
        const normalizedGb = Math.max(0, gbPerMonth || 0);
        const nodeMap = new Map(get().nodes.map((node) => [node.id, node]));
        const updatedEdges = get().edges.map((edge) => {
          if (edge.id !== edgeId) return edge;

          const sourceNode = nodeMap.get(edge.source);
          const targetNode = nodeMap.get(edge.target);
          const label = buildTransferLabel(
            sourceNode,
            targetNode,
            normalizedGb,
            true,
            crossRegion,
          );

          return {
            ...edge,
            data: {
              ...(edge.data || {}),
              gbPerMonth: normalizedGb,
              transferConfigured: true,
              crossRegion,
            },
            label,
          };
        });

        set({ edges: updatedEdges });
        saveToStorage(get().nodes, updatedEdges);
      },

      getUnconfiguredTransferEdgesCount: () => {
        const state = get();
        const nodeMap = new Map(state.nodes.map((node) => [node.id, node]));

        return state.edges.filter((edge) => {
          if (edge.data?.transferConfigured) return false;
          const sourceNode = nodeMap.get(edge.source);
          const targetNode = nodeMap.get(edge.target);
          if (!sourceNode || !targetNode) return false;

          const potentialCost = getTransferCost(
            sourceNode.data.service,
            targetNode.data.service,
            1,
            {
              crossRegion: sourceNode.data.region !== targetNode.data.region,
            },
          );
          return potentialCost > 0;
        }).length;
      },

      getTotalCost: () => {
        const nodeCost = get().nodes.reduce(
          (total, node) => total + (node.data.costPerMonth || 0),
          0,
        );

        const nodeMap = new Map(get().nodes.map((node) => [node.id, node]));
        const edgeCost = get().edges.reduce((total, edge) => {
          if (!edge.data?.transferConfigured) return total;
          const sourceNode = nodeMap.get(edge.source);
          const targetNode = nodeMap.get(edge.target);
          if (!sourceNode || !targetNode) return total;

          const gbPerMonth = Number(edge.data.gbPerMonth || 0);
          if (gbPerMonth <= 0) return total;

          const transferCost = getTransferCost(
            sourceNode.data.service,
            targetNode.data.service,
            gbPerMonth,
            {
              crossRegion: Boolean(
                edge.data.crossRegion ||
                sourceNode.data.region !== targetNode.data.region,
              ),
            },
          );
          return total + transferCost;
        }, 0);

        return nodeCost + edgeCost;
      },
    }),
    {
      // Undo/redo config
      limit: 50,
      // Only track nodes and edges changes, not function references
      partialize: (state) => ({
        nodes: state.nodes,
        edges: state.edges,
      }),
      // Don't track high-frequency position changes (drag)
      equality: (pastState, currentState) =>
        JSON.stringify(pastState) === JSON.stringify(currentState),
    },
  ),
);
