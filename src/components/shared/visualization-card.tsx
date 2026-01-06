import Link from "next/link";

import { H3, BodySmall, Eyebrow } from "@/components/ui/typography";

export type VisualizationCardData = {
  id: string;
  label: string;
  title: string;
  description: string;
  href: string;
  visualizationType: string;
  library: string;
};

type VisualizationCardProps = {
  view: VisualizationCardData;
};

export function VisualizationCard({ view }: VisualizationCardProps) {
  return (
    <div className="flex flex-col justify-between bg-[var(--background)] p-6 transition-colors duration-300 hover:bg-[var(--brand-surface-soft)] sm:p-8">
      <div>
        <div className="mb-4 inline-block rounded-sm border border-[var(--brand-border-subtle)] bg-[var(--brand-surface-soft)] pt-1 pb-1 pr-2 pl-2 font-mono text-xs text-[var(--brand-muted)] sm:mb-6">
          {view.label}
        </div>
        <H3 className="mb-2">{view.title}</H3>
        <BodySmall className="mb-4">{view.description}</BodySmall>

        <div className="space-y-1">
          <BodySmall className="font-mono text-[10px] uppercase tracking-widest text-[var(--brand-muted)]">
            Visualization Type
          </BodySmall>
          <BodySmall>{view.visualizationType}</BodySmall>

          <BodySmall className="mt-3 font-mono text-[10px] uppercase tracking-widest text-[var(--brand-muted)]">
            Recommended Library
          </BodySmall>
          <BodySmall>{view.library}</BodySmall>
        </div>
      </div>

      <div className="mt-6 border-t border-dashed border-[var(--brand-border-subtle)] pt-4">
        <Link
          href={view.href}
          className="inline-flex items-center gap-2 text-xs font-medium tracking-wide text-[var(--brand-accent)] hover:text-[var(--background)]"
        >
          <Eyebrow className="mb-0 text-[9px] text-[var(--brand-muted)]">
            Open view
          </Eyebrow>
          <span
            className="h-px w-6 bg-[var(--brand-border-subtle)]"
            aria-hidden
          />
        </Link>
      </div>
    </div>
  );
}

