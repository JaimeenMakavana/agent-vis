import Link from "next/link";

import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { H3, BodySmall, Eyebrow } from "@/components/ui/typography";

const TRACEABILITY_VIEWS = [
  {
    id: "chain-of-thought",
    label: "01 / CHAIN OF THOUGHT",
    title: "Interactive Execution DAG",
    description:
      "Visualize the exact “chain of thought” behind an answer. Step through every tool call and model hop as a directed acyclic graph.",
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
    <section className="relative z-10 bg-white py-16 sm:py-24">
      <Container>
        <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-neutral-200 pb-6 sm:mb-16 sm:gap-6 sm:pb-8 md:flex-row md:items-end">
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

        <div className="grid grid-cols-1 gap-px border border-neutral-200 bg-neutral-200 md:grid-cols-3">
          {TRACEABILITY_VIEWS.map((view) => (
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
