import type { ReactNode } from "react";
import { Section } from "@/components/ui/Section";
import { GoldDivider } from "@/components/ui/Botanical";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <Section tone="white" spacing="sm">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow text-center text-gold">Legal</p>
        <h1 className="mt-3 text-center font-display text-4xl text-emerald">
          {title}
        </h1>
        <p className="mt-2 text-center text-xs text-ink-soft">
          Last updated: {updated}
        </p>
        <GoldDivider className="mt-6" />
        <div className="prose-luxe mt-10">{children}</div>
      </div>
    </Section>
  );
}
