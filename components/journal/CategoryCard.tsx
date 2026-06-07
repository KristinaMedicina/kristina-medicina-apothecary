import Link from "next/link";
import type { JournalCategoryMeta } from "@/types";
import { BotanicalSprig } from "@/components/ui/Botanical";

export function CategoryCard({
  category,
}: {
  category: JournalCategoryMeta;
}) {
  return (
    <Link
      href={`/journal?category=${category.slug}`}
      className="group flex flex-col rounded-2xl border border-gold/20 bg-cream-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50"
    >
      <BotanicalSprig className="h-6 w-16 text-gold/70" />
      <h3 className="mt-4 font-display text-xl text-emerald group-hover:text-rose-deep">
        {category.name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        {category.description}
      </p>
    </Link>
  );
}
