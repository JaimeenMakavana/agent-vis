export function VisibilityGap() {
  return (
    <section className="relative z-10 border-b border-neutral-200 bg-white py-16 sm:py-24">
      <div className="mr-auto ml-auto max-w-4xl px-4 sm:px-6">
        <h2 className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-(--brand-blue)">
          <span className="h-1 w-1 rounded-full bg-(--brand-blue)" />
          The Visibility Gap
        </h2>
        <h3 className="mb-8 text-2xl font-medium tracking-tighter text-neutral-900 sm:mb-12 sm:text-3xl md:text-4xl">
          Why are your agents hallucinating?
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
          <ProblemCard
            icon="!"
            title="Infinite Loops & Stalls"
            body="Agents get stuck in logic loops, consuming credits without producing output. Identifying the exact step of failure in the logs is painful."
            tone="orange"
          />
          <ProblemCard
            icon="$"
            title="Runaway Token Costs"
            body="Recursive thoughts and verbose contexts drain your API budget. Without visibility into prompt size per step, optimization is guesswork."
            tone="red"
          />
        </div>
      </div>
    </section>
  );
}

type ProblemCardProps = {
  icon: string;
  title: string;
  body: string;
  tone: "orange" | "red";
};

function ProblemCard({ icon, title, body, tone }: ProblemCardProps) {
  const toneClass = tone === "orange" ? "text-orange-500" : "text-red-500";

  return (
    <div className="group relative h-full rounded-sm bg-linear-to-b from-neutral-200 via-neutral-200 to-neutral-300 p-px transition-all duration-500 hover:from-neutral-300 hover:via-neutral-400 hover:to-neutral-500">
      <div className="relative z-10 flex h-full flex-col rounded-[1px] bg-neutral-50 p-6 sm:p-8">
        <div
          className={`mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm sm:mb-6 ${toneClass}`}
        >
          {icon}
        </div>
        <h4 className="mb-2 text-base font-medium tracking-tight text-neutral-900">
          {title}
        </h4>
        <p className="text-xs font-light leading-relaxed text-neutral-500">
          {body}
        </p>
      </div>
    </div>
  );
}


