import { routing } from "@/i18n/routing";

const FALLBACK_SITE_URL = "https://global-technology-innovations.com";
const CONFIGURED_SITE_URL = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL;

function normalizeSiteUrl(value: string) {
	return value.endsWith("/") ? value.slice(0, -1) : value;
}

export const siteConfig = {
	name: "Global Technology Innovations",
	legalName: "Global Technology Innovations s. r. o.",
	shortName: "GTI",
	url: normalizeSiteUrl(CONFIGURED_SITE_URL),
	defaultLocale: routing.defaultLocale,
	locales: [...routing.locales],
	defaultTitle: "Global Technology Innovations",
	defaultDescription:
		"Global Technology Innovations delivers full-cycle construction, renovation, outstaffing, and project execution services across Slovakia and Europe.",
	defaultOgTitle: "Global Technology Innovations",
	defaultOgDescription:
		"Full-cycle construction and renovation services, commercial fit-outs, project execution, and outstaffing support for modern building teams.",
	themeColor: "#0B2A4A",
	localeNames: {
		uk: "uk_UA",
		sk: "sk_SK",
		cs: "cs_CZ",
		en: "en_US",
		de: "de_DE",
		fr: "fr_FR",
	},
	twitterHandle: "@gti_innovations",
} as const;

export type AppLocale = (typeof siteConfig.locales)[number];

export function getBaseUrl() {
	return new URL(siteConfig.url);
}
