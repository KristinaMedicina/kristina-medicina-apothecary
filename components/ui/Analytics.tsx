"use client";

import Script from "next/script";
import { integrations } from "@/config/integrations";
import { useConsent } from "@/lib/useClientStore";

/**
 * Loads Google Analytics 4 only after the visitor grants cookie consent.
 * If NEXT_PUBLIC_GA_ID is unset, nothing is rendered.
 */
export function Analytics() {
  const consent = useConsent();
  const gaId = integrations.analytics.gaId;

  if (!gaId || consent !== "granted") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
