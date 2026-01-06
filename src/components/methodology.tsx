export function Methodology() {
  const items = [
    {
      label: "01 / TRACING",
      title: "Live Execution Graphs",
      body: "Visualize agent decisions as a directed graph. See exactly which tool was called, what the input was, and the raw LLM response in real-time.",
    },
    {
      label: "02 / DEBUGGING",
      title: "Time-Travel Replay",
      body: "Step through past executions. Fork a failed run, edit the state or prompt, and replay to verify the fix without re-running the whole chain.",
    },
    {
      label: "03 / AUDITING",
      title: "Token Economics",
      body: "Granular cost analysis per agent, per tool, and per session. Identify the heavy prompts that are blowing up your OpenAI bill.",
    },
  ];

  return (
    <section id="process" className="relative z-10 bg-white py-16 sm:py-24">
      <div className="mr-auto ml-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-neutral-200 pb-6 sm:mb-16 sm:gap-6 sm:pb-8 md:flex-row md:items-end">
          <div>
            <h2 className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-(--brand-blue)">
              <span className="h-1 w-1 rounded-full bg-(--brand-blue)" />
              Our Methodology
            </h2>
            <h3 className="text-2xl font-medium tracking-tighter text-neutral-900 sm:text-2xl">
              Trace. Replay. Resolve.
            </h3>
          </div>
          <p className="max-w-md text-xs font-light text-neutral-500 sm:text-xs">
            AgentVis hooks directly into your LLM chain execution, providing a
            visual timeline of every thought, action, and observation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px border border-neutral-200 bg-neutral-200 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.label}
              className="bg-white p-6 transition-colors duration-300 hover:bg-neutral-50 sm:p-10"
            >
              <div className="mb-4 inline-block rounded-sm border border-neutral-200 bg-neutral-50 pt-1 pb-1 pr-2 pl-2 font-mono text-xs text-neutral-500 sm:mb-6">
                {item.label}
              </div>
              <h4 className="mb-3 text-base font-medium tracking-tight text-neutral-900 sm:text-lg">
                {item.title}
              </h4>
              <p className="text-xs font-light leading-relaxed text-neutral-500">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


