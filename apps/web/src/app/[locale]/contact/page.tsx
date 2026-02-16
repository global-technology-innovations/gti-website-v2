import {
	ContactFormSection,
	ContactInfo,
	ContactPageSchema,
	MultiHeroSection,
	generateCanonicalUrl,
	generateHreflangUrls,
	generatePageMetadata,
} from "@/components";
import { useTranslations } from "next-intl";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;

	const titleMap = {
		sk: "Kontakt - Skontaktujte sa s nami",
		en: "Contact - Get in Touch with Us",
		uk: "Контакти - Зв'яжіться з нами",
		cs: "Kontakt - Kontaktujte nás",
		fr: "Contact - Contactez-nous",
		de: "Kontakt - Nehmen Sie Kontakt mit uns auf",
	};

	const descriptionMap = {
		sk: "Máte otázky alebo záujem o naše služby? Kontaktujte nás prostredníctvom formulára, e-mailu alebo telefónu. Radi vám pomôžeme.",
		en: "Have questions or interested in our services? Contact us through the form, email or phone. We'll be happy to help you.",
		uk: "Маєте запитання або цікавитесь нашими послугами? Зв'яжіться з нами через форму, email або телефон. Ми раді допомогти вам.",
		cs: "Máte otázky nebo zájem o naše služby? Kontaktujte nás prostřednictvím formuláře, e-mailu nebo telefonu. Rádi vám pomůžeme.",
		fr: "Vous avez des questions ou vous êtes intéressé par nos services? Contactez-nous via le formulaire, e-mail ou téléphone. Nous serons heureux de vous aider.",
		de: "Haben Sie Fragen oder Interesse an unseren Dienstleistungen? Kontaktieren Sie uns über das Formular, E-Mail oder Telefon. Wir helfen Ihnen gerne.",
	};

	const keywordsMap = {
		sk: "kontakt, kontaktný formulár, email, telefón, adresa, konzultácia",
		en: "contact, contact form, email, phone, address, consultation",
		uk: "контакти, контактна форма, email, телефон, адреса, консультація",
		cs: "kontakt, kontaktní formulář, email, telefon, adresa, konzultace",
		fr: "contact, formulaire de contact, email, téléphone, adresse, consultation",
		de: "kontakt, kontaktformular, email, telefon, adresse, beratung",
	};

	return generatePageMetadata({
		title: titleMap[locale as keyof typeof titleMap] || titleMap.uk,
		description: descriptionMap[locale as keyof typeof descriptionMap] || descriptionMap.uk,
		keywords: keywordsMap[locale as keyof typeof keywordsMap] || keywordsMap.uk,
		canonicalUrl: generateCanonicalUrl(locale, "/contact"),
		hreflang: generateHreflangUrls("/contact"),
		locale,
	});
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;

	return (
		<>
			<ContactPageSchema locale={locale} />
			<ContactPageContent />
		</>
	);
}

function ContactPageContent() {
	const t = useTranslations("ContactPage");

	return (
		<>
			<MultiHeroSection
				badgeText={t("Hero.badge")}
				title={t("Hero.title")}
				description={t("Hero.description")}
			/>
			<ContactInfo />
			<ContactFormSection />
			{/* <MapSection /> */}
		</>
	);
}
