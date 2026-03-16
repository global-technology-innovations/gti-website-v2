import {
	AboutUsSection,
	ContactSection,
	FAQSchema,
	FAQSection,
	generateCanonicalUrl,
	generateHreflangUrls,
	generatePageMetadata,
	HeroSection,
	OrganizationSchema,
	ServicesSection,
} from "@/components";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const t = await getTranslations({
		locale,
		namespace: "HomePage.HeroSection",
	});

	// Ключові слова залежно від мови
	const keywordsMap = {
		sk: "stavebné služby, construction services, building renovation, slovakia, košice",
		en: "construction services, building renovation, turnkey solutions, slovakia",
		uk: "будівельні послуги, реновація будівель, комплексні рішення, словаччина",
		cs: "stavební služby, renovace budov, komplexní řešení, slovensko",
		fr: "services de construction, rénovation de bâtiments, solutions clés en main",
		de: "baudienstleistungen, gebäudesanierung, schlüsselfertige lösungen",
	};

	return generatePageMetadata({
		title: t("title"),
		description: t("description"),
		keywords:
			keywordsMap[locale as keyof typeof keywordsMap] || keywordsMap.uk,
		canonicalUrl: generateCanonicalUrl(locale, ""),
		hreflang: generateHreflangUrls(""),
		locale,
	});
}

export default async function HomePage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const tFAQ = await getTranslations({
		locale,
		namespace: "HomePage.FAQSection",
	});

	const faqData = [];
	let i = 0;
	while (tFAQ.has(`items.${i}.question`)) {
		faqData.push({
			question: tFAQ(`items.${i}.question`),
			answer: tFAQ(`items.${i}.answer`),
		});
		i++;
	}

	return (
		<>
			<OrganizationSchema locale={locale} />
			{faqData.length > 0 && <FAQSchema faqs={faqData} />}

			<HeroSection />
			<AboutUsSection />
			<ServicesSection />
			<FAQSection />
			<ContactSection />
		</>
	);
}
