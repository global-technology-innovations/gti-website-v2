import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	const siteUrl = "https://global-technology-innovations.vercel.app";

	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/api/", "/_next/", "/admin/"],
			},
		],
		sitemap: `${siteUrl}/sitemap.xml`,
	};
}
