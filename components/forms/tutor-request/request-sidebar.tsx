"use client";

import Image from "next/image";
import { BadgeCheck, ChartColumn, MessageSquare, PhoneCall, ShieldCheck, Star } from "lucide-react";
import {
  networkMetrics as metrics,
  placementDirector,
  placementLifecycle,
  requestTestimonial as testimonial,
} from "@/lib/constants/request-page";
import { siteConfig } from "@/lib/constants/site";
import { useT } from "@/lib/i18n/client";
import { cn } from "@/lib/utils/cn";

export function RequestSidebar() {
  const t = useT();
  const d = t.deep(placementDirector);
  const networkMetrics = t.deep(metrics);
  const requestTestimonial = t.deep(testimonial);
  const phoneDigits = siteConfig.contact.phone.replace(/\D/g, "");

  return (
    <aside aria-label={t("Placement support")} className="space-y-5">
      <section className="rounded-3xl bg-white p-6 ring-1 ring-brand-100/80">
        <div className="flex items-center gap-3">
          <div className="relative size-14 shrink-0">
            <div className="relative size-full overflow-hidden rounded-2xl bg-brand-50">
              <Image src={d.image} alt={t("Portrait of {name}", { name: d.name })} fill sizes="56px" className="object-cover" />
            </div>
            <span className="absolute -bottom-1 -end-1 grid size-5 place-items-center rounded-full bg-emerald-500 text-white ring-2 ring-white">
              <BadgeCheck aria-hidden className="size-3" />
              <span className="sr-only">{t("Available now")}</span>
            </span>
          </div>
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-base font-bold text-ink">
              {d.name}
              <BadgeCheck aria-label={t("Verified")} className="size-4 shrink-0 text-brand-500" />
            </p>
            <p className="text-xs font-medium text-brand-600">{d.role}</p>
            <p className="text-[11px] text-muted">{d.credentials}</p>
          </div>
        </div>
        <blockquote className="mt-4 rounded-2xl bg-lavender/70 p-4 text-xs italic leading-relaxed text-muted">“{d.quote}”</blockquote>
        <div className="mt-4 space-y-2">
          <a
            href={`https://wa.me/${phoneDigits}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-50 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100 transition-colors hover:bg-emerald-100"
          >
            <MessageSquare aria-hidden className="size-4" />
            {t("WhatsApp Academic Desk")}
          </a>
          <a
            href={`tel:+${phoneDigits}`}
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-lavender text-xs font-semibold text-ink ring-1 ring-brand-100 transition-colors hover:bg-brand-100"
          >
            <PhoneCall aria-hidden className="size-4" />
            {t("Call Advisory Desk")} (<span dir="ltr">{siteConfig.contact.phone}</span>)
          </a>
        </div>
      </section>

      <section aria-labelledby="lifecycle-heading" className="rounded-3xl bg-white p-6 ring-1 ring-brand-100/80">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-600">{t("How Concierge Works")}</p>
          <span className="rounded-full bg-brand-100/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-700">
            {t("Zero Spam")}
          </span>
        </div>
        <h2 id="lifecycle-heading" className="mt-3 text-sm font-bold text-ink">
          {t("The 4-Stage Placement Lifecycle")}
        </h2>
        <ol className="relative mt-4 space-y-4">
          <span aria-hidden className="absolute bottom-2 start-3 top-2 w-px bg-brand-100" />
          {t.deep(placementLifecycle).map((stage, i) => (
            <li key={stage.title} className="relative flex gap-3">
              <span
                className={cn(
                  "relative grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-bold",
                  i === 0 ? "bg-brand-700 text-white" : "bg-brand-50 text-brand-700 ring-2 ring-white",
                )}
              >
                {i + 1}
              </span>
              <div>
                <p className="text-xs font-semibold text-ink">{stage.title}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-muted">{stage.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="metrics-heading" className="rounded-3xl bg-white p-6 ring-1 ring-brand-100/80">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-violet-100 text-violet-brand">
            <ChartColumn aria-hidden className="size-4" />
          </span>
          <div>
            <h2 id="metrics-heading" className="text-sm font-bold text-ink">
              {networkMetrics.title}
            </h2>
            <p className="text-[11px] text-muted">{networkMetrics.subtitle}</p>
          </div>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-3">
          {networkMetrics.stats.map((s, i) => (
            <div key={s.label} className="flex flex-col-reverse rounded-2xl bg-lavender/70 p-4 text-center">
              <dt className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted">{s.label}</dt>
              <dd className={cn("text-2xl font-extrabold leading-tight", i === 0 ? "text-brand-700" : "text-violet-brand")}>
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-3 flex gap-3 rounded-2xl bg-brand-50 p-4 ring-1 ring-brand-100">
          <ShieldCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-600" />
          <div>
            <p className="text-xs font-semibold text-ink">{networkMetrics.guarantee.title}</p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-muted">{networkMetrics.guarantee.body}</p>
          </div>
        </div>
      </section>

      <figure className="rounded-3xl bg-linear-to-br from-brand-700 to-brand-600 p-6 text-white shadow-[0_24px_50px_-24px_rgba(67,49,190,0.8)]">
        <div className="flex gap-0.5 text-amber-300" role="img" aria-label={t("Rated 5 out of 5")}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} aria-hidden className="size-3.5 fill-current" />
          ))}
        </div>
        <blockquote className="mt-3 text-xs italic leading-relaxed text-white/90">“{requestTestimonial.quote}”</blockquote>
        <figcaption className="mt-4 flex items-center justify-between gap-3 text-[11px]">
          <span className="font-semibold">{requestTestimonial.name}</span>
          <span className="text-white/75">{requestTestimonial.context}</span>
        </figcaption>
      </figure>
    </aside>
  );
}
