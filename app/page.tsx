import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/marketing/Hero";
import { ButtonLink } from "@/components/ui/Button";
import { NewsletterForm } from "@/components/marketing/NewsletterForm";
import { LeadMagnet } from "@/components/marketing/LeadMagnet";
import { testimonials } from "@/lib/testimonials";

const offerings = [
  {
    title: "Ceremonial Grade Cacao",
    description:
      "Single-origin ceremonial cacao for ritual, reflection, and connection.",
    image: "/images/cacao-cup.jpg",
    alt: "A small cup of rich ceremonial cacao resting on a patterned saucer",
    href: "/shop/ceremonial-cacao-blend",
  },
  {
    title: "Organic Rose Facial Serum",
    description:
      "Botanical nourishment crafted to support radiant, dewy-looking skin.",
    image: "/images/rose-serum.jpg",
    alt: "An amber glass dropper bottle of facial serum beside a fresh pink rose",
    href: "/shop/botanical-facial-oil",
  },
  {
    title: "Whipped Tallow Balm",
    description:
      "Rich ancestral skincare whipped soft and infused with botanical ingredients.",
    image: "/images/tallow-balm.jpg",
    alt: "A hand holding an open tin of soft pink whipped tallow balm",
    href: "/shop/whipped-grass-fed-tallow-balm",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* About */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="container-luxe grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-luxe shadow-soft">
            <Image
              src="/images/kristina-cacao.jpg"
              alt="Kristina ladling freshly prepared ceremonial cacao into a cup outdoors"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="eyebrow text-gold">Meet Kristina</p>
            <h2 className="mt-4 font-display text-4xl text-emerald sm:text-5xl">
              A practitioner of plants, ritual &amp; connection
            </h2>
            <div className="prose-luxe mt-6">
              <p>
                Kristina Medicina is a botanical wellness practitioner,
                ceremonial cacao guide, and creator of handcrafted herbal
                products.
              </p>
              <p>
                Her work brings together plant wisdom, ritual, beauty, and
                meaningful human connection through carefully crafted offerings
                and educational experiences.
              </p>
            </div>
            <ButtonLink href="/about" variant="secondary" size="lg" className="mt-8">
              Learn More
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Featured Offerings */}
      <section className="bg-cream-50 py-24 sm:py-32">
        <div className="container-luxe">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-gold">Featured Offerings</p>
            <h2 className="mt-4 font-display text-4xl text-emerald sm:text-5xl">
              Crafted in small batches, with intention
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {offerings.map((item) => (
              <article
                key={item.title}
                className="hover-lift group flex flex-col overflow-hidden rounded-luxe bg-cream shadow-card"
              >
                <Link href={item.href} className="relative block aspect-[4/5] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-2xl text-emerald">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                    {item.description}
                  </p>
                  <ButtonLink
                    href={item.href}
                    variant="ghost"
                    size="sm"
                    className="mt-5 self-start"
                  >
                    Shop &rarr;
                  </ButtonLink>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 text-center">
            <ButtonLink href="/shop" size="lg">
              Shop the Apothecary
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-rose-soft/50 py-24 sm:py-32">
        <div className="container-luxe">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-rose-deep">Kind Words</p>
            <h2 className="mt-4 font-display text-4xl text-emerald sm:text-5xl">
              From our community
            </h2>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <figure
                key={t.author}
                className="flex flex-col rounded-luxe bg-cream-50 p-8 shadow-card"
              >
                <span aria-hidden="true" className="font-display text-5xl leading-none text-gold">
                  &ldquo;
                </span>
                <blockquote className="mt-2 flex-1 font-display text-xl leading-relaxed text-ink">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6">
                  <p className="font-medium text-emerald">{t.author}</p>
                  <p className="text-xs uppercase tracking-wider text-ink-soft/70">
                    {t.detail}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Botanical Philosophy */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="container-luxe">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-gold">Botanical Philosophy</p>
            <h2 className="mt-4 font-display text-4xl text-emerald sm:text-5xl">
              Rooted in Nature
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              We believe wellness begins with relationship&mdash;relationship to
              the body, to plants, to community, and to the rhythms of the
              natural world.
            </p>
          </div>
          <div className="relative mt-14 aspect-[16/10] w-full overflow-hidden rounded-luxe shadow-soft sm:aspect-[21/9]">
            <Image
              src="/images/mugwort.jpg"
              alt="Mugwort growing in soft, moody natural light"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* Secondary newsletter / lead magnet */}
      <section className="bg-cream-50 py-20 sm:py-24">
        <div className="container-luxe">
          <LeadMagnet source="home-philosophy" />
        </div>
      </section>

      {/* Ceremonial Cacao */}
      <section className="overflow-hidden bg-emerald text-cream">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[360px] lg:min-h-full">
            <Image
              src="/images/cacao-bowl.webp"
              alt="Two hands offering a wooden bowl of ceremonial cacao"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="px-6 py-20 sm:px-12 lg:px-16 lg:py-28">
            <div className="mx-auto max-w-xl">
              <p className="eyebrow text-gold-soft">Ceremonial Cacao</p>
              <h2 className="mt-4 font-display text-4xl text-cream sm:text-5xl">
                Ceremonial Cacao Experiences
              </h2>
              <div className="mt-6 space-y-5 text-cream/85">
                <p className="leading-relaxed">
                  Ceremonial cacao offers an opportunity to slow down,
                  reconnect, and create space for meaningful reflection.
                </p>
                <p className="leading-relaxed">
                  Through private sessions and community gatherings, cacao
                  becomes a bridge to presence, creativity, and connection.
                </p>
              </div>
              <div className="mt-9 flex flex-wrap gap-4">
                <ButtonLink href="/consultations" variant="gold" size="lg">
                  Book a Session
                </ButtonLink>
                <ButtonLink href="/journal" variant="outlineLight" size="lg">
                  Learn About Cacao
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden">
        <Image
          src="/images/community.jpg"
          alt="A circle of people gathered for a cacao and wellness workshop"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-ink/65 via-ink/40 to-ink/25"
        />
        <div className="container-luxe relative py-24">
          <div className="max-w-xl text-cream">
            <p className="eyebrow text-gold-soft">Community</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">
              Gather in Community
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-cream/90">
              Join seasonal gatherings, cacao circles, educational workshops, and
              wellness experiences designed to foster connection and personal
              growth.
            </p>
            <ButtonLink
              href="/contact"
              variant="outlineLight"
              size="lg"
              className="mt-9"
            >
              Inquire About Gatherings
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-emerald py-24 text-cream sm:py-28">
        <div className="container-luxe">
          <div className="mx-auto max-w-xl text-center">
            <p className="eyebrow text-gold-soft">Join the Journal</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">
              Botanical insights, in your inbox
            </h2>
            <p className="mt-5 text-cream/85">
              Receive botanical insights, wellness reflections, seasonal
              offerings, and updates.
            </p>
            <div className="mt-9">
              <NewsletterForm
                variant="dark"
                source="home-journal"
                buttonLabel="Subscribe"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
