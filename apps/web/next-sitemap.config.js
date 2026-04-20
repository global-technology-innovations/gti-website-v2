/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: "https://global-technology-innovations.vercel.app",
	generateRobotsTxt: true,
	generateIndexSitemap: false,
	exclude: ["/api/*", "/_next/*", "/admin/*"],
	changefreq: "weekly",
	priority: 0.7,

	additionalPaths: async (config) => {
		const locales = ["uk", "sk", "cs", "en", "de", "fr"];
		const pages = [
			{ path: "/", priority: 1.0 },
			{ path: "/about", priority: 0.8 },
			{ path: "/outstaffing", priority: 0.8 },
			{ path: "/portfolio", priority: 0.8 },
			{ path: "/contact", priority: 0.8 },
			{ path: "/careers", priority: 0.8 },
			{ path: "/our-services", priority: 0.8 },
			{ path: "/privacy-policy", priority: 0.7 },
			{ path: "/cookies", priority: 0.7 },
		];

		const result = [];

		pages.forEach(({ path, priority }) => {
			locales.forEach((locale) => {
				const url = locale === "uk" ? path : `/${locale}${path}`;

				result.push({
					loc: url,
					changefreq: "weekly",
					priority,
					lastmod: new Date().toISOString(),
				});
			});
		});

		return result;
	},

	robotsTxtOptions: {
		policies: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/api/", "/_next/", "/admin/"],
			},
		],
	},
};
