import { fetchBlogCategories, type BlogCategory } from "@/lib/services/blog";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export type { BlogCategory } from "@/lib/services/blog";

export function useBlogCategoriesQuery() {
	const locale = useLocale();

	return useQuery<BlogCategory[]>({
		queryKey: ["blog-categories", locale],
		queryFn: () => fetchBlogCategories(locale),
		staleTime: 1000 * 60 * 30,
		gcTime: 1000 * 60 * 60,
		refetchOnWindowFocus: false,
	});
}
