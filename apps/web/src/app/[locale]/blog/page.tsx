"use client";

import { BlogCategories, BlogGrid, BlogPagination, CallToActionSection, Reveal } from "@/components";
import { useBlogArticlesQuery, useBlogCategoriesQuery } from "@/queries";
import { AlertCircle, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

const ARTICLES_PER_PAGE = 9;

export default function BlogPage() {
	const t = useTranslations("BlogPage");
	const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const { data: categories = [], isLoading: isCategoriesLoading, error: categoriesError } = useBlogCategoriesQuery();
	const { data: articles = [], isLoading: isArticlesLoading, error: articlesError } = useBlogArticlesQuery();

	const filteredArticles = useMemo(() => {
		if (!activeCategoryId) {
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

	if (isCategoriesLoading || isArticlesLoading) {
		return (
			<Reveal>
				<section className="container mx-auto flex min-h-[400px] items-center justify-center px-4 py-20">
					<Loader2 className="h-12 w-12 animate-spin text-primary" />
				</section>
			</Reveal>
		);
	}

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

				<BlogCategories
					categories={[
						{
							id: "all",
							name: t("allCategories"),
							isActive: activeCategoryId === null,
							onClick: () => {
								setActiveCategoryId(null);
								setCurrentPage(1);
							},
						},
						...categories.map((category) => ({
							...category,
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
