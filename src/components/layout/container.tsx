import type { ReactNode } from "react";

type ContainerSize = "sm" | "md" | "lg";

type ContainerProps = {
  children: ReactNode;
  /** Controls max-width; defaults to lg (approx. 6xl) */
  size?: ContainerSize;
  /** Additional Tailwind classes for layout-specific tweaks */
  className?: string;
};

const sizeToMaxWidth: Record<ContainerSize, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
};

export function Container({
  children,
  size = "lg",
  className = "",
}: ContainerProps) {
  const maxWidthClass = sizeToMaxWidth[size];

  return (
    <div
      className={`mr-auto ml-auto ${maxWidthClass} px-4 sm:px-6 ${className}`}
    >
      {children}
    </div>
  );
}
