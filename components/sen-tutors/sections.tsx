import Image from "next/image";
import {
  ArrowRight,
  BookOpenText,
  Calculator,
  CircleCheck,
  ClipboardList,
  FlaskConical,
  GraduationCap,
  ListChecks,
  MessagesSquare,
  NotebookPen,
  PencilLine,
  Puzzle,
  Sprout,
  Target,
} from "lucide-react";
import { FaqAccordion } from "@/components/sen-tutors/faq-accordion";
import { AccentTitle } from "@/components/ui/accent-title";
import { ButtonLink } from "@/components/ui/button-link";
import { Link } from "@/components/ui/link";
import { Reveal } from "@/components/ui/reveal";
import {
  senBenefits,
  senCurricula,
  senFaq,
  senFinalCta,
  senHero,
  senImages,
  senIntro,
  senParentGuide,
  senProcess,
  senRequestCta,
  senStages,
  senSupportAreas,
} from "@/lib/constants/sen-tutors";
import { requestHref } from "@/lib/constants/site";
import { getT } from "@/lib/i18n/server";
import { cn } from "@/lib/utils/cn";

const CONTACT_HREF = "/contact";
const FONT = "font-[family-name:var(--font-inter),var(--font-arabic)]";
const CONTAINER = "mx-auto max-w-[90rem] px-4 sm:px-8 lg:px-10";
/** Full-width buttons on phones, natural width from `sm` up. */
const MOBILE_FULL = "w-full sm:w-auto";

function Pill({ children, center = true, light = false }: { children: React.ReactNode; center?: boolean; light?: boolean }) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em]",
        light ? "text-gold" : "text-brand-600",
        center && "justify-center",
      )}
    >
      <span aria-hidden className={cn("h-px w-8 shrink-0", light ? "bg-gold" : "bg-brand-500")} />
      {children}
      {center && <span aria-hidden className={cn("h-px w-8 shrink-0", light ? "bg-gold" : "bg-brand-500")} />}
    </p>
  );
}

function CenteredHeading({ id, eyebrow, title, description }: { id: string; eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Pill>{eyebrow}</Pill>
      <h2 id={id} className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem] sm:leading-tight">
        <AccentTitle text={title} />
      </h2>
      {description && <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{description}</p>}
    </div>
  );
}

function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1 font-semibold text-brand-600 underline-offset-4 hover:text-brand-900 hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
    >
      {children}
      <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
    </Link>
  );
}

export async function SenHero() {
  const t = await getT();
  const h = t.deep(senHero);
  return (
    <section className={cn("relative overflow-x-clip", FONT)}>
      <div
        aria-hidden
        className="pointer-events-none absolute -end-40 -top-40 -z-10 size-[560px] rounded-full bg-brand-200/40 blur-3xl"
      />
      <div className={cn(CONTAINER, "relative grid items-center gap-12 pt-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-16")}>
        <Reveal>
          <Pill center={false}>{h.eyebrow}</Pill>
          <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            {h.titleLead} <span className="text-brand-600">{h.titleAccent}</span> {h.titleTail}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{h.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <ButtonLink href={requestHref} size="lg" arrow className={MOBILE_FULL}>
              {h.primaryCta}
            </ButtonLink>
            <ButtonLink href={CONTACT_HREF} size="lg" variant="soft" className={cn(MOBILE_FULL, "bg-night text-gold hover:bg-brand-800")}>
              {h.secondaryCta}
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-md">
          {/* offset gold frame behind the photo */}
          <span
            aria-hidden
            className="absolute -bottom-4 -end-4 size-full rounded-3xl border-2 border-brand-400 sm:-bottom-5 sm:-end-5"
          />
          <div className="relative aspect-square overflow-hidden rounded-3xl shadow-[0_30px_60px_-30px_rgba(20,23,29,0.5)]">
            <Image
              src={senImages.hero}
              alt={h.imageAlt}
              fill
              priority
              sizes="(min-width: 640px) 448px, 384px"
              className="object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.03]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export async function SenIntro() {
  const t = await getT();
  const c = t.deep(senIntro);
  return (
    <section aria-labelledby="sen-intro-heading" className={cn("bg-brand-50/70 py-12 lg:py-16", FONT)}>
      <Reveal className={cn(CONTAINER, "grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16")}>
        <div>
          <Pill center={false}>{c.eyebrow}</Pill>
          <h2 id="sen-intro-heading" className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem] sm:leading-tight">
            <AccentTitle text={c.title} />
          </h2>
        </div>
        <div>
          {c.paragraphs.map((p) => (
            <p key={p} className="mt-4 text-sm leading-relaxed text-muted first:mt-0 sm:text-base">
              {p}
            </p>
          ))}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <ButtonLink href={requestHref} size="lg" arrow className={MOBILE_FULL}>
              {c.cta}
            </ButtonLink>
            <p className="text-sm text-muted">
              {c.linkLead} <InlineLink href="/how-it-works">{c.linkLabel}</InlineLink>
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

const benefitIcons = [Target, Puzzle, MessagesSquare, Sprout];

export async function SenBenefits() {
  const t = await getT();
  const b = t.deep(senBenefits);
  return (
    <section aria-labelledby="sen-benefits-heading" className={cn(CONTAINER, FONT)}>
      <Reveal>
        <CenteredHeading id="sen-benefits-heading" eyebrow={b.eyebrow} title={b.title} description={b.description} />
      </Reveal>
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {b.items.map((item, i) => {
          const Icon = benefitIcons[i];
          return (
            <li key={item.title}>
              <Reveal delay={i * 0.07} className="h-full">
                <article className="group flex h-full flex-col rounded-3xl bg-white p-7 ring-1 ring-brand-200 transition-all duration-300 hover:-translate-y-1 hover:bg-[#e6c97c] hover:ring-brand-500">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-4xl font-bold text-brand-500 transition-colors group-hover:text-brand-900">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="grid size-11 place-items-center rounded-full bg-brand-50 text-brand-600 transition-colors group-hover:bg-white">
                      <Icon aria-hidden className="size-5" />
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted transition-colors group-hover:text-brand-900/85">{item.body}</p>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

const areaIcons = [GraduationCap, BookOpenText, Calculator, FlaskConical, ListChecks, NotebookPen, PencilLine, MessagesSquare];

export async function SenSupportAreas() {
  const t = await getT();
  const s = t.deep(senSupportAreas);
  return (
    <section aria-labelledby="sen-areas-heading" className={cn(CONTAINER, FONT)}>
      <Reveal>
        <CenteredHeading id="sen-areas-heading" eyebrow={s.eyebrow} title={s.title} description={s.description} />
      </Reveal>
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {s.items.map((item, i) => {
          const Icon = areaIcons[i];
          return (
            <li key={item.title}>
              <Reveal delay={(i % 4) * 0.06} className="h-full">
                <article className="group flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-brand-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(143,106,29,0.5)] hover:ring-brand-500">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-200 transition-colors group-hover:bg-night group-hover:text-gold group-hover:ring-night">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <h3 className="mt-5 text-base font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
      <p className="mt-8 text-center text-sm text-muted">
        {s.linkLead} <InlineLink href="/subjects">{s.linkLabel}</InlineLink>
      </p>
    </section>
  );
}

export async function SenStages() {
  const t = await getT();
  const s = t.deep(senStages);
  return (
    <section aria-labelledby="sen-stages-heading" className={cn("bg-brand-50/70 py-12 lg:py-16", FONT)}>
      <div className={CONTAINER}>
        <Reveal>
          <CenteredHeading id="sen-stages-heading" eyebrow={s.eyebrow} title={s.title} description={s.description} />
        </Reveal>
        <Reveal delay={0.08}>
          <ol className="relative mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-3">
            {/* progression line behind the step markers (desktop) */}
            <span aria-hidden className="absolute inset-x-[8%] top-6 hidden h-px bg-brand-300 lg:block" />
            {s.items.map((stage, i) => (
              <li key={stage.title} className="relative">
                <Link
                  href={`/education-levels#${stage.anchor}`}
                  className="group flex h-full items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-brand-200 transition-all duration-300 hover:-translate-y-1 hover:ring-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 lg:flex-col lg:bg-transparent lg:p-0 lg:text-center lg:ring-0 lg:hover:ring-0"
                >
                  <span className="relative grid size-12 shrink-0 place-items-center rounded-full bg-linear-to-b from-[#ecd28c] to-[#c9a24e] text-sm font-bold text-brand-900 shadow-[0_10px_24px_-12px_rgba(201,162,78,0.9)] ring-4 ring-brand-50 transition-transform duration-300 group-hover:scale-105">
                    {i + 1}
                  </span>
                  <span className="text-sm font-semibold leading-snug text-ink transition-colors group-hover:text-brand-600 lg:max-w-[10rem]">
                    {stage.title}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </Reveal>
        <p className="mt-10 text-center text-sm">
          <InlineLink href="/education-levels">{s.linkLabel}</InlineLink>
        </p>
      </div>
    </section>
  );
}

export async function SenCurricula() {
  const t = await getT();
  const c = t.deep(senCurricula);
  return (
    <section aria-labelledby="sen-curricula-heading" className={cn(CONTAINER, FONT)}>
      <Reveal className="rounded-3xl bg-white px-6 py-12 ring-1 ring-brand-200 sm:px-10 lg:py-14">
        <CenteredHeading id="sen-curricula-heading" eyebrow={c.eyebrow} title={c.title} description={c.description} />
        <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2.5 sm:gap-3">
          {c.items.map((name) => (
            <li
              key={name}
              className="rounded-full bg-brand-50 px-4 py-2.5 text-sm font-semibold text-ink ring-1 ring-brand-300 transition-colors duration-300 hover:bg-[#e6c97c] hover:ring-brand-500 sm:px-5"
            >
              {name}
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-8 max-w-xl text-center text-xs leading-relaxed text-muted sm:text-sm">{c.note}</p>
      </Reveal>
    </section>
  );
}

export async function SenParentGuide() {
  const t = await getT();
  const g = t.deep(senParentGuide);
  return (
    <section aria-labelledby="sen-guide-heading" className={cn(CONTAINER, FONT)}>
      <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-start lg:gap-16">
        <Reveal>
          <Pill center={false}>{g.eyebrow}</Pill>
          <h2 id="sen-guide-heading" className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem] sm:leading-tight">
            <AccentTitle text={g.title} />
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">{g.description}</p>
          <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {g.items.map((item) => (
              <li key={item} className="flex gap-3 border-b border-brand-200 pb-4 text-sm font-medium leading-relaxed text-ink sm:text-[15px]">
                <CircleCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-500" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          <aside className="relative overflow-hidden rounded-3xl bg-night p-8 text-white sm:p-10">
            <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-brand-400 via-gold to-brand-500" />
            <span className="grid size-12 place-items-center rounded-full bg-white/10 text-gold ring-1 ring-gold/40">
              <ClipboardList aria-hidden className="size-5" />
            </span>
            <h3 className="mt-6 text-xl font-bold sm:text-2xl">{g.aside.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">{g.aside.body}</p>
            <div className="mt-8 flex flex-col gap-4">
              <ButtonLink href={requestHref} size="lg" arrow className={MOBILE_FULL}>
                {t("Request a Tutor")}
              </ButtonLink>
              <Link
                href="/about"
                className="group inline-flex items-center gap-1 text-sm font-semibold text-gold underline-offset-4 hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                {g.aside.linkLabel}
                <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
              </Link>
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}

export async function SenProcess() {
  const t = await getT();
  const p = t.deep(senProcess);
  return (
    <section aria-labelledby="sen-process-heading" className={cn(CONTAINER, FONT)}>
      <Reveal>
        <CenteredHeading id="sen-process-heading" eyebrow={p.eyebrow} title={p.title} />
      </Reveal>
      <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {p.steps.map((step, i) => (
          <li key={step.title} className="relative">
            {i < p.steps.length - 1 && (
              <ArrowRight
                aria-hidden
                className="absolute -end-4 top-12 z-10 hidden size-5 text-brand-400 lg:block rtl:-scale-x-100"
              />
            )}
            <Reveal delay={i * 0.08} className="h-full">
              <article className="group flex h-full flex-col rounded-3xl bg-white p-7 ring-1 ring-brand-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(143,106,29,0.5)] hover:ring-brand-500">
                <span className="grid size-12 place-items-center rounded-full bg-linear-to-b from-[#ecd28c] to-[#c9a24e] text-sm font-bold text-brand-900">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

function DarkCta({
  id,
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
}) {
  return (
    <Reveal className="relative isolate overflow-hidden rounded-3xl bg-night px-6 py-12 text-center sm:px-12 lg:py-16">
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 -z-10 size-[520px] -translate-x-1/2 rounded-full bg-brand-500/25 blur-3xl"
      />
      <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-brand-400 via-gold to-brand-500" />
      <div className="mx-auto max-w-2xl">
        {eyebrow && <Pill light>{eyebrow}</Pill>}
        <h2 id={id} className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-[2.5rem]">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">{description}</p>
        <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
          <ButtonLink href={requestHref} size="lg" arrow className={MOBILE_FULL}>
            {primaryCta}
          </ButtonLink>
          <ButtonLink
            href={CONTACT_HREF}
            variant="ghost"
            size="lg"
            className={cn(MOBILE_FULL, "bg-transparent text-white ring-white/40 hover:bg-white/10 hover:ring-gold")}
          >
            {secondaryCta}
          </ButtonLink>
        </div>
      </div>
    </Reveal>
  );
}

export async function SenRequestCta() {
  const t = await getT();
  const c = t.deep(senRequestCta);
  return (
    <section aria-labelledby="sen-request-heading" className={cn(CONTAINER, FONT)}>
      <DarkCta id="sen-request-heading" {...c} />
    </section>
  );
}

export async function SenFaq() {
  const t = await getT();
  const f = t.deep(senFaq);
  return (
    <section aria-labelledby="sen-faq-heading" className={cn(CONTAINER, FONT)}>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <Reveal>
          <Pill center={false}>{f.eyebrow}</Pill>
          <h2 id="sen-faq-heading" className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem] sm:leading-tight">
            <AccentTitle text={f.title} />
          </h2>
          <p className="mt-5 text-sm text-muted">
            {f.moreLead} <InlineLink href="/faq">{f.moreLabel}</InlineLink>
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <FaqAccordion items={f.items} />
        </Reveal>
      </div>
    </section>
  );
}

export async function SenFinalCta() {
  const t = await getT();
  const c = t.deep(senFinalCta);
  return (
    <section aria-labelledby="sen-final-heading" className={cn(CONTAINER, FONT)}>
      <Reveal className="rounded-3xl bg-brand-100 px-6 py-14 text-center ring-1 ring-brand-300 sm:px-10 lg:py-16">
        <div className="mx-auto max-w-2xl">
          <h2 id="sen-final-heading" className="text-3xl font-bold leading-tight tracking-tight text-ink sm:text-[2.5rem]">
            <AccentTitle text={c.title} />
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted sm:text-base">{c.description}</p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
            <ButtonLink href={requestHref} size="lg" arrow className={MOBILE_FULL}>
              {c.primaryCta}
            </ButtonLink>
            <ButtonLink href={CONTACT_HREF} size="lg" variant="soft" className={cn(MOBILE_FULL, "bg-night text-gold hover:bg-brand-800")}>
              {c.secondaryCta}
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
