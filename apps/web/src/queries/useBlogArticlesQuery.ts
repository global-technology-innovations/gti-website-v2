import { fetchBlogArticles, type BlogArticle } from "@/lib/services/blog";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export type { BlogArticle, BlogArticleCategory, BlogArticleContent } from "@/lib/services/blog";

export function useBlogArticlesQuery(categoryId?: string) {
	const locale = useLocale();

	return useQuery<BlogArticle[]>({
		queryKey: ["blog-articles", locale, categoryId ?? "all"],
		queryFn: () => fetchBlogArticles(locale, categoryId),
		staleTime: 1000 * 60 * 5,
	});
}
