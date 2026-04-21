import { fetchStrapiData, resolveStrapiMediaUrl, StrapiFetchError } from "@/lib/strapi";
import type renderRichText from "@/lib/renderRichText";
import { StrapiBlogArticle, StrapiBlogCategory, StrapiResponse } from "@/types/strapi";
import { cache } from "react";

export type BlogArticleContent = Parameters<typeof renderRichText>[0];

export interface BlogArticleCategory {
	id: string;
	name: string;
}

export interface BlogCategory {
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
	imageAlt?: string;
	featured: boolean;
	publishedAt?: string;
	updatedAt?: string;
	category: BlogArticleCategory | null;
}

export function normalizeBlogArticleContent(value: unknown): BlogArticleContent {
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

function normalizeBlogArticle(item: StrapiBlogArticle): BlogArticle {
	return {
		id: String(item.id),
		title: item.attributes.title,
		slug: item.attributes.slug,
		excerpt: item.attributes.excerpt,
		content: normalizeBlogArticleContent(item.attributes.content),
		image: resolveStrapiMediaUrl(
			item.attributes.image?.data?.attributes?.formats?.medium?.url || item.attributes.image?.data?.attributes?.url
		),
		imageAlt: item.attributes.image?.data?.attributes?.alternativeText,
		featured: item.attributes.featured,
		publishedAt: item.attributes.publishedAt,
		updatedAt: item.attributes.updatedAt,
		category: item.attributes.blog_category?.data
			? {
					id: String(item.attributes.blog_category.data.id),
					name: item.attributes.blog_category.data.attributes.name,
				}
			: null,
	};
}

export async function fetchBlogArticles(locale: string, categoryId?: string): Promise<BlogArticle[]> {
	try {
		const response = await fetchStrapiData<StrapiResponse<StrapiBlogArticle>>(
			"/blog-articles",
			{
				locale,
				populate: {
					image: true,
					blog_category: true,
				},
				...(categoryId
					? {
							filters: {
								blog_category: {
									id: {
										$eq: categoryId,
									},
								},
							},
						}
					: {}),
				sort: ["featured:desc", "publishedAt:desc", "createdAt:desc"],
			},
			{ revalidate: 300 }
		);

		return response.data.map(normalizeBlogArticle);
	} catch (error) {
		if (error instanceof StrapiFetchError && (error.status === 404 || error.status >= 500)) {
			return [];
		}

		throw error;
	}
}

export const getBlogArticles = cache(fetchBlogArticles);

export async function fetchBlogCategories(locale: string): Promise<BlogCategory[]> {
	try {
		const response = await fetchStrapiData<StrapiResponse<StrapiBlogCategory>>(
			"/blog-categories",
			{
				locale,
				sort: ["name:asc"],
			},
			{ revalidate: 300 }
		);

		return response.data.map((item) => ({
			id: String(item.id),
			name: item.attributes.name,
		}));
	} catch (error) {
		if (error instanceof StrapiFetchError && error.status === 404) {
			return [];
		}

		throw error;
	}
}

export const getBlogCategories = cache(fetchBlogCategories);

export async function fetchBlogArticleBySlug(slug: string, locale: string): Promise<BlogArticle | null> {
	try {
		const response = await fetchStrapiData<StrapiResponse<StrapiBlogArticle>>(
			"/blog-articles",
			{
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
			{ revalidate: 300 }
		);

		const article = response.data[0];

		return article ? normalizeBlogArticle(article) : null;
	} catch (error) {
		if (error instanceof StrapiFetchError && error.status === 404) {
			return null;
		}

		throw error;
	}
}

export const getBlogArticleBySlug = cache(fetchBlogArticleBySlug);

export function getRelatedBlogArticles(articles: BlogArticle[], currentArticleSlug: string, currentCategoryId?: string | null) {
	const otherArticles = articles.filter((article) => article.slug !== currentArticleSlug);
	const sameCategoryArticles = otherArticles.filter((article) => article.category?.id === currentCategoryId);
	const fallbackArticles = otherArticles.filter((article) => article.category?.id !== currentCategoryId);

	return [...sameCategoryArticles, ...fallbackArticles].slice(0, 6);
}
