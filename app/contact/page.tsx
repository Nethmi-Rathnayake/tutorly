import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Clock3,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  ScanSearch,
  Award,
  Accessibility,
} from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/ui/reveal";
import { contactCardNotes, contactHero, liaison, mapCard, pathways, pathwaysIntro } from "@/lib/constants/contact-page";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Questions about finding a tutor or joining as one? Message our academic advisory team, or reach us by email or phone.",
};

const { contact } = siteConfig;
const telHref = `tel:${contact.phone.replace(/[^\d+]/g, "")}`;
const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`;
const weekdayHours = siteConfig.sessionTimings[0];

const contactCards = [
  { label: "Email Inquiries", value: contact.email, href: `mailto:${contact.email}`, note: contactCardNotes.email, icon: Mail },
  { label: "Direct Advisory Line", value: contact.phone, href: telHref, note: contactCardNotes.phone, icon: Phone },
  { label: "Headquarters", value: contact.centerName, note: contact.address, icon: MapPin },
  {
    label: "Advisory Hours",
    value: weekdayHours.days,
    note: `${weekdayHours.hours} • ${contactCardNotes.hours}`,
    icon: Clock3,
  },
];

const pathwayIcons = [ScanSearch, Award, BookOpenCheck];

export default function ContactPage() {
  return (
    <div className="space-y-24 pb-24">
      <section className="relative overflow-x-clip">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-40 size-[560px] rounded-full bg-violet-200/30 blur-3xl"
        />
        {/* Mobile order: intro → form → contact details. Desktop: intro and details on the left, form on the right. */}
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pt-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-0 lg:px-8 lg:pt-16">
          <div className="lg:col-start-1 lg:row-start-1">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-100/70 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-700">
              <span aria-hidden className="size-1.5 rounded-full bg-brand-600" />
              {contactHero.eyebrow}
            </span>
            <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-ink sm:text-6xl">
              {contactHero.titleLead}{" "}
              <span className="bg-linear-to-r from-brand-700 to-violet-brand bg-clip-text text-transparent">
                {contactHero.titleAccent}
              </span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted">{contactHero.description}</p>
          </div>

          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:pt-2">
            <ContactForm />
          </div>

          <div className="lg:col-start-1 lg:row-start-2 lg:pt-8">
            <ul className="grid gap-3 sm:grid-cols-2">
              {contactCards.map((c) => {
                const Icon = c.icon;
                return (
                  <li key={c.label} className="flex flex-col rounded-2xl bg-white p-4 ring-1 ring-brand-100/80">
                    <div className="flex items-start gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-100/80 text-brand-700">
                        <Icon aria-hidden className="size-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">{c.label}</p>
                        {c.href ? (
                          <a
                            href={c.href}
                            className="mt-0.5 block text-[13px] font-semibold text-ink [overflow-wrap:anywhere] hover:text-brand-700"
                          >
                            {c.value}
                          </a>
                        ) : (
                          <p className="mt-0.5 text-[13px] font-semibold text-ink">{c.value}</p>
                        )}
                      </div>
                    </div>
                    <p className="mt-3 text-[11px] leading-relaxed text-muted">{c.note}</p>
                  </li>
                );
              })}
            </ul>

            <div className="mt-3 overflow-hidden rounded-2xl bg-white ring-1 ring-brand-100/80">
              <div className="relative h-40 bg-lavender">
                {/* Decorative map; the real location opens in the user's maps app. */}
                <svg aria-hidden viewBox="0 0 400 160" preserveAspectRatio="none" className="absolute inset-0 size-full">
                  <g fill="none" stroke="var(--color-brand-200)" strokeWidth="1">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="160" />
                    ))}
                    {Array.from({ length: 4 }).map((_, i) => (
                      <line key={`h${i}`} x1="0" y1={i * 50 + 5} x2="400" y2={i * 50 + 5} />
                    ))}
                  </g>
                  <path d="M0 40 C120 20 260 30 400 8" fill="none" stroke="var(--color-brand-300)" strokeWidth="3" opacity="0.7" />
                  <path d="M110 0 C150 60 170 110 230 160" fill="none" stroke="var(--color-brand-300)" strokeWidth="2.5" opacity="0.6" />
                  <path d="M0 130 C140 120 300 150 400 110" fill="none" stroke="var(--color-brand-200)" strokeWidth="6" opacity="0.8" />
                </svg>
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[10px] font-medium text-ink shadow-sm">
                  <span aria-hidden className="size-1.5 rounded-full bg-brand-600" />
                  {contact.centerName} • {mapCard.label}
                </span>
                <span
                  aria-hidden
                  className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand-600 text-white shadow-[0_0_0_8px_rgba(100,87,230,0.18)]"
                >
                  <MapPin className="size-5" />
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 px-4 py-3 text-[11px]">
                <span className="flex items-center gap-1.5 text-muted">
                  <Accessibility aria-hidden className="size-3.5" />
                  {mapCard.transit}
                </span>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-brand-700 hover:text-brand-900"
                >
                  Open in Maps
                  <ExternalLink aria-hidden className="size-3" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between gap-4 rounded-2xl bg-lavender px-4 py-3.5 ring-1 ring-brand-100">
              <div className="flex items-center gap-3">
                <span className="relative grid size-11 shrink-0 place-items-center rounded-full bg-linear-to-br from-brand-700 to-violet-brand text-sm font-bold text-white">
                  {liaison.initials}
                  <span aria-hidden className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full bg-emerald-500 ring-2 ring-lavender" />
                </span>
                <div>
                  <p className="flex items-center gap-1 text-sm font-semibold text-ink">
                    {liaison.title}
                    <BadgeCheck aria-hidden className="size-3.5 text-brand-600" />
                  </p>
                  <p className="text-[11px] text-muted">{liaison.status}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">{liaison.responseLabel}</p>
                <p className="text-sm font-bold text-brand-700">{liaison.responseValue}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="pathways-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-600">{pathwaysIntro.eyebrow}</p>
            <h2 id="pathways-heading" className="mt-2 text-2xl font-bold tracking-tight text-ink">
              {pathwaysIntro.title}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">{pathwaysIntro.description}</p>
        </div>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {pathways.map((p, i) => {
            const Icon = pathwayIcons[i];
            return (
              <li key={p.title}>
                <Reveal delay={i * 0.07} className="h-full">
                  <article className="group flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-brand-100/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-32px_rgba(79,63,217,0.5)]">
                    <span className="grid size-11 place-items-center rounded-xl bg-brand-100/80 text-brand-700">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <h3 className="mt-5 text-base font-bold text-ink">{p.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.body}</p>
                    <Link
                      href={p.href}
                      className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:text-brand-900"
                    >
                      {p.cta}
                      <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
