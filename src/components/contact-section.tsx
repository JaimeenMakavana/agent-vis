type ContactSectionProps = {
  status: string | null;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export function ContactSection({ status, onSubmit }: ContactSectionProps) {
  return (
    <section
      id="contact"
      className="relative z-10 border-t border-neutral-200 bg-white py-16 sm:py-24"
    >
      <div className="mr-auto ml-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-8 text-center sm:mb-12">
          <h2 className="mb-4 font-mono text-[10px] uppercase tracking-widest text-(--brand-blue)">
            Limited Access
          </h2>
          <h3 className="mb-4 text-2xl font-medium tracking-tighter text-neutral-900 sm:text-3xl md:text-4xl">
            Ready to scale your swarm?
          </h3>
          <p className="text-xs font-light text-neutral-500 sm:text-sm">
            Join the private beta. We are onboarding engineering teams manually
            to ensure service stability.
          </p>
        </div>

        <div className="rounded-sm bg-linear-to-b from-neutral-200 to-neutral-300 p-px shadow-sm">
          <form
            onSubmit={onSubmit}
            className="space-y-4 rounded-[1px] bg-neutral-50 p-6 sm:space-y-6 sm:p-8"
          >
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block font-mono text-[10px] uppercase text-neutral-500">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  className="input-base w-full rounded-sm px-3 py-3 text-sm"
                  placeholder="Alice Chen"
                />
              </div>
              <div>
                <label className="mb-1.5 block font-mono text-[10px] uppercase text-neutral-500">
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  className="input-base w-full rounded-sm px-3 py-3 text-sm"
                  placeholder="alice@startup.io"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block font-mono text-[10px] uppercase text-neutral-500">
                Company / GitHub
              </label>
              <input
                type="url"
                className="input-base w-full rounded-sm px-3 py-3 text-sm"
                placeholder="https://github.com/..."
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block font-mono text-[10px] uppercase text-neutral-500">
                  Monthly Token Usage
                </label>
                <select
                  required
                  className="input-base w-full rounded-sm px-3 py-3 text-sm text-neutral-600"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Tier
                  </option>
                  <option value="small">&lt; 1M Tokens</option>
                  <option value="medium">1M - 50M Tokens</option>
                  <option value="large">50M+ Tokens</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block font-mono text-[10px] uppercase text-neutral-500">
                  Primary Framework
                </label>
                <select
                  required
                  className="input-base w-full rounded-sm px-3 py-3 text-sm text-neutral-600"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Framework
                  </option>
                  <option value="langchain">LangChain</option>
                  <option value="autogen">AutoGen</option>
                  <option value="custom">Custom Implementation</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block font-mono text-[10px] uppercase text-neutral-500">
                Use Case
              </label>
              <textarea
                rows={4}
                required
                className="input-base w-full rounded-sm px-3 py-3 text-sm"
                placeholder="What are your agents building?"
              />
            </div>

            <div className="mt-4 rounded-sm bg-linear-to-b from-neutral-700 to-neutral-900 p-px shadow-sm">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-[1px] bg-neutral-900 py-4 text-xs font-semibold tracking-wide text-white transition-colors hover:bg-neutral-800"
              >
                REQUEST ACCESS
              </button>
            </div>

            {status && (
              <div className="text-center text-xs text-(--brand-blue)">
                {status}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}


