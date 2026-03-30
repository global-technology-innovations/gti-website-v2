import {
	AboutHeroSection,
	AboutPageSchema,
	CallToActionSection,
	ContactSection,
	FAQSection,
	HistorySection,
	OrganizationSchema,
	PrinciplesSection,
	ReviewsSection,
	generateCanonicalUrl,
	generateHreflangUrls,
	generatePageMetadata,
} from "@/components";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "AboutPage.meta" });

	return generatePageMetadata({
		title: t("title"),
		description: t("description"),
		keywords: t("keywords"),
		canonicalUrl: generateCanonicalUrl(locale, "/about"),
		hreflang: generateHreflangUrls("/about"),
		locale,
	});
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;

	return (
		<>
			<OrganizationSchema type="Organization" locale={locale} />
			<AboutPageSchema locale={locale} />

			<AboutHeroSection />
			<HistorySection />
			<PrinciplesSection />
			<CallToActionSection />
			<ReviewsSection />
			<FAQSection />
			<ContactSection />
		</>
	);
}
