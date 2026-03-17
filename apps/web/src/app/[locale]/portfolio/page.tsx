import { PortfolioListSection, generateCanonicalUrl, generateHreflangUrls, generatePageMetadata } from "@/components";
import { useTranslations } from "next-intl";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;

	const titleMap = {
		sk: "Portfólio projektov - Naše realizované stavebné projekty",
		en: "Project Portfolio - Our Completed Construction Projects",
		uk: "Портфоліо проєктів - Наші реалізовані будівельні проєкти",
		cs: "Portfolio projektů - Naše realizované stavební projekty",
		fr: "Portfolio de projets - Nos projets de construction réalisés",
		de: "Projektportfolio - Unsere realisierten Bauprojekte",
	};

	const descriptionMap = {
		sk: "Pozrite si naše najlepšie stavebné projekty. Od rezidenčných budov po komerčné objekty - kvalita a spoľahlivosť v každom detaile.",
		en: "Explore our best construction projects. From residential buildings to commercial facilities - quality and reliability in every detail.",
		uk: "Перегляньте наші найкращі будівельні проєкти. Від житлових будинків до комерційних об'єктів - якість та надійність у кожній деталі.",
		cs: "Podívejte se na naše nejlepší stavební projekty. Od rezidenčních budov po komerční objekty - kvalita a spolehlivost v každém detailu.",
		fr: "Découvrez nos meilleurs projets de construction. Des bâtiments résidentiels aux installations commerciales - qualité et fiabilité dans chaque détail.",
		de: "Entdecken Sie unsere besten Bauprojekte. Von Wohngebäuden bis hin zu Gewerbeobjekten - Qualität und Zuverlässigkeit in jedem Detail.",
	};

	const keywordsMap = {
		sk: "portfólio, stavebné projekty, realizované projekty, bytové domy, komerčné objekty",
		en: "portfolio, construction projects, completed projects, residential buildings, commercial facilities",
		uk: "портфоліо, будівельні проєкти, реалізовані проєкти, житлові будинки, комерційні об'єкти",
		cs: "portfolio, stavební projekty, realizované projekty, bytové domy, komerční objekty",
		fr: "portfolio, projets de construction, projets réalisés, bâtiments résidentiels, installations commerciales",
		de: "portfolio, bauprojekte, realisierte projekte, wohngebäude, gewerbeobjekte",
	};

	return generatePageMetadata({
		title: titleMap[locale as keyof typeof titleMap] || titleMap.uk,
		description: descriptionMap[locale as keyof typeof descriptionMap] || descriptionMap.uk,
		keywords: keywordsMap[locale as keyof typeof keywordsMap] || keywordsMap.uk,
		canonicalUrl: generateCanonicalUrl(locale, "/portfolio"),
		hreflang: generateHreflangUrls("/portfolio"),
		locale,
	});
}

export default function PortfolioPage() {
	const t = useTranslations("PortfolioPage");
	const { beforeHighlight, highlight } = splitTitle(t("Hero.title"));
	return (
		<>
			<div className="container mx-auto pt-20 px-4">
				<h2 className="text-center uppercase text-primary">
					{beforeHighlight} <span className="text-secondary">{highlight}</span>
				</h2>
				<p className="mt-5 text-center text-primary-foreground">{t("Hero.description")}</p>
			</div>
			<PortfolioListSection />
		</>
	);
}

function splitTitle(title: string) {
	const words = title.trim().split(/\s+/);

	if (words.length < 2) {
		return { beforeHighlight: title, highlight: "" };
	}

	return {
		beforeHighlight: words.slice(0, -1).join(" "),
		highlight: words.at(-1) ?? "",
	};
}
