import { fetchStrapiData, resolveStrapiMediaUrl } from "@/lib/strapi";
import { StrapiProject, StrapiResponse } from "@/types/strapi";
import { cache } from "react";

export type ProjectStatusFilter = StrapiProject["attributes"]["status"];

export function getProjectSlug(project: StrapiProject) {
	return project.attributes.slug || `project-${project.id}`;
}

export function getProjectImageUrl(project: StrapiProject) {
	return (
		resolveStrapiMediaUrl(
			project.attributes.mainImage?.data?.attributes?.formats?.large?.url ||
				project.attributes.mainImage?.data?.attributes?.formats?.medium?.url ||
				project.attributes.mainImage?.data?.attributes?.url
		) || "/opengraph-image"
	);
}

export async function fetchProjects(locale: string, status?: ProjectStatusFilter): Promise<StrapiProject[]> {
	const response = await fetchStrapiData<StrapiResponse<StrapiProject>>(
		"/projects",
		{
			locale,
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
		{ revalidate: 300 }
	);

	return response.data;
}

export const getProjects = cache(fetchProjects);

export async function fetchProjectBySlug(slug: string, locale: string): Promise<StrapiProject | null> {
	const projectIdMatch = slug.match(/^project-(\d+)$/);
	const response = await fetchStrapiData<StrapiResponse<StrapiProject>>(
		"/projects",
		{
			locale,
			filters: projectIdMatch
				? {
						id: {
							$eq: projectIdMatch[1],
						},
					}
				: {
						slug: {
							$eq: slug,
						},
					},
			populate: {
				mainImage: true,
				images: true,
			},
		},
		{ revalidate: 300 }
	);

	return response.data[0] || null;
}

export const getProjectBySlug = cache(fetchProjectBySlug);
