import type { Product } from "@/types";
import { BuyButton } from "@/components/product/BuyButton";

/**
 * "Add to Cart" entry point. v1 commerce is delegated to Stripe Payment Links,
 * so this resolves to the same hosted checkout as Buy Now (single-item). A
 * multi-item cart is intentionally deferred until post-revenue. Kept as a named
 * component so pages can express intent and we can swap the implementation
 * later without touching every call site.
 */
export function AddToCartButton({
  product,
  size = "md",
}: {
  product: Product;
  size?: "sm" | "md";
}) {
  return (
    <BuyButton
      product={product}
      label="Add to Cart"
      variant="secondary"
      size={size}
    />
  );
}
