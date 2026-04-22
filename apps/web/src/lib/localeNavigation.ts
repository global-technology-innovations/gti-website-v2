import { getProjectBySlug } from "@/lib/services/projects";
import { fetchStrapiData } from "@/lib/strapi";

type LocalizedSlugEntry = {
	id: number;
	attributes: {
		locale: string;
		slug?: string | null;
		title?: string;
		localizations?: {
			data: Array<{
				id: number;
				attributes: {
					locale: string;
					slug?: string | null;
					title?: string;
				};
			}>;
		};
	};
};

type LocalizedSlugResponse = {
	data: LocalizedSlugEntry[];
};

export function normalizeLocalizedPathname(pathname: string) {
	if (!pathname || pathname === "/") {
		return "/";
	}

	const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;

	return normalized.replace(/\/+$/, "") || "/";
}

export async function resolveLocalizedPathname(pathname: string, currentLocale: string, targetLocale: string): Promise<string> {
	const normalizedPathname = normalizeLocalizedPathname(pathname);

	if (currentLocale === targetLocale) {
		return normalizedPathname;
	}

	const serviceSlug = matchDynamicSlug(normalizedPathname, "/our-services");

	if (serviceSlug) {
		return (await resolveServicePath(serviceSlug, currentLocale, targetLocale)) ?? "/our-services";
	}

	const blogSlug = matchDynamicSlug(normalizedPathname, "/blog");

	if (blogSlug) {
		return (await resolveBlogPath(blogSlug, currentLocale, targetLocale)) ?? "/blog";
	}

	const projectSlug = matchDynamicSlug(normalizedPathname, "/portfolio");

	if (projectSlug) {
		return (await resolveProjectPath(projectSlug, currentLocale, targetLocale)) ?? "/portfolio";
	}

	return normalizedPathname;
}

function matchDynamicSlug(pathname: string, basePath: string) {
	const pattern = new RegExp(`^${escapeRegex(basePath)}/([^/]+)$`);
	const match = pathname.match(pattern);

	return match?.[1] ?? null;
}

function escapeRegex(value: string) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function resolveServicePath(slug: string, currentLocale: string, targetLocale: string) {
	const response = await fetchStrapiData<LocalizedSlugResponse>(
		"/services",
		{
			locale: currentLocale,
			filters: {
				slug: {
					$eq: slug,
				},
			},
			fields: ["slug", "locale"],
			populate: {
				localizations: {
					fields: ["slug", "locale"],
				},
			},
			pagination: {
				limit: 1,
			},
		},
		{ revalidate: 300 }
	);

	const localizedEntry = response.data[0]?.attributes.localizations?.data.find((entry) => entry.attributes.locale === targetLocale);
	const targetSlug = localizedEntry?.attributes.slug;

	return targetSlug ? `/our-services/${targetSlug}` : null;
}

async function resolveBlogPath(slug: string, currentLocale: string, targetLocale: string) {
	const response = await fetchStrapiData<LocalizedSlugResponse>(
		"/blog-articles",
		{
			locale: currentLocale,
			filters: {
				slug: {
					$eq: slug,
				},
			},
			fields: ["slug", "locale"],
			populate: {
				localizations: {
					fields: ["slug", "locale"],
				},
			},
			pagination: {
				limit: 1,
			},
		},
		{ revalidate: 300 }
	);

	const localizedEntry = response.data[0]?.attributes.localizations?.data.find((entry) => entry.attributes.locale === targetLocale);
	const targetSlug = localizedEntry?.attributes.slug;

	return targetSlug ? `/blog/${targetSlug}` : null;
}

async function resolveProjectPath(slug: string, currentLocale: string, targetLocale: string) {
	const project = await getProjectBySlug(slug, currentLocale);

	if (!project) {
		return null;
	}

	const response = await fetchStrapiData<LocalizedSlugResponse>(
		"/projects",
		{
			locale: currentLocale,
			filters: {
				id: {
					$eq: project.id,
				},
			},
			fields: ["slug", "title", "locale"],
			populate: {
				localizations: {
					fields: ["slug", "title", "locale"],
				},
			},
			pagination: {
				limit: 1,
			},
		},
		{ revalidate: 300 }
	);

	const localizedEntry = response.data[0]?.attributes.localizations?.data.find((entry) => entry.attributes.locale === targetLocale);

	if (!localizedEntry) {
		return null;
	}

	const explicitSlug = localizedEntry.attributes.slug?.trim();

	if (explicitSlug) {
		return `/portfolio/${explicitSlug}`;
	}

	const fallbackTitleSlug = slugifyProjectTitle(localizedEntry.attributes.title ?? "");

	return fallbackTitleSlug ? `/portfolio/${fallbackTitleSlug}-${localizedEntry.id}` : `/portfolio/project-${localizedEntry.id}`;
}

function slugifyProjectTitle(title: string) {
	return title
		.toLocaleLowerCase()
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^\p{Letter}\p{Number}]+/gu, "-")
		.replace(/^-+|-+$/g, "")
		.replace(/-{2,}/g, "-");
}
