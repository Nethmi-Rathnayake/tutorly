import type { Metadata } from "next";
import {
  BecomeTutorHero,
  CredentialsPreview,
  EducatorBenefits,
  EngagementStages,
  PrivateRoster,
  RegisterCta,
  SafetyCommitments,
} from "@/components/become-tutor/sections";
import { getT } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return {
    title: t("Become a Tutor"),
    description: t(
      "Share your subjects, qualifications and availability with our academic placement team and teach motivated students online or in person.",
    ),
  };
}

export default function BecomeATutorPage() {
  return (
    <div className="space-y-20 pb-24 lg:space-y-24">
      <div>
        <BecomeTutorHero />
        <PrivateRoster />
      </div>
      <EducatorBenefits />
      <EngagementStages />
      <SafetyCommitments />
      <CredentialsPreview />
      <RegisterCta />
    </div>
  );
}
