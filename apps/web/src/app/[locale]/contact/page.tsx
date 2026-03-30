import {
	ContactHeroSection,
	ContactPageSchema,
	ContactSection,
	generateCanonicalUrl,
	generateHreflangUrls,
	generatePageMetadata,
} from "@/components";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "ContactPage.meta" });

	return generatePageMetadata({
		title: t("title"),
		description: t("description"),
		keywords: t("keywords"),
		canonicalUrl: generateCanonicalUrl(locale, "/contact"),
		hreflang: generateHreflangUrls("/contact"),
		locale,
	});
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "ContactPage" });

	const contactDetails = [
		{
			iconSrc: "/icons/phone-calling.svg",
			label: t("FormSection.details.phoneUa.label"),
			value: t("FormSection.details.phoneUa.value"),
			href: "tel:+380973737240",
		},
		{
			iconSrc: "/icons/phone-calling.svg",
			label: t("FormSection.details.phoneSk.label"),
			value: t("FormSection.details.phoneSk.value"),
			href: "tel:+421917089618",
		},
		{
			iconSrc: "/icons/inbox.svg",
			label: t("FormSection.details.email.label"),
			value: t("FormSection.details.email.value"),
			href: "mailto:info@global-technology-innovations.com",
			fullWidth: true,
		},
		{
			iconSrc: "/icons/map-point.svg",
			label: t("FormSection.details.address.label"),
			value: t("FormSection.details.address.value"),
			href: "https://maps.google.com/?q=Jenisejská+45A,+040+12+Košice-Nad+Jazerom",
			external: true,
			fullWidth: true,
		},
		{
			iconSrc: "/icons/clipboard.svg",
			label: t("FormSection.details.hours.label"),
			value: t("FormSection.details.hours.value"),
			fullWidth: true,
		},
	];

	return (
		<>
			<ContactPageSchema locale={locale} />
			<ContactHeroSection />
			<ContactSection
				customTitle={t("FormSection.title")}
				customDescription={t("FormSection.description")}
				contactDetails={contactDetails}
				contactDetailsVariant="grid"
			/>
		</>
	);
}
