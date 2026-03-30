"use client";

import { Badge, Card } from "@/components";
import { Link } from "@/i18n/navigation";
import { STRAPI_API_URL } from "@/lib/api";
import { StrapiProject } from "@/types/strapi";
import { format } from "date-fns";
import { cs, de, enUS, fr, sk, uk } from "date-fns/locale";
import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface ProjectCardProps {
	project: StrapiProject;
	locale: string;
}

const localeMap = {
	uk: uk,
	sk: sk,
	cs: cs,
	en: enUS,
	fr: fr,
	de: de,
};

const statusKeyMap = {
	completed: "completed",
	"in-progress": "inProgress",
	planned: "planned",
} as const;

export function ProjectCard({ project, locale }: ProjectCardProps) {
	const t = useTranslations("PortfolioPage.ProjectCard");
	const mainImageUrl = project.attributes.mainImage?.data?.attributes?.url;
	const imageSrc = mainImageUrl
		? mainImageUrl.startsWith("http")
			? mainImageUrl
			: `${STRAPI_API_URL.replace("/api", "")}${mainImageUrl}`
		: "/placeholder.png";
	const slug = project.attributes.slug || `project-${project.id}`;
	const dateLocale = localeMap[locale as keyof typeof localeMap] || uk;
	const startDate = project.attributes.startDate
		? format(new Date(project.attributes.startDate), "LLLL yyyy", {
				locale: dateLocale,
			})
		: null;
	const endDate = project.attributes.endDate
		? format(new Date(project.attributes.endDate), "LLLL yyyy", {
				locale: dateLocale,
			})
		: null;
	const formattedDate = startDate
		? `${capitalizeFirst(startDate)}${endDate ? ` - ${capitalizeFirst(endDate)}` : ""}`
		: t("dateNotAvailable");
	const statusKey = statusKeyMap[project.attributes.status];

	return (
		<Link href={`/portfolio/${slug}`}>
			<Card
				variant="outline"
				className="group flex flex-col justify-between h-full overflow-hidden p-4 transition-transform duration-300 hover:-translate-y-1 animate-slide-bottom"
			>
				<div>
					<div className="relative aspect-[9/5] overflow-hidden rounded-3xl">
						<Image
							src={imageSrc}
							alt={project.attributes.title}
							fill
							className="object-cover transition-transform duration-500 group-hover:scale-105"
						/>
						<Badge variant="blur" className="absolute right-3 top-3 py-1.5 px-3.5 text-[13px]">
							{t(`status.${statusKey}`)}
						</Badge>
					</div>

					<h3 className="!text-lg uppercase !leading-[28px] text-primary mt-6">{project.attributes.title}</h3>
					<p className="mt-2 line-clamp-2 text-primary-foreground">{project.attributes.shortDescription}</p>
				</div>
				<div className="mt-4">
					<div className="flex items-center gap-2 text-sm font-medium text-secondary">
						<MapPin className="h-4 w-4" />
						<span>{project.attributes.location}</span>
					</div>

					<div className="flex items-center justify-between mt-3 gap-3 text-sm text-primary">
						<span>{formattedDate}</span>
						<Image
							src="/icons/arrow-right.svg"
							alt=""
							width={16}
							height={12}
							className="transition-transform duration-300 group-hover:translate-x-1"
							aria-hidden="true"
						/>
					</div>
				</div>
			</Card>
		</Link>
	);
}

function capitalizeFirst(value: string) {
	return value.charAt(0).toUpperCase() + value.slice(1);
}
