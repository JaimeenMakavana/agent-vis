import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { VisualizationCard } from "@/components/shared/visualization-card";
import type { VisualizationCardData } from "@/components/shared/visualization-card";

const TRACEABILITY_VIEWS: VisualizationCardData[] = [
  {
    id: "chain-of-thought",
    label: "01 / CHAIN OF THOUGHT",
    title: "Interactive Execution DAG",
    description:
      'Visualize the exact "chain of thought" behind an answer. Step through every tool call and model hop as a directed acyclic graph.',
    href: "/traceability/chain-of-thought",
    visualizationType: "Interactive DAG (Directed Acyclic Graph)",
    library: "React Flow / React-Diagrams",
  },
  {
    id: "tree-of-thoughts",
    label: "02 / TREE OF THOUGHTS",
    title: "Decision & Search Tree",
    description:
      "Inspect explored versus pruned branches in Tree-of-Thoughts style search. See which reasoning paths were discarded and why.",
    href: "/traceability/tree-of-thoughts",
    visualizationType: "Decision Tree / Search Tree",
    library: "D3.js (Tree Layout)",
  },
  {
    id: "async-timeline",
    label: "03 / ASYNC TIMELINE",
    title: "Parallel Agent Timeline",
    description:
      "Debug async and parallel agents on a time axis. Track when each agent was waiting, working, or blocked by upstream dependencies.",
    href: "/traceability/async-timeline",
    visualizationType: "Gantt / Timeline Chart",
    library: "Vis.js / Frappe Gantt",
  },
];

export default function TraceabilityHome() {
  return (
    <section className="relative z-10 bg-[var(--background)] py-16 sm:py-24">
      <Container>
        <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-[var(--brand-border-subtle)] pb-6 sm:mb-16 sm:gap-6 sm:pb-8 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Traceability Views"
            title="Make agent reasoning visually inspectable."
            description={
              <>
                Choose a visualization to inspect how your agent arrived at a
                decision – from linear chains of tools to branching trees and
                fully parallel timelines.
              </>
            }
          />
        </div>

        <div className="grid grid-cols-1 gap-px border border-[var(--brand-border-subtle)] bg-[var(--brand-border-subtle)] md:grid-cols-3">
          {TRACEABILITY_VIEWS.map((view) => (
            <VisualizationCard key={view.id} view={view} />
          ))}
        </div>
      </Container>
    </section>
  );
}
