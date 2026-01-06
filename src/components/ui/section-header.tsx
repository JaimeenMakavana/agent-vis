import type { ReactNode } from "react";
import { Eyebrow, H2, BodySmall } from "@/components/ui/typography";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col ${alignment} ${className}`}>
      <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
      <H2>{title}</H2>
      {description && (
        <BodySmall className="mt-4 max-w-md">{description}</BodySmall>
      )}
    </div>
  );
}


