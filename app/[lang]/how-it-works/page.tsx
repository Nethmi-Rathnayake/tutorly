import type { Metadata } from "next";
import {
  ConciergeNexus,
  ConnectionProof,
  DirectoryContrast,
  DualJourneys,
  HowItWorksCta,
  HowItWorksHero,
} from "@/components/how-it-works/sections";
import { getT } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return {
    title: t("How It Works"),
    description: t(
      "How our academic directors privately hand-match families with vetted tutors, with no public directory, no cold outreach and a chemistry trial before lessons begin.",
    ),
  };
}

export default function HowItWorksPage() {
  return (
    <div className="space-y-12 pb-16 lg:space-y-16">
      <HowItWorksHero />
      <ConciergeNexus />
      <DualJourneys />
      <DirectoryContrast />
      <ConnectionProof />
      <HowItWorksCta />
    </div>
  );
}
