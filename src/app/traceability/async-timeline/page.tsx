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
    color: "#3b82f6",
    details: 'Searched for "latest AI developments 2024"',
  },
  {
    id: "task-2",
    name: "Database Query",
    agent: "Data Agent",
    startTime: 500,
    duration: 2000,
    status: "completed",
    color: "#8b5cf6",
    details: "Retrieved user preferences from PostgreSQL",
  },
  {
    id: "task-3",
    name: "Code Execution",
    agent: "Code Agent",
    startTime: 1000,
    duration: 4000,
    status: "completed",
    color: "#06b6d4",
    details: "Executed Python script for data transformation",
  },
  {
    id: "task-4",
    name: "Vector Search",
    agent: "RAG Agent",
    startTime: 0,
    duration: 2500,
    status: "completed",
    color: "#f59e0b",
    details: "Semantic search in knowledge base (1.2M vectors)",
  },
  {
    id: "task-5",
    name: "LLM Generation",
    agent: "Main Agent",
    startTime: 3500,
    duration: 2500,
    status: "completed",
    color: "#ef4444",
    details: "GPT-4 generation with retrieved context",
  },
  {
    id: "task-6",
    name: "API Call - Weather",
    agent: "External Agent",
    startTime: 2000,
    duration: 1500,
    status: "completed",
    color: "#10b981",
    details: "Fetched weather data from OpenWeatherMap",
  },
  {
    id: "task-7",
    name: "Memory Update",
    agent: "Memory Agent",
    startTime: 5000,
    duration: 1000,
    status: "completed",
    color: "#ec4899",
    details: "Updated conversation history in Redis",
  },
  {
    id: "task-8",
    name: "Image Processing",
    agent: "Vision Agent",
    startTime: 1500,
    duration: 3000,
    status: "completed",
    color: "#14b8a6",
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
    <section className="relative z-10 bg-white py-16 sm:py-24">
      <Container>
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-neutral-200 pb-6 sm:mb-16 sm:gap-6 sm:pb-8 md:flex-row md:items-end">
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
                  ? "bg-neutral-900 text-white border-neutral-900"
                  : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50"
              }`}
            >
              {showCriticalPath ? "✓ Critical Path" : "Show Critical Path"}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-2 gap-px border border-neutral-200 bg-neutral-200 md:grid-cols-4">
          <div className="bg-white p-4 sm:p-6">
            <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-neutral-500 sm:text-[10px]">
              Total Duration
            </div>
            <div className="text-xl font-medium tracking-tighter text-neutral-900 sm:text-2xl md:text-3xl">
              {formatTime(TOTAL_DURATION)}
            </div>
          </div>
          <div className="bg-white p-4 sm:p-6">
            <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-neutral-500 sm:text-[10px]">
              Parallel Tasks
            </div>
            <div className="text-xl font-medium tracking-tighter text-neutral-900 sm:text-2xl md:text-3xl">
              {MOCK_TIMELINE_DATA.length}
            </div>
          </div>
          <div className="bg-white p-4 sm:p-6">
            <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-neutral-500 sm:text-[10px]">
              Agents Used
            </div>
            <div className="text-xl font-medium tracking-tighter text-neutral-900 sm:text-2xl md:text-3xl">
              {agents.length}
            </div>
          </div>
          <div className="bg-white p-4 sm:p-6">
            <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-neutral-500 sm:text-[10px]">
              Avg Task Time
            </div>
            <div className="text-xl font-medium tracking-tighter text-neutral-900 sm:text-2xl md:text-3xl">
              {formatTime(
                MOCK_TIMELINE_DATA.reduce((sum, t) => sum + t.duration, 0) /
                  MOCK_TIMELINE_DATA.length
              )}
            </div>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="bg-white border border-neutral-200 overflow-hidden">
          {/* Timeline Header with Time Markers */}
          <div className="border-b border-neutral-200 bg-neutral-50 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                Timeline View
              </span>
              <span className="text-xs text-neutral-400">
                Hover over tasks for details • Click to inspect
              </span>
            </div>
            <div className="relative h-8 mt-4">
              {[0, 1, 2, 3, 4, 5, 6].map((second) => (
                <div
                  key={second}
                  className="absolute top-0 h-full border-l border-neutral-200"
                  style={{ left: `${(second / 6) * 100}%` }}
                >
                  <span className="absolute -top-1 -left-2 font-mono text-xs text-neutral-400">
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
                      <BodySmall className="text-neutral-400">
                        {agentTasks.length} tasks
                      </BodySmall>
                    </div>
                  </div>

                  {/* Task Lane */}
                  <div className="relative h-16 bg-neutral-50 rounded-sm border border-neutral-200">
                    {/* Grid lines */}
                    {[0, 1, 2, 3, 4, 5, 6].map((second) => (
                      <div
                        key={second}
                        className="absolute top-0 h-full border-l border-neutral-200"
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
                              ? "ring-2 ring-neutral-900 shadow-lg z-10"
                              : "hover:shadow-md hover:z-10"
                          } ${
                            isCritical
                              ? "ring-2 ring-neutral-900 animate-pulse"
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
                          <div className="h-full px-3 flex items-center justify-between text-white">
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
          <div className="mt-6 bg-white border border-neutral-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-4 h-4 rounded-sm"
                    style={{ backgroundColor: selectedTask.color }}
                  />
                  <H3 className="mb-0">{selectedTask.name}</H3>
                  <span className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs font-medium rounded-sm border border-neutral-200">
                    {selectedTask.status}
                  </span>
                </div>
                <BodySmall>{selectedTask.agent}</BodySmall>
              </div>
              <button
                onClick={() => setSelectedTask(null)}
                className="text-neutral-400 hover:text-neutral-600 transition-colors"
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

            <div className="grid grid-cols-3 gap-px border border-neutral-200 bg-neutral-200 mb-4">
              <div className="bg-neutral-50 p-3 border-r border-neutral-200 last:border-r-0">
                <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-neutral-500">
                  Start Time
                </div>
                <div className="text-lg font-medium tracking-tight text-neutral-900">
                  {formatTime(selectedTask.startTime)}
                </div>
              </div>
              <div className="bg-neutral-50 p-3 border-r border-neutral-200 last:border-r-0">
                <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-neutral-500">
                  Duration
                </div>
                <div className="text-lg font-medium tracking-tight text-neutral-900">
                  {formatTime(selectedTask.duration)}
                </div>
              </div>
              <div className="bg-neutral-50 p-3 border-r border-neutral-200 last:border-r-0">
                <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-neutral-500">
                  End Time
                </div>
                <div className="text-lg font-medium tracking-tight text-neutral-900">
                  {formatTime(selectedTask.startTime + selectedTask.duration)}
                </div>
              </div>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 rounded-sm p-4">
              <div className="text-xs font-medium text-neutral-900 mb-2">
                Task Details
              </div>
              <BodySmall className="text-neutral-600">
                {selectedTask.details}
              </BodySmall>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="mt-6 bg-white border border-neutral-200 p-6">
          <h3 className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mb-4">
            Legend
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {MOCK_TIMELINE_DATA.map((task) => (
              <div key={task.id} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: task.color }}
                />
                <BodySmall className="text-neutral-600">{task.name}</BodySmall>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <BodySmall className="text-neutral-400">
            This Gantt-style timeline shows parallel execution across agents.
            Tasks running simultaneously reveal concurrency patterns and
            potential bottlenecks.
          </BodySmall>
        </div>
      </Container>
    </section>
  );
}
