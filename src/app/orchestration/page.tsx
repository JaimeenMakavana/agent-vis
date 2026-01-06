import Link from "next/link";

import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { H3, BodySmall, Eyebrow } from "@/components/ui/typography";

const ORCHESTRATION_VIEWS = [
  {
    id: "swarm-network",
    label: "01 / SWARM NETWORK",
    title: "Multi-Agent Network Topology",
    description:
      "Visualize the complete network of agents, their connections, and communication patterns. Understand how agents collaborate, delegate tasks, and form dynamic swarms.",
    href: "/orchestration/swarm-network",
    visualizationType: "Network Graph / Force-Directed Layout",
    library: "React Flow / Cytoscape.js",
  },
  {
    id: "conversation-sequence",
    label: "02 / CONVERSATION SEQUENCE",
    title: "Agent Conversation Flow",
    description:
      "Track the sequence of messages and handoffs between agents. See how conversations branch, merge, and evolve as agents coordinate to solve complex tasks.",
    href: "/orchestration/conversation-sequence",
    visualizationType: "Sequence Diagram / Message Flow",
    library: "Mermaid.js / React Sequence Diagram",
  },
  {
    id: "swimlanes",
    label: "03 / SWIMLANES",
    title: "Parallel Execution Lanes",
    description:
      "Monitor parallel agent execution across different lanes. Identify bottlenecks, dependencies, and synchronization points in multi-agent workflows.",
    href: "/orchestration/swimlanes",
    visualizationType: "Swimlane Diagram / Gantt Chart",
    library: "D3.js / Vis.js Timeline",
  },
];

export default function OrchestrationHome() {
  return (
    <section className="relative z-10 bg-white py-16 sm:py-24">
      <Container>
        <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-neutral-200 pb-6 sm:mb-16 sm:gap-6 sm:pb-8 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Orchestration Views"
            title="Visualize multi-agent coordination and workflows."
            description={
              <>
                Choose a visualization to understand how agents work together –
                from network topologies and conversation flows to parallel
                execution patterns.
              </>
            }
          />
        </div>

        <div className="grid grid-cols-1 gap-px border border-neutral-200 bg-neutral-200 md:grid-cols-3">
          {ORCHESTRATION_VIEWS.map((view) => (
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

