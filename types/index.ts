export type CollectionSlug =
  | "skin-rituals"
  | "tea-rituals"
  | "cacao-rituals"
  | "botanical-wellness"
  | "seasonal-collections";

export interface Collection {
  slug: CollectionSlug;
  name: string;
  tagline: string;
  description: string;
}

export type SubscriptionPlan =
  | "monthly-tea"
  | "monthly-cacao"
  | "seasonal-box"
  | "monthly-save-10";

export interface Product {
  slug: string;
  name: string;
  collection: CollectionSlug;
  size: string;
  price: number;
  /** Short description for cards. */
  description: string;
  /** Full description for the product detail page. */
  longDescription: string;
  /** FDA structure/function compliant benefit statements. */
  benefits: string[];
  ingredients: string;
  story: string;
  /** Photography direction, kept in data for the brand/content team. */
  photography: string;
  /** Whether the product is ingestible (drives FDA disclaimer display). */
  ingestible: boolean;
  allergenNote?: string;
  /** Subscription tier this product is eligible for, if any. */
  subscription?: SubscriptionPlan;
  /** Stripe Payment Link URL. When unset, the buy button shows "coming soon". */
  stripePaymentLink?: string;
  /** Decorative theme used by the SVG product image placeholder. */
  imageTheme: "rose" | "sage" | "gold" | "emerald" | "cacao";
  featured?: boolean;
}

export interface Consultation {
  slug: string;
  name: string;
  durationMinutes: number;
  price: number;
  format: string;
  description: string;
  longDescription: string;
  workflow: string[];
  disclaimer: string;
  /** Calendly (or other scheduler) booking URL. */
  bookingUrl?: string;
  imageTheme: "rose" | "sage" | "gold" | "emerald" | "cacao";
}

export type JournalCategory =
  | "ceremonial-cacao"
  | "womens-wellness"
  | "herbal-education"
  | "skin-health"
  | "nervous-system-support"
  | "ritual-practices"
  | "seasonal-living";

export interface JournalCategoryMeta {
  slug: JournalCategory;
  name: string;
  description: string;
}

export interface ArticleBlock {
  heading?: string;
  paragraphs: string[];
  list?: string[];
}

/** A closing ritual or reflection prompt rendered in a styled callout. */
export interface ClosingPrompt {
  title: string;
  body: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: JournalCategory;
  author: string;
  readingTime: string;
  publishedAt: string;
  imageTheme: "rose" | "sage" | "gold" | "emerald" | "cacao";
  /** Path to a real editorial photo. Falls back to the themed SVG when unset. */
  image?: string;
  /** Alt text for the editorial photo. */
  imageAlt?: string;
  /** Optional SEO overrides; fall back to title/excerpt when unset. */
  seoTitle?: string;
  seoDescription?: string;
  body: ArticleBlock[];
  /** A practical ritual or reflection prompt closing the article. */
  closingPrompt?: ClosingPrompt;
  featured?: boolean;
}

export interface Testimonial {
  quote: string;
  author: string;
  detail: string;
}

export interface SubscriptionTier {
  slug: SubscriptionPlan;
  name: string;
  description: string;
  cadence: string;
  priceNote: string;
}
