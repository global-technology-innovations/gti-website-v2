import { useQuery } from "@tanstack/react-query";
// import { Job } from "@/components";
import { StrapiResponse, StrapiJob } from "@/types/strapi";
import { useLocale } from "next-intl";

async function fetchJobs(locale: string): Promise<Job[]> {
	const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/jobs?locale=${locale}`, {
		next: { revalidate: 60 },
	});
	const json: StrapiResponse<StrapiJob> = await res.json();
	return json.data.map((item) => ({
		id: item.id,
		title: item.attributes.title,
		location: item.attributes.location,
		shortDescription: item.attributes.shortDescription,
	}));
}

export function useJobsQuery() {
	const locale = useLocale();

	return useQuery<Job[]>({
		queryKey: ["jobs", locale],
		queryFn: () => fetchJobs(locale),
		staleTime: 1000 * 60 * 5,
	});
}

export interface Job {
	id: number;
	title: string;
	location: string;
	shortDescription: string;
}
