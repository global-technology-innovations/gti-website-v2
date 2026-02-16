import {
	JobsList,
	MultiHeroSection,
	generateCanonicalUrl,
	generateHreflangUrls,
	generatePageMetadata,
} from "@/components";
import { useTranslations } from "next-intl";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;

	const titleMap = {
		sk: "Kariéra - Pracujte s nami",
		en: "Careers - Work with Us",
		uk: "Кар'єра - Працюйте з нами",
		cs: "Kariéra - Pracujte s námi",
		fr: "Carrières - Travaillez avec nous",
		de: "Karriere - Arbeiten Sie mit uns",
	};

	const descriptionMap = {
		sk: "Hľadáte prácu v stavebníctve? Pozrite si aktuálne voľné pozície v Global Technology Innovations a staňte sa súčasťou nášho tímu.",
		en: "Looking for a job in construction? Check out current openings at Global Technology Innovations and become part of our team.",
		uk: "Шукаєте роботу в будівництві? Перегляньте актуальні вакансії в Global Technology Innovations і станьте частиною нашої команди.",
		cs: "Hledáte práci ve stavebnictví? Podívejte se na aktuální volné pozice v Global Technology Innovations a staňte se součástí našeho týmu.",
		fr: "Vous cherchez un emploi dans la construction? Consultez les postes actuellement ouverts chez Global Technology Innovations et rejoignez notre équipe.",
		de: "Suchen Sie eine Arbeit im Bauwesen? Sehen Sie sich die aktuellen offenen Stellen bei Global Technology Innovations an und werden Sie Teil unseres Teams.",
	};

	const keywordsMap = {
		sk: "kariéra, práca, voľné pozície, stavebníctvo, zamestnanie, job",
		en: "careers, jobs, vacancies, construction, employment, work",
		uk: "кар'єра, робота, вакансії, будівництво, працевлаштування",
		cs: "kariéra, práce, volné pozice, stavebnictví, zaměstnání",
		fr: "carrières, emplois, postes vacants, construction, travail",
		de: "karriere, jobs, stellenangebote, bauwesen, beschäftigung",
	};

	return generatePageMetadata({
		title: titleMap[locale as keyof typeof titleMap] || titleMap.uk,
		description: descriptionMap[locale as keyof typeof descriptionMap] || descriptionMap.uk,
		keywords: keywordsMap[locale as keyof typeof keywordsMap] || keywordsMap.uk,
		canonicalUrl: generateCanonicalUrl(locale, "/careers"),
		hreflang: generateHreflangUrls("/careers"),
		locale,
	});
}

export default function CareersPage() {
	const t = useTranslations("CareersPage");

	return (
		<>
			<MultiHeroSection
				badgeText={t("Hero.badge")}
				title={t("Hero.title")}
				description={t("Hero.description")}
			/>
			<JobsList />
		</>
	);
}
