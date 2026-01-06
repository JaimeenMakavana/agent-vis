export function MainFooter() {
  return (
    <footer className="border-t border-[var(--brand-border-subtle)] bg-[var(--brand-surface-soft)] py-4">
      <div className="mr-auto ml-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 font-mono text-[10px] uppercase tracking-widest text-[var(--brand-border-strong)] sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <span className="text-[var(--brand-accent)]">
            AgentVis Inc © 2026
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-blue)]" />
          <span className="text-[var(--brand-blue)]">Systems Normal</span>
        </div>
      </div>
    </footer>
  );
}
