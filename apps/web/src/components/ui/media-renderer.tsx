"use client";

import { Button } from "@/components";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface MediaRendererProps {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	fill?: boolean;
	className?: string;
	mimeType?: string;
	onClick?: () => void;
	controls?: boolean;
	autoPlay?: boolean;
	muted?: boolean;
	loop?: boolean;
}

export function MediaRenderer({
	src,
	alt,
	width,
	height,
	fill = false,
	className = "",
	mimeType,
	onClick,
	controls = true,
	autoPlay = true,
	muted = true,
	loop = true,
}: MediaRendererProps) {
	const t = useTranslations("Media");
	const [isPlaying, setIsPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(muted);
	const videoRef = useRef<HTMLVideoElement>(null);

	// Determine if the media is a video based on MIME type or file extension
	const isVideo = mimeType?.startsWith("video/") || /\.(mp4|webm|ogg|avi|mov|wmv|flv|mkv)$/i.test(src);

	const handlePlayPause = () => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause();
				setIsPlaying(false);
			} else {
				// Pause all other videos on the page before playing this one
				pauseAllOtherVideos();
				videoRef.current.play();
				setIsPlaying(true);
			}
		}
	};

	const pauseAllOtherVideos = () => {
		const allVideos = document.querySelectorAll("video");
		allVideos.forEach((video) => {
			if (video !== videoRef.current && !video.paused) {
				video.pause();
			}
		});
	};

	// Listen for video events to sync state
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const handlePlay = () => {
			setIsPlaying(true);
			pauseAllOtherVideos();
		};

		const handlePause = () => {
			setIsPlaying(false);
		};

		video.addEventListener("play", handlePlay);
		video.addEventListener("pause", handlePause);

		return () => {
			video.removeEventListener("play", handlePlay);
			video.removeEventListener("pause", handlePause);
		};
	}, []);

	const handleMuteToggle = () => {
		if (videoRef.current) {
			videoRef.current.muted = !isMuted;
			setIsMuted(!isMuted);
		}
	};

	const handleVideoClick = () => {
		if (onClick) {
			onClick();
		} else {
			handlePlayPause();
		}
	};

	if (isVideo) {
		return (
			<div className={`relative group ${fill ? "w-full h-full" : "inline-block"} ${className}`}>
				<video
					ref={videoRef}
					src={src}
					width={width}
					height={height}
					className={`${fill ? "w-full h-full object-contain min-h-[330px]" : "w-full h-full object-contain min-h-[330px]"}`}
					controls={controls}
					autoPlay={autoPlay}
					muted={isMuted}
					loop={loop}
					onClick={handleVideoClick}
					onPlay={() => {
						setIsPlaying(true);
						pauseAllOtherVideos();
					}}
					onPause={() => setIsPlaying(false)}
					playsInline={true}
				>
					{t("videoNotSupported")}
				</video>

				{/* Custom video controls overlay - visible on hover */}
				<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
					<div className="flex items-center space-x-2">
						<Button className="bg-black/70 hover:bg-black/90 text-white p-2" onClick={handlePlayPause}>
							{isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
						</Button>

						<Button className="bg-black/70 hover:bg-black/90 text-white p-2" onClick={handleMuteToggle}>
							{isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
						</Button>
					</div>
				</div>

				{/* Video indicator */}
				<div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">{t("videoIndicator")}</div>
			</div>
		);
	}

	// Default to image for non-video media
	return (
		<Image src={src} alt={alt} width={width} height={height} fill={fill} className={`object-contain ${className}`} onClick={onClick} />
	);
}
