import type { Product } from "@/types";
import { cn } from "@/lib/format";

interface PurchaseButtonProps {
  product: Product;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
  /** Explicit Stripe link override (e.g. a specific product variant). */
  link?: string;
}

/**
 * Routes to a Stripe Payment Link when configured — either an explicit `link`
 * (for a specific variant) or the product's own link.
 * Shows "Coming Soon" when no link is set — safe for pre-launch builds.
 */
export function PurchaseButton({
  product,
  variant = "primary",
  size = "md",
  label = "Buy Now",
  className,
  link,
}: PurchaseButtonProps) {
  const href = link ?? product.stripePaymentLink;
  const base =
    "inline-flex w-full items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream";
  const sizes = {
    sm: "px-4 py-2.5 text-xs min-h-[40px]",
    md: "px-6 py-3 text-sm min-h-[44px]",
    lg: "px-8 py-4 text-sm min-h-[48px]",
  };
  const variants = {
    primary: "bg-emerald text-cream hover:bg-emerald-700 shadow-sm",
    secondary:
      "border border-emerald/40 text-emerald hover:bg-emerald hover:text-cream",
  };

  if (!href) {
    return (
      <span
        aria-disabled="true"
        title="Checkout link coming soon"
        className={cn(
          base,
          sizes[size],
          "cursor-not-allowed border border-gold/40 bg-cream-100 text-ink-soft",
          className,
        )}
      >
        Coming Soon
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(base, sizes[size], variants[variant], className)}
    >
      {label}
    </a>
  );
}
