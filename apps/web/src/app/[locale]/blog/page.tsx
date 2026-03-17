"use client";

import { BlogGrid, BlogPagination, CallToActionSection, CardGridSkeleton, FilterChips, FilterChipsSkeleton, Reveal } from "@/components";
import { useBlogArticlesQuery, useBlogCategoriesQuery } from "@/queries";
import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const ARTICLES_PER_PAGE = 9;

export default function BlogPage() {
	const t = useTranslations("BlogPage");
	const [activeCategoryId, setActiveCategoryId] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);
	const { data: categories = [], isLoading: isCategoriesLoading, error: categoriesError } = useBlogCategoriesQuery();
	const selectedCategoryId = activeCategoryId === "all" ? undefined : activeCategoryId;
	const {
		data: articles = [],
		isLoading: isArticlesLoading,
		isFetching: isArticlesFetching,
		error: articlesError,
	} = useBlogArticlesQuery(selectedCategoryId);

	const totalPages = Math.max(1, Math.ceil(articles.length / ARTICLES_PER_PAGE));
	const start = (currentPage - 1) * ARTICLES_PER_PAGE;
	const paginatedArticles = articles.slice(start, start + ARTICLES_PER_PAGE);

	useEffect(() => {
		if (currentPage > totalPages) {
			setCurrentPage(totalPages);
		}
	}, [currentPage, totalPages]);

	if (categoriesError || articlesError) {
		return (
			<Reveal>
				<section className="container mx-auto px-4 py-20">
					<div className="flex min-h-[320px] flex-col items-center justify-center text-center">
						<AlertCircle className="mb-4 h-16 w-16 text-destructive" />
						<h2 className="mb-2 text-2xl font-bold text-primary">{t("errorTitle")}</h2>
						<p className="text-primary-foreground">{t("errorDescription")}</p>
					</div>
				</section>
			</Reveal>
		);
	}

	return (
		<Reveal>
			<div className="container mx-auto px-4 pb-16 pt-20">
				<div className="mb-10">
					<h2 className="text-center uppercase text-primary">
						{t("title")} <span className="text-secondary">{t("highlight")}</span>
					</h2>
					<p className="mt-4 text-center text-primary-foreground">{t("description")}</p>
				</div>

				{isCategoriesLoading ? (
					<FilterChipsSkeleton count={5} />
				) : (
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
				)}

				{isArticlesLoading || isArticlesFetching ? (
					<CardGridSkeleton count={6} />
				) : articles.length > 0 ? (
					<>
						<BlogGrid articles={paginatedArticles} />
						{totalPages > 1 ? (
							<BlogPagination currentPage={currentPage} totalPages={totalPages} onChange={setCurrentPage} />
						) : null}
					</>
				) : (
					<div className="flex min-h-[240px] items-center justify-center rounded-3xl border border-dashed border-border text-center text-primary-foreground">
						{t("noResults")}
					</div>
				)}
			</div>
			<CallToActionSection />
		</Reveal>
	);
}
