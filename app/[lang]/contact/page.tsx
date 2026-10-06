import type { Metadata } from "next";
import { Link } from "@/components/ui/link";
import {
  ArrowRight,
  Clock3,
  ExternalLink,
  Mail,
  MapPin,
  Accessibility,
} from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { AccentTitle } from "@/components/ui/accent-title";
import { Reveal } from "@/components/ui/reveal";
import {
  contactCardNotes,
  contactHero as hero,
  mapCard as map,
  pathways,
  pathwaysIntro as intro,
} from "@/lib/constants/contact-page";
import { siteConfig } from "@/lib/constants/site";
import { getT } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return {
    title: t("Contact Us"),
    description: t(
      "Questions about finding a tutor or joining as one? Message our academic advisory team, or reach us by email or phone.",
    ),
  };
}

// The maps link always searches the English address.
const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.contact.address)}`;
// Keyless embedded map of the same address.
const embedHref = `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.contact.address)}&output=embed`;


export default async function ContactPage() {
  const t = await getT();
  const { contact, sessionTimings } = t.deep(siteConfig);
  const notes = t.deep(contactCardNotes);
  const contactHero = t.deep(hero);
  const mapCard = t.deep(map);
  const pathwaysIntro = t.deep(intro);
  const weekdayHours = sessionTimings[0];
  const contactCards = [
    { label: t("Email Inquiries"), value: contact.email, href: `mailto:${contact.email}`, note: notes.email, icon: Mail },
    { label: t("Headquarters"), value: contact.centerName, note: contact.address, icon: MapPin },
    {
      label: t("Advisory Hours"),
      value: weekdayHours.days,
      note: `${weekdayHours.hours} • ${notes.hours}`,
      icon: Clock3,
    },
  ];

  return (
    <div className="space-y-14 pb-16">
      <section className="relative overflow-x-clip">
        <div
          aria-hidden
          className="pointer-events-none absolute -end-40 top-40 size-[560px] rounded-full bg-brand-200/30 blur-3xl"
        />
        {/* Mobile order: intro → form → contact details. Desktop: intro and details on the left, form on the right. */}
        <div className="relative mx-auto grid max-w-[90rem] gap-10 px-4 pt-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-0 lg:px-10 lg:pt-12">
          <div className="lg:col-start-1 lg:row-start-1 font-[family-name:var(--font-inter),var(--font-arabic)]">
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
            <span aria-hidden className="h-px w-8 shrink-0 bg-brand-500" />
            {contactHero.eyebrow}
          </p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
              {contactHero.titleLead}{" "}
              <span className="text-brand-600">
                {contactHero.titleAccent}
              </span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted">{contactHero.description}</p>
          </div>

          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 [&>div]:h-full">
            <ContactForm />
          </div>

          <div className="flex flex-col lg:col-start-1 lg:row-start-2 lg:pt-8">
            <ul className="grid gap-3 sm:grid-cols-2">
              {contactCards.map((c) => (
                <li
                  key={c.label}
                  className="group flex flex-col rounded-2xl bg-white p-5 ring-1 ring-brand-200 transition-colors duration-300 hover:bg-[#e6c97c] hover:ring-brand-500 sm:last:odd:col-span-2"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-600 transition-colors group-hover:text-brand-900">
                    {c.label}
                  </p>
                  {c.href ? (
                    <a href={c.href} className="-my-1.5 mt-1.5 block py-1.5 text-sm font-bold text-ink [overflow-wrap:anywhere] hover:text-brand-700">
                      {c.value}
                    </a>
                  ) : (
                    <p className="mt-1.5 text-sm font-bold text-ink">{c.value}</p>
                  )}
                  <p className="mt-2 text-xs leading-relaxed text-muted transition-colors group-hover:text-brand-900/80">{c.note}</p>
                </li>
              ))}
            </ul>

            <div className="mt-3 flex flex-1 flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-brand-200">
              <div className="relative min-h-72 flex-1 bg-brand-50">
                <iframe
                  title={t("Map showing {name}", { name: contact.centerName })}
                  src={embedHref}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 size-full border-0"
                />
                <span className="pointer-events-none absolute start-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[10px] font-medium text-ink shadow-sm">
                  <span aria-hidden className="size-1.5 rounded-full bg-brand-500" />
                  {contact.centerName} • {mapCard.label}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-brand-200 px-4 py-3 text-xs">
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
                  {t("Open in Maps")}
                  <ExternalLink aria-hidden className="size-3" />
                  <span className="sr-only"> {t("(opens in a new tab)")}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="pathways-heading"
        className="mx-auto max-w-[90rem] px-4 font-[family-name:var(--font-inter),var(--font-arabic)] sm:px-8 lg:px-10"
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
            <span aria-hidden className="h-px w-8 shrink-0 bg-brand-500" />
            {pathwaysIntro.eyebrow}
            <span aria-hidden className="h-px w-8 shrink-0 bg-brand-500" />
          </p>
          <h2 id="pathways-heading" className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem] sm:leading-tight">
            <AccentTitle text={pathwaysIntro.title} />
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{pathwaysIntro.description}</p>
        </div>
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {t.deep(pathways).map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * 0.07} className="h-full">
                <article className="group flex h-full flex-col rounded-3xl bg-white p-7 ring-1 ring-brand-200 transition-all duration-300 hover:-translate-y-1 hover:bg-[#e6c97c] hover:shadow-[0_24px_50px_-24px_rgba(143,106,29,0.6)] hover:ring-brand-500">
                  <span aria-hidden className="text-4xl font-bold text-brand-500 transition-colors group-hover:text-brand-900">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted transition-colors group-hover:text-brand-900/85">
                    {p.body}
                  </p>
                  <Link
                    href={p.href}
                    className="mt-6 inline-flex items-center gap-1.5 border-t border-brand-200 pt-4 text-sm font-semibold text-brand-700 transition-colors group-hover:border-brand-900/20 group-hover:text-brand-900"
                  >
                    {p.cta}
                    <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
                  </Link>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
