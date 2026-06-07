import type { Testimonial } from "@/types";
import { Section, SectionHeader } from "@/components/ui/Section";
import { GoldDivider } from "@/components/ui/Botanical";

export function TestimonialSection({
  testimonials,
  tone = "rose",
}: {
  testimonials: Testimonial[];
  tone?: "rose" | "sage" | "cream";
}) {
  return (
    <Section tone={tone}>
      <SectionHeader
        eyebrow="Loved by our community"
        title="Rituals that women return to"
      />
      <GoldDivider className="mt-6" />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((t) => (
          <figure
            key={t.author}
            className="flex h-full flex-col rounded-2xl border border-gold/20 bg-cream-50 p-6"
          >
            <span className="font-display text-4xl leading-none text-gold">
              &ldquo;
            </span>
            <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-ink">
              {t.quote}
            </blockquote>
            <figcaption className="mt-5">
              <p className="font-display text-base text-emerald">{t.author}</p>
              <p className="text-xs text-ink-soft">{t.detail}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
