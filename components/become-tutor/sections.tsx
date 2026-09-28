import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  CalendarClock,
  CheckCircle2,
  Clock,
  EyeOff,
  FileBadge,
  GraduationCap,
  Handshake,
  Lock,
  PenLine,
  Quote,
  ScanSearch,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  UserCheck,
  UsersRound,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import {
  becomeTutorHero,
  credentialsPreview,
  dedicatedTeam,
  educatorBenefits,
  engagementStages,
  privateRoster,
  registerCta,
  registrationSteps,
  safetyCommitments,
} from "@/lib/constants/tutor-registration";
import { siteConfig } from "@/lib/constants/site";

const REGISTER_HREF = "/tutor-registration";

function Pill({ children, icon: Icon }: { children: React.ReactNode; icon?: typeof Sparkles }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-brand-100/70 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-700">
      {Icon ? <Icon aria-hidden className="size-3.5" /> : <span aria-hidden className="size-1.5 rounded-full bg-brand-600" />}
      {children}
    </span>
  );
}

export function BecomeTutorHero() {
  const h = becomeTutorHero;
  const trustIcons = [BadgeCheck, Lock, EyeOff];
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 size-[600px] rounded-full bg-brand-200/40 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:pb-24 lg:pt-16">
        <Reveal>
          <Pill>{h.eyebrow}</Pill>
          <h1 className="mt-6 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            {h.titleLines[0]}
            <br />
            {h.titleLines[1]}
            <br />
            <span className="bg-linear-to-r from-brand-700 to-violet-brand bg-clip-text text-transparent">{h.titleAccent}</span>{" "}
            {h.titleRest}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">{h.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={REGISTER_HREF} size="lg" arrow>
              Register as a Tutor
            </ButtonLink>
            <ButtonLink href="#how-it-works" variant="ghost" size="lg">
              Explore How Matching Works
            </ButtonLink>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted">
            {h.trust.map((t, i) => {
              const Icon = trustIcons[i];
              return (
                <li key={t} className="inline-flex items-center gap-1.5">
                  <Icon aria-hidden className="size-3.5 text-brand-600" />
                  {t}
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.12} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/4.4] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgba(44,37,115,0.6)]">
            <Image src={h.image} alt={h.imageAlt} fill preload sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
          </div>
          <div className="animate-float absolute right-4 top-4 flex items-center gap-3 rounded-2xl bg-white/90 px-4 py-3 shadow-lg ring-1 ring-white backdrop-blur">
            <span className="grid size-8 place-items-center rounded-lg bg-brand-100 text-brand-700">
              <UserCheck aria-hidden className="size-4" />
            </span>
            <div>
              <p className="text-xs font-semibold text-ink">{h.floatingCard.title}</p>
              <p className="text-[11px] text-brand-600">{h.floatingCard.body}</p>
            </div>
          </div>
          <dl className="absolute inset-x-4 bottom-4 grid grid-cols-2 divide-x divide-brand-100 rounded-2xl bg-white/95 p-4 shadow-lg ring-1 ring-white backdrop-blur">
            {h.stats.map((s, i) => (
              <div key={s.label} className={`flex flex-col ${i ? "pl-4" : "pr-4"}`}>
                <dt className="order-2 text-[10px] font-bold uppercase tracking-[0.12em] text-ink/70">{s.label}</dt>
                <dd className="order-1 text-2xl font-extrabold text-brand-700 sm:text-3xl">{s.value}</dd>
                <dd className="order-3 mt-0.5 text-[11px] text-muted">{s.caption}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

export function PrivateRoster() {
  return (
    <section aria-labelledby="roster-heading" className="bg-lavender/60 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 rounded-3xl bg-white p-6 ring-1 ring-brand-100/80 sm:p-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700">
              <ShieldCheck aria-hidden className="size-5" />
            </span>
            <div>
              <h2 id="roster-heading" className="text-lg font-bold text-ink">
                {privateRoster.title}
              </h2>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted">{privateRoster.body}</p>
            </div>
          </div>
          <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full bg-brand-50 px-4 py-2 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">
            <Lock aria-hidden className="size-3.5" />
            {privateRoster.badge}
          </span>
        </div>
      </div>
    </section>
  );
}

const benefitIcons = [GraduationCap, BookOpenText, FileBadge, CalendarClock];

export function EducatorBenefits() {
  return (
    <section aria-labelledby="benefits-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <Pill>Educator Alliance</Pill>
        <h2 id="benefits-heading" className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem] sm:leading-tight">
          Why Distinguished Educators Partner With {siteConfig.name}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          Experience an elevated academic partnership designed around pedagogical integrity, direct professional review,
          and unconditional schedule respect.
        </p>
      </div>

      <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {educatorBenefits.map((b, i) => {
          const Icon = benefitIcons[i];
          return (
            <li key={b.title}>
              <Reveal delay={(i % 3) * 0.07} className="h-full">
                <article className="flex h-full flex-col rounded-3xl bg-white p-7 ring-1 ring-brand-100/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-32px_rgba(79,63,217,0.5)]">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-100/80 text-brand-700">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-ink">{b.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{b.body}</p>
                  <div className="mt-6 rounded-2xl bg-lavender/70 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-600">{b.tag}</p>
                    <p className="mt-1 text-xs text-ink/80">{b.tagBody}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          );
        })}

        <li className="md:col-span-2">
          <Reveal delay={0.1} className="h-full">
            <article className="flex h-full flex-col gap-6 rounded-3xl bg-linear-to-br from-white to-brand-50 p-7 ring-1 ring-brand-100/80 sm:flex-row sm:items-center">
              <div className="flex-1">
                <span className="grid size-11 place-items-center rounded-xl bg-linear-to-br from-brand-700 to-brand-600 text-white">
                  <Handshake aria-hidden className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink">{dedicatedTeam.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{dedicatedTeam.body}</p>
              </div>
              <div className="shrink-0 rounded-2xl bg-white p-5 ring-1 ring-brand-100 sm:w-52">
                <p className="flex items-center gap-2 text-xs font-bold text-brand-700">
                  <ShieldCheck aria-hidden className="size-4" />
                  {dedicatedTeam.protocolTitle}
                </p>
                <ul className="mt-3 space-y-2">
                  {dedicatedTeam.protocol.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-xs text-muted">
                      <CheckCircle2 aria-hidden className="mt-0.5 size-3.5 shrink-0 text-brand-500" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        </li>
      </ul>
    </section>
  );
}

const stageIcons = [PenLine, SlidersHorizontal, ScanSearch, UsersRound];
const stageMetaIcons = [Clock, SlidersHorizontal, UserCheck, UsersRound];

export function EngagementStages() {
  return (
    <section id="how-it-works" aria-labelledby="engagement-heading" className="scroll-mt-20 bg-lavender/70 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-600">The Placement Process</p>
            <h2 id="engagement-heading" className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem] sm:leading-tight">
              How Educator Engagement Works
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              A transparent four-phase journey from initial credentials review to your first private student connection.
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-medium text-ink ring-1 ring-brand-100">
            <Clock aria-hidden className="size-3.5 text-brand-600" />
            Confidential 48h Review Cycle
          </span>
        </div>

        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {engagementStages.map((s, i) => {
            const Icon = stageIcons[i];
            const MetaIcon = stageMetaIcons[i];
            return (
              <li key={s.title}>
                <Reveal delay={i * 0.07} className="h-full">
                  <article className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-white p-6 ring-1 ring-brand-100/80">
                    <span aria-hidden className="absolute -right-2 -top-4 text-7xl font-extrabold text-brand-50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`relative grid size-10 place-items-center rounded-xl ${i === 3 ? "bg-linear-to-br from-brand-700 to-violet-brand text-white" : "bg-brand-100/80 text-brand-700"}`}
                    >
                      <Icon aria-hidden className="size-4" />
                    </span>
                    <p className="relative mt-5 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-600">
                      Stage {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="relative mt-1 text-base font-bold text-ink">{s.title}</h3>
                    <p className="relative mt-2 flex-1 text-xs leading-relaxed text-muted">{s.body}</p>
                    <p className="relative mt-5 flex items-center gap-1.5 border-t border-brand-50 pt-4 text-xs text-ink/80">
                      <MetaIcon aria-hidden className="size-3.5 text-brand-600" />
                      {s.meta}
                    </p>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

const safetyIcons = [ShieldCheck, GraduationCap, PenLine, EyeOff];

export function SafetyCommitments() {
  const s = safetyCommitments;
  const t = s.testimonial;
  return (
    <section aria-labelledby="safety-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-10 rounded-[2rem] bg-white p-7 ring-1 ring-brand-100/80 sm:p-10 lg:grid-cols-2 lg:gap-12">
        <Reveal>
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-600">
            <Sparkles aria-hidden className="size-3.5" />
            {s.eyebrow}
          </p>
          <h2 id="safety-heading" className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {s.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">{s.body}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {s.items.map((item, i) => {
              const Icon = safetyIcons[i];
              return (
                <li key={item.title} className="flex gap-3 rounded-2xl bg-lavender/70 p-4">
                  <Icon aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-600" />
                  <div>
                    <p className="text-sm font-semibold text-ink">{item.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted">{item.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <figure className="flex h-full flex-col rounded-3xl bg-lavender/80 p-7 ring-1 ring-brand-100">
            <div className="flex items-center gap-4">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-2xl bg-brand-50">
                <Image src={t.image} alt={`Portrait of ${t.name}`} fill sizes="56px" className="object-cover" />
              </div>
              <div>
                <p className="text-base font-bold text-ink">{t.name}</p>
                <p className="text-xs font-medium text-brand-600">{t.role}</p>
                <p className="text-[11px] text-muted">{t.credentials}</p>
              </div>
            </div>
            <Quote aria-hidden className="mt-6 size-6 text-brand-300" />
            <blockquote className="mt-2 flex-1 text-sm italic leading-relaxed text-muted">“{t.quote}”</blockquote>
            <ul className="mt-6 flex flex-wrap gap-2">
              {t.tags.map((tag) => (
                <li key={tag} className="rounded-full bg-white px-3 py-1 text-[11px] font-medium text-ink/80 ring-1 ring-brand-100">
                  {tag}
                </li>
              ))}
            </ul>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

export function CredentialsPreview() {
  return (
    <section aria-labelledby="credentials-heading" className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <Pill icon={Lock}>{credentialsPreview.eyebrow}</Pill>
        <h2 id="credentials-heading" className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem] sm:leading-tight">
          {credentialsPreview.title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{credentialsPreview.body}</p>
      </div>
      <Reveal className="mt-10">
        <div className="rounded-3xl bg-white p-6 ring-1 ring-brand-100/80 sm:p-8">
          <ol className="grid gap-3 sm:grid-cols-5">
            {registrationSteps.map((s, i) => (
              <li key={s.id} className="flex items-center gap-3 rounded-2xl bg-lavender/70 p-3 sm:flex-col sm:items-start">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-xs font-bold text-brand-700 ring-1 ring-brand-100">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">{s.label}</span>
                  <span className="block text-[11px] text-muted">{s.sublabel}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-brand-50 pt-6 sm:flex-row">
            <p className="flex items-center gap-2 text-xs text-muted">
              <ShieldCheck aria-hidden className="size-4 text-brand-600" />
              Five short stages • Save a draft at any time
            </p>
            <ButtonLink href={REGISTER_HREF} arrow>
              Start Your Registration
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function RegisterCta() {
  return (
    <section aria-labelledby="register-cta-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-night px-6 py-16 text-center shadow-[0_40px_80px_-30px_rgba(28,26,51,0.7)] sm:px-12">
          <div aria-hidden className="absolute left-1/2 top-0 size-96 -translate-x-1/2 rounded-full bg-brand-600/30 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/90 ring-1 ring-white/15">
              <ShieldCheck aria-hidden className="size-3.5" />
              {registerCta.eyebrow}
            </span>
            <h2 id="register-cta-heading" className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              {registerCta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">{registerCta.body}</p>
            <ButtonLink href={REGISTER_HREF} variant="violet" size="lg" className="mt-8">
              Register as a Tutor
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
            <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-white/60">
              <Clock aria-hidden className="size-3.5" />
              {registerCta.note}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
