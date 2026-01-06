"use client";

import { useState } from "react";

import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { H3, BodySmall } from "@/components/ui/typography";

type Role = "user" | "agent" | "tool" | "system";

type Participant = {
  id: string;
  label: string;
  role: Role;
};

type Message = {
  id: string;
  from: string;
  to: string;
  atMs: number;
  kind: "request" | "response" | "tool-call" | "tool-result";
  summary: string;
  payloadPreview: string;
};

const PARTICIPANTS: Participant[] = [
  { id: "user", label: "User", role: "user" },
  { id: "router", label: "Router Agent", role: "agent" },
  { id: "research", label: "Research Agent", role: "agent" },
  { id: "tools", label: "Tools Layer", role: "tool" },
  { id: "answer", label: "Answer Agent", role: "agent" },
];

const MESSAGES: Message[] = [
  {
    id: "m1",
    from: "user",
    to: "router",
    atMs: 0,
    kind: "request",
    summary: "User asks: “Summarize this PDF and compare to latest news.”",
    payloadPreview: "PDF attachment + high-level instructions",
  },
  {
    id: "m2",
    from: "router",
    to: "research",
    atMs: 400,
    kind: "request",
    summary: "Router delegates research branch.",
    payloadPreview: "Extract key entities, companies, and dates",
  },
  {
    id: "m3",
    from: "research",
    to: "tools",
    atMs: 1100,
    kind: "tool-call",
    summary: "Research agent triggers web + vector search.",
    payloadPreview: "Search: company earnings + semantic doc search",
  },
  {
    id: "m4",
    from: "tools",
    to: "research",
    atMs: 2200,
    kind: "tool-result",
    summary: "Tools layer returns snippets + metadata.",
    payloadPreview: "Top 5 news snippets + chunked PDF sections",
  },
  {
    id: "m5",
    from: "router",
    to: "answer",
    atMs: 2600,
    kind: "request",
    summary: "Router passes merged context to answer agent.",
    payloadPreview: "Structured context + guardrail instructions",
  },
  {
    id: "m6",
    from: "answer",
    to: "user",
    atMs: 4000,
    kind: "response",
    summary: "Answer agent returns final explanation.",
    payloadPreview: "Summary + explicit citations + risk callouts",
  },
];

const DURATION_MS = 4500;

function roleBadge(role: Role) {
  switch (role) {
    case "user":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "agent":
      return "bg-[var(--brand-surface-soft)] text-[var(--brand-blue)] border-[var(--brand-border-subtle)]";
    case "tool":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "system":
    default:
      return "bg-[var(--brand-surface-soft)] text-[var(--foreground)] border-[var(--brand-border-subtle)]";
  }
}

function messageColor(kind: Message["kind"]) {
  if (kind === "request") return "bg-[var(--brand-blue)]";
  if (kind === "response") return "bg-emerald-500";
  if (kind === "tool-call") return "bg-amber-500";
  return "bg-purple-500";
}

export default function ConversationSequencePage() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const timeToPercent = (atMs: number) =>
    Math.min(100, Math.max(0, (atMs / DURATION_MS) * 100));

  return (
    <section className="relative z-10 bg-[var(--background)] py-16 sm:py-24">
      <Container>
        <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-[var(--brand-border-subtle)] pb-6 sm:mb-16 sm:gap-6 sm:pb-8 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="02 / Conversation Sequence"
            title="Agent conversation sequence diagram."
            description={
              <>
                Inspect how messages move between agents, tools, and the user.
                Follow each request/response hop to debug routing logic and
                coordination.
              </>
            }
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          {/* Sequence diagram */}
          <div className="border border-[var(--brand-border-subtle)] bg-[var(--background)]">
            <div className="border-b border-[var(--brand-border-subtle)] bg-[var(--brand-surface-soft)] px-4 py-3 sm:px-6">
              <div className="flex items-center justify-between">
                <BodySmall className="font-mono text-[10px] uppercase tracking-widest text-[var(--brand-muted)]">
                  Conversation sequence
                </BodySmall>
                <BodySmall className="text-[var(--brand-muted)]">
                  Click any arrow to inspect payloads.
                </BodySmall>
              </div>
            </div>

            <div className="overflow-x-auto px-4 pb-6 pt-4 sm:px-6 sm:pb-8">
              <div className="min-w-[720px]">
                {/* Lifelines */}
                <div className="mb-6 flex gap-6">
                  {PARTICIPANTS.map((p) => (
                    <div
                      key={p.id}
                      className="flex min-w-[140px] flex-col items-center gap-2"
                    >
                      <div className="rounded-sm border border-[var(--brand-border-subtle)] px-3 py-1.5 text-center">
                        <div className="text-xs font-medium text-[var(--foreground)]">
                          {p.label}
                        </div>
                        <div
                          className={`mt-1 inline-flex rounded-sm border px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-widest ${roleBadge(
                            p.role
                          )}`}
                        >
                          {p.role}
                        </div>
                      </div>
                      <div className="h-64 w-px bg-dashed border-l border-[var(--brand-border-subtle)]" />
                    </div>
                  ))}
                </div>

                {/* Messages */}
                <div className="relative h-72">
                  {MESSAGES.map((m, index) => {
                    const fromIdx = PARTICIPANTS.findIndex(
                      (p) => p.id === m.from
                    );
                    const toIdx = PARTICIPANTS.findIndex((p) => p.id === m.to);
                    if (fromIdx === -1 || toIdx === -1) return null;

                    const leftPercent =
                      (Math.min(fromIdx, toIdx) / (PARTICIPANTS.length - 1)) *
                      100;
                    const widthPercent =
                      (Math.abs(fromIdx - toIdx) / (PARTICIPANTS.length - 1)) *
                      100;
                    const topOffset = 12 + index * 36;
                    const isSelected = selectedMessage?.id === m.id;

                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() =>
                          setSelectedMessage(isSelected ? null : m)
                        }
                        className="group absolute flex items-center"
                        style={{
                          insetInlineStart: `calc(${leftPercent}% + 2px)`,
                          insetBlockStart: topOffset,
                          inlineSize: `calc(${widthPercent}% - 4px)`,
                        }}
                      >
                        <div
                          className={`relative flex h-7 w-full items-center rounded-sm px-2 text-[11px] text-white shadow-sm transition-all duration-150 ${messageColor(
                            m.kind
                          )} ${
                            isSelected
                              ? "ring-2 ring-offset-1 ring-offset-[var(--background)]"
                              : "opacity-90 group-hover:opacity-100"
                          }`}
                        >
                          <span className="truncate">
                            {m.kind === "tool-call"
                              ? "Tool Call"
                              : m.kind === "tool-result"
                              ? "Tool Result"
                              : m.kind === "request"
                              ? "Request"
                              : "Response"}
                          </span>
                          <span className="ml-auto text-[9px] opacity-80">
                            {(m.atMs / 1000).toFixed(2)}s
                          </span>
                          <span className="absolute -right-1 h-3 w-3 rotate-45 border-r border-b border-white/70" />
                        </div>
                      </button>
                    );
                  })}

                  {/* Time axis */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between px-1">
                    {[0, 0.25, 0.5, 0.75, 1].map((t) => (
                      <div
                        key={t}
                        className="flex flex-col items-center text-[10px] text-[var(--brand-muted)]"
                      >
                        <div className="h-3 w-px bg-[var(--brand-border-subtle)]" />
                        <span className="mt-1">
                          {((DURATION_MS * t) / 1000).toFixed(2)}s
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details panel */}
          <div className="space-y-4">
            <div className="sticky top-4 border border-[var(--brand-border-subtle)] bg-[var(--background)] p-6">
              {selectedMessage ? (
                <>
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-[var(--brand-muted)]">
                        Message details
                      </div>
                      <H3 className="mb-1 text-sm">
                        {selectedMessage.kind.toUpperCase()} •{" "}
                        {(selectedMessage.atMs / 1000).toFixed(2)}s
                      </H3>
                      <BodySmall className="text-[var(--brand-muted)]">
                        {selectedMessage.summary}
                      </BodySmall>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedMessage(null)}
                      className="text-[var(--brand-muted)] transition-colors hover:text-[var(--foreground)]"
                      aria-label="Clear selection"
                    >
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="mb-3 grid grid-cols-2 gap-px border border-[var(--brand-border-subtle)] bg-[var(--brand-border-subtle)]">
                    <div className="bg-[var(--brand-surface-soft)] p-3">
                      <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-[var(--brand-muted)]">
                        From
                      </div>
                      <BodySmall className="text-[var(--foreground)]">
                        {
                          PARTICIPANTS.find(
                            (p) => p.id === selectedMessage.from
                          )?.label
                        }
                      </BodySmall>
                    </div>
                    <div className="bg-[var(--brand-surface-soft)] p-3">
                      <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-[var(--brand-muted)]">
                        To
                      </div>
                      <BodySmall className="text-[var(--foreground)]">
                        {
                          PARTICIPANTS.find((p) => p.id === selectedMessage.to)
                            ?.label
                        }
                      </BodySmall>
                    </div>
                  </div>

                  <div className="rounded-sm border border-[var(--brand-border-subtle)] bg-[var(--brand-surface-soft)] p-4">
                    <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-[var(--brand-muted)]">
                      Payload preview
                    </div>
                    <BodySmall className="text-[var(--foreground)]">
                      {selectedMessage.payloadPreview}
                    </BodySmall>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="mb-3 text-3xl">📡</div>
                  <BodySmall className="mb-1 font-medium text-[var(--foreground)]">
                    Select a message arrow to inspect the hop.
                  </BodySmall>
                  <BodySmall className="text-[var(--brand-muted)]">
                    Use this panel to verify routing, payload shape, and
                    high-level intent between agents and tools.
                  </BodySmall>
                </div>
              )}
            </div>

            <div className="border border-[var(--brand-border-subtle)] bg-[var(--background)] p-4">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[var(--brand-muted)]">
                Sequence statistics
              </div>
              <div className="grid grid-cols-3 gap-px border border-[var(--brand-border-subtle)] bg-[var(--brand-border-subtle)]">
                <div className="bg-[var(--brand-surface-soft)] p-3 text-center">
                  <div className="text-xl font-medium tracking-tight text-[var(--foreground)]">
                    {PARTICIPANTS.length}
                  </div>
                  <BodySmall className="text-[var(--brand-muted)]">
                    Participants
                  </BodySmall>
                </div>
                <div className="bg-[var(--brand-surface-soft)] p-3 text-center">
                  <div className="text-xl font-medium tracking-tight text-[var(--foreground)]">
                    {MESSAGES.length}
                  </div>
                  <BodySmall className="text-[var(--brand-muted)]">
                    Messages
                  </BodySmall>
                </div>
                <div className="bg-[var(--brand-surface-soft)] p-3 text-center">
                  <div className="text-xl font-medium tracking-tight text-[var(--foreground)]">
                    {(DURATION_MS / 1000).toFixed(2)}s
                  </div>
                  <BodySmall className="text-[var(--brand-muted)]">
                    End-to-end
                  </BodySmall>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
