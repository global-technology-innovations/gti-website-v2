import { Badge, Card, CardContent, ChangeConsentButton, MultiHeroSection } from "@/components";
import { BarChart3, Megaphone, Settings, Shield } from "lucide-react";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "CookiesPage" });

	const keywordsMap = {
		sk: "cookies, súbory cookie, správa cookies, súhlas cookies, GDPR cookies",
		en: "cookies, cookie files, cookie management, cookie consent, GDPR cookies",
		uk: "cookies, файли cookie, управління cookies, згода cookies, GDPR cookies",
		cs: "cookies, soubory cookie, správa cookies, souhlas cookies, GDPR cookies",
		fr: "cookies, fichiers cookie, gestion des cookies, consentement cookies, RGPD cookies",
		de: "cookies, cookie-dateien, cookie-verwaltung, cookie-zustimmung, DSGVO-cookies",
	};

	return {
		title: `${t("title")} | Global Technology Innovations`,
		description: t("description"),
		keywords: keywordsMap[locale as keyof typeof keywordsMap]?.split(",").map((k) => k.trim()),
	};
}

export default function CookiesPage() {
	const t = useTranslations("CookiesPage");

	const cookieCategories = [
		{
			icon: Shield,
			title: t("categories.necessary.title"),
			description: t("categories.necessary.description"),
			required: true,
			badge: t("categories.necessary.badge"),
		},
		{
			icon: Settings,
			title: t("categories.functional.title"),
			description: t("categories.functional.description"),
			required: false,
		},
		{
			icon: BarChart3,
			title: t("categories.analytics.title"),
			description: t("categories.analytics.description"),
			required: false,
		},
		{
			icon: Megaphone,
			title: t("categories.marketing.title"),
			description: t("categories.marketing.description"),
			required: false,
		},
	];
	return (
		<>
			<MultiHeroSection badgeText={t("Hero.badge")} title={t("Hero.title")} description={t("Hero.description")} />

			<section className="py-16">
				<div className="container mx-auto max-w-4xl">
					{/* Що таке cookie */}
					<Card className="mb-8">
						<CardContent className="p-6">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">{t("whatAreCookies.title")}</h2>
							<p className="text-gray-700 leading-relaxed">{t("whatAreCookies.description")}</p>
						</CardContent>
					</Card>

					{/* Категорії cookie */}
					<div className="mb-8">
						<h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">{t("categories.title")}</h2>

						<div className="grid gap-6 md:grid-cols-2">
							{cookieCategories.map((category, index) => {
								const IconComponent = category.icon;
								return (
									<Card key={index} className="overflow-hidden border-l-4 border-l-primary">
										<CardContent className="p-6">
											<div className="flex items-start gap-4">
												<div className="p-2 bg-primary/10 rounded-lg">
													<IconComponent className="w-6 h-6 text-primary" />
												</div>
												<div className="flex-1">
													<div className="flex items-center gap-2 mb-2">
														<h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
														{category.required && (
															<Badge variant="outline" className="text-xs">
																{category.badge}
															</Badge>
														)}
													</div>
													<p className="text-gray-700 leading-relaxed">{category.description}</p>
												</div>
											</div>
										</CardContent>
									</Card>
								);
							})}
						</div>
					</div>

					{/* Керування вибором */}
					<Card className="mb-8 bg-primary/5 border-primary/20">
						<CardContent className="p-6">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">{t("management.title")}</h2>
							<p className="text-gray-700 leading-relaxed mb-6">{t("management.description")}</p>

							<div className="flex justify-center">
								<ChangeConsentButton />
							</div>
						</CardContent>
					</Card>

					{/* Додаткова інформація */}
					<Card className="mb-8">
						<CardContent className="p-6">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">{t("additionalInfo.title")}</h2>
							<div className="space-y-4 text-gray-700 leading-relaxed">
								<p>
									{t("additionalInfo.privacyPolicyText")}{" "}
									<Link href="/privacy-policy" className="text-primary hover:underline font-medium">
										{t("additionalInfo.privacyPolicyLink")}
									</Link>
									.
								</p>
								<p>
									{t("additionalInfo.contactText")}{" "}
									<a
										href={`mailto:${t("additionalInfo.contactEmail")}`}
										className="text-primary hover:underline font-medium"
									>
										{t("additionalInfo.contactEmail")}
									</a>
									.
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>
		</>
	);
}
