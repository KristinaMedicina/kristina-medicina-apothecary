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
      cacao: env("NEXT_PUBLIC_STRIPE_PAYMENT_LINK_CACAO"),
      tallow4ozLavender: env("NEXT_PUBLIC_STRIPE_PAYMENT_LINK_TALLOW_4OZ_LAVENDER"),
      tallow4ozLemon: env("NEXT_PUBLIC_STRIPE_PAYMENT_LINK_TALLOW_4OZ_LEMON"),
      tallow8ozLavender: env("NEXT_PUBLIC_STRIPE_PAYMENT_LINK_TALLOW_8OZ_LAVENDER"),
      tallow8ozLemon: env("NEXT_PUBLIC_STRIPE_PAYMENT_LINK_TALLOW_8OZ_LEMON"),
      facialOilRose: env("NEXT_PUBLIC_STRIPE_PAYMENT_LINK_FACIAL_OIL_ROSE"),
      mugwortTea: env("NEXT_PUBLIC_STRIPE_PAYMENT_LINK_MUGWORT_TEA"),
      mugwortTincture: env("NEXT_PUBLIC_STRIPE_PAYMENT_LINK_MUGWORT_TINCTURE"),
      mugwortInfusedOil: env("NEXT_PUBLIC_STRIPE_PAYMENT_LINK_MUGWORT_INFUSED_OIL"),
      sagebrushTea: env("NEXT_PUBLIC_STRIPE_PAYMENT_LINK_SAGEBRUSH_TEA"),
      snakeOilStick: env("NEXT_PUBLIC_STRIPE_PAYMENT_LINK_SNAKE_OIL_STICK"),
      snakeOilTin: env("NEXT_PUBLIC_STRIPE_PAYMENT_LINK_SNAKE_OIL_TIN"),
      seasonalWellnessBoxSubscription: env(
        "NEXT_PUBLIC_STRIPE_PAYMENT_LINK_SEASONAL_WELLNESS_BOX_SUBSCRIPTION",
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

  /** MailerLite email capture — server-side subscribe via the connect API. */
  mailerlite: {
    apiKey: env("MAILERLITE_API_KEY"),
    groupName: env("MAILERLITE_GROUP_NAME"),
    get enabled() {
      return Boolean(this.apiKey && this.groupName);
    },
    /** True when partially configured (one value set but not the other). */
    get partiallyConfigured() {
      return Boolean(this.apiKey || this.groupName) && !this.enabled;
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
