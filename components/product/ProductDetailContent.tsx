import type { Product } from "@/types";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { PurchaseButton } from "@/components/product/PurchaseButton";
import { FDA_DISCLAIMER } from "@/lib/site";
import { getSubscriptionTier } from "@/lib/products";

export function ProductDetailContent({ product }: { product: Product }) {
  const tier = product.subscription
    ? getSubscriptionTier(product.subscription)
    : undefined;

  return (
    <div className="space-y-12">
      {product.ritual && (
        <section>
          <h2 className="eyebrow text-gold">The ritual</h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            {product.ritual}
          </p>
        </section>
      )}

      {product.howToUse && product.howToUse.length > 0 && (
        <section>
          <h2 className="eyebrow text-gold">How to use</h2>
          <ol className="mt-4 space-y-3">
            {product.howToUse.map((step, i) => (
              <li
                key={step}
                className="flex gap-4 text-sm leading-relaxed text-ink"
              >
                <span className="font-display text-lg text-gold">{i + 1}.</span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {product.founderNote && (
        <section className="rounded-luxe border border-gold/20 bg-cream-50 p-7 shadow-card">
          <h2 className="eyebrow text-gold">A note from Kristina</h2>
          <p className="mt-4 font-display text-xl leading-relaxed text-emerald">
            {product.founderNote}
          </p>
        </section>
      )}

      {product.faqs && product.faqs.length > 0 && (
        <section>
          <h2 className="font-display text-2xl text-emerald">
            Frequently asked questions
          </h2>
          <div className="mt-6">
            <FAQAccordion items={product.faqs} />
          </div>
        </section>
      )}

      {tier && (
        <section className="rounded-luxe border border-gold/25 bg-rose-soft/30 p-7 sm:p-8">
          <h2 className="eyebrow text-rose-deep">Subscribe &amp; Save</h2>
          <h3 className="mt-3 font-display text-2xl text-emerald">
            {tier.name}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            {tier.description}
          </p>
          <p className="mt-2 text-xs text-ink-soft/80">
            {tier.cadence} &middot; {tier.priceNote}
          </p>
          <p className="mt-4 text-sm text-ink-soft">
            Subscription checkout opens soon. Reach out via our{" "}
            <a href="/contact" className="text-emerald underline-offset-2 hover:underline">
              contact page
            </a>{" "}
            to be notified when recurring orders are live.
          </p>
          <div className="mt-6">
            <PurchaseButton product={product} size="lg" className="w-full sm:w-auto" />
          </div>
        </section>
      )}

      {product.allergenNote && (
        <Disclaimer title="Allergen & safety" tone="bordered">
          {product.allergenNote}
        </Disclaimer>
      )}

      {product.ingestible && (
        <Disclaimer title="FDA disclaimer">{FDA_DISCLAIMER}</Disclaimer>
      )}
    </div>
  );
}
