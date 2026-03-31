import { fetchBlogArticleBySlug, type BlogArticle } from "@/lib/services/blog";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export function useSingleBlogArticleQuery(slug: string) {
	const locale = useLocale();

	return useQuery<BlogArticle | null>({
		queryKey: ["blog-article", slug, locale],
		queryFn: () => fetchBlogArticleBySlug(slug, locale),
		enabled: !!slug,
		staleTime: 1000 * 60 * 10,
	});
}
