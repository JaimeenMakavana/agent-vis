"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/layout/container";

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
  const pathname = usePathname();

  const isSectionActive = (section: NavSection) =>
    pathname === section.href || pathname.startsWith(`${section.href}/`);

  const isItemActive = (item: NavItem) => pathname === item.href;

  const handleMobileNavClick = () => {
    const details = document.getElementById(
      "main-nav-mobile"
    ) as HTMLDetailsElement | null;
    if (details) details.open = false;
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-[var(--brand-border-subtle)] bg-[var(--brand-surface-soft)]/80 backdrop-blur-md supports-backdrop-filter:bg-[var(--brand-surface-soft)]/60">
      <Container>
        {/* Header row */}
        <div className="flex h-14 items-stretch justify-between">
          <div className="flex h-full items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-sm bg-[var(--brand-blue)]" />
              <span className="text-sm font-semibold tracking-tight text-[var(--foreground)]">
                AgentVis
              </span>
            </Link>
          </div>

          <div className="flex h-full items-center gap-4">
            {/* Desktop nav */}
            <div className="hidden h-full items-stretch gap-8 text-xs font-medium tracking-wide text-[var(--brand-border-strong)] md:flex">
              {NAV_SECTIONS.map((section) => (
                <div
                  key={section.id}
                  className="relative flex h-full items-center group"
                >
                  <Link
                    href={section.href}
                    className={`px-2 py-1 transition-colors ${
                      isSectionActive(section)
                        ? "bg-[var(--background)] text-[var(--foreground)]"
                        : "hover:text-[var(--foreground)]"
                    }`}
                  >
                    {section.label}
                  </Link>
                  <div className="pointer-events-none absolute left-0 top-full w-64 origin-top overflow-hidden border border-[var(--brand-border-subtle)] bg-[var(--brand-surface-soft)] shadow-lg transition-all duration-200 ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-hover:scale-y-100 opacity-0 scale-y-95">
                    <div className="flex flex-col py-2 text-xs text-[var(--brand-border-strong)]">
                      {section.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`px-3 py-1.5 text-left hover:bg-[var(--brand-surface)] hover:text-[var(--foreground)] ${
                            isItemActive(item)
                              ? "bg-[var(--brand-surface)]"
                              : ""
                          }`}
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
            <details
              id="main-nav-mobile"
              className="relative flex h-full items-center md:hidden"
            >
              <summary className="flex h-8 w-8 cursor-pointer list-none flex-col items-center justify-center gap-1 border border-[var(--brand-border-strong)] bg-[var(--brand-surface-soft)] text-[var(--brand-muted)]">
                <span className="h-px w-4 bg-[var(--brand-border-strong)]" />
                <span className="h-px w-4 bg-[var(--brand-border-strong)]" />
                <span className="h-px w-4 bg-[var(--brand-border-strong)]" />
              </summary>
              <div className="absolute right-0 top-full w-56 origin-top border border-[var(--brand-border-subtle)] bg-[var(--brand-surface-soft)] text-xs text-[var(--brand-muted)] shadow-lg">
                {NAV_SECTIONS.map((section) => (
                  <div
                    key={section.id}
                    className="border-b border-[var(--brand-border-subtle)] last:border-b-0"
                  >
                    <Link
                      href={section.href}
                      onClick={handleMobileNavClick}
                      className={`block px-4 pt-2 text-[11px] font-semibold tracking-wide ${
                        isSectionActive(section)
                          ? "bg-[var(--background)] text-[var(--foreground)]"
                          : "text-[var(--foreground)]"
                      }`}
                    >
                      {section.label}
                    </Link>
                    <div className="pb-2 pt-1">
                      {section.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={handleMobileNavClick}
                          className={`block px-6 py-1 text-[11px] text-[var(--brand-border-strong)] hover:text-[var(--foreground)] ${
                            isItemActive(item)
                              ? "bg-[var(--brand-surface)]"
                              : ""
                          }`}
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
      </Container>
    </nav>
  );
}
