import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Kristina Medicina Apothecary collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="June 2026">
      <p>
        {site.name} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
        respects your privacy. This policy explains what information we collect,
        how we use it, and the choices you have.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          Information you provide, such as your name, email address, and message
          when you subscribe to our newsletter, book a consultation, or contact
          us.
        </li>
        <li>
          Order and payment details, which are processed by our payment partners
          (such as Stripe). We do not store full payment card numbers.
        </li>
        <li>
          Usage data, such as pages visited and device information, collected
          through analytics only after you grant cookie consent.
        </li>
      </ul>

      <h2>How we use your information</h2>
      <ul>
        <li>To fulfill orders and provide consultations.</li>
        <li>
          To send you the resources, newsletters, and offers you&apos;ve
          requested (you can unsubscribe at any time).
        </li>
        <li>To respond to your inquiries and provide customer support.</li>
        <li>To understand and improve our website and offerings.</li>
      </ul>

      <h2>Cookies and analytics</h2>
      <p>
        We use cookies and similar technologies to operate the site and, with
        your consent, to measure usage through analytics tools. You can accept or
        decline non-essential cookies through our consent banner, and you can
        change your choice at any time by clearing your browser&apos;s storage.
      </p>

      <h2>Sharing your information</h2>
      <p>
        We share information only with service providers who help us operate
        (such as payment, scheduling, email, and analytics providers), and only
        as needed to provide our services. We do not sell your personal
        information.
      </p>

      <h2>Your rights and choices</h2>
      <p>
        Depending on where you live, you may have rights to access, correct, or
        delete your personal information, and to opt out of certain processing.
      </p>
      <p>
        <strong>California residents (CPRA):</strong> You have the right to know,
        delete, and correct your personal information, and the right to opt out
        of the sale or sharing of your personal information. We do not sell your
        personal information. To exercise any right, or to submit a &ldquo;Do Not
        Sell or Share My Personal Information&rdquo; request, email us at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>Email communications</h2>
      <p>
        Every marketing email includes an unsubscribe link, and our messages
        include our physical mailing address in compliance with the CAN-SPAM Act.
        You may opt out of marketing emails at any time.
      </p>

      <h2>Data retention &amp; security</h2>
      <p>
        We retain personal information only as long as necessary for the purposes
        described here, and we use reasonable safeguards to protect it. No method
        of transmission over the internet is fully secure, however, and we cannot
        guarantee absolute security.
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>
        Our site is intended for adults. We do not knowingly collect personal
        information from children under 16.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
