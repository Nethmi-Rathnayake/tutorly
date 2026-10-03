/**
 * Lists English copy that has no Arabic translation yet.
 *
 * Collects display strings from lib/constants (and the featured tutor records), literal
 * `t("…")` calls in app/, components/ and lib/, and validation / server-action messages,
 * then prints every one missing from the merged Arabic dictionary (lib/i18n/ar).
 * Usage: npm run i18n:check  (exits 1 when something is missing)
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";

const root = fileURLToPath(new URL("..", import.meta.url));
const jiti = createJiti(import.meta.url, { alias: { "@": root } });

// Keys holding ids, paths or search-only text rather than display copy.
const SKIP_KEYS = new Set(["id", "slug", "href", "image", "src", "icon", "key", "anchor", "tone", "variant", "keywords", "short", "initials", "initial", "extra"]);
const BRAND = "TutorFlow";
const isCopy = (s) =>
  /[A-Za-z]/.test(s) &&
  s !== BRAND &&
  !/^[/.]/.test(s) && // paths and file extensions
  !/^[a-z0-9-]+$/.test(s) && // ids and option values
  !/^[a-z]+\/[\w.+-]+$/.test(s) && // MIME types
  !/^[\w.+-]+@/.test(s); // email addresses

const found = new Map(); // text -> first source
const clientKeys = []; // [text, file, extra dictionary names] for strings rendered by Client Components
const add = (text, source) => {
  if (typeof text === "string" && isCopy(text) && !found.has(text)) found.set(text, source);
};

function collect(value, source) {
  if (typeof value === "string") return add(value, source);
  if (Array.isArray(value)) return value.forEach((v) => collect(v, source));
  if (value && typeof value === "object" && Object.getPrototypeOf(value) === Object.prototype && !("$$typeof" in value)) {
    for (const [k, v] of Object.entries(value)) if (!SKIP_KEYS.has(k)) collect(v, source);
  }
}

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : /\.(ts|tsx)$/.test(name) ? [path] : [];
  });

// 1. Copy in lib/constants.
for (const file of walk(join(root, "lib/constants"))) {
  const mod = await jiti.import(file);
  for (const [name, value] of Object.entries(mod)) {
    if (name === "examSessionOptions") collect(value(), relative(root, file));
    else if (typeof value !== "function") collect(value, `${relative(root, file)} (${name})`);
  }
}
// Only featured tutors are shown on the site; every tutor name can appear on the request form.
const { tutors, featuredTutorIds } = await jiti.import(join(root, "lib/data/tutors.ts"));
for (const tutor of tutors) {
  add(tutor.name, "lib/data/tutors.ts");
  if (featuredTutorIds.includes(tutor.id)) {
    const { name, headline, badge, programTags, focusTopics, bio, locationLabel } = tutor;
    collect({ name, headline, badge, programTags, focusTopics, bio, locationLabel }, "lib/data/tutors.ts");
  }
}

// 2. Literal t("…") calls, plus validation and server-action messages.
const literal = /"((?:[^"\\]|\\.)*)"/g;
for (const file of [...walk(join(root, "app")), ...walk(join(root, "components")), ...walk(join(root, "lib"))]) {
  const rel = relative(root, file).replaceAll("\\", "/");
  if (rel.startsWith("lib/i18n/ar/") || rel.startsWith("lib/constants/")) continue;
  const src = readFileSync(file, "utf8");
  const isClient = /^\s*["']use client["']/.test(src);
  // Page dictionaries a client file passes to useT, e.g. `import { faq as faqDictionary } from "@/lib/i18n/ar/faq"`.
  const extra = [...src.matchAll(/import \{ (\w+)(?: as \w+)? \} from "@\/lib\/i18n\/ar\/[\w-]+"/g)].map((m) => m[1]);
  for (const call of src.matchAll(/\b(?:t|tr)\(/g)) {
    // Read the balanced argument list of the call.
    let depth = 0;
    let end = call.index + call[0].length - 1;
    for (; end < src.length; end++) {
      if (src[end] === "(") depth++;
      else if (src[end] === ")" && --depth === 0) break;
    }
    for (const m of src.slice(call.index, end).matchAll(literal)) {
      const text = JSON.parse(`"${m[1]}"`);
      add(text, rel);
      if (isClient && isCopy(text)) clientKeys.push([text, rel, extra]);
    }
  }
  if (rel.startsWith("lib/validations/") || rel.endsWith("actions.ts") || rel.startsWith("lib/hooks/")) {
    for (const m of src.matchAll(/(?:error|message|text): (?:"((?:[^"\\]|\\.)*)"|`([^`$]*)`)/g)) add(m[1] ?? m[2], rel);
    for (const m of src.matchAll(/\b(?:text|optionalText)\("([^"]+)"/g)) add(m[1], rel);
  }
}

const { arDictionary } = await jiti.import(join(root, "lib/i18n/ar/index.ts"));
const missing = [...found].filter(([text]) => !(text in arDictionary));

// Client Components only get `common` + `forms` plus the page dictionaries they import.
const dictionaries = {};
for (const file of walk(join(root, "lib/i18n/ar"))) Object.assign(dictionaries, await jiti.import(file));
const clientMissing = clientKeys.filter(
  ([text, , extra]) => text in arDictionary && ![dictionaries.common, dictionaries.forms, ...extra.map((n) => dictionaries[n])].some((d) => d && text in d),
);
for (const [text, source] of clientMissing) missing.push([text, `${source} (client: move to common/forms or the page dictionary it imports)`]);

if (missing.length === 0) {
  console.log(`All ${found.size} strings have an Arabic translation.`);
} else {
  for (const [text, source] of missing) console.log(`${source}\t${JSON.stringify(text)}`);
  console.log(`\n${missing.length} of ${found.size} strings are missing an Arabic translation.`);
  process.exitCode = 1;
}
