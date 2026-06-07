import type { Product } from "@/types";
import { cn } from "@/lib/format";

interface BuyButtonProps {
  product: Product;
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
  label?: string;
  className?: string;
}

/**
 * Routes the customer to the product's Stripe Payment Link. No cart, no client
 * state, no payment infrastructure. When the link is not yet configured, it
 * renders a clearly-labeled disabled state so nothing looks broken pre-launch.
 */
export function BuyButton({
  product,
  variant = "primary",
  size = "md",
  label = "Buy Now",
  className,
}: BuyButtonProps) {
  const base =
    "inline-flex w-full items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold";
  const sizes = {
    sm: "px-4 py-2.5 text-xs",
    md: "px-6 py-3 text-sm",
  };
  const variants = {
    primary: "bg-emerald text-cream hover:bg-emerald-700 shadow-sm",
    secondary: "border border-emerald/40 text-emerald hover:bg-emerald hover:text-cream",
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
        Available Soon
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
