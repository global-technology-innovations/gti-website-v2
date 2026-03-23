"use client";

import {
	ProjectDetailCTASection,
	ProjectDetailContentSection,
	ProjectDetailErrorState,
	ProjectDetailGallerySection,
	ProjectDetailHeroSection,
	ProjectDetailLoadingState,
} from "@/components";
import { formatProjectPeriod, getProjectStatusKey, parseProjectDescription } from "@/components/portfolio/projectDetailUtils";
import { useSingleProjectQuery } from "@/queries/useSingleProjectQuery";
import { cs, de, enUS, fr, sk, uk } from "date-fns/locale";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const localeMap = {
	uk: uk,
	sk: sk,
	cs: cs,
	en: enUS,
	fr: fr,
	de: de,
};

export default function ProjectDetailPage() {
	const params = useParams();
	const slug = params.slug as string;
	const locale = useLocale();
	const t = useTranslations("Portfolio");
	const tNav = useTranslations("Header.nav");

	const { data: project, isLoading, error } = useSingleProjectQuery(slug);

	if (isLoading) {
		return <ProjectDetailLoadingState />;
	}

	if (error || !project) {
		return (
			<ProjectDetailErrorState title={t("projectNotFound")} description={t("projectNotFoundDesc")} backLabel={t("backToPortfolio")} />
		);
	}

	const dateLocale = localeMap[locale as keyof typeof localeMap] || uk;
	const projectPeriod = formatProjectPeriod(project.attributes.startDate, project.attributes.endDate, dateLocale);
	const statusKey = getProjectStatusKey(project.attributes.status);
	const descriptionContent = parseProjectDescription(project.attributes.description);
	const hasGallery = Boolean(project.attributes.images?.data?.length);

	return (
		<>
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

			<ProjectDetailCTASection
				title={t("interestedInProject")}
				description={t("interestedDesc")}
				contactLabel={t("contactUs")}
				servicesLabel={t("ourServices")}
			/>
		</>
	);
}
