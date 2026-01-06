import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { H3, Body, BodySmall } from "@/components/ui/typography";

const PROBLEMS = [
  {
    icon: "🔍",
    title: "The Black Box Problem",
    description:
      "Agentic systems make decisions through complex reasoning chains, but you can't see inside. When an agent fails or produces unexpected results, you're left guessing what went wrong.",
  },
  {
    icon: "💰",
    title: "Hidden Cost Drivers",
    description:
      "Token consumption explodes silently. Without visibility into which agents, tools, or prompts consume the most tokens, optimization is impossible. Your OpenAI bill becomes unpredictable.",
  },
  {
    icon: "🔄",
    title: "Debugging Nightmare",
    description:
      "Reproducing failures requires replaying entire agent workflows. There's no way to inspect intermediate states, fork execution paths, or understand why one prompt succeeded while another failed.",
  },
  {
    icon: "🤝",
    title: "Collaboration Blind Spots",
    description:
      "Multi-agent systems involve complex orchestration. Without visual representation of agent interactions, message flows, and decision trees, teams can't align on system behavior.",
  },
];

const SOLUTIONS = [
  {
    label: "01 / TRACEABILITY",
    title: "Chain-of-Thought Visualization",
    description:
      "Visualize the complete reasoning path as an interactive DAG. See every thought, tool call, and decision point in real-time. Debug logic loops and understand agent decision-making.",
    skills: ["D3.js", "Graph Layouts", "Real-time Streaming"],
  },
  {
    label: "02 / ORCHESTRATION",
    title: "Swarm Network & Sequence Diagrams",
    description:
      "Map multi-agent conversations as network graphs and sequence diagrams. Understand agent-to-agent communication patterns, identify bottlenecks, and optimize orchestration flows.",
    skills: ["Network Visualization", "Sequence Diagrams", "Swimlanes"],
  },
  {
    label: "03 / MEMORY",
    title: "Vector Space & Knowledge Graphs",
    description:
      "Visualize RAG embeddings in vector space, explore context window utilization, and navigate knowledge graphs. Understand how agents retrieve and use information.",
    skills: ["3D Vector Plots", "Treemaps", "Graph Traversal"],
  },
  {
    label: "04 / OBSERVABILITY",
    title: "Performance & Risk Analytics",
    description:
      "Latency waterfalls, token burndown charts, and risk heatmaps. Identify performance bottlenecks, predict cost overruns, and surface anomalies before they impact production.",
    skills: ["Time-series Charts", "Heatmaps", "Statistical Analysis"],
  },
];

export function VisualizationPitch() {
  return (
    <>
      {/* Problem Section */}
      <section className="relative bg-neutral-50 py-16 sm:py-24">
        <Container>
          <div className="mb-12 sm:mb-16">
            <SectionHeader
              eyebrow="The Challenge"
              title="Why Visualization Matters in Agentic Interfaces"
              description={
                <BodySmall className="max-w-2xl">
                  Agentic systems are powerful but opaque. Without proper
                  visualization, debugging, optimization, and collaboration
                  become nearly impossible.
                </BodySmall>
              }
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {PROBLEMS.map((problem, index) => (
              <div
                key={problem.title}
                className="group relative border border-neutral-200 bg-white p-6 transition-all duration-300 hover:border-neutral-300 hover:shadow-sm sm:p-8"
              >
                <div className="mb-4 text-3xl">{problem.icon}</div>
                <H3 className="mb-3">{problem.title}</H3>
                <Body>{problem.description}</Body>
                <div className="absolute -right-[1px] -top-[1px] h-2 w-2 bg-neutral-200 transition-colors group-hover:bg-neutral-300" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Solution Section */}
      <section className="relative bg-white py-16 sm:py-24">
        <Container>
          <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-neutral-200 pb-6 sm:mb-16 sm:gap-6 sm:pb-8 md:flex-row md:items-end">
            <SectionHeader
              eyebrow="The Solution"
              title="Visualization Capabilities"
              description={
                <BodySmall className="max-w-md">
                  Built with expertise in data visualization, graph theory, and
                  real-time systems. Every visualization is designed for
                  production-grade debugging and optimization.
                </BodySmall>
              }
            />
          </div>

          <div className="grid grid-cols-1 gap-px border border-neutral-200 bg-neutral-200 md:grid-cols-2">
            {SOLUTIONS.map((solution) => (
              <div
                key={solution.label}
                className="bg-white p-6 transition-colors duration-300 hover:bg-neutral-50 sm:p-10"
              >
                <div className="mb-4 inline-block rounded-sm border border-neutral-200 bg-neutral-50 pt-1 pb-1 pr-2 pl-2 font-mono text-xs text-neutral-500 sm:mb-6">
                  {solution.label}
                </div>
                <H3 className="mb-3">{solution.title}</H3>
                <BodySmall className="mb-4">{solution.description}</BodySmall>
                <div className="flex flex-wrap gap-2">
                  {solution.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block rounded-sm border border-neutral-200 bg-neutral-50 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-neutral-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
