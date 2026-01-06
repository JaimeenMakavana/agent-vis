type OptimizationCalculatorProps = {
  monthlyTokens: number;
  hallucinationRate: number;
  wastedSpend: number;
  agentVisSavings: number;
  onMonthlyTokensChange: (value: number) => void;
  onHallucinationRateChange: (value: number) => void;
  formatCurrency: (value: number) => string;
};

export function OptimizationCalculator(props: OptimizationCalculatorProps) {
  const {
    monthlyTokens,
    hallucinationRate,
    wastedSpend,
    agentVisSavings,
    onMonthlyTokensChange,
    onHallucinationRateChange,
    formatCurrency,
  } = props;

  return (
    <section
      id="calculator"
      className="relative z-10 border-b border-neutral-200 bg-neutral-50 py-16 sm:py-24"
    >
      <div className="mr-auto ml-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="mb-4 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-widest text-(--brand-blue)">
            <span className="h-1 w-1 rounded-full bg-(--brand-blue)" />
            Optimization Calculator
          </h2>
          <h3 className="text-2xl font-medium tracking-tighter text-neutral-900 sm:text-3xl">
            How much are zombie agents costing you?
          </h3>
        </div>

        <div className="rounded-sm bg-linear-to-b from-neutral-200 to-neutral-300 p-px shadow-sm">
          <div className="flex flex-col rounded-[1px] bg-white md:flex-row">
            {/* Inputs */}
            <div className="w-full border-b border-neutral-100 p-6 sm:p-8 md:w-1/2 md:border-b-0 md:border-r">
              <div className="space-y-8">
                <div>
                  <div className="mb-3 flex items-baseline justify-between">
                    <label className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                      Monthly Tokens (Millions)
                    </label>
                    <div className="text-sm font-medium text-neutral-900">
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
                      onMonthlyTokensChange(parseInt(e.target.value, 10))
                    }
                    className="w-full"
                  />
                  <div className="mt-2 flex justify-between font-mono text-[10px] text-neutral-400">
                    <span>1M</span>
                    <span>500M+</span>
                  </div>
                </div>
                <div>
                  <div className="mb-3 flex items-baseline justify-between">
                    <label className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                      Hallucination Rate (%)
                    </label>
                    <div className="text-sm font-medium text-neutral-900">
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
                      onHallucinationRateChange(parseInt(e.target.value, 10))
                    }
                    className="w-full"
                  />
                  <div className="mt-2 flex justify-between font-mono text-[10px] text-neutral-400">
                    <span>0%</span>
                    <span>50%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Outputs */}
            <div className="flex w-full flex-col justify-center bg-neutral-50/50 p-6 sm:p-8 md:w-1/2">
              <div className="mb-6 border-b border-neutral-200 pb-6">
                <span className="mb-1 block font-mono text-[10px] uppercase text-neutral-500">
                  Current Wasted Spend / Mo
                </span>
                <div className="text-2xl font-medium tracking-tight text-red-500">
                  ${formatCurrency(wastedSpend)}
                </div>
              </div>
              <div>
                <span className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase text-(--brand-blue)">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-(--brand-blue)" />
                  Savings with AgentVis
                </span>
                <div className="mb-2 text-4xl font-semibold tracking-tighter text-neutral-900">
                  ${formatCurrency(agentVisSavings)}
                </div>
                <p className="text-xs font-light leading-relaxed text-neutral-500">
                  Recover up to{" "}
                  <span className="font-medium text-(--brand-blue)">85%</span>{" "}
                  of wasted compute by detecting loops and optimizing context
                  windows early.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-[10px] text-neutral-400">
          Estimates based on average GPT-4o input/output pricing models.
        </p>
      </div>
    </section>
  );
}


