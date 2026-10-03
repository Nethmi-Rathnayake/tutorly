import type { Locale } from "./config";

/**
 * Gettext-style translation: the English copy is the key, and each locale's dictionary maps
 * it to the translated text. Missing entries fall back to English (run `npm run i18n:check`
 * to list them). `{name}` placeholders are filled from `vars`.
 */
export type Dictionary = Record<string, string>;
export type Translator = (text: string, vars?: Record<string, string | number>) => string;

const interpolate = (text: string, vars?: Record<string, string | number>) =>
  vars ? text.replace(/\{(\w+)\}/g, (match, key: string) => (key in vars ? String(vars[key]) : match)) : text;

export function createTranslator(locale: Locale, dictionary: Dictionary): Translator {
  if (locale === "en") return interpolate;
  return (text, vars) => interpolate(dictionary[text] ?? text, vars);
}

// Keys whose values are identifiers or paths rather than display copy. (Form option values are never
// deep-translated: option labels are translated one by one.)
const SKIP_KEYS = new Set(["id", "slug", "href", "image", "src", "icon", "key", "anchor", "tone", "variant"]);

/** Translates every display string in a copy object (skipping ids and paths). */
export function translateDeep<T>(value: T, t: Translator): T {
  if (typeof value === "string") return t(value) as T;
  if (Array.isArray(value)) return value.map((item) => translateDeep(item, t)) as T;
  // Plain objects only: React elements and forwardRef components (e.g. lucide icons) pass through.
  if (value && typeof value === "object" && Object.getPrototypeOf(value) === Object.prototype && !("$$typeof" in value)) {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, SKIP_KEYS.has(k) ? v : translateDeep(v, t)]),
    ) as T;
  }
  return value;
}
