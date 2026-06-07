import type { Consultation } from "@/types";
import { integrations } from "@/config/integrations";
import { cn } from "@/lib/format";

interface BookConsultationButtonProps {
  consultation: Consultation;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
  className?: string;
  label?: string;
}

/**
 * Opens the consultation's Calendly (or scheduler) link when configured.
 * Falls back gracefully when no booking URL is available.
 */
export function BookConsultationButton({
  consultation,
  size = "md",
  variant = "primary",
  className,
  label = "Book a Consultation",
}: BookConsultationButtonProps) {
  const href = consultation.bookingUrl || integrations.calendly.baseUrl;

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream";
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
