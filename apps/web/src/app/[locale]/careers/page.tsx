import { JobsList, generateCanonicalUrl, generateHreflangUrls, generatePageMetadata } from "@/components";
import { getJobs } from "@/lib/services/jobs";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "CareersPage.meta" });

	return generatePageMetadata({
		title: t("title"),
		description: t("description"),
		keywords: t("keywords"),
		canonicalUrl: generateCanonicalUrl(locale, "/careers"),
		hreflang: generateHreflangUrls("/careers"),
		locale,
	});
}

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const [t, jobs] = await Promise.all([getTranslations({ locale, namespace: "CareersPage" }), getJobs(locale)]);

	return (
		<>
			<div className="container mx-auto px-4 pt-10 animate-slide-bottom lg:pt-20">
				<h1 className="text-center uppercase text-primary">
					{t("Hero.title")} <span className="text-secondary">{t("Hero.highlight")}</span>
				</h1>
				<p className="mt-5 text-center text-primary-foreground">{t("Hero.description")}</p>
			</div>
			<JobsList jobs={jobs} />
		</>
	);
}
