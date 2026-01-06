"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { BodySmall } from "@/components/ui/typography";

// TypeScript interfaces for Tree of Thoughts data structure
interface ThoughtNode {
  id: string;
  text: string;
  score: number;
  depth: number;
  status: "explored" | "pruned" | "optimal" | "pending";
  reasoning?: string;
  children?: ThoughtNode[];
}

type ThoughtStatus = ThoughtNode["status"];

type StatusInfo = {
  label: string;
  color: string;
};

// Mock Tree of Thoughts data - simulating an AI solving "Plan a 3-day Tokyo trip"
const MOCK_TREE_DATA: ThoughtNode = {
  id: "root",
  text: "Plan a 3-day Tokyo trip",
  score: 0,
  depth: 0,
  status: "explored",
  reasoning: "Initial problem statement",
  children: [
    {
      id: "approach-1",
      text: "Cultural Focus (Temples & Museums)",
      score: 0.85,
      depth: 1,
      status: "explored",
      reasoning: "Strong cultural experience, but might be too slow-paced",
      children: [
        {
          id: "day1-cultural-1",
          text: "Day 1: Asakusa + Senso-ji Temple",
          score: 0.9,
          depth: 2,
          status: "optimal",
          reasoning:
            "Excellent starting point, iconic location, good for first-timers",
        },
        {
          id: "day1-cultural-2",
          text: "Day 1: Tokyo National Museum only",
          score: 0.6,
          depth: 2,
          status: "pruned",
          reasoning: "Too niche, might bore non-history enthusiasts",
        },
      ],
    },
    {
      id: "approach-2",
      text: "Modern/Tech Focus (Shibuya, Akihabara)",
      score: 0.92,
      depth: 1,
      status: "optimal",
      reasoning: "High energy, diverse activities, appeals to most travelers",
      children: [
        {
          id: "day1-modern-1",
          text: "Day 1: Shibuya Crossing + Harajuku",
          score: 0.95,
          depth: 2,
          status: "optimal",
          reasoning:
            "Iconic experience, walkable area, great photo ops, adjacent neighborhoods",
        },
        {
          id: "day2-modern-1",
          text: "Day 2: Akihabara + Tokyo Skytree",
          score: 0.88,
          depth: 2,
          status: "explored",
          reasoning:
            "Good variety, tech culture + landmark, but logistically spread out",
        },
        {
          id: "day3-modern-1",
          text: "Day 3: Tsukiji Market + Ginza Shopping",
          score: 0.9,
          depth: 2,
          status: "optimal",
          reasoning: "Perfect final day: food experience + luxury shopping",
        },
      ],
    },
    {
      id: "approach-3",
      text: "Balanced Mix (Culture + Modern)",
      score: 0.78,
      depth: 1,
      status: "explored",
      reasoning: "Safe option but lacks focus, might feel scattered",
      children: [
        {
          id: "day1-balanced-1",
          text: "Day 1: Mix Asakusa + Akihabara",
          score: 0.65,
          depth: 2,
          status: "pruned",
          reasoning: "Too rushed, different vibes clash, poor time management",
        },
      ],
    },
    {
      id: "approach-4",
      text: "Nature Focus (Parks & Mt. Fuji)",
      score: 0.55,
      depth: 1,
      status: "pruned",
      reasoning:
        "Mt. Fuji requires full day trip, leaves only 2 days for Tokyo exploration",
    },
  ],
};

export default function TreeOfThoughtsPage() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<ThoughtNode | null>(null);
  const [dimensions] = useState({ width: 1200, height: 700 });

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous render
    d3.select(svgRef.current).selectAll("*").remove();

    const margin = { top: 40, right: 120, bottom: 40, left: 120 };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;

    // Create SVG canvas
    const svg = d3
      .select(svgRef.current)
      .attr("width", dimensions.width)
      .attr("height", dimensions.height);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create tree layout
    const treeLayout = d3.tree<ThoughtNode>().size([height, width]);

    // Create hierarchy
    const root = d3.hierarchy<ThoughtNode>(MOCK_TREE_DATA);
    const treeData = treeLayout(root);

    // Color scheme based on status - using CSS variables
    const colorMap: Record<ThoughtStatus, string> = {
      explored: "var(--status-explored)",
      pruned: "var(--status-pruned)",
      optimal: "var(--status-optimal)",
      pending: "var(--status-pending)",
    };

    // Draw links (edges)
    const links = g
      .selectAll(".link")
      .data(treeData.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr(
        "d",
        d3
          .linkHorizontal<any, any>()
          .x((d: any) => d.y)
          .y((d: any) => d.x)
      )
      .style("fill", "none")
      .style("stroke", (d: any) => {
        const targetStatus = d.target.data.status;
        return targetStatus === "optimal"
          ? "var(--status-optimal)"
          : targetStatus === "pruned"
          ? "var(--status-pruned)"
          : "var(--status-stroke-default)";
      })
      .style("stroke-width", (d: any) =>
        d.target.data.status === "optimal" ? 3 : 2
      )
      .style("stroke-dasharray", (d: any) =>
        d.target.data.status === "pruned" ? "5,5" : "none"
      )
      .style("opacity", 0.6);

    // Draw nodes
    const nodes = g
      .selectAll(".node")
      .data(treeData.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d: any) => `translate(${d.y},${d.x})`)
      .style("cursor", "pointer")
      .on("click", (_event: any, d: any) => {
        setSelectedNode(d.data);
      });

    // Add circles to nodes
    nodes
      .append("circle")
      .attr("r", (d: any) => (d.data.status === "optimal" ? 12 : 8))
      .style("fill", (d: any) => {
        const status = d.data.status as ThoughtStatus;
        return colorMap[status];
      })
      .style("stroke", "var(--background)")
      .style("stroke-width", 3)
      .style("filter", (d: any) =>
        d.data.status === "optimal"
          ? "drop-shadow(0 0 8px color-mix(in srgb, var(--status-optimal) 50%, transparent))"
          : "none"
      );

    // Add score badges
    nodes
      .filter((d: any) => d.data.score > 0)
      .append("rect")
      .attr("x", 15)
      .attr("y", -10)
      .attr("width", 45)
      .attr("height", 20)
      .attr("rx", 10)
      .style("fill", (d: any) => {
        const status = d.data.status as ThoughtStatus;
        return colorMap[status];
      })
      .style("opacity", 0.9);

    nodes
      .filter((d: any) => d.data.score > 0)
      .append("text")
      .attr("x", 37)
      .attr("y", 4)
      .attr("text-anchor", "middle")
      .style("fill", "var(--background)")
      .style("font-size", "11px")
      .style("font-weight", "bold")
      .text((d: any) => d.data.score.toFixed(2));

    // Add labels
    nodes
      .append("text")
      .attr("dy", 35)
      .attr("x", (d: any) => (d.children ? -15 : 15))
      .style("text-anchor", (d: any) => (d.children ? "end" : "start"))
      .style("font-size", "13px")
      .style("font-weight", (d: any) =>
        d.data.status === "optimal" ? "bold" : "normal"
      )
      .style("fill", "var(--foreground)")
      .text((d: any) => {
        const text = d.data.text;
        return text.length > 35 ? text.substring(0, 35) + "..." : text;
      });

    // Add status icons
    nodes
      .append("text")
      .attr("dy", -15)
      .attr("x", 0)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text((d: any) => {
        if (d.data.status === "optimal") return "⭐";
        if (d.data.status === "pruned") return "✕";
        return "";
      });
  }, [dimensions]);

  const getStatusInfo = (status: ThoughtStatus): StatusInfo => {
    const statusConfig: Record<ThoughtStatus, StatusInfo> = {
      explored: {
        label: "Explored",
        color:
          "bg-[var(--brand-surface-soft)] text-[var(--brand-blue)] border-[var(--brand-border-subtle)]",
      },
      pruned: {
        label: "Pruned",
        color:
          "bg-[var(--brand-surface-soft)] text-[var(--status-pruned)] border-[var(--brand-border-subtle)]",
      },
      optimal: {
        label: "Optimal Path",
        color:
          "bg-[var(--brand-surface-soft)] text-[var(--status-optimal)] border-[var(--brand-border-subtle)]",
      },
      pending: {
        label: "Pending",
        color:
          "bg-[var(--brand-surface-soft)] text-[var(--foreground)] border-[var(--brand-border-subtle)]",
      },
    };
    return statusConfig[status];
  };

  return (
    <section className="relative z-10 bg-[var(--background)] py-16 sm:py-24">
      <Container>
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-[var(--brand-border-subtle)] pb-6 sm:mb-16 sm:gap-6 sm:pb-8 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="02 / Tree of Thoughts"
            title="Decision & search tree for agent reasoning."
            description={
              <>
                Explore the complete thought search space – which branches were
                explored, which were pruned, and why the final path was
                selected.
              </>
            }
          />
        </div>

        {/* Legend + Helper Copy */}
        <div className="mb-8 border border-[var(--brand-border-subtle)] bg-[var(--background)] px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--brand-muted)]">
                Legend
              </span>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[var(--status-optimal)]" />
                <BodySmall className="text-[var(--foreground)]">
                  <span className="mr-1">⭐</span>Optimal path
                </BodySmall>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[var(--status-explored)]" />
                <BodySmall className="text-[var(--foreground)]">
                  Explored
                </BodySmall>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[var(--status-pruned)]" />
                <BodySmall className="text-[var(--foreground)]">
                  <span className="mr-1">✕</span>Pruned
                </BodySmall>
              </div>
            </div>

            <BodySmall className="text-[var(--brand-muted)]">
              Click any node in the tree to inspect its reasoning, score, and
              children.
            </BodySmall>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Tree Visualization */}
          <div className="md:col-span-2 border border-[var(--brand-border-subtle)] bg-[var(--background)]">
            <div className="border-b border-[var(--brand-border-subtle)] bg-[var(--brand-surface-soft)] px-4 py-3 sm:px-6">
              <div className="flex items-center justify-between">
                <BodySmall className="font-mono text-[10px] uppercase tracking-widest text-[var(--brand-muted)]">
                  Thought space exploration
                </BodySmall>
              </div>
            </div>
            <div className="overflow-x-auto p-4 sm:p-6">
              <svg ref={svgRef} className="w-full" />
            </div>
          </div>

          {/* Details Panel */}
          <div className="md:col-span-1">
            {selectedNode ? (
              <div className="sticky top-4 border border-[var(--brand-border-subtle)] bg-[var(--background)] p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[var(--brand-muted)]">
                      Node details
                    </div>
                    <BodySmall className="font-medium text-[var(--foreground)]">
                      {selectedNode.text}
                    </BodySmall>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedNode(null)}
                    className="text-[var(--brand-muted)] transition-colors hover:text-[var(--foreground)]"
                    aria-label="Clear selection"
                  >
                    <svg
                      className="h-5 w-5"
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

                <div className="space-y-4">
                  {/* Status Badge */}
                  <div>
                    <span
                      className={`inline-flex items-center gap-1 rounded-sm border px-2 py-1 text-[11px] font-medium ${
                        getStatusInfo(selectedNode.status).color
                      }`}
                    >
                      {getStatusInfo(selectedNode.status).label}
                    </span>
                  </div>

                  {/* Score & Depth */}
                  {selectedNode.score > 0 && (
                    <div className="grid grid-cols-2 gap-px border border-[var(--brand-border-subtle)] bg-[var(--brand-border-subtle)]">
                      <div className="bg-[var(--brand-surface-soft)] p-3">
                        <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-[var(--brand-muted)]">
                          Confidence score
                        </div>
                        <div className="text-xl font-medium tracking-tight text-[var(--foreground)] sm:text-2xl">
                          {(selectedNode.score * 100).toFixed(0)}%
                        </div>
                      </div>
                      <div className="bg-[var(--brand-surface-soft)] p-3">
                        <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-[var(--brand-muted)]">
                          Depth
                        </div>
                        <div className="text-xl font-medium tracking-tight text-[var(--foreground)] sm:text-2xl">
                          {selectedNode.depth}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Reasoning */}
                  {selectedNode.reasoning && (
                    <div className="rounded-sm border border-[var(--brand-border-subtle)] bg-[var(--brand-surface-soft)] p-4">
                      <div className="mb-2 font-mono text-[9px] uppercase tracking-widest text-[var(--brand-blue)]">
                        AI reasoning
                      </div>
                      <BodySmall className="text-[var(--foreground)]">
                        {selectedNode.reasoning}
                      </BodySmall>
                    </div>
                  )}

                  {/* Children Info */}
                  {selectedNode.children &&
                    selectedNode.children.length > 0 && (
                      <div className="border-t border-dashed border-[var(--brand-border-subtle)] pt-3">
                        <BodySmall className="mb-1 font-medium text-[var(--foreground)]">
                          Branching options
                        </BodySmall>
                        <BodySmall className="text-[var(--brand-muted)]">
                          {selectedNode.children.length} alternative path
                          {selectedNode.children.length > 1 ? "s" : ""} explored
                          from this node.
                        </BodySmall>
                      </div>
                    )}
                </div>
              </div>
            ) : (
              <div className="sticky top-4 border border-[var(--brand-border-subtle)] bg-[var(--background)] p-6 text-center">
                <div className="mb-3 text-3xl">🤔</div>
                <BodySmall className="mb-1 font-medium text-[var(--foreground)]">
                  Select a node to inspect reasoning.
                </BodySmall>
                <BodySmall className="text-[var(--brand-muted)]">
                  Nodes on the optimal path are highlighted with a star. Click
                  any node to see its local decision context.
                </BodySmall>
              </div>
            )}
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-8 border border-[var(--brand-border-subtle)] bg-[var(--background)] p-6">
          <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-[var(--brand-muted)]">
            Search space statistics
          </div>
          <div className="grid grid-cols-2 gap-px border border-[var(--brand-border-subtle)] bg-[var(--brand-border-subtle)] sm:grid-cols-4">
            <div className="bg-[var(--brand-surface-soft)] p-4 text-center">
              <div className="text-xl font-medium tracking-tight text-[var(--foreground)] sm:text-2xl">
                15
              </div>
              <BodySmall className="text-[var(--brand-muted)]">
                Total nodes
              </BodySmall>
            </div>
            <div className="bg-[var(--brand-surface-soft)] p-4 text-center">
              <div className="text-xl font-medium tracking-tight text-[var(--status-optimal)] sm:text-2xl">
                5
              </div>
              <BodySmall className="text-[var(--brand-muted)]">
                Optimal path
              </BodySmall>
            </div>
            <div className="bg-[var(--brand-surface-soft)] p-4 text-center">
              <div className="text-xl font-medium tracking-tight text-[var(--status-pruned)] sm:text-2xl">
                4
              </div>
              <BodySmall className="text-[var(--brand-muted)]">
                Pruned branches
              </BodySmall>
            </div>
            <div className="bg-[var(--brand-surface-soft)] p-4 text-center">
              <div className="text-xl font-medium tracking-tight text-[var(--status-explored)] sm:text-2xl">
                3
              </div>
              <BodySmall className="text-[var(--brand-muted)]">
                Max depth
              </BodySmall>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
