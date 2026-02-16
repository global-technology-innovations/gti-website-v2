"use client";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	Button,
} from "@/components";
import { Link } from "@/i18n/navigation";
import renderRichText from "@/lib/renderRichText";
import { useSingleServiceQuery } from "@/queries";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";

export default function ServiceDetailPage() {
	const { slug } = useParams<{ slug: string }>();
	const locale = useLocale();
	const t = useTranslations("OurServicesPage");
	const { data: service, isLoading, error } = useSingleServiceQuery(slug, locale);

	if (isLoading) return <p>Завантаження...</p>;
	if (error || !service) notFound();

	return (
		<>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/our-services">{t("title")}</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{service.title}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<h1 className="pt-6">{service.title}</h1>

			<div className="flex flex-col lg:flex-row gap-4 mt-6">
				<div className="flex flex-col gap-4 w-full lg:w-1/2">
					{service.image && (
						<Image
							src={service.image}
							alt={service.title}
							width={800}
							height={400}
							className="w-full object-cover rounded-lg"
						/>
					)}
				</div>
				<div className="flex flex-col justify-between gap-4 w-full lg:w-1/2">
					<div className="flex flex-col gap-3 lg:gap-2">
						{renderRichText(service.description, {
							paragraph: "!text-[14px] md:!text-[18px] lg:!text-[16px] !leading-5",
						})}
					</div>

					<div className="flex lg:justify-end">
						<Button asChild className="w-full">
							<Link href="/contact">{t("order")}</Link>
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}
