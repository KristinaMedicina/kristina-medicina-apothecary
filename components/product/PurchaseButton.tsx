import type { Product } from "@/types";
import { cn } from "@/lib/format";

interface PurchaseButtonProps {
  product: Product;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

/**
 * Routes to the product's Stripe Payment Link when configured.
 * Shows "Coming Soon" when no link is set — safe for pre-launch builds.
 */
export function PurchaseButton({
  product,
  variant = "primary",
  size = "md",
  label = "Buy Now",
  className,
}: PurchaseButtonProps) {
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

  if (!product.stripePaymentLink) {
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
      href={product.stripePaymentLink}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(base, sizes[size], variants[variant], className)}
    >
      {label}
    </a>
  );
}
