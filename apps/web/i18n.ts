export const locales = ["uk", "sk", "cs", "en", "de", "fr"] as const;
export const defaultLocale = "uk";

export type Locale = (typeof locales)[number];
