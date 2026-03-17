import { useQuery } from "@tanstack/react-query";
import { StrapiProject, StrapiResponse } from "@/types/strapi";
import { api } from "@/lib/api";
import { useLocale } from "next-intl";

export type ProjectStatusFilter = StrapiProject["attributes"]["status"];

export const useProjectsQuery = (status?: ProjectStatusFilter) => {
	const locale = useLocale();

	return useQuery({
		queryKey: ["projects", locale, status ?? "all"],
		queryFn: async (): Promise<StrapiProject[]> => {
			try {
				const response = await api.get<StrapiResponse<StrapiProject>>("/projects", {
					params: {
						locale: locale,
						populate: {
							mainImage: true,
							images: true,
						},
						...(status
							? {
									filters: {
										status: {
											$eq: status,
										},
									},
								}
							: {}),
						sort: ["featured:desc", "createdAt:desc"],
					},
				});

				return response.data.data;
			} catch (error) {
				console.error("Error fetching projects:", error);
				throw new Error("Failed to fetch projects");
			}
		},
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
	});
};

export const useFeaturedProjectsQuery = () => {
	const locale = useLocale();

	return useQuery({
		queryKey: ["projects", "featured", locale],
		queryFn: async (): Promise<StrapiProject[]> => {
			try {
				const response = await api.get<StrapiResponse<StrapiProject>>("/projects", {
					params: {
						locale: locale,
						filters: {
							featured: {
								$eq: true,
							},
						},
						populate: {
							mainImage: true,
						},
						sort: ["createdAt:desc"],
						pagination: {
							limit: 6,
						},
					},
				});

				return response.data.data;
			} catch (error) {
				console.error("Error fetching featured projects:", error);
				throw new Error("Failed to fetch featured projects");
			}
		},
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
};
