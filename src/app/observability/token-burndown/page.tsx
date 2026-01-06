"use client";

import { useState } from "react";

import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { H3, BodySmall } from "@/components/ui/typography";

type TokenUsage = {
  id: string;
  timestamp: number; // Unix timestamp
  agent: string;
  operation: string;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  cost: number; // USD
  conversationId?: string;
};

const TIME_PERIODS = [
  { label: "Last Hour", hours: 1 },
  { label: "Last 6 Hours", hours: 6 },
  { label: "Last 24 Hours", hours: 24 },
  { label: "Last 7 Days", hours: 168 },
];

// Generate mock data for the last 24 hours
const generateMockData = (): TokenUsage[] => {
  const now = Date.now();
  const data: TokenUsage[] = [];
  const agents = [
    "Router Agent",
    "Research Agent",
    "Answer Agent",
    "Tool Agent",
  ];
  const operations = [
    "LLM Inference",
    "RAG Retrieval",
    "Context Loading",
    "Response Generation",
  ];

  for (let i = 0; i < 48; i++) {
    const timestamp = now - (47 - i) * 30 * 60 * 1000; // Every 30 minutes
    const agent = agents[Math.floor(Math.random() * agents.length)];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    const inputTokens = Math.floor(Math.random() * 2000) + 500;
    const outputTokens = Math.floor(Math.random() * 1000) + 200;
    const totalTokens = inputTokens + outputTokens;
    const cost = (inputTokens * 0.00003 + outputTokens * 0.00006).toFixed(6);

    data.push({
      id: `usage-${i}`,
      timestamp,
      agent,
      operation,
      inputTokens,
      outputTokens,
      totalTokens,
      cost: parseFloat(cost),
      conversationId: `conv-${Math.floor(i / 4)}`,
    });
  }

  return data;
};

const TOKEN_DATA = generateMockData();
const TOTAL_TOKENS = TOKEN_DATA.reduce((sum, d) => sum + d.totalTokens, 0);
const TOTAL_COST = TOKEN_DATA.reduce((sum, d) => sum + d.cost, 0);

// Group data by time buckets for visualization
const groupByTimeBucket = (data: TokenUsage[], bucketMinutes: number = 30) => {
  const buckets: Map<number, TokenUsage[]> = new Map();
  const now = Date.now();

  data.forEach((entry) => {
    const bucketTime =
      Math.floor(entry.timestamp / (bucketMinutes * 60 * 1000)) *
      (bucketMinutes * 60 * 1000);
    if (!buckets.has(bucketTime)) {
      buckets.set(bucketTime, []);
    }
    buckets.get(bucketTime)!.push(entry);
  });

  return Array.from(buckets.entries())
    .map(([time, entries]) => ({
      time,
      totalTokens: entries.reduce((sum, e) => sum + e.totalTokens, 0),
      inputTokens: entries.reduce((sum, e) => sum + e.inputTokens, 0),
      outputTokens: entries.reduce((sum, e) => sum + e.outputTokens, 0),
      cost: entries.reduce((sum, e) => sum + e.cost, 0),
      count: entries.length,
      entries,
    }))
    .sort((a, b) => a.time - b.time);
};

const BUCKETED_DATA = groupByTimeBucket(TOKEN_DATA);
const MAX_TOKENS = Math.max(...BUCKETED_DATA.map((b) => b.totalTokens));
const TIME_RANGE = BUCKETED_DATA[BUCKETED_DATA.length - 1].time - BUCKETED_DATA[0].time;

function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function formatTokens(tokens: number): string {
  if (tokens >= 1000000) return `${(tokens / 1000000).toFixed(1)}M`;
  if (tokens >= 1000) return `${(tokens / 1000).toFixed(1)}K`;
  return tokens.toString();
}

function formatCost(cost: number): string {
  return `$${cost.toFixed(4)}`;
}

export default function TokenBurndownPage() {
  const [selectedBucket, setSelectedBucket] = useState<typeof BUCKETED_DATA[0] | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState(TIME_PERIODS[2]);

  const timeToPercent = (timestamp: number) => {
    const start = BUCKETED_DATA[0].time;
    const end = BUCKETED_DATA[BUCKETED_DATA.length - 1].time;
    return ((timestamp - start) / (end - start)) * 100;
  };

  const tokensToPercent = (tokens: number) => {
    return (tokens / MAX_TOKENS) * 100;
  };

  return (
    <section className="relative z-10 bg-white py-16 sm:py-24">
      <Container>
        <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-neutral-200 pb-6 sm:mb-16 sm:gap-6 sm:pb-8 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="03 / Token Burndown"
            title="Token usage tracking and cost analysis."
            description={
              <>
                Monitor token consumption across agents, conversations, and time
                periods. Track usage patterns, optimize costs, and identify
                opportunities for efficiency improvements.
              </>
            }
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          {/* Burndown Chart */}
          <div className="border border-neutral-200 bg-white">
            <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-3 sm:px-6">
              <div className="flex items-center justify-between">
                <BodySmall className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                  Token consumption over time
                </BodySmall>
                <div className="flex gap-2">
                  {TIME_PERIODS.map((period) => (
                    <button
                      key={period.label}
                      type="button"
                      onClick={() => setSelectedPeriod(period)}
                      className={`rounded-sm border px-2 py-1 text-[10px] font-medium transition-colors ${
                        selectedPeriod.label === period.label
                          ? "border-neutral-300 bg-white text-neutral-900"
                          : "border-neutral-200 bg-neutral-50 text-neutral-500 hover:bg-neutral-100"
                      }`}
                    >
                      {period.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto px-4 pb-6 pt-6 sm:px-6 sm:pb-8">
              <div className="min-w-[600px]">
                {/* Y-axis labels */}
                <div className="mb-4 flex items-start justify-between border-b border-neutral-200 pb-2">
                  <div className="flex flex-col gap-1 text-[10px] text-neutral-400">
                    {[1, 0.75, 0.5, 0.25, 0].map((ratio) => (
                      <span key={ratio}>
                        {formatTokens(MAX_TOKENS * ratio)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Chart area */}
                <div className="relative mb-4">
                  <div className="relative h-64">
                    {/* Grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between">
                      {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
                        <div
                          key={ratio}
                          className="h-px border-t border-dashed border-neutral-200"
                          style={{ marginTop: ratio === 0 ? 0 : "-1px" }}
                        />
                      ))}
                    </div>

                    {/* Bars */}
                    <div className="relative flex h-full items-end gap-1">
                      {BUCKETED_DATA.map((bucket, index) => {
                        const heightPercent = tokensToPercent(bucket.totalTokens);
                        const isSelected = selectedBucket?.time === bucket.time;

                        return (
                          <button
                            key={bucket.time}
                            type="button"
                            onClick={() =>
                              setSelectedBucket(
                                isSelected ? null : bucket,
                              )
                            }
                            className={`group relative flex-1 transition-all duration-150 ${
                              isSelected
                                ? "ring-2 ring-offset-1 ring-offset-white ring-neutral-400"
                                : "hover:opacity-90"
                            }`}
                            title={`${formatTime(bucket.time)}: ${formatTokens(bucket.totalTokens)} tokens`}
                          >
                            <div
                              className="w-full rounded-t-sm bg-gradient-to-t from-blue-600 to-blue-500 shadow-sm"
                              style={{ height: `${heightPercent}%` }}
                            >
                              <div className="absolute -top-5 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-sm border border-neutral-200 bg-white px-2 py-1 text-[9px] shadow-sm group-hover:block">
                                {formatTokens(bucket.totalTokens)}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* X-axis labels */}
                <div className="flex justify-between border-t border-neutral-200 pt-2">
                  {[
                    BUCKETED_DATA[0],
                    BUCKETED_DATA[Math.floor(BUCKETED_DATA.length / 4)],
                    BUCKETED_DATA[Math.floor(BUCKETED_DATA.length / 2)],
                    BUCKETED_DATA[Math.floor((BUCKETED_DATA.length * 3) / 4)],
                    BUCKETED_DATA[BUCKETED_DATA.length - 1],
                  ].map((bucket) => (
                    <div
                      key={bucket.time}
                      className="flex flex-col items-center text-[10px] text-neutral-400"
                    >
                      <span>{formatTime(bucket.time)}</span>
                      <span className="text-[9px]">{formatDate(bucket.time)}</span>
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-neutral-200 pt-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                    Token types:
                  </span>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="h-3 w-3 rounded-sm bg-blue-500" />
                    <span className="text-neutral-600">Total Tokens</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details panel */}
          <div className="space-y-4">
            <div className="sticky top-4 border border-neutral-200 bg-white p-6">
              {selectedBucket ? (
                <>
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                        Time period
                      </div>
                      <H3 className="mb-1 text-sm">
                        {formatTime(selectedBucket.time)}
                      </H3>
                      <BodySmall className="text-neutral-500">
                        {formatDate(selectedBucket.time)}
                      </BodySmall>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedBucket(null)}
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
                        {formatTokens(selectedBucket.totalTokens)}
                      </BodySmall>
                    </div>
                    <div className="bg-neutral-50 p-3">
                      <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-neutral-500">
                        Cost
                      </div>
                      <BodySmall className="text-neutral-800">
                        {formatCost(selectedBucket.cost)}
                      </BodySmall>
                    </div>
                  </div>

                  <div className="mb-3 grid grid-cols-2 gap-px border border-neutral-200 bg-neutral-200">
                    <div className="bg-neutral-50 p-3">
                      <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-neutral-500">
                        Input Tokens
                      </div>
                      <BodySmall className="text-neutral-800">
                        {formatTokens(selectedBucket.inputTokens)}
                      </BodySmall>
                    </div>
                    <div className="bg-neutral-50 p-3">
                      <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-neutral-500">
                        Output Tokens
                      </div>
                      <BodySmall className="text-neutral-800">
                        {formatTokens(selectedBucket.outputTokens)}
                      </BodySmall>
                    </div>
                  </div>

                  <div className="rounded-sm border border-neutral-200 bg-neutral-50 p-4">
                    <div className="mb-2 font-mono text-[9px] uppercase tracking-widest text-neutral-500">
                      Operations ({selectedBucket.count})
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {selectedBucket.entries.slice(0, 5).map((entry) => (
                        <div
                          key={entry.id}
                          className="rounded-sm border border-neutral-200 bg-white p-2"
                        >
                          <div className="mb-1 text-xs font-medium text-neutral-900">
                            {entry.agent}
                          </div>
                          <div className="text-[10px] text-neutral-500">
                            {entry.operation}
                          </div>
                          <div className="mt-1 flex justify-between text-[9px] text-neutral-600">
                            <span>{formatTokens(entry.totalTokens)} tokens</span>
                            <span>{formatCost(entry.cost)}</span>
                          </div>
                        </div>
                      ))}
                      {selectedBucket.entries.length > 5 && (
                        <div className="text-center text-[10px] text-neutral-400">
                          +{selectedBucket.entries.length - 5} more
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="mb-3 text-3xl">📊</div>
                  <BodySmall className="mb-1 font-medium text-neutral-900">
                    Select a time period to inspect token usage.
                  </BodySmall>
                  <BodySmall className="text-neutral-500">
                    Click on any bar in the chart to view detailed token
                    consumption, costs, and operations for that time period.
                  </BodySmall>
                </div>
              )}
            </div>

            <div className="border border-neutral-200 bg-white p-4">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                Overall statistics
              </div>
              <div className="grid grid-cols-2 gap-px border border-neutral-200 bg-neutral-200">
                <div className="bg-neutral-50 p-3 text-center">
                  <div className="text-xl font-medium tracking-tight text-neutral-900">
                    {formatTokens(TOTAL_TOKENS)}
                  </div>
                  <BodySmall className="text-neutral-500">
                    Total Tokens
                  </BodySmall>
                </div>
                <div className="bg-neutral-50 p-3 text-center">
                  <div className="text-xl font-medium tracking-tight text-neutral-900">
                    {formatCost(TOTAL_COST)}
                  </div>
                  <BodySmall className="text-neutral-500">
                    Total Cost
                  </BodySmall>
                </div>
                <div className="bg-neutral-50 p-3 text-center">
                  <div className="text-xl font-medium tracking-tight text-neutral-900">
                    {TOKEN_DATA.length}
                  </div>
                  <BodySmall className="text-neutral-500">
                    Operations
                  </BodySmall>
                </div>
                <div className="bg-neutral-50 p-3 text-center">
                  <div className="text-xl font-medium tracking-tight text-neutral-900">
                    {formatTokens(Math.floor(TOTAL_TOKENS / TOKEN_DATA.length))}
                  </div>
                  <BodySmall className="text-neutral-500">
                    Avg/Operation
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

