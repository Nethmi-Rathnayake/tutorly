import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { homeImages } from "@/lib/constants/home";
import { siteConfig } from "@/lib/constants/site";
import { getT } from "@/lib/i18n/server";

export async function InspiringCta() {
  const t = await getT();
  const { contact, sessionTimings } = t.deep(siteConfig);

  return (
    <section aria-labelledby="inspiring-heading" className="mx-auto max-w-[90rem] px-4 sm:px-8 lg:px-10">
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

          <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-brand-400 via-gold to-brand-500" />

          <div className="relative grid items-center gap-12 px-6 py-14 font-[family-name:var(--font-inter),var(--font-arabic)] sm:px-12 lg:grid-cols-2 lg:gap-16 lg:py-20">
            <div className="text-start">
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                <span aria-hidden className="h-px w-8 bg-gold" />
                {t("Premium Learning Experience")}
              </p>
              <h2
                id="inspiring-heading"
                className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-[2.5rem]"
              >
                {t("Education That")}
                <br />
                <span className="text-brand-400">{t("Feels Inspiring.")}</span>
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/75">
                {t("Clean, elegant design combined with modern layouts, uncompromising teacher vetting, and a high-focus student-centered experience.")}
              </p>
              <ButtonLink href="/tutor-request" size="lg" arrow className="mt-8">
                {t("Join {name} Now", { name: siteConfig.name })}
              </ButtonLink>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl bg-night/60 p-6 ring-1 ring-white/20 backdrop-blur-md transition-colors duration-300 hover:ring-gold/60">
                <h3 className="text-base font-bold text-gold">{contact.centerName}</h3>
                <ul className="mt-3 space-y-2.5 text-sm text-white/80">
                  <li className="flex items-start gap-3">
                    <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-gold" />
                    {contact.address}
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail aria-hidden className="size-4 shrink-0 text-gold" />
                    <a href={`mailto:${contact.email}`} className="-my-1.5 inline-block truncate py-1.5 hover:text-gold">
                      {contact.email}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl bg-night/60 p-6 ring-1 ring-white/20 backdrop-blur-md transition-colors duration-300 hover:ring-gold/60">
                <h3 className="text-base font-bold text-gold">{t("Session Timings")}</h3>
                <dl className="mt-3 space-y-2.5 text-sm">
                  {sessionTimings.map((s) => (
                    <div key={s.days} className="flex justify-between gap-3 border-b border-white/10 pb-2.5 last:border-0 last:pb-0">
                      <dt className="text-white/70">{s.days}</dt>
                      <dd className={"highlight" in s && s.highlight ? "font-semibold text-gold" : "font-medium text-white"}>
                        {s.hours}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
