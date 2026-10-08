/**
 * Brand and contact details are intentionally configurable (SRS §27).
 * Replace these values with the approved business information.
 */
export const siteConfig = {
  name: "Tutorly",
  description:
    "A modern tutoring ecosystem connecting motivated students and discerning parents with qualified, verified educators across diverse international curriculums and academic tiers.",
  contact: {
    centerName: "Academic Center",
    address: "Level 14, Al Saqr Business Tower, DIFC, Dubai, UAE",
    email: "Tutorlyuae@gmail.com",
  },
  sessionTimings: [
    { days: "Monday – Friday", hours: "8:00 AM – 10:00 PM GST" },
    { days: "Saturday", hours: "9:00 AM – 8:00 PM GST" },
    { days: "Sunday", hours: "Online Sessions Only", highlight: true },
  ],
} as const;

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Subjects", href: "/subjects" },
  { label: "Education Levels", href: "/education-levels" },
  { label: "Special Child", href: "/sen-tutors-dubai" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

/** Primary call to action for parents: the tutor request form. */
export const requestHref = "/request-a-tutor";

/** Request form with the subject step pre-filled (must be a subject from the taxonomy). */
export const requestSubjectHref = (subject: string) => `${requestHref}?subject=${encodeURIComponent(subject)}`;

export const footerTagline =
  "Private concierge academic matching. Delivering personalized Ivy-tier tutors and tailored study roadmaps without impersonal directory searching.";

export const footerNav: { title: string; links: NavItem[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Academic Subjects", href: "/subjects" },
      { label: "Education Levels", href: "/education-levels" },
      { label: "Special Child Tutors in the UAE", href: "/sen-tutors-dubai" },
      { label: "Parent Reviews", href: "/reviews" },
      { label: "Parent Insights", href: "/blog" },
    ],
  },
  {
    title: "Engagement",
    links: [
      { label: "Request a Tutor", href: "/request-a-tutor" },
      { label: "Become an Educator", href: "/become-a-tutor" },
      { label: "Concierge FAQ", href: "/faq" },
      { label: "Contact Academic Advisor", href: "/contact" },
    ],
  },
  {
    title: "Privacy & Trust",
    links: [
      { label: "Private Concierge Care", href: "/tutor-request" },
      { label: "Zero Public Listing Exposure", href: "/privacy" },
      { label: "Dedicated Family Liaison", href: "/contact" },
    ],
  },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Academic Integrity", href: "/academic-integrity" },
];
