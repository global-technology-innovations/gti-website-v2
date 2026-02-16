"use client";

import { Reveal } from "@/components/animations";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ReviewCard, type Review } from "./ReviewCard";

const REVIEWS: Review[] = [
	{
		name: "Hans Müller",
		role: "Ремонт квартири",
		text: "Роботи виконані якісно та в узгоджені строки. Команда відповідально ставиться до деталей і завжди була на зв'язку.",
	},
	{
		name: "Peter Schneider",
		role: "Будівництво комерції",
		text: "Професійний підхід, чітка організація процесу та зрозуміла комунікація на всіх етапах.",
	},
	{
		name: "Anna Becker",
		role: "Реконструкція приватного будинку",
		text: "Результат повністю відповідає очікуванням. Надійна команда, якій можна довіряти.",
	},
	{
		name: "Hans Müller",
		role: "Ремонт квартири",
		text: "Роботи виконані якісно та в узгоджені строки. Команда відповідально ставиться до деталей і завжди була на зв'язку.",
	},
	{
		name: "Peter Schneider",
		role: "Будівництво комерції",
		text: "Професійний підхід, чітка організація процесу та зрозуміла комунікація на всіх етапах.",
	},
	{
		name: "Anna Becker",
		role: "Реконструкція приватного будинку",
		text: "Результат повністю відповідає очікуванням. Надійна команда, якій можна довіряти.",
	},
];

export function ReviewsSection() {
	return (
		<Reveal>
			<section className="container mx-auto overflow-hidden relative mx-4 rounded-3xl pt-22 px-4">
				<div className="flex items-center justify-between mb-12">
					<h2 className="text-primary uppercase">
						Відгуки наших <span className="text-secondary">клієнтів</span>
					</h2>
					<div className="flex gap-2">
						<div className="reviews-swiper-button-prev w-10 h-10 rounded-full border border-primary flex items-center justify-center cursor-pointer hover:bg-primary/10 transition-colors [&.swiper-button-disabled]:opacity-30 [&.swiper-button-disabled]:cursor-not-allowed [&.swiper-button-disabled:hover]:bg-transparent">
							<ArrowLeft className="size-4 text-primary" />
						</div>
						<div className="reviews-swiper-button-next w-10 h-10 rounded-full border border-primary flex items-center justify-center cursor-pointer hover:bg-primary/10 transition-colors [&.swiper-button-disabled]:opacity-30 [&.swiper-button-disabled]:cursor-not-allowed [&.swiper-button-disabled:hover]:bg-transparent">
							<ArrowRight className="size-4 text-primary" />
						</div>
					</div>
				</div>
				<Swiper
					modules={[Navigation]}
					navigation={{
						nextEl: ".reviews-swiper-button-next",
						prevEl: ".reviews-swiper-button-prev",
					}}
					spaceBetween={16}
					slidesPerView={1}
					breakpoints={{
						640: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
					}}
					className="!overflow-visible"
				>
					{REVIEWS.map((review, index) => (
						<SwiperSlide key={index}>
							<ReviewCard review={review} />
						</SwiperSlide>
					))}
				</Swiper>
			</section>
		</Reveal>
	);
}
