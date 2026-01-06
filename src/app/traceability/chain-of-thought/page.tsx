"use client";
import React, { useCallback, useState } from "react";
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

type ToolType = {
  id: string;
  label: string;
  type: string;
  color: string;
};

// Tool palette items
const TOOL_TYPES: ToolType[] = [
  {
    id: "input",
    label: "Input",
    type: "Text",
    color: "bg-[var(--light-blue-50)] border-[var(--light-blue-200)]",
  },
  {
    id: "output",
    label: "Output",
    type: "Text",
    color: "bg-[var(--light-green-50)] border-[var(--light-green-200)]",
  },
  {
    id: "memory",
    label: "Chat Memory",
    type: "Token Buffer",
    color: "bg-[var(--light-purple-50)] border-[var(--light-purple-200)]",
  },
  {
    id: "kb",
    label: "Knowledge Base",
    type: "RAG",
    color: "bg-[var(--light-amber-50)] border-[var(--light-amber-200)]",
  },
  {
    id: "llm",
    label: "LLM",
    type: "GPT-4",
    color: "bg-[var(--light-rose-50)] border-[var(--light-rose-200)]",
  },
  {
    id: "tool",
    label: "Tool",
    type: "Function",
    color: "bg-[var(--light-cyan-50)] border-[var(--light-cyan-200)]",
  },
  {
    id: "transform",
    label: "Transform",
    type: "Processor",
    color: "bg-[var(--light-indigo-50)] border-[var(--light-indigo-200)]",
  },
  {
    id: "condition",
    label: "Condition",
    type: "Router",
    color: "bg-[var(--light-orange-50)] border-[var(--light-orange-200)]",
  },
];

type PipelineNodeData = {
  label: string;
  type: string;
  color: string;
  description?: string;
};

const INITIAL_NODES: Node<PipelineNodeData>[] = [
  {
    id: "input-1",
    type: "pipeline",
    position: { x: 80, y: 160 },
    data: {
      label: "User Input",
      type: "Text",
      color: "bg-[var(--light-blue-50)] border-[var(--light-blue-200)]",
      description: "Raw user question or instruction entering the system.",
    },
  },
  {
    id: "memory-1",
    type: "pipeline",
    position: { x: 320, y: 80 },
    data: {
      label: "Chat Memory",
      type: "Token Buffer",
      color: "bg-[var(--light-purple-50)] border-[var(--light-purple-200)]",
      description: "Short‑term conversation window for recent messages.",
    },
  },
  {
    id: "kb-1",
    type: "pipeline",
    position: { x: 320, y: 240 },
    data: {
      label: "Knowledge Base",
      type: "RAG",
      color: "bg-[var(--light-amber-50)] border-[var(--light-amber-200)]",
      description: "Long‑term documents and embeddings queried via RAG.",
    },
  },
  {
    id: "llm-1",
    type: "pipeline",
    position: { x: 560, y: 160 },
    data: {
      label: "LLM Orchestrator",
      type: "GPT-4",
      color: "bg-[var(--light-rose-50)] border-[var(--light-rose-200)]",
      description:
        "Core reasoning step combining input, memory, and retrieved context.",
    },
  },
  {
    id: "tool-1",
    type: "pipeline",
    position: { x: 800, y: 80 },
    data: {
      label: "Tools / APIs",
      type: "Function",
      color: "bg-[var(--light-cyan-50)] border-[var(--light-cyan-200)]",
      description: "External tools (search, DB, APIs) invoked by the agent.",
    },
  },
  {
    id: "output-1",
    type: "pipeline",
    position: { x: 800, y: 240 },
    data: {
      label: "Final Output",
      type: "Text",
      color: "bg-[var(--light-green-50)] border-[var(--light-green-200)]",
      description: "Response returned to the user or downstream system.",
    },
  },
];

const INITIAL_EDGES: Edge[] = [
  {
    id: "e-input-memory",
    source: "input-1",
    target: "memory-1",
    type: "smoothstep",
    animated: true,
    style: { stroke: "var(--brand-blue)", strokeWidth: 2 },
  },
  {
    id: "e-input-kb",
    source: "input-1",
    target: "kb-1",
    type: "smoothstep",
    animated: true,
    style: { stroke: "var(--brand-blue)", strokeWidth: 2 },
  },
  {
    id: "e-memory-llm",
    source: "memory-1",
    target: "llm-1",
    type: "smoothstep",
    animated: true,
    style: { stroke: "var(--brand-blue)", strokeWidth: 2 },
  },
  {
    id: "e-kb-llm",
    source: "kb-1",
    target: "llm-1",
    type: "smoothstep",
    animated: true,
    style: { stroke: "var(--brand-blue)", strokeWidth: 2 },
  },
  {
    id: "e-llm-tool",
    source: "llm-1",
    target: "tool-1",
    type: "smoothstep",
    animated: true,
    style: { stroke: "var(--brand-blue)", strokeWidth: 2 },
  },
  {
    id: "e-llm-output",
    source: "llm-1",
    target: "output-1",
    type: "smoothstep",
    animated: true,
    style: { stroke: "var(--brand-blue)", strokeWidth: 2 },
  },
];

// Custom node component
function PipelineNode({ data, selected }: NodeProps<PipelineNodeData>) {
  return (
    <div
      className={`min-w-[180px] md:min-w-[200px] rounded-sm border-2 ${
        data.color
      } ${
        selected ? "ring-2 ring-[var(--brand-blue)]" : ""
      } bg-[var(--background)] px-3 py-2.5 md:px-4 md:py-3 shadow-sm transition-all duration-200 hover:shadow-md`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="truncate text-xs md:text-sm font-medium tracking-tight text-[var(--foreground)]">
          {data.label}
        </span>
        <span className="rounded-sm border border-[var(--brand-border-subtle)] bg-[var(--brand-surface-soft)] px-1.5 py-0.5 md:px-2 md:py-0.5 text-[9px] md:text-[10px] font-mono uppercase tracking-wider text-[var(--brand-muted)] shrink-0">
          {data.type}
        </span>
      </div>
      {data.description && (
        <p className="text-[10px] md:text-xs font-light leading-relaxed text-[var(--brand-muted)]">
          {data.description}
        </p>
      )}

      <Handle
        type="target"
        position={Position.Left}
        style={{
          backgroundColor: "var(--brand-blue)",
          borderColor: "var(--background)",
        }}
        className="h-3! w-3! border-2!"
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{
          backgroundColor: "var(--brand-blue-soft)",
          borderColor: "var(--background)",
        }}
        className="h-3! w-3! border-2!"
      />
      <Handle
        type="target"
        position={Position.Top}
        style={{
          backgroundColor: "var(--brand-blue)",
          borderColor: "var(--background)",
        }}
        className="h-3! w-3! border-2!"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          backgroundColor: "var(--brand-blue-soft)",
          borderColor: "var(--background)",
        }}
        className="h-3! w-3! border-2!"
      />
    </div>
  );
}

const nodeTypes = { pipeline: PipelineNode };

export default function InteractiveToolsCanvas() {
  const [nodes, setNodes, onNodesChange] =
    useNodesState<PipelineNodeData>(INITIAL_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(INITIAL_EDGES);
  const [nodeIdCounter, setNodeIdCounter] = useState(INITIAL_NODES.length + 1);
  const [selectedTool, setSelectedTool] = useState<ToolType["id"] | null>(null);

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
          eds
        )
      );
    },
    [setEdges]
  );

  const addNode = (toolType: ToolType["id"]) => {
    const tool = TOOL_TYPES.find((t) => t.id === toolType);
    if (!tool) return;
    const newNode: Node<PipelineNodeData> = {
      id: `${toolType}-${nodeIdCounter}`,
      type: "pipeline",
      position: {
        x: Math.random() * 400 + 100,
        y: Math.random() * 300 + 100,
      },
      data: {
        label: tool.label,
        type: tool.type,
        color: tool.color,
        description: `${tool.label} component for processing`,
      },
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeIdCounter(nodeIdCounter + 1);
  };

  const handleClear = () => {
    setNodes([]);
    setEdges([]);
  };

  const handleDeleteSelected = () => {
    setNodes((nds) => nds.filter((node) => !node.selected));
    setEdges((eds) => eds.filter((edge) => !edge.selected));
  };

  return (
    <section className="relative z-10 bg-[var(--background)] py-16 sm:py-24">
      <Container>
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-[var(--brand-border-subtle)] pb-6 sm:mb-16 sm:gap-6 sm:pb-8 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="01 / Chain of Thought"
            title="Interactive pipeline builder"
            description={
              <>
                Build and visualize agent reasoning pipelines. Connect tools,
                memory, knowledge bases, and LLMs to understand the flow of
                information through your system.
              </>
            }
          />
        </div>

        {/* Tool Palette */}
        <div className="mb-6 border border-[var(--brand-border-subtle)] bg-[var(--background)] px-4 py-3 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between md:gap-4">
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <span className="mr-2 font-mono text-[10px] uppercase tracking-widest text-[var(--brand-muted)] md:text-xs">
                Tools Palette
              </span>
              {TOOL_TYPES.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => addNode(tool.id)}
                  className={`${tool.color} rounded-sm border-2 px-3 py-1.5 text-xs font-medium tracking-wide text-[var(--foreground)] transition-all duration-200 hover:shadow-sm active:scale-95 md:px-4 md:py-2`}
                >
                  + {tool.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={handleDeleteSelected}
                className="rounded-sm border border-[var(--brand-border-subtle)] bg-[var(--background)] px-4 py-2 text-xs font-medium tracking-wide text-[var(--foreground)] transition-colors hover:bg-[var(--brand-surface-soft)] md:px-5 md:py-2.5"
              >
                Delete Selected
              </button>
              <button
                onClick={handleClear}
                className="rounded-sm border border-[var(--brand-border-subtle)] bg-[var(--background)] px-4 py-2 text-xs font-medium tracking-wide text-[var(--foreground)] transition-colors hover:bg-[var(--brand-surface-soft)] md:px-5 md:py-2.5"
              >
                Clear Canvas
              </button>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="border border-[var(--brand-border-subtle)] bg-[var(--background)]">
          <div className="border-b border-[var(--brand-border-subtle)] bg-[var(--brand-surface-soft)] px-4 py-3 sm:px-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--brand-muted)] md:text-xs">
                Pipeline Canvas
              </span>
              <span className="text-xs text-[var(--brand-muted)] md:text-sm">
                Drag nodes • Connect handles • Click to inspect
              </span>
            </div>
          </div>
          <div className="relative h-[600px] sm:h-[700px] md:h-[800px]">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
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
              <Controls className="rounded-sm border border-[var(--brand-border-subtle)] bg-[var(--background)] shadow-sm md:!bottom-4 md:!left-4" />
              <MiniMap
                className="rounded-sm border border-[var(--brand-border-subtle)] bg-[var(--background)] shadow-sm md:!bottom-4 md:!right-4"
                nodeColor={(node: Node<PipelineNodeData>) => {
                  const colorMap: Record<string, string> = {
                    "bg-[var(--light-blue-50)]": "var(--light-blue-100)",
                    "bg-[var(--light-green-50)]": "var(--light-green-100)",
                    "bg-[var(--light-purple-50)]": "var(--light-purple-100)",
                    "bg-[var(--light-amber-50)]": "var(--light-amber-100)",
                    "bg-[var(--light-rose-50)]": "var(--light-rose-100)",
                    "bg-[var(--light-cyan-50)]": "var(--light-cyan-100)",
                    "bg-[var(--light-indigo-50)]": "var(--light-indigo-100)",
                    "bg-[var(--light-orange-50)]": "var(--light-orange-100)",
                  };
                  const colorKey = node.data?.color ?? "";
                  return colorMap[colorKey] ?? "var(--light-neutral-100)";
                }}
              />

              <Panel
                position="top-right"
                className="m-4 rounded-sm border border-[var(--brand-border-subtle)] bg-[var(--background)] p-3 md:p-4 shadow-sm md:!top-16 md:!right-4 md:max-w-[280px]"
              >
                <div className="space-y-2 text-xs md:text-sm">
                  <div className="mb-2 font-medium tracking-tight text-[var(--foreground)] md:text-sm">
                    Instructions
                  </div>
                  <div className="font-light text-[var(--brand-muted)] md:text-xs">
                    • Click tools above to add nodes
                  </div>
                  <div className="font-light text-[var(--brand-muted)] md:text-xs">
                    • Drag nodes to reposition
                  </div>
                  <div className="font-light text-[var(--brand-muted)] md:text-xs">
                    • Connect handles to create flows
                  </div>
                  <div className="font-light text-[var(--brand-muted)] md:text-xs">
                    • Select and press Delete to remove
                  </div>
                  <div className="font-light text-[var(--brand-muted)] md:text-xs">
                    • Hold Shift for multi-select
                  </div>
                  <div className="mt-3 border-t border-[var(--brand-border-subtle)] pt-3">
                    <div className="mb-1 font-medium tracking-tight text-[var(--foreground)] md:text-sm">
                      Stats
                    </div>
                    <div className="font-light text-[var(--brand-muted)] md:text-xs">
                      Nodes: {nodes.length}
                    </div>
                    <div className="font-light text-[var(--brand-muted)] md:text-xs">
                      Connections: {edges.length}
                    </div>
                  </div>
                </div>
              </Panel>
            </ReactFlow>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-6 border border-[var(--brand-border-subtle)] bg-[var(--background)] p-6">
          <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-[var(--brand-muted)]">
            Pipeline Statistics
          </div>
          <div className="grid grid-cols-2 gap-px border border-[var(--brand-border-subtle)] bg-[var(--brand-border-subtle)] sm:grid-cols-3">
            <div className="bg-[var(--brand-surface-soft)] p-4 text-center">
              <div className="text-xl font-medium tracking-tight text-[var(--foreground)] sm:text-2xl">
                {nodes.length}
              </div>
              <div className="mt-1 text-xs text-[var(--brand-muted)]">
                Total Nodes
              </div>
            </div>
            <div className="bg-[var(--brand-surface-soft)] p-4 text-center">
              <div className="text-xl font-medium tracking-tight text-[var(--foreground)] sm:text-2xl">
                {edges.length}
              </div>
              <div className="mt-1 text-xs text-[var(--brand-muted)]">
                Connections
              </div>
            </div>
            <div className="bg-[var(--brand-surface-soft)] p-4 text-center sm:col-span-1 col-span-2">
              <div className="flex items-center justify-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[var(--brand-blue)]"></div>
                <span className="text-xs text-[var(--brand-muted)]">Ready</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
