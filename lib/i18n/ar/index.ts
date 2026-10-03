import type { Dictionary } from "../translate";
import { about } from "./about";
import { becomeTutor } from "./become-tutor";
import { blog } from "./blog";
import { blogArticles } from "./blog-posts";
import { common } from "./common";
import { concierge } from "./concierge";
import { contact } from "./contact";
import { educationLevelsPage } from "./education-levels";
import { faq } from "./faq";
import { forms } from "./forms";
import { home } from "./home";
import { howItWorks } from "./how-it-works";
import { subjects } from "./subjects";

/**
 * Every Arabic dictionary merged, for Server Components (server.ts). Client Components load only
 * `common` + `forms` plus the page dictionary they pass to `useT` (see client.ts).
 */
export const arDictionary: Dictionary = {
  ...common,
  ...home,
  ...about,
  ...educationLevelsPage,
  ...howItWorks,
  ...becomeTutor,
  ...concierge,
  ...subjects,
  ...faq,
  ...blog,
  ...blogArticles,
  ...contact,
  ...forms,
};
