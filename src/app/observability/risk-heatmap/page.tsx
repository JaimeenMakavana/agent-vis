"use client";

import { useState } from "react";

import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { H3, BodySmall } from "@/components/ui/typography";

type RiskLevel = "low" | "medium" | "high" | "critical";

type RiskCategory =
  | "security"
  | "performance"
  | "reliability"
  | "data-privacy"
  | "cost";

type RiskEntry = {
  id: string;
  operation: string;
  category: RiskCategory;
  level: RiskLevel;
  score: number; // 0-100
  description: string;
  mitigation?: string;
  lastAssessed?: string;
};

const RISK_CATEGORIES: RiskCategory[] = [
  "security",
  "performance",
  "reliability",
  "data-privacy",
  "cost",
];

const OPERATIONS = [
  "User Input Handler",
  "Agent Router",
  "LLM Orchestrator",
  "RAG Retrieval",
  "Tool Execution",
  "Memory Management",
  "Response Formatter",
  "External API Calls",
];

const RISK_DATA: RiskEntry[] = [
  {
    id: "user-input-security",
    operation: "User Input Handler",
    category: "security",
    level: "medium",
    score: 45,
    description: "Input validation and sanitization risks",
    mitigation: "Implement strict input validation and rate limiting",
    lastAssessed: "2024-01-15",
  },
  {
    id: "user-input-performance",
    operation: "User Input Handler",
    category: "performance",
    level: "low",
    score: 20,
    description: "Minimal performance impact",
    lastAssessed: "2024-01-15",
  },
  {
    id: "router-security",
    operation: "Agent Router",
    category: "security",
    level: "high",
    score: 75,
    description: "Routing logic could be exploited for privilege escalation",
    mitigation: "Add authentication checks and route validation",
    lastAssessed: "2024-01-14",
  },
  {
    id: "router-reliability",
    operation: "Agent Router",
    category: "reliability",
    level: "medium",
    score: 55,
    description: "Single point of failure in routing logic",
    mitigation: "Implement fallback routing and circuit breakers",
    lastAssessed: "2024-01-14",
  },
  {
    id: "llm-security",
    operation: "LLM Orchestrator",
    category: "security",
    level: "critical",
    score: 90,
    description: "Prompt injection and data leakage risks",
    mitigation: "Implement prompt sanitization and output filtering",
    lastAssessed: "2024-01-13",
  },
  {
    id: "llm-cost",
    operation: "LLM Orchestrator",
    category: "cost",
    level: "high",
    score: 80,
    description: "High token usage and API costs",
    mitigation: "Optimize prompts and implement caching",
    lastAssessed: "2024-01-13",
  },
  {
    id: "rag-data-privacy",
    operation: "RAG Retrieval",
    category: "data-privacy",
    level: "high",
    score: 70,
    description: "Sensitive data in vector embeddings",
    mitigation: "Implement data masking and access controls",
    lastAssessed: "2024-01-12",
  },
  {
    id: "rag-performance",
    operation: "RAG Retrieval",
    category: "performance",
    level: "medium",
    score: 50,
    description: "Vector search latency can be slow",
    mitigation: "Optimize index and implement caching",
    lastAssessed: "2024-01-12",
  },
  {
    id: "tool-security",
    operation: "Tool Execution",
    category: "security",
    level: "critical",
    score: 95,
    description: "Unrestricted tool execution poses security risks",
    mitigation: "Implement tool allowlist and sandboxing",
    lastAssessed: "2024-01-11",
  },
  {
    id: "tool-reliability",
    operation: "Tool Execution",
    category: "reliability",
    level: "high",
    score: 65,
    description: "External tool failures can cascade",
    mitigation: "Add retries, timeouts, and error handling",
    lastAssessed: "2024-01-11",
  },
  {
    id: "memory-data-privacy",
    operation: "Memory Management",
    category: "data-privacy",
    level: "critical",
    score: 85,
    description: "Conversation history may contain sensitive data",
    mitigation: "Implement encryption and data retention policies",
    lastAssessed: "2024-01-10",
  },
  {
    id: "response-security",
    operation: "Response Formatter",
    category: "security",
    level: "low",
    score: 30,
    description: "Low security risk in formatting",
    lastAssessed: "2024-01-09",
  },
  {
    id: "api-reliability",
    operation: "External API Calls",
    category: "reliability",
    level: "high",
    score: 70,
    description: "Dependency on external services",
    mitigation: "Implement circuit breakers and fallbacks",
    lastAssessed: "2024-01-08",
  },
  {
    id: "api-cost",
    operation: "External API Calls",
    category: "cost",
    level: "medium",
    score: 55,
    description: "API usage costs can accumulate",
    mitigation: "Monitor usage and implement rate limiting",
    lastAssessed: "2024-01-08",
  },
];

function riskLevelColor(level: RiskLevel): string {
  switch (level) {
    case "low":
      return "bg-emerald-500";
    case "medium":
      return "bg-amber-500";
    case "high":
      return "bg-orange-500";
    case "critical":
      return "bg-red-600";
    default:
      return "bg-neutral-300";
  }
}

function riskLevelBg(level: RiskLevel): string {
  switch (level) {
    case "low":
      return "bg-emerald-50 border-emerald-200";
    case "medium":
      return "bg-amber-50 border-amber-200";
    case "high":
      return "bg-orange-50 border-orange-200";
    case "critical":
      return "bg-red-50 border-red-200";
    default:
      return "bg-neutral-50 border-neutral-200";
  }
}

function riskIntensity(score: number): string {
  if (score >= 80) return "opacity-100";
  if (score >= 60) return "opacity-90";
  if (score >= 40) return "opacity-75";
  return "opacity-60";
}

function getRiskEntry(
  operation: string,
  category: RiskCategory,
): RiskEntry | null {
  return (
    RISK_DATA.find(
      (r) => r.operation === operation && r.category === category,
    ) || null
  );
}

export default function RiskHeatmapPage() {
  const [selectedRisk, setSelectedRisk] = useState<RiskEntry | null>(null);

  return (
    <section className="relative z-10 bg-white py-16 sm:py-24">
      <Container>
        <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-neutral-200 pb-6 sm:mb-16 sm:gap-6 sm:pb-8 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="02 / Risk Heatmap"
            title="Risk assessment visualization matrix."
            description={
              <>
                Visualize risk levels across agent operations and categories.
                Identify high-risk areas, security concerns, and potential failure
                points in your system.
              </>
            }
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          {/* Heatmap */}
          <div className="border border-neutral-200 bg-white">
            <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-3 sm:px-6">
              <div className="flex items-center justify-between">
                <BodySmall className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                  Risk matrix
                </BodySmall>
                <BodySmall className="text-neutral-400">
                  Click any cell to inspect risk details.
                </BodySmall>
              </div>
            </div>

            <div className="overflow-x-auto px-4 pb-6 pt-6 sm:px-6 sm:pb-8">
              <div className="min-w-[700px]">
                {/* Header row */}
                <div className="mb-4 grid grid-cols-[180px_repeat(5,1fr)] gap-2">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                    Operation
                  </div>
                  {RISK_CATEGORIES.map((cat) => (
                    <div
                      key={cat}
                      className="text-center font-mono text-[10px] uppercase tracking-widest text-neutral-500"
                    >
                      {cat.replace("-", " ")}
                    </div>
                  ))}
                </div>

                {/* Data rows */}
                <div className="space-y-2">
                  {OPERATIONS.map((operation) => (
                    <div
                      key={operation}
                      className="grid grid-cols-[180px_repeat(5,1fr)] gap-2"
                    >
                      <div className="flex items-center text-xs font-medium text-neutral-900">
                        {operation}
                      </div>
                      {RISK_CATEGORIES.map((category) => {
                        const risk = getRiskEntry(operation, category);
                        const isSelected =
                          selectedRisk?.id === risk?.id;
                        const isEmpty = !risk;

                        return (
                          <button
                            key={`${operation}-${category}`}
                            type="button"
                            onClick={() =>
                              setSelectedRisk(risk && !isSelected ? risk : null)
                            }
                            disabled={isEmpty}
                            className={`group relative flex h-12 items-center justify-center rounded-sm border transition-all duration-150 ${
                              isEmpty
                                ? "border-neutral-100 bg-neutral-50"
                                : `border-neutral-200 ${riskLevelColor(
                                    risk.level,
                                  )} ${riskIntensity(risk.score)} ${
                                    isSelected
                                      ? "ring-2 ring-offset-1 ring-offset-white ring-neutral-400"
                                      : "hover:opacity-100 hover:shadow-sm"
                                    }`
                            }`}
                            title={
                              risk
                                ? `${risk.level.toUpperCase()}: ${risk.score}/100`
                                : "No risk data"
                            }
                          >
                            {risk && (
                              <>
                                <span className="text-[10px] font-semibold text-white">
                                  {risk.score}
                                </span>
                                <div
                                  className={`absolute inset-0 flex items-center justify-center rounded-sm border-2 ${riskLevelBg(
                                    risk.level,
                                  )} opacity-0 transition-opacity group-hover:opacity-100 ${
                                    isSelected ? "opacity-100" : ""
                                  }`}
                                >
                                  <span className="text-[9px] font-medium uppercase tracking-wider text-neutral-700">
                                    {risk.level}
                                  </span>
                                </div>
                              </>
                            )}
                            {isEmpty && (
                              <span className="text-[9px] text-neutral-300">
                                —
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-neutral-200 pt-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                    Risk levels:
                  </span>
                  {(["low", "medium", "high", "critical"] as RiskLevel[]).map(
                    (level) => (
                      <div
                        key={level}
                        className="flex items-center gap-2 text-xs"
                      >
                        <div
                          className={`h-4 w-4 rounded-sm ${riskLevelColor(
                            level,
                          )}`}
                        />
                        <span className="capitalize text-neutral-600">
                          {level}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Details panel */}
          <div className="space-y-4">
            <div className="sticky top-4 border border-neutral-200 bg-white p-6">
              {selectedRisk ? (
                <>
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                        Risk details
                      </div>
                      <H3 className="mb-1 text-sm">{selectedRisk.operation}</H3>
                      <div
                        className={`mt-2 inline-flex rounded-sm border px-2 py-1 text-[10px] font-medium uppercase tracking-wider ${riskLevelBg(
                          selectedRisk.level,
                        )}`}
                      >
                        {selectedRisk.level} risk
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedRisk(null)}
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
                        Category
                      </div>
                      <BodySmall className="capitalize text-neutral-800">
                        {selectedRisk.category.replace("-", " ")}
                      </BodySmall>
                    </div>
                    <div className="bg-neutral-50 p-3">
                      <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-neutral-500">
                        Risk Score
                      </div>
                      <BodySmall className="text-neutral-800">
                        {selectedRisk.score}/100
                      </BodySmall>
                    </div>
                  </div>

                  <div className="mb-3 rounded-sm border border-neutral-200 bg-neutral-50 p-4">
                    <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-neutral-500">
                      Description
                    </div>
                    <BodySmall className="text-neutral-700">
                      {selectedRisk.description}
                    </BodySmall>
                  </div>

                  {selectedRisk.mitigation && (
                    <div className="rounded-sm border border-emerald-200 bg-emerald-50 p-4">
                      <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-emerald-700">
                        Mitigation
                      </div>
                      <BodySmall className="text-emerald-800">
                        {selectedRisk.mitigation}
                      </BodySmall>
                    </div>
                  )}

                  {selectedRisk.lastAssessed && (
                    <div className="mt-3 text-[10px] text-neutral-400">
                      Last assessed: {selectedRisk.lastAssessed}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center">
                  <div className="mb-3 text-3xl">⚠️</div>
                  <BodySmall className="mb-1 font-medium text-neutral-900">
                    Select a risk cell to inspect details.
                  </BodySmall>
                  <BodySmall className="text-neutral-500">
                    Use this panel to view risk descriptions, mitigation
                    strategies, and assessment dates for each operation and
                    category.
                  </BodySmall>
                </div>
              )}
            </div>

            <div className="border border-neutral-200 bg-white p-4">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                Risk summary
              </div>
              <div className="grid grid-cols-2 gap-px border border-neutral-200 bg-neutral-200">
                <div className="bg-neutral-50 p-3 text-center">
                  <div className="text-xl font-medium tracking-tight text-neutral-900">
                    {RISK_DATA.length}
                  </div>
                  <BodySmall className="text-neutral-500">
                    Risk Entries
                  </BodySmall>
                </div>
                <div className="bg-neutral-50 p-3 text-center">
                  <div className="text-xl font-medium tracking-tight text-red-600">
                    {
                      RISK_DATA.filter((r) => r.level === "critical").length
                    }
                  </div>
                  <BodySmall className="text-neutral-500">
                    Critical
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

