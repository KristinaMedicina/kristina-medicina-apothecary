import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/Section";
import { GoldDivider, BotanicalSprig } from "@/components/ui/Botanical";
import { ButtonLink } from "@/components/ui/Button";
import { EditorialImage } from "@/components/ui/EditorialImage";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story, mission, and plant-centered philosophy behind Kristina Medicina Apothecary, luxury botanical wellness for modern women.",
  alternates: { canonical: "/about" },
};

const pillars = [
  {
    title: "Plant-centered",
    body: "We begin with the plants, honoring traditional herbalism and the wisdom of working with botanicals as whole, living allies.",
  },
  {
    title: "Small-batch & intentional",
    body: "Everything is made in small batches with attention and care, because how something is made is part of what it becomes.",
  },
  {
    title: "Educational & honest",
    body: "We share what we know clearly and responsibly, never overpromising, always inviting you into your own understanding.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section tone="white" spacing="sm">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-gold">Our story</p>
            <h1 className="mt-4 font-display text-4xl text-emerald sm:text-5xl">
              A modern apothecary, rooted in plant wisdom
            </h1>
            <p className="mt-6 leading-relaxed text-ink-soft">
              Kristina Medicina Apothecary was born from a simple belief: that
              caring for ourselves can be both luxurious and grounded, elevated
              and honest. Founded by Kristina, an herbalist and lifelong student
              of plants, the apothecary is a sanctuary for the modern woman who
              wants her wellness rituals to feel like a return to herself.
            </p>
            <p className="mt-4 leading-relaxed text-ink-soft">
              What began at a kitchen counter, rendering tallow and blending teas
              for friends, grew into a small-batch collection of botanical
              formulations and one-on-one consultations, each created with the
              same intention: to help women feel nourished, calm, and at home in
              their own rhythm.
            </p>
          </div>
          <EditorialImage
            src="/images/kristina-altar.jpg"
            alt="Kristina, founder of Kristina Medicina, seated at her botanical altar with candles, brass vessels, and plants"
            ratio="tall"
            position="center top"
            eyebrow="The Founder"
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </Section>

      <Section tone="emerald">
        <div className="mx-auto max-w-3xl text-center">
          <BotanicalSprig className="mx-auto h-8 w-24 text-gold-soft" />
          <p className="eyebrow mt-6 text-gold-soft">Our mission</p>
          <h2 className="mt-4 font-display text-3xl text-cream sm:text-4xl">
            To make plant-centered wellness feel like luxury, and luxury feel
            like coming home
          </h2>
          <p className="mt-5 leading-relaxed text-cream/80">
            We exist to offer women botanical rituals and education that are as
            beautiful as they are trustworthy, bridging the grounded knowledge of
            traditional herbalism with the elevated experience of a modern
            wellness sanctuary.
          </p>
        </div>
      </Section>

      <Section tone="cream">
        <SectionHeader
          eyebrow="What we believe"
          title="Our philosophy"
          description="Three principles guide everything we make and every conversation we have."
        />
        <GoldDivider className="mt-6" />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-gold/20 bg-cream-50 p-7"
            >
              <BotanicalSprig className="h-6 w-16 text-gold/70" />
              <h3 className="mt-4 font-display text-xl text-emerald">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="sage" spacing="sm">
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl text-emerald sm:text-3xl">
              Begin your ritual with us
            </h2>
            <p className="mt-2 text-ink-soft">
              Explore the collection or book a one-on-one consultation.
            </p>
          </div>
          <div className="flex gap-4">
            <ButtonLink href="/shop" size="lg">
              Shop the Collection
            </ButtonLink>
            <ButtonLink href="/consultations" variant="secondary" size="lg">
              Book a Consultation
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
