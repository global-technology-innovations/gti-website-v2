import {
	Badge,
	Card,
	CardContent,
	ChangeConsentButton,
	LegalPageHeroSection,
	generateCanonicalUrl,
	generateHreflangUrls,
	generatePageMetadata,
} from "@/components";
import { Link } from "@/i18n/navigation";
import { BarChart3, Megaphone, Settings, Shield } from "lucide-react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "CookiesPage.meta" });

	return generatePageMetadata({
		title: t("title"),
		description: t("description"),
		keywords: t("keywords"),
		canonicalUrl: generateCanonicalUrl(locale, "/cookie-policy"),
		hreflang: generateHreflangUrls("/cookie-policy"),
		locale,
	});
}

export default function CookiePolicyPage() {
	const t = useTranslations("CookiesPage");
	const baseCardClassName = "rounded-[28px] border-border/40 p-0 shadow-none";
	const baseContentClassName = "p-8 md:p-10";
	const headingClassName = "card-title text-primary";
	const textClassName = "text-[16px] leading-[1.7] text-primary-foreground";

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
			<LegalPageHeroSection title={t("Hero.title")} description={t("Hero.description")} />

			<section className="py-16 md:py-20">
				<div className="container mx-auto px-4">
					<div className="mx-auto space-y-6 max-w-[1040px]">
						<Card variant="outline" className={baseCardClassName}>
							<CardContent className={baseContentClassName}>
								<h2 className={headingClassName}>{t("whatAreCookies.title")}</h2>
								<p className={`mt-5 ${textClassName}`}>{t("whatAreCookies.description")}</p>
							</CardContent>
						</Card>

						<section className="space-y-6">
							<div className="text-center">
								<h2 className={headingClassName}>{t("categories.title")}</h2>
							</div>
							<div className="grid gap-6 md:grid-cols-2">
								{cookieCategories.map((category) => {
									const Icon = category.icon;

									return (
										<Card key={category.title} variant="outline" className={baseCardClassName}>
											<CardContent className={baseContentClassName}>
												<div className="flex items-start gap-4">
													<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
														<Icon className="h-6 w-6" />
													</div>
													<div className="min-w-0">
														<div className="flex flex-wrap items-center gap-2">
															<h3 className="card-title text-primary">{category.title}</h3>
															{category.required ? <Badge variant="secondary">{category.badge}</Badge> : null}
														</div>
														<p className={`mt-4 ${textClassName}`}>{category.description}</p>
													</div>
												</div>
											</CardContent>
										</Card>
									);
								})}
							</div>
						</section>

						<Card variant="outline" className="border-secondary/20 bg-secondary/10 p-0 shadow-none">
							<CardContent className="p-8 md:p-10">
								<h2 className={headingClassName}>{t("management.title")}</h2>
								<p className={`mt-5 ${textClassName}`}>{t("management.description")}</p>
								<div className="mt-6 flex justify-center">
									<ChangeConsentButton />
								</div>
							</CardContent>
						</Card>

						<Card variant="outline" className={baseCardClassName}>
							<CardContent className={baseContentClassName}>
								<h2 className={headingClassName}>{t("additionalInfo.title")}</h2>
								<div className={`mt-5 space-y-4 ${textClassName}`}>
									<p>
										{t("additionalInfo.privacyPolicyText")}{" "}
										<Link href="/privacy-policy" className="font-medium text-secondary underline underline-offset-4">
											{t("additionalInfo.privacyPolicyLink")}
										</Link>
										.
									</p>
									<p>
										{t("additionalInfo.contactText")}{" "}
										<a
											href={`mailto:${t("additionalInfo.contactEmail")}`}
											className="font-medium text-secondary underline underline-offset-4"
										>
											{t("additionalInfo.contactEmail")}
										</a>
										.
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
		</>
	);
}
