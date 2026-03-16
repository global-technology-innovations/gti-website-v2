import { STRAPI_API_URL, api } from "@/lib/api";
import type renderRichText from "@/lib/renderRichText";
import { StrapiBlogArticle, StrapiResponse } from "@/types/strapi";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export type BlogArticleContent = Parameters<typeof renderRichText>[0];

export interface BlogArticleCategory {
	id: string;
	name: string;
}

export interface BlogArticle {
	id: string;
	title: string;
	slug: string;
	excerpt: string;
	content: BlogArticleContent;
	image: string;
	featured: boolean;
	publishedAt?: string;
	category: BlogArticleCategory | null;
}

export function resolveStrapiMediaUrl(url?: string) {
	if (!url) {
		return "";
	}

	return url.startsWith("http")
		? url
		: `${STRAPI_API_URL.replace("/api", "")}${url}`;
}

export function normalizeBlogArticleContent(
	value: unknown
): BlogArticleContent {
	if (Array.isArray(value)) {
		return value as BlogArticleContent;
	}

	if (typeof value === "string") {
		try {
			const parsed = JSON.parse(value);

			if (Array.isArray(parsed)) {
				return parsed as BlogArticleContent;
			}
		} catch {
			return [] as BlogArticleContent;
		}
	}

	return [] as BlogArticleContent;
}

async function fetchBlogArticles(locale: string): Promise<BlogArticle[]> {
	const response = await api.get<StrapiResponse<StrapiBlogArticle>>(
		"/blog-articles",
		{
			params: {
				locale,
				populate: {
					image: true,
					blog_category: true,
				},
				sort: ["featured:desc", "publishedAt:desc", "createdAt:desc"],
			},
		}
	);

	return response.data.data.map((item) => ({
		id: String(item.id),
		title: item.attributes.title,
		slug: item.attributes.slug,
		excerpt: item.attributes.excerpt,
		content: normalizeBlogArticleContent(item.attributes.content),
		image: resolveStrapiMediaUrl(
			item.attributes.image?.data?.attributes?.formats?.medium?.url ||
				item.attributes.image?.data?.attributes?.url
		),
		featured: item.attributes.featured,
		publishedAt: item.attributes.publishedAt,
		category: item.attributes.blog_category?.data
			? {
					id: String(item.attributes.blog_category.data.id),
					name: item.attributes.blog_category.data.attributes.name,
				}
			: null,
	}));
}

export function useBlogArticlesQuery() {
	const locale = useLocale();

	return useQuery<BlogArticle[]>({
		queryKey: ["blog-articles", locale],
		queryFn: () => fetchBlogArticles(locale),
		staleTime: 1000 * 60 * 5,
	});
}
