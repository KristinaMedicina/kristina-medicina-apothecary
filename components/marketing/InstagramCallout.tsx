import { site } from "@/lib/site";
import { cn } from "@/lib/format";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

interface InstagramCalloutProps {
  /** "card" for a bordered panel (sidebars), "banner" for a full-width row. */
  variant?: "card" | "banner";
  className?: string;
}

const SUPPORTING_TEXT =
  "Follow our journey, herbal education, product releases, seasonal rituals, and botanical wellness inspiration.";

/**
 * Reusable "Follow Along on Instagram" callout. Uses the brand's existing
 * Instagram URL and stays within the current botanical aesthetic.
 */
export function InstagramCallout({
  variant = "card",
  className,
}: InstagramCalloutProps) {
  if (variant === "banner") {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-5 text-center lg:flex-row lg:justify-between lg:text-left",
          className,
        )}
      >
        <div className="max-w-xl">
          <p className="eyebrow text-gold">@kristina.medicina</p>
          <h2 className="mt-3 font-display text-2xl text-emerald sm:text-3xl">
            Follow Along on Instagram
          </h2>
          <p className="mt-3 text-ink-soft">{SUPPORTING_TEXT}</p>
        </div>
        <a
          href={site.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-emerald px-8 py-4 text-sm font-medium tracking-wide text-cream shadow-sm transition-all duration-300 hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
        >
          <InstagramIcon className="h-5 w-5" />
          Follow Along on Instagram
        </a>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-gold/20 bg-cream-50 p-6",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-emerald">
          <InstagramIcon className="h-5 w-5" />
        </span>
        <h3 className="font-display text-xl text-emerald">
          Follow Along on Instagram
        </h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
        {SUPPORTING_TEXT}
      </p>
      <a
        href={site.social.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-emerald/40 px-6 py-3 text-sm font-medium tracking-wide text-emerald transition-all duration-300 hover:bg-emerald hover:text-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
      >
        @kristina.medicina
      </a>
    </div>
  );
}
