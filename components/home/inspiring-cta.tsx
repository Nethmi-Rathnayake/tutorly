import Image from "next/image";
import { CalendarClock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { homeImages } from "@/lib/constants/home";
import { siteConfig } from "@/lib/constants/site";
import { getT } from "@/lib/i18n/server";

export async function InspiringCta() {
  const t = await getT();
  const { contact, sessionTimings } = t.deep(siteConfig);

  return (
    <section aria-labelledby="inspiring-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-night shadow-[0_40px_80px_-30px_rgba(28,26,51,0.7)]">
          <Image
            src={homeImages.inspiring}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-right opacity-40"
          />
          <div aria-hidden className="absolute inset-0 bg-linear-to-r from-night via-night/85 to-brand-900/40" />
          <div aria-hidden className="absolute -end-20 top-10 size-96 rounded-full bg-violet-brand/30 blur-3xl" />

          <div className="relative px-6 py-14 sm:px-12 lg:py-20">
            <span className="inline-flex rounded-full bg-violet-brand/90 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
              {t("Premium Learning Experience")}
            </span>
            <h2
              id="inspiring-heading"
              className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl"
            >
              {t("Education That")}
              <br />
              {t("Feels Inspiring.")}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/75">
              {t("Clean soft purple aesthetics combined with modern layouts, uncompromising teacher vetting, and a high-focus student-centered experience.")}
            </p>
            <ButtonLink href="/tutor-request" variant="violet" arrow className="mt-8">
              {t("Join {name} Now", { name: siteConfig.name })}
            </ButtonLink>

            <div className="mt-14 grid gap-4 md:grid-cols-2">
              <div className="flex gap-4 rounded-2xl bg-white/95 p-5 backdrop-blur">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <ShieldCheck aria-hidden className="size-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-ink">{contact.centerName}</h3>
                  <ul className="mt-2 space-y-1.5 text-xs text-muted">
                    <li className="flex items-start gap-2">
                      <MapPin aria-hidden className="mt-0.5 size-3.5 shrink-0" />
                      {contact.address}
                    </li>
                    <li className="flex items-center gap-2">
                      <Phone aria-hidden className="size-3.5 shrink-0" />
                      <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-brand-700">
                        {contact.phone}
                      </a>
                    </li>
                    <li className="flex items-center gap-2">
                      <Mail aria-hidden className="size-3.5 shrink-0" />
                      <a href={`mailto:${contact.email}`} className="truncate hover:text-brand-700">
                        {contact.email}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl bg-white/95 p-5 backdrop-blur">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <CalendarClock aria-hidden className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold text-ink">{t("Session Timings")}</h3>
                  <dl className="mt-2 space-y-1.5 text-xs">
                    {sessionTimings.map((s) => (
                      <div key={s.days} className="flex justify-between gap-3">
                        <dt className="text-muted">{s.days}</dt>
                        <dd
                          className={
                            "highlight" in s && s.highlight ? "font-semibold text-brand-600" : "font-medium text-ink"
                          }
                        >
                          {s.hours}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
