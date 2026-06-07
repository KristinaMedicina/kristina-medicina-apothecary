import type { ReactNode } from "react";
import { cn } from "@/lib/format";

export function Badge({
  children,
  tone = "gold",
  className,
}: {
  children: ReactNode;
  tone?: "gold" | "emerald" | "rose" | "sage";
  className?: string;
}) {
  const tones = {
    gold: "bg-gold/15 text-gold border-gold/30",
    emerald: "bg-emerald/10 text-emerald border-emerald/25",
    rose: "bg-rose-soft/50 text-rose-deep border-rose/30",
    sage: "bg-sage-soft/40 text-emerald border-sage/40",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.16em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
