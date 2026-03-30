"use client";

import { BlogArticle, useBlogArticlesQuery } from "@/queries";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { BlogCard } from "./BlogCard";

const MAX_RELATED_ARTICLES = 6;

interface Props {
	currentArticleSlug: string;
	currentCategoryId?: string | null;
}

export function BlogRelatedSection({ currentArticleSlug, currentCategoryId }: Props) {
	const t = useTranslations("BlogArticlePage");
	const { data: articles = [], isLoading, error } = useBlogArticlesQuery();

	const relatedArticles = useMemo(() => {
		const otherArticles = articles.filter((article) => article.slug !== currentArticleSlug);
		const sameCategoryArticles = otherArticles.filter((article) => article.category?.id === currentCategoryId);
		const fallbackArticles = otherArticles.filter((article) => article.category?.id !== currentCategoryId);

		return [...sameCategoryArticles, ...fallbackArticles].slice(0, MAX_RELATED_ARTICLES);
	}, [articles, currentArticleSlug, currentCategoryId]);

	if (isLoading || error || relatedArticles.length === 0) {
		return null;
	}

	return (
		<section className="px-4 pt-10 lg:pt-16">
			<div className="container mx-auto overflow-hidden animate-slide-bottom">
				<div className="lg:mb-10 mb-6 flex items-center justify-between gap-4">
					<h2 className="h3 !font-bold text-primary uppercase">
						{t("relatedTitle")} <span className="text-secondary">{t("relatedHighlight")}</span>
					</h2>

					<div className="hidden md:flex gap-3">
						<div className="blog-related-swiper-button-prev flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-primary/20 text-primary transition-colors hover:border-primary/50 hover:bg-primary/5 [&.swiper-button-disabled]:cursor-not-allowed [&.swiper-button-disabled]:opacity-30 [&.swiper-button-disabled:hover]:border-primary/20 [&.swiper-button-disabled:hover]:bg-transparent">
							<ArrowLeft className="size-5" />
						</div>
						<div className="blog-related-swiper-button-next flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-primary/20 text-primary transition-colors hover:border-primary/50 hover:bg-primary/5 [&.swiper-button-disabled]:cursor-not-allowed [&.swiper-button-disabled]:opacity-30 [&.swiper-button-disabled:hover]:border-primary/20 [&.swiper-button-disabled:hover]:bg-transparent">
							<ArrowRight className="size-5" />
						</div>
					</div>
				</div>

				<Swiper
					modules={[Navigation, Pagination]}
					navigation={{
						nextEl: ".blog-related-swiper-button-next",
						prevEl: ".blog-related-swiper-button-prev",
					}}
					pagination={{ clickable: true }}
					spaceBetween={24}
					slidesPerView={1}
					breakpoints={{
						640: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
					}}
					className="!overflow-visible !pb-10 [&_.swiper-pagination]:!bottom-0 md:[&_.swiper-pagination]:hidden [&_.swiper-pagination-bullet]:!mx-1 [&_.swiper-pagination-bullet]:!h-1.5 [&_.swiper-pagination-bullet]:!w-1.5 [&_.swiper-pagination-bullet]:!bg-primary [&_.swiper-pagination-bullet]:!opacity-30 [&_.swiper-pagination-bullet-active]:!opacity-100"
				>
					{relatedArticles.map((article: BlogArticle) => (
						<SwiperSlide key={article.id} className="h-auto">
							<BlogCard article={article} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
}
