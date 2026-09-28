/**
 * Copy for the Concierge Matching page (/tutor-request).
 * PLACEHOLDER marketing claims and figures from the design (24h SLA, 98.4% placement,
 * guarantees, testimonial) must be confirmed by the business before launch (SRS §11, §27).
 */

export const conciergeHero = {
  eyebrow: "Bespoke Academic Matching • Private Concierge Intake",
  title: "Tell Us What You’re Looking For",
  description:
    "Share your learning requirements and our senior educational advisors will hand-match and introduce a fully vetted, world-class tutor tailored specifically to your child.",
  cta: "Start Your Request",
  assurance: "100% Confidential • Reviewed within 24h",
  image: "/images/concierge-hero.jpg",
  imageAlt: "A tutor working one-on-one with a student at a laptop",
  reviewCard: { title: "Administrative Review", body: "Dedicated Academic Director assigned" },
  curatedCard: { title: "100% Curated Match", body: "Zero public browsing or directory clutter" },
  stats: [
    { value: "24h", label: "Match SLA" },
    { value: "98.4%", label: "Placement Success" },
  ],
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
    body: "Our academic directorship analyzes your syllabus criteria and hand-selects rigorously vetted mentors.",
    tag: "Director hand-match",
  },
  {
    step: "04",
    title: "We Help Connect You",
    body: "We introduce your matched tutor with a private briefing and coordinate a complimentary chemistry trial.",
    tag: "Private intro & trial",
  },
];

export const intakeIntro = {
  eyebrow: "Personal Intake Portal",
  title: "Submit Your Tutoring Requirement",
  description:
    "Complete our guided intake. Your submission goes directly to our academic directors to hand-match the ideal educator.",
};

export const assurances = [
  {
    title: "No Public Directory",
    body: "All tutor profiles and family requests are handled with absolute private discretion.",
  },
  {
    title: "Hand-Picked Educators",
    body: "Mentors are chosen directly by senior school leaders and Oxbridge/Ivy specialists.",
  },
  {
    title: "Free Chemistry Trial",
    body: "A 15-minute preliminary trial call ensures student-tutor rapport before any booking.",
  },
  {
    title: "Zero Lock-In Contract",
    body: "Flexible month-to-month or session-by-session arrangements with tutor reassignment protection.",
  },
];

export const conciergeTestimonial = {
  quote:
    "TutorFlow’s concierge matched our son for IB Higher Level Physics within 24 hours. Not having to browse hundreds of unvetted profiles was an absolute revelation. The chemistry was instantaneous.",
  name: "Lady Caroline M.",
  context: "Parent of Year 12 Student, London",
  initial: "L",
};
