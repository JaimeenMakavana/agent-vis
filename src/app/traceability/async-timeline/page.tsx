"use client";
import { useState } from "react";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { H3, BodySmall, Eyebrow } from "@/components/ui/typography";

// Mock data representing parallel tool execution
const MOCK_TIMELINE_DATA = [
  {
    id: "task-1",
    name: "Web Search",
    agent: "Research Agent",
    startTime: 0,
    duration: 3500,
    status: "completed",
    color: "var(--light-blue-500)",
    details: 'Searched for "latest AI developments 2024"',
  },
  {
    id: "task-2",
    name: "Database Query",
    agent: "Data Agent",
    startTime: 500,
    duration: 2000,
    status: "completed",
    color: "var(--light-purple-500)",
    details: "Retrieved user preferences from PostgreSQL",
  },
  {
    id: "task-3",
    name: "Code Execution",
    agent: "Code Agent",
    startTime: 1000,
    duration: 4000,
    status: "completed",
    color: "var(--light-cyan-500)",
    details: "Executed Python script for data transformation",
  },
  {
    id: "task-4",
    name: "Vector Search",
    agent: "RAG Agent",
    startTime: 0,
    duration: 2500,
    status: "completed",
    color: "var(--light-amber-500)",
    details: "Semantic search in knowledge base (1.2M vectors)",
  },
  {
    id: "task-5",
    name: "LLM Generation",
    agent: "Main Agent",
    startTime: 3500,
    duration: 2500,
    status: "completed",
    color: "var(--light-red-500)",
    details: "GPT-4 generation with retrieved context",
  },
  {
    id: "task-6",
    name: "API Call - Weather",
    agent: "External Agent",
    startTime: 2000,
    duration: 1500,
    status: "completed",
    color: "var(--light-green-500)",
    details: "Fetched weather data from OpenWeatherMap",
  },
  {
    id: "task-7",
    name: "Memory Update",
    agent: "Memory Agent",
    startTime: 5000,
    duration: 1000,
    status: "completed",
    color: "var(--light-rose-500)",
    details: "Updated conversation history in Redis",
  },
  {
    id: "task-8",
    name: "Image Processing",
    agent: "Vision Agent",
    startTime: 1500,
    duration: 3000,
    status: "completed",
    color: "var(--light-emerald-500)",
    details: "OCR and object detection on uploaded image",
  },
];

const TOTAL_DURATION = 6000;

type Task = (typeof MOCK_TIMELINE_DATA)[number];

export default function AsyncTimelinePage() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showCriticalPath, setShowCriticalPath] = useState(false);

  // Group tasks by agent for swimlane layout
  const agents = [...new Set(MOCK_TIMELINE_DATA.map((t) => t.agent))];

  const formatTime = (ms: number) => {
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const getTaskPosition = (startTime: number) => {
    return (startTime / TOTAL_DURATION) * 100;
  };

  const getTaskWidth = (duration: number) => {
    return (duration / TOTAL_DURATION) * 100;
  };

  return (
    <section className="relative z-10 bg-[var(--background)] py-16 sm:py-24">
      <Container>
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-[var(--brand-border-subtle)] pb-6 sm:mb-16 sm:gap-6 sm:pb-8 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="03 / Async Timeline"
            title="Parallel Execution Timeline"
            description={
              <>
                Visualize concurrent operations across multiple agents. Identify
                bottlenecks, critical paths, and optimization opportunities in
                your agentic workflow.
              </>
            }
          />
          <div className="flex gap-2">
            <button
              onClick={() => setShowCriticalPath(!showCriticalPath)}
              className={`px-4 py-2 rounded-sm text-xs font-medium tracking-wide transition-colors border ${
                showCriticalPath
                  ? "bg-[var(--brand-surface)] text-[var(--background)] border-[var(--brand-surface)]"
                  : "bg-[var(--background)] text-[var(--foreground)] border-[var(--brand-border-subtle)] hover:bg-[var(--brand-surface-soft)]"
              }`}
            >
              {showCriticalPath ? "✓ Critical Path" : "Show Critical Path"}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-2 gap-px border border-[var(--brand-border-subtle)] bg-[var(--brand-border-subtle)] md:grid-cols-4">
          <div className="bg-[var(--background)] p-4 sm:p-6">
            <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-[var(--brand-muted)] sm:text-[10px]">
              Total Duration
            </div>
            <div className="text-xl font-medium tracking-tighter text-[var(--foreground)] sm:text-2xl md:text-3xl">
              {formatTime(TOTAL_DURATION)}
            </div>
          </div>
          <div className="bg-[var(--background)] p-4 sm:p-6">
            <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-[var(--brand-muted)] sm:text-[10px]">
              Parallel Tasks
            </div>
            <div className="text-xl font-medium tracking-tighter text-[var(--foreground)] sm:text-2xl md:text-3xl">
              {MOCK_TIMELINE_DATA.length}
            </div>
          </div>
          <div className="bg-[var(--background)] p-4 sm:p-6">
            <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-[var(--brand-muted)] sm:text-[10px]">
              Agents Used
            </div>
            <div className="text-xl font-medium tracking-tighter text-[var(--foreground)] sm:text-2xl md:text-3xl">
              {agents.length}
            </div>
          </div>
          <div className="bg-[var(--background)] p-4 sm:p-6">
            <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-[var(--brand-muted)] sm:text-[10px]">
              Avg Task Time
            </div>
            <div className="text-xl font-medium tracking-tighter text-[var(--foreground)] sm:text-2xl md:text-3xl">
              {formatTime(
                MOCK_TIMELINE_DATA.reduce((sum, t) => sum + t.duration, 0) /
                  MOCK_TIMELINE_DATA.length
              )}
            </div>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="bg-[var(--background)] border border-[var(--brand-border-subtle)] overflow-hidden">
          {/* Timeline Header with Time Markers */}
          <div className="border-b border-[var(--brand-border-subtle)] bg-[var(--brand-surface-soft)] p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--brand-muted)]">
                Timeline View
              </span>
              <span className="text-xs text-[var(--brand-muted)]">
                Hover over tasks for details • Click to inspect
              </span>
            </div>
            <div className="relative h-8 mt-4">
              {[0, 1, 2, 3, 4, 5, 6].map((second) => (
                <div
                  key={second}
                  className="absolute top-0 h-full border-l border-[var(--brand-border-subtle)]"
                  style={{ left: `${(second / 6) * 100}%` }}
                >
                  <span className="absolute -top-1 -left-2 font-mono text-xs text-[var(--brand-muted)]">
                    {second}s
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Swimlanes */}
          <div className="p-6">
            {agents.map((agent) => {
              const agentTasks = MOCK_TIMELINE_DATA.filter(
                (t) => t.agent === agent
              );

              return (
                <div key={agent} className="mb-6 last:mb-0">
                  {/* Agent Label */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-40 shrink-0">
                      <H3 className="mb-0">{agent}</H3>
                      <BodySmall className="text-[var(--brand-muted)]">
                        {agentTasks.length} tasks
                      </BodySmall>
                    </div>
                  </div>

                  {/* Task Lane */}
                  <div className="relative h-16 bg-[var(--brand-surface-soft)] rounded-sm border border-[var(--brand-border-subtle)]">
                    {/* Grid lines */}
                    {[0, 1, 2, 3, 4, 5, 6].map((second) => (
                      <div
                        key={second}
                        className="absolute top-0 h-full border-l border-[var(--brand-border-subtle)]"
                        style={{ left: `${(second / 6) * 100}%` }}
                      />
                    ))}

                    {/* Tasks */}
                    {agentTasks.map((task) => {
                      const isSelected = selectedTask?.id === task.id;
                      const isCritical =
                        showCriticalPath &&
                        (task.id === "task-3" || task.id === "task-5");

                      return (
                        <div
                          key={task.id}
                          className={`absolute top-2 h-12 rounded-sm cursor-pointer transition-all duration-200 ${
                            isSelected
                              ? "ring-2 ring-[var(--brand-surface)] shadow-lg z-10"
                              : "hover:shadow-md hover:z-10"
                          } ${
                            isCritical
                              ? "ring-2 ring-[var(--brand-surface)] animate-pulse"
                              : ""
                          }`}
                          style={{
                            left: `${getTaskPosition(task.startTime)}%`,
                            width: `${getTaskWidth(task.duration)}%`,
                            backgroundColor: task.color,
                            opacity: isSelected ? 1 : 0.9,
                          }}
                          onClick={() => setSelectedTask(task)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.02)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                          }}
                        >
                          <div className="h-full px-3 flex items-center justify-between text-[var(--background)]">
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-semibold truncate">
                                {task.name}
                              </div>
                              <div className="text-[10px] opacity-90">
                                {formatTime(task.duration)}
                              </div>
                            </div>
                            {isCritical && (
                              <span className="ml-2 text-xs">⚠️</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Task Details Panel */}
        {selectedTask && (
          <div className="mt-6 bg-[var(--background)] border border-[var(--brand-border-subtle)] p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-4 h-4 rounded-sm"
                    style={{ backgroundColor: selectedTask.color }}
                  />
                  <H3 className="mb-0">{selectedTask.name}</H3>
                  <span className="px-2 py-1 bg-[var(--brand-surface-soft)] text-[var(--foreground)] text-xs font-medium rounded-sm border border-[var(--brand-border-subtle)]">
                    {selectedTask.status}
                  </span>
                </div>
                <BodySmall>{selectedTask.agent}</BodySmall>
              </div>
              <button
                onClick={() => setSelectedTask(null)}
                className="text-[var(--brand-muted)] hover:text-[var(--foreground)] transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
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

            <div className="grid grid-cols-3 gap-px border border-[var(--brand-border-subtle)] bg-[var(--brand-border-subtle)] mb-4">
              <div className="bg-[var(--brand-surface-soft)] p-3 border-r border-[var(--brand-border-subtle)] last:border-r-0">
                <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-[var(--brand-muted)]">
                  Start Time
                </div>
                <div className="text-lg font-medium tracking-tight text-[var(--foreground)]">
                  {formatTime(selectedTask.startTime)}
                </div>
              </div>
              <div className="bg-[var(--brand-surface-soft)] p-3 border-r border-[var(--brand-border-subtle)] last:border-r-0">
                <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-[var(--brand-muted)]">
                  Duration
                </div>
                <div className="text-lg font-medium tracking-tight text-[var(--foreground)]">
                  {formatTime(selectedTask.duration)}
                </div>
              </div>
              <div className="bg-[var(--brand-surface-soft)] p-3 border-r border-[var(--brand-border-subtle)] last:border-r-0">
                <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-[var(--brand-muted)]">
                  End Time
                </div>
                <div className="text-lg font-medium tracking-tight text-[var(--foreground)]">
                  {formatTime(selectedTask.startTime + selectedTask.duration)}
                </div>
              </div>
            </div>

            <div className="bg-[var(--brand-surface-soft)] border border-[var(--brand-border-subtle)] rounded-sm p-4">
              <div className="text-xs font-medium text-[var(--foreground)] mb-2">
                Task Details
              </div>
              <BodySmall className="text-[var(--brand-muted)]">
                {selectedTask.details}
              </BodySmall>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="mt-6 bg-[var(--background)] border border-[var(--brand-border-subtle)] p-6">
          <h3 className="font-mono text-[10px] uppercase tracking-widest text-[var(--brand-muted)] mb-4">
            Legend
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {MOCK_TIMELINE_DATA.map((task) => (
              <div key={task.id} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: task.color }}
                />
                <BodySmall className="text-[var(--brand-muted)]">
                  {task.name}
                </BodySmall>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <BodySmall className="text-[var(--brand-muted)]">
            This Gantt-style timeline shows parallel execution across agents.
            Tasks running simultaneously reveal concurrency patterns and
            potential bottlenecks.
          </BodySmall>
        </div>
      </Container>
    </section>
  );
}
