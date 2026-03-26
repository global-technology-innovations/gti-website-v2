"use client";

import { Link } from "@/i18n/navigation";
import { Badge } from "../ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";

interface ProjectDetailHeroSectionProps {
	title: string;
	description: string;
	statusLabel: string;
	projectPeriod?: string;
	location?: string;
	client?: string;
	homeLabel: string;
	portfolioLabel: string;
}

export function ProjectDetailHeroSection({
	title,
	description,
	statusLabel,
	projectPeriod,
	location,
	client,
	homeLabel,
	portfolioLabel,
}: ProjectDetailHeroSectionProps) {
	return (
		<section className="relative mx-4 overflow-hidden rounded-b-3xl bg-background">
			<div className="absolute inset-0 bg-[url('/service-item-bg.svg')] bg-right bg-no-repeat blur-xs lg:blur-none" />
			<div className="container relative mx-auto flex flex-col py-10 lg:py-16 px-4">
				<Breadcrumb>
					<BreadcrumbList className="text-[14px] font-medium text-primary-foreground/60">
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href="/">{homeLabel}</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator>—</BreadcrumbSeparator>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href="/portfolio">{portfolioLabel}</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator>—</BreadcrumbSeparator>
						<BreadcrumbItem>
							<BreadcrumbPage className="max-w-[220px] truncate sm:max-w-none">{title}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<div className="mt-8 max-w-6xl">
					<h1 className="h3 text-center text-primary uppercase md:text-left">{title}</h1>
					<p className="mt-6 max-w-4xl text-center lg:text-left text-primary-foreground">{description}</p>

					<div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
						<Badge variant="secondaryDark">{statusLabel}</Badge>
						{projectPeriod ? <Badge variant="white">{projectPeriod}</Badge> : null}
						{location ? <Badge variant="white">{location}</Badge> : null}
						{client ? <Badge variant="white">{client}</Badge> : null}
					</div>
				</div>
			</div>
		</section>
	);
}
