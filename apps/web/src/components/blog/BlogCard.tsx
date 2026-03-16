import { Link } from "@/i18n/navigation";
import type { BlogArticle } from "@/queries";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

export function BlogCard({ article }: Props) {
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
					<h3 className="text-primary text-2xl font-bold uppercase">{article.title}</h3>
					<p className="mt-4 line-clamp-4 text-primary-foreground">{article.excerpt}</p>
					<div className="mt-auto flex items-center justify-between gap-2 pt-6 text-sm font-medium text-primary">
						<span>{article.publishedAt}</span>
						<ArrowRight className="size-7 text-secondary transition-transform duration-300 group-hover:translate-x-1" />
					</div>
				</div>
			</Card>
		</Link>
	);
}

interface Props {
	article: BlogArticle;
}
