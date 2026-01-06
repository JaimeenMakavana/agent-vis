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
    color: "bg-blue-50 border-blue-200",
  },
  {
    id: "output",
    label: "Output",
    type: "Text",
    color: "bg-green-50 border-green-200",
  },
  {
    id: "memory",
    label: "Chat Memory",
    type: "Token Buffer",
    color: "bg-purple-50 border-purple-200",
  },
  {
    id: "kb",
    label: "Knowledge Base",
    type: "RAG",
    color: "bg-amber-50 border-amber-200",
  },
  {
    id: "llm",
    label: "LLM",
    type: "GPT-4",
    color: "bg-rose-50 border-rose-200",
  },
  {
    id: "tool",
    label: "Tool",
    type: "Function",
    color: "bg-cyan-50 border-cyan-200",
  },
  {
    id: "transform",
    label: "Transform",
    type: "Processor",
    color: "bg-indigo-50 border-indigo-200",
  },
  {
    id: "condition",
    label: "Condition",
    type: "Router",
    color: "bg-orange-50 border-orange-200",
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
      color: "bg-blue-50 border-blue-200",
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
      color: "bg-purple-50 border-purple-200",
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
      color: "bg-amber-50 border-amber-200",
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
      color: "bg-rose-50 border-rose-200",
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
      color: "bg-cyan-50 border-cyan-200",
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
      color: "bg-green-50 border-green-200",
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
      className={`min-w-[200px] rounded-sm border-2 ${data.color} ${
        selected ? "ring-2 ring-(--brand-blue)" : ""
      } bg-white px-4 py-3 shadow-sm transition-all duration-200 hover:shadow-md`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="truncate text-sm font-medium tracking-tight text-neutral-900">
          {data.label}
        </span>
        <span className="rounded-sm border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-neutral-500">
          {data.type}
        </span>
      </div>
      {data.description && (
        <p className="text-xs font-light leading-relaxed text-neutral-500">
          {data.description}
        </p>
      )}

      <Handle
        type="target"
        position={Position.Left}
        className="h-3! w-3! bg-(--brand-blue)! border-2! border-white!"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="h-3! w-3! bg-(--brand-blue-soft)! border-2! border-white!"
      />
      <Handle
        type="target"
        position={Position.Top}
        className="h-3! w-3! bg-(--brand-blue)! border-2! border-white!"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="h-3! w-3! bg-(--brand-blue-soft)! border-2! border-white!"
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
    <section className="relative z-10 bg-white py-16 sm:py-24">
      <Container>
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-neutral-200 pb-6 sm:mb-16 sm:gap-6 sm:pb-8 md:flex-row md:items-end">
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
        <div className="mb-6 border border-neutral-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                Tools Palette
              </span>
              {TOOL_TYPES.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => addNode(tool.id)}
                  className={`${tool.color} rounded-sm border-2 px-3 py-1.5 text-xs font-medium tracking-wide text-neutral-700 transition-all duration-200 hover:shadow-sm active:scale-95`}
                >
                  + {tool.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDeleteSelected}
                className="rounded-sm border border-neutral-200 bg-white px-4 py-2 text-xs font-medium tracking-wide text-neutral-700 transition-colors hover:bg-neutral-50"
              >
                Delete Selected
              </button>
              <button
                onClick={handleClear}
                className="rounded-sm border border-neutral-200 bg-white px-4 py-2 text-xs font-medium tracking-wide text-neutral-700 transition-colors hover:bg-neutral-50"
              >
                Clear Canvas
              </button>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="border border-neutral-200 bg-white">
          <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-3 sm:px-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                Pipeline Canvas
              </span>
              <span className="text-xs text-neutral-400">
                Drag nodes • Connect handles • Click to inspect
              </span>
            </div>
          </div>
          <div className="relative h-[600px] sm:h-[700px]">
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
              <Controls className="rounded-sm border border-neutral-200 bg-white shadow-sm" />
              <MiniMap
                className="rounded-sm border border-neutral-200 bg-white shadow-sm"
                nodeColor={(node: Node<PipelineNodeData>) => {
                  const colors: Record<string, string> = {
                    "bg-blue-50": "#dbeafe",
                    "bg-green-50": "#dcfce7",
                    "bg-purple-50": "#f3e8ff",
                    "bg-amber-50": "#fef3c7",
                    "bg-rose-50": "#ffe4e6",
                    "bg-cyan-50": "#ecfeff",
                    "bg-indigo-50": "#e0e7ff",
                    "bg-orange-50": "#ffedd5",
                  };
                  const colorKey = node.data?.color ?? "";
                  return colors[colorKey] ?? "#f3f4f6";
                }}
              />

              <Panel
                position="top-right"
                className="m-4 rounded-sm border border-neutral-200 bg-white p-4 shadow-sm"
              >
                <div className="space-y-2 text-xs">
                  <div className="mb-2 font-medium tracking-tight text-neutral-900">
                    Instructions
                  </div>
                  <div className="font-light text-neutral-500">
                    • Click tools above to add nodes
                  </div>
                  <div className="font-light text-neutral-500">
                    • Drag nodes to reposition
                  </div>
                  <div className="font-light text-neutral-500">
                    • Connect handles to create flows
                  </div>
                  <div className="font-light text-neutral-500">
                    • Select and press Delete to remove
                  </div>
                  <div className="font-light text-neutral-500">
                    • Hold Shift for multi-select
                  </div>
                  <div className="mt-3 border-t border-neutral-200 pt-3">
                    <div className="mb-1 font-medium tracking-tight text-neutral-900">
                      Stats
                    </div>
                    <div className="font-light text-neutral-500">
                      Nodes: {nodes.length}
                    </div>
                    <div className="font-light text-neutral-500">
                      Connections: {edges.length}
                    </div>
                  </div>
                </div>
              </Panel>
            </ReactFlow>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-6 border border-neutral-200 bg-white p-6">
          <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
            Pipeline Statistics
          </div>
          <div className="grid grid-cols-2 gap-px border border-neutral-200 bg-neutral-200 sm:grid-cols-3">
            <div className="bg-neutral-50 p-4 text-center">
              <div className="text-xl font-medium tracking-tight text-neutral-900 sm:text-2xl">
                {nodes.length}
              </div>
              <div className="mt-1 text-xs text-neutral-500">Total Nodes</div>
            </div>
            <div className="bg-neutral-50 p-4 text-center">
              <div className="text-xl font-medium tracking-tight text-neutral-900 sm:text-2xl">
                {edges.length}
              </div>
              <div className="mt-1 text-xs text-neutral-500">Connections</div>
            </div>
            <div className="bg-neutral-50 p-4 text-center sm:col-span-1 col-span-2">
              <div className="flex items-center justify-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                <span className="text-xs text-neutral-500">Ready</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
