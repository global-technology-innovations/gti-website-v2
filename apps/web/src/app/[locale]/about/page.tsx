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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;

	const titleMap = {
		sk: "O nás - Naša história a hodnoty",
		en: "About Us - Our History and Values",
		uk: "Про нас - Наша історія та цінності",
		cs: "O nás - Naše historie a hodnoty",
		fr: "À propos - Notre histoire et nos valeurs",
		de: "Über uns - Unsere Geschichte und Werte",
	};

	const descriptionMap = {
		sk: "Spoznajte Global Technology Innovations - našu históriu, misiu, víziu a hodnoty. Už viac ako 15 rokov poskytujeme kvalitné stavebné služby.",
		en: "Learn about Global Technology Innovations - our history, mission, vision and values. We have been providing quality construction services for over 15 years.",
		uk: "Дізнайтеся про Global Technology Innovations - нашу історію, місію, бачення та цінності. Ми надаємо якісні будівельні послуги понад 15 років.",
		cs: "Poznejte Global Technology Innovations - naši historii, misi, vizi a hodnoty. Více než 15 let poskytujeme kvalitní stavební služby.",
		fr: "Découvrez Global Technology Innovations - notre histoire, mission, vision et valeurs. Nous fournissons des services de construction de qualité depuis plus de 15 ans.",
		de: "Lernen Sie Global Technology Innovations kennen - unsere Geschichte, Mission, Vision und Werte. Seit über 15 Jahren bieten wir qualitativ hochwertige Baudienstleistungen.",
	};

	const keywordsMap = {
		sk: "o nás, about us, história spoločnosti, naše hodnoty, tím, stavebná firma",
		en: "about us, company history, our values, team, construction company",
		uk: "про нас, історія компанії, наші цінності, команда, будівельна компанія",
		cs: "o nás, historie společnosti, naše hodnoty, tým, stavební firma",
		fr: "à propos, histoire de l'entreprise, nos valeurs, équipe, entreprise de construction",
		de: "über uns, unternehmensgeschichte, unsere werte, team, bauunternehmen",
	};

	return generatePageMetadata({
		title: titleMap[locale as keyof typeof titleMap] || titleMap.uk,
		description: descriptionMap[locale as keyof typeof descriptionMap] || descriptionMap.uk,
		keywords: keywordsMap[locale as keyof typeof keywordsMap] || keywordsMap.uk,
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
