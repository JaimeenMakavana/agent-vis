"use client";
import { useCallback, useState } from "react";
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

// Custom node component
function PipelineNode({ data, selected }: NodeProps<PipelineNodeData>) {
  return (
    <div
      className={`min-w-[200px] rounded-lg border-2 ${data.color} ${
        selected ? "ring-2 ring-blue-400" : ""
      } bg-white px-4 py-3 shadow-lg transition-all duration-200 hover:shadow-xl`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="truncate text-sm font-semibold text-gray-800">
          {data.label}
        </span>
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wide text-gray-600">
          {data.type}
        </span>
      </div>
      {data.description && (
        <p className="text-xs text-gray-600 leading-relaxed">
          {data.description}
        </p>
      )}

      <Handle
        type="target"
        position={Position.Left}
        className="!h-3 !w-3 !bg-blue-500 !border-2 !border-white"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!h-3 !w-3 !bg-green-500 !border-2 !border-white"
      />
      <Handle
        type="target"
        position={Position.Top}
        className="!h-3 !w-3 !bg-blue-500 !border-2 !border-white"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-3 !w-3 !bg-green-500 !border-2 !border-white"
      />
    </div>
  );
}

const nodeTypes = { pipeline: PipelineNode };

export default function InteractiveToolsCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState<
    Node<PipelineNodeData>
  >([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodeIdCounter, setNodeIdCounter] = useState(1);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            type: "smoothstep",
            animated: true,
            style: { stroke: "#3b82f6", strokeWidth: 2 },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  const addNode = (toolType: string) => {
    const tool = TOOL_TYPES.find((t) => t.id === toolType);
    if (!tool) return;

    const newNode = {
      id: `${toolType}-${nodeIdCounter}`,
      type: "pipeline" as const,
      position: {
        x: Math.random() * 400 + 100,
        y: Math.random() * 300 + 100,
      },
      data: {
        label: tool.label,
        type: tool.type,
        color: tool.color,
        description: `${tool.label} component for processing`,
      } satisfies PipelineNodeData,
    } satisfies Node<PipelineNodeData>;

    setNodes((nds) => [...nds, newNode] as typeof nds);
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
    <div className="h-screen w-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Agent Pipeline Builder
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Drag tools onto the canvas and connect them to build your AI
              workflow
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleDeleteSelected}
              className="px-4 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
            >
              Delete Selected
            </button>
            <button
              onClick={handleClear}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Canvas
            </button>
          </div>
        </div>
      </div>

      {/* Tool Palette */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-2">
            Tools Palette
          </span>
          {TOOL_TYPES.map((tool) => (
            <button
              key={tool.id}
              onClick={() => addNode(tool.id)}
              className={`${tool.color} px-4 py-2 rounded-lg border-2 text-sm font-medium text-gray-700 hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95`}
            >
              + {tool.label}
            </button>
          ))}
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 relative">
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
            color="#e5e7eb"
          />
          <Controls className="bg-white shadow-lg rounded-lg border border-gray-200" />
          <MiniMap
            className="bg-white shadow-lg rounded-lg border border-gray-200"
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
              return colors[node.data.color] || "#f3f4f6";
            }}
          />

          <Panel
            position="top-right"
            className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 m-4"
          >
            <div className="text-xs space-y-2">
              <div className="font-semibold text-gray-700 mb-2">
                Instructions
              </div>
              <div className="text-gray-600">
                • Click tools above to add nodes
              </div>
              <div className="text-gray-600">• Drag nodes to reposition</div>
              <div className="text-gray-600">
                • Connect handles to create flows
              </div>
              <div className="text-gray-600">
                • Select and press Delete to remove
              </div>
              <div className="text-gray-600">• Hold Shift for multi-select</div>
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="font-semibold text-gray-700 mb-1">Stats</div>
                <div className="text-gray-600">Nodes: {nodes.length}</div>
                <div className="text-gray-600">Connections: {edges.length}</div>
              </div>
            </div>
          </Panel>
        </ReactFlow>
      </div>

      {/* Status Bar */}
      <div className="bg-white border-t border-gray-200 px-6 py-2">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-4">
            <span>🎨 Drag nodes to arrange your pipeline</span>
            <span>•</span>
            <span>🔗 Connect output (green) to input (blue) handles</span>
            <span>•</span>
            <span>⌫ Select nodes/edges and press Delete to remove</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span>Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}
