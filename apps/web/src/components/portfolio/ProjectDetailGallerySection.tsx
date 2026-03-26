"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProjectGallery, type ProjectGalleryMediaItem } from "./ProjectGallery";

interface ProjectDetailGallerySectionProps {
	images: ProjectGalleryMediaItem[];
	title: string;
	heading: string;
	headingHighlight: string;
}

const GALLERY_PREV_BUTTON_CLASS = "project-gallery-swiper-button-prev";
const GALLERY_NEXT_BUTTON_CLASS = "project-gallery-swiper-button-next";

export function ProjectDetailGallerySection({ images, title, heading, headingHighlight }: ProjectDetailGallerySectionProps) {
	return (
		<section className="px-4 pb-6 lg:pb-6">
			<div className="container mx-auto overflow-hidden">
				<div className="lg:mb-10 mb-6 flex items-center justify-between gap-4">
					<h2 className="h3 !font-bold uppercase text-primary">
						{heading} <span className="text-secondary">{headingHighlight}</span>
					</h2>

					<div className="hidden md:flex gap-3">
						<div
							className={`${GALLERY_PREV_BUTTON_CLASS} flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-primary/20 text-primary transition-colors hover:border-primary/50 hover:bg-primary/5 [&.swiper-button-disabled]:cursor-not-allowed [&.swiper-button-disabled]:opacity-30 [&.swiper-button-disabled:hover]:border-primary/20 [&.swiper-button-disabled:hover]:bg-transparent`}
						>
							<ArrowLeft className="size-5" />
						</div>
						<div
							className={`${GALLERY_NEXT_BUTTON_CLASS} flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-primary/20 text-primary transition-colors hover:border-primary/50 hover:bg-primary/5 [&.swiper-button-disabled]:cursor-not-allowed [&.swiper-button-disabled]:opacity-30 [&.swiper-button-disabled:hover]:border-primary/20 [&.swiper-button-disabled:hover]:bg-transparent`}
						>
							<ArrowRight className="size-5" />
						</div>
					</div>
				</div>

				<ProjectGallery
					images={images}
					title={title}
					navigationPrevEl={`.${GALLERY_PREV_BUTTON_CLASS}`}
					navigationNextEl={`.${GALLERY_NEXT_BUTTON_CLASS}`}
				/>
			</div>
		</section>
	);
}
