import type { Collection, Product, SubscriptionTier } from "@/types";
import { integrations } from "@/config/integrations";

const paymentLinkBySlug: Record<string, string | undefined> = {
  "whipped-grass-fed-tallow-balm":
    integrations.stripe.paymentLinks.whippedGrassFedTallowBalm,
  "botanical-facial-oil": integrations.stripe.paymentLinks.botanicalFacialOil,
  "womens-cycle-tea": integrations.stripe.paymentLinks.womensCycleTea,
  "ceremonial-cacao-blend": integrations.stripe.paymentLinks.ceremonialCacaoBlend,
  "evening-adaptogenic-tincture":
    integrations.stripe.paymentLinks.eveningAdaptogenicTincture,
};

export const collections: Collection[] = [
  {
    slug: "skin-rituals",
    name: "Skin Rituals",
    tagline: "Nourish your glow",
    description:
      "Whipped balms and botanical oils that restore softness and a healthy-looking radiance.",
  },
  {
    slug: "tea-rituals",
    name: "Tea Rituals",
    tagline: "Steep slowly, return to yourself",
    description:
      "Loose-leaf herbal blends crafted as daily rituals of nourishment and calm.",
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
      "Tinctures and tonics rooted in traditional herbalism to support modern life.",
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
    slug: "whipped-grass-fed-tallow-balm",
    name: "Whipped Grass-Fed Tallow Balm",
    collection: "skin-rituals",
    size: "2 oz",
    price: 38,
    description:
      "A cloud-soft whipped balm of grass-fed tallow and botanical oils that melts into skin for a healthy-looking glow.",
    longDescription:
      "A cloud-soft, whipped balm rendered from grass-fed, grass-finished beef tallow and infused with botanical oils. Deeply nourishing and beautifully simple, it melts into skin to restore softness and a healthy-looking glow.",
    benefits: [
      "Helps maintain the skin's natural moisture barrier",
      "Nourishes and softens dry, weathered skin",
      "Supports a smooth, supple, healthy-looking complexion",
      "Bio-compatible fats and fat-soluble vitamins (A, D, E, K) to nourish skin",
    ],
    ingredients:
      "Grass-fed beef tallow, cold-pressed jojoba oil, calendula-infused olive oil, vitamin E (non-GMO tocopherol), optional essential oil blend (lavender + frankincense). Fragrance-free option available.",
    story:
      "Born from the traditional wisdom that skin thrives on the fats our ancestors used, this balm pairs nutrient-dense grass-fed tallow with calendula's time-honored botanical care. Slow-rendered in small batches and whipped to a weightless texture.",
    photography:
      "Open amber/glass jar with whipped peak visible, soft natural window light, cream linen backdrop, sprig of calendula and a small wooden spatula. Macro texture shot of the whip. Hand swatch on skin.",
    ingestible: false,
    subscription: "monthly-save-10",
    imageTheme: "gold",
    featured: true,
  },
  {
    slug: "botanical-facial-oil",
    name: "Botanical Facial Oil",
    collection: "skin-rituals",
    size: "1 oz dropper",
    price: 64,
    description:
      "A luminous, fast-absorbing facial oil pressed from botanical seeds for a dewy, lit-from-within finish.",
    longDescription:
      "A luminous, fast-absorbing facial oil pressed from botanical seed oils and infused with skin-loving herbs. A few drops impart a dewy, lit-from-within finish.",
    benefits: [
      "Helps replenish skin's moisture for a dewy, radiant look",
      "Supports skin suppleness and a smooth texture",
      "Antioxidant-rich botanicals to help protect the look of skin from environmental stress",
      "Helps soften the appearance of fine, dry lines",
    ],
    ingredients:
      "Cold-pressed rosehip seed oil, jojoba, squalane (olive-derived), evening primrose oil, sea buckthorn CO2, rose-infused camellia oil, vitamin E.",
    story:
      "A modern apothecary blend balancing regenerative rosehip with rose and sea buckthorn, formulated for the woman who wants a ritual, not a routine. Pressed without heat to preserve botanical integrity.",
    photography:
      "Glass dropper suspended above bottle with a single drop, golden hour light, dusty-rose petals, marble or stone surface. Backlit bottle to show oil clarity/color. Drop-on-skin glow shot.",
    ingestible: false,
    subscription: "monthly-save-10",
    imageTheme: "rose",
    featured: true,
  },
  {
    slug: "womens-cycle-tea",
    name: "Women's Cycle Tea",
    collection: "tea-rituals",
    size: "3 oz loose-leaf tin (~30 cups)",
    price: 28,
    description:
      "A gentle, floral-herbal loose-leaf blend crafted as a daily ritual of care across the monthly cycle.",
    longDescription:
      "A gentle, floral-herbal loose-leaf blend crafted as a daily ritual of care across the monthly cycle. Soft notes of rose, raspberry leaf, and nettle.",
    benefits: [
      "Traditionally used to support women's wellness through the monthly cycle",
      "Herbs that help support a sense of calm and comfort",
      "Nettle and red raspberry leaf to support overall nourishment with vitamins and minerals",
      "A grounding ritual to support relaxation",
    ],
    ingredients:
      "Red raspberry leaf, nettle leaf, rose petals, lemon balm, chamomile, ginger, spearmint. Caffeine-free.",
    story:
      "Blended in the herbalist tradition of \u201cwomen's tonic\u201d teas, this is a daily companion meant to be steeped slowly and sipped mindfully. A ritual of returning to yourself.",
    photography:
      "Loose tea spilling from kraft/tin onto cream linen, steaming cup with rose petals, overhead flat lay of dry botanicals arranged by ingredient. Warm, soft, editorial.",
    ingestible: true,
    allergenNote:
      "Contains chamomile (avoid if sensitive to the daisy/ragweed family).",
    subscription: "monthly-tea",
    imageTheme: "rose",
    featured: true,
  },
  {
    slug: "ceremonial-cacao-blend",
    name: "Ceremonial Cacao Blend",
    collection: "cacao-rituals",
    size: "8 oz (~16 servings)",
    price: 42,
    description:
      "Stone-ground, single-origin ceremonial-grade cacao blended with warming spices for a rich, grounding ritual.",
    longDescription:
      "Stone-ground, single-origin ceremonial-grade cacao blended with warming spices for a rich, grounding ritual drink. Deeply chocolatey, naturally bittersweet.",
    benefits: [
      "Naturally occurring compounds in cacao to support a gentle sense of uplift and focus",
      "Helps support a grounding, intentional daily ritual",
      "Rich in naturally occurring antioxidants (flavanols)",
      "Warming spices traditionally used to support comfort and circulation",
    ],
    ingredients:
      "100% ceremonial-grade cacao (single-origin), cinnamon, cardamom, vanilla, pinch of sea salt, optional cayenne. Naturally dairy-free.",
    story:
      "Sourced from regeneratively grown, fairly traded cacao and prepared in the ceremonial tradition, this blend invites a moment of pause. Whisk into hot water or milk of choice and drink with intention.",
    photography:
      "Cacao being whisked/poured into a ceramic cup with froth, broken cacao block and whole spices, steam in moody warm light, hands cradling the cup. Earthy emerald + cream palette.",
    ingestible: true,
    allergenNote:
      "Contains cacao; processed in a facility that also handles tree nuts.",
    subscription: "monthly-cacao",
    imageTheme: "cacao",
    featured: true,
  },
  {
    slug: "evening-adaptogenic-tincture",
    name: "Evening Adaptogenic Tincture",
    collection: "botanical-wellness",
    size: "2 oz dropper",
    price: 44,
    description:
      "A calming evening tincture of adaptogenic and nervine herbs to gently close the day.",
    longDescription:
      "A calming evening tincture of adaptogenic and nervine herbs in an organic cane spirit base. A few dropperfuls in water to close the day.",
    benefits: [
      "Adaptogenic herbs traditionally used to help the body adapt to everyday stress",
      "Helps support a sense of calm and relaxation in the evening",
      "Supports a restful transition into nighttime",
      "Nervine botanicals to help support a balanced nervous system response",
    ],
    ingredients:
      "Ashwagandha root, reishi, lemon balm, passionflower, skullcap, organic cane alcohol, spring water. Alcohol-free glycerite option available.",
    story:
      "Formulated for the modern woman whose mind doesn't always clock out when she does. A grounding evening companion in the herbalist tradition of nervine support.",
    photography:
      "Dark glass dropper bottle, dropper mid-pour into a water glass, dried herbs and an amber tint, low warm evening light, sage + gold accents. Cozy, dusk mood.",
    ingestible: true,
    allergenNote:
      "Not for use during pregnancy or nursing. Consult your healthcare provider if taking medications. Keep out of reach of children.",
    subscription: "monthly-save-10",
    imageTheme: "sage",
    featured: true,
  },
  {
    slug: "rose-renewal-clay-mask",
    name: "Rose Renewal Clay Mask",
    collection: "skin-rituals",
    size: "3 oz",
    price: 34,
    description:
      "A rose and kaolin clay mask to gently clarify and leave skin feeling soft and refreshed.",
    longDescription:
      "A fine-milled rose and kaolin clay mask infused with botanical powders to gently clarify and refresh. Mix with water, honey, or hydrosol for a weekly ritual.",
    benefits: [
      "Helps gently clarify the look of skin",
      "Supports a refreshed, soft-feeling complexion",
      "Botanical clays to help absorb excess surface oil",
    ],
    ingredients:
      "Kaolin clay, French rose clay, rose petal powder, marshmallow root, oat powder.",
    story:
      "A weekly reset inspired by the slow rituals of the bathhouse, blending soft rose clays with soothing oat and marshmallow root.",
    photography:
      "Powdered clay in a ceramic bowl with a mixing brush, dusty-rose tones, dried rose petals, soft daylight.",
    ingestible: false,
    subscription: "monthly-save-10",
    imageTheme: "rose",
  },
  {
    slug: "sacred-calm-tea",
    name: "Sacred Calm Evening Tea",
    collection: "tea-rituals",
    size: "3 oz loose-leaf tin (~30 cups)",
    price: 26,
    description:
      "A soft, floral nighttime blend to support a calm, restful wind-down ritual.",
    longDescription:
      "A soothing loose-leaf blend of nervine herbs designed as an evening wind-down ritual. Gentle, floral, and naturally caffeine-free.",
    benefits: [
      "Herbs traditionally used to support relaxation",
      "Helps support a calm transition into evening",
      "A soothing ritual to close the day",
    ],
    ingredients:
      "Chamomile, lemon balm, lavender, passionflower, rose petals, oat straw. Caffeine-free.",
    story:
      "Created for the hour when the day softens, this blend pairs gentle nervines with the quiet comfort of rose and lavender.",
    photography:
      "Steaming cup at dusk, lavender sprigs, warm low light, sage-and-cream styling.",
    ingestible: true,
    allergenNote:
      "Contains chamomile (avoid if sensitive to the daisy/ragweed family).",
    subscription: "monthly-tea",
    imageTheme: "sage",
  },
  {
    slug: "seasonal-wellness-box",
    name: "Seasonal Wellness Box",
    collection: "seasonal-collections",
    size: "Curated quarterly box",
    price: 128,
    description:
      "A quarterly curation of seasonal botanicals, rituals, and a member-only guide.",
    longDescription:
      "A quarterly box thoughtfully curated to align your rituals with the season: a featured tea or cacao, a skin ritual, a botanical wellness item, and a printed seasonal living guide.",
    benefits: [
      "A seasonal ritual curated to support whole-self wellness",
      "Member-only botanical guide each season",
      "A grounding way to live in rhythm with the year",
    ],
    ingredients:
      "Contents vary by season. Each box includes a full ingredient and allergen card.",
    story:
      "For those who want to live with the seasons, the Seasonal Wellness Box arrives four times a year as an invitation to slow down and tend to yourself.",
    photography:
      "Flat lay of an opened box with tissue, botanicals, and a printed guide, seasonal color story, cream linen.",
    ingestible: true,
    allergenNote:
      "Contents vary; each season's box includes a complete allergen card. May contain cacao and tree nuts.",
    subscription: "seasonal-box",
    imageTheme: "emerald",
  },
];

export const subscriptionTiers: SubscriptionTier[] = [
  {
    slug: "monthly-tea",
    name: "Monthly Tea Subscription",
    description:
      "Your favorite loose-leaf ritual delivered fresh each month, with member pricing.",
    cadence: "Ships monthly",
    priceNote: "Save 10% + free shipping",
  },
  {
    slug: "monthly-cacao",
    name: "Monthly Cacao Subscription",
    description:
      "Ceremonial-grade cacao at your door each month to keep your ritual grounded.",
    cadence: "Ships monthly",
    priceNote: "Save 10% + free shipping",
  },
  {
    slug: "seasonal-box",
    name: "Seasonal Wellness Box",
    description:
      "A curated box of seasonal botanicals and rituals, delivered four times a year.",
    cadence: "Ships quarterly",
    priceNote: "Best value curation",
  },
];

// Resolve Stripe Payment Links from env-driven config at module load.
for (const product of products) {
  if (!product.stripePaymentLink && paymentLinkBySlug[product.slug]) {
    product.stripePaymentLink = paymentLinkBySlug[product.slug];
  }
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  // Preserve the launch order specified in the catalog.
  const order = [
    "whipped-grass-fed-tallow-balm",
    "botanical-facial-oil",
    "womens-cycle-tea",
    "ceremonial-cacao-blend",
    "evening-adaptogenic-tincture",
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
