import { api } from "@/lib/api";
import { StrapiBlogCategory, StrapiResponse } from "@/types/strapi";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export interface BlogCategory {
	id: string;
	name: string;
}

async function fetchBlogCategories(locale: string): Promise<BlogCategory[]> {
	const response = await api.get<StrapiResponse<StrapiBlogCategory>>(
		"/blog-categories",
		{
			params: {
				locale,
				sort: ["name:asc"],
			},
		}
	);

	return response.data.data.map((item) => ({
		id: String(item.id),
		name: item.attributes.name,
	}));
}

export function useBlogCategoriesQuery() {
	const locale = useLocale();

	return useQuery<BlogCategory[]>({
		queryKey: ["blog-categories", locale],
		queryFn: () => fetchBlogCategories(locale),
		staleTime: 1000 * 60 * 5,
	});
}
