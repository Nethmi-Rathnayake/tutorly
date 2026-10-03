import { lang } from "next/root-params";
import { arDictionary } from "./ar";
import { defaultLocale, isLocale, type Locale } from "./config";
import { createTranslator, translateDeep } from "./translate";

/** Locale of the current request, from the root `[lang]` segment. Server Components only. */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  return isLocale(value) ? value : defaultLocale;
}

/** Translator for Server Components; loads every Arabic dictionary (none of it reaches the client). */
export async function getT() {
  const locale = await getLocale();
  const t = createTranslator(locale, arDictionary);
  return Object.assign(t, { locale, deep: <T,>(value: T) => translateDeep(value, t) });
}
