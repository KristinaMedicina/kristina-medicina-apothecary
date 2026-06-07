import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { BotanicalSprig } from "@/components/ui/Botanical";

export default function NotFound() {
  return (
    <Section tone="white" spacing="lg">
      <div className="mx-auto max-w-lg text-center">
        <BotanicalSprig className="mx-auto h-10 w-28 text-gold/70" />
        <p className="eyebrow mt-6 text-gold">Page not found</p>
        <h1 className="mt-3 font-display text-4xl text-emerald">
          This path has grown over
        </h1>
        <p className="mt-4 text-ink-soft">
          The page you&apos;re looking for can&apos;t be found. Let&apos;s guide
          you back to the apothecary.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/" size="lg">
            Return Home
          </ButtonLink>
          <ButtonLink href="/shop" variant="secondary" size="lg">
            Shop the Collection
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
