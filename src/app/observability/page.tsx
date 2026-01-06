import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { VisualizationCard } from "@/components/shared/visualization-card";
import type { VisualizationCardData } from "@/components/shared/visualization-card";

const OBSERVABILITY_VIEWS: VisualizationCardData[] = [
  {
    id: "latency-waterfall",
    label: "01 / LATENCY WATERFALL",
    title: "Request Latency Breakdown",
    description:
      "Analyze the latency breakdown of agent requests across different stages. Identify bottlenecks, slow operations, and optimize performance-critical paths in your agent workflows.",
    href: "/observability/latency-waterfall",
    visualizationType: "Waterfall Chart / Timeline",
    library: "D3.js / Recharts",
  },
  {
    id: "risk-heatmap",
    label: "02 / RISK HEATMAP",
    title: "Risk Assessment Visualization",
    description:
      "Visualize risk levels across different agent operations, endpoints, and workflows. Identify high-risk areas, security concerns, and potential failure points in your system.",
    href: "/observability/risk-heatmap",
    visualizationType: "Heatmap / Risk Matrix",
    library: "D3.js / Plotly.js",
  },
  {
    id: "token-burndown",
    label: "03 / TOKEN BURNDOWN",
    title: "Token Usage Tracking",
    description:
      "Monitor token consumption across agents, conversations, and time periods. Track usage patterns, optimize costs, and identify opportunities for efficiency improvements.",
    href: "/observability/token-burndown",
    visualizationType: "Burndown Chart / Time Series",
    library: "Recharts / Chart.js",
  },
];

export default function ObservabilityHome() {
  return (
    <section className="relative z-10 bg-[var(--background)] py-16 sm:py-24">
      <Container>
        <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-[var(--brand-border-subtle)] pb-6 sm:mb-16 sm:gap-6 sm:pb-8 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Observability Views"
            title="Monitor performance, risks, and resource usage."
            description={
              <>
                Choose a visualization to track system health – from latency
                breakdowns and risk assessments to token consumption patterns.
              </>
            }
          />
        </div>

        <div className="grid grid-cols-1 gap-px border border-[var(--brand-border-subtle)] bg-[var(--brand-border-subtle)] md:grid-cols-3">
          {OBSERVABILITY_VIEWS.map((view) => (
            <VisualizationCard key={view.id} view={view} />
          ))}
        </div>
      </Container>
    </section>
  );
}
