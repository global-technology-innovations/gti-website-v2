import {
	ContactSection,
	generateCanonicalUrl,
	generateHreflangUrls,
	generatePageMetadata,
	OrganizationSchema,
	ServicesList,
} from "@/components";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;

	const titleMap = {
		sk: "Naše služby - Komplexné stavebné riešenia",
		en: "Our Services - Comprehensive Construction Solutions",
		uk: "Наші послуги - Комплексні будівельні рішення",
		cs: "Naše služby - Komplexní stavební řešení",
		fr: "Nos services - Solutions de construction complètes",
		de: "Unsere Dienstleistungen - Umfassende Baulösungen",
	};

	const descriptionMap = {
		sk: "Ponúkame široký rozsah stavebných služieb od dizajnu po realizáciu. Rezidenčné, komerčné a špecializované projekty na kľúč.",
		en: "We offer a wide range of construction services from design to implementation. Residential, commercial and specialized turnkey projects.",
		uk: "Пропонуємо широкий спектр будівельних послуг від дизайну до реалізації. Житлові, комерційні та спеціалізовані проєкти під ключ.",
		cs: "Nabízíme širokou škálu stavebních služeb od designu po realizaci. Rezidenční, komerční a specializované projekty na klíč.",
		fr: "Nous offrons une large gamme de services de construction de la conception à la réalisation. Projets résidentiels, commerciaux et spécialisés clés en main.",
		de: "Wir bieten ein breites Spektrum an Bauleistungen vom Design bis zur Umsetzung. Wohn-, Gewerbe- und Spezialprojekte schlüsselfertig.",
	};

	const keywordsMap = {
		sk: "stavebné služby, rekonštrukcie, novostavby, projektový manažment, stavebné práce",
		en: "construction services, renovations, new builds, project management, construction work",
		uk: "будівельні послуги, реконструкції, нові будівлі, управління проєктами, будівельні роботи",
		cs: "stavební služby, rekonstrukce, novostavby, projektový management, stavební práce",
		fr: "services de construction, rénovations, nouvelles constructions, gestion de projet, travaux de construction",
		de: "baudienstleistungen, renovierungen, neubauten, projektmanagement, bauarbeiten",
	};

	return generatePageMetadata({
		title: titleMap[locale as keyof typeof titleMap] || titleMap.uk,
		description: descriptionMap[locale as keyof typeof descriptionMap] || descriptionMap.uk,
		keywords: keywordsMap[locale as keyof typeof keywordsMap] || keywordsMap.uk,
		canonicalUrl: generateCanonicalUrl(locale, "/our-services"),
		hreflang: generateHreflangUrls("/our-services"),
		locale,
	});
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;

	return (
		<>
			<OrganizationSchema locale={locale} type="ConstructionCompany" />
			<div className="container mx-auto pt-20 px-4">
				<h2 className="text-primary uppercase text-center">
					Повний цикл робіт <span className="text-secondary">під ключ</span>
				</h2>
				<p className="text-primary-foreground mt-4 text-center">
					Від ідеї та проєктування до реалізації та сервісного супроводу — беремо відповідальність за результат.
				</p>
			</div>
			<ServicesList />
			<ContactSection />
		</>
	);
}
