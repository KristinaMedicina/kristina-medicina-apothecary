import type { ReactNode } from "react";
import { cn } from "@/lib/format";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Background tone. */
  tone?: "cream" | "white" | "emerald" | "rose" | "sage";
  /** Vertical padding size. */
  spacing?: "sm" | "md" | "lg";
}

const tones: Record<NonNullable<SectionProps["tone"]>, string> = {
  cream: "bg-cream text-ink",
  white: "bg-cream-50 text-ink",
  emerald: "bg-emerald text-cream",
  rose: "bg-rose-soft/40 text-ink",
  sage: "bg-sage-soft/40 text-ink",
};

const spacings = {
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-24",
  lg: "py-20 sm:py-32",
};

export function Section({
  children,
  className,
  id,
  tone = "cream",
  spacing = "md",
}: SectionProps) {
  return (
    <section id={id} className={cn(tones[tone], spacings[spacing], className)}>
      <div className="container-luxe">{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "eyebrow mb-3",
            tone === "dark" ? "text-gold" : "text-gold-soft",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl sm:text-4xl lg:text-5xl",
          tone === "dark" ? "text-emerald" : "text-cream",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            tone === "dark" ? "text-ink-soft" : "text-cream/80",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
