import Image from "next/image";
import { cn } from "@/lib/format";

type Ratio =
  | "portrait"
  | "tall"
  | "square"
  | "landscape"
  | "wide"
  | "ultrawide";

const ratios: Record<Ratio, string> = {
  portrait: "aspect-[4/5]",
  tall: "aspect-[3/4]",
  square: "aspect-square",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
  ultrawide: "aspect-[21/9]",
};

interface EditorialImageProps {
  src: string;
  alt: string;
  /** Aspect ratio of the frame. Defaults to portrait for editorial layouts. */
  ratio?: Ratio;
  /** object-position for fine-tuning the crop, e.g. "center top". */
  position?: string;
  /** Optional caption rendered beneath the frame. */
  caption?: string;
  /** Small eyebrow label rendered over the image. */
  eyebrow?: string;
  /** Gentle zoom on hover, for clickable/featured imagery. */
  interactive?: boolean;
  /** Soft dark gradient at the base, useful when overlaying text. */
  overlay?: boolean;
  /** Pass to next/image for above-the-fold images. */
  priority?: boolean;
  /** Responsive sizes hint for next/image. */
  sizes?: string;
  rounded?: boolean;
  shadow?: boolean;
  className?: string;
}

/**
 * Reusable image frame tuned for luxury editorial layouts: a fixed aspect
 * ratio, soft rounded corners, gentle shadow, optional caption/eyebrow and a
 * restrained hover zoom. Wraps next/image (fill) for automatic optimization.
 */
export function EditorialImage({
  src,
  alt,
  ratio = "portrait",
  position = "center",
  caption,
  eyebrow,
  interactive = false,
  overlay = false,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  rounded = true,
  shadow = true,
  className,
}: EditorialImageProps) {
  return (
    <figure className={cn("group", className)}>
      <div
        className={cn(
          "relative w-full overflow-hidden",
          ratios[ratio],
          rounded && "rounded-luxe",
          shadow && "shadow-soft",
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectPosition: position }}
          className={cn(
            "object-cover",
            interactive &&
              "transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100",
          )}
        />
        {overlay && (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/10 to-transparent"
          />
        )}
        {eyebrow && (
          <span className="eyebrow absolute left-5 top-5 rounded-full bg-cream/90 px-4 py-1.5 text-[0.6rem] text-emerald shadow-soft">
            {eyebrow}
          </span>
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-xs italic text-ink-soft/80">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
