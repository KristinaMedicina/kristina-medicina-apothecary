import { cn } from "@/lib/format";

type Theme = "rose" | "sage" | "gold" | "emerald" | "cacao";

const palettes: Record<Theme, { from: string; to: string; leaf: string; accent: string }> = {
  rose: { from: "#f3dcd8", to: "#e7cfcb", leaf: "#c58f8c", accent: "#a96f6c" },
  sage: { from: "#dde3d3", to: "#cdd5c3", leaf: "#8e9c82", accent: "#6f7d63" },
  gold: { from: "#efe3c6", to: "#ddc99a", leaf: "#b89b5e", accent: "#9a7f44" },
  emerald: { from: "#cfe0d6", to: "#a9c4b6", leaf: "#21503c", accent: "#1a4030" },
  cacao: { from: "#e3d2c2", to: "#cbb29c", leaf: "#7a5638", accent: "#5b3d27" },
};

interface ProductImageProps {
  theme: Theme;
  label: string;
  className?: string;
  /** Larger leaf composition for hero / detail usage. */
  variant?: "card" | "detail";
}

/**
 * A polished SVG placeholder used for all product and editorial imagery.
 * Renders a soft gradient with a botanical leaf motif so the site looks
 * complete with no binary assets. Swap for <Image> + real photography later.
 */
export function ProductImage({
  theme,
  label,
  className,
  variant = "card",
}: ProductImageProps) {
  const p = palettes[theme];
  const id = `grad-${theme}-${variant}`;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.25rem]",
        className,
      )}
      role="img"
      aria-label={`${label} — botanical product imagery`}
    >
      <svg
        viewBox="0 0 400 480"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={p.from} />
            <stop offset="100%" stopColor={p.to} />
          </linearGradient>
        </defs>
        <rect width="400" height="480" fill={`url(#${id})`} />

        {/* botanical stem + leaves */}
        <g
          stroke={p.leaf}
          strokeWidth="2.5"
          fill="none"
          opacity="0.6"
          strokeLinecap="round"
        >
          <path d="M200 430 C200 360 200 300 200 150" />
          {[110, 170, 230, 290, 350].map((y, i) => {
            const dir = i % 2 === 0 ? 1 : -1;
            return (
              <g key={y}>
                <path
                  d={`M200 ${y} C${200 + dir * 40} ${y - 14} ${200 + dir * 78} ${y - 6} ${200 + dir * 92} ${y + 22}`}
                />
                <path
                  d={`M200 ${y} C${200 + dir * 38} ${y + 8} ${200 + dir * 70} ${y + 26} ${200 + dir * 92} ${y + 22}`}
                />
              </g>
            );
          })}
        </g>

        {/* blossom */}
        <g fill={p.accent} opacity="0.7">
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <ellipse
              key={deg}
              cx="200"
              cy="118"
              rx="12"
              ry="26"
              transform={`rotate(${deg} 200 132)`}
            />
          ))}
          <circle cx="200" cy="132" r="9" fill={p.leaf} />
        </g>
      </svg>
    </div>
  );
}
