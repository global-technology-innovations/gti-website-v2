import { api } from "@/lib/api";
import { StrapiBlogArticle, StrapiResponse } from "@/types/strapi";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import {
	type BlogArticle,
	normalizeBlogArticleContent,
	resolveStrapiMediaUrl,
} from "./useBlogArticlesQuery";

async function fetchSingleBlogArticle(
	slug: string,
	locale: string
): Promise<BlogArticle | null> {
	const response = await api.get<StrapiResponse<StrapiBlogArticle>>(
		"/blog-articles",
		{
			params: {
				locale,
				filters: {
					slug: {
						$eq: slug,
					},
				},
				populate: {
					image: true,
					blog_category: true,
				},
				pagination: {
					limit: 1,
				},
			},
		}
	);

	const article = response.data.data[0];

	if (!article) {
		return null;
	}

	return {
		id: String(article.id),
		title: article.attributes.title,
		slug: article.attributes.slug,
		excerpt: article.attributes.excerpt,
		content: normalizeBlogArticleContent(article.attributes.content),
		image: resolveStrapiMediaUrl(
			article.attributes.image?.data?.attributes?.formats?.medium?.url ||
				article.attributes.image?.data?.attributes?.url
		),
		featured: article.attributes.featured,
		publishedAt: article.attributes.publishedAt,
		category: article.attributes.blog_category?.data
			? {
					id: String(article.attributes.blog_category.data.id),
					name: article.attributes.blog_category.data.attributes.name,
				}
			: null,
	};
}

export function useSingleBlogArticleQuery(slug: string) {
	const locale = useLocale();

	return useQuery<BlogArticle | null>({
		queryKey: ["blog-article", slug, locale],
		queryFn: () => fetchSingleBlogArticle(slug, locale),
		enabled: !!slug,
		staleTime: 1000 * 60 * 10,
	});
}
