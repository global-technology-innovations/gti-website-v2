import type renderRichText from "@/lib/renderRichText";
import { fetchStrapiData, resolveStrapiMediaUrl } from "@/lib/strapi";
import { StrapiResponse, StrapiService } from "@/types/strapi";
import { cache } from "react";

export type ServiceDescription = Parameters<typeof renderRichText>[0];

export interface Service {
	id: string;
	title: string;
	slug: string;
	shortDescription: string;
	description: ServiceDescription;
	image: string;
	icon: string;
	updatedAt?: string;
}

export function normalizeServiceDescription(value: unknown): ServiceDescription {
	if (Array.isArray(value)) {
		return value as ServiceDescription;
	}

	if (typeof value === "string") {
		try {
			const parsed = JSON.parse(value);

			if (Array.isArray(parsed)) {
				return parsed as ServiceDescription;
			}
		} catch {
			return value
				.split(/\n{2,}/)
				.map((paragraph) => paragraph.trim())
				.filter(Boolean)
				.map((paragraph) => ({
					type: "paragraph",
					children: [{ text: paragraph }],
				})) as ServiceDescription;
		}
	}

	return [] as ServiceDescription;
}

function normalizeService(item: StrapiService): Service {
	return {
		id: String(item.id),
		title: item.attributes.title,
		slug: item.attributes.slug,
		shortDescription: item.attributes.shortDescription,
		description: normalizeServiceDescription(item.attributes.description),
		image: resolveStrapiMediaUrl(item.attributes.image?.data?.attributes?.url),
		icon: item.attributes.icon,
		updatedAt: item.attributes.updatedAt,
	};
}

export async function fetchServices(locale: string): Promise<Service[]> {
	const response = await fetchStrapiData<StrapiResponse<StrapiService>>(
		"/services",
		{
			locale,
			populate: {
				image: true,
			},
			sort: ["title:asc"],
		},
		{ revalidate: 300 }
	);

	return response.data.map(normalizeService);
}

export const getServices = cache(fetchServices);

export async function fetchServiceBySlug(slug: string, locale: string): Promise<Service | null> {
	const response = await fetchStrapiData<StrapiResponse<StrapiService>>(
		"/services",
		{
			locale,
			filters: {
				slug: {
					$eq: slug,
				},
			},
			populate: {
				image: true,
			},
			pagination: {
				limit: 1,
			},
		},
		{ revalidate: 300 }
	);

	const service = response.data[0];

	return service ? normalizeService(service) : null;
}

export const getServiceBySlug = cache(fetchServiceBySlug);
