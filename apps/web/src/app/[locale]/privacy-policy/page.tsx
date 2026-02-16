import {
	Badge,
	Card,
	CardContent,
	generateCanonicalUrl,
	generateHreflangUrls,
	generatePageMetadata,
	MultiHeroSection,
	Reveal,
} from "@/components";
import { useTranslations } from "next-intl";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;

	const titleMap = {
		sk: "Ochrana osobných údajov - GDPR",
		en: "Privacy Policy - GDPR",
		uk: "Політика конфіденційності - GDPR",
		cs: "Ochrana osobních údajů - GDPR",
		fr: "Politique de confidentialité - RGPD",
		de: "Datenschutzrichtlinie - DSGVO",
	};

	const descriptionMap = {
		sk: "Prečítajte si našu politiku ochrany osobných údajov a zistite, ako spracúvame a chránime vaše osobné informácie v súlade s GDPR.",
		en: "Read our privacy policy and learn how we process and protect your personal information in accordance with GDPR.",
		uk: "Ознайомтеся з нашою політикою конфіденційності та дізнайтеся, як ми обробляємо та захищаємо вашу особисту інформацію відповідно до GDPR.",
		cs: "Přečtěte si naši politiku ochrany osobních údajů a zjistěte, jak zpracováváme a chráníme vaše osobní informace v souladu s GDPR.",
		fr: "Lisez notre politique de confidentialité et découvrez comment nous traitons et protégeons vos informations personnelles conformément au RGPD.",
		de: "Lesen Sie unsere Datenschutzrichtlinie und erfahren Sie, wie wir Ihre persönlichen Daten gemäß der DSGVO verarbeiten und schützen.",
	};

	const keywordsMap = {
		sk: "ochrana osobných údajov, GDPR, súkromie, osobné údaje, zabezpečenie dát",
		en: "privacy policy, GDPR, privacy, personal data, data security",
		uk: "політика конфіденційності, GDPR, приватність, особисті дані, безпека даних",
		cs: "ochrana osobních údajů, GDPR, soukromí, osobní údaje, zabezpečení dat",
		fr: "politique de confidentialité, RGPD, vie privée, données personnelles, sécurité des données",
		de: "datenschutzrichtlinie, DSGVO, datenschutz, personenbezogene daten, datensicherheit",
	};

	return generatePageMetadata({
		title: titleMap[locale as keyof typeof titleMap] || titleMap.uk,
		description: descriptionMap[locale as keyof typeof descriptionMap] || descriptionMap.uk,
		keywords: keywordsMap[locale as keyof typeof keywordsMap] || keywordsMap.uk,
		canonicalUrl: generateCanonicalUrl(locale, "/privacy-policy"),
		hreflang: generateHreflangUrls("/privacy-policy"),
		locale,
	});
}

export default function PrivacyPolicyPage() {
	const t = useTranslations("PrivacyPolicy");

	const sections = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

	return (
		<>
			<MultiHeroSection badgeText={t("title")} title={t("title")} description={t("intro")} />
			<section className="py-16">
				<div className="container mx-auto max-w-4xl">
					{/* Updated Date */}
					<Reveal>
						<div className="mb-8 text-center">
							<Badge variant="outline" className="text-sm">
								{t("updated")}
							</Badge>
						</div>
					</Reveal>

					{/* Introduction */}
					<Reveal>
						<Card className="mb-8">
							<CardContent className="p-6">
								<p className="text-gray-700 leading-relaxed">{t("intro")}</p>
							</CardContent>
						</Card>
					</Reveal>

					{/* Sections */}
					<div className="space-y-6">
						{sections.map((sectionNum) => {
							const sectionKey = `sections.${sectionNum}`;
							const title = t(`${sectionKey}.title`);
							const hasText = t.has(`${sectionKey}.text`);
							const text = hasText ? t(`${sectionKey}.text`) : "";
							const hasList = t.has(`${sectionKey}.list`);

							return (
								<Reveal key={sectionNum}>
									<Card className="overflow-hidden border-l-4 border-l-primary">
										<CardContent className="p-6">
											<h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>

											{hasText && text && (
												<div className="mb-4">
													<p className="text-gray-700 leading-relaxed whitespace-pre-line">
														{text}
													</p>
												</div>
											)}

											{hasList && (
												<ul className="space-y-3">
													{(() => {
														const listItems = [];
														let i = 0;
														while (t.has(`${sectionKey}.list.${i}`)) {
															listItems.push(
																<li key={i} className="flex items-start">
																	<div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
																	<span className="text-gray-700 leading-relaxed">
																		{t(`${sectionKey}.list.${i}`)}
																	</span>
																</li>
															);
															i++;
														}
														return listItems;
													})()}
												</ul>
											)}
										</CardContent>
									</Card>
								</Reveal>
							);
						})}
					</div>

					{/* Contact Information */}
					<Reveal>
						<Card className="mt-8 bg-primary/5 border-primary/20">
							<CardContent className="p-6 text-center">
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									{t("contactInfo.title")}
								</h3>
								<p className="text-gray-700 mb-4">{t("contactInfo.description")}</p>
								<div className="space-y-2 text-sm text-gray-600">
									<p>{t("contactInfo.email")}: info@global-technology-innovations.com</p>
									<p>{t("contactInfo.address")}: Jenisejská 45A, 040 12 Košice-Nad Jazerom</p>
									<p>{t("contactInfo.phone")}: +421 917 089 618</p>
								</div>
							</CardContent>
						</Card>
					</Reveal>
				</div>
			</section>
		</>
	);
}
