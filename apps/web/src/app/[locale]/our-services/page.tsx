import {
	ContactSection,
	generateCanonicalUrl,
	generateHreflangUrls,
	generatePageMetadata,
	OrganizationSchema,
	ServicesList,
} from "@/components";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "OurServicesPage.meta" });

	return generatePageMetadata({
		title: t("title"),
		description: t("description"),
		keywords: t("keywords"),
		canonicalUrl: generateCanonicalUrl(locale, "/our-services"),
		hreflang: generateHreflangUrls("/our-services"),
		locale,
	});
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "OurServicesPage" });

	return (
		<>
			<OrganizationSchema locale={locale} type="ConstructionCompany" />
			<div className="container mx-auto pt-10 lg:pt-20 px-4 animate-slide-bottom">
				<h1 className="text-primary uppercase text-center">
					{t("Hero.headingStart")} <span className="text-secondary">{t("Hero.headingHighlight")}</span>
				</h1>
				<p className="text-primary-foreground mt-4 text-center">{t("Hero.description")}</p>
			</div>
			<ServicesList />
			<ContactSection />
		</>
	);
}
