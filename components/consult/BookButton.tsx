import type { Consultation } from "@/types";
import { integrations } from "@/config/integrations";
import { cn } from "@/lib/format";

interface BookButtonProps {
  consultation: Consultation;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
  className?: string;
  label?: string;
}

/**
 * Opens the consultation's scheduling link (Calendly/Acuity/Practice Better),
 * where the client books and pays. Falls back to the global Calendly URL, then
 * to a clearly-labeled placeholder when nothing is configured yet.
 */
export function BookButton({
  consultation,
  size = "md",
  variant = "primary",
  className,
  label = "Book a Consultation",
}: BookButtonProps) {
  const href = consultation.bookingUrl || integrations.calendly.baseUrl;

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold";
  const sizes = {
    sm: "px-4 py-2.5 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-sm",
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
        title="Booking opens soon"
        className={cn(
          base,
          sizes[size],
          "cursor-not-allowed border border-gold/40 bg-cream-100 text-ink-soft",
          className,
        )}
      >
        Booking Opens Soon
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
