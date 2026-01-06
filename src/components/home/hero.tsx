import { Container } from "@/components/layout/container";
import { PrimaryCtaFrame } from "@/components/ui/primary-cta-frame";
import { H1, Body } from "@/components/ui/typography";

const HERO_STATS = [
  {
    value: "1B+",
    label: "Tokens Analyzed",
  },
  {
    value: "< 10ms",
    label: "Tracing Latency",
  },
  {
    value: "LangChain",
    label: "Native Support",
  },
  {
    value: "Self-Host",
    label: "Or Cloud Managed",
  },
];

export function Hero() {
  return (
    <section className="pb-12 pt-24 sm:pb-24 sm:pt-32">
      <Container>
        <div className="relative flex flex-col items-start gap-x-6 gap-y-6 border-l border-[var(--brand-border-subtle)] pb-20 pl-6 sm:gap-8 sm:pl-8 md:pl-12">
          {/* Decorator */}
          <div
            className="absolute -left-[5px] top-0 h-[9px] w-[9px] border border-[var(--brand-border-subtle)] bg-[var(--brand-surface)]"
            aria-hidden="true"
          />

          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-border-subtle)] bg-[var(--brand-surface-soft)]/80 px-3 py-1.5 shadow-sm backdrop-blur-sm animate-in animate-in-delay-1">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--brand-blue-soft)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--brand-blue)]" />
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wide text-[var(--brand-blue)]">
              v1.0 Public Beta Live
            </span>
          </div>

          <H1 className="animate-in animate-in-delay-2 ">
            Turn the Black Box
            <br />
            <span className="text-4xl text-[var(--brand-muted)]">
              into a Glass Box.
            </span>
          </H1>

          <Body className="animate-in animate-in-delay-2 max-w-xl">
            A Next.js-based visualization suite for Multi-Agent Systems. Debug
            logic loops, audit tool usage, and optimize token spend in
            real-time.
          </Body>

          <div className="mt-4 flex w-full flex-col gap-3 animate-in animate-in-delay-3 sm:mt-6 sm:w-auto sm:flex-row sm:gap-4">
            <PrimaryCtaFrame tone="dark" className="w-full sm:w-auto">
              <a
                href="#contact"
                className="block h-full w-full rounded-[1px] bg-[var(--background)] pt-3.5 pb-3.5 pr-6 pl-6 text-center text-xs font-semibold rounded-sm tracking-wide text-[var(--foreground)] transition-colors hover:bg-[var(--brand-surface)]"
              >
                START MONITORING
              </a>
            </PrimaryCtaFrame>
            <PrimaryCtaFrame
              tone="light"
              className="w-full transition-all hover:from-[var(--brand-border-subtle)] hover:to-[var(--brand-muted)] sm:w-auto"
            >
              <a
                href="https://github.com/JaimeenMakavana/agent-vis"
                target="_blank"
                rel="noreferrer"
                className="flex rounded-sm h-full w-full items-center justify-center gap-2 rounded-[1px] bg-[var(--brand-surface-soft)]/90 pt-3.5 pb-3.5 pr-6 pl-6 text-center text-xs font-medium text-[var(--brand-accent)] backdrop-blur-sm transition-colors hover:text-[var(--foreground)]"
              >
                VIEW CODE
              </a>
            </PrimaryCtaFrame>
          </div>
        </div>
      </Container>

      {/* Fade overlay */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-40 bg-linear-to-t from-[var(--brand-surface)] via-[var(--brand-surface-soft)]/80 to-transparent" />

      {/* Stats grid */}
      <div className="relative z-30 mt-8 grid grid-cols-2 border-y border-[var(--brand-border-subtle)] bg-[var(--brand-surface-soft)]/60 backdrop-blur-sm animate-in animate-in-delay-3 sm:mt-16 md:grid-cols-4">
        {HERO_STATS.map((stat, index) => {
          const isFirstRow = index < 2;
          const isFirstCol = index % 2 === 0;
          const borderTop = isFirstRow ? "" : "border-t md:border-t-0";
          const borderRight =
            isFirstCol || index < 2
              ? "border-r border-[var(--brand-border-subtle)]"
              : "";

          return (
            <div
              key={stat.label}
              className={`${borderTop} ${borderRight} border-[var(--brand-border-subtle)] p-4 text-center sm:p-8`}
            >
              <div className="mb-1 text-xl font-medium tracking-tighter text-[var(--foreground)] sm:text-2xl md:text-3xl">
                {stat.value}
              </div>
              <div className="font-mono text-[9px] uppercase tracking-widest text-[var(--brand-border-strong)] sm:text-[10px]">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
