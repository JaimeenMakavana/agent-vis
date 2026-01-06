import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { VisualizationCard } from "@/components/shared/visualization-card";
import type { VisualizationCardData } from "@/components/shared/visualization-card";

const MEMORY_VIEWS: VisualizationCardData[] = [
  {
    id: "vector-space",
    label: "01 / VECTOR SPACE",
    title: "Embedding Space Explorer",
    description:
      "Inspect how documents, messages, and tools are positioned in high-dimensional vector space. Understand semantic neighborhoods, clusters, and outliers.",
    href: "/memory/vector-space",
    visualizationType: "2D/3D Projection (t-SNE / UMAP / PCA)",
    library: "D3.js / Three.js / react-force-graph",
  },
  {
    id: "context-window",
    label: "02 / CONTEXT WINDOW",
    title: "Token Context Timeline",
    description:
      "See exactly what the model could \"see\" at each step. Visualize sliding context windows, token utilization, and which memories were in or out of scope.",
    href: "/memory/context-window",
    visualizationType: "Scrollable Timeline / Token Heatmap",
    library: "D3.js / Recharts",
  },
  {
    id: "knowledge-graph",
    label: "03 / KNOWLEDGE GRAPH",
    title: "Entity & Relationship Graph",
    description:
      "Explore entities, facts, and relationships that your agents have learned over time. Trace how knowledge is reused, updated, or contradicted.",
    href: "/memory/knowledge-graph",
    visualizationType: "Graph Visualization / Force-Directed Layout",
    library: "Cytoscape.js / Vis.js",
  },
];

export default function MemoryHome() {
  return (
    <section className="relative z-10 bg-[var(--background)] py-16 sm:py-24">
      <Container>
        <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-[var(--brand-border-subtle)] pb-6 sm:mb-16 sm:gap-6 sm:pb-8 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Memory Views"
            title="Make vector space and long-term memory observable."
            description={
              <>
                Choose a visualization to understand how your agents store,
                retrieve, and reuse information – from embedding spaces to
                context windows and knowledge graphs.
              </>
            }
          />
        </div>

        <div className="grid grid-cols-1 gap-px border border-[var(--brand-border-subtle)] bg-[var(--brand-border-subtle)] md:grid-cols-3">
          {MEMORY_VIEWS.map((view) => (
            <VisualizationCard key={view.id} view={view} />
          ))}
        </div>
      </Container>
    </section>
  );
}


