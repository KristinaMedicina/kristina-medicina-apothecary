import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types";
import { ProductImage } from "@/components/product/ProductImage";
import { getCategory } from "@/lib/journal";
import { formatDate } from "@/lib/format";

export function BlogCard({
  article,
  featured = false,
}: {
  article: Article;
  featured?: boolean;
}) {
  const category = getCategory(article.category);
  const aspect = featured ? "aspect-[16/10]" : "aspect-[16/9]";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-luxe border border-gold/20 bg-cream-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-22px_rgba(33,80,60,0.4)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <Link
        href={`/journal/${article.slug}`}
        className={`relative block overflow-hidden ${aspect}`}
        aria-label={article.title}
      >
        {article.image ? (
          <Image
            src={article.image}
            alt={article.imageAlt ?? article.title}
            fill
            sizes={
              featured
                ? "(min-width: 1024px) 66vw, 100vw"
                : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            }
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <ProductImage
            theme={article.imageTheme}
            label={article.title}
            className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        )}
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-[0.7rem] text-ink-soft">
          {category && (
            <span className="eyebrow text-[0.6rem] text-gold">
              {category.name}
            </span>
          )}
          <span aria-hidden="true">&middot;</span>
          <span>{article.readingTime}</span>
        </div>
        <h3
          className={`mt-2 font-display text-emerald transition-colors group-hover:text-rose-deep ${
            featured ? "text-2xl sm:text-3xl" : "text-xl"
          }`}
        >
          <Link href={`/journal/${article.slug}`}>{article.title}</Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
          {article.excerpt}
        </p>
        <p className="mt-4 text-xs text-ink-soft/70">
          {article.author} &middot; {formatDate(article.publishedAt)}
        </p>
      </div>
    </article>
  );
}
