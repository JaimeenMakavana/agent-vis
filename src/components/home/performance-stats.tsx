export function PerformanceStats() {
  return (
    <section className="relative z-10 border-b border-[var(--brand-border-subtle)] pt-16 pb-16 sm:py-24">
      <div className="relative z-10 mr-auto ml-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 border-b border-[var(--brand-border-subtle)] pb-6 sm:mb-16 sm:gap-10 sm:pb-8 lg:flex-row">
          <h2 className="max-w-2xl text-2xl font-medium tracking-tight text-[var(--foreground)] leading-[1.1] sm:text-3xl md:text-4xl">
            Powering the next generation of{" "}
            <span className="text-[var(--brand-muted)]">
              autonomous software
            </span>
            .
          </h2>
          <a
            href="#contact"
            className="flex items-center gap-2 border-b border-[var(--brand-border-subtle)] pb-1 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)]"
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
          <div className="group relative h-full rounded-sm bg-linear-to-b from-[var(--brand-border-subtle)] via-[var(--brand-border-subtle)] to-[var(--brand-border-strong)] p-px transition-all duration-300">
            <div className="relative z-10 flex min-h-[320px] flex-col justify-between rounded-[1px] bg-[var(--brand-surface)] p-6 sm:p-8">
              <div>
                <h3 className="mb-4 text-base font-medium tracking-tight text-[var(--foreground)] leading-tight sm:text-lg">
                  &quot;Finally, I can see what my swarm is doing.&quot;
                </h3>
                <p className="text-xs font-light leading-relaxed text-[var(--brand-border-strong)] sm:text-sm">
                  &quot;Debugging AutoGPT was a nightmare of scrolling through
                  terminal logs. AgentVis made it visual. We cut our debugging
                  time by 70%.&quot;
                </p>
              </div>
              <div className="mt-6 border-t border-[var(--brand-border-subtle)] pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--brand-border-subtle)] bg-[var(--brand-surface-soft)] text-sm font-medium text-[var(--foreground)]">
                    DL
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium leading-none text-[var(--foreground)]">
                      David Liu
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--brand-border-strong)]">
                      AI Engineer, TechFlow
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="group relative h-full rounded-sm bg-linear-to-b from-[var(--brand-border-subtle)] via-[var(--brand-border-subtle)] to-[var(--brand-border-strong)] p-px transition-all duration-300">
            <div className="relative z-10 flex min-h-[320px] flex-col items-center justify-between rounded-[1px] bg-[var(--brand-surface)] p-6 sm:p-8">
              <div className="text-center">
                <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-[var(--brand-border-strong)]">
                  PERFORMANCE
                </span>
                <span className="text-sm font-medium tracking-tight text-[var(--foreground)]">
                  Average Token Reduction
                </span>
              </div>
              <div className="relative flex h-32 w-32 items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-[var(--brand-border-subtle)]" />
                <div className="text-3xl font-medium tracking-tighter text-[var(--foreground)]">
                  32%
                </div>
              </div>
              <button className="w-full rounded-sm border border-[var(--brand-border-subtle)] bg-[var(--brand-surface-soft)] py-3 text-xs font-semibold tracking-wide text-[var(--foreground)] transition-colors hover:bg-[var(--brand-surface)]">
                VIEW BENCHMARKS
              </button>
            </div>
          </div>

          {/* Enterprise CTA */}
          <div className="group relative h-full rounded-sm bg-linear-to-b from-[var(--brand-surface)] to-[var(--brand-border-strong)] sm:col-span-2 lg:col-span-1">
            <div className="relative z-10 flex min-h-[320px] flex-col justify-between rounded-[1px] bg-[var(--background)] p-6 text-[var(--foreground)] sm:p-8">
              <div className="flex items-start justify-between">
                <span className="text-base font-medium tracking-tight sm:text-lg">
                  Enterprise Support
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  className="text-[var(--brand-border-strong)]"
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
              <p className="text-base font-light leading-relaxed text-[var(--brand-muted)]">
                Need on-prem deployment, custom retention policies, or SSO? Our
                engineering team is ready to help.
              </p>
              <div className="space-y-3 text-sm text-[var(--brand-muted)]">
                <a
                  href="mailto:sales@agentvis.io"
                  className="flex items-center gap-x-3 text-sm text-[var(--brand-muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-blue)] opacity-50" />
                  sales@agentvis.io
                </a>
                <div className="flex items-center gap-x-3 text-sm text-[var(--brand-muted)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-blue)] opacity-50" />
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
