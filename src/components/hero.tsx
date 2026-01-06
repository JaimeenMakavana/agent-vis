export function Hero() {
  return (
    <section className="mr-auto ml-auto max-w-6xl px-4 pb-12 pt-24 sm:px-6 sm:pb-24 sm:pt-32">
      <div className="relative flex flex-col items-start gap-x-6 gap-y-6 border-l border-neutral-200 pb-20 pl-6 sm:gap-8 sm:pl-8 md:pl-12">
        {/* Decorator */}
        <div
          className="absolute -left-[5px] top-0 h-[9px] w-[9px] border border-neutral-200 bg-(--brand-surface)"
          aria-hidden="true"
        />

        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50/80 px-3 py-1.5 shadow-sm backdrop-blur-sm animate-in animate-in-delay-1">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-(--brand-blue-soft) opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-(--brand-blue)" />
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wide text-(--brand-blue)">
            v1.0 Public Beta Live
          </span>
        </div>

        <h1 className="animate-in animate-in-delay-2 text-3xl font-medium tracking-tighter text-neutral-900 leading-[1.1] sm:text-5xl md:text-7xl">
          Turn the Black Box
          <br />
          <span className="text-4xl text-neutral-400">into a Glass Box.</span>
        </h1>

        <p className="animate-in animate-in-delay-2 max-w-xl text-sm font-light leading-relaxed text-neutral-500 md:text-base">
          A Next.js-based visualization suite for Multi-Agent Systems. Debug
          logic loops, audit tool usage, and optimize token spend in real-time.
        </p>

        <div className="mt-4 flex w-full flex-col gap-3 animate-in animate-in-delay-3 sm:mt-6 sm:w-auto sm:flex-row sm:gap-4">
          <div className="w-full rounded-sm bg-linear-to-b from-neutral-700 to-neutral-900 p-px shadow-sm sm:w-auto">
            <a
              href="#contact"
              className="block h-full w-full rounded-[1px] bg-neutral-900 pt-3.5 pb-3.5 pr-6 pl-6 text-center text-xs font-semibold tracking-wide text-white transition-colors hover:bg-neutral-800"
            >
              START MONITORING
            </a>
          </div>
          <div className="w-full rounded-sm bg-linear-to-b from-neutral-200 to-neutral-300 p-px shadow-sm transition-all hover:from-neutral-300 hover:to-neutral-400 sm:w-auto">
            <a
              href="#audit"
              className="flex h-full w-full items-center justify-center gap-2 rounded-[1px] bg-white/90 pt-3.5 pb-3.5 pr-6 pl-6 text-center text-xs font-medium text-neutral-600 backdrop-blur-sm transition-colors hover:text-black"
            >
              <span className="h-3 w-3 rounded-sm border border-neutral-400" />
              VIEW DOCUMENTATION
            </a>
          </div>
        </div>
      </div>

      {/* Fade overlay */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-40 bg-linear-to-t from-(--brand-surface) via-white/80 to-transparent" />

      {/* Stats grid */}
      <div className="relative z-30 mt-8 grid grid-cols-2 border-y border-neutral-200 bg-white/60 backdrop-blur-sm animate-in animate-in-delay-3 sm:mt-16 md:grid-cols-4">
        <div className="border-r border-neutral-200 p-4 text-center sm:p-8">
          <div className="mb-1 text-xl font-medium tracking-tighter text-neutral-900 sm:text-2xl md:text-3xl">
            1B+
          </div>
          <div className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 sm:text-[10px]">
            Tokens Analyzed
          </div>
        </div>
        <div className="border-neutral-200 p-4 text-center sm:p-8 md:border-r">
          <div className="mb-1 text-xl font-medium tracking-tighter text-neutral-900 sm:text-2xl md:text-3xl">
            &lt; 10ms
          </div>
          <div className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 sm:text-[10px]">
            Tracing Latency
          </div>
        </div>
        <div className="border-t border-r border-neutral-200 p-4 text-center sm:p-8 md:border-t-0">
          <div className="mb-1 text-xl font-medium tracking-tighter text-neutral-900 sm:text-2xl md:text-3xl">
            LangChain
          </div>
          <div className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 sm:text-[10px]">
            Native Support
          </div>
        </div>
        <div className="border-t border-neutral-200 p-4 text-center sm:p-8 md:border-t-0">
          <div className="mb-1 text-xl font-medium tracking-tighter text-neutral-900 sm:text-2xl md:text-3xl">
            Self-Host
          </div>
          <div className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 sm:text-[10px]">
            Or Cloud Managed
          </div>
        </div>
      </div>
    </section>
  );
}


