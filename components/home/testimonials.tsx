import Image from "next/image";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/constants/home";
import { getT } from "@/lib/i18n/server";

export async function Testimonials() {
  const tr = await getT();
  const items = tr.deep(testimonials);
  // The reviews twice over: the track steps one card every 3s and, after a full cycle, the second set is
  // exactly where the first began, so the loop restarts without a visible jump.
  const track = [...items, ...items];

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="font-[family-name:var(--font-inter),var(--font-arabic)]"
    >
      <div className="mx-auto max-w-2xl px-4 text-center">
        <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-600">
          <span aria-hidden className="h-px w-8 bg-brand-500" />
          {tr("Testimonials")}
          <span aria-hidden className="h-px w-8 bg-brand-500" />
        </p>
        <h2
          id="testimonials-heading"
          className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem] sm:leading-tight"
        >
          {tr("What Parents & Students Say")}
        </h2>
      </div>

      {/* Cards drift sideways one after another and re-enter on the other side; hover pauses them. */}
      <div
        dir="ltr"
        className="marquee mx-auto mt-12 box-content max-w-72 overflow-hidden px-0.5 py-4 sm:max-w-80 md:max-w-[660px] lg:max-w-[1000px] motion-reduce:overflow-x-auto"
      >
        <div className="animate-marquee flex w-max">
          <ul className="flex shrink-0 gap-5">
            {track.map((t, i) => (
              <li key={`${t.id}-${i}`} aria-hidden={i >= items.length} className="w-72 shrink-0 sm:w-80">
                  <figure
                    dir={tr.locale === "ar" ? "rtl" : "ltr"}
                    className="group flex h-full flex-col rounded-2xl bg-white p-5 ring-1 ring-brand-200 transition-colors duration-300 hover:bg-[#e6c97c] hover:ring-brand-500"
                  >
                    <div
                      className="flex gap-0.5 text-brand-500 group-hover:text-brand-900"
                      role="img"
                      aria-label={tr("Rated 5 out of 5")}
                    >
                      {Array.from({ length: 5 }).map((_, k) => (
                        <Star key={k} aria-hidden className="size-3.5 fill-current" />
                      ))}
                    </div>
                    <blockquote className="mt-3 flex-1 text-[13px] leading-relaxed text-muted group-hover:text-brand-900/85">
                      {t.quote}
                    </blockquote>
                    <figcaption className="mt-4 flex items-center gap-3 border-t border-brand-200 pt-3 group-hover:border-brand-900/20">
                      <span className="relative size-12 shrink-0 overflow-hidden rounded-full bg-night ring-2 ring-brand-400">
                        {t.photo ? (
                          <Image src={t.photo} alt="" fill sizes="48px" className="object-cover" />
                        ) : (
                          <span className="grid size-full place-items-center text-xs font-bold text-gold">{t.initials}</span>
                        )}
                      </span>
                      <span>
                        <span className="block text-[13px] font-bold text-ink">{t.name}</span>
                        <span className="block text-[11px] text-muted group-hover:text-brand-900/70">{t.context}</span>
                      </span>
                    </figcaption>
                  </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
