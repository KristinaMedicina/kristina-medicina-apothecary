import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden">
      <Image
        src="/images/hero-roses.jpg"
        alt="A hand cradling a gathering of soft pink and peach roses"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Soft dark overlay for legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/30 to-ink/55"
      />

      <div className="container-luxe relative py-28">
        <div className="max-w-2xl animate-fade-up text-cream">
          <p className="eyebrow text-gold-soft">Kristina Medicina</p>
          <h1 className="mt-5 font-display text-4xl leading-[1.04] sm:text-6xl lg:text-7xl">
            Botanical Wellness, Ritual &amp; Connection
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/90">
            Handcrafted botanical products, ceremonial cacao experiences, and
            heart-centered wellness guidance.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <ButtonLink href="/shop" variant="gold" size="lg">
              Shop Apothecary
            </ButtonLink>
            <ButtonLink href="/consultations" variant="outlineLight" size="lg">
              Book a Consultation
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
