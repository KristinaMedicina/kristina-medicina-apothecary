import { cn } from "@/lib/format";

/** A small decorative botanical line-art sprig used as a section accent. */
export function BotanicalSprig({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 40"
      fill="none"
      aria-hidden="true"
      className={cn("text-gold", className)}
    >
      <path
        d="M60 38c0-10 0-20 0-30"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {[8, 16, 24].map((y) => (
        <g key={y}>
          <path
            d={`M60 ${38 - y}c-6 -2 -12 -5 -16 -10`}
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d={`M60 ${38 - y}c6 -2 12 -5 16 -10`}
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </g>
      ))}
      <circle cx="60" cy="6" r="2.5" fill="currentColor" />
    </svg>
  );
}

/** A thin gold divider with a centered botanical mark. */
export function GoldDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      <span className="h-px w-16 bg-gold/50" />
      <BotanicalSprig className="h-6 w-16" />
      <span className="h-px w-16 bg-gold/50" />
    </div>
  );
}
