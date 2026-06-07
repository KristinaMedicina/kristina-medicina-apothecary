import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description:
    "Shipping timelines, rates, and our returns and refunds policy for Kristina Medicina Apothecary.",
  alternates: { canonical: "/shipping-returns" },
};

export default function ShippingReturnsPage() {
  return (
    <LegalPage title="Shipping &amp; Returns" updated="June 2026">
      <h2>Processing &amp; shipping</h2>
      <p>
        Each order is prepared with care in small batches. Orders are typically
        processed within 2-4 business days. Once shipped, you&apos;ll receive a
        tracking link by email. Domestic delivery generally takes 3-7 business
        days depending on your location.
      </p>

      <h2>Shipping rates</h2>
      <ul>
        <li>Flat-rate domestic shipping is calculated at checkout.</li>
        <li>Complimentary shipping on qualifying orders and subscriptions.</li>
        <li>
          International shipping may be available to select countries; duties and
          taxes are the responsibility of the recipient.
        </li>
      </ul>

      <h2>Returns &amp; refunds</h2>
      <p>
        Your satisfaction matters to us. Because our products are wellness and
        personal-care items, the following applies for safety and hygiene
        reasons:
      </p>
      <ul>
        <li>
          Unopened, unused products may be returned within 30 days of delivery
          for a refund of the product price.
        </li>
        <li>
          For hygiene reasons, opened or used skincare, tea, cacao, and tincture
          products are not eligible for return unless they arrived damaged or
          defective.
        </li>
        <li>
          If your order arrives damaged or incorrect, contact us within 7 days at{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> and we&apos;ll make
          it right.
        </li>
      </ul>

      <h2>How to start a return</h2>
      <p>
        Email <a href={`mailto:${site.email}`}>{site.email}</a> with your order
        number and reason for return. We&apos;ll provide instructions. Refunds
        are issued to the original payment method once the return is received and
        inspected.
      </p>

      <h2>Subscriptions</h2>
      <p>
        You can pause, skip, modify, or cancel a subscription at any time before
        your next billing date. Subscription shipments already processed follow
        the standard returns policy above.
      </p>

      <h2>Questions</h2>
      <p>
        We&apos;re happy to help, reach us at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
