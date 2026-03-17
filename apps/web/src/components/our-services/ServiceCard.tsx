"use client";

import { Card, CardDescription, CardTitle } from "@/components";
import { Link } from "@/i18n";
import { STRAPI_API_URL } from "@/lib/api";
import Image from "next/image";

export function ServiceCard({ slug, title, description, image }: ServiceCardProps) {
	const imageSrc = image.startsWith("http") ? image : `${STRAPI_API_URL.replace("/api", "")}${image}`;
	return (
		<Link
			href={`/our-services/${slug}`}
			className="group flex h-full flex-col gap-3 cursor-pointer hover:scale-[1.03] transition-all duration-300"
		>
			<div className="relative w-full h-48 md:h-64 shrink-0 overflow-hidden rounded-3xl grayscale group-hover:grayscale-0 transition-all duration-300">
				<Image
					src={imageSrc}
					alt={title}
					fill
					draggable={false}
					className="select-none object-cover object-center"
					sizes="(max-width: 768px) 100vw, 672px"
				/>
			</div>
			<Card className="flex flex-1 flex-col px-8 py-6 transition-all duration-300 group-hover:bg-background group-hover:border-background">
				<CardTitle>{title}</CardTitle>
				<CardDescription className="mt-2">{description}</CardDescription>
			</Card>
		</Link>
	);
}

interface ServiceCardProps {
	slug: string;
	title: string;
	description: string;
	image: string;
}
