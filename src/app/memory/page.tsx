import Link from "next/link";

import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { H3, BodySmall, Eyebrow } from "@/components/ui/typography";

const MEMORY_VIEWS = [
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
    <section className="relative z-10 bg-white py-16 sm:py-24">
      <Container>
        <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-neutral-200 pb-6 sm:mb-16 sm:gap-6 sm:pb-8 md:flex-row md:items-end">
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

        <div className="grid grid-cols-1 gap-px border border-neutral-200 bg-neutral-200 md:grid-cols-3">
          {MEMORY_VIEWS.map((view) => (
            <div
              key={view.id}
              className="flex flex-col justify-between bg-white p-6 transition-colors duration-300 hover:bg-neutral-50 sm:p-8"
            >
              <div>
                <div className="mb-4 inline-block rounded-sm border border-neutral-200 bg-neutral-50 pt-1 pb-1 pr-2 pl-2 font-mono text-xs text-neutral-500 sm:mb-6">
                  {view.label}
                </div>
                <H3 className="mb-2">{view.title}</H3>
                <BodySmall className="mb-4">{view.description}</BodySmall>

                <div className="space-y-1">
                  <BodySmall className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                    Visualization Type
                  </BodySmall>
                  <BodySmall>{view.visualizationType}</BodySmall>

                  <BodySmall className="mt-3 font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                    Recommended Library
                  </BodySmall>
                  <BodySmall>{view.library}</BodySmall>
                </div>
              </div>

              <div className="mt-6 border-t border-dashed border-neutral-200 pt-4">
                <Link
                  href={view.href}
                  className="inline-flex items-center gap-2 text-xs font-medium tracking-wide text-neutral-900 hover:text-black"
                >
                  <Eyebrow className="mb-0 text-[9px] text-neutral-400">
                    Open view
                  </Eyebrow>
                  <span className="h-px w-6 bg-neutral-300" aria-hidden />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}


