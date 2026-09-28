import type { Metadata } from "next";
import {
  ConciergeNexus,
  ConnectionProof,
  DirectoryContrast,
  DualJourneys,
  HowItWorksCta,
  HowItWorksHero,
} from "@/components/how-it-works/sections";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "How our academic directors privately hand-match families with vetted tutors, with no public directory, no cold outreach and a chemistry trial before lessons begin.",
};

export default function HowItWorksPage() {
  return (
    <div className="space-y-20 pb-24 lg:space-y-28">
      <HowItWorksHero />
      <ConciergeNexus />
      <DualJourneys />
      <DirectoryContrast />
      <ConnectionProof />
      <HowItWorksCta />
    </div>
  );
}
