/**
 * Copy for the Contact page (/contact). Contact details themselves live in `siteConfig.contact`.
 * PLACEHOLDER response-time claims and the liaison card from the design must be confirmed
 * by the business before launch (SRS §11, §27).
 */

export const contactHero = {
  eyebrow: "Direct Advisory • 24/7 Support Desk",
  titleLead: "Let’s",
  titleAccent: "Talk.",
  description:
    "Have a question about finding a tutor or joining as a tutor? Our academic concierge team is here to assist parents, students, and educators at every stage of their learning journey.",
};

export const contactCardNotes = {
  email: "Response within 2 hours during business hours",
  phone: "Student & parent priority desk",
  address: "Executive consultation & academic offices",
  hours: "Extended weekend coverage for exam periods",
};

export const mapCard = {
  label: "Campus & Advisory Center",
  transit: "Accessible via central transit links",
};

export const liaison = {
  initials: "AL",
  title: "Senior Academic Liaison",
  status: "On duty for curriculum advisement",
  responseLabel: "Average Response",
  responseValue: "< 15 mins",
};

export const contactFormCopy = {
  title: "Send Us a Message",
  description: "Fill in your details and an academic advisor will get back to you promptly.",
  secureBadge: "Secure SSL 256-Bit",
  privacy:
    "We respect your privacy. Inquiries are handled strictly by our administrative team and never shared with third parties.",
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
  description: "Explore specialized portals tailored for rapid matching, faculty applications, and common questions.",
};

export const pathways = [
  {
    title: "Parent Matching Wizard",
    body: "Skip general inquiries and immediately configure your subject, level, and timeline for instant matching.",
    cta: "Launch match wizard",
    href: "/request-a-tutor",
  },
  {
    title: "Join Teaching Faculty",
    body: "Are you an elite educator? Submit curriculum vitae and references directly to the academic council.",
    cta: "Apply as an educator",
    href: "/tutor-registration",
  },
  {
    title: "Instant Knowledge Base",
    body: "Browse answers regarding lesson scheduling, vetted tutor accreditations, and guarantee terms.",
    cta: "Explore knowledge base",
    href: "/faq",
  },
];
