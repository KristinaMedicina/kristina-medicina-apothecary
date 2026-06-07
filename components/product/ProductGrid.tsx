import type { Product } from "@/types";
import { ProductCard } from "@/components/product/ProductCard";
import { cn } from "@/lib/format";

export function ProductGrid({
  products,
  columns = 3,
  className,
}: {
  products: Product[];
  columns?: 3 | 4;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-6 sm:grid-cols-2",
        columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4",
        className,
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
