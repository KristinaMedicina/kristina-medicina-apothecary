/**
 * Central, env-driven integration config for Kristina Medicina Apothecary.
 *
 * Everything here is a safe no-op until the matching environment variable is
 * set, so the site builds and runs cleanly before any third-party account
 * exists. See .env.example for the full list of keys.
 */

const env = (key: string): string | undefined => {
  const value = process.env[key];
  return value && value.length > 0 ? value : undefined;
};

/** First defined env value wins — supports launch names and legacy aliases. */
const envFirst = (...keys: string[]): string | undefined => {
  for (const key of keys) {
    const value = env(key);
    if (value) return value;
  }
  return undefined;
};

export const integrations = {
  stripe: {
    publishableKey: env("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"),
    paymentLinks: {
      whippedGrassFedTallowBalm: envFirst(
        "NEXT_PUBLIC_STRIPE_PAYMENT_LINK_TALLOW",
        "NEXT_PUBLIC_STRIPE_LINK_TALLOW_BALM",
      ),
      botanicalFacialOil: envFirst(
        "NEXT_PUBLIC_STRIPE_PAYMENT_LINK_FACIAL_OIL",
        "NEXT_PUBLIC_STRIPE_LINK_FACIAL_OIL",
      ),
      womensCycleTea: envFirst(
        "NEXT_PUBLIC_STRIPE_PAYMENT_LINK_CYCLE_TEA",
        "NEXT_PUBLIC_STRIPE_LINK_CYCLE_TEA",
      ),
      ceremonialCacaoBlend: envFirst(
        "NEXT_PUBLIC_STRIPE_PAYMENT_LINK_CACAO",
        "NEXT_PUBLIC_STRIPE_LINK_CACAO",
      ),
      eveningAdaptogenicTincture: envFirst(
        "NEXT_PUBLIC_STRIPE_PAYMENT_LINK_TINCTURE",
        "NEXT_PUBLIC_STRIPE_LINK_TINCTURE",
      ),
    },
    get enabled() {
      return Boolean(this.publishableKey);
    },
  },

  calendly: {
    baseUrl: env("NEXT_PUBLIC_CALENDLY_URL"),
    consultations: {
      botanicalWellness: envFirst(
        "NEXT_PUBLIC_CALENDLY_BOTANICAL",
        "NEXT_PUBLIC_CALENDLY_BOTANICAL_WELLNESS",
      ),
      ceremonialCacao: envFirst(
        "NEXT_PUBLIC_CALENDLY_CACAO",
        "NEXT_PUBLIC_CALENDLY_CEREMONIAL_CACAO",
      ),
      preparationIntegration: envFirst(
        "NEXT_PUBLIC_CALENDLY_INTEGRATION",
        "NEXT_PUBLIC_CALENDLY_PREPARATION_INTEGRATION",
      ),
    },
    get enabled() {
      return Boolean(
        this.baseUrl ||
          this.consultations.botanicalWellness ||
          this.consultations.ceremonialCacao ||
          this.consultations.preparationIntegration,
      );
    },
  },

  /** Kit (ConvertKit) email capture — form embed or API forwarding. */
  kit: {
    formId: env("NEXT_PUBLIC_KIT_FORM_ID"),
    apiSecret: env("KIT_API_SECRET"),
    get enabled() {
      return Boolean(this.formId || (this.apiSecret && this.formId));
    },
  },

  klaviyo: {
    publicApiKey: env("NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY"),
    listId: env("KLAVIYO_LIST_ID"),
    privateApiKey: env("KLAVIYO_PRIVATE_KEY"),
    get enabled() {
      return Boolean(this.privateApiKey && this.listId);
    },
  },

  analytics: {
    gaId: env("NEXT_PUBLIC_GA_ID"),
    get enabled() {
      return Boolean(this.gaId);
    },
  },

  deferred: {
    metaPixelId: env("NEXT_PUBLIC_META_PIXEL_ID"),
    shopifyDomain: env("NEXT_PUBLIC_SHOPIFY_DOMAIN"),
    shopifyStorefrontToken: env("SHOPIFY_STOREFRONT_TOKEN"),
  },
} as const;

export type Integrations = typeof integrations;
