import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/Section";
import { GoldDivider } from "@/components/ui/Botanical";
import { ProductImage } from "@/components/product/ProductImage";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { BookButton } from "@/components/consult/BookButton";
import { ButtonLink } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { Badge } from "@/components/ui/Badge";
import { consultations, consultationFaqs } from "@/lib/consultations";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Botanical wellness consultations, ceremonial cacao experiences, and community gatherings, educational offerings rooted in traditional herbalism and ritual.",
  alternates: { canonical: "/consultations" },
};

const serviceCategories = [
  {
    title: "Botanical Wellness Consultations",
    description:
      "Personalized, one-on-one sessions exploring your wellness goals through a plant-centered, educational lens, from daily rituals to seasonal care.",
    href: "#botanical-wellness-consultation",
    cta: "Explore Consultations",
  },
  {
    title: "Ceremonial Cacao Experiences",
    description:
      "Private guidance and shared ceremony with ceremonial-grade cacao, an invitation to slow down, reconnect, and create space for reflection.",
    href: "#ceremonial-cacao-consultation",
    cta: "Discover Cacao",
  },
  {
    title: "Community Gatherings",
    description:
      "Seasonal circles, cacao gatherings, and educational workshops designed to foster connection, presence, and personal growth.",
    href: "#community-gatherings",
    cta: "Join a Gathering",
  },
];

const intakeSteps = [
  {
    title: "Choose & book",
    description:
      "Select the consultation that fits your needs and book a time through our secure scheduler. Payment is completed at booking.",
  },
  {
    title: "Complete your intake",
    description:
      "You'll receive an intake form or questionnaire so we can prepare a personalized, educational session for you.",
  },
  {
    title: "Meet over video",
    description:
      "We meet one-on-one for a grounded, plant-centered conversation tailored to your goals.",
  },
  {
    title: "Receive your follow-up",
    description:
      "After our session, you'll receive a written summary and curated resources to support your rituals.",
  },
];

export default function ConsultationsPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: consultationFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Section tone="white" spacing="sm">
        <SectionHeader
          eyebrow="Work with us"
          title="Services &amp; guidance"
          description="Educational offerings rooted in traditional herbalism and ritual, to help you build grounded, plant-centered practices and gather in community."
        />
        <GoldDivider className="mt-6" />
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <ButtonLink href="#botanical-wellness-consultation" size="lg">
            Book a Consultation
          </ButtonLink>
          <ButtonLink href="#community-gatherings" variant="secondary" size="lg">
            Join a Gathering
          </ButtonLink>
        </div>
      </Section>

      {/* Services overview */}
      <Section tone="cream" spacing="sm">
        <SectionHeader
          eyebrow="Ways to work together"
          title="Three paths to plant-centered wellness"
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {serviceCategories.map((s) => (
            <div
              key={s.title}
              className="flex flex-col rounded-luxe border border-gold/20 bg-cream-50 p-8 shadow-card"
            >
              <h3 className="font-display text-2xl text-emerald">{s.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                {s.description}
              </p>
              <Link
                href={s.href}
                className="eyebrow mt-6 inline-flex items-center gap-2 text-gold transition-colors hover:text-rose-deep"
              >
                {s.cta} &rarr;
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* Consultation detail blocks */}
      <Section tone="white" spacing="sm">
        <SectionHeader
          eyebrow="One-on-one"
          title="Consultations &amp; cacao guidance"
          description="Each session is private, educational, and tailored to you. Payment is completed securely at booking."
        />
        <div className="mt-12 space-y-10">
          {consultations.map((c, i) => (
            <article
              key={c.slug}
              id={c.slug}
              className="grid gap-8 overflow-hidden rounded-[1.75rem] border border-gold/20 bg-cream-50 lg:grid-cols-[0.8fr_1.2fr]"
            >
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <ProductImage
                  theme={c.imageTheme}
                  label={c.name}
                  className="h-full min-h-[260px] w-full"
                />
              </div>
              <div className="p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="sage">{c.durationMinutes} minutes</Badge>
                  <Badge tone="gold">{formatPrice(c.price)}</Badge>
                  <Badge tone="emerald">{c.format}</Badge>
                </div>
                <h2 className="mt-4 font-display text-2xl text-emerald sm:text-3xl">
                  {c.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {c.longDescription}
                </p>

                <h3 className="eyebrow mt-6 text-gold">How it works</h3>
                <ol className="mt-3 space-y-2">
                  {c.workflow.map((step, idx) => (
                    <li
                      key={step}
                      className="flex gap-3 text-sm leading-relaxed text-ink"
                    >
                      <span className="font-display text-gold">{idx + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>

                <BookButton consultation={c} size="lg" className="mt-6" />

                <Disclaimer className="mt-5">{c.disclaimer}</Disclaimer>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Community Gatherings */}
      <Section id="community-gatherings" tone="cream" spacing="sm">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <EditorialImage
            src="/images/community.jpg"
            alt="A circle of people gathered for a cacao and wellness workshop"
            ratio="landscape"
            interactive
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <div>
            <p className="eyebrow text-gold">Community Gatherings</p>
            <h2 className="mt-4 font-display text-3xl text-emerald sm:text-4xl">
              Gather in community
            </h2>
            <div className="prose-luxe mt-5">
              <p>
                Beyond one-on-one work, Kristina hosts seasonal gatherings,
                cacao circles, and educational workshops, intimate spaces
                designed to foster connection, presence, and personal growth.
              </p>
              <p>
                Gatherings are offered throughout the year, both in person and
                online. Share your interest and we&apos;ll let you know when the
                next circle opens.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/contact" size="lg">
                Inquire About Gatherings
              </ButtonLink>
              <ButtonLink href="/journal" variant="secondary" size="lg">
                Read the Journal
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      {/* Intake process */}
      <Section tone="sage">
        <SectionHeader
          eyebrow="What to expect"
          title="The intake process"
          description="A simple, supportive flow from booking to follow-up."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {intakeSteps.map((step, i) => (
            <div
              key={step.title}
              className="rounded-2xl border border-gold/20 bg-cream-50 p-6"
            >
              <span className="font-display text-3xl text-gold">
                0{i + 1}
              </span>
              <h3 className="mt-3 font-display text-lg text-emerald">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="cream">
        <SectionHeader
          eyebrow="Good to know"
          title="Frequently asked questions"
        />
        <div className="mx-auto mt-10 max-w-3xl">
          <FAQAccordion items={consultationFaqs} />
        </div>
      </Section>

      {/* Closing CTA */}
      <Section tone="emerald">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl text-cream sm:text-4xl">
            Ready to begin?
          </h2>
          <p className="mt-4 leading-relaxed text-cream/80">
            Book a one-on-one consultation, reserve a cacao experience, or join
            the next community gathering.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <ButtonLink href="#botanical-wellness-consultation" variant="gold" size="lg">
              Book a Consultation
            </ButtonLink>
            <ButtonLink href="/contact" variant="outlineLight" size="lg">
              Inquire About Gatherings
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* Disclaimer */}
      <Section tone="white" spacing="sm">
        <Disclaimer
          title="Important disclaimer"
          tone="bordered"
          className="mx-auto max-w-3xl"
        >
          All consultations offered by Kristina Medicina Apothecary are
          educational and rooted in traditional herbal and wellness practices.
          They are not medical, psychological, or therapeutic advice, diagnosis,
          or treatment, and are not a substitute for care from a licensed
          healthcare provider. We do not provide, supply, or encourage the use of
          any controlled or illegal substances. Always consult appropriate
          licensed professionals for your medical or mental health needs, and
          before changing your wellness regimen, especially if you are pregnant,
          nursing, or taking medications.
        </Disclaimer>
      </Section>
    </>
  );
}
