/**
 * Blog articles (/blog and /blog/[slug]). The constants file is the seam for a future CMS:
 * pages only read posts through `blogPosts`, `getPostBySlug` and `featuredPost`.
 * PLACEHOLDER: authors, publication dates and every figure or accreditation claim in these
 * articles (grade boost rate, match counts, the top 3% acceptance rate, KHDA/ADEK alignment,
 * response times) must be replaced with approved content before launch (SRS §11, §27).
 */

export type BlogCategoryId = "curriculum" | "exams" | "parents" | "uae";

export const blogCategories: { id: BlogCategoryId | "all"; label: string }[] = [
  { id: "all", label: "All Articles" },
  { id: "curriculum", label: "Curriculum Guides" },
  { id: "exams", label: "Exam Strategies" },
  { id: "parents", label: "Parent Advice" },
  { id: "uae", label: "UAE Education Insights" },
];

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string }
  | { type: "note"; title: string; body: string }
  | {
      type: "curricula";
      cards: { icon: "british" | "ib" | "american"; tag: string; title: string; body: string; chips: string[] }[];
    }
  | { type: "compare"; risk: { title: string; items: string[] }; ours: { title: string; items: string[] } }
  | { type: "images"; images: { src: string; alt: string }[] }
  | { type: "steps"; steps: { title: string; body: string }[] };

export type ArticleSection = { id: string; title: string; blocks: ArticleBlock[] };

export type BlogPost = {
  slug: string;
  category: BlogCategoryId;
  title: string;
  excerpt: string;
  /** Short label on the card image and the article's first pill. */
  kicker: string;
  /** Card meta line: audience and series. */
  levels: string;
  series: string;
  readMinutes: number;
  /** ISO dates (formatted per locale when rendered). */
  publishedAt: string;
  updatedAt?: string;
  author: { name: string; role: string; initials: string };
  image: { src: string; alt: string };
  badges?: string[];
  heroStats?: { value: string; label: string }[];
  tags: string[];
  sections: ArticleSection[];
  featured?: boolean;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "find-the-best-private-tutors-dubai-abu-dhabi",
    category: "uae",
    featured: true,
    title: "How to Find the Best Private Tutors in Dubai & Abu Dhabi: A Parent’s Complete Guide",
    excerpt:
      "Looking for reliable private tutors in Dubai or Abu Dhabi? Discover how hand-picked, expert home tutors help UAE students excel in British, American and IB curricula.",
    kicker: "UAE Academic Guide",
    levels: "All Levels",
    series: "Parent Guide",
    readMinutes: 6,
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-29",
    author: {
      name: "Academic Advisory Team",
      role: "Reviewed by our Senior Curriculum Directors",
      initials: "AA",
    },
    image: { src: "/images/concierge-hero.jpg", alt: "A tutor reviewing work on a laptop with a secondary student" },
    badges: ["KHDA & ADEK Aligned"],
    heroStats: [
      { value: "98.4%", label: "Grade Boost Rate" },
      { value: "1,850+", label: "Matches in UAE" },
    ],
    tags: ["Dubai Tutors", "Abu Dhabi Mentors", "IB Diploma", "IGCSE", "KHDA Guidelines"],
    sections: [
      {
        id: "rising-demand",
        title: "The Rising Demand for Home Tutoring in the UAE",
        blocks: [
          {
            type: "paragraph",
            text: "Navigating the educational landscape across Dubai and Abu Dhabi presents a unique set of challenges and opportunities. Home to some of the world’s most prestigious international private schools, the United Arab Emirates has an intensely ambitious academic climate. Students are continually benchmarked against stringent global criteria, from rigorous UK examinations to demanding American AP percentiles and comprehensive IB score thresholds.",
          },
          {
            type: "paragraph",
            text: "While leading private schools provide stellar facilities and world-class curricula, even the most capable educators must manage classrooms of twenty to twenty-five pupils. In busy classrooms, teachers naturally follow a group pace, which can leave quieter students with unaddressed foundational gaps and fast learners without enough stretch. Parents with their sights on leading global universities also need their children to achieve not just passing marks, but consistently top grades.",
          },
          {
            type: "quote",
            text: "Every child learns at a unique pace. In a bustling UAE classroom, targeted private mentorship bridges the gap between potential and peak academic performance.",
          },
          {
            type: "paragraph",
            text: "As a result, personalised in-home and online tutoring has moved from a remedial safety net to an essential part of many families’ academic plans. A dedicated private mentor offers continuous diagnostic feedback, a revision schedule built around the student, and reassurance tailored to each young learner’s personality.",
          },
        ],
      },
      {
        id: "matching-curriculum",
        title: "Matching the Right Curriculum: British, American, and IB",
        blocks: [
          {
            type: "paragraph",
            text: "A common mistake is hiring a generic tutor who treats every syllabus the same way. Academic excellence in Dubai and Abu Dhabi requires mentors with deep, board-specific knowledge, because each framework demands its own skills, answer structures and examination command words.",
          },
          {
            type: "curricula",
            cards: [
              {
                icon: "british",
                tag: "IGCSE & A-Levels",
                title: "British Curriculum",
                body: "Exam-board precision across Edexcel, Cambridge (CAIE) and AQA. Success depends on careful past-paper practice against mark schemes and exact interpretation of command words such as evaluate, deduce and assess.",
                chips: ["CAIE", "Edexcel", "AQA Mark Schemes"],
              },
              {
                icon: "ib",
                tag: "PYP • MYP • DP",
                title: "International Baccalaureate",
                body: "Conceptual, inquiry-led learning that needs structured support for Internal Assessments (IA), Theory of Knowledge (TOK) essays and the 4,000-word Extended Essay (EE), alongside HL and SL syllabus content.",
                chips: ["IA Guidance", "TOK Coaching", "EE Mentorship"],
              },
              {
                icon: "american",
                tag: "AP & High School",
                title: "American Curriculum",
                body: "Protecting a cumulative GPA every year, combined with College Board Advanced Placement (AP) exam preparation, SAT/ACT maths practice and analytical reading strategies.",
                chips: ["AP College Board", "GPA Strategy", "Digital SAT"],
              },
            ],
          },
          {
            type: "note",
            title: "UAE Ministry of Education (MoE) & CBSE Support",
            body: "Beyond Western systems, we also support students sitting UAE Ministry of Education (MoE) Arabic and Islamic Studies examinations, as well as Indian CBSE Grade 10 and 12 Board examinations, across Dubai, Abu Dhabi and the Northern Emirates.",
          },
        ],
      },
      {
        id: "hand-picked-tutors",
        title: "Why Hand-Picked Expert Tutors Matter",
        blocks: [
          {
            type: "paragraph",
            text: "When looking for support, many UAE families turn to open social media groups, unvetted directories or classified listings. While these may seem inexpensive, they expose parents to real reliability risks, frequent last-minute cancellations and teachers without proper teaching qualifications.",
          },
          {
            type: "paragraph",
            text: "Subject knowledge alone does not make an inspiring educator. Tutoring young minds demands a blend of syllabus command, empathy, active listening and compliance with KHDA and ADEK conduct standards.",
          },
          {
            type: "compare",
            risk: {
              title: "Unvetted Public Freelancers",
              items: [
                "Unverified credentials and self-reported degrees, with no document checks.",
                "No background screening or child safeguarding clearance.",
                "Unpredictable attendance during critical final revision weeks.",
                "Outdated materials that miss the latest exam rubric updates.",
              ],
            },
            ours: {
              title: "Hand-Picked Concierge Matching",
              items: [
                "A selective top 3% acceptance rate, with qualifications verified for every tutor.",
                "UAE police clearance and international safeguarding checks.",
                "A dedicated academic coordinator for attendance, progress reports and replacements.",
                "Curriculum specialists working from current official mark schemes and examiner reports.",
              ],
            },
          },
          {
            type: "images",
            images: [
              { src: "/images/next-generation.jpg", alt: "Students talking through a lesson together around a table" },
              { src: "/images/hero-main.jpg", alt: "A tutor taking notes on a tablet during a group study session" },
            ],
          },
        ],
      },
      {
        id: "how-we-help",
        title: "How We Can Help Your Family",
        blocks: [
          {
            type: "paragraph",
            text: "We take the stress out of finding an exceptional private mentor. Our concierge process matches students across Dubai, Abu Dhabi and Sharjah with educators who suit their learning style and schedule.",
          },
          {
            type: "steps",
            steps: [
              {
                title: "Submit Your Child’s Requirements",
                body: "Tell us your child’s year group, exam board (Cambridge, Edexcel, IBDP), the topics they find difficult, their target grades and your preferred lesson times.",
              },
              {
                title: "Careful Hand-Selection",
                body: "Our academic placement directors review your needs and propose a verified educator matched to your child’s personality and curriculum goals.",
              },
              {
                title: "Chemistry Trial Session",
                body: "Start with a no-obligation introductory session and confirm the tutor–student connection before committing to a regular timetable, with no lock-in contract.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "british-vs-ib-vs-american-curriculum",
    category: "curriculum",
    title: "British vs. IB vs. American: Choosing the Right Academic Path",
    excerpt:
      "A clear breakdown of grading, internal assessments (IA) and university admission expectations across the curricula offered by schools in Dubai and Abu Dhabi.",
    kicker: "Curriculum Comparison",
    levels: "Secondary & Sixth Form",
    series: "Term Guide",
    readMinutes: 5,
    publishedAt: "2026-09-22",
    author: { name: "Dr. Rania Al-Sayed", role: "Head of Curriculum Advisory", initials: "RA" },
    image: { src: "/images/hero-library.jpg", alt: "Students laughing while studying together in a library" },
    tags: ["British Curriculum", "IB Diploma", "American Curriculum", "University Admissions"],
    sections: [
      {
        id: "how-progress-is-measured",
        title: "How Each System Measures Progress",
        blocks: [
          {
            type: "paragraph",
            text: "The British pathway builds towards externally marked IGCSE and A-Level examinations, so final papers carry most of the weight. The IB Diploma combines six subject examinations with internally assessed coursework, the Extended Essay and Theory of Knowledge. American schools track a cumulative GPA across every year of high school, alongside AP examinations and the SAT or ACT.",
          },
        ],
      },
      {
        id: "which-learners-thrive",
        title: "Which Learners Thrive Where",
        blocks: [
          {
            type: "paragraph",
            text: "Students who enjoy depth and specialisation often flourish in A-Levels, where they focus on three or four subjects. Broad, curious learners who manage deadlines well tend to suit the IB. Students who perform consistently through the year, rather than peaking in final exams, often benefit from the American model’s continuous assessment.",
          },
          {
            type: "quote",
            text: "There is no universally best curriculum, only the best fit for a particular learner’s strengths, goals and university plans.",
          },
        ],
      },
      {
        id: "university-applications",
        title: "Planning for University Applications",
        blocks: [
          {
            type: "paragraph",
            text: "UK universities make offers based on predicted A-Level or IB grades, US admissions weigh GPA, AP results and extracurricular depth, and many universities in the UAE accept all three. Before switching systems, consider your child’s likely destination and speak with an advisor about the transition, especially in the years before final examinations.",
          },
        ],
      },
    ],
  },
  {
    slug: "gcse-a-level-science-revision",
    category: "exams",
    title: "Mastering GCSE & A-Level Sciences: Revision Protocols That Work",
    excerpt:
      "How diagnostic past-paper analysis, command-word practice and structured one-to-one gap remediation help students turn science predictions into top grades.",
    kicker: "Exam Preparation",
    levels: "Edexcel & Cambridge CAIE",
    series: "STEM Focus",
    readMinutes: 4,
    publishedAt: "2026-09-15",
    author: { name: "Marcus Chen, M.Sc.", role: "Senior Science Mentor", initials: "MC" },
    image: { src: "/images/inspiring.jpg", alt: "A tutor pointing at a laptop screen during a revision session" },
    tags: ["GCSE", "A-Level", "Sciences", "Revision"],
    sections: [
      {
        id: "diagnostic-past-paper",
        title: "Start With a Diagnostic Past Paper",
        blocks: [
          {
            type: "paragraph",
            text: "Effective revision begins with evidence, not guesswork. A timed past paper, marked strictly against the official mark scheme, shows exactly which topics and question styles are losing marks. Tutors then rank these gaps by how often they appear and how many marks they carry.",
          },
        ],
      },
      {
        id: "command-words",
        title: "Master the Command Words",
        blocks: [
          {
            type: "paragraph",
            text: "Many marks are lost by answering the wrong question. Describe, explain, evaluate and calculate each demand a different answer structure. Practising short answers against examiner reports teaches students to give exactly what each command word requires.",
          },
        ],
      },
      {
        id: "spaced-revision",
        title: "Build a Spaced Revision Cycle",
        blocks: [
          {
            type: "paragraph",
            text: "Short, regular sessions that revisit topics over several weeks outperform last-minute cramming. Combine active recall, topic-specific question banks and a full mock paper every few weeks, then adjust the plan based on the results.",
          },
          { type: "quote", text: "Consistent, targeted practice beats long hours of passive re-reading every time." },
        ],
      },
    ],
  },
  {
    slug: "early-literacy-phonics-ks1-ks2",
    category: "parents",
    title: "Nurturing Early Literacy & Phonics: Essential Milestones for KS1 & KS2",
    excerpt:
      "Building confidence in phonics, reading comprehension and mental arithmetic through calm, personalised one-to-one sessions.",
    kicker: "Early Years & Primary",
    levels: "Primary & Foundation",
    series: "Parent Advice",
    readMinutes: 4,
    publishedAt: "2026-08-28",
    author: { name: "Sarah Hughes, B.Ed.", role: "Primary Literacy Specialist", initials: "SH" },
    image: { src: "/images/become-tutor-hero.jpg", alt: "A smiling tutor preparing a lesson on a tablet" },
    tags: ["Phonics", "KS1", "KS2", "Reading"],
    sections: [
      {
        id: "ks1-milestones",
        title: "Key Milestones in KS1",
        blocks: [
          {
            type: "paragraph",
            text: "In Key Stage 1, children move from recognising letter sounds to blending them fluently into words, then reading simple sentences with expression. By the end of Year 2, most children decode familiar words automatically and can talk about what they have read.",
          },
        ],
      },
      {
        id: "ks2-comprehension",
        title: "Building Comprehension in KS2",
        blocks: [
          {
            type: "paragraph",
            text: "Key Stage 2 shifts the focus from decoding to understanding. Children learn to infer meaning, summarise ideas and explain an author’s choices. Regular shared reading at home, with open questions about characters and events, strengthens these skills considerably.",
          },
        ],
      },
      {
        id: "extra-support",
        title: "When Extra Support Helps",
        blocks: [
          {
            type: "paragraph",
            text: "If a child avoids reading aloud, guesses words from pictures or tires quickly, a short period of calm, one-to-one support can rebuild confidence. A specialist tutor uses playful, multi-sensory activities so progress feels like a game rather than a test.",
          },
          {
            type: "quote",
            text: "Confidence comes first. Once a child feels capable, reading progress follows naturally.",
          },
        ],
      },
    ],
  },
];

export const featuredPost = blogPosts.find((p) => p.featured) ?? blogPosts[0];

export const getPostBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);
