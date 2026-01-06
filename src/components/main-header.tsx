import Link from "next/link";

type NavItem = {
  label: string;
  href: string;
};

type NavSection = {
  id: string;
  label: string;
  href: string;
  items: NavItem[];
};

const NAV_SECTIONS: NavSection[] = [
  {
    id: "traceability",
    label: "TRACEABILITY",
    href: "/traceability",
    items: [
      { label: "Chain of Thought", href: "/traceability/chain-of-thought" },
      { label: "Tree of Thoughts", href: "/traceability/tree-of-thoughts" },
      { label: "Async Timeline", href: "/traceability/async-timeline" },
    ],
  },
  {
    id: "orchestration",
    label: "ORCHESTRATION",
    href: "/orchestration",
    items: [
      { label: "Swarm Network", href: "/orchestration/swarm-network" },
      {
        label: "Conversation Sequence",
        href: "/orchestration/conversation-sequence",
      },
      { label: "Swimlanes", href: "/orchestration/swimlanes" },
    ],
  },
  {
    id: "memory",
    label: "MEMORY",
    href: "/memory",
    items: [
      { label: "Vector Space", href: "/memory/vector-space" },
      { label: "Context Window", href: "/memory/context-window" },
      { label: "Knowledge Graph", href: "/memory/knowledge-graph" },
    ],
  },
  {
    id: "observability",
    label: "OBSERVABILITY",
    href: "/observability",
    items: [
      {
        label: "Latency Waterfall",
        href: "/observability/latency-waterfall",
      },
      { label: "Risk Heatmap", href: "/observability/risk-heatmap" },
      { label: "Token Burndown", href: "/observability/token-burndown" },
    ],
  },
];

export function MainHeader() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md supports-backdrop-filter:bg-white/60">
      <div className="mr-auto ml-auto max-w-6xl px-4 sm:px-6">
        {/* Header row */}
        <div className="flex h-14 items-stretch justify-between">
          <div className="flex h-full items-center gap-3">
            <div className="h-3 w-3 rounded-sm bg-(--brand-blue)" />
            <span className="text-sm font-semibold tracking-tight text-neutral-900">
              AgentVis
            </span>
          </div>

          <div className="flex h-full items-center gap-4">
            {/* Desktop nav */}
            <div className="hidden h-full items-stretch gap-8 text-xs font-medium tracking-wide text-neutral-500 md:flex">
              {NAV_SECTIONS.map((section) => (
                <div
                  key={section.id}
                  className="relative flex h-full items-center group"
                >
                  <Link
                    href={section.href}
                    className="transition-colors hover:text-neutral-900"
                  >
                    {section.label}
                  </Link>
                  <div className="pointer-events-none absolute left-0 top-full w-64 origin-top overflow-hidden border border-neutral-200 bg-white shadow-lg transition-all duration-200 ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-hover:scale-y-100 opacity-0 scale-y-95">
                    <div className="flex flex-col py-2 text-xs text-neutral-600">
                      {section.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="px-3 py-1.5 text-left hover:bg-neutral-50 hover:text-neutral-900"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile hamburger */}
            <details className="relative flex h-full items-center md:hidden">
              <summary className="flex h-8 w-8 cursor-pointer list-none flex-col items-center justify-center gap-1 border border-neutral-300 bg-white text-neutral-700">
                <span className="h-px w-4 bg-neutral-800" />
                <span className="h-px w-4 bg-neutral-800" />
                <span className="h-px w-4 bg-neutral-800" />
              </summary>
              <div className="absolute right-0 top-full w-56 origin-top border border-neutral-200 bg-white text-xs text-neutral-700 shadow-lg">
                {NAV_SECTIONS.map((section) => (
                  <div
                    key={section.id}
                    className="border-b border-neutral-100 last:border-b-0"
                  >
                    <Link
                      href={section.href}
                      className="block px-4 pt-2 text-[11px] font-semibold tracking-wide text-neutral-900"
                    >
                      {section.label}
                    </Link>
                    <div className="pb-2 pt-1">
                      {section.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-6 py-1 text-[11px] text-neutral-600 hover:text-neutral-900"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </details>
          </div>
        </div>
      </div>
    </nav>
  );
}
