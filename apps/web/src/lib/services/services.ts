import { fetchStrapiData, resolveStrapiMediaUrl } from "@/lib/strapi";
import { StrapiResponse, StrapiService } from "@/types/strapi";
import { cache } from "react";

export interface Service {
	id: string;
	title: string;
	slug: string;
	shortDescription: string;
	description: string;
	image: string;
	icon: string;
	updatedAt?: string;
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

	return response.data.map((item) => ({
		id: String(item.id),
		title: item.attributes.title,
		slug: item.attributes.slug,
		shortDescription: item.attributes.shortDescription,
		description: item.attributes.description,
		image: resolveStrapiMediaUrl(item.attributes.image?.data?.attributes?.url),
		icon: item.attributes.icon,
		updatedAt: item.attributes.updatedAt,
	}));
}

export const getServices = cache(fetchServices);
