"use client";

import { useSyncExternalStore } from "react";

const CONSENT_KEY = "kma-cookie-consent";
export const CONSENT_EVENT = "kma-consent-change";

export type Consent = "granted" | "denied" | null;

function subscribeConsent(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getConsentSnapshot(): Consent {
  const v = window.localStorage.getItem(CONSENT_KEY);
  return v === "granted" || v === "denied" ? v : null;
}

/** SSR-safe reader for the visitor's cookie-consent choice. */
export function useConsent(): Consent {
  return useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    () => null,
  );
}

export function setConsent(choice: "granted" | "denied") {
  window.localStorage.setItem(CONSENT_KEY, choice);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: choice }));
}

function subscribeScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

/** SSR-safe reader for whether the page has scrolled past `threshold`. */
export function useScrolled(threshold = 12): boolean {
  return useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > threshold,
    () => false,
  );
}
