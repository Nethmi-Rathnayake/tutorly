import type { Metadata } from "next";
import {
  AboutCta,
  AboutHero,
  Differentiators,
  ExcellenceBand,
  LearningJourney,
  Methodology,
  Regions,
  Vision,
  WhoWeAre,
} from "@/components/about/sections";
import { getT } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/about", t.locale, {
    title: t("About Us: Private Tutor Matching in the UAE"),
    description: t(
      "How Tuteme helps UAE families find a suitable private tutor across Dubai, Abu Dhabi and the wider Emirates through a personal request process.",
    ),
  });
}

export default function AboutPage() {
  return (
    <div className="space-y-12 pb-16 lg:space-y-16">
      <AboutHero />
      <WhoWeAre />
      <Differentiators />
      <ExcellenceBand />
      <Methodology />
      <Vision />
      <Regions />
      <LearningJourney />
      <AboutCta />
    </div>
  );
}
