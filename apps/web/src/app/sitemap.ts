import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const siteUrl = "https://global-technology-innovations.vercel.app";
	const locales = ["uk", "sk", "cs", "en", "de", "fr"];
	const defaultLocale = "uk";

	// Static pages
	const staticPages = [
		"",
		"/about",
		"/outstaffing",
		"/portfolio",
		"/contact",
		"/careers",
		"/our-services",
		"/privacy-policy",
		"/cookie-policy",
	];

	// Generate URLs for all locales
	const urls: MetadataRoute.Sitemap = [];

	staticPages.forEach((page) => {
		locales.forEach((locale) => {
			const path = locale === defaultLocale ? page : `/${locale}${page}`;
			const url = `${siteUrl}${path}`;

			urls.push({
				url,
				lastModified: new Date(),
				changeFrequency: page === "" ? "weekly" : "monthly",
				priority: page === "" ? 1 : 0.8,
				alternates: {
					languages: locales.reduce(
						(acc, loc) => {
							const altPath = loc === defaultLocale ? page : `/${loc}${page}`;
							acc[loc] = `${siteUrl}${altPath}`;
							return acc;
						},
						{} as Record<string, string>
					),
				},
			});
		});
	});

	return urls;
}
