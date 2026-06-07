import type { Consultation } from "@/types";
import { integrations } from "@/config/integrations";

export const consultations: Consultation[] = [
  {
    slug: "botanical-wellness-consultation",
    name: "Botanical Wellness Consultation",
    durationMinutes: 60,
    price: 150,
    format: "Virtual (video)",
    description:
      "A personalized one-on-one session exploring your wellness goals through a plant-centered, educational lens.",
    longDescription:
      "A personalized one-on-one session exploring your wellness goals through a plant-centered, educational lens. We discuss daily rituals, botanical traditions, and lifestyle practices to support skin, nervous system, and women's wellness.",
    workflow: [
      "Book a 60-minute session and pay securely at checkout.",
      "Receive an intake form covering your goals, current routine, and sensitivities.",
      "Meet over video for your personalized, educational session.",
      "Get a follow-up resource summary emailed after our time together.",
    ],
    disclaimer:
      "This consultation is educational and reflects traditional herbal practices. It is not medical advice, diagnosis, or treatment, and is not a substitute for care from a licensed healthcare provider. Always consult your provider before changing your wellness regimen, especially if pregnant, nursing, or taking medications.",
    bookingUrl: integrations.calendly.consultations.botanicalWellness,
    imageTheme: "sage",
    image: "/images/kristina-altar.jpg",
    imageAlt:
      "Kristina seated at her botanical altar with candles and plants",
  },
  {
    slug: "ceremonial-cacao-consultation",
    name: "Ceremonial Cacao Consultation",
    durationMinutes: 75,
    price: 180,
    format: "Virtual (video)",
    description:
      "A guided session introducing the tradition and practice of ceremonial cacao, from sourcing to ritual.",
    longDescription:
      "A guided session introducing the tradition and practice of ceremonial cacao. Learn sourcing, preparation, intention-setting, and how to build a grounding personal ritual.",
    workflow: [
      "Book a 75-minute session and pay securely at checkout.",
      "Complete a short intake on your experience level and intentions.",
      "Receive a preparation guide and sourcing recommendations ahead of our session.",
      "Meet over video to build your grounding cacao ritual.",
    ],
    disclaimer:
      "Educational and rooted in cultural and traditional practices; not medical advice or therapy. Ceremonial cacao contains naturally occurring stimulants (theobromine/caffeine). Not recommended for those with certain heart conditions, who are pregnant/nursing, or taking MAOIs or other interacting medications without consulting a healthcare provider.",
    bookingUrl: integrations.calendly.consultations.ceremonialCacao,
    imageTheme: "cacao",
    image: "/images/cacao-bowl.webp",
    imageAlt: "Hands offering a wooden bowl of ceremonial cacao",
  },
  {
    slug: "preparation-integration-education",
    name: "Preparation & Integration Education",
    durationMinutes: 90,
    price: 225,
    format: "Virtual (video)",
    description:
      "An in-depth educational session on thoughtful preparation and integration practices, approached with intention and care.",
    longDescription:
      "An in-depth educational session on thoughtful preparation and integration practices to help you approach wellness rituals with intention, safety awareness, and grounded follow-through.",
    workflow: [
      "Book a 90-minute session and pay securely at checkout.",
      "Complete a pre-session questionnaire.",
      "Meet over video for your in-depth educational session.",
      "Receive a written integration framework and practice resources afterward.",
    ],
    disclaimer:
      "Strictly educational. This session does not provide, supply, or encourage the use of any controlled or illegal substances, and is not medical, psychological, or therapeutic advice. It is not a substitute for licensed medical or mental health care. Please consult appropriate licensed professionals for medical or mental health needs.",
    bookingUrl: integrations.calendly.consultations.preparationIntegration,
    imageTheme: "gold",
    image: "/images/community.jpg",
    imageAlt:
      "A circle of people gathered for a warm cacao and wellness workshop",
  },
];

export function getConsultation(slug: string): Consultation | undefined {
  return consultations.find((c) => c.slug === slug);
}

export const consultationFaqs = [
  {
    question: "Are consultations medical appointments?",
    answer:
      "No. Every consultation is educational and rooted in traditional herbalism. They are not medical advice, diagnosis, or treatment, and do not replace care from a licensed healthcare provider.",
  },
  {
    question: "How do I book and pay?",
    answer:
      "Choose a consultation, click Book a Consultation, and you'll be taken to our secure scheduler to select a time and pay. You'll receive a confirmation and intake form by email.",
  },
  {
    question: "What happens after I book?",
    answer:
      "You'll receive an intake form (or questionnaire) to complete before our session, plus any preparation materials relevant to your consultation. After we meet, you'll receive a follow-up resource summary.",
  },
  {
    question: "Can you help if I'm pregnant, nursing, or taking medication?",
    answer:
      "We're happy to share general educational information, but you should always consult your licensed healthcare provider before changing your wellness routine. Please disclose pregnancy, nursing, and medications on your intake form.",
  },
  {
    question: "What is your rescheduling policy?",
    answer:
      "Sessions can be rescheduled up to 24 hours in advance through your confirmation email. Please reach out if something urgent comes up and we'll do our best to accommodate.",
  },
  {
    question: "Do you offer packages or follow-up sessions?",
    answer:
      "Yes. Many clients begin with a Botanical Wellness Consultation and continue with follow-up sessions. Reach out via our contact page to discuss a tailored package.",
  },
];
