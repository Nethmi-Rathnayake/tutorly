import { Hero } from "@/components/home/hero";
import { JourneyCards } from "@/components/home/journey-cards";
import { CurriculumSelector } from "@/components/home/curriculum-selector";
import { LevelStages } from "@/components/home/level-stages";
import { SubjectGrid } from "@/components/home/subject-grid";
import { NextGeneration } from "@/components/home/next-generation";
import { FeaturedTutors } from "@/components/home/featured-tutors";
import { HowItWorks } from "@/components/home/how-it-works";
import { InspiringCta } from "@/components/home/inspiring-cta";
import { Testimonials } from "@/components/home/testimonials";

export default function HomePage() {
  return (
    <div className="space-y-20 pb-24 lg:space-y-28">
      <div className="space-y-8">
        <Hero />
        <JourneyCards />
        <CurriculumSelector />
      </div>
      <LevelStages />
      <SubjectGrid />
      <NextGeneration />
      <FeaturedTutors />
      <HowItWorks />
      <InspiringCta />
      <Testimonials />
    </div>
  );
}
