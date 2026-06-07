import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { ProductImage } from "@/components/product/ProductImage";
import { BlogCard } from "@/components/journal/BlogCard";
import { LeadMagnet } from "@/components/marketing/LeadMagnet";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { articles, getArticles, getArticle, getCategory } from "@/lib/journal";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article not found" };
  const title = article.seoTitle ?? article.title;
  const description = article.seoDescription ?? article.excerpt;

  return {
    title,
    description,
    alternates: { canonical: `/journal/${article.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: article.publishedAt,
      ...(article.image && {
        images: [{ url: article.image, alt: article.imageAlt ?? article.title }],
      }),
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const category = getCategory(article.category);
  const related = getArticles()
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .concat(getArticles().filter((a) => a.slug !== article.slug))
    .filter((a, i, arr) => arr.findIndex((x) => x.slug === a.slug) === i)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.image ? `${site.url}${article.image}` : undefined,
    author: { "@type": "Person", name: article.author },
    publisher: { "@type": "Organization", name: site.name },
    datePublished: article.publishedAt,
    mainEntityOfPage: `${site.url}/journal/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        <Section tone="white" spacing="sm">
          <div className="mx-auto max-w-3xl text-center">
            <nav className="text-xs text-ink-soft">
              <Link href="/journal" className="hover:text-emerald">
                Journal
              </Link>
              {category && (
                <>
                  <span className="mx-2">/</span>
                  <Link
                    href={`/journal?category=${category.slug}`}
                    className="hover:text-emerald"
                  >
                    {category.name}
                  </Link>
                </>
              )}
            </nav>
            <h1 className="mt-5 font-display text-4xl leading-tight text-emerald sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-4 text-sm text-ink-soft">
              {article.author} &middot; {formatDate(article.publishedAt)} &middot;{" "}
              {article.readingTime}
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-4xl">
            {article.image ? (
              <div className="relative aspect-[16/8] w-full overflow-hidden rounded-luxe shadow-soft">
                <Image
                  src={article.image}
                  alt={article.imageAlt ?? article.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 56rem, 100vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <ProductImage
                theme={article.imageTheme}
                label={article.title}
                className="aspect-[16/8] w-full"
              />
            )}
          </div>
        </Section>

        <Section tone="cream" spacing="sm">
          <div className="prose-luxe mx-auto max-w-3xl">
            <p className="text-lg leading-relaxed text-ink">
              {article.excerpt}
            </p>
            {article.body.map((block, i) => (
              <div key={i}>
                {block.heading && <h2>{block.heading}</h2>}
                {block.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
                {block.list && (
                  <ul>
                    {block.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {article.closingPrompt && (
              <div className="mt-10 rounded-luxe border border-gold/25 bg-cream-50 p-7 shadow-card">
                <p className="eyebrow text-gold">{article.closingPrompt.title}</p>
                <p className="mt-3 leading-relaxed text-ink">
                  {article.closingPrompt.body}
                </p>
              </div>
            )}

            <Disclaimer className="mt-10">
              This article is educational and reflects traditional herbal
              practices. It is not medical advice and is not a substitute for
              care from a licensed healthcare provider.
            </Disclaimer>
          </div>
        </Section>
      </article>

      <Section tone="white">
        <LeadMagnet source="article" />
      </Section>

      {related.length > 0 && (
        <Section tone="cream">
          <h2 className="text-center font-display text-3xl text-emerald">
            Keep reading
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {related.map((a) => (
              <BlogCard key={a.slug} article={a} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
