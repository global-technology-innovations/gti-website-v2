import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchProjects, type ProjectStatusFilter } from "@/lib/services/projects";
import { StrapiProject } from "@/types/strapi";
import { useLocale } from "next-intl";

export type { ProjectStatusFilter } from "@/lib/services/projects";

export const useProjectsQuery = (status?: ProjectStatusFilter) => {
	const locale = useLocale();

	return useQuery({
		queryKey: ["projects", locale, status ?? "all"],
		queryFn: () => fetchProjects(locale, status),
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData,
	});
};

export const useFeaturedProjectsQuery = () => {
	const locale = useLocale();

	return useQuery({
		queryKey: ["projects", "featured", locale],
		queryFn: async (): Promise<StrapiProject[]> => {
			const projects = await fetchProjects(locale);
			return projects.filter((project) => project.attributes.featured).slice(0, 6);
		},
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
};
