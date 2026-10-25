/**
 * Copy for the Contact page (/contact). Contact details themselves live in `siteConfig.contact`.
 * Unverified response-time claims, the 24/7 desk wording and the liaison card were removed (SRS §11, §27).
 */

export const contactHero = {
  eyebrow: "Get in Touch",
  titleLead: "Let’s",
  titleAccent: "Talk.",
  description:
    "Have a question about finding a tutor or joining as a tutor? Our team is here to assist parents, students, and educators at every stage of their learning journey.",
};

export const contactCardNotes = {
  email: "Send us your question at any time",
};

export const contactFormCopy = {
  title: "Send Us a Message",
  description: "Fill in your details and our team will get back to you.",
  secureBadge: "Secure connection",
  privacy:
    "We respect your privacy. Inquiries are handled by our team.",
  submit: "Send Message",
};

export const audienceOptions = [
  { value: "parent", label: "Parent / Student" },
  { value: "educator", label: "Educator / Tutor" },
  { value: "general", label: "General Inquiry" },
] as const;

export const topicOptions = [
  { value: "tutoring", label: "Tutoring Requirement Inquiry" },
  { value: "application", label: "Tutor Application Question" },
  { value: "placement", label: "Existing Placement Support" },
  { value: "scheduling", label: "Scheduling & Billing" },
  { value: "partnership", label: "Schools & Partnerships" },
  { value: "other", label: "Something Else" },
] as const;

export const MESSAGE_MAX = 1000;

export const pathwaysIntro = {
  eyebrow: "Immediate Pathways",
  title: "Looking for faster resolution?",
  description: "Explore the routes for requesting a tutor, applying as an educator, and common questions.",
};

export const pathways = [
  {
    title: "Parent Matching Wizard",
    body: "Skip general inquiries and tell us your subject, level and timeline to start the matching process.",
    cta: "Launch match wizard",
    href: "/request-a-tutor",
  },
  {
    title: "Join Teaching Faculty",
    body: "Are you an educator? Submit your qualifications and experience directly to our team.",
    cta: "Apply as an educator",
    href: "/tutor-registration",
  },
  {
    title: "Instant Knowledge Base",
    body: "Browse answers on requesting a tutor, lesson formats, tutor registration and the subjects we cover.",
    cta: "Explore knowledge base",
    href: "/faq",
  },
];
