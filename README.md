# Kristina Medicina Apothecary

A premium botanical wellness storefront, luxury skincare, teas, ceremonial cacao, adaptogenic tinctures, and one-on-one consultations, built with Next.js (App Router), TypeScript, and Tailwind CSS.

The site is a fast, SEO-optimized marketing + catalog layer. Commerce is intentionally delegated to hosted tools so it can take money on day one with **no custom cart or payment infrastructure to build or secure**:

- **Stripe Payment Links** for product checkout
- **Calendly** (or Acuity / Practice Better) for paid consultation booking
- **Klaviyo** for the email list + lead magnet
- **Google Analytics 4** (loaded only after cookie consent)

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. (optional) add integration keys
cp .env.example .env.local   # then fill in values as you connect tools

# 3. Run the dev server
npm run dev                  # http://localhost:3000

# 4. Production build / preview
npm run build
npm start
```

The site runs fully with **no environment variables set**, buy and booking buttons render a tasteful "Available Soon" / "Booking Opens Soon" state until you connect the tools below.

> Note on build tooling: the scripts use Next.js with the **webpack** compiler (`next dev --webpack` / `next build --webpack`) for maximum portability. If your machine supports Turbopack native bindings you can use the faster `npm run dev:turbo` / `npm run build:turbo`.

---

## Project structure

```
app/
  layout.tsx              Root layout: fonts, Navbar, Footer, Organization JSON-LD, cookie consent, GA4
  globals.css             Tailwind v4 theme tokens (dusty rose, cream, emerald, sage, gold)
  page.tsx                Home
  shop/page.tsx           Shop grid with collection filter
  shop/[slug]/page.tsx    Product detail (generateStaticParams, Product JSON-LD, FDA disclaimer)
  consultations/page.tsx  Consultations, intake steps, FAQ (FAQPage JSON-LD), disclaimers, booking
  about/page.tsx          Founder story, mission, philosophy
  journal/page.tsx        Journal index + category filter
  journal/[slug]/page.tsx Article template (Article JSON-LD)
  contact/page.tsx        Contact form + email/social
  privacy/ terms/ disclaimer/ shipping-returns/   Legal & compliance pages
  api/subscribe/route.ts  Newsletter endpoint (Klaviyo-ready)
  api/contact/route.ts    Contact endpoint (stub)
  sitemap.ts  robots.ts   Native App Router SEO
components/
  layout/                 Navbar, Footer
  product/                ProductCard, ProductGrid, ProductImage, BuyButton, AddToCartButton
  consult/                ConsultationCard, BookButton
  marketing/              Hero, NewsletterForm, LeadMagnet, TestimonialSection, ContactForm
  journal/                BlogCard, CategoryCard
  ui/                     Button, Section, Badge, FAQAccordion, Disclaimer, CookieConsent, Analytics, Botanical, CheckoutCTA
  legal/                  LegalPage layout
lib/                      products, consultations, journal, testimonials, site, format, useClientStore
config/integrations.ts    Single env-driven integration config
types/index.ts            Shared TypeScript types
.env.example              All supported environment variables
```

### Content as data
All catalog content lives in typed data files so it is easy to edit without touching components:

- Products & collections: `lib/products.ts`
- Consultations & FAQ: `lib/consultations.ts`
- Journal articles & categories: `lib/journal.ts`
- Brand, nav, social, address: `lib/site.ts`

---

## Connecting Stripe Payment Links (product checkout)

1. In the [Stripe Dashboard](https://dashboard.stripe.com), create each product/price, then create a **Payment Link** for each one.
2. Copy each Payment Link URL.
3. Paste them into `.env.local`:

   ```bash
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   NEXT_PUBLIC_STRIPE_LINK_TALLOW_BALM=https://buy.stripe.com/...
   NEXT_PUBLIC_STRIPE_LINK_FACIAL_OIL=https://buy.stripe.com/...
   NEXT_PUBLIC_STRIPE_LINK_CYCLE_TEA=https://buy.stripe.com/...
   NEXT_PUBLIC_STRIPE_LINK_CACAO=https://buy.stripe.com/...
   NEXT_PUBLIC_STRIPE_LINK_TINCTURE=https://buy.stripe.com/...
   ```

   These are mapped to products automatically in `lib/products.ts`. (You can also hardcode a link on any product via its `stripePaymentLink` field.)
4. Restart the dev server. The **Buy Now** / **Add to Cart** buttons now open the hosted Stripe checkout. Configure shipping, taxes, and subscriptions directly in Stripe.

> Subscriptions (Monthly Tea, Monthly Cacao, Seasonal Box) are surfaced in the UI and are best implemented as Stripe recurring Payment Links, drop the recurring link in the same env var.

## Connecting Calendly (paid consultation booking)

1. In [Calendly](https://calendly.com) (or Acuity / Practice Better), create one event type per consultation and enable **payment collection** (Stripe/PayPal) on each.
2. Copy each event's scheduling URL.
3. Paste them into `.env.local`:

   ```bash
   NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-handle           # fallback
   NEXT_PUBLIC_CALENDLY_BOTANICAL_WELLNESS=https://calendly.com/.../botanical-wellness
   NEXT_PUBLIC_CALENDLY_CEREMONIAL_CACAO=https://calendly.com/.../ceremonial-cacao
   NEXT_PUBLIC_CALENDLY_PREPARATION_INTEGRATION=https://calendly.com/.../prep-integration
   ```
4. Restart the dev server. The **Book a Consultation** buttons now open the correct scheduler.

## Connecting Klaviyo (email list + lead magnet)

```bash
NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY=XXXXXX
KLAVIYO_LIST_ID=XXXXXX
KLAVIYO_PRIVATE_KEY=pk_xxx
```

`app/api/subscribe/route.ts` forwards new subscribers to your Klaviyo list when these are set (and logs locally otherwise). Set up a **Welcome flow** in Klaviyo that delivers the lead magnet, *7 Botanical Rituals for Women's Wellness and Nervous System Support*.

## Connecting Google Analytics 4

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

GA4 loads only **after** a visitor accepts cookies via the consent banner (GDPR/CPRA friendly).

---

## Deferred until post-revenue

To keep the launch lean, the following are intentionally not built yet (wiring points are noted in `config/integrations.ts`): a custom multi-item cart / Stripe Checkout sessions, Shopify Storefront API, Meta Pixel, and a full Journal CMS.

## Compliance notes

This brand sells ingestible herbs and cosmetics, so the build includes FDA structure/function disclaimers on every ingestible product and consultation, allergen and pregnancy/medication warnings, scope-of-practice (not medical advice) language, a cookie-consent gate, a CPRA "Do Not Sell or Share" provision in the Privacy Policy, a CAN-SPAM email footer, and a Shipping & Returns policy. Review all legal copy with qualified counsel before launch.

## Tech

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · ESLint
