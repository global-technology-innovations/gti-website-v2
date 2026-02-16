"use client";

import { ProjectCard, Reveal } from "@/components";
import { useProjectsQuery } from "@/queries";
import { AlertCircle, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface ProjectsListProps {
  locale: string;
}

export function ProjectsList({ locale }: ProjectsListProps) {
  const t = useTranslations("PortfolioPage.ProjectsList");
  const { data: projects = [], isLoading, error } = useProjectsQuery();

  // Loading state
  if (isLoading) {
    return (
      <Reveal>
        <section className="py-12 container mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        </section>
      </Reveal>
    );
  }

  // Error state
  if (error) {
    return (
      <Reveal>
        <section className="py-12 container mx-auto">
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <AlertCircle className="w-16 h-16 text-destructive mb-4" />
            <h3 className="text-2xl font-bold mb-2">{t("error.title")}</h3>
            <p className="text-muted-foreground">{t("error.description")}</p>
          </div>
        </section>
      </Reveal>
    );
  }

  // No projects state
  if (!projects || projects.length === 0) {
    return (
      <Reveal>
        <section className="py-12 container mx-auto">
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <h3 className="text-2xl font-bold mb-2">
              {t("results.noResults.title")}
            </h3>
            <p className="text-muted-foreground">
              {t("results.noResults.description")}
            </p>
          </div>
        </section>
      </Reveal>
    );
  }

  // Projects grid
  return (
    <Reveal>
      <section className="py-12 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} locale={locale} />
          ))}
        </div>
      </section>
    </Reveal>
  );
}
