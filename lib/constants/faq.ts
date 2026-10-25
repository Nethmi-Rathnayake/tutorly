import { curricula, educationLevels, subjectCategories } from "@/lib/constants/taxonomy";
import type { Translator } from "@/lib/i18n/translate";

/**
 * Copy for the FAQ page (/faq).
 * Unverified figures (acceptance rate, matching times), guarantees and screening claims were removed;
 * add them back only with approved content (SRS §11, §27).
 * Answers support **bold** spans; keep them plain text otherwise (they are also used for search and JSON-LD).
 */

export const faqHero = {
  eyebrow: "Academic Concierge Knowledge Base",
  titleLead: "Frequently Asked",
  titleAccent: "Questions",
  description:
    "Everything you need to know about requesting a tutor, tutor registration, and online or in-person lessons with Tuteme.",
  searchPlaceholder: "Search questions or keywords (e.g. request form, exam boards, in-person)",
};

export const faqTopics = [
  { id: "parents", label: "For Parents & Students" },
  { id: "tutors", label: "For Tutors & Educators" },
  { id: "requests", label: "How Requests Work" },
  { id: "delivery", label: "Online & Physical Tutoring" },
  { id: "curricula", label: "Subjects & Curricula" },
  { id: "vetting", label: "Tutor Registration" },
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
      body: "Share your child’s grade, curriculum, emirate and any notes through the request form.",
      outcome: "Request Received",
    },
    {
      tag: "Our Team",
      title: "Team Review",
      body: "Our team reviews your request and looks for a suitable tutor, with no public directory to browse.",
      outcome: "Request Reviewed",
    },
    {
      tag: "Next Steps",
      title: "We Contact You",
      body: "Our team contacts you through your preferred channel (WhatsApp, phone or email) about the next steps.",
      outcome: "Preferred Channel",
    },
  ],
  covenant: "Core Covenant: Zero Public Profiles • Zero Algorithmic Guesswork",
  covenantNote: "Tutor profiles are never published for browsing.",
};

/** Rich blocks rendered after an answer's paragraphs. */
export type FaqExtra = "subjectsLink";

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
    description: "How requesting a tutor works, from the request form to our team contacting you.",
    faqs: [
      {
        id: "how-to-request",
        tag: "Step 01",
        question: "How do I request a tutor through Tuteme?",
        answer: [
          "Requesting a tutor does not involve browsing pages of profiles. Instead, parents complete our short **Parent Requirement Form**. Our team uses these details to look for a suitable tutor.",
        ],
        after: [
          "Once your request is received, our team reviews it and contacts you through your preferred channel.",
        ],
        topics: ["parents", "requests"],
      },
      {
        id: "public-directory",
        tag: "Model",
        question: "Do I choose a tutor directly from a public directory?",
        answer: [
          "No. Tuteme deliberately has **no public tutor directory**. Tutor profiles are never listed for browsing; instead our team reviews your requirement and looks for a suitable tutor.",
          "If you already know a tutor you would like to work with, you can mention them in your request and our team will check their availability.",
        ],
        topics: ["parents", "requests"],
      },
      {
        id: "how-connect",
        tag: "Process",
        question: "How does the platform connect parents and tutors?",
        answer: [
          "Every request is handled by our team. After reviewing your request, we contact you by your preferred channel (WhatsApp, phone or email) about the next steps.",
        ],
        topics: ["parents", "requests"],
      },
      {
        id: "what-info",
        tag: "Checklist",
        question: "What information do I need to provide in my request?",
        answer: [
          "The form asks for your name and role, your contact details and preferred contact method, the student’s grade or year, curriculum and emirate, and an optional message about the subject, learning goals and preferred schedule.",
          "You can save a draft at any point and come back to finish it later on the same device.",
        ],
        topics: ["parents", "requests"],
      },
    ],
  },
  {
    id: "delivery",
    title: "Online & Physical Lesson Delivery",
    description: "Online lessons, or in-person lessons where a tutor is available.",
    faqs: [
      {
        id: "online",
        tag: "Digital Studio",
        question: "Can I request online tutoring? How does it work?",
        answer: [
          "Yes. Mention in the message box of the request form that you would like **online** lessons, and our team will look for a tutor who teaches online.",
        ],
        topics: ["delivery", "parents"],
      },
      {
        id: "in-person",
        tag: "In-Person",
        question: "Can I request physical (in-person) tutoring?",
        answer: [
          "Yes. Mention in the message box of the request form that you would like **in-person** lessons, along with your area. Our team will look for a tutor who can reach you.",
        ],
        topics: ["delivery", "parents"],
      },
      {
        id: "hybrid",
        tag: "Hybrid",
        question: "Can we combine online and in-person sessions (hybrid)?",
        answer: [
          "Yes. Mention the hybrid arrangement in the message box of the request form, and our team will look for a tutor who can offer both.",
        ],
        topics: ["delivery", "parents"],
      },
    ],
  },
  {
    id: "tutors",
    title: "For Tutors & Educators",
    description: "How tutor registration works.",
    faqs: [
      {
        id: "tutor-registration",
        tag: "Fellowship",
        question: "How does tutor registration work?",
        answer: [
          "Educators do not build self-promotional marketplace listings. Instead, qualified academics apply directly through our **tutor registration form**, covering personal details, subjects and qualifications, availability, and teaching approach. When you submit it, you consent to Tuteme verifying your identity, qualifications and background.",
        ],
        topics: ["tutors", "vetting"],
      },
      {
        id: "profile-visibility",
        tag: "Confidentiality",
        question: "Will my tutor profile be publicly visible on the internet?",
        answer: [
          "No. Tuteme does not publish tutor profiles in a searchable directory. Families only learn about you if our team recommends you for a specific request.",
        ],
        topics: ["tutors", "vetting"],
      },
      {
        id: "guaranteed-students",
        tag: "Compliance",
        question: "Are there guaranteed students or minimum lesson allocations?",
        answer: [
          "No. Placements depend on families’ requirements matching your subjects, levels, location and availability. Keeping your availability up to date gives our team the best chance of matching you.",
        ],
        topics: ["tutors"],
      },
    ],
  },
  {
    id: "curricula",
    title: "Curricula & Exam Boards",
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
    ],
  },
];

export const faqCta = {
  eyebrow: "Need More Help?",
  title: "Need tailored academic advice?",
  description:
    "Our team can review your student’s curriculum requirements and educator availability.",
  contact: "Visit Contact Desk",
  primary: "Launch Requirement Wizard",
  secondary: "Apply as an educator",
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
