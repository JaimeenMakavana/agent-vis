"use client";

import React, { useCallback, useState, useMemo } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Handle,
  Position,
  useEdgesState,
  useNodesState,
  Panel,
  type Node,
  type Edge,
  type NodeProps,
} from "reactflow";
import "reactflow/dist/style.css";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { H3, BodySmall } from "@/components/ui/typography";

type EntityType = "person" | "organization" | "concept" | "event" | "document";

type EntityNodeData = {
  label: string;
  type: EntityType;
  description: string;
  confidence: number;
  firstSeen: string;
  lastUpdated: string;
  sourceCount: number;
  relationshipCount: number;
};

const ENTITY_TYPE_CONFIG: Record<
  EntityType,
  { color: string; borderColor: string; icon: string }
> = {
  person: {
    color: "bg-blue-50",
    borderColor: "border-blue-300",
    icon: "👤",
  },
  organization: {
    color: "bg-purple-50",
    borderColor: "border-purple-300",
    icon: "🏢",
  },
  concept: {
    color: "bg-emerald-50",
    borderColor: "border-emerald-300",
    icon: "💡",
  },
  event: {
    color: "bg-amber-50",
    borderColor: "border-amber-300",
    icon: "📅",
  },
  document: {
    color: "bg-rose-50",
    borderColor: "border-rose-300",
    icon: "📄",
  },
};

const INITIAL_NODES: Node<EntityNodeData>[] = [
  {
    id: "entity-1",
    type: "knowledge-entity",
    position: { x: 400, y: 100 },
    data: {
      label: "OpenAI",
      type: "organization",
      description:
        "AI research company known for GPT models and ChatGPT. Founded in 2015.",
      confidence: 0.95,
      firstSeen: "2024-01-15",
      lastUpdated: "2024-03-20",
      sourceCount: 12,
      relationshipCount: 8,
    },
  },
  {
    id: "entity-2",
    type: "knowledge-entity",
    position: { x: 200, y: 250 },
    data: {
      label: "GPT-4",
      type: "concept",
      description:
        "Large language model released by OpenAI. Multimodal capabilities.",
      confidence: 0.92,
      firstSeen: "2024-01-20",
      lastUpdated: "2024-03-18",
      sourceCount: 8,
      relationshipCount: 6,
    },
  },
  {
    id: "entity-3",
    type: "knowledge-entity",
    position: { x: 600, y: 250 },
    data: {
      label: "Sam Altman",
      type: "person",
      description: "CEO of OpenAI. Key figure in AI development.",
      confidence: 0.88,
      firstSeen: "2024-02-01",
      lastUpdated: "2024-03-15",
      sourceCount: 5,
      relationshipCount: 4,
    },
  },
  {
    id: "entity-4",
    type: "knowledge-entity",
    position: { x: 100, y: 400 },
    data: {
      label: "Transformer Architecture",
      type: "concept",
      description:
        "Neural network architecture introduced in 'Attention Is All You Need'.",
      confidence: 0.90,
      firstSeen: "2024-01-25",
      lastUpdated: "2024-03-10",
      sourceCount: 10,
      relationshipCount: 5,
    },
  },
  {
    id: "entity-5",
    type: "knowledge-entity",
    position: { x: 300, y: 400 },
    data: {
      label: "GPT-4 Release",
      type: "event",
      description: "GPT-4 was released on March 14, 2023.",
      confidence: 0.85,
      firstSeen: "2024-02-05",
      lastUpdated: "2024-03-12",
      sourceCount: 6,
      relationshipCount: 4,
    },
  },
  {
    id: "entity-6",
    type: "knowledge-entity",
    position: { x: 500, y: 400 },
    data: {
      label: "Microsoft",
      type: "organization",
      description:
        "Technology company. Major investor and partner of OpenAI.",
      confidence: 0.93,
      firstSeen: "2024-01-18",
      lastUpdated: "2024-03-19",
      sourceCount: 9,
      relationshipCount: 7,
    },
  },
  {
    id: "entity-7",
    type: "knowledge-entity",
    position: { x: 700, y: 400 },
    data: {
      label: "ChatGPT",
      type: "concept",
      description:
        "AI chatbot application built on GPT models. Launched in November 2022.",
      confidence: 0.91,
      firstSeen: "2024-01-22",
      lastUpdated: "2024-03-17",
      sourceCount: 11,
      relationshipCount: 6,
    },
  },
  {
    id: "entity-8",
    type: "knowledge-entity",
    position: { x: 150, y: 550 },
    data: {
      label: "Attention Mechanism",
      type: "concept",
      description:
        "Core component of transformer architecture. Allows models to focus on relevant parts of input.",
      confidence: 0.87,
      firstSeen: "2024-02-10",
      lastUpdated: "2024-03-08",
      sourceCount: 7,
      relationshipCount: 3,
    },
  },
  {
    id: "entity-9",
    type: "knowledge-entity",
    position: { x: 400, y: 550 },
    data: {
      label: "API Documentation",
      type: "document",
      description:
        "OpenAI API documentation for GPT-4 integration and usage.",
      confidence: 0.89,
      firstSeen: "2024-02-15",
      lastUpdated: "2024-03-14",
      sourceCount: 4,
      relationshipCount: 5,
    },
  },
  {
    id: "entity-10",
    type: "knowledge-entity",
    position: { x: 650, y: 550 },
    data: {
      label: "Satya Nadella",
      type: "person",
      description: "CEO of Microsoft. Oversees Microsoft's AI strategy.",
      confidence: 0.86,
      firstSeen: "2024-02-20",
      lastUpdated: "2024-03-13",
      sourceCount: 3,
      relationshipCount: 3,
    },
  },
];

const INITIAL_EDGES: Edge[] = [
  {
    id: "e-1-2",
    source: "entity-1",
    target: "entity-2",
    type: "smoothstep",
    label: "developed",
    style: { stroke: "var(--brand-blue)", strokeWidth: 2 },
  },
  {
    id: "e-1-3",
    source: "entity-1",
    target: "entity-3",
    type: "smoothstep",
    label: "employs",
    style: { stroke: "var(--brand-blue)", strokeWidth: 2 },
  },
  {
    id: "e-2-4",
    source: "entity-2",
    target: "entity-4",
    type: "smoothstep",
    label: "based on",
    style: { stroke: "var(--brand-blue)", strokeWidth: 2 },
  },
  {
    id: "e-2-5",
    source: "entity-2",
    target: "entity-5",
    type: "smoothstep",
    label: "released at",
    style: { stroke: "var(--brand-blue)", strokeWidth: 2 },
  },
  {
    id: "e-1-6",
    source: "entity-1",
    target: "entity-6",
    type: "smoothstep",
    label: "partnered with",
    style: { stroke: "var(--brand-blue)", strokeWidth: 2 },
  },
  {
    id: "e-2-7",
    source: "entity-2",
    target: "entity-7",
    type: "smoothstep",
    label: "powers",
    style: { stroke: "var(--brand-blue)", strokeWidth: 2 },
  },
  {
    id: "e-4-8",
    source: "entity-4",
    target: "entity-8",
    type: "smoothstep",
    label: "includes",
    style: { stroke: "var(--brand-blue)", strokeWidth: 2 },
  },
  {
    id: "e-1-9",
    source: "entity-1",
    target: "entity-9",
    type: "smoothstep",
    label: "published",
    style: { stroke: "var(--brand-blue)", strokeWidth: 2 },
  },
  {
    id: "e-6-10",
    source: "entity-6",
    target: "entity-10",
    type: "smoothstep",
    label: "led by",
    style: { stroke: "var(--brand-blue)", strokeWidth: 2 },
  },
  {
    id: "e-3-6",
    source: "entity-3",
    target: "entity-6",
    type: "smoothstep",
    label: "collaborates with",
    style: { stroke: "var(--brand-blue)", strokeWidth: 2 },
  },
];

function KnowledgeEntityNode({
  data,
  selected,
}: NodeProps<EntityNodeData>) {
  const config = ENTITY_TYPE_CONFIG[data.type];

  return (
    <div
      className={`rounded-sm border-2 ${config.borderColor} ${config.color} p-3 shadow-sm transition-all ${
        selected ? "ring-2 ring-offset-2 ring-offset-[var(--background)] ring-[var(--brand-border-subtle)]" : ""
      }`}
      style={{ minWidth: "180px", maxWidth: "220px" }}
    >
      <Handle type="target" position={Position.Top} />
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-base">{config.icon}</span>
            <div>
              <div className="text-sm font-semibold text-[var(--foreground)]">
                {data.label}
              </div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--brand-muted)]">
                {data.type}
              </div>
            </div>
          </div>
        </div>
        <div className="mb-2 text-[10px] text-[var(--brand-muted)] line-clamp-2">
          {data.description}
        </div>
        <div className="flex items-center justify-between border-t border-[var(--brand-border-subtle)] pt-2 text-[9px] text-[var(--brand-muted)]">
        <span>Confidence: {(data.confidence * 100).toFixed(0)}%</span>
        <span>{data.relationshipCount} rels</span>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

const nodeTypes = { "knowledge-entity": KnowledgeEntityNode };

export default function KnowledgeGraphPage() {
  const [nodes, setNodes, onNodesChange] =
    useNodesState<EntityNodeData>(INITIAL_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(INITIAL_EDGES);
  const [selectedNode, setSelectedNode] = useState<Node<EntityNodeData> | null>(
    null,
  );

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node<EntityNodeData>) => {
      setSelectedNode(node);
    },
    [],
  );

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  // Calculate graph statistics
  const graphStats = useMemo(() => {
    const entityTypes = nodes.reduce(
      (acc, node) => {
        acc[node.data.type] = (acc[node.data.type] || 0) + 1;
        return acc;
      },
      {} as Record<EntityType, number>,
    );

    const totalRelationships = edges.length;
    const avgConfidence =
      nodes.reduce((sum, node) => sum + node.data.confidence, 0) /
      nodes.length;

    return {
      totalEntities: nodes.length,
      totalRelationships,
      avgConfidence,
      entityTypes,
    };
  }, [nodes, edges]);

  return (
    <section className="relative z-10 bg-[var(--background)] py-16 sm:py-24">
      <Container>
        <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-[var(--brand-border-subtle)] pb-6 sm:mb-16 sm:gap-6 sm:pb-8 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="03 / Knowledge Graph"
            title="Entity & relationship graph visualization."
            description={
              <>
                Explore entities, facts, and relationships that your agents have
                learned. Trace how knowledge connects across tasks and sessions.
              </>
            }
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          {/* Graph Visualization */}
          <div className="border border-[var(--brand-border-subtle)] bg-[var(--background)]">
            <div className="border-b border-[var(--brand-border-subtle)] bg-[var(--brand-surface-soft)] px-4 py-3 sm:px-6">
              <div className="flex items-center justify-between">
                <BodySmall className="font-mono text-[10px] uppercase tracking-widest text-[var(--brand-muted)]">
                  Knowledge Graph
                </BodySmall>
                <BodySmall className="text-[var(--brand-muted)]">
                  Drag nodes • Click to inspect • Zoom to explore
                </BodySmall>
              </div>
            </div>
            <div className="relative h-[600px] sm:h-[700px]">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={onNodeClick}
                onPaneClick={onPaneClick}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.3 }}
                nodesDraggable
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
                    className="rounded-sm border border-[var(--brand-border-subtle)] bg-[var(--foreground)]"
                    style={{
                      backgroundColor: "var(--foreground)",
                    }}
                    nodeColor={(node) => {
                      const config =
                        ENTITY_TYPE_CONFIG[(node.data as EntityNodeData).type];
                      // Map Tailwind border color classes to hex values
                      const colorMap: Record<string, string> = {
                        "border-blue-300": "#3b82f6",
                        "border-purple-300": "#8b5cf6",
                        "border-emerald-300": "#10b981",
                        "border-amber-300": "#f59e0b",
                        "border-rose-300": "#ec4899",
                      };
                      return colorMap[config.borderColor] || "#6b7280";
                    }}
                    maskColor="rgba(0, 0, 0, 0.1)"
                  />
                  <div className="rounded-sm border border-[var(--brand-border-subtle)] bg-[var(--brand-surface-soft)] px-2 py-1">
                    <span className="font-mono text-[9px] uppercase tracking-wide text-[var(--foreground)]">
                      React Flow
                    </span>
                  </div>
                </Panel>
              </ReactFlow>
            </div>
          </div>

          {/* Details Panel */}
          <div className="space-y-4">
            <div className="sticky top-4 border border-[var(--brand-border-subtle)] bg-[var(--background)] p-6">
              {selectedNode ? (
                <>
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-[var(--brand-muted)]">
                        Entity Details
                      </div>
                      <H3 className="mb-1 text-sm">{selectedNode.data.label}</H3>
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

                  <div className="mb-3 grid grid-cols-2 gap-px border border-[var(--brand-border-subtle)] bg-[var(--brand-border-subtle)]">
                    <div className="bg-[var(--brand-surface-soft)] p-3">
                      <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-[var(--brand-muted)]">
                        Type
                      </div>
                      <BodySmall className="text-[var(--foreground)] capitalize">
                        {selectedNode.data.type}
                      </BodySmall>
                    </div>
                    <div className="bg-[var(--brand-surface-soft)] p-3">
                      <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-[var(--brand-muted)]">
                        Confidence
                      </div>
                      <BodySmall className="text-[var(--foreground)]">
                        {(selectedNode.data.confidence * 100).toFixed(0)}%
                      </BodySmall>
                    </div>
                  </div>

                  <div className="mb-3 grid grid-cols-2 gap-px border border-[var(--brand-border-subtle)] bg-[var(--brand-border-subtle)]">
                    <div className="bg-[var(--brand-surface-soft)] p-3">
                      <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-[var(--brand-muted)]">
                        First Seen
                      </div>
                      <BodySmall className="text-[var(--foreground)]">
                        {selectedNode.data.firstSeen}
                      </BodySmall>
                    </div>
                    <div className="bg-[var(--brand-surface-soft)] p-3">
                      <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-[var(--brand-muted)]">
                        Last Updated
                      </div>
                      <BodySmall className="text-[var(--foreground)]">
                        {selectedNode.data.lastUpdated}
                      </BodySmall>
                    </div>
                  </div>

                  <div className="mb-3 grid grid-cols-2 gap-px border border-[var(--brand-border-subtle)] bg-[var(--brand-border-subtle)]">
                    <div className="bg-[var(--brand-surface-soft)] p-3">
                      <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-[var(--brand-muted)]">
                        Sources
                      </div>
                      <BodySmall className="text-[var(--foreground)]">
                        {selectedNode.data.sourceCount}
                      </BodySmall>
                    </div>
                    <div className="bg-[var(--brand-surface-soft)] p-3">
                      <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-[var(--brand-muted)]">
                        Relationships
                      </div>
                      <BodySmall className="text-[var(--foreground)]">
                        {selectedNode.data.relationshipCount}
                      </BodySmall>
                    </div>
                  </div>

                  <div className="rounded-sm border border-[var(--brand-border-subtle)] bg-[var(--brand-surface-soft)] p-4">
                    <div className="mb-2 font-mono text-[9px] uppercase tracking-widest text-[var(--brand-muted)]">
                      Connected Entities
                    </div>
                    <div className="space-y-1">
                      {edges
                        .filter(
                          (e) =>
                            e.source === selectedNode.id ||
                            e.target === selectedNode.id,
                        )
                        .map((edge) => {
                          const connectedNodeId =
                            edge.source === selectedNode.id
                              ? edge.target
                              : edge.source;
                          const connectedNode = nodes.find(
                            (n) => n.id === connectedNodeId,
                          );
                          if (!connectedNode) return null;
                          return (
                            <div
                              key={edge.id}
                              className="flex items-center justify-between border-b border-[var(--brand-border-subtle)] pb-1 text-[10px] last:border-0 last:pb-0"
                            >
                              <span className="text-[var(--foreground)]">
                                {connectedNode.data.label}
                              </span>
                              <span className="rounded-sm border border-[var(--brand-border-subtle)] bg-[var(--background)] px-1.5 py-0.5 text-[9px] text-[var(--brand-muted)]">
                                {edge.label}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="mb-3 text-3xl">🔗</div>
                  <BodySmall className="mb-1 font-medium text-[var(--foreground)]">
                    Select an entity to inspect details.
                  </BodySmall>
                  <BodySmall className="text-[var(--brand-muted)]">
                    Click any node in the graph to see its properties, sources,
                    relationships, and how it connects to other entities in your
                    knowledge base.
                  </BodySmall>
                </div>
              )}
            </div>

            <div className="border border-[var(--brand-border-subtle)] bg-[var(--background)] p-4">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[var(--brand-muted)]">
                Graph Statistics
              </div>
              <div className="grid grid-cols-2 gap-px border border-[var(--brand-border-subtle)] bg-[var(--brand-border-subtle)]">
                <div className="bg-[var(--brand-surface-soft)] p-3 text-center">
                  <div className="text-xl font-medium tracking-tight text-[var(--foreground)]">
                    {graphStats.totalEntities}
                  </div>
                  <BodySmall className="text-[var(--brand-muted)]">Entities</BodySmall>
                </div>
                <div className="bg-[var(--brand-surface-soft)] p-3 text-center">
                  <div className="text-xl font-medium tracking-tight text-[var(--foreground)]">
                    {graphStats.totalRelationships}
                  </div>
                  <BodySmall className="text-[var(--brand-muted)]">
                    Relationships
                  </BodySmall>
                </div>
              </div>
              <div className="mt-2 rounded-sm border border-[var(--brand-border-subtle)] bg-[var(--brand-surface-soft)] p-3">
                <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-[var(--brand-muted)]">
                  Average Confidence
                </div>
                <BodySmall className="text-[var(--foreground)]">
                  {(graphStats.avgConfidence * 100).toFixed(1)}%
                </BodySmall>
              </div>
            </div>

            <div className="border border-[var(--brand-border-subtle)] bg-[var(--background)] p-4">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[var(--brand-muted)]">
                Entity Types
              </div>
              <div className="space-y-1">
                {Object.entries(graphStats.entityTypes).map(([type, count]) => {
                  const config = ENTITY_TYPE_CONFIG[type as EntityType];
                  return (
                    <div
                      key={type}
                      className="flex items-center justify-between border-b border-[var(--brand-border-subtle)] pb-1 text-[10px] last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{config.icon}</span>
                        <span className="capitalize text-[var(--foreground)]">{type}</span>
                      </div>
                      <span className="text-[var(--brand-muted)]">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


