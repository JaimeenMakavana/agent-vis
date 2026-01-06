type DocsLeadMagnetProps = {
  status: string | null;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export function DocsLeadMagnet({ status, onSubmit }: DocsLeadMagnetProps) {
  return (
    <section
      id="audit"
      className="relative z-10 border-b border-neutral-200 bg-neutral-50 py-16 sm:py-24"
    >
      <div className="mr-auto ml-auto max-w-4xl px-4 sm:px-6">
        <div className="rounded-sm bg-linear-to-b from-neutral-200 to-neutral-300 p-px shadow-sm">
          <div className="rounded-[1px] bg-white p-6 sm:p-8 md:p-12">
            <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
              <div className="flex-1">
                <div className="mb-4 inline-flex items-center gap-2 rounded-sm border border-blue-100 bg-blue-50 px-2 py-1 sm:mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-(--brand-blue)">
                    Developer Docs
                  </span>
                </div>
                <h2 className="mb-4 text-2xl font-medium tracking-tight text-neutral-900 sm:text-3xl">
                  Quickstart with 2 lines of code
                </h2>
                <p className="mb-6 text-xs font-light leading-relaxed text-neutral-500 sm:text-sm">
                  Integrate AgentVis SDK into your Python or TypeScript project
                  in minutes. Compatible with LangChain, AutoGen, and custom
                  loops.
                </p>
                <div className="mb-6 rounded-sm border border-neutral-800 bg-neutral-900 p-4 font-mono text-xs text-neutral-300">
                  <span className="text-(--brand-blue)">npm</span> install
                  @agentvis/sdk
                  <br />
                  <span className="text-neutral-500"># Or for Python</span>
                  <br />
                  <span className="text-(--brand-blue)">pip</span> install
                  agentvis
                </div>
                <ul className="mb-6 space-y-2 sm:mb-8">
                  <li className="flex items-center gap-3 text-xs text-neutral-600">
                    Automatic trace capture
                  </li>
                  <li className="flex items-center gap-3 text-xs text-neutral-600">
                    Secure PII redaction
                  </li>
                </ul>
              </div>

              <div className="w-full md:w-80">
                <form onSubmit={onSubmit} className="space-y-4">
                  <div>
                    <label className="mb-1.5 block font-mono text-[10px] uppercase text-neutral-500">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="dev@company.com"
                      className="input-base w-full rounded-sm px-3 py-3 text-sm placeholder:text-neutral-400"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block font-mono text-[10px] uppercase text-neutral-500">
                      Organization
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Company Name"
                      className="input-base w-full rounded-sm px-3 py-3 text-sm placeholder:text-neutral-400"
                    />
                  </div>
                  <div className="rounded-sm bg-linear-to-b from-neutral-700 to-neutral-900 p-px shadow-sm">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-[1px] bg-neutral-900 px-4 py-3 text-xs font-semibold tracking-wide text-white transition-colors hover:bg-neutral-800"
                    >
                      {status ?? "GET API KEYS"}
                    </button>
                  </div>
                  <p className="text-center text-[10px] text-neutral-400">
                    Free up to 10k traces/mo.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


