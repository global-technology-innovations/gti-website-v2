"use client";

import { FilterChips, ProjectCard, SharedPagination } from "@/components";
import type { ProjectStatusFilter } from "@/lib/services/projects";
import { StrapiProject } from "@/types/strapi";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

const PROJECTS_PER_PAGE = 9;

interface PortfolioListSectionProps {
	projects: StrapiProject[];
}

export function PortfolioListSection({ projects }: PortfolioListSectionProps) {
	const t = useTranslations("PortfolioPage");
	const locale = useLocale();
	const [activeStatus, setActiveStatus] = useState<"all" | ProjectStatusFilter>("all");
	const [currentPage, setCurrentPage] = useState(1);
	const filteredProjects = useMemo(() => {
		if (activeStatus === "all") {
			return projects;
		}

		return projects.filter((project) => project.attributes.status === activeStatus);
	}, [activeStatus, projects]);
	const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE));

	const paginatedProjects = useMemo(() => {
		const start = (currentPage - 1) * PROJECTS_PER_PAGE;
		return filteredProjects.slice(start, start + PROJECTS_PER_PAGE);
	}, [currentPage, filteredProjects]);

	useEffect(() => {
		if (currentPage > totalPages) {
			setCurrentPage(totalPages);
		}
	}, [currentPage, totalPages]);

	const statusFilters = [
		{
			id: "all",
			label: t("allProjects"),
			isActive: activeStatus === "all",
			onClick: () => {
				setActiveStatus("all");
				setCurrentPage(1);
			},
		},
		{
			id: "planned",
			label: t("ProjectCard.status.planned"),
			isActive: activeStatus === "planned",
			onClick: () => {
				setActiveStatus("planned");
				setCurrentPage(1);
			},
		},
		{
			id: "in-progress",
			label: t("ProjectCard.status.inProgress"),
			isActive: activeStatus === "in-progress",
			onClick: () => {
				setActiveStatus("in-progress");
				setCurrentPage(1);
			},
		},
		{
			id: "completed",
			label: t("ProjectCard.status.completed"),
			isActive: activeStatus === "completed",
			onClick: () => {
				setActiveStatus("completed");
				setCurrentPage(1);
			},
		},
	];

	return (
		<div className="container mx-auto px-4 pt-6 lg:pt-16">
			<FilterChips options={statusFilters} />

			{filteredProjects.length > 0 ? (
				<>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
						{paginatedProjects.map((project) => (
							<ProjectCard key={project.id} project={project} locale={locale} />
						))}
					</div>
					{totalPages > 1 ? (
						<SharedPagination currentPage={currentPage} totalPages={totalPages} onChange={setCurrentPage} />
					) : null}
				</>
			) : (
				<div className="flex min-h-[240px] items-center justify-center rounded-3xl border border-dashed border-border text-center text-primary-foreground">
					{t("ProjectsList.results.noResults.title")}
				</div>
			)}
		</div>
	);
}
