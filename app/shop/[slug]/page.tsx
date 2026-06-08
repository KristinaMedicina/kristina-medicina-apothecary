import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ProductImage } from "@/components/product/ProductImage";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductDetailContent } from "@/components/product/ProductDetailContent";
import { PurchaseButton } from "@/components/product/PurchaseButton";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import {
  products,
  getProduct,
  getCollection,
  getRelatedProducts,
} from "@/lib/products";
import { site } from "@/lib/site";
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
  const title = product.name;
  const description = product.description;
  const image = product.image ? `${site.url}${product.image}` : undefined;

  return {
    title,
    description,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${site.url}/shop/${product.slug}`,
      ...(image && { images: [{ url: image, alt: product.imageAlt ?? product.name }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && { images: [image] }),
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
    image: product.image ? `${site.url}${product.image}` : undefined,
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

      {/* Hero */}
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

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ProductImage
              theme={product.imageTheme}
              label={product.name}
              src={product.image}
              alt={product.imageAlt}
              variant="detail"
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
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
            <h1 className="mt-4 font-display text-3xl text-emerald sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>
            <p className="mt-2 text-sm text-ink-soft">{product.size}</p>
            <p className="mt-4 font-display text-3xl text-ink">
              {product.variants && product.variants.length > 0
                ? `From ${formatPrice(product.price)}`
                : formatPrice(product.price)}
            </p>
            <p className="mt-5 text-base leading-relaxed text-ink-soft">
              {product.longDescription}
            </p>

            {product.variants && product.variants.length > 0 ? (
              <div className="mt-7">
                <h2 className="eyebrow text-gold">Choose your option</h2>
                <ul className="mt-3 space-y-3">
                  {product.variants.map((v) => (
                    <li
                      key={v.label}
                      className="flex flex-col gap-3 rounded-xl border border-gold/20 bg-cream-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center justify-between gap-4 sm:justify-start">
                        <span className="text-sm text-ink">{v.label}</span>
                        <span className="font-display text-lg text-ink">
                          {formatPrice(v.price)}
                        </span>
                      </div>
                      <PurchaseButton
                        product={product}
                        link={v.stripePaymentLink}
                        label="Buy Now"
                        size="sm"
                        className="sm:w-auto sm:px-6"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="mt-7">
                <PurchaseButton product={product} size="lg" className="w-full sm:w-auto" />
              </div>
            )}

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

            <div className="mt-8">
              <h2 className="eyebrow text-gold">Ingredients</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {product.ingredients}
              </p>
            </div>

            <div className="mt-8">
              <h2 className="eyebrow text-gold">Our story</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {product.story}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Extended sections */}
      <Section tone="cream" spacing="sm">
        <div className="mx-auto max-w-3xl">
          <ProductDetailContent product={product} />
        </div>
      </Section>

      <Section tone="sage" spacing="sm">
        <div className="flex flex-col items-center gap-5 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl text-emerald sm:text-3xl">
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

      {related.length > 0 && (
        <Section tone="white">
          <SectionHeader eyebrow="You may also love" title="Complete the ritual" />
          <ProductGrid products={related} className="mt-12" />
        </Section>
      )}
    </>
  );
}
