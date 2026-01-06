const LOGOS = ["AutoGPT", "LangChain", "CrewAI", "OpenAI", "Pinecone"];

export function ScrollingLogos() {
  return (
    <section className="relative overflow-hidden border-b border-neutral-200 bg-white py-12 pause-on-hover">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-white to-transparent" />

      <div className="animate-scroll flex">
        {/* First set */}
        <div className="flex min-w-max items-center gap-x-16 gap-y-16 px-8">
          {LOGOS.map((name) => (
            <LogoBadge key={name} name={name} />
          ))}
        </div>
        {/* Second set (duplicate) */}
        <div className="flex min-w-max items-center gap-16 px-8">
          {LOGOS.map((name) => (
            <LogoBadge key={`${name}-2`} name={name} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LogoBadge({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2 text-lg font-semibold tracking-tight text-neutral-400 grayscale transition-all duration-300 hover:grayscale-0">
      <span className="h-6 w-6 rounded-sm border border-neutral-300" />
      <span>{name}</span>
    </div>
  );
}


