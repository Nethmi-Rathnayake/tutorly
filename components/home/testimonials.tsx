import { Star } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { reviewsSummary, testimonials } from "@/lib/constants/home";
import { getT } from "@/lib/i18n/server";

export async function Testimonials() {
  const tr = await getT();
  return (
    <section aria-labelledby="testimonials-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        id="testimonials-heading"
        eyebrow={tr("Testimonials")}
        title={tr("What Parents & Students Say")}
        action={{ label: tr(reviewsSummary), href: "/reviews" }}
      />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {tr.deep(testimonials).map((t, i) => (
          <Reveal key={t.id} delay={i * 0.08}>
            <figure className="flex h-full flex-col rounded-3xl bg-white p-7 ring-1 ring-brand-100/80 transition-shadow duration-300 hover:shadow-[0_28px_60px_-30px_rgba(79,63,217,0.45)]">
              <div className="flex gap-0.5 text-amber-400" role="img" aria-label={tr("Rated 5 out of 5")}>
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} aria-hidden className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 text-sm italic leading-relaxed text-muted">“{t.quote}”</blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-brand-50 text-xs font-bold text-brand-700">
                  {t.initials}
                </span>
                <span>
                  <span className="block text-sm font-bold text-ink">{t.name}</span>
                  <span className="block text-xs text-muted">{t.context}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
