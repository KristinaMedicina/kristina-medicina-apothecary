import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/format";

interface CheckoutCTAProps {
  href: string;
  label: string;
  subLabel?: string;
  external?: boolean;
  className?: string;
}

/**
 * Generic conversion CTA used for booking links and external checkout flows.
 * Centralizes the "link out to a hosted tool" pattern (Stripe, Calendly).
 */
export function CheckoutCTA({
  href,
  label,
  subLabel,
  external,
  className,
}: CheckoutCTAProps) {
  return (
    <div className={cn("flex flex-col items-start gap-2", className)}>
      <ButtonLink href={href} external={external} size="lg">
        {label}
      </ButtonLink>
      {subLabel && <p className="text-xs text-ink-soft">{subLabel}</p>}
    </div>
  );
}
