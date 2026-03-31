import {
	ContactSection,
	PortfolioCTASection,
	PortfolioListSection,
	generateCanonicalUrl,
	generateHreflangUrls,
	generatePageMetadata,
} from "@/components";
import { getProjects } from "@/lib/services/projects";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "PortfolioPage.meta" });

	return generatePageMetadata({
		title: t("title"),
		description: t("description"),
		keywords: t("keywords"),
		canonicalUrl: generateCanonicalUrl(locale, "/portfolio"),
		hreflang: generateHreflangUrls("/portfolio"),
		locale,
	});
}

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const [t, projects] = await Promise.all([getTranslations({ locale, namespace: "PortfolioPage" }), getProjects(locale)]);

	return (
		<>
			<div className="container mx-auto px-4 pt-10 animate-slide-bottom lg:pt-20">
				<h1 className="text-center uppercase text-primary">
					{t("Hero.title")} <span className="text-secondary">{t("Hero.highlight")}</span>
				</h1>
				<p className="mt-5 text-center text-primary-foreground">{t("Hero.description")}</p>
			</div>
			<PortfolioListSection projects={projects} />
			<PortfolioCTASection locale={locale} />
			<ContactSection />
		</>
	);
}
