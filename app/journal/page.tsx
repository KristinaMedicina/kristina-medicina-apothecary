import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/Section";
import { GoldDivider } from "@/components/ui/Botanical";
import { BlogCard } from "@/components/journal/BlogCard";
import { CategoryCard } from "@/components/journal/CategoryCard";
import { ProductImage } from "@/components/product/ProductImage";
import { ButtonLink } from "@/components/ui/Button";
import { LeadMagnet } from "@/components/marketing/LeadMagnet";
import {
  getArticles,
  getArticlesByCategory,
  getLeadArticle,
  journalCategories,
  getCategory,
} from "@/lib/journal";
import { formatDate, cn } from "@/lib/format";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Educational writing on ceremonial cacao, botanical skincare, women's wellness, herbal rituals, and seasonal living.",
  alternates: { canonical: "/journal" },
  openGraph: {
    title: "The Journal",
    description:
      "Botanical education and ritual writing from Kristina Medicina Apothecary.",
    images: [{ url: "/images/cacao-morning-book.jpg", alt: "Morning cacao ritual" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/cacao-morning-book.jpg"],
  },
};

export default async function JournalPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active = category && getCategory(category) ? category : null;
  const activeMeta = active ? getCategory(active) : null;

  const lead = getLeadArticle();
  const list = active
    ? getArticlesByCategory(active)
    : getArticles().filter((a) => a.slug !== lead.slug);

  return (
    <>
      <Section tone="white" spacing="sm">
        <SectionHeader
          eyebrow="The journal"
          title="Botanical education &amp; ritual"
          description="Trustworthy, educational writing to deepen your relationship with the plants and your own rhythm."
        />
        <GoldDivider className="mt-6" />

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <CategoryChip href="/journal" active={!active} label="All" />
          {journalCategories.map((c) => (
            <CategoryChip
              key={c.slug}
              href={`/journal?category=${c.slug}`}
              active={active === c.slug}
              label={c.name}
            />
          ))}
        </div>
      </Section>

      {/* Featured article (only on the unfiltered view) */}
      {!active && <FeaturedArticle slug={lead.slug} />}

      <Section tone="cream" spacing="sm">
        {activeMeta ? (
          <div className="mb-10 text-center">
            <p className="eyebrow text-gold">Category</p>
            <h2 className="mt-2 font-display text-3xl text-emerald">
              {activeMeta.name}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-ink-soft">
              {activeMeta.description}
            </p>
          </div>
        ) : (
          <SectionHeader
            eyebrow="Latest writing"
            title="Fresh from the journal"
            align="center"
          />
        )}
        {list.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((a) => (
              <BlogCard key={a.slug} article={a} />
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-ink-soft">
            New writing for this category is on its way.
          </p>
        )}
      </Section>

      {/* Browse categories */}
      <Section tone="sage" spacing="sm">
        <SectionHeader eyebrow="Browse by topic" title="Explore the categories" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {journalCategories.map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      </Section>

      <Section tone="white">
        <LeadMagnet source="journal" />
      </Section>
    </>
  );
}

function FeaturedArticle({ slug }: { slug: string }) {
  const article = getArticles().find((a) => a.slug === slug);
  if (!article) return null;
  const category = getCategory(article.category);

  return (
    <Section tone="cream" spacing="sm">
      <div className="grid items-center gap-8 overflow-hidden rounded-luxe border border-gold/20 bg-cream-50 shadow-soft lg:grid-cols-2 lg:gap-0">
        <Link
          href={`/journal/${article.slug}`}
          className="group relative block aspect-[16/11] w-full overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[420px]"
          aria-label={article.title}
        >
          {article.image ? (
            <Image
              src={article.image}
              alt={article.imageAlt ?? article.title}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          ) : (
            <ProductImage
              theme={article.imageTheme}
              label={article.title}
              className="h-full w-full"
            />
          )}
        </Link>
        <div className="p-8 sm:p-12">
          <p className="eyebrow text-gold">
            Featured{category ? ` · ${category.name}` : ""}
          </p>
          <h2 className="mt-4 font-display text-3xl leading-tight text-emerald sm:text-4xl">
            <Link
              href={`/journal/${article.slug}`}
              className="transition-colors hover:text-rose-deep"
            >
              {article.title}
            </Link>
          </h2>
          <p className="mt-4 leading-relaxed text-ink-soft">
            {article.excerpt}
          </p>
          <p className="mt-5 text-xs text-ink-soft/70">
            {article.author} &middot; {formatDate(article.publishedAt)} &middot;{" "}
            {article.readingTime}
          </p>
          <ButtonLink
            href={`/journal/${article.slug}`}
            size="lg"
            className="mt-7"
          >
            Read the Story
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}

function CategoryChip({
  href,
  active,
  label,
}: {
  href: string;
  active: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full border px-5 py-2 text-sm transition-all",
        active
          ? "border-emerald bg-emerald text-cream"
          : "border-gold/30 bg-cream-50 text-ink hover:border-gold",
      )}
    >
      {label}
    </Link>
  );
}
