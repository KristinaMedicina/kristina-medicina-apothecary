export const site = {
  name: "Kristina Medicina Apothecary",
  shortName: "Kristina Medicina",
  description:
    "Luxury botanical wellness for modern women. Plant wisdom, ritual, skin nourishment, nervous system support, and women's wellness.",
  url: "https://kristinamedicina.com",
  email: "hello@kristinamedicina.com",
  // CAN-SPAM compliant physical address (placeholder).
  address: "1208 Linden Way, Suite 4, Portland, OR 97204",
  social: {
    instagram: "https://instagram.com/kristinamedicina",
    pinterest: "https://pinterest.com/kristinamedicina",
    tiktok: "https://tiktok.com/@kristinamedicina",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Shop", href: "/shop" },
    { label: "Services", href: "/consultations" },
    { label: "Journal", href: "/journal" },
    { label: "Contact", href: "/contact" },
  ],
  footerLinks: {
    shop: [
      { label: "All Products", href: "/shop" },
      { label: "Skin Rituals", href: "/shop?collection=skin-rituals" },
      { label: "Tea Rituals", href: "/shop?collection=tea-rituals" },
      { label: "Cacao Rituals", href: "/shop?collection=cacao-rituals" },
      { label: "Botanical Wellness", href: "/shop?collection=botanical-wellness" },
    ],
    explore: [
      { label: "Consultations", href: "/consultations" },
      { label: "Journal", href: "/journal" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "Shipping & Returns", href: "/shipping-returns" },
    ],
  },
} as const;

export const FDA_DISCLAIMER =
  "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.";
