import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ProductImage } from "@/components/product/ProductImage";
import { ProductGrid } from "@/components/product/ProductGrid";
import { BuyButton } from "@/components/product/BuyButton";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { Badge } from "@/components/ui/Badge";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { ButtonLink } from "@/components/ui/Button";
import {
  products,
  getProduct,
  getCollection,
  getRelatedProducts,
} from "@/lib/products";
import { FDA_DISCLAIMER, site } from "@/lib/site";
import { formatPrice } from "@/lib/format";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.description,
      type: "website",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const collection = getCollection(product.collection);
  const related = getRelatedProducts(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: collection?.name,
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      price: product.price.toFixed(2),
      priceCurrency: "USD",
      availability: product.stripePaymentLink
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
      url: `${site.url}/shop/${product.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section tone="white" spacing="sm">
        <nav className="mb-8 text-xs text-ink-soft">
          <Link href="/shop" className="hover:text-emerald">
            Shop
          </Link>
          <span className="mx-2">/</span>
          {collection && (
            <>
              <Link
                href={`/shop?collection=${collection.slug}`}
                className="hover:text-emerald"
              >
                {collection.name}
              </Link>
              <span className="mx-2">/</span>
            </>
          )}
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ProductImage
              theme={product.imageTheme}
              label={product.name}
              variant="detail"
              className="aspect-[4/5] w-full"
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              {collection && <Badge tone="sage">{collection.name}</Badge>}
              {product.subscription && (
                <Badge tone="gold">Subscribe &amp; Save</Badge>
              )}
            </div>
            <h1 className="mt-4 font-display text-4xl text-emerald">
              {product.name}
            </h1>
            <p className="mt-2 text-sm text-ink-soft">{product.size}</p>
            <p className="mt-4 font-display text-3xl text-ink">
              {formatPrice(product.price)}
            </p>
            <p className="mt-5 text-base leading-relaxed text-ink-soft">
              {product.longDescription}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <BuyButton product={product} className="sm:flex-1" />
              <AddToCartButton product={product} />
            </div>
            {product.subscription && (
              <p className="mt-3 text-xs text-ink-soft">
                Subscription option available, ask us about monthly and seasonal
                deliveries.
              </p>
            )}

            {/* Benefits */}
            <div className="mt-8">
              <h2 className="eyebrow text-gold">Benefits</h2>
              <ul className="mt-3 space-y-2">
                {product.benefits.map((b) => (
                  <li
                    key={b}
                    className="flex gap-3 text-sm leading-relaxed text-ink"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Ingredients */}
            <div className="mt-8">
              <h2 className="eyebrow text-gold">Ingredients</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {product.ingredients}
              </p>
            </div>

            {/* Story */}
            <div className="mt-8">
              <h2 className="eyebrow text-gold">Our story</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {product.story}
              </p>
            </div>

            {product.allergenNote && (
              <Disclaimer
                title="Allergen & safety"
                tone="bordered"
                className="mt-8"
              >
                {product.allergenNote}
              </Disclaimer>
            )}

            {product.ingestible && (
              <Disclaimer title="FDA disclaimer" className="mt-4">
                {FDA_DISCLAIMER}
              </Disclaimer>
            )}
          </div>
        </div>
      </Section>

      {/* Consultation cross-sell */}
      <Section tone="sage" spacing="sm">
        <div className="flex flex-col items-center gap-5 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl text-emerald">
              Want personalized guidance?
            </h2>
            <p className="mt-2 text-ink-soft">
              Pair this ritual with a one-on-one Botanical Wellness Consultation.
            </p>
          </div>
          <ButtonLink href="/consultations" size="lg">
            Book a Consultation
          </ButtonLink>
        </div>
      </Section>

      {/* Related */}
      {related.length > 0 && (
        <Section tone="cream">
          <SectionHeader eyebrow="You may also love" title="Complete the ritual" />
          <ProductGrid products={related} className="mt-12" />
        </Section>
      )}
    </>
  );
}
