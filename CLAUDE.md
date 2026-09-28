# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project state

Front end of the tutoring marketplace described in the SRS (Online / Physical Tutoring Platform, v1.0). Built so far: the home page (`/`), the tutor request form (`/request-a-tutor`, plus `/success`), the How It Works page (`/how-it-works`, covering both the parent and tutor journeys), the Concierge Matching page for parents (`/tutor-request`), the Subjects page (`/subjects`, a client-side searchable catalogue built from `subjectCategories`, with display copy in `lib/constants/subjects-page.ts`; its cards link to `requestSubjectHref(subject)`, which pre-fills the request form's subject via `?subject=`), the Contact page (`/contact`: details from `siteConfig.contact`, and a single-step react-hook-form + zod form with the server action `app/contact/actions.ts` and stub service `lib/services/contact.ts`, which shows its success state inline), the FAQ page (`/faq`: questions in `lib/constants/faq.ts` with `**bold**` markup, a client-side search/filter accordion, and FAQPage JSON-LD), the tutor recruitment page (`/become-a-tutor`), the tutor registration form (`/tutor-registration`, plus `/success`) and a shared header and footer. There is deliberately **no public tutor directory**: `/tutors/*` and `/find-a-tutor` redirect to `/request-a-tutor` (`next.config.ts`), and every "I Need a Tutor" / "Request a Tutor" button uses `requestHref` (`lib/constants/site.ts`). Other routes linked in the navigation and footer don't exist yet. No database, auth or email is wired up. The SRS says all stats, ratings, reviews and tutor records are placeholders to be replaced with approved data.

## Commands

```bash
npm run dev      # dev server at http://localhost:3000
npm run build    # production build (also type-checks)
npm run start    # serve the production build
npm run lint     # ESLint 9 flat config (eslint.config.mjs: next core-web-vitals + typescript)
npx tsc --noEmit # type-check only
```

No test framework is configured yet.

## Stack notes

- **Next.js 16.3 App Router** with React 19.2 and strict TypeScript. The APIs differ from older Next.js (see AGENTS.md). The bundled docs are in `node_modules/next/dist/docs/01-app/` (`01-getting-started`, `02-guides`, `03-api-reference`). Read the relevant page before using routing, caching, data fetching, `proxy` (the replacement for middleware), or metadata APIs.
- Route props use the globally generated helper types (for example `LayoutProps<"/">` in `app/layout.tsx`, and `PageProps<...>` for pages). These come from `.next/types` and are created by `next dev` / `next build`.
- **Tailwind CSS v4** is configured in CSS, not in a `tailwind.config` file. It is loaded through `@tailwindcss/postcss` (`postcss.config.mjs`), and theme tokens live in `app/globals.css` (`@import "tailwindcss"` plus `@theme inline`, which maps CSS variables such as `--background`/`--foreground` to utilities). There is no dark mode; the site is light-only.
- The Plus Jakarta Sans font is loaded with `next/font/google` in the root layout (`--font-jakarta`). Brand colour tokens (`brand-*`, `ink`, `muted`, `lavender`, `night`) are defined in `app/globals.css`.
- Path alias: `@/*` maps to the repo root (there is no `src/` directory).

## Architecture notes

- **Content & taxonomy:** `lib/constants/taxonomy.ts` holds the SRS §9 subjects, education levels and curricula; forms, filters and matching all reference these ids. Page copy and placeholder marketing figures live in `lib/constants/*`, and tutor records are placeholder data in `lib/data/tutors.ts` (read via `lib/services/tutors.ts`, the seam for a future database).
- **Multi-step intake forms:** both wizards follow the same pattern, built on `useMultiStepForm` (`lib/hooks/use-multi-step-form.ts`). The hook runs a single react-hook-form instance across all steps. Its resolver swaps in the zod schema for the active step, and the last schema validates the whole form. It also saves drafts to localStorage ("Save Draft"; fields in `transientFields` are left out), manages focus between steps, and handles the server action's `SubmitResult`: `fieldErrors` are routed back to the step that owns each field (the `stepFields` arrays). Each form has:
  - a validation module in `lib/validations/` that exports the per-step schemas, the step→field map, the defaults and a full schema. The server action in `app/<route>/actions.ts` re-validates with the full schema, which is the authoritative check. Shared zod helpers (text, phone, email, subject values) live in `lib/validations/common.ts`.
  - step components in `components/forms/<form>/`, with shared UI in `components/forms/wizard-parts.tsx` and `fields.tsx`.
  - a stub persistence service in `lib/services/` that only returns a reference id. There's no database or object storage, so uploads keep file metadata only.
  - a versioned `draftKey`. **Bump it when the step structure changes**, or stale drafts will restore into the wrong steps.
- **Tutor request (`/request-a-tutor`):** 6 steps (Parent → Student → Subject → Schedule → Notes → Review), defined in `lib/validations/tutor-request.ts`, with `lib/services/requests.ts` as the stub persistence service. `TutoringStep` renders the Subject or Schedule step via its `part` prop. The sidebar copy is in `lib/constants/request-page.ts`.
- **Tutor registration (`/tutor-registration`):** 5 steps (Personal → Teaching → Availability → Pedagogy → Review), defined in `lib/validations/tutor-registration.ts`, with `lib/services/tutor-applications.ts` as the stub persistence service. Copy and options are in `lib/constants/tutor-registration.ts`. The marketing page `/become-a-tutor` (`components/become-tutor/sections.tsx`) links to it.
