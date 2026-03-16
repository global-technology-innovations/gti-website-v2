import { Link } from "@/i18n/navigation";
import type { BlogArticle } from "@/queries";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function BlogCard({ article }: Props) {
	return (
		<Link href={`/blog/${article.slug}`}>
			<article className="group overflow-hidden rounded-3xl border border-border bg-background transition-transform duration-300 hover:-translate-y-1">
				<div className="relative aspect-[9/5] overflow-hidden">
					<Image
						src={article.image || "/placeholder.png"}
						alt={article.title}
						fill
						className="object-cover transition-transform duration-500 group-hover:scale-105"
					/>
				</div>
				<div className="flex min-h-[220px] flex-col p-6">
					{article.category ? (
						<span className="mb-4 text-sm font-medium text-secondary">
							{article.category.name}
						</span>
					) : null}
					<h3 className="text-primary text-2xl font-bold uppercase">
						{article.title}
					</h3>
					<p className="mt-4 line-clamp-4 text-primary-foreground">
						{article.excerpt}
					</p>
					<div className="mt-auto flex items-center gap-2 pt-6 text-sm font-medium text-primary">
						<span>Детальніше</span>
						<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
					</div>
				</div>
			</article>
		</Link>
	);
}

interface Props {
	article: BlogArticle;
}
