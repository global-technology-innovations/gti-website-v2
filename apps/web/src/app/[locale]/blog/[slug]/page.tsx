"use client";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	Button,
} from "@/components";
import { Link } from "@/i18n/navigation";
import renderRichText from "@/lib/renderRichText";
import { useSingleBlogArticleQuery } from "@/queries";
import { AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

const CONTENT_CLASSNAMES: Parameters<typeof renderRichText>[1] = {
	heading:
		"text-[28px] leading-[36px] font-bold uppercase text-primary sm:text-[32px] sm:leading-[40px]",
	heading2:
		"text-[28px] leading-[36px] font-bold uppercase text-primary sm:text-[32px] sm:leading-[40px]",
	heading3:
		"text-[24px] leading-[32px] font-bold uppercase text-primary sm:text-[28px] sm:leading-[36px]",
	paragraph:
		"!text-[16px] !leading-[28px] !font-medium !text-primary-foreground",
	ul: "!list-outside list-disc pl-5 space-y-3 marker:text-secondary",
	ol: "!list-outside list-decimal pl-5 space-y-3 marker:text-secondary",
	li: "!pl-1 !text-[16px] !leading-[28px] !font-medium !text-primary-foreground",
	link: "!text-secondary underline underline-offset-4",
	blockquote:
		"!my-0 border-l-2 !border-secondary/30 !pl-5 !text-[16px] !leading-[28px] !font-medium !text-primary-foreground",
	image: "rounded-3xl",
};

export default function BlogArticlePage() {
	const params = useParams();
	const slug = params.slug as string;
	const { data: article, isLoading, error } = useSingleBlogArticleQuery(slug);

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
					<h1 className="mb-2 text-3xl font-bold">
						Статтю не знайдено
					</h1>
					<p className="mb-6 text-muted-foreground">
						Не вдалося завантажити сторінку статті.
					</p>
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
		<div className="container mx-auto px-4 pb-16 pt-24">
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

			<article className="mx-auto mt-8 max-w-4xl">
				{article.category ? (
					<p className="text-sm font-medium uppercase tracking-[0.12em] text-secondary">
						{article.category.name}
					</p>
				) : null}

				<h1 className="mt-4 text-primary uppercase">{article.title}</h1>
				<p className="mt-6 text-lg leading-8 text-primary-foreground">
					{article.excerpt}
				</p>

				{article.image ? (
					<div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl">
						<Image
							src={article.image}
							alt={article.title}
							fill
							className="object-cover"
						/>
					</div>
				) : null}

				<div className="mt-12 space-y-6">
					{renderRichText(article.content, CONTENT_CLASSNAMES)}
				</div>
			</article>
		</div>
	);
}
