import Link from "next/link";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/format";
import { ProductImage } from "@/components/product/ProductImage";
import { BuyButton } from "@/components/product/BuyButton";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { getCollection } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const collection = getCollection(product.collection);

  return (
    <article className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-gold/20 bg-cream-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-22px_rgba(33,80,60,0.45)]">
      <Link
        href={`/shop/${product.slug}`}
        className="relative block aspect-[5/6] overflow-hidden"
      >
        <ProductImage
          theme={product.imageTheme}
          label={product.name}
          className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {product.subscription && (
          <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-emerald">
            Subscribe & Save
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        {collection && (
          <p className="eyebrow text-[0.6rem] text-gold">{collection.name}</p>
        )}
        <h3 className="mt-2 font-display text-xl text-emerald">
          <Link href={`/shop/${product.slug}`} className="hover:text-rose-deep">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-soft">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-2xl text-ink">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs text-ink-soft">{product.size}</span>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <BuyButton product={product} size="sm" />
          <AddToCartButton product={product} size="sm" />
        </div>
      </div>
    </article>
  );
}
