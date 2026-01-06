"use client";
import { Container } from "@/components/layout/container";
import { PrimaryCtaFrame } from "@/components/ui/primary-cta-frame";
import { H2, Body, BodySmall } from "@/components/ui/typography";
import { useLeadMagnetStatus } from "@/hooks/useLeadMagnetStatus";

export function DocsLeadMagnet() {
  const { status, handleSubmit } = useLeadMagnetStatus();
  return (
    <section
      id="audit"
      className="relative z-10 border-b border-[var(--brand-border-subtle)]  py-16 sm:py-24"
    >
      <Container size="md">
        <div className="rounded-sm bg-linear-to-b from-[var(--brand-border-subtle)] to-[var(--brand-border-strong)] p-px shadow-sm">
          <div className="rounded-sm bg-[var(--brand-surface-soft)] p-6 sm:p-8 md:p-12">
            <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
              <div className="flex-1">
                <div className="mb-4 inline-flex items-center gap-2 rounded-sm border border-[var(--brand-blue-soft)]/30 bg-[var(--brand-blue-soft)]/10 px-2 py-1 sm:mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--brand-blue)]">
                    Developer Docs
                  </span>
                </div>
                <H2 className="mb-4">Quickstart with 2 lines of code</H2>
                <Body className="mb-6">
                  Integrate AgentVis SDK into your Python or TypeScript project
                  in minutes. Compatible with LangChain, AutoGen, and custom
                  loops.
                </Body>
                <div className="mb-6 rounded-sm border border-[var(--brand-border-strong)] bg-[var(--background)] p-4 font-mono text-xs text-[var(--brand-muted)]">
                  <span className="text-[var(--brand-blue)]">npm</span> install
                  @agentvis/sdk
                  <br />
                  <span className="text-[var(--brand-border-strong)]">
                    # Or for Python
                  </span>
                  <br />
                  <span className="text-[var(--brand-blue)]">pip</span> install
                  agentvis
                </div>
                <ul className="mb-6 space-y-2 sm:mb-8">
                  <li className="flex items-center gap-3 text-xs text-[var(--brand-border-strong)]">
                    Automatic trace capture
                  </li>
                  <li className="flex items-center gap-3 text-xs text-[var(--brand-border-strong)]">
                    Secure PII redaction
                  </li>
                </ul>
              </div>

              <div className="w-full md:w-80">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="mb-1.5 block font-mono text-[10px] uppercase text-[var(--brand-border-strong)]">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="dev@company.com"
                      className="input-base w-full rounded-sm px-3 py-3 text-sm placeholder:text-[var(--brand-muted)]"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block font-mono text-[10px] uppercase text-[var(--brand-border-strong)]">
                      Organization
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Company Name"
                      className="input-base w-full rounded-sm px-3 py-3 text-sm placeholder:text-[var(--brand-muted)]"
                    />
                  </div>
                  <PrimaryCtaFrame tone="dark">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-[1px] bg-[var(--background)] px-4 py-3 text-xs font-semibold tracking-wide text-[var(--foreground)] transition-colors hover:bg-[var(--brand-surface)]"
                    >
                      {status ?? "GET API KEYS"}
                    </button>
                  </PrimaryCtaFrame>
                  <BodySmall className="text-center text-[10px] text-[var(--brand-muted)]">
                    Free up to 10k traces/mo.
                  </BodySmall>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
