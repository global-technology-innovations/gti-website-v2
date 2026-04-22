import {
	BreadcrumbSchema,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	Button,
	generateCanonicalUrl,
	generatePageMetadata,
} from "@/components";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { DETAIL_CONTENT_CLASSNAMES } from "@/lib/detailContentClassNames";
import { generateDynamicHreflangUrls } from "@/lib/localizedSeo";
import renderRichText from "@/lib/renderRichText";
import { getServiceBySlug, getServices, type Service } from "@/lib/services/services";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
	const paramsByLocale = await Promise.all(
		routing.locales.map(async (locale) => {
			const services = await getServices(locale);

			return services.map((service) => ({
				locale,
				slug: service.slug,
			}));
		})
	);

	return paramsByLocale.flat();
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
	const { locale, slug } = await params;
	const service = await getServiceBySlug(slug, locale);

	if (!service) {
		return {
			robots: {
				index: false,
				follow: false,
			},
		};
	}

	return generatePageMetadata({
		title: service.title,
		description: service.shortDescription,
		canonicalUrl: generateCanonicalUrl(locale, `/our-services/${service.slug}`),
		hreflang: generateDynamicHreflangUrls({
			kind: "service",
			currentLocale: locale,
			currentSlug: service.slug,
			currentId: service.id,
			currentTitle: service.title,
			localizations: service.localizations,
		}),
		locale,
	});
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
	const { locale, slug } = await params;
	const [service, tNav, tServices] = await Promise.all([
		getServiceBySlug(slug, locale),
		getTranslations({ locale, namespace: "Header.nav" }),
		getTranslations({ locale, namespace: "OurServicesPage" }),
	]);

	if (!service) {
		notFound();
	}

	const canonicalUrl = generateCanonicalUrl(locale, `/our-services/${service.slug}`);

	return (
		<>
			<BreadcrumbSchema
				items={[
					{ name: tNav("home"), url: generateCanonicalUrl(locale, "/") },
					{ name: tNav("services"), url: generateCanonicalUrl(locale, "/our-services") },
					{ name: service.title, url: canonicalUrl },
				]}
			/>
			<section className="relative mx-4 bg-background rounded-b-3xl">
				<div className="absolute inset-0 bg-[url('/service-item-bg.svg')]  bg-right bg-no-repeat bg-[length:auto_100%] blur-xs lg:blur-none animate-slide-right" />
				<div className="container py-10 lg:py-22 px-4 flex flex-col relative mx-auto animate-slide-left">
					<ServiceBreadcrumb title={service.title} homeLabel={tNav("home")} servicesLabel={tNav("services")} />
					<div className="mt-8 flex flex-col items-center lg:items-start">
						<h1 className="h3 text-center text-primary uppercase md:text-left">{service.title}</h1>
						<p className="mt-6 max-w-2xl text-center lg:text-left text-primary">{service.shortDescription}</p>
						<Button asChild variant="secondary" className="mt-8">
							<Link href="/contact">
								{tServices("order")} <ArrowRight className="w-4 h-4" />
							</Link>
						</Button>
					</div>
				</div>
			</section>

			{service.description.length > 0 ? (
				<section className="px-4 py-10 lg:py-16 animate-slide-bottom">
					<div className="container mx-auto">
						<div className="mx-auto max-w-[1100px] space-y-6">
							{renderRichText(service.description, DETAIL_CONTENT_CLASSNAMES)}
						</div>
					</div>
				</section>
			) : null}
		</>
	);
}

function ServiceBreadcrumb({ title, homeLabel, servicesLabel }: { title: Service["title"]; homeLabel: string; servicesLabel: string }) {
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
					<BreadcrumbPage>{title}</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
}
