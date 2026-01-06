"use client";

import { useState } from "react";

import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { H3, BodySmall } from "@/components/ui/typography";

type ContextItemType =
  | "system"
  | "user-message"
  | "assistant-message"
  | "tool-result"
  | "memory"
  | "function-call";

type ContextItem = {
  id: string;
  type: ContextItemType;
  label: string;
  tokenCount: number;
  startToken: number;
  endToken: number;
  summary: string;
  isInWindow: boolean;
};

type ContextSnapshot = {
  step: number;
  timestamp: number;
  totalTokens: number;
  windowStart: number;
  windowEnd: number;
  maxContextSize: number;
  items: ContextItem[];
};

const MAX_CONTEXT_SIZE = 128000; // GPT-4 Turbo context window

const CONTEXT_SNAPSHOTS: ContextSnapshot[] = [
  {
    step: 0,
    timestamp: 0,
    totalTokens: 2500,
    windowStart: 0,
    windowEnd: 2500,
    maxContextSize: MAX_CONTEXT_SIZE,
    items: [
      {
        id: "sys-1",
        type: "system",
        label: "System Prompt",
        tokenCount: 800,
        startToken: 0,
        endToken: 800,
        summary: "Core instructions, role definitions, and guardrails",
        isInWindow: true,
      },
      {
        id: "user-1",
        type: "user-message",
        label: "User: Initial Request",
        tokenCount: 120,
        startToken: 800,
        endToken: 920,
        summary: "User asks: 'Summarize this PDF and compare to latest news.'",
        isInWindow: true,
      },
      {
        id: "mem-1",
        type: "memory",
        label: "Retrieved Memory",
        tokenCount: 1580,
        startToken: 920,
        endToken: 2500,
        summary: "Previous conversation context (3 turns)",
        isInWindow: true,
      },
    ],
  },
  {
    step: 1,
    timestamp: 1100,
    totalTokens: 4500,
    windowStart: 0,
    windowEnd: 4500,
    maxContextSize: MAX_CONTEXT_SIZE,
    items: [
      {
        id: "sys-1",
        type: "system",
        label: "System Prompt",
        tokenCount: 800,
        startToken: 0,
        endToken: 800,
        summary: "Core instructions, role definitions, and guardrails",
        isInWindow: true,
      },
      {
        id: "user-1",
        type: "user-message",
        label: "User: Initial Request",
        tokenCount: 120,
        startToken: 800,
        endToken: 920,
        summary: "User asks: 'Summarize this PDF and compare to latest news.'",
        isInWindow: true,
      },
      {
        id: "tool-1",
        type: "tool-result",
        label: "Tool: PDF Extraction",
        tokenCount: 2800,
        startToken: 920,
        endToken: 3720,
        summary: "Extracted text chunks from PDF (15 pages)",
        isInWindow: true,
      },
      {
        id: "mem-1",
        type: "memory",
        label: "Retrieved Memory",
        tokenCount: 780,
        startToken: 3720,
        endToken: 4500,
        summary: "Previous conversation context (2 turns)",
        isInWindow: true,
      },
    ],
  },
  {
    step: 2,
    timestamp: 2200,
    totalTokens: 8200,
    windowStart: 0,
    windowEnd: 8200,
    maxContextSize: MAX_CONTEXT_SIZE,
    items: [
      {
        id: "sys-1",
        type: "system",
        label: "System Prompt",
        tokenCount: 800,
        startToken: 0,
        endToken: 800,
        summary: "Core instructions, role definitions, and guardrails",
        isInWindow: true,
      },
      {
        id: "user-1",
        type: "user-message",
        label: "User: Initial Request",
        tokenCount: 120,
        startToken: 800,
        endToken: 920,
        summary: "User asks: 'Summarize this PDF and compare to latest news.'",
        isInWindow: true,
      },
      {
        id: "tool-1",
        type: "tool-result",
        label: "Tool: PDF Extraction",
        tokenCount: 2800,
        startToken: 920,
        endToken: 3720,
        summary: "Extracted text chunks from PDF (15 pages)",
        isInWindow: true,
      },
      {
        id: "tool-2",
        type: "tool-result",
        label: "Tool: Web Search Results",
        tokenCount: 3200,
        startToken: 3720,
        endToken: 6920,
        summary: "Top 10 news articles matching query",
        isInWindow: true,
      },
      {
        id: "mem-1",
        type: "memory",
        label: "Retrieved Memory",
        tokenCount: 1280,
        startToken: 6920,
        endToken: 8200,
        summary: "Previous conversation context (4 turns)",
        isInWindow: true,
      },
    ],
  },
  {
    step: 3,
    timestamp: 4000,
    totalTokens: 12500,
    windowStart: 0,
    windowEnd: 12500,
    maxContextSize: MAX_CONTEXT_SIZE,
    items: [
      {
        id: "sys-1",
        type: "system",
        label: "System Prompt",
        tokenCount: 800,
        startToken: 0,
        endToken: 800,
        summary: "Core instructions, role definitions, and guardrails",
        isInWindow: true,
      },
      {
        id: "user-1",
        type: "user-message",
        label: "User: Initial Request",
        tokenCount: 120,
        startToken: 800,
        endToken: 920,
        summary: "User asks: 'Summarize this PDF and compare to latest news.'",
        isInWindow: true,
      },
      {
        id: "tool-1",
        type: "tool-result",
        label: "Tool: PDF Extraction",
        tokenCount: 2800,
        startToken: 920,
        endToken: 3720,
        summary: "Extracted text chunks from PDF (15 pages)",
        isInWindow: true,
      },
      {
        id: "tool-2",
        type: "tool-result",
        label: "Tool: Web Search Results",
        tokenCount: 3200,
        startToken: 3720,
        endToken: 6920,
        summary: "Top 10 news articles matching query",
        isInWindow: true,
      },
      {
        id: "assistant-1",
        type: "assistant-message",
        label: "Assistant: Analysis",
        tokenCount: 1800,
        startToken: 6920,
        endToken: 8720,
        summary: "Initial analysis and comparison draft",
        isInWindow: true,
      },
      {
        id: "mem-1",
        type: "memory",
        label: "Retrieved Memory",
        tokenCount: 3780,
        startToken: 8720,
        endToken: 12500,
        summary: "Previous conversation context (6 turns)",
        isInWindow: true,
      },
    ],
  },
  {
    step: 4,
    timestamp: 5500,
    totalTokens: 18500,
    windowStart: 1700,
    windowEnd: 18500,
    maxContextSize: MAX_CONTEXT_SIZE,
    items: [
      {
        id: "sys-1",
        type: "system",
        label: "System Prompt",
        tokenCount: 800,
        startToken: 0,
        endToken: 800,
        summary: "Core instructions, role definitions, and guardrails",
        isInWindow: false,
      },
      {
        id: "user-1",
        type: "user-message",
        label: "User: Initial Request",
        tokenCount: 120,
        startToken: 800,
        endToken: 920,
        summary: "User asks: 'Summarize this PDF and compare to latest news.'",
        isInWindow: false,
      },
      {
        id: "tool-1",
        type: "tool-result",
        label: "Tool: PDF Extraction",
        tokenCount: 2800,
        startToken: 920,
        endToken: 3720,
        summary: "Extracted text chunks from PDF (15 pages)",
        isInWindow: false,
      },
      {
        id: "tool-2",
        type: "tool-result",
        label: "Tool: Web Search Results",
        tokenCount: 3200,
        startToken: 3720,
        endToken: 6920,
        summary: "Top 10 news articles matching query",
        isInWindow: true,
      },
      {
        id: "assistant-1",
        type: "assistant-message",
        label: "Assistant: Analysis",
        tokenCount: 1800,
        startToken: 6920,
        endToken: 8720,
        summary: "Initial analysis and comparison draft",
        isInWindow: true,
      },
      {
        id: "tool-3",
        type: "tool-result",
        label: "Tool: Vector Search",
        tokenCount: 4200,
        startToken: 8720,
        endToken: 12920,
        summary: "Semantic search results from knowledge base",
        isInWindow: true,
      },
      {
        id: "mem-1",
        type: "memory",
        label: "Retrieved Memory",
        tokenCount: 5580,
        startToken: 12920,
        endToken: 18500,
        summary: "Previous conversation context (8 turns)",
        isInWindow: true,
      },
    ],
  },
];

function getItemColor(type: ContextItemType) {
  switch (type) {
    case "system":
      return "bg-neutral-400";
    case "user-message":
      return "bg-emerald-500";
    case "assistant-message":
      return "bg-(--brand-blue)";
    case "tool-result":
      return "bg-amber-500";
    case "memory":
      return "bg-purple-500";
    case "function-call":
      return "bg-rose-500";
    default:
      return "bg-neutral-300";
  }
}

function getItemLabel(type: ContextItemType) {
  switch (type) {
    case "system":
      return "System";
    case "user-message":
      return "User";
    case "assistant-message":
      return "Assistant";
    case "tool-result":
      return "Tool";
    case "memory":
      return "Memory";
    case "function-call":
      return "Function";
    default:
      return "Unknown";
  }
}

export default function ContextWindowPage() {
  const [selectedSnapshot, setSelectedSnapshot] =
    useState<ContextSnapshot | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const maxTokens = Math.max(
    ...CONTEXT_SNAPSHOTS.map((s) => s.totalTokens),
    MAX_CONTEXT_SIZE,
  );

  const tokenToPercent = (tokens: number) => {
    return Math.min(100, (tokens / maxTokens) * 100);
  };

  const selectedData = selectedSnapshot || CONTEXT_SNAPSHOTS[0];
  const utilizationPercent =
    (selectedData.totalTokens / selectedData.maxContextSize) * 100;

  return (
    <section className="relative z-10 bg-white py-16 sm:py-24">
      <Container>
        <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-neutral-200 pb-6 sm:mb-16 sm:gap-6 sm:pb-8 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="02 / Context Window"
            title="Token context timeline visualization."
            description={
              <>
                See exactly what the model could "see" at each step. Visualize
                sliding context windows, token utilization, and which memories
                were in or out of scope.
              </>
            }
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          {/* Context Window Visualization */}
          <div className="border border-neutral-200 bg-white">
            <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-3 sm:px-6">
              <div className="flex items-center justify-between">
                <BodySmall className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                  Context window evolution
                </BodySmall>
                <BodySmall className="text-neutral-400">
                  Click a step to inspect context contents.
                </BodySmall>
              </div>
            </div>

            <div className="overflow-x-auto px-4 pb-6 pt-4 sm:px-6 sm:pb-8">
              {/* Step selector */}
              <div className="mb-6 flex gap-2">
                {CONTEXT_SNAPSHOTS.map((snapshot) => {
                  const isSelected = selectedSnapshot?.step === snapshot.step;
                  return (
                    <button
                      key={snapshot.step}
                      type="button"
                      onClick={() =>
                        setSelectedSnapshot(
                          isSelected ? null : snapshot,
                        )
                      }
                      className={`rounded-sm border px-3 py-1.5 text-xs font-medium transition-colors ${
                        isSelected
                          ? "border-neutral-900 bg-neutral-900 text-white"
                          : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                      }`}
                    >
                      Step {snapshot.step}
                      <span className="ml-2 text-[10px] opacity-70">
                        {(snapshot.timestamp / 1000).toFixed(1)}s
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Context window visualization */}
              <div className="space-y-4">
                {/* Max context size indicator */}
                <div className="relative">
                  <div className="mb-2 flex items-center justify-between text-[10px] text-neutral-500">
                    <span>Context Window</span>
                    <span>
                      {selectedData.totalTokens.toLocaleString()} /{" "}
                      {selectedData.maxContextSize.toLocaleString()} tokens (
                      {utilizationPercent.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="relative h-8 w-full border border-neutral-300 bg-neutral-100">
                    {/* Max size indicator */}
                    <div
                      className="absolute inset-y-0 right-0 border-l border-dashed border-neutral-400"
                      style={{
                        width: `${tokenToPercent(MAX_CONTEXT_SIZE)}%`,
                      }}
                    />
                    {/* Current usage */}
                    <div
                      className="absolute inset-y-0 left-0 bg-neutral-300"
                      style={{
                        width: `${tokenToPercent(selectedData.totalTokens)}%`,
                      }}
                    />
                    {/* Utilization bar */}
                    <div
                      className={`absolute inset-y-0 left-0 ${
                        utilizationPercent > 90
                          ? "bg-red-500"
                          : utilizationPercent > 70
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                      }`}
                      style={{
                        width: `${tokenToPercent(selectedData.totalTokens)}%`,
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-[9px] font-medium text-neutral-700">
                      {utilizationPercent.toFixed(1)}% utilized
                    </div>
                  </div>
                </div>

                {/* Context items */}
                <div className="space-y-2">
                  <div className="mb-2 text-[10px] font-medium uppercase tracking-widest text-neutral-500">
                    Context Contents
                  </div>
                  {selectedData.items.map((item) => {
                    const leftPercent = tokenToPercent(item.startToken);
                    const widthPercent =
                      tokenToPercent(item.endToken) - leftPercent;
                    const isHovered = hoveredItem === item.id;
                    const isInWindow =
                      item.startToken >= selectedData.windowStart &&
                      item.endToken <= selectedData.windowEnd;

                    return (
                      <div
                        key={item.id}
                        className="relative"
                        onMouseEnter={() => setHoveredItem(item.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <div className="mb-1 flex items-center justify-between text-[10px]">
                          <div className="flex items-center gap-2">
                            <span
                              className={`inline-block h-2 w-2 rounded-full ${getItemColor(
                                item.type,
                              )}`}
                            />
                            <span className="font-medium text-neutral-700">
                              {item.label}
                            </span>
                            {!isInWindow && (
                              <span className="rounded-sm border border-neutral-300 bg-neutral-100 px-1 text-[9px] text-neutral-500">
                                Out of window
                              </span>
                            )}
                          </div>
                          <span className="text-neutral-500">
                            {item.tokenCount.toLocaleString()} tokens
                          </span>
                        </div>
                        <div className="relative h-6 w-full border border-neutral-200 bg-neutral-50">
                          <div
                            className={`absolute inset-y-0 ${getItemColor(
                              item.type,
                            )} ${
                              isInWindow
                                ? "opacity-80"
                                : "opacity-30"
                            } transition-opacity ${
                              isHovered ? "opacity-100 ring-2 ring-offset-1" : ""
                            }`}
                            style={{
                              left: `${leftPercent}%`,
                              width: `${widthPercent}%`,
                            }}
                          />
                          <div className="absolute inset-0 flex items-center px-2 text-[9px] text-neutral-600">
                            {item.summary}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-6 grid grid-cols-3 gap-2 border-t border-neutral-200 pt-4">
                  {(
                    [
                      "system",
                      "user-message",
                      "assistant-message",
                      "tool-result",
                      "memory",
                    ] as ContextItemType[]
                  ).map((type) => (
                    <div
                      key={type}
                      className="flex items-center gap-2 text-[10px]"
                    >
                      <span
                        className={`inline-block h-2 w-2 rounded-full ${getItemColor(
                          type,
                        )}`}
                      />
                      <span className="text-neutral-600">
                        {getItemLabel(type)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Details Panel */}
          <div className="space-y-4">
            <div className="sticky top-4 border border-neutral-200 bg-white p-6">
              {selectedSnapshot ? (
                <>
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                        Context snapshot
                      </div>
                      <H3 className="mb-1 text-sm">
                        Step {selectedSnapshot.step} •{" "}
                        {(selectedSnapshot.timestamp / 1000).toFixed(2)}s
                      </H3>
                      <BodySmall className="text-neutral-500">
                        Context window state at this execution step
                      </BodySmall>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedSnapshot(null)}
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
                        Total Tokens
                      </div>
                      <BodySmall className="text-neutral-800">
                        {selectedSnapshot.totalTokens.toLocaleString()}
                      </BodySmall>
                    </div>
                    <div className="bg-neutral-50 p-3">
                      <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-neutral-500">
                        Utilization
                      </div>
                      <BodySmall className="text-neutral-800">
                        {utilizationPercent.toFixed(1)}%
                      </BodySmall>
                    </div>
                  </div>

                  <div className="mb-3 rounded-sm border border-neutral-200 bg-neutral-50 p-4">
                    <div className="mb-2 font-mono text-[9px] uppercase tracking-widest text-neutral-500">
                      Window Range
                    </div>
                    <BodySmall className="text-neutral-700">
                      Tokens {selectedSnapshot.windowStart.toLocaleString()} -{" "}
                      {selectedSnapshot.windowEnd.toLocaleString()}
                    </BodySmall>
                  </div>

                  <div className="rounded-sm border border-neutral-200 bg-neutral-50 p-4">
                    <div className="mb-2 font-mono text-[9px] uppercase tracking-widest text-neutral-500">
                      Context Items
                    </div>
                    <div className="space-y-2">
                      {selectedSnapshot.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-start justify-between gap-2 border-b border-neutral-200 pb-2 last:border-0 last:pb-0"
                        >
                          <div className="flex-1">
                            <div className="mb-1 flex items-center gap-2">
                              <span
                                className={`inline-block h-1.5 w-1.5 rounded-full ${getItemColor(
                                  item.type,
                                )}`}
                              />
                              <span className="text-[10px] font-medium text-neutral-800">
                                {getItemLabel(item.type)}
                              </span>
                            </div>
                            <BodySmall className="text-neutral-600">
                              {item.summary}
                            </BodySmall>
                          </div>
                          <div className="text-right">
                            <BodySmall className="text-[10px] text-neutral-500">
                              {item.tokenCount.toLocaleString()}
                            </BodySmall>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="mb-3 text-3xl">🔍</div>
                  <BodySmall className="mb-1 font-medium text-neutral-900">
                    Select a step to inspect context contents.
                  </BodySmall>
                  <BodySmall className="text-neutral-500">
                    Use this panel to see exactly what tokens were visible to
                    the model at each execution step, including system prompts,
                    messages, tool results, and retrieved memories.
                  </BodySmall>
                </div>
              )}
            </div>

            <div className="border border-neutral-200 bg-white p-4">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                Context statistics
              </div>
              <div className="grid grid-cols-2 gap-px border border-neutral-200 bg-neutral-200">
                <div className="bg-neutral-50 p-3 text-center">
                  <div className="text-xl font-medium tracking-tight text-neutral-900">
                    {CONTEXT_SNAPSHOTS.length}
                  </div>
                  <BodySmall className="text-neutral-500">Steps</BodySmall>
                </div>
                <div className="bg-neutral-50 p-3 text-center">
                  <div className="text-xl font-medium tracking-tight text-neutral-900">
                    {MAX_CONTEXT_SIZE.toLocaleString()}
                  </div>
                  <BodySmall className="text-neutral-500">Max Context</BodySmall>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


