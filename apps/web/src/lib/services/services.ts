import type renderRichText from "@/lib/renderRichText";
import { fetchStrapiData, resolveStrapiMediaUrl, StrapiFetchError } from "@/lib/strapi";
import { StrapiLocalizationEntry, StrapiResponse, StrapiService } from "@/types/strapi";
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
	localizations: StrapiLocalizationEntry[];
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
		localizations: item.attributes.localizations?.data ?? [],
		updatedAt: item.attributes.updatedAt,
	};
}

export async function fetchServices(locale: string): Promise<Service[]> {
	try {
		const response = await fetchStrapiData<StrapiResponse<StrapiService>>(
			"/services",
			{
				locale,
				populate: {
					image: true,
					localizations: {
						fields: ["locale", "slug", "title"],
					},
				},
				sort: ["title:asc"],
			},
			{ revalidate: 300 }
		);

		return response.data.map(normalizeService);
	} catch (error) {
		if (error instanceof StrapiFetchError && (error.status === 404 || error.status >= 500)) {
			return [];
		}

		throw error;
	}
}

export const getServices = cache(fetchServices);

export async function fetchServiceBySlug(slug: string, locale: string): Promise<Service | null> {
	try {
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
					localizations: {
						fields: ["locale", "slug", "title"],
					},
				},
				pagination: {
					limit: 1,
				},
			},
			{ revalidate: 300 }
		);

		const service = response.data[0];

		return service ? normalizeService(service) : null;
	} catch (error) {
		if (error instanceof StrapiFetchError && (error.status === 404 || error.status >= 500)) {
			return null;
		}

		throw error;
	}
}

export const getServiceBySlug = cache(fetchServiceBySlug);
