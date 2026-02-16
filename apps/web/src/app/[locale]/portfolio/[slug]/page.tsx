"use client";

import {
	Badge,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	Button,
	ContactModal,
	ProjectGallery,
} from "@/components";
import { Link } from "@/i18n/navigation";
import { STRAPI_API_URL } from "@/lib/api";
import renderRichText from "@/lib/renderRichText";
import { useSingleProjectQuery } from "@/queries/useSingleProjectQuery";
import { format } from "date-fns";
import { cs, de, enUS, fr, sk, uk } from "date-fns/locale";
import {
	AlertCircle,
	ArrowLeft,
	Building2,
	Calendar,
	CalendarClock,
	CheckCircle,
	Clock,
	Loader2,
	MapPin,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";

const localeMap = {
	uk: uk,
	sk: sk,
	cs: cs,
	en: enUS,
	fr: fr,
	de: de,
};

export default function ProjectDetailPage() {
	const params = useParams();
	const slug = params.slug as string;
	const locale = params.locale as string;
	const t = useTranslations("Portfolio");
	const tCard = useTranslations("PortfolioPage.ProjectCard");
	const tNav = useTranslations("Header.nav");

	const { data: project, isLoading, error } = useSingleProjectQuery(slug);

	// Loading state
	if (isLoading) {
		return (
			<div className="mt-[75px] min-h-screen flex items-center justify-center">
				<Loader2 className="w-12 h-12 animate-spin text-primary" />
			</div>
		);
	}

	// Error or not found
	if (error || !project) {
		return (
			<div className="mt-[75px] min-h-screen flex items-center justify-center px-6">
				<div className="text-center max-w-md">
					<AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
					<h1 className="text-3xl font-bold mb-2">{t("projectNotFound")}</h1>
					<p className="text-muted-foreground mb-6">{t("projectNotFoundDesc")}</p>
					<Button asChild>
						<Link href="/portfolio">
							<ArrowLeft className="w-4 h-4 mr-2" />
							{t("backToPortfolio")}
						</Link>
					</Button>
				</div>
			</div>
		);
	}

	const mainImageUrl = project.attributes.mainImage?.data?.attributes?.url;
	const heroImageSrc = mainImageUrl
		? mainImageUrl.startsWith("http")
			? mainImageUrl
			: `${STRAPI_API_URL.replace("/api", "")}${mainImageUrl}`
		: "/placeholder.png";

	const dateLocale = localeMap[locale as keyof typeof localeMap] || uk;
	const startDate = project.attributes.startDate
		? format(new Date(project.attributes.startDate), "LLLL yyyy", { locale: dateLocale })
		: null;
	const endDate = project.attributes.endDate
		? format(new Date(project.attributes.endDate), "LLLL yyyy", { locale: dateLocale })
		: null;

	const statusKey =
		project.attributes.status === "completed"
			? "completed"
			: project.attributes.status === "in-progress"
				? "inProgress"
				: "planned";

	const StatusIcon =
		project.attributes.status === "completed"
			? CheckCircle
			: project.attributes.status === "in-progress"
				? Clock
				: CalendarClock;

	return (
		<>
			{/* Breadcrumbs */}
			<div className="container mx-auto px-6 py-6">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/portfolio">{tNav("portfolio")}</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>{project.attributes.title}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>

			{/* Hero Section */}
			<section className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
				<Image
					src={heroImageSrc}
					alt={project.attributes.title}
					fill
					className="absolute inset-0 w-full h-full object-cover"
					priority
				/>

				{/* Overlay */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

				{/* Hero Content */}
				<div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
					<div className="container mx-auto max-w-6xl">
						<div className="flex items-center gap-3 mb-4">
							<Badge className="bg-white/20 text-white border-white/40 backdrop-blur-sm">
								<StatusIcon className="w-4 h-4 mr-2" />
								{tCard(`status.${statusKey}`)}
							</Badge>
							{project.attributes.category && (
								<Badge className="bg-white/20 text-white border-white/40 backdrop-blur-sm">
									{project.attributes.category}
								</Badge>
							)}
						</div>

						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 !text-white">
							{project.attributes.title}
						</h1>

						<div className="flex flex-wrap gap-4 md:gap-6 text-sm md:text-base">
							{startDate && (
								<div className="flex items-center gap-2">
									<Calendar className="w-5 h-5" />
									<span>
										{startDate}
										{endDate && ` - ${endDate}`}
									</span>
								</div>
							)}
							<div className="flex items-center gap-2">
								<MapPin className="w-5 h-5" />
								<span>{project.attributes.location}</span>
							</div>
							<div className="flex items-center gap-2">
								<Building2 className="w-5 h-5" />
								<span>{project.attributes.client}</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Main Content */}
			<section className="container mx-auto px-6 py-12 max-w-7xl">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
					{/* Description */}
					<div className="lg:col-span-2">
						<h2 className="text-3xl font-bold mb-6">{t("projectDescription")}</h2>
						<div className="prose prose-lg max-w-none text-muted-foreground">
							{project.attributes.description ? (
								renderRichText(JSON.parse(project.attributes.description))
							) : (
								<p>{project.attributes.shortDescription}</p>
							)}
						</div>
					</div>
				</div>
			</section>

			{/* Gallery Section */}
			{project.attributes.images?.data && project.attributes.images.data.length > 0 && (
				<section className="container mx-auto px-6 pb-12 max-w-7xl">
					<h2 className="text-3xl font-bold mb-8">{t("projectGallery")}</h2>
					<ProjectGallery
						images={project.attributes.images.data}
						title={project.attributes.title}
					/>
				</section>
			)}

			{/* CTA Section */}
			<section className="bg-primary/5 py-16 mt-12">
				<div className="container mx-auto px-6 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">{t("interestedInProject")}</h2>
					<p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
						{t("interestedDesc")}
					</p>
					<div className="flex flex-row gap-4 justify-center items-center">
						<ContactModal triggerText={t("contactUs")} className="mx-0 mt-0" />
						<Button variant="default" className="" asChild>
							<Link href="/our-services">{t("ourServices")}</Link>
						</Button>
					</div>
				</div>
			</section>
		</>
	);
}
