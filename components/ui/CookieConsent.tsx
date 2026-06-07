"use client";

import Link from "next/link";
import { useConsent, setConsent } from "@/lib/useClientStore";

export function CookieConsent() {
  const consent = useConsent();

  if (consent !== null) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-gold/30 bg-cream-50 p-5 shadow-lg sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-ink-soft">
          We use cookies to understand how the site is used and to improve your
          experience. See our{" "}
          <Link href="/privacy" className="text-emerald underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={() => setConsent("denied")}
            className="rounded-full border border-emerald/40 px-5 py-2 text-sm text-emerald transition hover:bg-emerald/10"
          >
            Decline
          </button>
          <button
            onClick={() => setConsent("granted")}
            className="rounded-full bg-emerald px-5 py-2 text-sm text-cream transition hover:bg-emerald-700"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
