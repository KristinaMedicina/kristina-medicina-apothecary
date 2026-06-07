import type { Consultation } from "@/types";
import { formatPrice } from "@/lib/format";
import { ProductImage } from "@/components/product/ProductImage";
import { BookConsultationButton } from "@/components/consult/BookConsultationButton";

export function ConsultationCard({
  consultation,
  showDisclaimer = true,
}: {
  consultation: Consultation;
  showDisclaimer?: boolean;
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-[1.5rem] border border-gold/20 bg-cream-50">
      <div className="relative aspect-[16/9] overflow-hidden">
        <ProductImage
          theme={consultation.imageTheme}
          label={consultation.name}
          src={consultation.image}
          alt={consultation.imageAlt}
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="h-full w-full"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-xs text-ink-soft">
          <span>{consultation.durationMinutes} min</span>
          <span className="h-1 w-1 rounded-full bg-gold" />
          <span>{consultation.format}</span>
        </div>
        <h3 className="mt-2 font-display text-2xl text-emerald">
          {consultation.name}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
          {consultation.description}
        </p>
        <p className="mt-4 font-display text-2xl text-ink">
          {formatPrice(consultation.price)}
        </p>
        <BookConsultationButton
          consultation={consultation}
          className="mt-4 w-full"
        />
        {showDisclaimer && (
          <p className="mt-3 text-[0.7rem] leading-relaxed text-ink-soft/80">
            Educational, not medical advice.
          </p>
        )}
      </div>
    </article>
  );
}
