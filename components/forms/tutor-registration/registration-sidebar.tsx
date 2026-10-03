"use client";

import Image from "next/image";
import { ListChecks, Mail, MessageSquare, ShieldCheck } from "lucide-react";
import { placementLead, privatePlacementNote as note, tutorLifecycle } from "@/lib/constants/tutor-registration";
import { siteConfig } from "@/lib/constants/site";
import { useT } from "@/lib/i18n/client";
import { cn } from "@/lib/utils/cn";

export function RegistrationSidebar() {
  const t = useT();
  const p = t.deep(placementLead);
  const privatePlacementNote = t.deep(note);
  const phoneDigits = siteConfig.contact.phone.replace(/\D/g, "");

  return (
    <aside aria-label={t("Registration support")} className="space-y-5">
      <section className="rounded-3xl bg-white p-6 ring-1 ring-brand-100/80">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-600">{t("Assigned Placement Lead")}</p>
          <span className="size-2 rounded-full bg-emerald-500">
            <span className="sr-only">{t("Available")}</span>
          </span>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <div className="relative size-14 shrink-0 overflow-hidden rounded-2xl bg-brand-50">
            <Image src={p.image} alt={t("Portrait of {name}", { name: p.name })} fill sizes="56px" className="object-cover" />
          </div>
          <div>
            <p className="text-base font-bold text-ink">{p.name}</p>
            <p className="text-xs text-muted">{p.role}</p>
            <p className="text-[11px] text-muted">{p.detail}</p>
          </div>
        </div>
        <blockquote className="mt-4 rounded-2xl bg-lavender/70 p-4 text-xs italic leading-relaxed text-muted">“{p.quote}”</blockquote>
        <div className="mt-4 space-y-2">
          <a
            href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent("Tutor registration")}`}
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-lavender text-xs font-semibold text-ink ring-1 ring-brand-100 transition-colors hover:bg-brand-100"
          >
            <Mail aria-hidden className="size-4" />
            {t("Direct Email Liaison")}
          </a>
          <a
            href={`https://wa.me/${phoneDigits}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-50 text-xs font-semibold text-violet-brand ring-1 ring-violet-100 transition-colors hover:bg-violet-100"
          >
            <MessageSquare aria-hidden className="size-4" />
            {t("WhatsApp Placement Desk")}
          </a>
        </div>
      </section>

      <section aria-labelledby="tutor-lifecycle" className="rounded-3xl bg-white p-6 ring-1 ring-brand-100/80">
        <h2 id="tutor-lifecycle" className="flex items-center gap-2 text-base font-bold text-ink">
          <ListChecks aria-hidden className="size-5 text-brand-600" />
          {t("The 4-Stage Placement Lifecycle")}
        </h2>
        <ol className="relative mt-5 space-y-4">
          <span aria-hidden className="absolute bottom-2 start-3 top-2 w-px bg-brand-100" />
          {t.deep(tutorLifecycle).map((stage, i) => (
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

      <section className="rounded-3xl bg-linear-to-br from-brand-50 to-violet-100/70 p-6 ring-1 ring-brand-100">
        <span className="grid size-10 place-items-center rounded-xl bg-white text-brand-700 shadow-sm">
          <ShieldCheck aria-hidden className="size-5" />
        </span>
        <h2 className="mt-4 text-base font-bold text-ink">{privatePlacementNote.title}</h2>
        <p className="mt-2 text-xs leading-relaxed text-muted">{privatePlacementNote.body}</p>
      </section>
    </aside>
  );
}
