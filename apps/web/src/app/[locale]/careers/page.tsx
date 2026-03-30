import { JobsList, generateCanonicalUrl, generateHreflangUrls, generatePageMetadata } from "@/components";
import { useTranslations } from "next-intl";
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

export default function CareersPage() {
	const t = useTranslations("CareersPage");

	return (
		<>
			<div className="container mx-auto pt-10 lg:pt-20 px-4">
				<h2 className="text-center uppercase text-primary">
					{t("Hero.title")} <span className="text-secondary">{t("Hero.highlight")}</span>
				</h2>
				<p className="mt-5 text-center text-primary-foreground">{t("Hero.description")}</p>
			</div>
			<JobsList />
		</>
	);
}
