import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ContactForm } from "@/components/marketing/ContactForm";
import { NewsletterForm } from "@/components/marketing/NewsletterForm";
import { InstagramCallout } from "@/components/marketing/InstagramCallout";
import { BotanicalSprig } from "@/components/ui/Botanical";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Kristina Medicina Apothecary, questions about products, consultations, subscriptions, and wholesale.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Section tone="white" spacing="sm">
        <SectionHeader
          eyebrow="Say hello"
          title="Contact us"
          description="We'd love to hear from you, whether you have a question about a ritual, a consultation, or simply want to connect."
        />
      </Section>

      <Section tone="cream" spacing="sm">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-[1.5rem] border border-gold/20 bg-cream-50 p-8">
            <h2 className="font-display text-2xl text-emerald">
              Send us a message
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              We typically respond within 1&ndash;3 business days.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <BotanicalSprig className="h-6 w-16 text-gold/70" />
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                Questions about products, consultations, cacao, or botanical
                wellness?
              </p>
              <h3 className="mt-4 font-display text-xl text-emerald">Email</h3>
              <a
                href={`mailto:${site.email}`}
                className="mt-1 block text-sm text-ink-soft hover:text-emerald"
              >
                {site.email}
              </a>
              <p className="mt-3 text-sm text-ink-soft">
                We typically respond within 1&ndash;3 business days.
              </p>
            </div>

            <InstagramCallout />

            <div className="rounded-2xl bg-sage-soft/30 p-6">
              <h3 className="font-display text-lg text-emerald">
                Join the apothecary list
              </h3>
              <p className="mt-1 text-xs text-ink-soft">
                Free guide, seasonal rituals, and early access.
              </p>
              <NewsletterForm
                source="contact"
                buttonLabel="Join"
                className="mt-4"
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
