"use client";

import { STRAPI_API_URL } from "@/lib/api";
import { cn } from "@/lib/utils";
import { ZoomIn } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";

interface MediaItem {
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
	images: MediaItem[];
	title: string;
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
	const [open, setOpen] = useState(false);
	const [index, setIndex] = useState(0);

	const getImageUrl = (image: MediaItem, size: "full" | "large" | "medium" = "medium") => {
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

		if (isVideo) {
			return {
				type: "video" as const,
				width: image.attributes.width,
				height: image.attributes.height,
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
			{/* Gallery Grid - Masonry-like layout */}
			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{images.map((image, i) => {
					const imageUrl = getImageUrl(image, "medium");
					const isVideo = image.attributes.mime.startsWith("video/");

					return (
						<div
							key={image.id}
							className={cn(
								"relative group cursor-pointer overflow-hidden rounded-lg bg-gray-100",
								// First image is larger (2x2)
								i === 0 ? "md:col-span-2 md:row-span-2" : ""
							)}
							onClick={() => {
								setIndex(i);
								setOpen(true);
							}}
						>
							<div className="relative w-full h-full min-h-[200px]">
								{isVideo ? (
									<video
										src={imageUrl}
										className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
										muted
										playsInline
									/>
								) : (
									<Image
										src={imageUrl}
										alt={image.attributes.alternativeText || `${title} - фото ${i + 1}`}
										fill
										className="object-cover transition-transform duration-300 group-hover:scale-110"
										sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
									/>
								)}
							</div>

							{/* Overlay */}
							<div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
								<ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
							</div>

							{/* Video indicator */}
							{isVideo && (
								<div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
									Відео
								</div>
							)}
						</div>
					);
				})}
			</div>

			{/* Lightbox for images and videos */}
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
