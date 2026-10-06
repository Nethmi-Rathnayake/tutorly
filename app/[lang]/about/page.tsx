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

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return {
    title: t("About Us"),
    description: t(
      "13 years of connecting UAE families with hand-picked, vetted private tutors across Dubai, Abu Dhabi and the wider Emirates, through a personal, director-led matching process.",
    ),
  };
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
