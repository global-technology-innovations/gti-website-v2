"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ReviewCard, type Review } from "./ReviewCard";

const reviewKeys = ["muller", "schneider", "becker", "muller", "schneider", "becker"] as const;

export function ReviewsSection() {
	const t = useTranslations("AboutPage.ReviewsSection");
	const reviews: Review[] = reviewKeys.map((key) => ({
		name: t(`items.${key}.name`),
		role: t(`items.${key}.role`),
		text: t(`items.${key}.text`),
	}));

	return (
		<section className="container mx-auto overflow-hidden relative mx-4 rounded-3xl py-10 lg:pt-22 px-4">
			<div className="flex items-center justify-between lg:mb-12 mb-6">
				<h2 className="h3 !font-bold text-primary text-center lg:text-left uppercase">
					{t("headingStart")} <span className="text-secondary">{t("headingHighlight")}</span>
				</h2>
				<div className="hidden md:flex gap-2">
					<div className="reviews-swiper-button-prev w-10 h-10 rounded-full border border-primary flex items-center justify-center cursor-pointer hover:bg-primary/10 transition-colors [&.swiper-button-disabled]:opacity-30 [&.swiper-button-disabled]:cursor-not-allowed [&.swiper-button-disabled:hover]:bg-transparent">
						<ArrowLeft className="size-4 text-primary" />
					</div>
					<div className="reviews-swiper-button-next w-10 h-10 rounded-full border border-primary flex items-center justify-center cursor-pointer hover:bg-primary/10 transition-colors [&.swiper-button-disabled]:opacity-30 [&.swiper-button-disabled]:cursor-not-allowed [&.swiper-button-disabled:hover]:bg-transparent">
						<ArrowRight className="size-4 text-primary" />
					</div>
				</div>
			</div>
			<Swiper
				modules={[Navigation, Pagination]}
				navigation={{
					nextEl: ".reviews-swiper-button-next",
					prevEl: ".reviews-swiper-button-prev",
				}}
				pagination={{ clickable: true }}
				spaceBetween={16}
				slidesPerView={1}
				breakpoints={{
					640: { slidesPerView: 2 },
					1024: { slidesPerView: 3 },
				}}
				className="!overflow-visible pb-8 lg:pb-0 [&_.swiper-pagination]:!bottom-[-30px] md:[&_.swiper-pagination]:hidden [&_.swiper-pagination-bullet]:!mx-1 [&_.swiper-pagination-bullet]:!h-1.5 [&_.swiper-pagination-bullet]:!w-1.5 [&_.swiper-pagination-bullet]:!bg-primary [&_.swiper-pagination-bullet]:!opacity-30 [&_.swiper-pagination-bullet-active]:!opacity-100"
			>
				{reviews.map((review, index) => (
					<SwiperSlide key={index}>
						<ReviewCard review={review} />
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
}
