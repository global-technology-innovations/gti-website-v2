"use client";

import { FilterChips, ProjectCard, Reveal } from "@/components";
import { ProjectStatusFilter, useProjectsQuery } from "@/queries";
import { AlertCircle, Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

export function PortfolioListSection() {
	const t = useTranslations("PortfolioPage");
	const locale = useLocale();
	const [activeStatus, setActiveStatus] = useState<"all" | ProjectStatusFilter>("all");
	const selectedStatus = activeStatus === "all" ? undefined : activeStatus;
	const { data: projects = [], isLoading, error } = useProjectsQuery(selectedStatus);

	const statusFilters = [
		{
			id: "all",
			label: t("allProjects"),
			isActive: activeStatus === "all",
			onClick: () => setActiveStatus("all"),
		},
		{
			id: "planned",
			label: t("ProjectCard.status.planned"),
			isActive: activeStatus === "planned",
			onClick: () => setActiveStatus("planned"),
		},
		{
			id: "in-progress",
			label: t("ProjectCard.status.inProgress"),
			isActive: activeStatus === "in-progress",
			onClick: () => setActiveStatus("in-progress"),
		},
		{
			id: "completed",
			label: t("ProjectCard.status.completed"),
			isActive: activeStatus === "completed",
			onClick: () => setActiveStatus("completed"),
		},
	];

	if (isLoading) {
		return (
			<Reveal>
				<section className="container mx-auto flex min-h-[400px] items-center justify-center px-4 py-16">
					<Loader2 className="h-12 w-12 animate-spin text-primary" />
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
			<div className="container mx-auto px-4 pb-16 pt-16">
				<FilterChips options={statusFilters} />

				{projects.length > 0 ? (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
						{projects.map((project) => (
							<ProjectCard key={project.id} project={project} locale={locale} />
						))}
					</div>
				) : (
					<div className="flex min-h-[240px] items-center justify-center rounded-3xl border border-dashed border-border text-center text-primary-foreground">
						{t("ProjectsList.results.noResults.title")}
					</div>
				)}
			</div>
		</Reveal>
	);
}
