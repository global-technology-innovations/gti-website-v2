import {
	BenefitsSection,
	CallToActionSection,
	ContactSection,
	generateCanonicalUrl,
	generateHreflangUrls,
	generatePageMetadata,
	OutstaffingExperienceSection,
	OutstaffingHeroSection,
	OutstaffingWorkflowSection,
	ServiceSchema,
	SpecialistsSection,
} from "@/components";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "OutstaffingPage.meta" });

	return generatePageMetadata({
		title: t("title"),
		description: t("description"),
		keywords: t("keywords"),
		canonicalUrl: generateCanonicalUrl(locale, "/outstaffing"),
		hreflang: generateHreflangUrls("/outstaffing"),
		locale,
	});
}

export default async function OutstaffingPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "OutstaffingPage" });

	return (
		<>
			<ServiceSchema locale={locale} serviceType="outstaffing" />

			<OutstaffingHeroSection />
			<OutstaffingExperienceSection />
			<BenefitsSection />
			<SpecialistsSection />
			<CallToActionSection
				sectionId="outstaffing-cta"
				title={t("CallToAction.title")}
				description={t("CallToAction.description")}
				buttonText={t("CallToAction.buttonText")}
			/>
			<OutstaffingWorkflowSection />
			<ContactSection
				customTitle={t.rich("Contact.title", {
					highlight: (chunks) => <span className="text-secondary">{chunks}</span>,
				})}
				customDescription={t("Contact.description")}
			/>
		</>
	);
}
