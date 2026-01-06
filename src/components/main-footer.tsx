export function MainFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-white py-8 sm:py-12">
      <div className="mr-auto ml-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 font-mono text-[10px] uppercase tracking-widest text-neutral-500 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 bg-neutral-900" />
          <span>AgentVis Inc © 2025</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          Systems Normal
        </div>
      </div>
    </footer>
  );
}


