import type { ReactNode } from "react";

type PrimaryCtaFrameProps = {
  children: ReactNode;
  /** Dark = primary CTA shell, light = subtle / secondary shell */
  tone?: "dark" | "light";
  /** Extra Tailwind classes for per-usage tweaks (width, margin, hovers, etc.) */
  className?: string;
};

export function PrimaryCtaFrame({
  children,
  tone = "dark",
  className = "",
}: PrimaryCtaFrameProps) {
  const toneClasses =
    tone === "dark"
      ? "bg-linear-to-b from-neutral-700 to-neutral-900"
      : "bg-linear-to-b from-neutral-200 to-neutral-300";

  return (
    <div className={`${toneClasses} rounded-sm p-px shadow-sm ${className}`}>
      {children}
    </div>
  );
}
