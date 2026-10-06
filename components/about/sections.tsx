import Image from "next/image";
import {
  House,
  Monitor,
  Quote,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { AccentTitle } from "@/components/ui/accent-title";
import { Reveal } from "@/components/ui/reveal";
import {
  aboutCta,
  aboutHero,
  aboutImages,
  differentiators,
  excellenceBand,
  learningJourney,
  methodology,
  regions,
  vision,
  whoWeAre,
} from "@/lib/constants/about";
import { requestHref, siteConfig } from "@/lib/constants/site";
import { getT } from "@/lib/i18n/server";
import { cn } from "@/lib/utils/cn";

const CONTACT_HREF = "/contact";

function Pill({ children, center = true }: { children: React.ReactNode; center?: boolean }) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600",
        center && "justify-center",
      )}
    >
      <span aria-hidden className="h-px w-8 shrink-0 bg-brand-500" />
      {children}
      {center && <span aria-hidden className="h-px w-8 shrink-0 bg-brand-500" />}
    </p>
  );
}

function CenteredHeading({ id, eyebrow, title, description }: { id: string; eyebrow: string; title: string; description: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Pill>{eyebrow}</Pill>
      <h2 id={id} className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem] sm:leading-tight">
        <AccentTitle text={title} />
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{description}</p>
    </div>
  );
}

export async function AboutHero() {
  const t = await getT();
  const h = t.deep(aboutHero);
  const body = t(aboutHero.body);
  return (
    <section className="relative overflow-x-clip font-[family-name:var(--font-inter),var(--font-arabic)]">
      <div
        aria-hidden
        className="pointer-events-none absolute -end-40 -top-40 -z-10 size-[560px] rounded-full bg-brand-200/40 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-[90rem] items-center gap-12 px-4 pt-10 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:px-6 lg:pt-16">
        <Reveal>
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
            <span aria-hidden className="h-px w-8 shrink-0 bg-brand-500" />
            {h.eyebrow} {siteConfig.name}
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            {t("Welcome to")} <span className="text-brand-600">{siteConfig.name}.</span>
          </h1>
          <p className="mt-5 text-xl font-semibold leading-snug text-ink sm:text-2xl">
            {h.subtitle.lead} <span className="text-brand-600">{h.subtitle.highlight}</span> {h.subtitle.tail}
          </p>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            {t("At {name}, {body}", {
              name: siteConfig.name,
              body: t.locale === "en" ? body.charAt(0).toLowerCase() + body.slice(1) : body,
            })}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href={requestHref} size="lg" arrow>
              {t("I Need a Tutor")}
            </ButtonLink>
            <ButtonLink href="/how-it-works" variant="soft" size="lg" className="bg-night text-gold hover:bg-brand-800">
              {t("How It Works")}
            </ButtonLink>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {h.stats.map((s) => (
              <div
                key={s.label}
                className="group flex flex-col rounded-2xl bg-white px-4 py-4 ring-1 ring-brand-200 transition-colors duration-300 hover:bg-[#e6c97c] hover:ring-brand-500"
              >
                <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-600 transition-colors group-hover:text-brand-900">
                  {s.label}
                </dt>
                <dd className="mt-1.5 text-base font-bold text-ink">{s.value}</dd>
                <dd className="text-[11px] text-muted transition-colors group-hover:text-brand-900/80">{s.note}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.1} className="relative">
          {/* offset gold frame behind the photo */}
          <span
            aria-hidden
            className="absolute -bottom-4 -end-4 size-full rounded-3xl border-2 border-brand-400 sm:-bottom-5 sm:-end-5"
          />
          <div className="relative aspect-[4/3.4] overflow-hidden rounded-3xl shadow-[0_30px_60px_-30px_rgba(20,23,29,0.5)]">
            <Image
              src={aboutImages.hero}
              alt={t("A tutor guiding a student through a one-to-one lesson")}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export async function WhoWeAre() {
  const t = await getT();
  const w = t.deep(whoWeAre);
  return (
    <section
      aria-labelledby="who-heading"
      className="bg-brand-50/70 py-10 font-[family-name:var(--font-inter),var(--font-arabic)] lg:py-14"
    >
      <div className="mx-auto grid max-w-[90rem] items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-6">
        <Reveal className="relative">
          {/* offset gold frame behind the photo */}
          <span
            aria-hidden
            className="absolute -bottom-4 -start-4 size-full rounded-3xl border-2 border-brand-400 sm:-bottom-5 sm:-start-5"
          />
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_30px_60px_-30px_rgba(20,23,29,0.5)]">
            <Image
              src={aboutImages.whoWeAre}
              alt={t("Students collaborating around a table during a tutoring session")}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
            <span aria-hidden className="h-px w-8 shrink-0 bg-brand-500" />
            {w.eyebrow}
          </p>
          <h2 id="who-heading" className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem] sm:leading-tight">
            <AccentTitle text={w.title} />
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">{w.body}</p>
          <div className="group mt-8 flex flex-col gap-4 rounded-3xl bg-white p-6 ring-1 ring-brand-200 transition-colors duration-300 hover:bg-[#e6c97c] hover:ring-brand-500 sm:flex-row sm:items-center">
            <p className="text-5xl font-bold tracking-tight text-brand-500 transition-colors group-hover:text-brand-900">
              {w.legacy.value}
            </p>
            <div className="min-w-0 flex-1">
              <p className="text-base font-bold text-ink">{w.legacy.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted transition-colors group-hover:text-brand-900/80">
                {w.legacy.body}
              </p>
            </div>
            <ButtonLink href={CONTACT_HREF} size="md" variant="soft" className="shrink-0 bg-night text-gold hover:bg-brand-800">
              {w.legacy.cta}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const FONT = "font-[family-name:var(--font-inter),var(--font-arabic)]";
const CARD =
  "group flex h-full flex-col rounded-3xl bg-white ring-1 ring-brand-200 transition-all duration-300 hover:-translate-y-1 hover:bg-[#e6c97c] hover:shadow-[0_24px_50px_-24px_rgba(143,106,29,0.6)] hover:ring-brand-500";
const BODY = "text-sm leading-relaxed text-muted transition-colors group-hover:text-brand-900/85";

export async function Differentiators() {
  const t = await getT();
  const d = t.deep(differentiators);
  return (
    <section aria-labelledby="different-heading" className={cn("mx-auto max-w-[90rem] px-4 sm:px-8 lg:px-10", FONT)}>
      <CenteredHeading id="different-heading" eyebrow={d.eyebrow} title={d.title} description={d.description} />
      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {d.items.map((item, i) => (
          <li key={item.title}>
            <Reveal delay={(i % 2) * 0.07} className="h-full">
              <article className={cn(CARD, "p-7 sm:p-8")}>
                <span aria-hidden className="text-5xl font-bold text-brand-500 transition-colors group-hover:text-brand-900">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-xl font-bold text-ink">{item.title}</h3>
                <p className={cn("mt-3 flex-1", BODY)}>{item.body}</p>
                {"tags" in item && item.tags && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-white px-3 py-1 text-[11px] font-medium text-ink ring-1 ring-brand-300 transition-colors group-hover:bg-white/60 group-hover:ring-brand-900/20"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
                {"footer" in item && item.footer && (
                  <div className="mt-5 flex items-center gap-3 border-t border-brand-200 pt-4 transition-colors group-hover:border-brand-900/20">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-ink">{item.footer.label}</p>
                      {"note" in item.footer && (
                        <p className="mt-0.5 text-xs text-muted transition-colors group-hover:text-brand-900/80">
                          {item.footer.note}
                        </p>
                      )}
                    </div>
                    {"tag" in item.footer && (
                      <span className="shrink-0 rounded-full bg-night px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-gold">
                        {item.footer.tag}
                      </span>
                    )}
                  </div>
                )}
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

export async function ExcellenceBand() {
  const t = await getT();
  const e = t.deep(excellenceBand);
  return (
    <section
      aria-labelledby="excellence-heading"
      className={cn("relative overflow-hidden bg-linear-to-br from-night via-brand-800 to-brand-900 py-10 lg:py-14", FONT)}
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-brand-400 via-gold to-brand-500" />
      <div className="relative mx-auto grid max-w-[90rem] items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:gap-16 lg:px-6">
        <Reveal>
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
            <span aria-hidden className="h-px w-8 shrink-0 bg-gold" />
            {e.eyebrow}
          </p>
          <h2 id="excellence-heading" className="mt-5 flex items-end gap-4 text-white">
            <span className="text-7xl font-bold leading-none tracking-tight text-gold sm:text-8xl">{e.value}</span>
            <span className="pb-2 text-2xl font-bold leading-tight sm:text-3xl">
              {e.title[0]}
              <br />
              <span className="text-gold">{e.title[1]}</span>
            </span>
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/75">{e.body}</p>
        </Reveal>
        <ul className="space-y-4">
          {e.points.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * 0.07}>
                <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/15 transition-colors duration-300 hover:ring-gold/60">
                  <h3 className="text-base font-bold text-gold">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/75">{p.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export async function Methodology() {
  const t = await getT();
  const m = t.deep(methodology);
  return (
    <section aria-labelledby="method-heading" className={cn("mx-auto max-w-[90rem] px-4 sm:px-8 lg:px-10", FONT)}>
      <CenteredHeading id="method-heading" eyebrow={m.eyebrow} title={m.title} description={m.description} />
      <div className="relative mt-14">
        <span
          aria-hidden
          className="absolute inset-x-[8%] top-7 hidden h-px bg-linear-to-r from-transparent via-brand-400 to-transparent lg:block"
        />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {m.pillars.map((p, i) => (
            <li key={p.title} className={cn(i === m.pillars.length - 1 && "sm:col-span-2 lg:col-span-1")}>
              <Reveal delay={i * 0.05} className="h-full">
                <article className={cn(CARD, "items-center px-5 pb-6 pt-5 text-center")}>
                  <span className="relative z-10 grid size-14 place-items-center rounded-full bg-linear-to-b from-[#ecd28c] to-[#c9a24e] text-base font-bold text-brand-900 ring-4 ring-background">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600 transition-colors group-hover:text-brand-900">
                    {t("Pillar {n}", { n: String(i + 1).padStart(2, "0") })}
                  </p>
                  <h3 className="mt-1.5 text-base font-bold text-ink">{p.title}</h3>
                  <p className={cn("mt-2", BODY)}>{p.body}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export async function Vision() {
  const t = await getT();
  const v = t.deep(vision);
  return (
    <section aria-label={v.eyebrow} className={cn("mx-auto max-w-[90rem] px-4 sm:px-8 lg:px-10", FONT)}>
      <Reveal className="mx-auto max-w-4xl rounded-3xl bg-brand-50 px-6 py-14 text-center ring-1 ring-brand-300 sm:px-12">
        <Pill>{v.eyebrow}</Pill>
        <Quote aria-hidden className="mx-auto mt-6 size-9 text-brand-400" />
        <figure>
          <blockquote className="mt-4 font-serif text-2xl leading-snug text-ink sm:text-[2rem]">
            {v.quote.lead} <span className="text-brand-600">{v.quote.highlight}</span> {v.quote.tail}
          </blockquote>
          <span aria-hidden className="mx-auto mt-8 block h-1 w-12 rounded-full bg-brand-500" />
          <figcaption className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">
            {siteConfig.name} {v.caption}
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}

/** Pins placed over the stylised map, in % of its box. */
const mapPins = [
  { label: "Sharjah", x: 66, y: 30, online: true },
  { label: "Dubai", x: 57, y: 44, online: false },
  { label: "Abu Dhabi", x: 33, y: 66, online: false },
];

export async function Regions() {
  const t = await getT();
  const r = t.deep(regions);
  return (
    <section
      aria-labelledby="regions-heading"
      className={cn("bg-brand-50/70 py-10 lg:py-14", FONT)}
    >
      <div className="mx-auto grid max-w-[90rem] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-6">
        <Reveal>
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
            <span aria-hidden className="h-px w-8 shrink-0 bg-brand-500" />
            {r.eyebrow}
          </p>
          <h2 id="regions-heading" className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem] sm:leading-tight">
            <AccentTitle text={r.title} />
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{r.body}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {r.areas.map((a, i) => (
              <li
                key={a.name}
                className={cn(
                  "group rounded-2xl bg-white p-5 ring-1 ring-brand-200 transition-colors duration-300 hover:bg-[#e6c97c] hover:ring-brand-500",
                  i === r.areas.length - 1 && "sm:col-span-2",
                )}
              >
                <p className="text-base font-bold text-ink">{a.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted transition-colors group-hover:text-brand-900/80">
                  {a.body}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="rounded-3xl bg-white p-5 ring-1 ring-brand-200">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-bold text-ink">{r.map.title}</p>
              <span className="rounded-full bg-night px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-gold">
                {r.map.tag}
              </span>
            </div>
            <div
              role="img"
              aria-label={t("Map of the UAE showing in-home coverage in Dubai and Abu Dhabi and online coverage in Sharjah")}
              className="relative mt-4 aspect-square overflow-hidden rounded-2xl bg-white ring-1 ring-brand-200 sm:aspect-[4/3]"
            >
              <Image src="/images/uae-map.png" alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-contain" />
              {mapPins.map((p) => (
                <span
                  key={p.label}
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  <span
                    className={cn(
                      "grid size-6 place-items-center rounded-full shadow-md ring-4 ring-brand-200/70",
                      p.online ? "bg-brand-500 text-brand-900" : "bg-night text-gold",
                    )}
                  >
                    {p.online ? <Monitor aria-hidden className="size-3" /> : <House aria-hidden className="size-3" />}
                  </span>
                  <span className="mt-1 rounded-md bg-white px-1.5 py-0.5 text-[10px] font-semibold text-ink shadow-sm">{t(p.label)}</span>
                </span>
              ))}
            </div>
            <ul className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
              <li className="flex items-center gap-2">
                <span aria-hidden className="size-2.5 rounded-full bg-night" />
                {r.map.legend[0]}
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden className="size-2.5 rounded-full bg-brand-500" />
                {r.map.legend[1]}
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export async function LearningJourney() {
  const t = await getT();
  const j = t.deep(learningJourney);
  return (
    <section aria-labelledby="journey-heading" className={cn("mx-auto max-w-[90rem] px-4 sm:px-8 lg:px-10", FONT)}>
      <CenteredHeading id="journey-heading" eyebrow={j.eyebrow} title={j.title} description={j.description} />
      <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {j.steps.map((s, i) => (
          <li key={s.title}>
            <Reveal delay={i * 0.06} className="h-full">
              <article className={cn(CARD, "p-7")}>
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600 transition-colors group-hover:text-brand-900">
                    {t("Step {n}", { n: String(i + 1).padStart(2, "0") })}
                  </p>
                  <span aria-hidden className="text-3xl font-bold text-brand-500 transition-colors group-hover:text-brand-900">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink">{s.title}</h3>
                <p className={cn("mt-2 flex-1", BODY)}>{s.body}</p>
                <span aria-hidden className="mt-6 h-1 w-10 rounded-full bg-brand-500 transition-colors group-hover:bg-brand-900" />
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

export async function AboutCta() {
  const t = await getT();
  const c = t.deep(aboutCta);
  return (
    <section aria-labelledby="about-cta-heading" className={cn("mx-auto max-w-[90rem] px-4 sm:px-8 lg:px-10", FONT)}>
      <Reveal className="rounded-3xl bg-brand-100 px-6 py-10 text-center ring-1 ring-brand-300 sm:px-12">
        <div className="mx-auto max-w-3xl">
          <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
            <span aria-hidden className="h-px w-8 shrink-0 bg-brand-500" />
            {c.eyebrow}
            <span aria-hidden className="h-px w-8 shrink-0 bg-brand-500" />
          </p>
          <h2 id="about-cta-heading" className="mt-5 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-[2.5rem]">
            <AccentTitle text={t("Let {name} {title}", { name: siteConfig.name, title: c.title })} />
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{c.body}</p>
          <ul className="mt-6 flex flex-wrap justify-center gap-3">
            {c.badges.map((b) => (
              <li key={b} className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink ring-1 ring-brand-300">
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href={requestHref} size="lg" arrow>
              {t("I Need a Tutor")}
            </ButtonLink>
            <ButtonLink href={CONTACT_HREF} variant="soft" size="lg" className="bg-night text-gold hover:bg-brand-800">
              {t("Contact Us")}
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
