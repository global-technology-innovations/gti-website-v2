import { BlogArchiveSection, CallToActionSection, generateCanonicalUrl, generateHreflangUrls, generatePageMetadata } from "@/components";
import { getBlogArticles, getBlogCategories } from "@/lib/services/blog";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "BlogPage.meta" });

	return generatePageMetadata({
		title: t("title"),
		description: t("description"),
		keywords: t("keywords"),
		canonicalUrl: generateCanonicalUrl(locale, "/blog"),
		hreflang: generateHreflangUrls("/blog"),
		locale,
	});
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const [t, articles, categories] = await Promise.all([
		getTranslations({ locale, namespace: "BlogPage" }),
		getBlogArticles(locale),
		getBlogCategories(locale),
	]);

	return (
		<>
			<div className="container mx-auto px-4 pb-4 pt-20">
				<div className="mb-6 animate-slide-bottom">
					<h1 className="text-center uppercase text-primary">
						{t("title")} <span className="text-secondary">{t("highlight")}</span>
					</h1>
					<p className="mt-4 text-center text-primary-foreground">{t("description")}</p>
				</div>
			</div>
			<BlogArchiveSection articles={articles} categories={categories} />
			<CallToActionSection />
		</>
	);
}
