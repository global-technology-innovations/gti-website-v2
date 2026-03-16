"use client";

import { Link } from "@/i18n/navigation";
import type { BlogArticle } from "@/queries";
import { format } from "date-fns";
import { cs, de, enUS, fr, sk, uk } from "date-fns/locale";
import { useLocale } from "next-intl";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

export function BlogCard({ article }: Props) {
	const locale = useLocale();
	const publishedAt = article.publishedAt
		? format(new Date(article.publishedAt), "d MMMM yyyy", {
				locale: localeMap[locale as keyof typeof localeMap] || uk,
			})
		: "";

	return (
		<Link href={`/blog/${article.slug}`}>
			<Card variant="outline" className="group p-4 pb-0 overflow-hidden transition-transform duration-300 hover:-translate-y-1">
				<div className="relative rounded-3xl aspect-[9/5] overflow-hidden">
					<Image
						src={article.image || "/placeholder.png"}
						alt={article.title}
						fill
						className="object-cover transition-transform duration-500 group-hover:scale-105"
					/>
					{article.category ? (
						<Badge variant="blur" className="absolute top-3 right-3">
							{article.category.name}
						</Badge>
					) : null}
				</div>
				<div className="flex min-h-[220px] flex-col p-6">
					<h2 className="!text-lg !leading-[26px] text-primary uppercase">{article.title}</h2>
					<p className="mt-4 line-clamp-4 text-primary-foreground">{article.excerpt}</p>
					<div className="mt-auto flex items-center justify-between gap-2 pt-6 text-sm font-medium text-primary">
						<time dateTime={article.publishedAt}>{publishedAt}</time>
						<Image
							src="/icons/arrow-right.svg"
							alt=""
							width={16}
							height={12}
							className="transition-transform duration-300 group-hover:translate-x-1"
							aria-hidden="true"
						/>
					</div>
				</div>
			</Card>
		</Link>
	);
}

const localeMap = {
	uk: uk,
	sk: sk,
	cs: cs,
	en: enUS,
	fr: fr,
	de: de,
};

interface Props {
	article: BlogArticle;
}
