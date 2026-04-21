"use client";

import { STRAPI_API_URL } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Play, ZoomIn } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";

export interface ProjectGalleryMediaItem {
	id: number;
	attributes: {
		url: string;
		alternativeText?: string;
		width: number;
		height: number;
		mime: string;
		formats?: {
			large?: { url: string };
			medium?: { url: string };
			small?: { url: string };
			thumbnail?: { url: string };
		};
	};
}

interface ProjectGalleryProps {
	images: ProjectGalleryMediaItem[];
	title: string;
	navigationPrevEl: string;
	navigationNextEl: string;
}

export function ProjectGallery({ images, title, navigationPrevEl, navigationNextEl }: ProjectGalleryProps) {
	const [open, setOpen] = useState(false);
	const [index, setIndex] = useState(0);
	const tMedia = useTranslations("Media");

	const getMediaDimensions = (image: ProjectGalleryMediaItem) => ({
		width: image.attributes.width || 1280,
		height: image.attributes.height || 720,
	});

	const getImageUrl = (image: ProjectGalleryMediaItem, size: "full" | "large" | "medium" = "medium") => {
		let url = image.attributes.url;

		if (size === "large" && image.attributes.formats?.large) {
			url = image.attributes.formats.large.url;
		} else if (size === "medium" && image.attributes.formats?.medium) {
			url = image.attributes.formats.medium.url;
		}

		return url.startsWith("http") ? url : `${STRAPI_API_URL.replace("/api", "")}${url}`;
	};

	if (!images || images.length === 0) {
		return null;
	}

	// Prepare slides for lightbox (images and videos)
	const slides = images.map((image) => {
		const isVideo = image.attributes.mime.startsWith("video/");
		const fullUrl = getImageUrl(image, "full");
		const { width, height } = getMediaDimensions(image);

		if (isVideo) {
			return {
				type: "video" as const,
				width,
				height,
				sources: [
					{
						src: fullUrl,
						type: image.attributes.mime,
					},
				],
			};
		}

		return {
			src: fullUrl,
			alt: image.attributes.alternativeText || title,
			width: image.attributes.width,
			height: image.attributes.height,
		};
	});

	return (
		<>
			<Swiper
				modules={[Navigation, Pagination]}
				navigation={{
					prevEl: navigationPrevEl,
					nextEl: navigationNextEl,
				}}
				pagination={{ clickable: true }}
				spaceBetween={24}
				slidesPerView="auto"
				className="!overflow-visible !pb-10 [&_.swiper-pagination]:!bottom-0 md:[&_.swiper-pagination]:hidden [&_.swiper-pagination-bullet]:!mx-1 [&_.swiper-pagination-bullet]:!h-1.5 [&_.swiper-pagination-bullet]:!w-1.5 [&_.swiper-pagination-bullet]:!bg-primary [&_.swiper-pagination-bullet]:!opacity-30 [&_.swiper-pagination-bullet-active]:!opacity-100"
			>
				{images.map((image, i) => {
					const imageUrl = getImageUrl(image, "medium");
					const isVideo = image.attributes.mime.startsWith("video/");

					return (
						<SwiperSlide key={image.id} className="!h-auto !w-[86vw] sm:!w-[62vw] lg:!w-[492px]">
							<button
								type="button"
								className={cn(
									"group relative block h-full w-full cursor-pointer overflow-hidden rounded-3xl bg-muted text-left transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
								)}
								onClick={() => {
									setIndex(i);
									setOpen(true);
								}}
								aria-label={image.attributes.alternativeText || tMedia("mediaThumbnail", { index: i + 1 })}
							>
								<div className="relative aspect-[492/320] w-full">
								{isVideo ? (
										<video
											src={imageUrl}
											className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
											muted
											playsInline
											preload="metadata"
										/>
									) : (
										<Image
											src={imageUrl}
											alt={image.attributes.alternativeText || `${title} - ${tMedia("thumbnail", { index: i + 1 })}`}
											fill
											className="object-cover transition-transform duration-500 group-hover:scale-105"
											sizes="(max-width: 640px) 86vw, (max-width: 1024px) 62vw, 492px"
										/>
									)}
								</div>

								<div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-primary/0 transition-colors duration-300 group-hover:bg-primary/10">
									{isVideo ? (
										<div className="flex size-16 items-center justify-center rounded-full bg-card/85 text-secondary shadow-sm">
											<Play className="ml-1 size-7 fill-current" />
										</div>
									) : (
										<div className="flex size-14 items-center justify-center rounded-full bg-card/0 text-secondary-foreground opacity-0 transition-all duration-300 group-hover:bg-card/85 group-hover:text-primary group-hover:opacity-100">
											<ZoomIn className="size-6" />
										</div>
									)}
								</div>
							</button>
						</SwiperSlide>
					);
				})}
			</Swiper>

			<Lightbox
				open={open}
				close={() => setOpen(false)}
				index={index}
				slides={slides}
				plugins={[Video]}
				video={{
					autoPlay: true,
					controls: true,
				}}
				styles={{
					container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
				}}
				controller={{ closeOnBackdropClick: true }}
			/>
		</>
	);
}
