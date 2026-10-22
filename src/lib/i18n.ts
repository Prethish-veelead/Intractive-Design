import "server-only";

export const locales = ["th", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "th";

const dictionaries = {
  th: () => import("@/messages/th.json").then((m) => m.default),
  en: () => import("@/messages/en.json").then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["th"]>>;

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const getDictionary = (locale: Locale): Promise<Dictionary> => dictionaries[locale]();
