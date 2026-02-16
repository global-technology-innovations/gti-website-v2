import { api } from "@/lib/api";
import { StrapiProject, StrapiResponse } from "@/types/strapi";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export const useSingleProjectQuery = (slug: string) => {
	const locale = useLocale();

	return useQuery({
		queryKey: ["project", slug, locale],
		queryFn: async (): Promise<StrapiProject | null> => {
			try {
				// Check if slug is in format "project-{id}"
				const projectIdMatch = slug.match(/^project-(\d+)$/);

				let response;

				if (projectIdMatch) {
					// If slug is "project-{id}", search by id
					const projectId = projectIdMatch[1];
					response = await api.get<StrapiResponse<StrapiProject>>("/projects", {
						params: {
							locale: locale,
							filters: {
								id: {
									$eq: projectId,
								},
							},
							populate: {
								mainImage: true,
								images: true,
							},
						},
					});
				} else {
					// Otherwise, search by slug
					response = await api.get<StrapiResponse<StrapiProject>>("/projects", {
						params: {
							locale: locale,
							filters: {
								slug: {
									$eq: slug,
								},
							},
							populate: {
								mainImage: true,
								images: true,
							},
						},
					});
				}

				return response.data.data[0] || null;
			} catch (error) {
				console.error("Error fetching project:", error);
				throw new Error("Failed to fetch project");
			}
		},
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
		enabled: !!slug,
	});
};
