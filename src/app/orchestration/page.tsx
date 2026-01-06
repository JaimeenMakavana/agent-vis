import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { VisualizationCard } from "@/components/shared/visualization-card";
import type { VisualizationCardData } from "@/components/shared/visualization-card";

const ORCHESTRATION_VIEWS: VisualizationCardData[] = [
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
    <section className="relative z-10 bg-[var(--background)] py-16 sm:py-24">
      <Container>
        <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-[var(--brand-border-subtle)] pb-6 sm:mb-16 sm:gap-6 sm:pb-8 md:flex-row md:items-end">
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

        <div className="grid grid-cols-1 gap-px border border-[var(--brand-border-subtle)] bg-[var(--brand-border-subtle)] md:grid-cols-3">
          {ORCHESTRATION_VIEWS.map((view) => (
            <VisualizationCard key={view.id} view={view} />
          ))}
        </div>
      </Container>
    </section>
  );
}

