/**
 * Copy for the How It Works page (/how-it-works).
 * PLACEHOLDER marketing claims and figures from the design (acceptance rate, connection time,
 * guarantees, testimonial) must be confirmed by the business before launch (SRS §11, §27).
 */

export const howItWorksHero = {
  eyebrow: "Private Concierge Matching Architecture • No Public Directories",
  title: "How Our Tutoring",
  titleAccent: "Connection Works",
  description:
    "A private, director-led placement process engineered to match high achieving students with vetted master educators. No public directories, no search algorithms just bespoke academic curation.",
  badges: [
    "Top 1.8% Acceptance Rate",
    "Enhanced DBS & Degree Verified",
    "Zero Public Profile Exposure",
    "100% Chemistry Trial Guarantee",
  ],
};

export const conciergeNexus = {
  eyebrow: "Central Architectural Flow",
  title: "The Academic Concierge Nexus",
  description: "Every connection is rigorously evaluated and hand-matched by senior placement directors.",
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
    note: "“Confidential specification dispatched securely to placement committee.”",
  },
  tutor: {
    stream: "Source Stream 02",
    role: "Vetted Master Tutor",
    title: "02. Educator Intake Dossier",
    points: [
      "Verified Oxbridge / Ivy Degree Honors",
      "Official Board Examiner Tenure",
      "Enhanced DBS & Identity Clearance",
      "Audited Pedagogical Methodologies",
    ],
    note: "“Private credential dossier submitted securely to Placement Board.”",
  },
  desk: {
    badge: "Central Placement Nexus",
    title: "Academic Directors & Placement Desk",
    description:
      "Senior Academic Directors audit syllabus requirements, verify educator academic transcripts, calibrate pedagogical compatibility, and coordinate schedule alignment.",
    checks: [
      { title: "1:1 Directorship Review", body: "Dean-level oversight" },
      { title: "Syllabus Alignment", body: "IB / Cambridge / AP" },
      { title: "Diagnostic Needs", body: "Mock exam critique" },
    ],
    footnote: "Closed-loop administration • Zero automated directory listings",
  },
  outcome: {
    badge: "Convergent Outcome",
    title: "03. Curated Connection & Chemistry Session",
    body: "A tailored 15-minute diagnostic chemistry call where mentor and learner confirm rapport before lessons commence. Backed by our 100% chemistry guarantee.",
  },
  privacy: {
    label: "Strict Privacy Protocol:",
    body: "Parents never browse unvetted public lists, and educators are never exposed to unsolicited outreach.",
  },
};

export type JourneyStep = { kicker: string; title: string; body: string };

export const journeysIntro = {
  eyebrow: "Orchestrated Progression",
  title: "The Dual Matching Journeys",
  description:
    "Review how our academic concierges orchestrate both family requirements and educator profiles in perfect unison.",
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
      body: "Specify exam boards (IB, Cambridge, AP, GCSE), weekly availability, and target university goals through our private briefing form.",
    },
    {
      kicker: "Academic Diagnosis",
      title: "Share Your Learning Needs",
      body: "Upload recent mock exams, school reports, or diagnostic past papers for thorough director-level academic review and weakness mapping.",
    },
    {
      kicker: "Director Audit",
      title: "Our Team Reviews Your Request",
      body: "Senior Academic Directors dissect the syllabus needs and identify the single ideal-fit match within our active fellowship.",
    },
    {
      kicker: "Bespoke Introduction",
      title: "Our Team Works to Connect You",
      body: "Receive a private dossier introduction followed by a 15-minute chemistry trial to ensure flawless mentor rapport before commencing study.",
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
      kicker: "Credential Verification",
      title: "Register as a Tutor",
      body: "Provide academic credentials, university qualifications, degree transcripts, and proven past student success metrics for committee evaluation.",
    },
    {
      kicker: "Curricular Matrix",
      title: "Share Your Teaching Details",
      body: "Specify curricular specialisms (e.g. Further Maths, AP Chem), examiner affiliations, schedule windows, and pedagogy style.",
    },
    {
      kicker: "Scrutiny & Demonstration",
      title: "Our Team Reviews Your Information",
      body: "Stringent screening, enhanced background checks (DBS/FBI), live teaching demonstrations, and reference confirmations.",
    },
    {
      kicker: "Targeted Placement",
      title: "Suitable Requests Can Be Connected Through Our Team",
      body: "When a relevant family profile surfaces, our Directors contact you privately with confirmed student dossiers and zero cold marketing.",
    },
  ] satisfies JourneyStep[],
};

export const directoryContrast = {
  eyebrow: "Architectural Distinction",
  title: "Why We Reject the “Search Directory” Model",
  description:
    "Open marketplace platforms force parents to sift through hundreds of unvetted bios. Tutorly operates like a private medical or legal advisory bureau.",
  points: [
    {
      title: "Zero Cold Outreach",
      body: "Tutors do not pitch families. Parents are not spammed by automated messages. Every conversation is pre-screened and pre-briefed by our directorship desk.",
      tag: "No bidding wars or spam inboxes",
    },
    {
      title: "Exhaustive Credential Vetting",
      body: "Beyond identity checks, our committee reviews certified transcripts, subject examination papers, and live teaching adaptability (1.8% acceptance rate).",
      tag: "Full transcript & DBS verified",
    },
    {
      title: "Guaranteed Anonymity & Data Protection",
      body: "Prominent family names, high-profile students, and career educators preserve complete privacy with closed-channel documentation and non-disclosure safeguards.",
      tag: "Confidential closed-network files",
    },
  ],
};

export const connectionProof = {
  eyebrow: "Parent Verification",
  quote:
    "Searching online directories had become a second full-time job. With Tutorly, their Academic Director personally analyzed our son’s IB HL Math struggles and assigned an Oxford alumnus in 36 hours. The connection trial was instantaneous chemistry.",
  name: "Helena Radford",
  context: "Mother of IB Diploma Candidate • Westminster School",
  initial: "H",
  photo: "/images/reviews/helena-radford.jpg",
  stats: [
    {
      value: "100%",
      label: "Placement Chemistry Guarantee",
      body: "Free alternative match if rapport does not align in 15 minutes.",
    },
    {
      value: "24–48 hrs",
      label: "Average Connection Time",
      body: "Direct administrative review to curated trial scheduling.",
    },
    {
      value: "0 hrs",
      label: "Spent Sifting Profiles",
      body: "Our directors execute all curation, checking, and logistics.",
    },
  ],
};

export const howItWorksCta = {
  eyebrow: "Private Academic Concierge",
  title: "Ready to Begin Your Curated Connection?",
  description:
    "Experience the confidence of an academic concierge. No automated algorithms, no unsolicited solicitations.",
  note: "All inquiries handled with strict confidentiality by senior academic staff.",
};
