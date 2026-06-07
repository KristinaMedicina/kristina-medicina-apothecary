import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { Analytics } from "@/components/ui/Analytics";
import { integrations } from "@/config/integrations";
import { site } from "@/lib/site";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Luxury Botanical Wellness`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "botanical wellness",
    "herbal apothecary",
    "grass-fed tallow balm",
    "ceremonial cacao",
    "women's wellness tea",
    "adaptogenic tincture",
    "herbalist consultation",
  ],
  openGraph: {
    title: `${site.name} | Luxury Botanical Wellness`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
    images: [
      {
        url: "/images/hero-roses.jpg",
        width: 1200,
        height: 630,
        alt: "Soft pink roses held gently in hand — Kristina Medicina Apothecary",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Luxury Botanical Wellness`,
    description: site.description,
    images: ["/images/hero-roses.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.description,
    email: site.email,
    logo: `${site.url}/images/hero-roses.jpg`,
    image: `${site.url}/images/hero-roses.jpg`,
    sameAs: Object.values(site.social),
  };

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full overflow-x-hidden antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden bg-cream text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
        <Analytics />
        {integrations.kit.formId && (
          <Script
            src="https://f.convertkit.com/ckjs/ck.5.js"
            strategy="lazyOnload"
          />
        )}
      </body>
    </html>
  );
}
