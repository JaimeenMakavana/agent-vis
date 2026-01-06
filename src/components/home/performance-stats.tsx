export function PerformanceStats() {
  return (
    <section className="relative z-10 border-b border-neutral-200 bg-white pt-16 pb-16 sm:py-24">
      <div className="relative z-10 mr-auto ml-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 border-b border-neutral-200 pb-6 sm:mb-16 sm:gap-10 sm:pb-8 lg:flex-row">
          <h2 className="max-w-2xl text-2xl font-medium tracking-tight text-neutral-900 leading-[1.1] sm:text-3xl md:text-4xl">
            Powering the next generation of{" "}
            <span className="text-neutral-400">autonomous software</span>.
          </h2>
          <a
            href="#contact"
            className="flex items-center gap-2 border-b border-neutral-200 pb-1 text-sm font-medium text-neutral-900 transition-colors hover:border-(--brand-blue) hover:text-(--brand-blue)"
          >
            Start Integration
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path
                d="M7 7h10v10M7 17L17 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Testimonial */}
          <div className="group relative h-full rounded-sm bg-linear-to-b from-neutral-200 via-neutral-200 to-neutral-300 p-px transition-all duration-300">
            <div className="relative z-10 flex min-h-[320px] flex-col justify-between rounded-[1px] bg-neutral-50 p-6 sm:p-8">
              <div>
                <h3 className="mb-4 text-base font-medium tracking-tight text-neutral-900 leading-tight sm:text-lg">
                  &quot;Finally, I can see what my swarm is doing.&quot;
                </h3>
                <p className="text-xs font-light leading-relaxed text-neutral-500 sm:text-sm">
                  &quot;Debugging AutoGPT was a nightmare of scrolling through
                  terminal logs. AgentVis made it visual. We cut our debugging
                  time by 70%.&quot;
                </p>
              </div>
              <div className="mt-6 border-t border-neutral-200 pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-sm font-medium text-neutral-900">
                    DL
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium leading-none text-neutral-900">
                      David Liu
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                      AI Engineer, TechFlow
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="group relative h-full rounded-sm bg-linear-to-b from-neutral-200 via-neutral-200 to-neutral-300 p-px transition-all duration-300">
            <div className="relative z-10 flex min-h-[320px] flex-col items-center justify-between rounded-[1px] bg-neutral-50 p-6 sm:p-8">
              <div className="text-center">
                <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-neutral-500">
                  PERFORMANCE
                </span>
                <span className="text-sm font-medium tracking-tight text-neutral-900">
                  Average Token Reduction
                </span>
              </div>
              <div className="relative flex h-32 w-32 items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-neutral-200" />
                <div className="text-3xl font-medium tracking-tighter text-neutral-900">
                  32%
                </div>
              </div>
              <button className="w-full rounded-sm border border-neutral-200 bg-white py-3 text-xs font-semibold tracking-wide text-neutral-900 transition-colors hover:bg-neutral-100">
                VIEW BENCHMARKS
              </button>
            </div>
          </div>

          {/* Enterprise CTA */}
          <div className="group relative h-full rounded-sm bg-linear-to-b from-neutral-800 to-neutral-700 sm:col-span-2 lg:col-span-1">
            <div className="relative z-10 flex min-h-[320px] flex-col justify-between rounded-[1px] bg-neutral-900 p-6 text-white sm:p-8">
              <div className="flex items-start justify-between">
                <span className="text-base font-medium tracking-tight sm:text-lg">
                  Enterprise Support
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  className="text-neutral-500"
                >
                  <path
                    d="M7 7h10v10M7 17L17 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-base font-light leading-relaxed text-neutral-300">
                Need on-prem deployment, custom retention policies, or SSO? Our
                engineering team is ready to help.
              </p>
              <div className="space-y-3 text-sm text-neutral-400">
                <a
                  href="mailto:sales@agentvis.io"
                  className="flex items-center gap-x-3 text-sm text-neutral-300 transition-colors hover:text-white"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-(--brand-blue) opacity-50" />
                  sales@agentvis.io
                </a>
                <div className="flex items-center gap-x-3 text-sm text-neutral-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-(--brand-blue) opacity-50" />
                  San Francisco, CA
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



