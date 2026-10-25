/**
 * Copy for the Concierge Matching page (/tutor-request).
 * Unverified figures (response SLA, placement rate), guarantees and the testimonial were removed;
 * add them back only with approved content (SRS §11, §27).
 */

export const conciergeHero = {
  eyebrow: "Bespoke Academic Matching • Private Concierge Intake",
  title: "Tell Us What You’re Looking For",
  description:
    "Share your learning requirements and our team will review them and look for a suitable tutor for your child.",
  cta: "Start Your Request",
  assurance: "Private matching • No public directory",
  image: "/images/concierge-hero.jpg",
  imageAlt: "A tutor working one-on-one with a student at a laptop",
  reviewCard: { title: "Request Review", body: "Every request is reviewed by our team" },
  curatedCard: { title: "Curated Match", body: "Zero public browsing or directory clutter" },
};

export const placementSteps = [
  {
    step: "01",
    title: "Tell Us About the Student",
    body: "Academic standing, current school, curriculum, unique strengths, and specific learning friction points.",
    tag: "Needs assessment",
  },
  {
    step: "02",
    title: "Tell Us What They Need",
    body: "Subject focus, weekly frequency, in-person vs online, schedule availability, and upcoming exam targets.",
    tag: "Pedagogical scope",
  },
  {
    step: "03",
    title: "Our Team Reviews",
    body: "Our team reviews your syllabus criteria and looks for a suitable tutor.",
    tag: "Team review",
  },
  {
    step: "04",
    title: "We Help Connect You",
    body: "We contact you through your preferred channel to discuss the next steps.",
    tag: "Next steps",
  },
];

export const intakeIntro = {
  eyebrow: "Personal Intake Portal",
  title: "Submit Your Tutoring Requirement",
  description:
    "Complete our guided intake. Your submission goes directly to our team, who will review it and get in touch.",
};

export const assurances = [
  {
    title: "No Public Directory",
    body: "All tutor profiles and family requests are handled with absolute private discretion.",
  },
  {
    title: "Matched to Your Request",
    body: "Our team looks for a tutor that fits the requirements you share.",
  },
  {
    title: "Your Preferred Channel",
    body: "We contact you through WhatsApp, phone or email, whichever you choose.",
  },
];
