/**
 * Brand and contact details are intentionally configurable (SRS §27).
 * Replace these values with the approved business information.
 */
export const siteConfig = {
  name: "Tuteme",
  /**
   * Canonical origin used for canonical URLs, hreflang, the sitemap and structured data.
   * Set NEXT_PUBLIC_SITE_URL in production; the fallback is a PLACEHOLDER until the domain is confirmed.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tuteme.ae").replace(/\/+$/, ""),
  description:
    "A modern tutoring service connecting students and parents with tutors across international curricula and academic levels in the UAE.",
  contact: {
    contactHeading: "Get in Touch",
    email: "Tutorlyuae@gmail.com",
    /** WhatsApp number: digits only (wa.me format) and the display form. */
    whatsapp: "971562319741",
    whatsappDisplay: "+971 56 231 9741",
    /** International format for structured data. */
    telephone: "+971562319741",
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
  "Private concierge academic matching. Delivering personalised tutor matches and tailored study roadmaps without impersonal directory searching.";

export const footerNav: { title: string; links: NavItem[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Academic Subjects", href: "/subjects" },
      { label: "Education Levels", href: "/education-levels" },
      { label: "Special Child Tutors in the UAE", href: "/sen-tutors-dubai" },
      { label: "Parent Insights", href: "/blog" },
    ],
  },
  {
    title: "Engagement",
    links: [
      { label: "Request a Tutor", href: "/request-a-tutor" },
      { label: "Become an Educator", href: "/become-a-tutor" },
      { label: "Concierge FAQ", href: "/faq" },
      { label: "Contact Our Team", href: "/contact" },
    ],
  },
  {
    title: "Privacy & Trust",
    links: [
      { label: "Private Concierge Care", href: "/tutor-request" },
      { label: "Zero Public Listing Exposure", href: "/how-it-works" },
      { label: "Get in Touch", href: "/contact" },
    ],
  },
];

/**
 * Legal links (privacy policy, terms, academic integrity) are left out until the approved
 * documents exist: those routes are not built yet, so linking to them would lead to 404s.
 */
export const legalNav: NavItem[] = [];
