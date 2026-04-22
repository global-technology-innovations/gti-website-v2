import { generateCanonicalUrl } from "@/components/seo/PageMeta";
import { siteConfig } from "@/config/site";
import { StrapiLocalizationEntry } from "@/types/strapi";

type DynamicLocalizedContentKind = "service" | "blog" | "project";

interface GenerateDynamicHreflangUrlsOptions {
	kind: DynamicLocalizedContentKind;
	currentLocale: string;
	currentSlug: string;
	currentId: number | string;
	currentTitle?: string | null;
	localizations?: StrapiLocalizationEntry[];
}

const basePathByKind: Record<DynamicLocalizedContentKind, string> = {
	service: "/our-services",
	blog: "/blog",
	project: "/portfolio",
};

export function generateDynamicHreflangUrls({
	kind,
	currentLocale,
	currentSlug,
	currentId,
	currentTitle,
	localizations = [],
}: GenerateDynamicHreflangUrlsOptions) {
	const languages: Record<string, string> = {};
	const currentPath = buildDynamicPath(kind, currentSlug, currentId, currentTitle);

	if (currentPath) {
		languages[currentLocale] = generateCanonicalUrl(currentLocale, currentPath);
	}

	for (const localization of localizations) {
		const localizedLocale = localization.attributes.locale;
		const localizedPath = buildDynamicPath(
			kind,
			localization.attributes.slug ?? null,
			localization.id,
			localization.attributes.title ?? null
		);

		if (!localizedPath) {
			continue;
		}

		languages[localizedLocale] = generateCanonicalUrl(localizedLocale, localizedPath);
	}

	const defaultLocaleUrl = languages[siteConfig.defaultLocale];

	if (defaultLocaleUrl) {
		languages["x-default"] = defaultLocaleUrl;
	}

	return languages;
}

function buildDynamicPath(kind: DynamicLocalizedContentKind, slug: string | null | undefined, id: number | string, title?: string | null) {
	const basePath = basePathByKind[kind];
	const normalizedSlug = slug?.trim();

	if (kind !== "project") {
		return normalizedSlug ? `${basePath}/${normalizedSlug}` : null;
	}

	if (normalizedSlug) {
		return `${basePath}/${normalizedSlug}`;
	}

	const fallbackTitleSlug = slugifyProjectTitle(title ?? "");

	if (fallbackTitleSlug) {
		return `${basePath}/${fallbackTitleSlug}-${id}`;
	}

	return `${basePath}/project-${id}`;
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
