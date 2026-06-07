import type { Product } from "@/types";
import { PurchaseButton } from "@/components/product/PurchaseButton";

/** v1 resolves to the same Stripe Payment Link as Buy Now. */
export function AddToCartButton({
  product,
  size = "md",
}: {
  product: Product;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <PurchaseButton
      product={product}
      label="Add to Cart"
      variant="secondary"
      size={size}
    />
  );
}
