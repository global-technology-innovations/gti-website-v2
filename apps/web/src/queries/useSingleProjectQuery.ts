import { fetchProjectBySlug } from "@/lib/services/projects";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export const useSingleProjectQuery = (slug: string) => {
	const locale = useLocale();

	return useQuery({
		queryKey: ["project", slug, locale],
		queryFn: () => fetchProjectBySlug(slug, locale),
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
		enabled: !!slug,
	});
};
