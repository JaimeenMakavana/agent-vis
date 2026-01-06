import Link from "next/link";

import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { H3, BodySmall, Eyebrow } from "@/components/ui/typography";

const OBSERVABILITY_VIEWS = [
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
    <section className="relative z-10 bg-white py-16 sm:py-24">
      <Container>
        <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-neutral-200 pb-6 sm:mb-16 sm:gap-6 sm:pb-8 md:flex-row md:items-end">
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

        <div className="grid grid-cols-1 gap-px border border-neutral-200 bg-neutral-200 md:grid-cols-3">
          {OBSERVABILITY_VIEWS.map((view) => (
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

