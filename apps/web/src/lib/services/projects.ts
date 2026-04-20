import { fetchStrapiData, resolveStrapiMediaUrl } from "@/lib/strapi";
import { StrapiProject, StrapiResponse } from "@/types/strapi";
import { cache } from "react";

export type ProjectStatusFilter = StrapiProject["attributes"]["status"];

export function getProjectSlug(project: StrapiProject) {
	const explicitSlug = project.attributes.slug?.trim();

	if (explicitSlug) {
		return explicitSlug;
	}

	const fallbackTitleSlug = slugifyProjectTitle(project.attributes.title);

	return fallbackTitleSlug ? `${fallbackTitleSlug}-${project.id}` : `project-${project.id}`;
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
	const response = await fetchStrapiData<StrapiResponse<StrapiProject>>(
		"/projects",
		{
			locale,
			filters: {
				slug: {
					$eq: slug,
				},
			},
			populate: {
				mainImage: true,
				images: true,
			},
			pagination: {
				limit: 1,
			},
		},
		{ revalidate: 300 }
	);

	const exactSlugMatch = response.data[0];

	if (exactSlugMatch) {
		return exactSlugMatch;
	}

	const projectId = extractProjectIdFromSlug(slug);

	if (!projectId) {
		return null;
	}

	const fallbackProject = await fetchProjectById(projectId, locale);

	if (!fallbackProject) {
		return null;
	}

	const legacySlug = `project-${fallbackProject.id}`;
	const canonicalSlug = getProjectSlug(fallbackProject);

	return slug === legacySlug || slug === canonicalSlug ? fallbackProject : null;
}

export const getProjectBySlug = cache(fetchProjectBySlug);

async function fetchProjectById(projectId: number, locale: string): Promise<StrapiProject | null> {
	const response = await fetchStrapiData<StrapiResponse<StrapiProject>>(
		"/projects",
		{
			locale,
			filters: {
				id: {
					$eq: projectId,
				},
			},
			populate: {
				mainImage: true,
				images: true,
			},
			pagination: {
				limit: 1,
			},
		},
		{ revalidate: 300 }
	);

	return response.data[0] || null;
}

function extractProjectIdFromSlug(slug: string) {
	const match = slug.match(/-(\d+)$/) || slug.match(/^project-(\d+)$/);

	if (!match) {
		return null;
	}

	const parsedId = Number(match[1]);

	return Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null;
}

function slugifyProjectTitle(title: string) {
	return title
		.toLocaleLowerCase()
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^\p{Letter}\p{Number}]+/gu, "-")
		.replace(/^-+|-+$/g, "")
		.replace(/-{2,}/g, "-");
}
