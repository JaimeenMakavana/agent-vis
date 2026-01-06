"use client";

import { useState, useMemo } from "react";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { H3, BodySmall } from "@/components/ui/typography";

type TaskStatus = "pending" | "running" | "completed" | "blocked" | "waiting";

type SwimlaneTask = {
  id: string;
  name: string;
  lane: string;
  startTime: number;
  duration: number;
  status: TaskStatus;
  dependencies?: string[];
  color: string;
  details: string;
  agent?: string;
};

const SWIMLANE_TASKS: SwimlaneTask[] = [
  {
    id: "t1",
    name: "Request Parsing",
    lane: "Input Processing",
    startTime: 0,
    duration: 500,
    status: "completed",
    color: "#3b82f6",
    details: "Parse user request and extract intent",
    agent: "Gateway Agent",
  },
  {
    id: "t2",
    name: "Task Routing",
    lane: "Orchestration",
    startTime: 500,
    duration: 300,
    status: "completed",
    dependencies: ["t1"],
    color: "#8b5cf6",
    details: "Route task to appropriate agent swarm",
    agent: "Router Agent",
  },
  {
    id: "t3",
    name: "Data Fetch",
    lane: "Data Layer",
    startTime: 800,
    duration: 1200,
    status: "completed",
    dependencies: ["t2"],
    color: "#06b6d4",
    details: "Fetch required data from multiple sources",
    agent: "Data Agent",
  },
  {
    id: "t4",
    name: "Vector Search",
    lane: "Knowledge Layer",
    startTime: 800,
    duration: 1500,
    status: "completed",
    dependencies: ["t2"],
    color: "#f59e0b",
    details: "Semantic search in vector database",
    agent: "RAG Agent",
  },
  {
    id: "t5",
    name: "LLM Processing",
    lane: "Processing",
    startTime: 2000,
    duration: 2500,
    status: "completed",
    dependencies: ["t3", "t4"],
    color: "#ef4444",
    details: "Generate response using LLM with context",
    agent: "LLM Agent",
  },
  {
    id: "t6",
    name: "Validation",
    lane: "Quality Control",
    startTime: 4500,
    duration: 800,
    status: "completed",
    dependencies: ["t5"],
    color: "#10b981",
    details: "Validate output quality and safety",
    agent: "Validator Agent",
  },
  {
    id: "t7",
    name: "Format Response",
    lane: "Output Processing",
    startTime: 4500,
    duration: 600,
    status: "completed",
    dependencies: ["t5"],
    color: "#ec4899",
    details: "Format response for client consumption",
    agent: "Formatter Agent",
  },
  {
    id: "t8",
    name: "Final Assembly",
    lane: "Output Processing",
    startTime: 5100,
    duration: 400,
    status: "completed",
    dependencies: ["t6", "t7"],
    color: "#14b8a6",
    details: "Combine validated and formatted output",
    agent: "Assembler Agent",
  },
  {
    id: "t9",
    name: "Memory Update",
    lane: "Memory Layer",
    startTime: 5500,
    duration: 500,
    status: "completed",
    dependencies: ["t8"],
    color: "#a855f7",
    details: "Update conversation memory",
    agent: "Memory Agent",
  },
];

const TOTAL_DURATION = 6000;

type Swimlane = {
  name: string;
  tasks: SwimlaneTask[];
};

export default function SwimlanesPage() {
  const [selectedTask, setSelectedTask] = useState<SwimlaneTask | null>(null);
  const [showDependencies, setShowDependencies] = useState(true);
  const [highlightCriticalPath, setHighlightCriticalPath] = useState(false);

  // Group tasks by lane
  const swimlanes = useMemo(() => {
    const lanes = new Map<string, SwimlaneTask[]>();
    SWIMLANE_TASKS.forEach((task) => {
      if (!lanes.has(task.lane)) {
        lanes.set(task.lane, []);
      }
      lanes.get(task.lane)!.push(task);
    });

    return Array.from(lanes.entries()).map(([name, tasks]) => ({
      name,
      tasks: tasks.sort((a, b) => a.startTime - b.startTime),
    }));
  }, []);

  // Calculate critical path (longest path through dependencies)
  const criticalPathIds = useMemo(() => {
    if (!highlightCriticalPath) return new Set<string>();

    const path: string[] = [];
    const visited = new Set<string>();

    const findLongestPath = (taskId: string): number => {
      if (visited.has(taskId)) return 0;
      visited.add(taskId);

      const task = SWIMLANE_TASKS.find((t) => t.id === taskId);
      if (!task) return 0;

      const endTime = task.startTime + task.duration;
      const dependentTasks = SWIMLANE_TASKS.filter((t) =>
        t.dependencies?.includes(taskId)
      );

      if (dependentTasks.length === 0) {
        path.push(taskId);
        return endTime;
      }

      let maxEndTime = 0;
      let nextTaskId = "";

      dependentTasks.forEach((dep) => {
        const depEndTime = findLongestPath(dep.id);
        if (depEndTime > maxEndTime) {
          maxEndTime = depEndTime;
          nextTaskId = dep.id;
        }
      });

      if (nextTaskId) path.push(taskId);
      return Math.max(endTime, maxEndTime);
    };

    // Start from tasks with no dependencies
    const rootTasks = SWIMLANE_TASKS.filter(
      (t) => !t.dependencies || t.dependencies.length === 0
    );
    rootTasks.forEach((root) => findLongestPath(root.id));

    return new Set(path);
  }, [highlightCriticalPath]);

  const formatTime = (ms: number) => {
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const getTaskPosition = (startTime: number) => {
    return (startTime / TOTAL_DURATION) * 100;
  };

  const getTaskWidth = (duration: number) => {
    return (duration / TOTAL_DURATION) * 100;
  };

  const getTaskEndTime = (task: SwimlaneTask) => {
    return task.startTime + task.duration;
  };

  // Find dependency connections
  const getDependencyConnections = (task: SwimlaneTask) => {
    if (!task.dependencies || task.dependencies.length === 0) return [];

    return task.dependencies.map((depId) => {
      const depTask = SWIMLANE_TASKS.find((t) => t.id === depId);
      if (!depTask) return null;

      const depLaneIdx = swimlanes.findIndex((lane) =>
        lane.tasks.some((t) => t.id === depId)
      );
      const taskLaneIdx = swimlanes.findIndex((lane) =>
        lane.tasks.some((t) => t.id === task.id)
      );

      return {
        from: depTask,
        to: task,
        fromLane: depLaneIdx,
        toLane: taskLaneIdx,
      };
    });
  };

  const statusColors: Record<TaskStatus, string> = {
    pending: "bg-[var(--brand-border-subtle)]",
    running: "bg-yellow-500",
    completed: "bg-green-500",
    blocked: "bg-red-500",
    waiting: "bg-orange-400",
  };

  const statusLabels: Record<TaskStatus, string> = {
    pending: "Pending",
    running: "Running",
    completed: "Completed",
    blocked: "Blocked",
    waiting: "Waiting",
  };

  return (
    <section className="relative z-10 bg-[var(--background)] py-16 sm:py-24">
      <Container>
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-[var(--brand-border-subtle)] pb-6 sm:mb-16 sm:gap-6 sm:pb-8 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="03 / Swimlanes"
            title="Parallel execution lanes with dependencies."
            description={
              <>
                Monitor parallel agent execution across different lanes.
                Identify bottlenecks, dependencies, and synchronization points
                in multi-agent workflows.
              </>
            }
          />
          <div className="flex gap-2">
            <button
              onClick={() => setShowDependencies(!showDependencies)}
              className={`px-4 py-2 rounded-sm text-xs font-medium tracking-wide transition-colors border ${
                showDependencies
                  ? "bg-[var(--brand-surface)] text-[var(--foreground)] border-[var(--brand-surface)]"
                  : "bg-[var(--background)] text-[var(--foreground)] border-[var(--brand-border-subtle)] hover:bg-[var(--brand-surface-soft)]"
              }`}
            >
              {showDependencies ? "✓ Dependencies" : "Show Dependencies"}
            </button>
            <button
              onClick={() => setHighlightCriticalPath(!highlightCriticalPath)}
              className={`px-4 py-2 rounded-sm text-xs font-medium tracking-wide transition-colors border ${
                highlightCriticalPath
                  ? "bg-[var(--brand-surface)] text-[var(--foreground)] border-[var(--brand-surface)]"
                  : "bg-[var(--background)] text-[var(--foreground)] border-[var(--brand-border-subtle)] hover:bg-[var(--brand-surface-soft)]"
              }`}
            >
              {highlightCriticalPath ? "✓ Critical Path" : "Critical Path"}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-2 gap-px border border-[var(--brand-border-subtle)] bg-[var(--brand-border-subtle)] sm:grid-cols-4">
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
              Swimlanes
            </div>
            <div className="text-xl font-medium tracking-tighter text-[var(--foreground)] sm:text-2xl md:text-3xl">
              {swimlanes.length}
            </div>
          </div>
          <div className="bg-[var(--background)] p-4 sm:p-6">
            <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-[var(--brand-muted)] sm:text-[10px]">
              Total Tasks
            </div>
            <div className="text-xl font-medium tracking-tighter text-[var(--foreground)] sm:text-2xl md:text-3xl">
              {SWIMLANE_TASKS.length}
            </div>
          </div>
          <div className="bg-[var(--background)] p-4 sm:p-6">
            <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-[var(--brand-muted)] sm:text-[10px]">
              Dependencies
            </div>
            <div className="text-xl font-medium tracking-tighter text-[var(--foreground)] sm:text-2xl md:text-3xl">
              {
                SWIMLANE_TASKS.filter(
                  (t) => t.dependencies && t.dependencies.length > 0
                ).length
              }
            </div>
          </div>
        </div>

        {/* Swimlanes Container */}
        <div className="bg-[var(--background)] border border-[var(--brand-border-subtle)] overflow-hidden">
          {/* Timeline Header */}
          <div className="border-b border-[var(--brand-border-subtle)] bg-[var(--brand-surface-soft)] p-4">
            <div className="flex items-center justify-between mb-2">
              <BodySmall className="font-mono text-[10px] uppercase tracking-widest text-[var(--brand-muted)]">
                Swimlane View
              </BodySmall>
              <BodySmall className="text-[var(--brand-muted)]">
                Click tasks to inspect • Dependencies show task flow
              </BodySmall>
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
          <div className="relative p-6">
            {/* Dependency arrows overlay */}
            {showDependencies && (
              <svg
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: "100%",
                  height: "100%",
                }}
              >
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="3"
                    orient="auto"
                  >
                    <polygon
                      points="0 0, 10 3, 0 6"
                      fill="#8b5cf6"
                      opacity={0.6}
                    />
                  </marker>
                </defs>
                {SWIMLANE_TASKS.map((task) => {
                  const connections = getDependencyConnections(task);
                  return connections.map((conn, idx) => {
                    if (!conn) return null;

                    const fromLaneY = swimlanes
                      .slice(0, conn.fromLane)
                      .reduce((sum, lane) => sum + 120, 0);
                    const toLaneY = swimlanes
                      .slice(0, conn.toLane)
                      .reduce((sum, lane) => sum + 120, 0);

                    const containerWidth = 100; // percentage-based
                    const fromX =
                      (getTaskEndTime(conn.from) / TOTAL_DURATION) *
                      containerWidth;
                    const fromY = fromLaneY + 50;
                    const toX =
                      (conn.to.startTime / TOTAL_DURATION) * containerWidth;
                    const toY = toLaneY + 50;

                    const isCritical =
                      criticalPathIds.has(conn.from.id) &&
                      criticalPathIds.has(conn.to.id);

                    return (
                      <g key={`${task.id}-${idx}`}>
                        <path
                          d={`M ${fromX}% ${fromY} L ${toX}% ${toY}`}
                          stroke={isCritical ? "#ef4444" : "#8b5cf6"}
                          strokeWidth={isCritical ? 3 : 2}
                          strokeDasharray={isCritical ? "none" : "5,5"}
                          fill="none"
                          opacity={0.6}
                          markerEnd="url(#arrowhead)"
                        />
                      </g>
                    );
                  });
                })}
              </svg>
            )}

            {/* Swimlane rows */}
            {swimlanes.map((lane, laneIdx) => (
              <div key={lane.name} className="mb-8 last:mb-0 relative z-10">
                {/* Lane Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-48 shrink-0">
                    <H3 className="mb-0 text-sm">{lane.name}</H3>
                    <BodySmall className="text-[var(--brand-muted)]">
                      {lane.tasks.length} task
                      {lane.tasks.length !== 1 ? "s" : ""}
                    </BodySmall>
                  </div>
                </div>

                {/* Task Lane */}
                <div className="relative h-20 bg-[var(--brand-surface-soft)] rounded-sm border border-[var(--brand-border-subtle)]">
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4, 5, 6].map((second) => (
                    <div
                      key={second}
                      className="absolute top-0 h-full border-l border-[var(--brand-border-subtle)]"
                      style={{ left: `${(second / 6) * 100}%` }}
                    />
                  ))}

                  {/* Tasks */}
                  {lane.tasks.map((task) => {
                    const isSelected = selectedTask?.id === task.id;
                    const isCritical = criticalPathIds.has(task.id);
                    const isBlocked =
                      task.status === "blocked" ||
                      (task.dependencies &&
                        task.dependencies.some(
                          (depId) =>
                            SWIMLANE_TASKS.find((t) => t.id === depId)
                              ?.status !== "completed"
                        ));

                    return (
                      <div
                        key={task.id}
                        className={`absolute top-3 h-14 rounded-sm cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? "ring-2 ring-[var(--brand-surface)] shadow-lg z-20"
                            : "hover:shadow-md hover:z-10"
                        } ${
                          isCritical && highlightCriticalPath
                            ? "ring-2 ring-red-500 animate-pulse"
                            : ""
                        }`}
                        style={{
                          left: `${getTaskPosition(task.startTime)}%`,
                          width: `${getTaskWidth(task.duration)}%`,
                          backgroundColor: isBlocked ? "#ef4444" : task.color,
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
                        <div className="h-full px-3 flex flex-col justify-center text-white">
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-xs font-semibold truncate flex-1">
                              {task.name}
                            </div>
                            {isCritical && highlightCriticalPath && (
                              <span className="ml-2 text-xs">⚡</span>
                            )}
                            {isBlocked && (
                              <span className="ml-2 text-xs">🔒</span>
                            )}
                          </div>
                          <div className="flex items-center justify-between text-[10px] opacity-90">
                            <span>{formatTime(task.duration)}</span>
                            <span className="capitalize">{task.status}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
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
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-sm border ${
                      statusColors[selectedTask.status]
                    } text-white border-transparent`}
                  >
                    {statusLabels[selectedTask.status]}
                  </span>
                </div>
                <BodySmall className="text-[var(--brand-muted)]">
                  {selectedTask.lane} • {selectedTask.agent}
                </BodySmall>
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
              <div className="bg-[var(--brand-surface-soft)] p-3">
                <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-[var(--brand-muted)]">
                  Start Time
                </div>
                <div className="text-lg font-medium tracking-tight text-[var(--foreground)]">
                  {formatTime(selectedTask.startTime)}
                </div>
              </div>
              <div className="bg-[var(--brand-surface-soft)] p-3">
                <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-[var(--brand-muted)]">
                  Duration
                </div>
                <div className="text-lg font-medium tracking-tight text-[var(--foreground)]">
                  {formatTime(selectedTask.duration)}
                </div>
              </div>
              <div className="bg-[var(--brand-surface-soft)] p-3">
                <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-[var(--brand-muted)]">
                  End Time
                </div>
                <div className="text-lg font-medium tracking-tight text-[var(--foreground)]">
                  {formatTime(selectedTask.startTime + selectedTask.duration)}
                </div>
              </div>
            </div>

            {selectedTask.dependencies &&
              selectedTask.dependencies.length > 0 && (
                <div className="mb-4 bg-blue-50 border border-blue-200 rounded-sm p-4">
                  <div className="text-xs font-medium text-blue-900 mb-2">
                    Dependencies
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedTask.dependencies.map((depId) => {
                      const depTask = SWIMLANE_TASKS.find(
                        (t) => t.id === depId
                      );
                      return (
                        <span
                          key={depId}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-sm border border-blue-200"
                        >
                          {depTask?.name || depId}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

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
          <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-[var(--brand-muted)]">
            Legend
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-blue-500" />
              <BodySmall className="text-[var(--brand-muted)]">
                Completed Task
              </BodySmall>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-red-500" />
              <BodySmall className="text-[var(--brand-muted)]">
                Blocked Task
              </BodySmall>
            </div>
            <div className="flex items-center gap-2">
              <svg width="20" height="20" className="text-purple-500">
                <path
                  d="M 0 10 L 20 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
                <polygon points="15,7 20,10 15,13" fill="currentColor" />
              </svg>
              <BodySmall className="text-[var(--brand-muted)]">
                Dependency
              </BodySmall>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
