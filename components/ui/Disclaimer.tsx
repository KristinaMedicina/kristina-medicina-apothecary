import type { ReactNode } from "react";
import { cn } from "@/lib/format";

interface DisclaimerProps {
  children: ReactNode;
  title?: string;
  tone?: "subtle" | "bordered";
  className?: string;
}

/** Reusable compliance disclaimer block (FDA, scope-of-practice, allergens). */
export function Disclaimer({
  children,
  title,
  tone = "subtle",
  className,
}: DisclaimerProps) {
  return (
    <div
      className={cn(
        "rounded-xl text-xs leading-relaxed text-ink-soft",
        tone === "bordered"
          ? "border border-gold/30 bg-cream-50 p-5"
          : "bg-sage-soft/20 p-4",
        className,
      )}
    >
      {title && (
        <p className="eyebrow mb-2 text-[0.62rem] text-gold">{title}</p>
      )}
      <p>{children}</p>
    </div>
  );
}
