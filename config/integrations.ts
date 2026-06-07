/**
 * Central, env-driven integration config for Kristina Medicina Apothecary.
 *
 * Everything here is a safe no-op until the matching environment variable is
 * set, so the site builds and runs cleanly before any third-party account
 * exists. See .env.example for the full list of keys.
 *
 * Commerce is delegated to hosted tools (Stripe Payment Links + Calendly),
 * so there is no payment infrastructure to build, secure, or maintain.
 */

const env = (key: string): string | undefined => {
  const value = process.env[key];
  return value && value.length > 0 ? value : undefined;
};

export const integrations = {
  /**
   * Stripe Payment Links. To go live, create a Payment Link per product in the
   * Stripe Dashboard and paste the URL into the matching env var (or directly
   * into `lib/products.ts` -> product.stripePaymentLink).
   */
  stripe: {
    publishableKey: env("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"),
    paymentLinks: {
      whippedGrassFedTallowBalm: env("NEXT_PUBLIC_STRIPE_LINK_TALLOW_BALM"),
      botanicalFacialOil: env("NEXT_PUBLIC_STRIPE_LINK_FACIAL_OIL"),
      womensCycleTea: env("NEXT_PUBLIC_STRIPE_LINK_CYCLE_TEA"),
      ceremonialCacaoBlend: env("NEXT_PUBLIC_STRIPE_LINK_CACAO"),
      eveningAdaptogenicTincture: env("NEXT_PUBLIC_STRIPE_LINK_TINCTURE"),
    },
    get enabled() {
      return Boolean(this.publishableKey);
    },
  },

  /**
   * Calendly (or Acuity / Practice Better) booking links for consultations.
   * Set one URL per consultation; the booking buttons open them in a new tab.
   */
  calendly: {
    baseUrl: env("NEXT_PUBLIC_CALENDLY_URL"),
    consultations: {
      botanicalWellness: env("NEXT_PUBLIC_CALENDLY_BOTANICAL_WELLNESS"),
      ceremonialCacao: env("NEXT_PUBLIC_CALENDLY_CEREMONIAL_CACAO"),
      preparationIntegration: env("NEXT_PUBLIC_CALENDLY_PREPARATION_INTEGRATION"),
    },
    get enabled() {
      return Boolean(this.baseUrl);
    },
  },

  /**
   * Klaviyo email marketing. The newsletter form posts to /api/subscribe,
   * which forwards to Klaviyo when these are set (otherwise it logs locally).
   */
  klaviyo: {
    publicApiKey: env("NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY"),
    listId: env("KLAVIYO_LIST_ID"),
    privateApiKey: env("KLAVIYO_PRIVATE_KEY"),
    get enabled() {
      return Boolean(this.privateApiKey && this.listId);
    },
  },

  /** Google Analytics 4. Loaded only after cookie consent is granted. */
  analytics: {
    gaId: env("NEXT_PUBLIC_GA_ID"),
    get enabled() {
      return Boolean(this.gaId);
    },
  },

  /**
   * Deferred until post-revenue (kept here so the wiring point is obvious).
   * Meta Pixel and the Shopify Storefront API are intentionally not built yet.
   */
  deferred: {
    metaPixelId: env("NEXT_PUBLIC_META_PIXEL_ID"),
    shopifyDomain: env("NEXT_PUBLIC_SHOPIFY_DOMAIN"),
    shopifyStorefrontToken: env("SHOPIFY_STOREFRONT_TOKEN"),
  },
} as const;

export type Integrations = typeof integrations;
