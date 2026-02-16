import { Metadata } from "next";

interface PageMetaData {
	title: string;
	description: string;
	keywords?: string;
	ogImage?: string;
	canonicalUrl?: string;
	hreflang?: { [locale: string]: string };
	locale?: string;
}

// Mapping for correct Open Graph locales
const ogLocaleMap: { [key: string]: string } = {
	uk: "uk_UA",
	sk: "sk_SK",
	cs: "cs_CZ",
	en: "en_US",
	de: "de_DE",
	fr: "fr_FR",
};

// Helper function to generate canonical URL without default locale
export function generateCanonicalUrl(locale: string, path: string = ""): string {
	const siteUrl = "https://global-technology-innovations.vercel.app";
	const defaultLocale = "uk";

	// For default locale, don't include locale in URL
	if (locale === defaultLocale) {
		return `${siteUrl}${path}`;
	}

	return `${siteUrl}/${locale}${path}`;
}

// Helper function to generate hreflang URLs
export function generateHreflangUrls(path: string = ""): { [locale: string]: string } {
	const siteUrl = "https://global-technology-innovations.vercel.app";
	const defaultLocale = "uk";
	const locales = ["uk", "sk", "cs", "en", "de", "fr"];

	const hreflang: { [locale: string]: string } = {};

	for (const locale of locales) {
		if (locale === defaultLocale) {
			hreflang[locale] = `${siteUrl}${path}`;
		} else {
			hreflang[locale] = `${siteUrl}/${locale}${path}`;
		}
	}

	return hreflang;
}

export function generatePageMetadata({
	title,
	description,
	keywords,
	ogImage = "/og-image.png",
	canonicalUrl,
	hreflang = {},
	locale = "uk",
}: PageMetaData): Metadata {
	const siteName = "Global Technology Innovations";
	const siteUrl = "https://global-technology-innovations.vercel.app";

	const fullTitle = `${title} | ${siteName}`;
	const fullDescription = description;

	// Parse keywords string into array
	const keywordsArray = keywords ? keywords.split(",").map((k) => k.trim()) : undefined;

	return {
		title: fullTitle,
		description: fullDescription,
		keywords: keywordsArray,
		authors: [{ name: siteName }],
		creator: siteName,
		publisher: siteName,

		// Open Graph
		openGraph: {
			title: fullTitle,
			description: fullDescription,
			url: canonicalUrl || siteUrl,
			siteName: siteName,
			images: [
				{
					url: `${siteUrl}${ogImage}`,
					width: 1200,
					height: 630,
					alt: title,
				},
			],
			locale: ogLocaleMap[locale] || "uk_UA",
			type: "website",
		},

		// Twitter Cards
		twitter: {
			card: "summary_large_image",
			title: fullTitle,
			description: fullDescription,
			images: [`${siteUrl}${ogImage}`],
			creator: "@gti_innovations",
		},

		// Canonical and alternates
		alternates: {
			canonical: canonicalUrl || siteUrl,
			languages: hreflang,
		},

		// Additional meta
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				"max-video-preview": -1,
				"max-image-preview": "large",
				"max-snippet": -1,
			},
		},
	};
}

export default generatePageMetadata;
