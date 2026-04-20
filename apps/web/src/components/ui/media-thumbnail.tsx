"use client";

import { Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { MediaRenderer } from "./media-renderer";

interface MediaThumbnailProps {
	src: string;
	alt: string;
	mimeType?: string;
	className?: string;
	onClick?: () => void;
}

export function MediaThumbnail({ src, alt, mimeType, className = "", onClick }: MediaThumbnailProps) {
	const t = useTranslations("Media");
	const isVideo = mimeType?.startsWith("video/") || /\.(mp4|webm|ogg|avi|mov|wmv|flv|mkv)$/i.test(src);

	return (
		<div className={`relative group cursor-pointer ${className}`} onClick={onClick}>
			<MediaRenderer
				src={src}
				alt={alt}
				fill
				className="rounded"
				mimeType={mimeType}
				controls={false}
				autoPlay={true}
				muted={true}
				loop={true}
			/>

			{isVideo && (
				<div className="bg-black/70 rounded-full p-2">
					<Play className="h-4 w-4 text-white" />
				</div>
			)}

			{/* Media type indicator */}
			{isVideo && (
				<div className="absolute top-1 right-1 bg-black/70 text-white text-xs px-1 py-0.5 rounded">{t("videoIndicator")}</div>
			)}
		</div>
	);
}
