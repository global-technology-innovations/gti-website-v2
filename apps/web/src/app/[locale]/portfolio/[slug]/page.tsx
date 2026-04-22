import {
	BreadcrumbSchema,
	ContactSection,
	generateCanonicalUrl,
	generatePageMetadata,
	ProjectSchema,
	ProjectDetailContentSection,
	ProjectDetailGallerySection,
	ProjectDetailHeroSection,
} from "@/components";
import { formatProjectPeriod, getProjectStatusKey, parseProjectDescription } from "@/components/portfolio/projectDetailUtils";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";
import { generateDynamicHreflangUrls } from "@/lib/localizedSeo";
import { getProjectBySlug, getProjectImageUrl, getProjectSlug, getProjects } from "@/lib/services/projects";
import { cs, de, enUS, fr, sk, uk } from "date-fns/locale";
import { getTranslations } from "next-intl/server";
import { notFound, permanentRedirect } from "next/navigation";

const localeMap = {
	uk,
	sk,
	cs,
	en: enUS,
	fr,
	de,
};

export async function generateStaticParams() {
	const paramsByLocale = await Promise.all(
		routing.locales.map(async (locale) => {
			const projects = await getProjects(locale);

			return projects.map((project) => ({
				locale,
				slug: getProjectSlug(project),
			}));
		})
	);

	return paramsByLocale.flat();
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
	const { locale, slug } = await params;
	const project = await getProjectBySlug(slug, locale);

	if (!project) {
		return {
			robots: {
				index: false,
				follow: false,
			},
		};
	}

	const canonicalSlug = getProjectSlug(project);

	return generatePageMetadata({
		title: project.attributes.title,
		description: project.attributes.shortDescription,
		canonicalUrl: generateCanonicalUrl(locale, `/portfolio/${canonicalSlug}`),
		hreflang: generateDynamicHreflangUrls({
			kind: "project",
			currentLocale: locale,
			currentSlug: canonicalSlug,
			currentId: project.id,
			currentTitle: project.attributes.title,
			localizations: project.attributes.localizations?.data,
		}),
		locale,
		ogImage: getProjectImageUrl(project),
	});
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
	const { locale, slug } = await params;
	const [project, t, tNav] = await Promise.all([
		getProjectBySlug(slug, locale),
		getTranslations({ locale, namespace: "Portfolio" }),
		getTranslations({ locale, namespace: "Header.nav" }),
	]);

	if (!project) {
		notFound();
	}

	const canonicalSlug = getProjectSlug(project);
	if (slug !== canonicalSlug) {
		const redirectPath = locale === siteConfig.defaultLocale ? `/portfolio/${canonicalSlug}` : `/${locale}/portfolio/${canonicalSlug}`;
		permanentRedirect(redirectPath);
	}

	const dateLocale = localeMap[locale as keyof typeof localeMap] || uk;
	const projectPeriod = formatProjectPeriod(project.attributes.startDate, project.attributes.endDate, dateLocale);
	const statusKey = getProjectStatusKey(project.attributes.status);
	const descriptionContent = parseProjectDescription(project.attributes.description);
	const hasGallery = Boolean(project.attributes.images?.data?.length);
	const canonicalUrl = generateCanonicalUrl(locale, `/portfolio/${canonicalSlug}`);

	return (
		<>
			<ProjectSchema
				project={{
					name: project.attributes.title,
					description: project.attributes.shortDescription,
					url: canonicalUrl,
					image: getProjectImageUrl(project),
					startDate: project.attributes.startDate,
					endDate: project.attributes.endDate,
					location: project.attributes.location,
					client: project.attributes.client,
				}}
			/>
			<BreadcrumbSchema
				items={[
					{ name: tNav("home"), url: generateCanonicalUrl(locale, "/") },
					{ name: tNav("portfolio"), url: generateCanonicalUrl(locale, "/portfolio") },
					{ name: project.attributes.title, url: canonicalUrl },
				]}
			/>
			<ProjectDetailHeroSection
				title={project.attributes.title}
				description={project.attributes.shortDescription}
				statusLabel={t(`status.${statusKey}`)}
				projectPeriod={projectPeriod}
				location={project.attributes.location}
				client={project.attributes.client}
				homeLabel={tNav("home")}
				portfolioLabel={tNav("portfolio")}
			/>

			<ProjectDetailContentSection content={descriptionContent} fallbackDescription={project.attributes.shortDescription} />

			{hasGallery ? (
				<ProjectDetailGallerySection
					images={project.attributes.images.data}
					title={project.attributes.title}
					heading={t("projectGalleryTitle")}
					headingHighlight={t("projectGalleryHighlight")}
				/>
			) : null}

			<ContactSection />
		</>
	);
}
