import type { Collection, Product, SubscriptionTier } from "@/types";
import { integrations } from "@/config/integrations";

const links = integrations.stripe.paymentLinks;

/**
 * Single-link products: maps slug to its Stripe Payment Link, drawn from the
 * env-driven integration config. Products without a configured link show
 * "Coming Soon" until the matching Vercel variable is set.
 */
const paymentLinkBySlug: Record<string, string | undefined> = {
  "ceremonial-grade-cacao": links.cacao,
  "organic-rose-facial-serum": links.facialOilRose,
  "mugwort-loose-leaf-tea": links.mugwortTea,
  "mugwort-tincture": links.mugwortTincture,
  "mugwort-infused-oil": links.mugwortInfusedOil,
  sagebrush: links.sagebrushTea,
  "seasonal-wellness-box": links.seasonalWellnessBoxSubscription,
};

/**
 * Variant-link products: maps slug → exact variant label → Stripe Payment Link.
 * Labels must match the `variants[].label` values defined on each product.
 */
const variantLinkBySlug: Record<string, Record<string, string | undefined>> = {
  "whipped-tallow-butter": {
    "4 oz — Lavender": links.tallow4ozLavender,
    "4 oz — Lemon": links.tallow4ozLemon,
    "8 oz — Lavender": links.tallow8ozLavender,
    "8 oz — Lemon": links.tallow8ozLemon,
  },
  "snake-oil-salve": {
    "1.7 oz — Travel Stick": links.snakeOilStick,
    "2 oz — Tin": links.snakeOilTin,
  },
};

export const collections: Collection[] = [
  {
    slug: "skin-rituals",
    name: "Skin Rituals",
    tagline: "Nourish your glow",
    description:
      "Whipped tallow, salves, and botanical oils that restore softness and a healthy-looking radiance.",
  },
  {
    slug: "tea-rituals",
    name: "Tea Rituals",
    tagline: "Steep slowly, return to yourself",
    description:
      "Loose-leaf herbs crafted as daily rituals of nourishment and calm.",
  },
  {
    slug: "cacao-rituals",
    name: "Cacao Rituals",
    tagline: "A moment of pause",
    description:
      "Ceremonial-grade cacao for grounding, intentional daily practice.",
  },
  {
    slug: "botanical-wellness",
    name: "Botanical Wellness",
    tagline: "Plant wisdom, daily",
    description:
      "Tinctures, salves, and infused oils rooted in traditional herbalism to support modern life.",
  },
  {
    slug: "seasonal-collections",
    name: "Seasonal Collections",
    tagline: "Live with the seasons",
    description:
      "Limited curations and the Seasonal Wellness Box, released with each turn of the year.",
  },
];

export const products: Product[] = [
  {
    slug: "whipped-tallow-butter",
    name: "Whipped Tallow Butter",
    collection: "skin-rituals",
    size: "4 oz / 8 oz · Lavender or Lemon",
    price: 32,
    variants: [
      { label: "4 oz — Lavender", price: 32 },
      { label: "4 oz — Lemon", price: 32 },
      { label: "8 oz — Lavender", price: 52 },
      { label: "8 oz — Lemon", price: 52 },
    ],
    description:
      "Rich, all-natural whipped tallow moisturizer for dry skin, sensitive skin, stretch marks, sun exposure, and everyday nourishment.",
    longDescription:
      "A rich, all-natural moisturizer whipped from grass-fed tallow and organic jojoba oil. Crafted to support dry skin, sensitive skin, stretch marks, skin recovering from sun exposure, and everyday skin nourishment. Available in calming Lavender or bright Lemon, in 4 oz and 8 oz sizes.",
    benefits: [
      "Helps nourish and soften dry, sensitive skin",
      "Supports the look of skin through stretch marks and seasonal changes",
      "Bio-compatible fats to support the skin's natural moisture barrier",
      "A simple, all-natural everyday moisturizer",
    ],
    ingredients: "Grass-fed tallow, organic jojoba oil, essential oils.",
    story:
      "Whipped soft in small batches from grass-fed tallow, this butter honors the ancestral wisdom that skin thrives on the fats our great-grandmothers used. Choose calming lavender or bright, uplifting lemon.",
    photography:
      "Open jar with a soft whipped peak, natural window light, cream linen, sprig of lavender or a lemon slice. Macro texture and a hand swatch.",
    ingestible: false,
    imageTheme: "gold",
    image: "/images/tallow-balm.jpg",
    imageAlt: "An open jar of soft, whipped grass-fed tallow butter",
    ritual:
      "Apply as a closing ritual morning or night. Warm a small amount between your fingertips and press into clean skin, breathing slowly as it melts in.",
    howToUse: [
      "Cleanse skin and leave slightly damp.",
      "Warm a small amount between fingertips.",
      "Press gently into face, body, or dry areas.",
      "Use morning or night; a little goes a long way.",
      "Store in a cool, dry place away from direct heat.",
    ],
    founderNote:
      "I whip this tallow in small batches because I want to know exactly what goes on my skin and yours — grass-fed, simple, and deeply nourishing.",
    faqs: [
      {
        question: "Will tallow feel greasy?",
        answer:
          "Tallow is bio-compatible with human skin and typically absorbs well when applied in a small amount. If it feels too rich, use less or reserve it for nighttime.",
      },
      {
        question: "What's the difference between Lavender and Lemon?",
        answer:
          "Only the essential oil. Lavender is calming and grounding; Lemon is bright and uplifting. Both share the same nourishing tallow and jojoba base.",
      },
      {
        question: "Which size should I choose?",
        answer:
          "The 4 oz is perfect for the face and travel; the 8 oz is our best value for full-body daily use.",
      },
    ],
    featured: true,
  },
  {
    slug: "organic-rose-facial-serum",
    name: "Organic Rose Facial Serum",
    collection: "skin-rituals",
    size: "1 oz",
    price: 35,
    description:
      "A botanical facial serum designed to support hydration, radiance, and healthy-looking skin.",
    longDescription:
      "A luminous botanical facial serum pressed from organic jojoba oil and infused with organic rose petals and rose essential oils. Designed to support hydration, radiance, and healthy-looking skin with a dewy, lit-from-within finish.",
    benefits: [
      "Helps support skin hydration and a dewy finish",
      "Supports a radiant, healthy-looking complexion",
      "Lightweight jojoba base absorbs without heaviness",
      "Botanical rose to comfort and soften the look of skin",
    ],
    ingredients: "Organic jojoba oil, organic rose petals, rose essential oils.",
    story:
      "Rose has been treasured for skin care across centuries. We infuse organic petals into nourishing jojoba and finish with rose essential oils for a serum that feels like a small daily ceremony.",
    photography:
      "Amber glass dropper bottle beside fresh pink roses, soft daylight, dusty-rose styling, a few drops on skin.",
    ingestible: false,
    imageTheme: "rose",
    image: "/images/rose-serum.jpg",
    imageAlt:
      "An amber glass dropper bottle of rose facial serum beside a fresh pink rose",
    ritual:
      "After cleansing, press three to five drops between your palms and breathe in the rose before pressing gently into damp skin.",
    howToUse: [
      "Cleanse and leave skin slightly damp.",
      "Dispense 3–5 drops into your palms.",
      "Press gently into the face and neck.",
      "Use morning and night, before heavier creams.",
    ],
    founderNote:
      "This serum is my favorite quiet luxury — a few drops of rose to begin and end the day feeling cared for.",
    faqs: [
      {
        question: "Is this suitable for oily skin?",
        answer:
          "Yes. Jojoba closely mirrors the skin's own sebum and absorbs cleanly, so it tends to suit most skin types when used in small amounts.",
      },
      {
        question: "Is the scent strong?",
        answer:
          "It carries a soft, natural rose aroma from real petals and essential oils — never synthetic or overpowering.",
      },
    ],
    featured: true,
  },
  {
    slug: "ceremonial-grade-cacao",
    name: "Ceremonial Grade Cacao",
    collection: "cacao-rituals",
    size: "1 lb pouch",
    price: 49,
    description:
      "Ceremonial cacao sourced from Colombia for intentional daily ritual and connection.",
    longDescription:
      "Ceremonial-grade cacao sourced from Colombia, prepared for intentional daily ritual and connection. Rich, grounding, and naturally bittersweet — whisk into hot water or milk of choice and drink with presence.",
    benefits: [
      "Supports a grounding, intentional daily ritual",
      "Naturally occurring compounds in cacao for a gentle sense of uplift",
      "Rich in naturally occurring antioxidants (flavanols)",
      "A heart-centered moment of pause and connection",
    ],
    ingredients: "100% ceremonial-grade cacao, single-origin (Colombia).",
    story:
      "Sourced from Colombia and prepared in the ceremonial tradition, this cacao invites a moment of pause. A 1 lb pouch is enough to make ritual a daily practice.",
    photography:
      "Cacao whisked into a ceramic cup with froth, broken cacao and warm spices, steam in moody warm light, hands cradling the cup.",
    ingestible: true,
    allergenNote:
      "Contains cacao; processed in a facility that also handles tree nuts.",
    subscription: "monthly-cacao",
    imageTheme: "cacao",
    image: "/images/cacao-cup.jpg",
    imageAlt:
      "A cup of rich ceremonial cacao resting on a patterned saucer",
    ritual:
      "Warm your liquid gently — never boiling. Whisk the cacao until smooth, sit somewhere undisturbed, and set an intention as you take the first sip.",
    howToUse: [
      "Add 1–2 tablespoons of cacao to a mug.",
      "Pour warm (not boiling) water or milk of choice.",
      "Whisk until smooth and frothy.",
      "Sweeten and spice to taste; sip slowly with intention.",
    ],
    founderNote:
      "Cacao is how I begin so many mornings — a warm, grounding ritual that brings me back to myself before the day asks anything of me.",
    faqs: [
      {
        question: "How many servings are in a pouch?",
        answer:
          "A 1 lb pouch makes roughly 30 servings, depending on how generously you measure.",
      },
      {
        question: "Does ceremonial cacao contain caffeine?",
        answer:
          "Cacao naturally contains theobromine and a small amount of caffeine. If you are sensitive or pregnant/nursing, consult your healthcare provider.",
      },
    ],
    featured: true,
  },
  {
    slug: "seasonal-wellness-box",
    name: "Seasonal Wellness Box",
    collection: "seasonal-collections",
    size: "Quarterly subscription",
    price: 77,
    description:
      "A quarterly, seasonally curated box of handcrafted botanical medicines selected to support wellness during the current season.",
    longDescription:
      "A quarterly, seasonally curated box containing handcrafted botanical medicines selected to support wellness during the current season. Each box includes a seasonal tea, a salve or infused oil, a tincture, and a bonus seasonal product.",
    benefits: [
      "A seasonal ritual curated to support whole-self wellness",
      "Handcrafted botanical medicines chosen for the current season",
      "A grounding way to live in rhythm with the year",
      "An effortless way to discover new apothecary favorites",
    ],
    ingredients:
      "Contents vary by season. Each box includes a seasonal tea, a salve or infused oil, a tincture, and a bonus seasonal product, with a full ingredient and allergen card.",
    story:
      "For those who want to live with the seasons, the Seasonal Wellness Box arrives four times a year as an invitation to slow down and tend to yourself.",
    photography:
      "Flat lay of an opened box with tissue, botanicals, tea, tincture, salve, and a printed seasonal guide; seasonal color story on cream linen.",
    ingestible: true,
    allergenNote:
      "Contents vary; each season's box includes a complete allergen card. May contain cacao and tree nuts.",
    subscription: "seasonal-box",
    imageTheme: "emerald",
    image: "/images/cacao-morning-book.jpg",
    imageAlt:
      "A seasonal wellness ritual scene with botanicals, tea, and a printed guide",
    ritual:
      "Set aside an unhurried morning when your box arrives. Brew the seasonal tea, read the enclosed guide, and choose one small ritual to carry through the season.",
    howToUse: [
      "Open your box and read the seasonal guide.",
      "Begin with the seasonal tea as a daily ritual.",
      "Work the salve or infused oil into your skincare or body care.",
      "Use the tincture as directed on its label.",
    ],
    founderNote:
      "Each box is my letter to you for the season — a handful of handcrafted medicines I'm reaching for in my own home right now.",
    faqs: [
      {
        question: "How often does the box ship?",
        answer:
          "The Seasonal Wellness Box ships quarterly — four curated boxes per year, aligned with the turning of the seasons.",
      },
      {
        question: "What's inside each box?",
        answer:
          "Every box includes a seasonal tea, a salve or infused oil, a tincture, and a bonus seasonal product, plus a printed seasonal guide and allergen card.",
      },
      {
        question: "Can I cancel my subscription?",
        answer:
          "Yes. The Seasonal Wellness Box is a quarterly subscription you can manage or cancel between shipments.",
      },
    ],
    featured: true,
  },
  {
    slug: "snake-oil-salve",
    name: "Snake Oil Pain Relief Salve",
    collection: "botanical-wellness",
    size: "1.7 oz travel stick / 2 oz tin",
    price: 15,
    variants: [
      { label: "1.7 oz — Travel Stick", price: 15 },
      { label: "2 oz — Tin", price: 25 },
    ],
    description:
      "A traditional cottonwood salve to support sore muscles, joints, aches, pains, cramps, and everyday discomfort.",
    longDescription:
      "A traditional cottonwood-bud salve, slow-infused and crafted to support sore muscles, joints, aches, pains, cramps, and everyday discomfort. Available as a 1.7 oz travel stick or a 2 oz tin.",
    benefits: [
      "Traditionally used to support sore, overworked muscles and joints",
      "A warming botanical companion for everyday aches and discomfort",
      "Travel stick format for easy, mess-free application",
      "Simple, time-honored botanical ingredients",
    ],
    ingredients:
      "Cottonwood buds, organic jojoba oil, extra virgin olive oil, beeswax.",
    story:
      "Cottonwood buds — sometimes called 'balm of Gilead' — have been infused into salves for generations. We slow-infuse them into nourishing oils and set them with beeswax for a grounding, traditional salve.",
    photography:
      "Salve tin and travel stick on weathered wood, cottonwood buds, warm natural light, herbal-apothecary styling.",
    ingestible: false,
    imageTheme: "gold",
    image: "/images/whipped-tallow.jpg",
    imageAlt: "A tin of traditional cottonwood pain-relief salve",
  },
  {
    slug: "mugwort-loose-leaf-tea",
    name: "Mugwort Loose Leaf Tea",
    collection: "tea-rituals",
    size: "0.5 oz",
    price: 10,
    description:
      "Traditional loose leaf mugwort for tea preparation.",
    longDescription:
      "Traditional loose-leaf mugwort, thoughtfully dried for tea preparation. A time-honored botanical for those building a mindful, plant-centered tea ritual.",
    benefits: [
      "A traditional botanical for a mindful tea ritual",
      "Loose-leaf and minimally processed",
      "Part of a plant-centered evening practice",
    ],
    ingredients: "Dried mugwort (Artemisia vulgaris).",
    story:
      "Mugwort has been steeped and honored across many traditions. We offer it simply — loose leaf and ready for your own ritual.",
    photography:
      "Loose dried mugwort on a tray or in a tin, soft daylight, sage-and-cream styling, a steaming cup nearby.",
    ingestible: true,
    allergenNote:
      "Not for use during pregnancy. Avoid if sensitive to the daisy/ragweed (Asteraceae) family. Consult your healthcare provider if taking medications.",
    imageTheme: "sage",
    image: "/images/dried-mugwort-tray.jpg",
    imageAlt: "Loose-leaf dried mugwort gathered for tea preparation",
  },
  {
    slug: "mugwort-tincture",
    name: "Mugwort Tincture",
    collection: "botanical-wellness",
    size: "1 oz dropper",
    price: 18,
    description:
      "Concentrated mugwort extract in a dropper bottle.",
    longDescription:
      "A concentrated mugwort extract in a convenient 1 oz dropper bottle, prepared in the herbalist tradition for those who prefer a tincture to a tea.",
    benefits: [
      "Concentrated mugwort in a convenient dropper format",
      "Prepared in the traditional herbalist method",
      "An easy way to incorporate mugwort into your ritual",
    ],
    ingredients: "Mugwort (Artemisia vulgaris), organic cane alcohol, spring water.",
    story:
      "We steep mugwort slowly to create a concentrated extract, bottled with a dropper for simple, measured use.",
    photography:
      "Amber glass dropper bottle, dropper mid-pour, dried mugwort, warm low light, apothecary styling.",
    ingestible: true,
    allergenNote:
      "Not for use during pregnancy or nursing. Avoid if sensitive to the daisy/ragweed (Asteraceae) family. Consult your healthcare provider if taking medications. Keep out of reach of children.",
    imageTheme: "sage",
    image: "/images/rose-tincture.jpg",
    imageAlt: "An amber glass dropper bottle of mugwort tincture",
  },
  {
    slug: "mugwort-infused-oil",
    name: "Mugwort Infused Oil",
    collection: "botanical-wellness",
    size: "1 oz",
    price: 18,
    description:
      "A botanical mugwort-infused oil for topical use.",
    longDescription:
      "A botanical mugwort-infused oil in a 1 oz bottle, slow-infused for topical use as part of a grounding body ritual.",
    benefits: [
      "Slow-infused mugwort for topical ritual use",
      "A simple, single-herb botanical oil",
      "Easily worked into a grounding body practice",
    ],
    ingredients: "Mugwort (Artemisia vulgaris)-infused oil.",
    story:
      "Mugwort is infused into oil over time, drawing the plant's character into a simple topical preparation for ritual care.",
    photography:
      "Small glass bottle of golden infused oil, fresh and dried mugwort, soft natural light.",
    ingestible: false,
    allergenNote:
      "For external use only. Avoid if sensitive to the daisy/ragweed (Asteraceae) family. Not for use during pregnancy.",
    imageTheme: "sage",
    image: "/images/herbal-extract.jpg",
    imageAlt: "A small bottle of golden mugwort-infused oil with fresh herbs",
  },
  {
    slug: "sagebrush",
    name: "Sagebrush",
    collection: "tea-rituals",
    size: "0.5 oz",
    price: 10,
    description:
      "Loose leaf sagebrush herb, traditionally used in herbal wellness practices.",
    longDescription:
      "Loose-leaf sagebrush, traditionally used in herbal wellness practices. Offered simply and minimally processed for your own ritual.",
    benefits: [
      "A traditional botanical for herbal wellness rituals",
      "Loose-leaf and minimally processed",
      "Thoughtfully gathered and dried",
    ],
    ingredients: "Dried sagebrush (Artemisia tridentata).",
    story:
      "Sagebrush carries the scent of the high desert. We offer it loose and simple, to be used with intention in your own practice.",
    photography:
      "Dried sagebrush bundles on linen, earthy tones, soft natural light, minimal apothecary styling.",
    ingestible: false,
    allergenNote:
      "Avoid if sensitive to the daisy/ragweed (Asteraceae) family. Not for use during pregnancy. Consult your healthcare provider before use.",
    imageTheme: "sage",
    image: "/images/dried-herbs.jpg",
    imageAlt: "Loose-leaf dried sagebrush gathered for herbal wellness rituals",
  },
];

export const subscriptionTiers: SubscriptionTier[] = [
  {
    slug: "seasonal-box",
    name: "Seasonal Wellness Box",
    description:
      "A curated box of handcrafted botanical medicines — a seasonal tea, a salve or infused oil, a tincture, and a bonus product — delivered four times a year.",
    cadence: "Ships quarterly",
    priceNote: "$77 per season",
  },
  {
    slug: "monthly-cacao",
    name: "Monthly Cacao Subscription",
    description:
      "Ceremonial-grade cacao at your door each month to keep your ritual grounded.",
    cadence: "Ships monthly",
    priceNote: "Save 10% + free shipping",
  },
];

// Resolve Stripe Payment Links from env-driven config at module load.
for (const product of products) {
  if (!product.stripePaymentLink && paymentLinkBySlug[product.slug]) {
    product.stripePaymentLink = paymentLinkBySlug[product.slug];
  }

  const variantLinks = variantLinkBySlug[product.slug];
  if (variantLinks && product.variants) {
    for (const variant of product.variants) {
      if (!variant.stripePaymentLink && variantLinks[variant.label]) {
        variant.stripePaymentLink = variantLinks[variant.label];
      }
    }
  }
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  // Preserve the launch order specified in the catalog.
  const order = [
    "whipped-tallow-butter",
    "organic-rose-facial-serum",
    "ceremonial-grade-cacao",
    "seasonal-wellness-box",
  ];
  return order
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));
}

export function getProductsByCollection(slug: string): Product[] {
  return products.filter((p) => p.collection === slug);
}

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return products
    .filter((p) => p.slug !== product.slug && p.collection === product.collection)
    .concat(products.filter((p) => p.collection !== product.collection))
    .filter((p, i, arr) => arr.findIndex((x) => x.slug === p.slug) === i)
    .slice(0, limit);
}

export function getSubscriptionTier(slug: string) {
  return subscriptionTiers.find((t) => t.slug === slug);
}
