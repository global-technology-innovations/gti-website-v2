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
	const t = await getTranslations({ locale, namespace: "ContactPage" });

	const contactDetails = [
		{
			iconSrc: "/icons/phone-calling.svg",
			iconAlt: "phone",
			label: t("FormSection.details.phoneUa.label"),
			value: t("FormSection.details.phoneUa.value"),
			href: "tel:+380973737240",
		},
		{
			iconSrc: "/icons/phone-calling.svg",
			iconAlt: "phone",
			label: t("FormSection.details.phoneSk.label"),
			value: t("FormSection.details.phoneSk.value"),
			href: "tel:+421917089618",
		},
		{
			iconSrc: "/icons/inbox.svg",
			iconAlt: "email",
			label: t("FormSection.details.email.label"),
			value: t("FormSection.details.email.value"),
			href: "mailto:info@global-technology-innovations.com",
			fullWidth: true,
		},
		{
			iconSrc: "/icons/map-point.svg",
			iconAlt: "address",
			label: t("FormSection.details.address.label"),
			value: t("FormSection.details.address.value"),
			href: "https://maps.google.com/?q=Jenisejská+45A,+040+12+Košice-Nad+Jazerom",
			external: true,
			fullWidth: true,
		},
		{
			iconSrc: "/icons/clipboard.svg",
			iconAlt: "working hours",
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
