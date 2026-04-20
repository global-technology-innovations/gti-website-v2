"use client";

import { SharedPagination } from "@/components/shared/SharedPagination";
import { FilterChips } from "@/components/ui/filter-chips";
import type { BlogArticle, BlogCategory } from "@/lib/services/blog";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { BlogGrid } from "./BlogGrid";

const ARTICLES_PER_PAGE = 9;

interface BlogArchiveSectionProps {
	articles: BlogArticle[];
	categories: BlogCategory[];
}

export function BlogArchiveSection({ articles, categories }: BlogArchiveSectionProps) {
	const t = useTranslations("BlogPage");
	const [activeCategoryId, setActiveCategoryId] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);

	const filteredArticles = useMemo(() => {
		if (activeCategoryId === "all") {
			return articles;
		}

		return articles.filter((article) => article.category?.id === activeCategoryId);
	}, [activeCategoryId, articles]);

	const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE));
	const paginatedArticles = useMemo(() => {
		const start = (currentPage - 1) * ARTICLES_PER_PAGE;
		return filteredArticles.slice(start, start + ARTICLES_PER_PAGE);
	}, [currentPage, filteredArticles]);

	useEffect(() => {
		if (currentPage > totalPages) {
			setCurrentPage(totalPages);
		}
	}, [currentPage, totalPages]);

	return (
		<div className="container mx-auto px-4 pb-16 pt-8 lg:pt-12">
			<FilterChips
				options={[
					{
						id: "all",
						label: t("allCategories"),
						isActive: activeCategoryId === "all",
						onClick: () => {
							setActiveCategoryId("all");
							setCurrentPage(1);
						},
					},
					...categories.map((category) => ({
						id: category.id,
						label: category.name,
						isActive: category.id === activeCategoryId,
						onClick: () => {
							setActiveCategoryId(category.id);
							setCurrentPage(1);
						},
					})),
				]}
			/>

			{filteredArticles.length > 0 ? (
				<>
					<BlogGrid articles={paginatedArticles} />
					{totalPages > 1 ? (
						<SharedPagination currentPage={currentPage} totalPages={totalPages} onChange={setCurrentPage} />
					) : null}
				</>
			) : (
				<div className="flex min-h-[240px] items-center justify-center rounded-3xl border border-dashed border-border text-center text-primary-foreground">
					{t("noResults")}
				</div>
			)}
		</div>
	);
}
