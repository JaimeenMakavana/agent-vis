"use client";

import { useState } from "react";

import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { H3, BodySmall } from "@/components/ui/typography";

type OperationStage = {
  id: string;
  label: string;
  category: "network" | "processing" | "llm" | "tool" | "storage";
  startMs: number;
  durationMs: number;
  description: string;
  metadata?: Record<string, string>;
};

const OPERATIONS: OperationStage[] = [
  {
    id: "req-parse",
    label: "Request Parsing",
    category: "processing",
    startMs: 0,
    durationMs: 45,
    description: "Parse incoming request, validate payload, extract parameters",
    metadata: { "Payload Size": "2.3 KB", "Validation": "✓ Passed" },
  },
  {
    id: "agent-router",
    label: "Agent Routing",
    category: "processing",
    startMs: 45,
    durationMs: 120,
    description: "Determine which agent should handle the request based on intent",
    metadata: { "Route": "Research Agent", "Confidence": "0.92" },
  },
  {
    id: "context-load",
    label: "Context Loading",
    category: "storage",
    startMs: 165,
    durationMs: 85,
    description: "Load conversation history and relevant context from memory",
    metadata: { "Tokens Loaded": "1,240", "Memory Type": "Short-term" },
  },
  {
    id: "rag-retrieval",
    label: "RAG Retrieval",
    category: "storage",
    startMs: 250,
    durationMs: 320,
    description: "Retrieve relevant documents from knowledge base using vector search",
    metadata: { "Chunks Retrieved": "5", "Search Time": "280ms" },
  },
  {
    id: "llm-inference",
    label: "LLM Inference",
    category: "llm",
    startMs: 570,
    durationMs: 1850,
    description: "Generate response using GPT-4 with retrieved context",
    metadata: { "Model": "GPT-4", "Tokens Generated": "342", "Temperature": "0.7" },
  },
  {
    id: "tool-call-1",
    label: "Web Search Tool",
    category: "tool",
    startMs: 2420,
    durationMs: 680,
    description: "Execute web search API call for latest information",
    metadata: { "API": "SerpAPI", "Results": "10", "Status": "200 OK" },
  },
  {
    id: "tool-call-2",
    label: "Data Processing",
    category: "tool",
    startMs: 3100,
    durationMs: 240,
    description: "Process and filter search results",
    metadata: { "Items Processed": "10", "Filtered": "7" },
  },
  {
    id: "response-format",
    label: "Response Formatting",
    category: "processing",
    startMs: 3340,
    durationMs: 95,
    description: "Format final response with citations and structure",
    metadata: { "Citations": "3", "Format": "Markdown" },
  },
  {
    id: "response-send",
    label: "Response Transmission",
    category: "network",
    startMs: 3435,
    durationMs: 65,
    description: "Send formatted response back to client",
    metadata: { "Payload Size": "4.1 KB", "Compression": "gzip" },
  },
];

const TOTAL_DURATION_MS = 3500;

function categoryColor(category: OperationStage["category"]) {
  switch (category) {
    case "network":
      return "bg-blue-500";
    case "processing":
      return "bg-purple-500";
    case "llm":
      return "bg-rose-500";
    case "tool":
      return "bg-amber-500";
    case "storage":
      return "bg-emerald-500";
    default:
      return "bg-neutral-500";
  }
}

function categoryBadge(category: OperationStage["category"]) {
  switch (category) {
    case "network":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "processing":
      return "bg-purple-50 text-purple-700 border-purple-200";
    case "llm":
      return "bg-rose-50 text-rose-700 border-rose-200";
    case "tool":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "storage":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    default:
      return "bg-neutral-50 text-neutral-700 border-neutral-200";
  }
}

export default function LatencyWaterfallPage() {
  const [selectedOperation, setSelectedOperation] =
    useState<OperationStage | null>(null);

  const timeToPercent = (ms: number) =>
    Math.min(100, Math.max(0, (ms / TOTAL_DURATION_MS) * 100));

  const formatMs = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  return (
    <section className="relative z-10 bg-white py-16 sm:py-24">
      <Container>
        <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-neutral-200 pb-6 sm:mb-16 sm:gap-6 sm:pb-8 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="01 / Latency Waterfall"
            title="Request latency breakdown visualization."
            description={
              <>
                Inspect the timing breakdown of each operation in your agent
                request flow. Identify bottlenecks, optimize slow stages, and
                understand where time is spent.
              </>
            }
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          {/* Waterfall chart */}
          <div className="border border-neutral-200 bg-white">
            <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-3 sm:px-6">
              <div className="flex items-center justify-between">
                <BodySmall className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                  Latency waterfall
                </BodySmall>
                <BodySmall className="text-neutral-400">
                  Click any bar to inspect details.
                </BodySmall>
              </div>
            </div>

            <div className="overflow-x-auto px-4 pb-6 pt-6 sm:px-6 sm:pb-8">
              <div className="min-w-[600px]">
                {/* Timeline header */}
                <div className="mb-6 flex justify-between border-b border-neutral-200 pb-2">
                  {[0, 0.25, 0.5, 0.75, 1].map((t) => (
                    <div
                      key={t}
                      className="flex flex-col items-center text-[10px] text-neutral-400"
                    >
                      <span>{formatMs(TOTAL_DURATION_MS * t)}</span>
                    </div>
                  ))}
                </div>

                {/* Operations */}
                <div className="space-y-3">
                  {OPERATIONS.map((op) => {
                    const leftPercent = timeToPercent(op.startMs);
                    const widthPercent = timeToPercent(op.durationMs);
                    const isSelected = selectedOperation?.id === op.id;

                    return (
                      <button
                        key={op.id}
                        type="button"
                        onClick={() =>
                          setSelectedOperation(isSelected ? null : op)
                        }
                        className="group flex w-full items-center gap-4 text-left"
                      >
                        <div className="w-32 shrink-0">
                          <div className="text-xs font-medium text-neutral-900">
                            {op.label}
                          </div>
                          <div
                            className={`mt-1 inline-flex rounded-sm border px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-widest ${categoryBadge(
                              op.category,
                            )}`}
                          >
                            {op.category}
                          </div>
                        </div>

                        <div className="relative flex-1">
                          <div className="relative h-10">
                            {/* Background track */}
                            <div className="absolute inset-0 rounded-sm bg-neutral-100" />

                            {/* Operation bar */}
                            <div
                              className={`absolute top-1/2 h-6 -translate-y-1/2 rounded-sm ${categoryColor(
                                op.category,
                              )} shadow-sm transition-all duration-150 ${
                                isSelected
                                  ? "ring-2 ring-offset-1 ring-offset-white ring-neutral-400"
                                  : "opacity-90 group-hover:opacity-100"
                              }`}
                              style={{
                                left: `${leftPercent}%`,
                                width: `${widthPercent}%`,
                                minWidth: "4px",
                              }}
                            >
                              <div className="flex h-full items-center justify-between px-2 text-[10px] text-white">
                                <span className="truncate font-medium">
                                  {formatMs(op.durationMs)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Time axis */}
                <div className="pointer-events-none mt-6 flex justify-between border-t border-neutral-200 pt-2">
                  {[0, 0.25, 0.5, 0.75, 1].map((t) => (
                    <div
                      key={t}
                      className="flex flex-col items-center text-[10px] text-neutral-400"
                    >
                      <div className="h-3 w-px bg-neutral-200" />
                      <span className="mt-1">{formatMs(TOTAL_DURATION_MS * t)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Details panel */}
          <div className="space-y-4">
            <div className="sticky top-4 border border-neutral-200 bg-white p-6">
              {selectedOperation ? (
                <>
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                        Operation details
                      </div>
                      <H3 className="mb-1 text-sm">
                        {selectedOperation.label}
                      </H3>
                      <BodySmall className="text-neutral-500">
                        {selectedOperation.description}
                      </BodySmall>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedOperation(null)}
                      className="text-neutral-300 transition-colors hover:text-neutral-600"
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

                  <div className="mb-3 grid grid-cols-2 gap-px border border-neutral-200 bg-neutral-200">
                    <div className="bg-neutral-50 p-3">
                      <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-neutral-500">
                        Start Time
                      </div>
                      <BodySmall className="text-neutral-800">
                        {formatMs(selectedOperation.startMs)}
                      </BodySmall>
                    </div>
                    <div className="bg-neutral-50 p-3">
                      <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-neutral-500">
                        Duration
                      </div>
                      <BodySmall className="text-neutral-800">
                        {formatMs(selectedOperation.durationMs)}
                      </BodySmall>
                    </div>
                  </div>

                  {selectedOperation.metadata && (
                    <div className="rounded-sm border border-neutral-200 bg-neutral-50 p-4">
                      <div className="mb-2 font-mono text-[9px] uppercase tracking-widest text-neutral-500">
                        Metadata
                      </div>
                      <div className="space-y-1.5">
                        {Object.entries(selectedOperation.metadata).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="flex justify-between text-xs"
                            >
                              <span className="text-neutral-600">{key}:</span>
                              <span className="font-medium text-neutral-900">
                                {value}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center">
                  <div className="mb-3 text-3xl">⏱️</div>
                  <BodySmall className="mb-1 font-medium text-neutral-900">
                    Select an operation bar to inspect timing.
                  </BodySmall>
                  <BodySmall className="text-neutral-500">
                    Use this panel to view detailed timing information, metadata,
                    and performance characteristics for each stage.
                  </BodySmall>
                </div>
              )}
            </div>

            <div className="border border-neutral-200 bg-white p-4">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                Request statistics
              </div>
              <div className="grid grid-cols-3 gap-px border border-neutral-200 bg-neutral-200">
                <div className="bg-neutral-50 p-3 text-center">
                  <div className="text-xl font-medium tracking-tight text-neutral-900">
                    {OPERATIONS.length}
                  </div>
                  <BodySmall className="text-neutral-500">
                    Operations
                  </BodySmall>
                </div>
                <div className="bg-neutral-50 p-3 text-center">
                  <div className="text-xl font-medium tracking-tight text-neutral-900">
                    {formatMs(TOTAL_DURATION_MS)}
                  </div>
                  <BodySmall className="text-neutral-500">
                    Total Time
                  </BodySmall>
                </div>
                <div className="bg-neutral-50 p-3 text-center">
                  <div className="text-xl font-medium tracking-tight text-neutral-900">
                    {formatMs(
                      Math.max(...OPERATIONS.map((op) => op.durationMs)),
                    )}
                  </div>
                  <BodySmall className="text-neutral-500">
                    Slowest
                  </BodySmall>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

