import Image from "next/image";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Brain,
  Building,
  CircleCheck,
  ClipboardList,
  Compass,
  GraduationCap,
  Handshake,
  House,
  Landmark,
  Layers,
  Lightbulb,
  MapPin,
  MessageSquareText,
  Monitor,
  Quote,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  UserSearch,
  UsersRound,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Link } from "@/components/ui/link";
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

function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-brand-100/70 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-700",
        className,
      )}
    >
      {children}
    </span>
  );
}

function CenteredHeading({ id, eyebrow, title, description }: { id: string; eyebrow: string; title: string; description: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Pill>{eyebrow}</Pill>
      <h2 id={id} className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem] sm:leading-tight">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{description}</p>
    </div>
  );
}

export async function AboutHero() {
  const t = await getT();
  const h = t.deep(aboutHero);
  const body = t(aboutHero.body);
  return (
    <section className="relative overflow-x-clip">
      <div
        aria-hidden
        className="pointer-events-none absolute -end-40 -top-40 size-[640px] rounded-full bg-brand-200/40 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pt-10 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-8 lg:pt-16">
        <Reveal>
          <Pill>
            <span aria-hidden className="size-1.5 rounded-full bg-brand-600" />
            {h.eyebrow} {siteConfig.name}
          </Pill>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl">
            {t("Welcome to")}{" "}
            <span className="bg-linear-to-r from-brand-700 to-violet-brand bg-clip-text text-transparent">
              {siteConfig.name}.
            </span>
          </h1>
          <p className="mt-4 text-xl font-bold leading-snug text-ink sm:text-2xl">
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
            <ButtonLink href="/how-it-works" variant="ghost" size="lg">
              <Compass aria-hidden className="size-4 text-brand-600" />
              {t("How It Works")}
            </ButtonLink>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {h.stats.map((s) => (
              <div key={s.label} className="flex flex-col rounded-2xl bg-white px-4 py-3 ring-1 ring-brand-100/80">
                <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">{s.label}</dt>
                <dd className="mt-1 text-sm font-bold text-ink">{s.value}</dd>
                <dd className="text-[11px] text-muted">{s.note}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.1} className="relative">
          <div className="relative aspect-[4/3.4] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgba(44,37,115,0.6)] ring-1 ring-brand-100">
            <Image
              src={aboutImages.hero}
              alt={t("A tutor guiding a student through a one-to-one lesson")}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="animate-float absolute end-4 top-4 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-lg ring-1 ring-brand-100 backdrop-blur sm:-end-4 sm:top-6">
            <span className="grid size-9 place-items-center rounded-xl bg-brand-100 text-brand-700">
              <Award aria-hidden className="size-4" />
            </span>
            <span>
              <span className="block text-base font-extrabold leading-tight text-ink">{h.badge.value}</span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">{h.badge.label}</span>
            </span>
          </div>
          <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl bg-white/95 p-3.5 shadow-lg ring-1 ring-brand-100 backdrop-blur sm:inset-x-6 sm:bottom-6">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-violet-100 text-violet-brand">
              <ShieldCheck aria-hidden className="size-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-bold text-ink">{h.protocol.title}</span>
              <span className="block text-[11px] text-muted">{h.protocol.body}</span>
            </span>
            <Link
              href={requestHref}
              aria-label={t("Start a tutor request")}
              className="grid size-9 shrink-0 place-items-center rounded-full bg-linear-to-r from-brand-700 to-brand-600 text-white transition-transform hover:translate-x-0.5 rtl:hover:-translate-x-0.5"
            >
              <ArrowRight aria-hidden className="rtl:-scale-x-100 size-4" />
            </Link>
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
    <section aria-labelledby="who-heading" className="bg-lavender/60 py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal className="relative pb-10">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] ring-1 ring-brand-100">
            <Image
              src={aboutImages.whoWeAre}
              alt={t("Students collaborating around a table during a tutoring session")}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 start-4 max-w-xs rounded-2xl bg-white p-4 shadow-[0_20px_40px_-20px_rgba(44,37,115,0.5)] ring-1 ring-brand-100 sm:start-10">
            <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-600">
              <Lightbulb aria-hidden className="size-3.5" />
              {w.imageCard.kicker}
            </p>
            <p className="mt-1.5 text-sm font-bold text-ink">{w.imageCard.title}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-muted">{w.imageCard.body}</p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <Pill>{w.eyebrow}</Pill>
          <h2 id="who-heading" className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem] sm:leading-tight">
            {w.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{w.body}</p>
          <div className="mt-8 flex flex-col gap-4 rounded-3xl bg-white p-5 ring-1 ring-brand-100/80 sm:flex-row sm:items-center">
            <p className="text-4xl font-extrabold tracking-tight text-brand-700">{w.legacy.value}</p>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-ink">{w.legacy.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted">{w.legacy.body}</p>
            </div>
            <ButtonLink href={CONTACT_HREF} size="sm" className="shrink-0">
              {w.legacy.cta}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const differentiatorIcons = [UserSearch, Layers, Target, ShieldCheck];

export async function Differentiators() {
  const t = await getT();
  const d = t.deep(differentiators);
  return (
    <section aria-labelledby="different-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <CenteredHeading id="different-heading" eyebrow={d.eyebrow} title={d.title} description={d.description} />
      <ul className="mt-12 grid gap-5 md:grid-cols-2">
        {d.items.map((item, i) => {
          const Icon = differentiatorIcons[i];
          return (
            <li key={item.title}>
              <Reveal delay={(i % 2) * 0.07} className="h-full">
                <article className="flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-brand-100/80 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-11 place-items-center rounded-xl bg-brand-100 text-brand-700">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <span aria-hidden className="text-3xl font-extrabold text-brand-100">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.body}</p>
                  {"tags" in item && item.tags && (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <li key={tag} className="rounded-full bg-lavender px-3 py-1 text-[11px] font-medium text-brand-800">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                  {"footer" in item && item.footer && (
                    <div className="mt-5 flex items-center gap-3 rounded-2xl bg-brand-50 px-4 py-3 ring-1 ring-brand-100">
                      <BadgeCheck aria-hidden className="size-4 shrink-0 text-brand-600" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-ink">{item.footer.label}</p>
                        {"note" in item.footer && <p className="text-[11px] text-muted">{item.footer.note}</p>}
                      </div>
                      {"tag" in item.footer && (
                        <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-brand-700 ring-1 ring-brand-100">
                          {item.footer.tag}
                        </span>
                      )}
                    </div>
                  )}
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

const excellenceIcons = [Brain, UsersRound, Award];

export async function ExcellenceBand() {
  const t = await getT();
  const e = t.deep(excellenceBand);
  return (
    <section
      aria-labelledby="excellence-heading"
      className="relative overflow-hidden bg-linear-to-br from-night via-brand-900 to-brand-600 py-16 lg:py-20"
    >
      <div aria-hidden className="pointer-events-none absolute -end-20 top-0 size-96 rounded-full bg-violet-brand/40 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:gap-16 lg:px-8">
        <Reveal>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-200">{e.eyebrow}</p>
          <h2 id="excellence-heading" className="mt-4 flex items-end gap-3 text-white">
            <span className="text-7xl font-extrabold leading-none tracking-tight sm:text-8xl">{e.value}</span>
            <span className="pb-2 text-2xl font-bold leading-tight sm:text-3xl">
              {e.title[0]}
              <br />
              {e.title[1]}
            </span>
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/75">{e.body}</p>
        </Reveal>
        <ul className="space-y-4">
          {e.points.map((p, i) => {
            const Icon = excellenceIcons[i];
            return (
              <li key={p.title}>
                <Reveal delay={i * 0.07}>
                  <div className="flex gap-4 rounded-2xl bg-white/10 p-5 ring-1 ring-white/15 backdrop-blur">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/15 text-white">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-white">{p.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-white/70">{p.body}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

const pillarIcons = [Target, Lightbulb, GraduationCap, Award, Rocket];

export async function Methodology() {
  const t = await getT();
  const m = t.deep(methodology);
  return (
    <section aria-labelledby="method-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <CenteredHeading id="method-heading" eyebrow={m.eyebrow} title={m.title} description={m.description} />
      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {m.pillars.map((p, i) => {
          const Icon = pillarIcons[i];
          const featured = i === m.pillars.length - 1;
          return (
            <li key={p.title} className={cn(featured && "sm:col-span-2 lg:col-span-1")}>
              <Reveal delay={i * 0.05} className="h-full">
                <article
                  className={cn(
                    "flex h-full flex-col items-center rounded-3xl p-5 text-center ring-1",
                    featured ? "bg-brand-100/70 ring-brand-200" : "bg-white ring-brand-100/80",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-11 place-items-center rounded-xl",
                      featured
                        ? "bg-linear-to-br from-brand-700 to-violet-brand text-white shadow-lg shadow-brand-600/30"
                        : "bg-lavender text-brand-700",
                    )}
                  >
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-600">
                    {t("Pillar {n}", { n: String(i + 1).padStart(2, "0") })}
                  </p>
                  <h3 className="mt-1 text-sm font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{p.body}</p>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export async function Vision() {
  const t = await getT();
  const v = t.deep(vision);
  return (
    <section aria-label={v.eyebrow} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-4xl rounded-[2.5rem] bg-white px-6 py-14 text-center shadow-[0_40px_80px_-50px_rgba(44,37,115,0.45)] ring-1 ring-brand-100/80 sm:px-12">
        <Pill>{v.eyebrow}</Pill>
        <Quote aria-hidden className="mx-auto mt-6 size-8 text-brand-300" />
        <figure>
          <blockquote className="mt-4 text-2xl font-bold leading-snug tracking-tight text-ink sm:text-[2rem]">
            {v.quote.lead} <span className="text-brand-600">{v.quote.highlight}</span> {v.quote.tail}
          </blockquote>
          <span aria-hidden className="mx-auto mt-8 block h-1 w-12 rounded-full bg-brand-300" />
          <figcaption className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
            {siteConfig.name} {v.caption}
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}

const areaIcons = [Building, Landmark, MapPin];

/** Pins placed over the stylised map, in % of its box. */
const mapPins = [
  { label: "Sharjah", x: 76, y: 28, online: true },
  { label: "Dubai", x: 66, y: 40, online: false },
  { label: "Abu Dhabi", x: 40, y: 62, online: false },
];

export async function Regions() {
  const t = await getT();
  const r = t.deep(regions);
  return (
    <section aria-labelledby="regions-heading" className="bg-lavender/60 py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-8">
        <Reveal>
          <Pill>{r.eyebrow}</Pill>
          <h2 id="regions-heading" className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem] sm:leading-tight">
            {r.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{r.body}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {r.areas.map((a, i) => {
              const Icon = areaIcons[i];
              return (
                <li
                  key={a.name}
                  className={cn(
                    "flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-brand-100/80",
                    i === r.areas.length - 1 && "sm:col-span-2",
                  )}
                >
                  <Icon aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-600" />
                  <div>
                    <p className="text-sm font-bold text-ink">{a.name}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted">{a.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="rounded-[2rem] bg-white p-5 shadow-[0_40px_80px_-50px_rgba(44,37,115,0.45)] ring-1 ring-brand-100/80">
            <div className="flex items-center justify-between gap-3">
              <p className="flex items-center gap-2 text-xs font-bold text-ink">
                <span aria-hidden className="size-2 rounded-full bg-brand-600" />
                {r.map.title}
              </p>
              <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-brand-700 ring-1 ring-brand-100">
                {r.map.tag}
              </span>
            </div>
            <div
              role="img"
              aria-label={t("Map of the UAE showing in-home coverage in Dubai and Abu Dhabi and online coverage in Sharjah")}
              className="relative mt-4 aspect-[4/3] overflow-hidden rounded-2xl bg-brand-50"
            >
              <svg aria-hidden viewBox="0 0 400 300" className="absolute inset-0 size-full" preserveAspectRatio="none">
                <path
                  d="M40 250 C 90 230, 120 205, 160 190 S 230 150, 262 118 S 300 70, 322 58 L 352 44 L 360 120 L 338 196 C 300 230, 240 262, 160 272 C 110 278, 70 270, 40 250 Z"
                  className="fill-brand-100 stroke-brand-200"
                  strokeWidth="2"
                />
                <path d="M160 190 C 200 200, 250 180, 300 150" className="stroke-brand-200" strokeWidth="1.5" strokeDasharray="4 5" fill="none" />
              </svg>
              {mapPins.map((p) => (
                <span
                  key={p.label}
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  <span
                    className={cn(
                      "grid size-6 place-items-center rounded-full text-white shadow-md ring-4",
                      p.online ? "bg-violet-brand ring-violet-200/60" : "bg-brand-700 ring-brand-200/70",
                    )}
                  >
                    {p.online ? <Monitor aria-hidden className="size-3" /> : <House aria-hidden className="size-3" />}
                  </span>
                  <span className="mt-1 rounded-md bg-white px-1.5 py-0.5 text-[10px] font-semibold text-ink shadow-sm">{t(p.label)}</span>
                </span>
              ))}
            </div>
            <ul className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[11px] text-muted">
              <li className="flex items-center gap-2">
                <span aria-hidden className="size-2 rounded-full bg-brand-700" />
                {r.map.legend[0]}
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden className="size-2 rounded-full bg-violet-brand" />
                {r.map.legend[1]}
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const journeyIcons = [MessageSquareText, ClipboardList, UserSearch, Handshake];

export async function LearningJourney() {
  const t = await getT();
  const j = t.deep(learningJourney);
  return (
    <section aria-labelledby="journey-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <CenteredHeading id="journey-heading" eyebrow={j.eyebrow} title={j.title} description={j.description} />
      <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {j.steps.map((s, i) => {
          const Icon = journeyIcons[i];
          return (
            <li key={s.title}>
              <Reveal delay={i * 0.06} className="h-full">
                <article className="flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-brand-100/80">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-600">
                      {t("Step {n}", { n: String(i + 1).padStart(2, "0") })}
                    </p>
                    <span className="grid size-9 place-items-center rounded-xl bg-lavender text-brand-700">
                      <Icon aria-hidden className="size-4" />
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-bold text-ink">{s.title}</h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-muted">{s.body}</p>
                  <span aria-hidden className="mt-6 h-1 w-10 rounded-full bg-linear-to-r from-brand-700 to-violet-brand" />
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

const ctaBadgeIcons = [Sparkles, CircleCheck];

export async function AboutCta() {
  const t = await getT();
  const c = t.deep(aboutCta);
  return (
    <section aria-labelledby="about-cta-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-brand-600 via-brand-500 to-violet-brand px-6 py-14 shadow-[0_40px_80px_-40px_rgba(79,63,217,0.8)] sm:px-12">
        <div aria-hidden className="pointer-events-none absolute -end-24 -top-24 size-80 rounded-full bg-white/15 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <div>
            <span className="inline-flex rounded-full bg-white/15 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white ring-1 ring-white/20">
              {c.eyebrow}
            </span>
            <h2 id="about-cta-heading" className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
              {t("Let {name} {title}", { name: siteConfig.name, title: c.title })}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">{c.body}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href={requestHref} variant="ghost" size="lg" arrow className="bg-white text-brand-700 ring-0 hover:bg-white">
                {t("I Need a Tutor")}
              </ButtonLink>
              <ButtonLink
                href={CONTACT_HREF}
                size="lg"
                className="bg-white/15 bg-none text-white shadow-none ring-1 ring-white/25 hover:bg-white/25"
              >
                {t("Contact Us")}
              </ButtonLink>
            </div>
          </div>
          <ul className="flex flex-wrap gap-3 lg:flex-col lg:items-end">
            {c.badges.map((b, i) => {
              const Icon = ctaBadgeIcons[i];
              return (
                <li
                  key={b}
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-medium text-white ring-1 ring-white/20"
                >
                  <Icon aria-hidden className="size-3.5" />
                  {b}
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
