import type renderRichText from "@/lib/renderRichText";
import { StrapiResponse } from "@/types/strapi";
import { cache } from "react";

export type ServiceDescription = Parameters<typeof renderRichText>[0];

export interface ServiceDetail {
	title: string;
	shortDescription: string;
	description: ServiceDescription;
}

interface StrapiServiceDetail {
	id: number;
	attributes: {
		title: string;
		shortDescription: string;
		description: unknown;
	};
}

export const getServiceDetail = cache(async (slug: string, locale: string): Promise<ServiceDetail | null> => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/services?filters[slug][$eq]=${encodeURIComponent(slug)}&locale=${locale}&populate=*`,
		{
			next: { revalidate: 60 },
		}
	);

	if (!response.ok) {
		throw new Error(`Failed to fetch service: ${response.status}`);
	}

	const json = (await response.json()) as StrapiResponse<StrapiServiceDetail>;
	const service = json.data?.[0];

	if (!service) {
		return null;
	}

	return {
		title: service.attributes.title,
		shortDescription: service.attributes.shortDescription,
		description: normalizeDescription(service.attributes.description),
	};
});

function normalizeDescription(value: unknown): ServiceDescription {
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
