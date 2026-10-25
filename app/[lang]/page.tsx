import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants/site";
import { getT } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/hero";
import { CurriculumSelector } from "@/components/home/curriculum-selector";
import { LevelStages } from "@/components/home/level-stages";
import { SubjectGrid } from "@/components/home/subject-grid";
import { NextGeneration } from "@/components/home/next-generation";
import { HowItWorks } from "@/components/home/how-it-works";
import { InspiringCta } from "@/components/home/inspiring-cta";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/", t.locale, {
    title: { absolute: `${t("Private Tutors in Dubai & the UAE")} | ${siteConfig.name}` },
    description: t(
      "Request a private tutor in Dubai, Abu Dhabi and across the UAE, online or at home, for IGCSE, A-Level, IB, AP and American curriculum students.",
    ),
  });
}

export default function HomePage() {
  return (
    <div className="space-y-12 pb-16 lg:space-y-16">
      <div className="space-y-8">
        <Hero />
        <CurriculumSelector />
      </div>
      <LevelStages />
      <SubjectGrid />
      <NextGeneration />
      <HowItWorks />
      <InspiringCta />
    </div>
  );
}
