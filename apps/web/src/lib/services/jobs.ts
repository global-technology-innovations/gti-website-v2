import { fetchStrapiData } from "@/lib/strapi";
import { StrapiJob, StrapiResponse } from "@/types/strapi";
import { cache } from "react";

export interface Job {
	id: number;
	title: string;
	location: string;
	shortDescription: string;
}

export async function fetchJobs(locale: string): Promise<Job[]> {
	const response = await fetchStrapiData<StrapiResponse<StrapiJob>>("/jobs", { locale }, { revalidate: 300 });

	return response.data.map((item) => ({
		id: item.id,
		title: item.attributes.title,
		location: item.attributes.location,
		shortDescription: item.attributes.shortDescription,
	}));
}

export const getJobs = cache(fetchJobs);
