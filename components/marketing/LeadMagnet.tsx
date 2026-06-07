import { NewsletterForm } from "@/components/marketing/NewsletterForm";
import { BotanicalSprig } from "@/components/ui/Botanical";

export function LeadMagnet({
  source = "lead-magnet",
}: {
  source?: string;
}) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-gold/30 bg-cream-50">
      <div className="grid lg:grid-cols-[1.2fr_1fr]">
        <div className="p-8 sm:p-12">
          <p className="eyebrow text-gold">Free Botanical Guide</p>
          <h2 className="mt-3 font-display text-3xl text-emerald sm:text-4xl">
            7 Botanical Rituals for Women&apos;s Wellness &amp; Nervous System
            Support
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
            A beautifully designed guide to simple, grounding rituals you can
            begin tonight. Join the apothecary list and we&apos;ll send it
            straight to your inbox, along with seasonal wisdom and early access.
          </p>
          <NewsletterForm
            source={source}
            buttonLabel="Send My Guide"
            placeholder="Your best email"
            className="mt-6 max-w-md"
          />
        </div>
        <div className="relative hidden bg-sage-soft/40 lg:block">
          <div className="absolute inset-0 flex items-center justify-center">
            <BotanicalSprig className="h-40 w-56 text-gold/60" />
          </div>
        </div>
      </div>
    </div>
  );
}
