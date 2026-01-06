"use client";

import React, { useCallback, useState, useMemo } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  addEdge,
  Handle,
  Position,
  useEdgesState,
  useNodesState,
  Panel,
  type Node,
  type Edge,
  type Connection,
  type NodeProps,
} from "reactflow";
import "reactflow/dist/style.css";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { H3, BodySmall } from "@/components/ui/typography";

type AgentType = "coordinator" | "worker" | "specialist" | "gateway";

type AgentNodeData = {
  label: string;
  type: AgentType;
  status: "active" | "idle" | "processing";
  messageCount: number;
  connections: number;
  description?: string;
};

const AGENT_TYPE_CONFIG: Record<
  AgentType,
  { color: string; borderColor: string; icon: string }
> = {
  coordinator: {
    color: "bg-purple-50",
    borderColor: "border-purple-300",
    icon: "👑",
  },
  worker: {
    color: "bg-blue-50",
    borderColor: "border-blue-300",
    icon: "⚙️",
  },
  specialist: {
    color: "bg-emerald-50",
    borderColor: "border-emerald-300",
    icon: "🔬",
  },
  gateway: {
    color: "bg-amber-50",
    borderColor: "border-amber-300",
    icon: "🚪",
  },
};

const INITIAL_NODES: Node<AgentNodeData>[] = [
  {
    id: "gateway-1",
    type: "swarm-agent",
    position: { x: 400, y: 50 },
    data: {
      label: "API Gateway",
      type: "gateway",
      status: "active",
      messageCount: 1247,
      connections: 3,
      description: "Entry point for all external requests",
    },
  },
  {
    id: "coordinator-1",
    type: "swarm-agent",
    position: { x: 200, y: 200 },
    data: {
      label: "Task Coordinator",
      type: "coordinator",
      status: "active",
      messageCount: 892,
      connections: 5,
      description: "Orchestrates task distribution across workers",
    },
  },
  {
    id: "worker-1",
    type: "swarm-agent",
    position: { x: 100, y: 400 },
    data: {
      label: "Research Worker",
      type: "worker",
      status: "processing",
      messageCount: 456,
      connections: 2,
      description: "Handles research and information gathering tasks",
    },
  },
  {
    id: "worker-2",
    type: "swarm-agent",
    position: { x: 300, y: 400 },
    data: {
      label: "Analysis Worker",
      type: "worker",
      status: "active",
      messageCount: 523,
      connections: 3,
      description: "Processes and analyzes collected data",
    },
  },
  {
    id: "specialist-1",
    type: "swarm-agent",
    position: { x: 50, y: 600 },
    data: {
      label: "LLM Specialist",
      type: "specialist",
      status: "active",
      messageCount: 678,
      connections: 2,
      description: "Specialized agent for LLM interactions",
    },
  },
  {
    id: "specialist-2",
    type: "swarm-agent",
    position: { x: 250, y: 600 },
    data: {
      label: "Vector DB Specialist",
      type: "specialist",
      status: "idle",
      messageCount: 234,
      connections: 1,
      description: "Manages vector search and embeddings",
    },
  },
  {
    id: "coordinator-2",
    type: "swarm-agent",
    position: { x: 600, y: 200 },
    data: {
      label: "Response Coordinator",
      type: "coordinator",
      status: "active",
      messageCount: 567,
      connections: 4,
      description: "Coordinates final response assembly",
    },
  },
  {
    id: "worker-3",
    type: "swarm-agent",
    position: { x: 500, y: 400 },
    data: {
      label: "Format Worker",
      type: "worker",
      status: "active",
      messageCount: 389,
      connections: 2,
      description: "Formats and structures output responses",
    },
  },
  {
    id: "specialist-3",
    type: "swarm-agent",
    position: { x: 700, y: 400 },
    data: {
      label: "Validation Specialist",
      type: "specialist",
      status: "processing",
      messageCount: 445,
      connections: 2,
      description: "Validates output quality and safety",
    },
  },
];

const INITIAL_EDGES: Edge[] = [
  {
    id: "e-gateway-coord1",
    source: "gateway-1",
    target: "coordinator-1",
    type: "smoothstep",
    animated: true,
    style: { stroke: "var(--brand-blue)", strokeWidth: 2 },
    label: "1247 msgs",
  },
  {
    id: "e-gateway-coord2",
    source: "gateway-1",
    target: "coordinator-2",
    type: "smoothstep",
    animated: true,
    style: { stroke: "var(--brand-blue)", strokeWidth: 2 },
    label: "892 msgs",
  },
  {
    id: "e-coord1-worker1",
    source: "coordinator-1",
    target: "worker-1",
    type: "smoothstep",
    animated: true,
    style: { stroke: "var(--brand-blue)", strokeWidth: 2 },
    label: "456 msgs",
  },
  {
    id: "e-coord1-worker2",
    source: "coordinator-1",
    target: "worker-2",
    type: "smoothstep",
    animated: true,
    style: { stroke: "var(--brand-blue)", strokeWidth: 2 },
    label: "523 msgs",
  },
  {
    id: "e-worker1-spec1",
    source: "worker-1",
    target: "specialist-1",
    type: "smoothstep",
    animated: true,
    style: { stroke: "var(--brand-blue)", strokeWidth: 2 },
    label: "234 msgs",
  },
  {
    id: "e-worker2-spec2",
    source: "worker-2",
    target: "specialist-2",
    type: "smoothstep",
    animated: true,
    style: { stroke: "var(--brand-blue)", strokeWidth: 2 },
    label: "189 msgs",
  },
  {
    id: "e-coord2-worker3",
    source: "coordinator-2",
    target: "worker-3",
    type: "smoothstep",
    animated: true,
    style: { stroke: "var(--brand-blue)", strokeWidth: 2 },
    label: "389 msgs",
  },
  {
    id: "e-worker3-spec3",
    source: "worker-3",
    target: "specialist-3",
    type: "smoothstep",
    animated: true,
    style: { stroke: "var(--brand-blue)", strokeWidth: 2 },
    label: "445 msgs",
  },
  {
    id: "e-coord1-coord2",
    source: "coordinator-1",
    target: "coordinator-2",
    type: "smoothstep",
    animated: true,
    style: { stroke: "var(--brand-blue)", strokeWidth: 3 },
    label: "567 msgs",
  },
  {
    id: "e-worker2-worker3",
    source: "worker-2",
    target: "worker-3",
    type: "smoothstep",
    animated: true,
    style: { stroke: "var(--brand-blue)", strokeWidth: 2 },
    label: "312 msgs",
  },
];

// Custom agent node component
function SwarmAgentNode({ data, selected }: NodeProps<AgentNodeData>) {
  const config = AGENT_TYPE_CONFIG[data.type];
  const statusColors = {
    active: "bg-green-500",
    processing: "bg-yellow-500",
    idle: "bg-[var(--brand-muted)]",
  };

  return (
    <div
      className={`min-w-[180px] rounded-sm border-2 ${config.borderColor} ${config.color} ${
        selected ? "ring-2 ring-offset-2 ring-offset-[var(--background)] ring-purple-500" : ""
      } bg-[var(--background)] px-4 py-3 shadow-sm transition-all duration-200 hover:shadow-md`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{config.icon}</span>
          <span className="truncate text-sm font-medium tracking-tight text-[var(--foreground)]">
            {data.label}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <div
            className={`h-2 w-2 rounded-full ${statusColors[data.status]}`}
            title={data.status}
          />
        </div>
      </div>

      <div className="mb-2 flex items-center gap-2">
        <span className="rounded-sm border border-[var(--brand-border-subtle)] bg-[var(--background)] px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-[var(--brand-muted)]">
          {data.type}
        </span>
      </div>

      {data.description && (
        <p className="mb-2 text-xs font-light leading-relaxed text-[var(--brand-muted)]">
          {data.description}
        </p>
      )}

      <div className="grid grid-cols-2 gap-2 border-t border-[var(--brand-border-subtle)] pt-2">
        <div>
          <div className="text-[9px] font-mono uppercase tracking-widest text-[var(--brand-muted)]">
            Messages
          </div>
          <div className="text-sm font-medium text-[var(--foreground)]">
            {data.messageCount.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-[9px] font-mono uppercase tracking-widest text-[var(--brand-muted)]">
            Links
          </div>
          <div className="text-sm font-medium text-[var(--foreground)]">
            {data.connections}
          </div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        className="h-3! w-3! bg-purple-500! border-2! border-white!"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="h-3! w-3! bg-blue-500! border-2! border-white!"
      />
      <Handle
        type="target"
        position={Position.Top}
        className="h-3! w-3! bg-purple-500! border-2! border-white!"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="h-3! w-3! bg-blue-500! border-2! border-white!"
      />
    </div>
  );
}

const nodeTypes = { "swarm-agent": SwarmAgentNode };

export default function SwarmNetworkPage() {
  const [nodes, setNodes, onNodesChange] =
    useNodesState<AgentNodeData>(INITIAL_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(INITIAL_EDGES);
  const [selectedNode, setSelectedNode] = useState<Node<AgentNodeData> | null>(
    null,
  );

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node<AgentNodeData>) => {
      setSelectedNode(node);
    },
    [],
  );

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            type: "smoothstep",
            animated: true,
            style: { stroke: "var(--brand-blue)", strokeWidth: 2 },
          },
          eds,
        ),
      );
    },
    [setEdges],
  );

  // Calculate network statistics
  const networkStats = useMemo(() => {
    const agentTypes = nodes.reduce(
      (acc, node) => {
        acc[node.data.type] = (acc[node.data.type] || 0) + 1;
        return acc;
      },
      {} as Record<AgentType, number>,
    );

    const totalMessages = nodes.reduce(
      (sum, node) => sum + node.data.messageCount,
      0,
    );

    const activeAgents = nodes.filter(
      (node) => node.data.status === "active",
    ).length;

    return {
      totalAgents: nodes.length,
      totalConnections: edges.length,
      totalMessages,
      activeAgents,
      agentTypes,
    };
  }, [nodes, edges]);

  return (
    <section className="relative z-10 bg-[var(--background)] py-16 sm:py-24">
      <Container>
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-[var(--brand-border-subtle)] pb-6 sm:mb-16 sm:gap-6 sm:pb-8 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="01 / Swarm Network"
            title="Multi-agent network topology visualization."
            description={
              <>
                Visualize the complete network of agents, their connections,
                and communication patterns. Understand how agents collaborate,
                delegate tasks, and form dynamic swarms.
              </>
            }
          />
        </div>

        {/* Stats Cards */}
        <div className="mb-6 grid grid-cols-2 gap-px border border-[var(--brand-border-subtle)] bg-[var(--brand-border-subtle)] sm:grid-cols-4">
          <div className="bg-[var(--background)] p-4 sm:p-6">
            <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-[var(--brand-muted)] sm:text-[10px]">
              Total Agents
            </div>
            <div className="text-xl font-medium tracking-tighter text-[var(--foreground)] sm:text-2xl md:text-3xl">
              {networkStats.totalAgents}
            </div>
          </div>
          <div className="bg-[var(--background)] p-4 sm:p-6">
            <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-[var(--brand-muted)] sm:text-[10px]">
              Connections
            </div>
            <div className="text-xl font-medium tracking-tighter text-[var(--foreground)] sm:text-2xl md:text-3xl">
              {networkStats.totalConnections}
            </div>
          </div>
          <div className="bg-[var(--background)] p-4 sm:p-6">
            <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-[var(--brand-muted)] sm:text-[10px]">
              Total Messages
            </div>
            <div className="text-xl font-medium tracking-tighter text-[var(--foreground)] sm:text-2xl md:text-3xl">
              {networkStats.totalMessages.toLocaleString()}
            </div>
          </div>
          <div className="bg-[var(--background)] p-4 sm:p-6">
            <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-[var(--brand-muted)] sm:text-[10px]">
              Active Agents
            </div>
            <div className="text-xl font-medium tracking-tighter text-[var(--foreground)] sm:text-2xl md:text-3xl">
              {networkStats.activeAgents}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mb-6 border border-[var(--brand-border-subtle)] bg-[var(--background)] px-4 py-3 sm:px-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--brand-muted)]">
              Agent Types
            </span>
            {Object.entries(AGENT_TYPE_CONFIG).map(([type, config]) => (
              <div key={type} className="flex items-center gap-2">
                <span>{config.icon}</span>
                <span className="text-xs capitalize text-[var(--foreground)]">
                  {type}
                </span>
                <div
                  className={`h-3 w-3 rounded-sm border ${config.borderColor} ${config.color}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Network Canvas */}
        <div className="border border-[var(--brand-border-subtle)] bg-[var(--background)]">
          <div className="border-b border-[var(--brand-border-subtle)] bg-[var(--brand-surface-soft)] px-4 py-3 sm:px-6">
            <div className="flex items-center justify-between">
              <BodySmall className="font-mono text-[10px] uppercase tracking-widest text-[var(--brand-muted)]">
                Network Topology
              </BodySmall>
              <BodySmall className="text-[var(--brand-muted)]">
                Drag nodes • Click to inspect • Connect handles
              </BodySmall>
            </div>
          </div>
          <div className="relative h-[600px] sm:h-[700px]">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              onPaneClick={onPaneClick}
              nodeTypes={nodeTypes}
              fitView
              fitViewOptions={{ padding: 0.3 }}
              nodesDraggable
              nodesConnectable
              elementsSelectable
              deleteKeyCode="Delete"
              multiSelectionKeyCode="Shift"
            >
              <Background
                variant={BackgroundVariant.Dots}
                gap={16}
                size={1}
                color="var(--brand-grid-line)"
              />
              <Controls className="rounded-sm border border-[var(--brand-border-subtle)] bg-[var(--background)] shadow-sm" />
              <Panel
                position="bottom-right"
                className="!bottom-4 !right-4 flex flex-col items-end gap-1"
              >
                <MiniMap
                  className="rounded-sm border border-[var(--brand-border-subtle)] bg-[var(--foreground)] shadow-sm"
                  style={{
                    backgroundColor: "var(--foreground)",
                  }}
                  nodeColor={(node: Node<AgentNodeData>) => {
                    const config = AGENT_TYPE_CONFIG[node.data?.type || "worker"];
                    const colorMap: Record<string, string> = {
                      "bg-purple-50": "#8b5cf6",
                      "bg-blue-50": "#3b82f6",
                      "bg-emerald-50": "#10b981",
                      "bg-amber-50": "#f59e0b",
                    };
                    return colorMap[config.color] || "#6b7280";
                  }}
                  maskColor="rgba(0, 0, 0, 0.1)"
                />
                <div className="rounded-sm border border-[var(--brand-border-subtle)] bg-[var(--brand-surface-soft)] px-2 py-1">
                  <span className="font-mono text-[9px] uppercase tracking-wide text-[var(--foreground)]">
                    React Flow
                  </span>
                </div>
              </Panel>

              <Panel
                position="top-right"
                className="m-4 rounded-sm border border-[var(--brand-border-subtle)] bg-[var(--background)] p-4 shadow-sm"
              >
                <div className="space-y-2 text-xs">
                  <div className="mb-2 font-medium tracking-tight text-[var(--foreground)]">
                    Network Info
                  </div>
                  <div className="font-light text-[var(--brand-muted)]">
                    • Click agents to inspect details
                  </div>
                  <div className="font-light text-[var(--brand-muted)]">
                    • Drag nodes to reposition
                  </div>
                  <div className="font-light text-[var(--brand-muted)]">
                    • Connect handles to add links
                  </div>
                  <div className="font-light text-[var(--brand-muted)]">
                    • Select and press Delete to remove
                  </div>
                </div>
              </Panel>
            </ReactFlow>
          </div>
        </div>

        {/* Agent Details Panel */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {selectedNode ? (
            <div className="md:col-span-2 border border-[var(--brand-border-subtle)] bg-[var(--background)] p-6">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[var(--brand-muted)]">
                    Agent Details
                  </div>
                  <H3 className="mb-1">{selectedNode.data.label}</H3>
                  <BodySmall className="text-[var(--brand-muted)]">
                    {selectedNode.data.description}
                  </BodySmall>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedNode(null)}
                  className="text-[var(--brand-muted)] transition-colors hover:text-[var(--foreground)]"
                  aria-label="Clear selection"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-px border border-[var(--brand-border-subtle)] bg-[var(--brand-border-subtle)] sm:grid-cols-4">
                <div className="bg-[var(--brand-surface-soft)] p-3">
                  <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-[var(--brand-muted)]">
                    Type
                  </div>
                  <div className="text-sm font-medium text-[var(--foreground)] capitalize">
                    {selectedNode.data.type}
                  </div>
                </div>
                <div className="bg-[var(--brand-surface-soft)] p-3">
                  <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-[var(--brand-muted)]">
                    Status
                  </div>
                  <div className="text-sm font-medium text-[var(--foreground)] capitalize">
                    {selectedNode.data.status}
                  </div>
                </div>
                <div className="bg-[var(--brand-surface-soft)] p-3">
                  <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-[var(--brand-muted)]">
                    Messages
                  </div>
                  <div className="text-sm font-medium text-[var(--foreground)]">
                    {selectedNode.data.messageCount.toLocaleString()}
                  </div>
                </div>
                <div className="bg-[var(--brand-surface-soft)] p-3">
                  <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-[var(--brand-muted)]">
                    Connections
                  </div>
                  <div className="text-sm font-medium text-[var(--foreground)]">
                    {selectedNode.data.connections}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="md:col-span-2 border border-[var(--brand-border-subtle)] bg-[var(--background)] p-6 text-center">
              <div className="mb-3 text-3xl">🕸️</div>
              <BodySmall className="mb-1 font-medium text-[var(--foreground)]">
                Select an agent node to view details.
              </BodySmall>
              <BodySmall className="text-[var(--brand-muted)]">
                Click any agent in the network graph above to inspect its
                properties, connections, and message statistics.
              </BodySmall>
            </div>
          )}

          {/* Agent Type Breakdown */}
          <div className="border border-[var(--brand-border-subtle)] bg-[var(--background)] p-6">
            <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-[var(--brand-muted)]">
              Agent Distribution
            </div>
            <div className="space-y-3">
              {Object.entries(networkStats.agentTypes).map(([type, count]) => {
                const config = AGENT_TYPE_CONFIG[type as AgentType];
                return (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{config.icon}</span>
                      <span className="text-xs capitalize text-[var(--foreground)]">
                        {type}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-[var(--foreground)]">
                      {count}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

