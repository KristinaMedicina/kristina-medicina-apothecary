import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/Section";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ButtonLink } from "@/components/ui/Button";
import { Disclaimer } from "@/components/ui/Disclaimer";
import {
  collections,
  products,
  getProductsByCollection,
  getCollection,
} from "@/lib/products";
import { subscriptionTiers } from "@/lib/products";
import { cn } from "@/lib/format";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop luxury botanical wellness: grass-fed tallow balm, botanical facial oil, women's cycle tea, ceremonial cacao, and adaptogenic tinctures.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "Shop the Apothecary",
    description:
      "Small-batch botanical formulations for skin, tea, cacao, and whole-body wellness rituals.",
    images: [{ url: "/images/tallow-balm.jpg", alt: "Whipped grass-fed tallow balm" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/tallow-balm.jpg"],
  },
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ collection?: string }>;
}) {
  const { collection } = await searchParams;
  const active = collection && getCollection(collection) ? collection : null;
  const list = active ? getProductsByCollection(active) : products;
  const activeMeta = active ? getCollection(active) : null;

  const featured = list.filter((p) => p.featured);
  const additional = list.filter((p) => !p.featured);

  return (
    <>
      <Section tone="white" spacing="sm">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeader
              eyebrow="The apothecary"
              title="Shop the collection"
              description="Small-batch botanical formulations for skin, tea, cacao, and whole-body wellness rituals."
            />
          </div>
          <EditorialImage
            src="/images/dried-herbs.jpg"
            alt="Dried botanical herbs arranged for small-batch apothecary blending"
            ratio="landscape"
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="hidden sm:block"
          />
        </div>

        {/* Collection filters */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <FilterChip href="/shop" active={!active} label="All" />
          {collections.map((c) => (
            <FilterChip
              key={c.slug}
              href={`/shop?collection=${c.slug}`}
              active={active === c.slug}
              label={c.name}
            />
          ))}
        </div>
      </Section>

      <Section tone="cream" spacing="sm">
        {activeMeta && (
          <div className="mb-8 text-center">
            <h2 className="font-display text-2xl text-emerald">
              {activeMeta.name}
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              {activeMeta.description}
            </p>
          </div>
        )}

        {list.length === 0 && (
          <p className="py-12 text-center text-ink-soft">
            New botanicals are coming to this collection soon.
          </p>
        )}

        {active ? (
          list.length > 0 && <ProductGrid products={list} />
        ) : (
          <div className="space-y-16">
            {featured.length > 0 && (
              <div>
                <SectionHeader
                  eyebrow="Featured Products"
                  title="Our most-loved rituals"
                  align="center"
                />
                <ProductGrid products={featured} className="mt-10" />
              </div>
            )}
            {additional.length > 0 && (
              <div>
                <SectionHeader
                  eyebrow="Additional Apothecary Products"
                  title="More from the apothecary"
                  align="center"
                />
                <ProductGrid products={additional} className="mt-10" />
              </div>
            )}
          </div>
        )}

        <Disclaimer title="A note on wellness" className="mx-auto mt-12 max-w-3xl">
          These statements have not been evaluated by the Food and Drug
          Administration. Our products are not intended to diagnose, treat, cure,
          or prevent any disease. Please consult your healthcare provider before
          beginning any new wellness regimen.
        </Disclaimer>
      </Section>

      {/* Subscription callout */}
      <Section tone="sage">
        <SectionHeader
          eyebrow="Never run out"
          title="Subscribe &amp; save"
          description="Make your favorite rituals effortless with monthly and seasonal deliveries."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {subscriptionTiers.map((tier) => (
            <div
              key={tier.slug}
              className="rounded-2xl border border-gold/20 bg-cream-50 p-6"
            >
              <h3 className="font-display text-xl text-emerald">{tier.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {tier.description}
              </p>
              <div className="mt-4 flex items-center gap-3 text-xs text-ink-soft">
                <span className="rounded-full bg-gold/15 px-3 py-1 text-gold">
                  {tier.cadence}
                </span>
                <span>{tier.priceNote}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <ButtonLink href="/contact" variant="secondary" size="lg">
            Ask About Subscriptions
          </ButtonLink>
        </div>
      </Section>

      {/* Consultation cross-sell */}
      <Section tone="emerald" spacing="sm">
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl text-cream sm:text-3xl">
              Not sure where to begin?
            </h2>
            <p className="mt-2 text-cream/80">
              Pair your rituals with a one-on-one Botanical Wellness
              Consultation for personalized, educational guidance.
            </p>
          </div>
          <ButtonLink href="/consultations" variant="gold" size="lg">
            Book a Consultation
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}

function FilterChip({
  href,
  active,
  label,
}: {
  href: string;
  active: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full border px-5 py-2 text-sm transition-all",
        active
          ? "border-emerald bg-emerald text-cream"
          : "border-gold/30 bg-cream-50 text-ink hover:border-gold",
      )}
    >
      {label}
    </Link>
  );
}
