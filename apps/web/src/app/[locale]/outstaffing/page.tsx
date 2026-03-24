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

	const titleMap = {
		sk: "Outstaffing personálu - Prenájom stavebných špecialistov",
		en: "Personnel Outstaffing - Construction Specialists Rental",
		uk: "Аутстафінг персоналу - Оренда будівельних спеціалістів",
		cs: "Outstaffing personálu - Pronájem stavebních specialistů",
		fr: "Externalisation du personnel - Location de spécialistes en construction",
		de: "Personal-Outstaffing - Vermietung von Bauspezialisten",
	};

	const descriptionMap = {
		sk: "Získajte skúsených stavebných špecialistov bez zbytočných nákladov na hľadanie a udržiavanie zamestnancov. Rýchle riešenie pre vaše stavebné projekty.",
		en: "Get experienced construction specialists without unnecessary costs for searching and maintaining employees. Quick solution for your construction projects.",
		uk: "Отримайте досвідчених будівельних спеціалістів без зайвих витрат на пошук і утримання працівників. Швидке рішення для ваших будівельних проєктів.",
		cs: "Získejte zkušené stavební specialisty bez zbytečných nákladů na hledání a udržování zaměstnanců. Rychlé řešení pro vaše stavební projekty.",
		fr: "Obtenez des spécialistes expérimentés en construction sans coûts inutiles de recherche et de maintien d'employés. Solution rapide pour vos projets de construction.",
		de: "Erhalten Sie erfahrene Bauspezialisten ohne unnötige Kosten für die Suche und Wartung von Mitarbeitern. Schnelle Lösung für Ihre Bauprojekte.",
	};

	const keywordsMap = {
		sk: "outstaffing, prenájom pracovníkov, stavební špecialist, murári, elektrikári, santechnici",
		en: "outstaffing, personnel rental, construction specialists, bricklayers, electricians, plumbers",
		uk: "аутстафінг, оренда персоналу, будівельні спеціалісти, мулярі, електрики, сантехніки",
		cs: "outstaffing, pronájem personálu, stavební specialisté, zedníci, elektrikáři, instalatéři",
		fr: "externalisation, location de personnel, spécialistes en construction, maçons, électriciens, plombiers",
		de: "outstaffing, personalvermietung, bauspezialisten, maurer, elektriker, klempner",
	};

	return generatePageMetadata({
		title: titleMap[locale as keyof typeof titleMap] || titleMap.uk,
		description: descriptionMap[locale as keyof typeof descriptionMap] || descriptionMap.uk,
		keywords: keywordsMap[locale as keyof typeof keywordsMap] || keywordsMap.uk,
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
