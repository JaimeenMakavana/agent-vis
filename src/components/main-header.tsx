export function MainHeader() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md supports-backdrop-filter:bg-white/60">
      <div className="mr-auto ml-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-sm bg-(--brand-blue)" />
          <span className="text-sm font-semibold tracking-tight text-neutral-900">
            AgentVis
          </span>
        </div>

        <div className="hidden items-center gap-8 text-xs font-medium tracking-wide text-neutral-500 md:flex">
          <a
            href="#process"
            className="transition-colors hover:text-neutral-900"
          >
            TRACING
          </a>
          <a
            href="#calculator"
            className="transition-colors hover:text-neutral-900"
          >
            OPTIMIZATION
          </a>
          <a
            href="#solutions"
            className="transition-colors hover:text-neutral-900"
          >
            INTEGRATIONS
          </a>
          <a
            href="#audit"
            className="transition-colors hover:text-neutral-900"
          >
            DOCS
          </a>
        </div>

        <a
          href="#contact"
          className="group relative rounded-sm bg-linear-to-b from-neutral-200 to-neutral-300 p-px transition-all duration-300 hover:from-(--brand-blue-soft) hover:to-(--brand-blue)"
        >
          <div className="relative flex h-full w-full items-center gap-2 rounded-[1px] bg-white/50 px-3 py-2 backdrop-blur-sm sm:px-4">
            <span className="h-1.5 w-1.5 rounded-full bg-(--brand-blue)" />
            <span className="hidden text-xs font-medium text-neutral-600 transition-colors group-hover:text-black sm:inline">
              Request Access
            </span>
            <span className="text-xs font-medium text-neutral-600 transition-colors group-hover:text-black sm:hidden">
              Beta
            </span>
          </div>
        </a>
      </div>
    </nav>
  );
}


