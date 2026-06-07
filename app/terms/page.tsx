import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms and conditions governing your use of the Kristina Medicina Apothecary website and purchases.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms &amp; Conditions" updated="June 2026">
      <p>
        Welcome to {site.name}. By accessing or using our website and purchasing
        our products or consultations, you agree to these Terms &amp; Conditions.
        Please read them carefully.
      </p>

      <h2>Use of our site</h2>
      <p>
        You may use our site for lawful, personal purposes only. You agree not to
        misuse the site, interfere with its operation, or attempt to access it in
        any unauthorized way.
      </p>

      <h2>Products and orders</h2>
      <p>
        We strive to describe and price our products accurately, but errors may
        occur. We reserve the right to correct any errors and to refuse or cancel
        any order. Orders are subject to availability. Payment is processed
        securely by our payment partners.
      </p>

      <h2>Consultations</h2>
      <p>
        Consultations are educational sessions and are subject to the disclaimer
        on our <a href="/disclaimer">Disclaimer</a> page. Booking and payment are
        handled through our scheduling partner. Please review the rescheduling
        and cancellation terms provided at the time of booking.
      </p>

      <h2>Subscriptions</h2>
      <p>
        Where offered, subscriptions renew automatically at the interval selected
        until cancelled. You may cancel or modify a subscription at any time
        before the next billing date through your account or by contacting us.
      </p>

      <h2>Intellectual property</h2>
      <p>
        All content on this site, including text, images, branding, and
        formulations, is the property of {site.name} or its licensors and is
        protected by applicable laws. You may not reproduce or use our content
        without permission.
      </p>

      <h2>Disclaimers and limitation of liability</h2>
      <p>
        Our products and content are provided &ldquo;as is&rdquo; for educational
        purposes and are not medical advice. To the fullest extent permitted by
        law, {site.name} is not liable for any indirect, incidental, or
        consequential damages arising from your use of our site, products, or
        consultations. Please review our full{" "}
        <a href="/disclaimer">Disclaimer</a>.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the State of Oregon, without
        regard to its conflict of laws principles.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these Terms &amp; Conditions from time to time. Continued
        use of the site after changes constitutes acceptance of the updated
        terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? Email <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
