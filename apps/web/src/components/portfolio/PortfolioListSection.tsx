"use client";

import { CardGridSkeleton, FilterChips, FilterChipsSkeleton, ProjectCard, Reveal, SharedPagination } from "@/components";
import { ProjectStatusFilter, useProjectsQuery } from "@/queries";
import { AlertCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

const PROJECTS_PER_PAGE = 9;

export function PortfolioListSection() {
	const t = useTranslations("PortfolioPage");
	const locale = useLocale();
	const [activeStatus, setActiveStatus] = useState<"all" | ProjectStatusFilter>("all");
	const [currentPage, setCurrentPage] = useState(1);
	const selectedStatus = activeStatus === "all" ? undefined : activeStatus;
	const { data: projects = [], isLoading, isFetching, error } = useProjectsQuery(selectedStatus);
	const totalPages = Math.max(1, Math.ceil(projects.length / PROJECTS_PER_PAGE));

	const paginatedProjects = useMemo(() => {
		const start = (currentPage - 1) * PROJECTS_PER_PAGE;
		return projects.slice(start, start + PROJECTS_PER_PAGE);
	}, [currentPage, projects]);

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

	if (isLoading) {
		return (
			<Reveal>
				<section className="container mx-auto px-4 py-16">
					<FilterChipsSkeleton />
					<CardGridSkeleton />
				</section>
			</Reveal>
		);
	}

	if (error) {
		return (
			<Reveal>
				<section className="container mx-auto px-4 py-16">
					<div className="flex min-h-[320px] flex-col items-center justify-center text-center">
						<AlertCircle className="mb-4 h-16 w-16 text-destructive" />
						<h2 className="mb-2 text-2xl font-bold text-primary">{t("ProjectsList.error.title")}</h2>
						<p className="text-primary-foreground">{t("ProjectsList.error.description")}</p>
					</div>
				</section>
			</Reveal>
		);
	}

	return (
		<Reveal>
			<div className="container mx-auto px-4 pt-16">
				<FilterChips options={statusFilters} />

				{isFetching ? (
					<CardGridSkeleton />
				) : projects.length > 0 ? (
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
		</Reveal>
	);
}
