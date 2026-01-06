"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { H3, BodySmall } from "@/components/ui/typography";

type EmbeddingType = "document" | "message" | "tool" | "memory";

type VectorPoint = {
  id: string;
  label: string;
  type: EmbeddingType;
  x: number;
  y: number;
  originalDim: number;
  similarity?: number;
  cluster?: number;
  description: string;
  tokenCount: number;
};

type ProjectionMethod = "tsne" | "umap" | "pca";

const PROJECTION_METHODS: { id: ProjectionMethod; label: string }[] = [
  { id: "tsne", label: "t-SNE" },
  { id: "umap", label: "UMAP" },
  { id: "pca", label: "PCA" },
];

// Mock 2D projected embeddings (simulating t-SNE/UMAP/PCA projection)
const MOCK_VECTORS: VectorPoint[] = [
  // Document cluster
  {
    id: "doc-1",
    label: "API Documentation",
    type: "document",
    x: 0.2,
    y: 0.3,
    originalDim: 1536,
    cluster: 0,
    description: "OpenAI API reference documentation",
    tokenCount: 4500,
  },
  {
    id: "doc-2",
    label: "User Guide",
    type: "document",
    x: 0.25,
    y: 0.35,
    originalDim: 1536,
    cluster: 0,
    description: "Getting started guide for GPT-4",
    tokenCount: 3200,
  },
  {
    id: "doc-3",
    label: "Technical Spec",
    type: "document",
    x: 0.18,
    y: 0.28,
    originalDim: 1536,
    cluster: 0,
    description: "Technical specifications document",
    tokenCount: 5800,
  },
  // Message cluster
  {
    id: "msg-1",
    label: "User Query: API Help",
    type: "message",
    x: 0.5,
    y: 0.4,
    originalDim: 1536,
    cluster: 1,
    description: "User asking about API integration",
    tokenCount: 120,
  },
  {
    id: "msg-2",
    label: "Assistant Response",
    type: "message",
    x: 0.52,
    y: 0.42,
    originalDim: 1536,
    cluster: 1,
    description: "Assistant providing API guidance",
    tokenCount: 450,
  },
  {
    id: "msg-3",
    label: "Follow-up Question",
    type: "message",
    x: 0.48,
    y: 0.38,
    originalDim: 1536,
    cluster: 1,
    description: "User follow-up on previous answer",
    tokenCount: 95,
  },
  // Tool cluster
  {
    id: "tool-1",
    label: "web_search",
    type: "tool",
    x: 0.75,
    y: 0.6,
    originalDim: 1536,
    cluster: 2,
    description: "Web search tool function",
    tokenCount: 200,
  },
  {
    id: "tool-2",
    label: "code_executor",
    type: "tool",
    x: 0.78,
    y: 0.62,
    originalDim: 1536,
    cluster: 2,
    description: "Code execution tool",
    tokenCount: 180,
  },
  {
    id: "tool-3",
    label: "file_reader",
    type: "tool",
    x: 0.72,
    y: 0.58,
    originalDim: 1536,
    cluster: 2,
    description: "File reading tool",
    tokenCount: 150,
  },
  // Memory cluster
  {
    id: "mem-1",
    label: "Session Memory",
    type: "memory",
    x: 0.3,
    y: 0.7,
    originalDim: 1536,
    cluster: 3,
    description: "Conversation history from session",
    tokenCount: 2800,
  },
  {
    id: "mem-2",
    label: "Long-term Memory",
    type: "memory",
    x: 0.32,
    y: 0.72,
    originalDim: 1536,
    cluster: 3,
    description: "Persistent knowledge base entry",
    tokenCount: 1500,
  },
  // Outliers
  {
    id: "outlier-1",
    label: "Unique Concept",
    type: "document",
    x: 0.9,
    y: 0.15,
    originalDim: 1536,
    description: "Outlier document with unique semantics",
    tokenCount: 2100,
  },
  {
    id: "outlier-2",
    label: "Edge Case",
    type: "message",
    x: 0.1,
    y: 0.85,
    originalDim: 1536,
    description: "Unusual user query pattern",
    tokenCount: 85,
  },
];

const TYPE_COLORS: Record<EmbeddingType, string> = {
  document: "#3b82f6", // blue
  message: "#10b981", // green
  tool: "#f59e0b", // amber
  memory: "#8b5cf6", // purple
};

const TYPE_LABELS: Record<EmbeddingType, string> = {
  document: "Document",
  message: "Message",
  tool: "Tool",
  memory: "Memory",
};

export default function VectorSpacePage() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedPoint, setSelectedPoint] = useState<VectorPoint | null>(null);
  const [projectionMethod, setProjectionMethod] =
    useState<ProjectionMethod>("tsne");
  const [dimensions] = useState({ width: 800, height: 600 });
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous render
    d3.select(svgRef.current).selectAll("*").remove();

    const margin = { top: 40, right: 40, bottom: 60, left: 60 };
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

    // Create scales (normalize 0-1 to pixel coordinates)
    const xScale = d3.scaleLinear().domain([0, 1]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 1]).range([height, 0]);

    // Add grid lines
    const gridLines = g.append("g").attr("class", "grid");

    [0.2, 0.4, 0.6, 0.8].forEach((val) => {
      gridLines
        .append("line")
        .attr("x1", xScale(val))
        .attr("x2", xScale(val))
        .attr("y1", 0)
        .attr("y2", height)
        .attr("stroke", "#e5e7eb")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "2,2");

      gridLines
        .append("line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", yScale(val))
        .attr("y2", yScale(val))
        .attr("stroke", "#e5e7eb")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "2,2");
    });

    // Add axes
    const xAxis = d3.axisBottom(xScale).ticks(5).tickFormat(d3.format(".2f"));
    const yAxis = d3.axisLeft(yScale).ticks(5).tickFormat(d3.format(".2f"));

    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .selectAll("text")
      .style("font-size", "10px")
      .style("fill", "#6b7280");

    g.append("g")
      .attr("class", "y-axis")
      .call(yAxis)
      .selectAll("text")
      .style("font-size", "10px")
      .style("fill", "#6b7280");

    // Add axis labels
    g.append("text")
      .attr("class", "axis-label")
      .attr("transform", `translate(${width / 2},${height + 45})`)
      .style("text-anchor", "middle")
      .style("font-size", "11px")
      .style("fill", "#6b7280")
      .text(`${projectionMethod.toUpperCase()} Dimension 1`);

    g.append("text")
      .attr("class", "axis-label")
      .attr("transform", "rotate(-90)")
      .attr("y", -45)
      .attr("x", -height / 2)
      .style("text-anchor", "middle")
      .style("font-size", "11px")
      .style("fill", "#6b7280")
      .text(`${projectionMethod.toUpperCase()} Dimension 2`);

    // Draw points
    const points = g
      .selectAll(".point")
      .data(MOCK_VECTORS)
      .enter()
      .append("circle")
      .attr("class", "point")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", 6)
      .attr("fill", (d) => TYPE_COLORS[d.type])
      .attr("opacity", (d) =>
        hoveredPoint && hoveredPoint !== d.id ? 0.3 : 0.7,
      )
      .attr("stroke", (d) =>
        selectedPoint?.id === d.id ? "#000" : "#fff",
      )
      .attr("stroke-width", (d) => (selectedPoint?.id === d.id ? 2 : 1))
      .style("cursor", "pointer")
      .on("mouseover", function (_event, d) {
        setHoveredPoint(d.id);
        d3.select(this).attr("r", 8).attr("opacity", 1);
      })
      .on("mouseout", function (_event, d) {
        setHoveredPoint(null);
        d3.select(this).attr("r", 6).attr("opacity", 0.7);
      })
      .on("click", function (_event, d) {
        setSelectedPoint(d.id === selectedPoint?.id ? null : d);
      });

    // Add labels for selected/hovered points
    const labels = g
      .selectAll(".label")
      .data(MOCK_VECTORS.filter((d) => hoveredPoint === d.id || selectedPoint?.id === d.id))
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d) => xScale(d.x) + 10)
      .attr("y", (d) => yScale(d.y) - 10)
      .attr("font-size", "10px")
      .attr("fill", "#374151")
      .attr("font-weight", "500")
      .text((d) => d.label);

    // Draw cluster boundaries (simple convex hull approximation)
    const clusters = d3.group(MOCK_VECTORS, (d) => d.cluster);
    clusters.forEach((points, clusterId) => {
      if (clusterId === undefined || points.length < 3) return;

      const hull = d3.polygonHull(
        points.map((p) => [xScale(p.x), yScale(p.y)]),
      );
      if (hull) {
        g.append("path")
          .datum(hull)
          .attr("fill", "none")
          .attr("stroke", "#d1d5db")
          .attr("stroke-width", 1)
          .attr("stroke-dasharray", "5,5")
          .attr("opacity", 0.5)
          .attr(
            "d",
            d3
              .line()
              .x((d) => d[0])
              .y((d) => d[1])
              .curve(d3.curveCardinalClosed)(hull),
          );
      }
    });
  }, [dimensions, projectionMethod, selectedPoint, hoveredPoint]);

  // Calculate statistics
  const stats = {
    totalVectors: MOCK_VECTORS.length,
    byType: MOCK_VECTORS.reduce(
      (acc, v) => {
        acc[v.type] = (acc[v.type] || 0) + 1;
        return acc;
      },
      {} as Record<EmbeddingType, number>,
    ),
    clusters: new Set(MOCK_VECTORS.map((v) => v.cluster).filter((c) => c !== undefined)).size,
    avgDim: Math.round(
      MOCK_VECTORS.reduce((sum, v) => sum + v.originalDim, 0) /
        MOCK_VECTORS.length,
    ),
  };

  return (
    <section className="relative z-10 bg-white py-16 sm:py-24">
      <Container>
        <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-neutral-200 pb-6 sm:mb-16 sm:gap-6 sm:pb-8 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="01 / Vector Space"
            title="Embedding space explorer visualization."
            description={
              <>
                Inspect how documents, messages, and tools are positioned in
                high-dimensional vector space. Understand semantic neighborhoods,
                clusters, and outliers.
              </>
            }
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          {/* Vector Space Visualization */}
          <div className="border border-neutral-200 bg-white">
            <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-3 sm:px-6">
              <div className="flex items-center justify-between">
                <BodySmall className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                  Embedding Space Projection
                </BodySmall>
                <div className="flex items-center gap-2">
                  {PROJECTION_METHODS.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setProjectionMethod(method.id)}
                      className={`rounded-sm border px-2 py-1 text-[10px] font-medium transition-colors ${
                        projectionMethod === method.id
                          ? "border-neutral-900 bg-neutral-900 text-white"
                          : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                      }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto p-4 sm:p-6">
              <div className="flex justify-center">
                <svg
                  ref={svgRef}
                  className="border border-neutral-200 bg-white"
                />
              </div>
            </div>

            {/* Legend */}
            <div className="border-t border-neutral-200 bg-neutral-50 px-4 py-3 sm:px-6">
              <div className="flex flex-wrap items-center gap-4">
                <BodySmall className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                  Legend:
                </BodySmall>
                {Object.entries(TYPE_COLORS).map(([type, color]) => (
                  <div key={type} className="flex items-center gap-1.5">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <BodySmall className="text-[10px] text-neutral-600">
                      {TYPE_LABELS[type as EmbeddingType]}
                    </BodySmall>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Details Panel */}
          <div className="space-y-4">
            <div className="sticky top-4 border border-neutral-200 bg-white p-6">
              {selectedPoint ? (
                <>
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                        Vector Details
                      </div>
                      <H3 className="mb-1 text-sm">{selectedPoint.label}</H3>
                      <BodySmall className="text-neutral-500">
                        {selectedPoint.description}
                      </BodySmall>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedPoint(null)}
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
                        Type
                      </div>
                      <BodySmall className="text-neutral-800 capitalize">
                        {selectedPoint.type}
                      </BodySmall>
                    </div>
                    <div className="bg-neutral-50 p-3">
                      <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-neutral-500">
                        Cluster
                      </div>
                      <BodySmall className="text-neutral-800">
                        {selectedPoint.cluster !== undefined
                          ? `Cluster ${selectedPoint.cluster}`
                          : "Outlier"}
                      </BodySmall>
                    </div>
                  </div>

                  <div className="mb-3 grid grid-cols-2 gap-px border border-neutral-200 bg-neutral-200">
                    <div className="bg-neutral-50 p-3">
                      <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-neutral-500">
                        Position (X, Y)
                      </div>
                      <BodySmall className="text-neutral-800">
                        ({selectedPoint.x.toFixed(3)}, {selectedPoint.y.toFixed(3)})
                      </BodySmall>
                    </div>
                    <div className="bg-neutral-50 p-3">
                      <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-neutral-500">
                        Original Dim
                      </div>
                      <BodySmall className="text-neutral-800">
                        {selectedPoint.originalDim}
                      </BodySmall>
                    </div>
                  </div>

                  <div className="rounded-sm border border-neutral-200 bg-neutral-50 p-4">
                    <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-neutral-500">
                      Token Count
                    </div>
                    <BodySmall className="text-neutral-800">
                      {selectedPoint.tokenCount.toLocaleString()} tokens
                    </BodySmall>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="mb-3 text-3xl">📍</div>
                  <BodySmall className="mb-1 font-medium text-neutral-900">
                    Click a point to inspect details.
                  </BodySmall>
                  <BodySmall className="text-neutral-500">
                    Select any embedding vector to see its properties, position
                    in the projected space, cluster assignment, and metadata.
                  </BodySmall>
                </div>
              )}
            </div>

            <div className="border border-neutral-200 bg-white p-4">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                Space Statistics
              </div>
              <div className="grid grid-cols-2 gap-px border border-neutral-200 bg-neutral-200">
                <div className="bg-neutral-50 p-3 text-center">
                  <div className="text-xl font-medium tracking-tight text-neutral-900">
                    {stats.totalVectors}
                  </div>
                  <BodySmall className="text-neutral-500">Vectors</BodySmall>
                </div>
                <div className="bg-neutral-50 p-3 text-center">
                  <div className="text-xl font-medium tracking-tight text-neutral-900">
                    {stats.clusters}
                  </div>
                  <BodySmall className="text-neutral-500">Clusters</BodySmall>
                </div>
              </div>
              <div className="mt-2 rounded-sm border border-neutral-200 bg-neutral-50 p-3">
                <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-neutral-500">
                  Average Dimensions
                </div>
                <BodySmall className="text-neutral-800">
                  {stats.avgDim} dimensions
                </BodySmall>
              </div>
            </div>

            <div className="border border-neutral-200 bg-white p-4">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                By Type
              </div>
              <div className="space-y-1">
                {Object.entries(stats.byType).map(([type, count]) => (
                  <div
                    key={type}
                    className="flex items-center justify-between border-b border-neutral-200 pb-1 text-[10px] last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: TYPE_COLORS[type as EmbeddingType] }}
                      />
                      <span className="capitalize text-neutral-700">{type}</span>
                    </div>
                    <span className="text-neutral-500">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


