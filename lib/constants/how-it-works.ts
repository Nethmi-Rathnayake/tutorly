/**
 * Copy for the How It Works page (/how-it-works).
 * Unverified figures (acceptance rate, connection time), guarantees, screening claims and the testimonial
 * were removed; add them back only with approved content (SRS §11, §27).
 */

export const howItWorksHero = {
  eyebrow: "Private Concierge Matching Architecture • No Public Directories",
  title: "How Our Tutoring",
  titleAccent: "Connection Works",
  description:
    "A private request process designed to help families find a suitable tutor. No public directories and no search algorithms.",
  badges: [
    "Request-Based Matching",
    "Zero Public Profile Exposure",
    "Contact by WhatsApp, Phone or Email",
    "Online & In-Person Options",
  ],
};

export const conciergeNexus = {
  eyebrow: "Central Architectural Flow",
  title: "The Academic Concierge Nexus",
  description: "Every request is reviewed by our team.",
  parent: {
    stream: "Source Stream 01",
    role: "Parent & Student",
    title: "01. Requirement Specification",
    points: [
      "Target Grade & Examination Board",
      "Specific Curriculum Milestone Goals",
      "Weekly Schedule & Timezone Window",
      "Cognitive & Communication Style",
    ],
    note: "“Requirement submitted to our team.”",
  },
  tutor: {
    stream: "Source Stream 02",
    role: "Tutor",
    title: "02. Educator Intake Dossier",
    points: [
      "Academic Qualifications",
      "Subjects & Curricula Taught",
      "Availability & Lesson Formats",
      "Teaching Approach",
    ],
    note: "“Credential details submitted to our team.”",
  },
  desk: {
    badge: "Central Placement Nexus",
    title: "Our Team",
    description:
      "Our team reviews the requirements families submit and the details tutors provide, and considers curriculum, level and schedule.",
    checks: [
      { title: "Request Review", body: "Reviewed individually" },
      { title: "Syllabus Alignment", body: "IB / Cambridge / AP" },
      { title: "Diagnostic Needs", body: "Goals & challenges" },
    ],
    footnote: "Closed-loop administration • Zero automated directory listings",
  },
  outcome: {
    badge: "Convergent Outcome",
    title: "03. We Get in Touch",
    body: "Our team contacts you through your preferred channel to discuss the next steps.",
  },
  privacy: {
    label: "Strict Privacy Protocol:",
    body: "Parents do not browse public tutor lists, and tutor profiles are not published for browsing.",
  },
};

export type JourneyStep = { kicker: string; title: string; body: string };

export const journeysIntro = {
  eyebrow: "Orchestrated Progression",
  title: "The Dual Matching Journeys",
  description:
    "Review how family requests and educator applications are handled.",
};

export const parentJourney = {
  track: "Track 01",
  title: "Parent Journey",
  tag: "For Families",
  cta: "Submit Your Tutoring Requirement",
  steps: [
    {
      kicker: "Initial Consultation",
      title: "Submit Your Requirement",
      body: "Share your child’s grade, curriculum and emirate through our private request form.",
    },
    {
      kicker: "Academic Diagnosis",
      title: "Share Your Learning Needs",
      body: "Tell us about the subject, learning goals and preferred schedule in the message box for our team to review.",
    },
    {
      kicker: "Team Review",
      title: "Our Team Reviews Your Request",
      body: "Our team reviews your requirements and looks for a suitable tutor.",
    },
    {
      kicker: "Next Steps",
      title: "Our Team Gets in Touch",
      body: "We contact you through your preferred channel to discuss the next steps.",
    },
  ] satisfies JourneyStep[],
};

export const tutorJourney = {
  track: "Track 02",
  title: "Tutor Journey",
  tag: "For Educators",
  cta: "Register as a Tutor",
  steps: [
    {
      kicker: "Credential Review",
      title: "Register as a Tutor",
      body: "Provide your academic qualifications and teaching experience for review by our team.",
    },
    {
      kicker: "Curricular Matrix",
      title: "Share Your Teaching Details",
      body: "Specify curricular specialisms (e.g. Further Maths, AP Chem), schedule windows, and teaching approach.",
    },
    {
      kicker: "Review",
      title: "Our Team Reviews Your Information",
      body: "Our team reviews your qualifications and teaching details. When you submit, you consent to Tuteme verifying your identity, qualifications and background.",
    },
    {
      kicker: "Possible Connections",
      title: "Suitable Requests Can Be Connected Through Our Team",
      body: "If a family’s request fits your profile, our team may contact you privately about it.",
    },
  ] satisfies JourneyStep[],
};

export const directoryContrast = {
  eyebrow: "Architectural Distinction",
  title: "Why We Reject the “Search Directory” Model",
  description:
    "Open marketplace platforms make parents sift through long lists of tutor bios. Tuteme works through a private request form instead.",
  points: [
    {
      title: "No Bidding or Public Listings",
      body: "There are no public tutor listings or bidding. Families submit a request and our team gets in touch.",
      tag: "No bidding wars or spam inboxes",
    },
    {
      title: "Tutor Registration",
      body: "Tutors apply through a registration form covering qualifications, subjects, availability and teaching approach.",
      tag: "Application-based",
    },
    {
      title: "Private by Design",
      body: "Tutor profiles and family requests are handled privately through our team and are never published for browsing.",
      tag: "No public listings",
    },
  ],
};

export const howItWorksCta = {
  eyebrow: "Private Academic Concierge",
  title: "Ready to Submit Your Request?",
  description:
    "Tell us what you need. No automated algorithms and no public tutor directory.",
  note: "Inquiries are handled privately by our team.",
};
