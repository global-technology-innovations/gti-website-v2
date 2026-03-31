import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";

interface PageMetaData {
	title: string;
	description: string;
	keywords?: string | string[];
	ogImage?: string;
	canonicalUrl?: string;
	hreflang?: { [locale: string]: string };
	locale?: string;
	noIndex?: boolean;
	openGraphType?: "website" | "article";
	publishedTime?: string;
	modifiedTime?: string;
}

// Mapping for correct Open Graph locales
const ogLocaleMap = siteConfig.localeNames;

function normalizePath(path: string = "") {
	if (!path || path === "/") {
		return "";
	}

	return path.startsWith("/") ? path : `/${path}`;
}

export function resolveAbsoluteUrl(pathOrUrl: string) {
	if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
		return pathOrUrl;
	}

	return new URL(pathOrUrl, siteConfig.url).toString();
}

// Helper function to generate canonical URL without default locale
export function generateCanonicalUrl(locale: string, path: string = ""): string {
	const normalizedPath = normalizePath(path);

	// For default locale, don't include locale in URL
	if (locale === siteConfig.defaultLocale) {
		return resolveAbsoluteUrl(normalizedPath || "/");
	}

	return resolveAbsoluteUrl(`/${locale}${normalizedPath}`);
}

// Helper function to generate hreflang URLs
export function generateHreflangUrls(path: string = ""): { [locale: string]: string } {
	const normalizedPath = normalizePath(path);

	const hreflang: { [locale: string]: string } = {};

	for (const locale of routing.locales) {
		hreflang[locale] = generateCanonicalUrl(locale, normalizedPath);
	}

	hreflang["x-default"] = generateCanonicalUrl(siteConfig.defaultLocale, normalizedPath);

	return hreflang;
}

export function generatePageMetadata({
	title,
	description,
	keywords,
	ogImage = "/opengraph-image",
	canonicalUrl,
	hreflang = {},
	locale = "uk",
	noIndex = false,
	openGraphType = "website",
	publishedTime,
	modifiedTime,
}: PageMetaData): Metadata {
	const siteName = siteConfig.name;
	const siteUrl = siteConfig.url;

	const fullTitle = `${title} | ${siteName}`;
	const fullDescription = description;
	const resolvedLocale = ogLocaleMap[locale as keyof typeof ogLocaleMap] || "uk_UA";

	// Parse keywords string into array
	const keywordsArray = Array.isArray(keywords) ? keywords : keywords ? keywords.split(",").map((k) => k.trim()) : undefined;
	const resolvedOgImage = resolveAbsoluteUrl(ogImage);

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
					url: resolvedOgImage,
					width: 1200,
					height: 630,
					alt: title,
				},
			],
			locale: resolvedLocale,
			type: openGraphType,
			...(publishedTime ? { publishedTime } : {}),
			...(modifiedTime ? { modifiedTime } : {}),
		},

		// Twitter Cards
		twitter: {
			card: "summary_large_image",
			title: fullTitle,
			description: fullDescription,
			images: [resolvedOgImage],
			creator: siteConfig.twitterHandle,
			site: siteConfig.twitterHandle,
		},

		// Canonical and alternates
		alternates: {
			canonical: canonicalUrl || siteUrl,
			languages: hreflang,
		},

		// Additional meta
		robots: {
			index: !noIndex,
			follow: !noIndex,
			googleBot: {
				index: !noIndex,
				follow: !noIndex,
				"max-video-preview": -1,
				"max-image-preview": "large",
				"max-snippet": -1,
			},
		},
	};
}

export default generatePageMetadata;
