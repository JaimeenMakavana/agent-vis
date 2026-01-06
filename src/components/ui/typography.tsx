import type { HTMLAttributes } from "react";

type EyebrowProps = HTMLAttributes<HTMLSpanElement>;
type HeadingProps = HTMLAttributes<HTMLHeadingElement>;
type BodyProps = HTMLAttributes<HTMLParagraphElement>;

export function Eyebrow({ className = "", ...props }: EyebrowProps) {
  const classes = `font-mono text-[10px] uppercase tracking-widest text-(--brand-blue)${
    className ? ` ${className}` : ""
  }`;

  return <span {...props} className={classes} />;
}

export function H1({ className = "", ...props }: HeadingProps) {
  const classes =
    "text-3xl font-medium tracking-tighter text-[var(--brand-accent)] leading-[1.1] sm:text-5xl md:text-7xl" +
    (className ? ` ${className}` : "");

  return <h1 {...props} className={classes} />;
}

export function H2({ className = "", ...props }: HeadingProps) {
  const classes =
    "text-2xl font-medium tracking-tighter text-[var(--brand-accent)] sm:text-3xl" +
    (className ? ` ${className}` : "");

  return <h2 {...props} className={classes} />;
}

export function H3({ className = "", ...props }: HeadingProps) {
  const classes =
    "text-base font-medium tracking-tight text-[var(--brand-accent)] sm:text-lg" +
    (className ? ` ${className}` : "");

  return <h3 {...props} className={classes} />;
}

export function Body({ className = "", ...props }: BodyProps) {
  const classes =
    "text-sm font-light leading-relaxed text-[var(--brand-muted)] md:text-base" +
    (className ? ` ${className}` : "");

  return <p {...props} className={classes} />;
}

export function BodySmall({ className = "", ...props }: BodyProps) {
  const classes =
    "text-xs font-light leading-relaxed text-[var(--brand-muted)] sm:text-sm" +
    (className ? ` ${className}` : "");

  return <p {...props} className={classes} />;
}
