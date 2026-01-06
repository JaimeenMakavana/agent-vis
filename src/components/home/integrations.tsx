import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { H3, BodySmall } from "@/components/ui/typography";

type IntegrationCardProps = {
  badge: string;
  title: string;
  icon: string;
  description: string;
  bullets: string[];
};

export function Integrations() {
  return (
    <section id="solutions" className="relative z-10 py-16 sm:py-24">
      <Container size="md">
        <SectionHeader
          eyebrow="Integrations"
          title="Works where you build."
          align="center"
          className="mb-12 sm:mb-16"
        />

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
          <IntegrationCard
            badge="PYTHON & TS"
            title="SDK & Middleware"
            icon="<>"
            description="Drop-in middleware for Express, FastAPI, and Next.js API routes. Captures request/response cycles automatically without changing your business logic."
            bullets={["Async Capture", "OpenTelemetry Compatible"]}
          />
          <IntegrationCard
            badge="NO-CODE"
            title="Platform Connectors"
            icon="↻"
            description="Building on Flowise or LangFlow? Use our native connectors to pipe execution data directly into AgentVis for analysis."
            bullets={["One-Click Setup", "Real-time WebSocket Stream"]}
          />
        </div>
      </Container>
    </section>
  );
}

function IntegrationCard({
  badge,
  title,
  icon,
  description,
  bullets,
}: IntegrationCardProps) {
  return (
    <div className="group relative h-full rounded-sm bg-linear-to-b from-[var(--brand-border-subtle)] via-[var(--brand-border-subtle)] to-[var(--brand-border-strong)] p-px transition-all.duration-300 hover:from-[var(--brand-border-strong)] hover:via-[var(--brand-muted)] hover:to-[var(--brand-border-strong)]">
      <div className="relative z-10 flex h-full flex-col rounded-sm bg-[var(--brand-surface)] p-6 sm:p-8">
        <div className="mb-4 flex items-start justify-between sm:mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-[var(--brand-border-subtle)] bg-[var(--brand-surface-soft)] text-[var(--brand-blue)] shadow-sm">
            {icon}
          </div>
          <span className="rounded-sm border border-[var(--brand-border-subtle)] bg-[var(--brand-surface-soft)] px-2 py-1 font-mono text-[10px] text-[var(--brand-border-strong)]">
            {badge}
          </span>
        </div>
        <H3 className="mb-2">{title}</H3>
        <BodySmall className="mb-6">{description}</BodySmall>
        <ul className="mt-auto border-t border-[var(--brand-border-subtle)] pt-4 sm:pt-6">
          {bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-center gap-2 text-[11px] text-[var(--brand-border-strong)]"
            >
              <span className="h-1 w-1 rounded-full bg-[var(--brand-border-subtle)]" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
