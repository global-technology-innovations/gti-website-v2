import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	Button,
	generateCanonicalUrl,
	generatePageMetadata,
	Reveal,
} from "@/components";
import { Link } from "@/i18n/navigation";
import renderRichText from "@/lib/renderRichText";
import {
	getServiceDetail,
	type ServiceDetail,
} from "@/lib/services/getServiceDetail";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

const CONTENT_CLASSNAMES: Parameters<typeof renderRichText>[1] = {
	heading:
		"text-[28px] leading-[36px] font-bold uppercase text-primary sm:text-[32px] sm:leading-[40px]",
	heading2:
		"text-[28px] leading-[36px] font-bold uppercase text-primary sm:text-[32px] sm:leading-[40px]",
	heading3:
		"text-[24px] leading-[32px] font-bold uppercase text-primary sm:text-[28px] sm:leading-[36px]",
	paragraph:
		"!text-[16px] !leading-[24px] !font-medium !text-primary-foreground",
	ul: "!list-outside list-disc pl-5 space-y-3 marker:text-secondary",
	ol: "!list-outside list-decimal pl-5 space-y-3 marker:text-secondary",
	li: "!pl-1 !text-[16px] !leading-[24px] !font-medium !text-primary-foreground",
	link: "!text-secondary underline underline-offset-4",
	blockquote:
		"!my-0 border-l-2 !border-secondary/30 !pl-5 !text-[16px] !leading-[24px] !font-medium !text-primary-foreground",
	image: "grayscale rounded-3xl",
};

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string; slug: string }>;
}) {
	const { locale, slug } = await params;
	const service = await getServiceDetail(slug, locale);

	if (!service) {
		return {};
	}

	return generatePageMetadata({
		title: service.title,
		description: service.shortDescription,
		canonicalUrl: generateCanonicalUrl(locale, `/our-services/${slug}`),
		locale,
	});
}

export default async function ServiceDetailPage({
	params,
}: {
	params: Promise<{ locale: string; slug: string }>;
}) {
	const { locale, slug } = await params;
	const [service, tServices, tNav] = await Promise.all([
		getServiceDetail(slug, locale),
		getTranslations({ locale, namespace: "OurServicesPage" }),
		getTranslations({ locale, namespace: "Header.nav" }),
	]);

	if (!service) {
		notFound();
	}

	return (
		<Reveal>
			<section className="relative mx-4 bg-background bg-[url('/service-item-bg.svg')] bg-right bg-no-repeat bg-[length:auto_100%] rounded-b-3xl">
				<div className="container py-22 flex flex-col relative mx-auto">
					<ServiceBreadcrumb
						title={service.title}
						homeLabel={tNav("home")}
						servicesLabel={tNav("services")}
					/>
					<div className="flex flex-col items-start mt-8">
						<h1 className="text-primary text-center md:text-left uppercase">
							Штукатурка
						</h1>
						<p className="text-primary mt-6 text-left max-w-1/2">
							Якісне вирівнювання та підготовка поверхонь для
							подальших оздоблювальних робітіз дотриманням
							сучасних технологій та стандартів будівництва.
						</p>
						<Button asChild variant="secondary" className="mt-8">
							<Link href="/contact">
								Замовити послугу{" "}
								<ArrowRight className="w-4 h-4" />
							</Link>
						</Button>
					</div>
				</div>
			</section>
		</Reveal>
	);
}

function ServiceBreadcrumb({
	title,
	homeLabel,
	servicesLabel,
}: {
	title: ServiceDetail["title"];
	homeLabel: string;
	servicesLabel: string;
}) {
	return (
		<Breadcrumb>
			<BreadcrumbList className="text-[14px] font-medium text-primary-foreground/60">
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link href="/">{homeLabel}</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link href="/our-services">{servicesLabel}</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage className="text-primary-foreground">
						{title}
					</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
}
