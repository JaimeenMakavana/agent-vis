"use client";
import { H2, Body, BodySmall } from "@/components/ui/typography";
import { Container } from "@/components/layout/container";
import { useOptimizationCalculator } from "@/hooks/useOptimizationCalculator";

export function OptimizationCalculator() {
  const {
    monthlyTokens,
    hallucinationRate,
    wastedSpend,
    agentVisSavings,
    setMonthlyTokens,
    setHallucinationRate,
    formatCurrency,
  } = useOptimizationCalculator();

  return (
    <section
      id="calculator"
      className="relative z-10 border-b border-[var(--brand-border-subtle)]  py-16 sm:py-24"
    >
      <Container size="md">
        <div className="mb-10 text-center">
          <p className="mb-2 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[var(--brand-blue)]">
            <span className="h-1 w-1 rounded-full bg-[var(--brand-blue)]" />
            Optimization Calculator
          </p>
          <H2>How much are zombie agents costing you?</H2>
        </div>

        <div className="rounded-sm bg-linear-to-b from-[var(--brand-border-subtle)] to-[var(--brand-border-strong)] p-px shadow-sm">
          <div className="flex flex-col rounded-sm bg-[var(--brand-surface-soft)] md:flex-row">
            {/* Inputs */}
            <div className="w-full border-b border-[var(--brand-border-subtle)] p-6 sm:p-8 md:w-1/2 md:border-b-0 md:border-r">
              <div className="space-y-8">
                <div>
                  <div className="mb-3 flex items-baseline justify-between">
                    <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--brand-border-strong)]">
                      Monthly Tokens (Millions)
                    </label>
                    <div className="text-sm font-medium text-[var(--foreground)]">
                      {monthlyTokens}M
                    </div>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={500}
                    step={10}
                    value={monthlyTokens}
                    onChange={(e) =>
                      setMonthlyTokens(parseInt(e.target.value, 10))
                    }
                    className="w-full"
                  />
                  <div className="mt-2 flex justify-between font-mono text-[10px] text-[var(--brand-muted)]">
                    <span>1M</span>
                    <span>500M+</span>
                  </div>
                </div>
                <div>
                  <div className="mb-3 flex items-baseline justify-between">
                    <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--brand-border-strong)]">
                      Hallucination Rate (%)
                    </label>
                    <div className="text-sm font-medium text-[var(--foreground)]">
                      {hallucinationRate}%
                    </div>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={50}
                    step={1}
                    value={hallucinationRate}
                    onChange={(e) =>
                      setHallucinationRate(parseInt(e.target.value, 10))
                    }
                    className="w-full"
                  />
                  <div className="mt-2 flex justify-between font-mono text-[10px] text-[var(--brand-muted)]">
                    <span>0%</span>
                    <span>50%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Outputs */}
            <div className="flex w-full flex-col justify-center bg-[var(--brand-surface)]/50 p-6 sm:p-8 md:w-1/2">
              <div className="mb-6 border-b border-[var(--brand-border-subtle)] pb-6">
                <span className="mb-1 block font-mono text-[10px] uppercase text-[var(--brand-border-strong)]">
                  Current Wasted Spend / Mo
                </span>
                <div className="text-2xl font-medium tracking-tight text-[var(--brand-blue)]">
                  ${formatCurrency(wastedSpend)}
                </div>
              </div>
              <div>
                <span className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase text-[var(--brand-blue)]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--brand-blue)]" />
                  Savings with AgentVis
                </span>
                <div className="mb-2 text-4xl font-semibold tracking-tighter text-[var(--foreground)]">
                  ${formatCurrency(agentVisSavings)}
                </div>
                <Body className="text-xs">
                  Recover up to{" "}
                  <span className="font-medium text-[var(--brand-blue)]">
                    85%
                  </span>{" "}
                  of wasted compute by detecting loops and optimizing context
                  windows early.
                </Body>
              </div>
            </div>
          </div>
        </div>
        <BodySmall className="mt-4 text-center text-[10px] text-[var(--brand-muted)]">
          Estimates based on average GPT-4o input/output pricing models.
        </BodySmall>
      </Container>
    </section>
  );
}
