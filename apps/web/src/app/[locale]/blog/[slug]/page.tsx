import {
	ArticleSchema,
	Badge,
	BlogRelatedSection,
	BreadcrumbSchema,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	generateCanonicalUrl,
	generateHreflangUrls,
	generatePageMetadata,
} from "@/components";
import { siteContact } from "@/config/site-contact";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getBlogArticleBySlug, getBlogArticles, getRelatedBlogArticles } from "@/lib/services/blog";
import { DETAIL_CONTENT_CLASSNAMES } from "@/lib/detailContentClassNames";
import renderRichText from "@/lib/renderRichText";
import { StrapiFetchError } from "@/lib/strapi";
import { format } from "date-fns";
import { cs, de, enUS, fr, sk, uk } from "date-fns/locale";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { FaFacebook, FaTiktok, FaWhatsapp } from "react-icons/fa";

const socialIcons = {
	whatsapp: FaWhatsapp,
	facebook: FaFacebook,
	tiktok: FaTiktok,
};

const localeMap = {
	uk,
	sk,
	cs,
	en: enUS,
	fr,
	de,
};

export async function generateStaticParams() {
	const paramsByLocale = await Promise.all(
		routing.locales.map(async (locale) => {
			try {
				const articles = await getBlogArticles(locale);

				return articles.map((article) => ({
					locale,
					slug: article.slug,
				}));
			} catch (error) {
				if (error instanceof StrapiFetchError && error.status >= 500) {
					console.error(`Skipping blog static params generation for locale "${locale}" because Strapi returned ${error.status}.`);
					return [];
				}

				throw error;
			}
		})
	);

	return paramsByLocale.flat();
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
	const { locale, slug } = await params;
	const article = await getBlogArticleBySlug(slug, locale);

	if (!article) {
		return {
			robots: {
				index: false,
				follow: false,
			},
		};
	}

	return generatePageMetadata({
		title: article.title,
		description: article.excerpt,
		canonicalUrl: generateCanonicalUrl(locale, `/blog/${article.slug}`),
		hreflang: generateHreflangUrls(`/blog/${article.slug}`),
		locale,
		ogImage: article.image || "/opengraph-image",
		openGraphType: "article",
		publishedTime: article.publishedAt,
		modifiedTime: article.updatedAt,
	});
}

export default async function BlogArticlePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
	const { locale, slug } = await params;
	const [article, allArticles, tNav, tContact] = await Promise.all([
		getBlogArticleBySlug(slug, locale),
		getBlogArticles(locale),
		getTranslations({ locale, namespace: "Header.nav" }),
		getTranslations({ locale, namespace: "ContactPage.contacts" }),
	]);

	if (!article) {
		notFound();
	}

	const publishedAt = article.publishedAt
		? format(new Date(article.publishedAt), "d MMMM yyyy", {
				locale: localeMap[locale as keyof typeof localeMap] || uk,
			})
		: "";
	const relatedArticles = getRelatedBlogArticles(allArticles, article.slug, article.category?.id);
	const canonicalUrl = generateCanonicalUrl(locale, `/blog/${article.slug}`);

	return (
		<>
			<ArticleSchema
				article={{
					title: article.title,
					description: article.excerpt,
					url: canonicalUrl,
					image: article.image || undefined,
					publishedAt: article.publishedAt,
					modifiedAt: article.updatedAt,
					category: article.category?.name || undefined,
				}}
			/>
			<BreadcrumbSchema
				items={[
					{ name: tNav("blog"), url: generateCanonicalUrl(locale, "/blog") },
					{ name: article.title, url: canonicalUrl },
				]}
			/>
			<section className="relative mx-4 rounded-b-3xl bg-background">
				<div className="absolute inset-0 bg-[url('/service-item-bg.svg')] bg-right bg-no-repeat bg-[length:auto_100%] blur-xs lg:blur-none animate-slide-right" />
				<div className="container relative mx-auto flex flex-col px-4 py-10 animate-slide-left lg:py-16">
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link href="/blog">{tNav("blog")}</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>{article.title}</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>

					<div className="mt-8 flex flex-col items-start">
						<h1 className="h3 text-center text-primary uppercase md:text-left">{article.title}</h1>
						<p className="mt-6 max-w-2xl text-center text-primary lg:text-left">{article.excerpt}</p>
					</div>
					<div className="mt-6 flex flex-col items-center justify-between gap-6 sm:flex-row">
						<div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-2">
							{article.category ? <Badge variant="secondaryDark">{article.category.name}</Badge> : null}
							{publishedAt ? <Badge variant="white">{publishedAt}</Badge> : null}
						</div>
						<div className="flex items-center gap-3">
							{siteContact.socials.map((social) => {
								const Icon = socialIcons[social.key];

								return (
									<a
										key={social.key}
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={tContact(social.key)}
										className="flex size-8 items-center justify-center rounded-full bg-secondary/50 text-white transition-all duration-300 hover:scale-105"
									>
										<Icon className="size-6" />
									</a>
								);
							})}
						</div>
					</div>
				</div>
			</section>

			{article.content.length > 0 ? (
				<section className="px-4 py-10 animate-slide-bottom lg:py-16">
					<div className="container mx-auto">
						<div className="mx-auto max-w-[1100px] space-y-6">{renderRichText(article.content, DETAIL_CONTENT_CLASSNAMES)}</div>
					</div>
				</section>
			) : null}

			<BlogRelatedSection articles={relatedArticles} />
		</>
	);
}
