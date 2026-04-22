import { generateCanonicalUrl, generateHreflangUrls } from "@/components/seo/PageMeta";
import { siteConfig } from "@/config/site";
import { generateDynamicHreflangUrls } from "@/lib/localizedSeo";
import { getBlogArticles } from "@/lib/services/blog";
import { getProjects, getProjectSlug } from "@/lib/services/projects";
import { getServices } from "@/lib/services/services";
import { StrapiFetchError } from "@/lib/strapi";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	// Static pages
	const staticPages = [
		"",
		"/about",
		"/blog",
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
		siteConfig.locales.forEach((locale) => {
			urls.push({
				url: generateCanonicalUrl(locale, page),
				changeFrequency: page === "" ? "weekly" : page === "/blog" ? "weekly" : "monthly",
				priority: page === "" ? 1 : page === "/blog" ? 0.9 : 0.8,
				alternates: {
					languages: generateHreflangUrls(page),
				},
			});
		});
	});

	const localizedDynamicContent = await Promise.all(
		siteConfig.locales.map(async (locale) => {
			try {
				const [articles, projects, services] = await Promise.all([
					getBlogArticles(locale),
					getProjects(locale),
					getServices(locale),
				]);

				return { locale, articles, projects, services };
			} catch (error) {
				if (error instanceof StrapiFetchError && error.status >= 500) {
					console.error(`Skipping sitemap dynamic content for locale "${locale}" because Strapi returned ${error.status}.`);
					return { locale, articles: [], projects: [], services: [] };
				}

				throw error;
			}
		})
	);

	localizedDynamicContent.forEach(({ locale, articles, projects, services }) => {
		articles.forEach((article) => {
			urls.push({
				url: generateCanonicalUrl(locale, `/blog/${article.slug}`),
				lastModified: article.updatedAt
					? new Date(article.updatedAt)
					: article.publishedAt
						? new Date(article.publishedAt)
						: new Date(),
				changeFrequency: "monthly",
				priority: 0.72,
				alternates: {
					languages: generateDynamicHreflangUrls({
						kind: "blog",
						currentLocale: locale,
						currentSlug: article.slug,
						currentId: article.id,
						currentTitle: article.title,
						localizations: article.localizations,
					}),
				},
			});
		});

		projects.forEach((project) => {
			const projectSlug = getProjectSlug(project);

			urls.push({
				url: generateCanonicalUrl(locale, `/portfolio/${projectSlug}`),
				lastModified: project.attributes.updatedAt ? new Date(project.attributes.updatedAt) : new Date(),
				changeFrequency: "monthly",
				priority: 0.76,
				alternates: {
					languages: generateDynamicHreflangUrls({
						kind: "project",
						currentLocale: locale,
						currentSlug: projectSlug,
						currentId: project.id,
						currentTitle: project.attributes.title,
						localizations: project.attributes.localizations?.data,
					}),
				},
			});
		});

		services.forEach((service) => {
			urls.push({
				url: generateCanonicalUrl(locale, `/our-services/${service.slug}`),
				lastModified: service.updatedAt ? new Date(service.updatedAt) : new Date(),
				changeFrequency: "monthly",
				priority: 0.74,
				alternates: {
					languages: generateDynamicHreflangUrls({
						kind: "service",
						currentLocale: locale,
						currentSlug: service.slug,
						currentId: service.id,
						currentTitle: service.title,
						localizations: service.localizations,
					}),
				},
			});
		});
	});

	return urls;
}
