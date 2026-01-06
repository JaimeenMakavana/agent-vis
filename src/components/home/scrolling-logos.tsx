const LOGOS = ["AutoGPT", "LangChain", "CrewAI", "OpenAI", "Pinecone"];

export function ScrollingLogos() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--brand-border-subtle)] bg-[var(--brand-surface-soft)] py-12 pause-on-hover">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-[var(--brand-surface-soft)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-[var(--brand-surface-soft)] to-transparent" />

      <div className="animate-scroll flex">
        {[0, 1].map((loopIndex) => (
          <LogoRow
            key={loopIndex}
            className="flex min-w-max items-center gap-16 px-8"
          />
        ))}
      </div>
    </section>
  );
}

function LogoRow({ className }: { className?: string }) {
  return (
    <div className={className}>
      {LOGOS.map((name) => (
        <LogoBadge key={name} name={name} />
      ))}
    </div>
  );
}

function LogoBadge({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2 text-lg font-semibold tracking-tight text-[var(--brand-muted)] grayscale transition-all duration-300 hover:grayscale-0">
      <span className="h-6 w-6 rounded-sm border border-[var(--brand-border-subtle)]" />
      <span>{name}</span>
    </div>
  );
}
