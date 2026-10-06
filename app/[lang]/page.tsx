import { Hero } from "@/components/home/hero";
import { CurriculumSelector } from "@/components/home/curriculum-selector";
import { LevelStages } from "@/components/home/level-stages";
import { SubjectGrid } from "@/components/home/subject-grid";
import { NextGeneration } from "@/components/home/next-generation";
import { HowItWorks } from "@/components/home/how-it-works";
import { InspiringCta } from "@/components/home/inspiring-cta";
import { Testimonials } from "@/components/home/testimonials";

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
      <Testimonials />
    </div>
  );
}
