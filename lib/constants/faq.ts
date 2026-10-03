import { curricula, educationLevels, subjectCategories } from "@/lib/constants/taxonomy";
import type { Translator } from "@/lib/i18n/translate";

/**
 * Copy for the FAQ page (/faq).
 * PLACEHOLDER figures and policies from the design (1.8% acceptance, 24–48h matching,
 * chemistry guarantee, vetting steps) must be confirmed by the business before launch (SRS §11, §27).
 * Answers support **bold** spans; keep them plain text otherwise (they are also used for search and JSON-LD).
 */

export const faqHero = {
  eyebrow: "Academic Concierge Knowledge Base • Verified Answers",
  titleLead: "Frequently Asked",
  titleAccent: "Questions",
  description:
    "Everything you need to know about TutorFlow’s private administrative matching model, educator intake standards, and online or in-person lesson delivery.",
  searchPlaceholder: "Search questions or keywords (e.g. matching timeline, exam boards, in-person)",
};

export const faqTopics = [
  { id: "parents", label: "For Parents & Students" },
  { id: "tutors", label: "For Tutors & Educators" },
  { id: "requests", label: "How Requests Work" },
  { id: "delivery", label: "Online & Physical Tutoring" },
  { id: "curricula", label: "Subjects & Curricula" },
  { id: "vetting", label: "Registration & Vetting" },
] as const;

export type FaqTopic = (typeof faqTopics)[number]["id"];

export const conciergeModel = {
  eyebrow: "Administrative Architecture",
  title: "Understanding Our Private Concierge Model",
  badge: "Zero Public Directory Policy",
  steps: [
    {
      tag: "Student Profile",
      title: "Parent Submits Requirement",
      body: "Confidential input: target examination board, current vs. goal grade, learning style, schedule availability, and delivery mode.",
      outcome: "Diagnostic Dossier Created",
    },
    {
      tag: "Director Desk",
      title: "Placement Board Review",
      body: "Senior Academic Directors audit syllabus requirements and previous examiner records, then hand-select an active fellow—no blind algorithms.",
      outcome: "1.8% Selective Master Faculty",
    },
    {
      tag: "Chemistry Session",
      title: "Curated Introduction",
      body: "Receive a formal academic introduction followed by a complimentary 15-minute diagnostic chemistry meeting backed by our placement guarantee.",
      outcome: "Risk-Free Alignment",
    },
  ],
  covenant: "Core Covenant: Zero Public Profiles • Zero Cold Outreach • Zero Algorithmic Guesswork",
  covenantNote: "Credentials and family details remain strictly confidential.",
};

/** Rich blocks rendered after an answer's paragraphs. */
export type FaqExtra = "requestBlueprint" | "vettingStats" | "subjectsLink";

export type Faq = {
  id: string;
  tag: string;
  question: string;
  answer: string[];
  topics: FaqTopic[];
  extra?: FaqExtra;
  /** Paragraphs shown after the extra block. */
  after?: string[];
  /** Values for `{name}` placeholders in the answer; string lists are translated and joined. */
  vars?: Record<string, number | string[]>;
};

export type FaqSection = {
  id: string;
  title: string;
  description: string;
  faqs: Faq[];
};

const subjectCount = subjectCategories.reduce((n, c) => n + c.subjects.length, 0);

export const faqSections: FaqSection[] = [
  {
    id: "parents",
    title: "For Parents, Students & Request Flow",
    description: "How our concierge model serves families with zero friction and guaranteed pedagogical fit.",
    faqs: [
      {
        id: "how-to-request",
        tag: "Step 01",
        question: "How do I request a tutor through TutorFlow?",
        answer: [
          "Requesting an educator does not involve browsing pages of profiles. Instead, parents complete our confidential **6-Step Parent Requirement Form**. Our placement directors use these exact details to manually select a qualified educator from our vetted fellowship.",
        ],
        extra: "requestBlueprint",
        after: [
          "Once received, our Senior Academic Directors review your syllabus benchmarks and learning targets within **24 to 48 hours**, and introduce an educator with expertise in that exact specification.",
        ],
        topics: ["parents", "requests"],
      },
      {
        id: "public-directory",
        tag: "Model",
        question: "Do I choose a tutor directly from a public directory?",
        answer: [
          "No. TutorFlow deliberately has **no public tutor directory**. Tutor profiles are never listed for browsing; instead our directors compare your requirement against the educators in our private fellowship and recommend the best fit.",
          "If you already know a tutor you would like to work with, you can mention them in your request and our team will check their availability.",
        ],
        topics: ["parents", "requests"],
      },
      {
        id: "how-connect",
        tag: "Process",
        question: "How does the platform connect parents and tutors?",
        answer: [
          "Every connection runs through our placement desk. After reviewing your request, a director contacts you by your preferred channel (WhatsApp, phone or email) with a recommended educator and arranges a short introductory chemistry session.",
          "Tutors never cold-contact families, and your contact details are only shared once you agree to proceed.",
        ],
        topics: ["parents", "requests"],
      },
      {
        id: "what-info",
        tag: "Checklist",
        question: "What information do I need to provide in my request?",
        answer: [
          "The form asks for your contact details, the student’s school and year group, the subject and curriculum, your preferred schedule and lesson format, and any learning goals or challenges. You can optionally attach a recent school report or mock exam.",
          "You can save a draft at any point and come back to finish it later on the same device.",
        ],
        topics: ["parents", "requests"],
      },
    ],
  },
  {
    id: "delivery",
    title: "Online & Physical Lesson Delivery",
    description: "Seamless teaching whether studying from home or through private residence visits.",
    faqs: [
      {
        id: "online",
        tag: "Digital Studio",
        question: "Can I request online tutoring? How does it work?",
        answer: [
          "Yes. Choose **Online** in the Subject step of the request form. Online lessons take place live over video with an interactive whiteboard, so your student can learn with a specialist regardless of location or time zone.",
        ],
        topics: ["delivery", "parents"],
      },
      {
        id: "in-person",
        tag: "In-Person",
        question: "Can I request physical (in-person) tutoring?",
        answer: [
          "Yes. Choose **In-person** in the request form and tell us your area. Our directors will only recommend educators who can reliably reach you, at your home or an agreed study location.",
        ],
        topics: ["delivery", "parents"],
      },
      {
        id: "hybrid",
        tag: "Hybrid",
        question: "Can we combine online and in-person sessions (hybrid)?",
        answer: [
          "Many families do. Select the format you would like for most lessons, then mention the hybrid arrangement in the notes step of the request form, and our team will look for an educator who can offer both.",
        ],
        topics: ["delivery", "parents"],
      },
    ],
  },
  {
    id: "tutors",
    title: "For Tutors & Educator Fellowship",
    description: "Confidential registration, faculty review standards, and placement administration.",
    faqs: [
      {
        id: "tutor-registration",
        tag: "Fellowship",
        question: "How does tutor registration work?",
        answer: [
          "Educators do not build self-promotional marketplace listings. Instead, qualified academics apply directly through our **confidential tutor registration form**, covering personal details, subjects and qualifications, availability, and teaching approach.",
        ],
        extra: "vettingStats",
        topics: ["tutors", "vetting"],
      },
      {
        id: "profile-visibility",
        tag: "Confidentiality",
        question: "Will my tutor profile be publicly visible on the internet?",
        answer: [
          "No. Tutor profiles are held privately by our placement team and are never published in a searchable directory. Families only learn about you when a director recommends you for a specific request.",
        ],
        topics: ["tutors", "vetting"],
      },
      {
        id: "guaranteed-students",
        tag: "Compliance",
        question: "Are there guaranteed students or minimum lesson allocations?",
        answer: [
          "No. Placements depend on families’ requirements matching your subjects, levels, location and availability. Keeping your availability up to date gives our directors the best chance of matching you.",
        ],
        topics: ["tutors"],
      },
    ],
  },
  {
    id: "curricula",
    title: "Curricula, Exam Boards & Guarantees",
    description: "Syllabus coverage across primary, secondary, and higher education.",
    faqs: [
      {
        id: "subjects-levels",
        tag: "Coverage",
        question: "What subjects and education levels do you support?",
        answer: [
          "We currently match tutors across **{subjects} subjects** in {disciplines} disciplines, {stages} education stages from early years to postgraduate, and {curricula} curricula including {examples}. If your subject is not listed, choose “Other” and describe it.",
        ],
        vars: {
          subjects: subjectCount,
          disciplines: subjectCategories.length,
          stages: educationLevels.length,
          curricula: curricula.length,
          examples: curricula.slice(0, 3).map((c) => c.name),
        },
        extra: "subjectsLink",
        topics: ["curricula", "parents"],
      },
      {
        id: "chemistry-guarantee",
        tag: "Assurance",
        question: "What is the 100% Placement Chemistry Guarantee?",
        answer: [
          "Every introduction starts with a complimentary 15-minute chemistry session. If the student and educator are not the right fit, we will propose an alternative educator at no extra cost.",
        ],
        topics: ["curricula", "parents", "requests"],
      },
    ],
  },
];

export const vettingStats = [
  {
    value: "1.8%",
    label: "Acceptance Rate",
    body: "Only candidates with documented first-class honours or examiner credentials are admitted.",
  },
  {
    value: "Live Demo",
    label: "Pedagogical Audit",
    body: "Candidates deliver a live 30-minute unseen syllabus explanation to our Academic Council.",
  },
  {
    value: "Tier-1",
    label: "Identity Clearance",
    body: "Full transcript audits with issuing universities and national criminal records vetting.",
  },
];

export const faqCta = {
  eyebrow: "Direct Administrative Liaison",
  title: "Need tailored academic advice?",
  description:
    "Our placement desk is on call to review student diagnostics, curriculum requirements, or bespoke educator availability.",
  whatsapp: "WhatsApp Direct Liaison",
  call: "Director Call (15m response)",
  contact: "Visit Contact Desk",
  primary: "Launch Requirement Wizard",
  secondary: "Apply as Master Educator",
};

/** Strip **bold** markers for search and structured data. */
export const plainText = (s: string) => s.replace(/\*\*/g, "");

/** Translates an answer paragraph and fills its placeholders. */
export const answerText = (text: string, faq: Faq, t: Translator) =>
  t(
    text,
    faq.vars &&
      Object.fromEntries(
        Object.entries(faq.vars).map(([k, v]) => [k, Array.isArray(v) ? v.map((s) => t(s)).join(t(", ")) : v]),
      ),
  );
