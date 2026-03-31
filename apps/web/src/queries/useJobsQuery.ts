import { fetchJobs, type Job } from "@/lib/services/jobs";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export type { Job } from "@/lib/services/jobs";

export function useJobsQuery() {
	const locale = useLocale();

	return useQuery<Job[]>({
		queryKey: ["jobs", locale],
		queryFn: () => fetchJobs(locale),
		staleTime: 1000 * 60 * 5,
	});
}
