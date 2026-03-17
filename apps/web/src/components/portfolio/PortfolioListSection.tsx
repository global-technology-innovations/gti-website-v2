"use client";

import { Button, ProjectCard, Reveal } from "@/components";
import { useProjectsQuery } from "@/queries";
import { AlertCircle, Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";

type ProjectStatusFilter = "all" | "planned" | "in-progress" | "completed";

export function PortfolioListSection() {
	const t = useTranslations("PortfolioPage");
	const locale = useLocale();
	const { data: projects = [], isLoading, error } = useProjectsQuery();
	const [activeStatus, setActiveStatus] = useState<ProjectStatusFilter>("all");

	const filteredProjects = useMemo(() => {
		if (activeStatus === "all") {
			return projects;
		}

		return projects.filter((project) => project.attributes.status === activeStatus);
	}, [activeStatus, projects]);

	const statusFilters = [
		{ id: "all" as const, label: t("allProjects") },
		{ id: "planned" as const, label: t("ProjectCard.status.planned") },
		{ id: "in-progress" as const, label: t("ProjectCard.status.inProgress") },
		{ id: "completed" as const, label: t("ProjectCard.status.completed") },
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
				<div className="mb-8 flex flex-wrap items-center justify-center gap-3">
					{statusFilters.map((status) => (
						<Button
							key={status.id}
							onClick={() => setActiveStatus(status.id)}
							variant={activeStatus === status.id ? "secondary" : "outline"}
							size="small"
							className="font-normal"
						>
							{status.label}
						</Button>
					))}
				</div>

				{filteredProjects.length > 0 ? (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
						{filteredProjects.map((project) => (
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
