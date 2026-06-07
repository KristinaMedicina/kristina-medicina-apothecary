import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Important educational and wellness disclaimer for Kristina Medicina Apothecary products and consultations.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" updated="June 2026">
      <h2>Educational purpose only</h2>
      <p>
        The information, products, and consultations offered by {site.name}{" "}
        (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) are provided
        for educational and informational purposes only. They are rooted in
        traditional herbal and wellness practices and are intended to support
        general well-being.
      </p>

      <h2>Not medical advice</h2>
      <p>
        Nothing offered by {site.name} is intended to be, and should not be
        construed as, medical, psychological, or therapeutic advice, diagnosis,
        or treatment. Our products and consultations are not a substitute for
        care from a licensed healthcare provider. Always seek the advice of your
        physician or other qualified health provider with any questions you may
        have regarding a medical condition or before starting any new wellness
        regimen.
      </p>

      <h2>FDA statement</h2>
      <p>
        These statements have not been evaluated by the Food and Drug
        Administration. Our products are not intended to diagnose, treat, cure,
        or prevent any disease.
      </p>

      <h2>Pregnancy, nursing, and medications</h2>
      <p>
        If you are pregnant, nursing, taking medications, or managing a health
        condition, please consult your licensed healthcare provider before using
        any herbal product or beginning any new ritual. Some botanicals are not
        recommended during pregnancy or with certain medications.
      </p>

      <h2>Allergens</h2>
      <p>
        Our products may contain or be processed alongside common allergens,
        including cacao and tree nuts, and certain teas contain plants in the
        daisy/ragweed family (such as chamomile). Please review each product&apos;s
        ingredients and allergen notes carefully, and discontinue use if you
        experience any adverse reaction.
      </p>

      <h2>Consultations</h2>
      <p>
        Our consultations are strictly educational. We do not provide, supply,
        or encourage the use of any controlled or illegal substances. We do not
        diagnose conditions or prescribe treatments. Please consult appropriate
        licensed professionals for your medical or mental health needs.
      </p>

      <h2>Individual results</h2>
      <p>
        Wellness is deeply personal, and individual experiences vary. We make no
        guarantees regarding specific outcomes from the use of our products or
        participation in our consultations.
      </p>

      <h2>Questions</h2>
      <p>
        If you have any questions about this disclaimer, please contact us at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
