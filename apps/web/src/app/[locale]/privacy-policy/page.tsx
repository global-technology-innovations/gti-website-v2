import {
	Badge,
	Card,
	CardContent,
	LegalPageHeroSection,
	generateCanonicalUrl,
	generateHreflangUrls,
	generatePageMetadata,
} from "@/components";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "PrivacyPolicy.meta" });

	return generatePageMetadata({
		title: t("title"),
		description: t("description"),
		keywords: t("keywords"),
		canonicalUrl: generateCanonicalUrl(locale, "/privacy-policy"),
		hreflang: generateHreflangUrls("/privacy-policy"),
		locale,
	});
}

export default function PrivacyPolicyPage() {
	const t = useTranslations("PrivacyPolicy");

	const sections = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
	const baseCardClassName = "rounded-[28px] border-border/40 p-0 shadow-none";
	const baseContentClassName = "p-8 md:p-10";
	const headingClassName = "card-title text-primary";
	const textClassName = "text-[16px] leading-[1.7] text-primary-foreground";

	return (
		<>
			<LegalPageHeroSection
				title={t("title")}
				description={t("intro")}
				meta={
					<Badge variant="white" className="border border-border/60 bg-background text-primary shadow-none">
						{t("updated")}
					</Badge>
				}
			/>
			<section className="py-16 md:py-20">
				<div className="container mx-auto px-4">
					<div className="mx-auto space-y-6 max-w-[1040px]">
						{sections.map((sectionNum) => {
							const sectionKey = `sections.${sectionNum}`;
							const title = t(`${sectionKey}.title`);
							const hasText = t.has(`${sectionKey}.text`);
							const text = hasText ? t(`${sectionKey}.text`) : "";
							const hasList = t.has(`${sectionKey}.list`);

							return (
								<Card key={sectionNum} variant="outline" className={baseCardClassName}>
									<CardContent className={baseContentClassName}>
										<h2 className={headingClassName}>{title}</h2>

										{hasText && text && (
											<div className="mt-5">
												<p className={`${textClassName} whitespace-pre-line`}>{text}</p>
											</div>
										)}

										{hasList && (
											<ul className="mt-5 space-y-3">
												{(() => {
													const listItems = [];
													let i = 0;
													while (t.has(`${sectionKey}.list.${i}`)) {
														listItems.push(
															<li key={i} className="flex items-start">
																<div className="mt-2.5 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-secondary"></div>
																<span className={textClassName}>{t(`${sectionKey}.list.${i}`)}</span>
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
							);
						})}

						<Card variant="outline" className="border-secondary/20 bg-secondary/10 p-0 shadow-none">
							<CardContent className="p-8 text-center md:p-10">
								<h2 className={headingClassName}>{t("contactInfo.title")}</h2>
								<p className={`mx-auto mt-4 max-w-[680px] ${textClassName}`}>{t("contactInfo.description")}</p>
								<div className="mt-6 space-y-2 text-sm text-primary-foreground/80">
									<p>{t("contactInfo.email")}: info@global-technology-innovations.com</p>
									<p>{t("contactInfo.address")}: Jenisejská 45A, 040 12 Košice-Nad Jazerom</p>
									<p>{t("contactInfo.phone")}: +421 917 089 618</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
		</>
	);
}
