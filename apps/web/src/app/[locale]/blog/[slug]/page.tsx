"use client";

import {
	Badge,
	BlogRelatedSection,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	Button,
} from "@/components";
import { siteContact } from "@/config/site-contact";
import { Link } from "@/i18n/navigation";
import { DETAIL_CONTENT_CLASSNAMES } from "@/lib/detailContentClassNames";
import renderRichText from "@/lib/renderRichText";
import { useSingleBlogArticleQuery } from "@/queries";
import { format } from "date-fns";
import { cs, de, enUS, fr, sk, uk } from "date-fns/locale";
import { AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { FaFacebook, FaTiktok, FaWhatsapp } from "react-icons/fa";

const socialIcons = {
	whatsapp: FaWhatsapp,
	facebook: FaFacebook,
	tiktok: FaTiktok,
};

const localeMap = {
	uk: uk,
	sk: sk,
	cs: cs,
	en: enUS,
	fr: fr,
	de: de,
};
export default function BlogArticlePage() {
	const params = useParams();
	const locale = useLocale();
	const slug = params.slug as string;
	const { data: article, isLoading, error } = useSingleBlogArticleQuery(slug);
	const publishedAt = article?.publishedAt
		? format(new Date(article.publishedAt), "d MMMM yyyy", {
				locale: localeMap[locale as keyof typeof localeMap] || uk,
			})
		: "";
	if (isLoading) {
		return (
			<div className="mt-[75px] flex min-h-screen items-center justify-center">
				<Loader2 className="h-12 w-12 animate-spin text-primary" />
			</div>
		);
	}

	if (error || !article) {
		return (
			<div className="mt-[75px] flex min-h-screen items-center justify-center px-6">
				<div className="max-w-md text-center">
					<AlertCircle className="mx-auto mb-4 h-16 w-16 text-destructive" />
					<h1 className="mb-2 text-3xl font-bold">Статтю не знайдено</h1>
					<p className="mb-6 text-muted-foreground">Не вдалося завантажити сторінку статті.</p>
					<Button asChild>
						<Link href="/blog">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Повернутися до блогу
						</Link>
					</Button>
				</div>
			</div>
		);
	}

	return (
		<>
			<section className="relative mx-4 bg-background bg-[url('/service-item-bg.svg')] bg-right bg-no-repeat bg-[length:auto_100%] rounded-b-3xl">
				<div className="container py-10 lg:py-22 flex flex-col relative mx-auto">
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link href="/blog">Блог</Link>
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
						<p className="mt-6 max-w-2xl text-left text-primary">{article.excerpt}</p>
					</div>
					<div className="mt-6 flex justify-between items-center">
						<div className="flex items-center gap-2">
							<Badge variant="secondaryDark">{article.category?.name}</Badge>
							<Badge variant="white">{publishedAt}</Badge>
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
										aria-label={social.label}
										className="flex size-8 items-center justify-center rounded-full bg-secondary/50 text-white hover:scale-105 transition-all duration-300"
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
				<section className="px-4 py-10 lg:py-16">
					<div className="container mx-auto">
						<div className="mx-auto max-w-[1100px] space-y-6">{renderRichText(article.content, DETAIL_CONTENT_CLASSNAMES)}</div>
					</div>
				</section>
			) : null}

			<BlogRelatedSection currentArticleSlug={article.slug} currentCategoryId={article.category?.id} />
		</>
	);
}
