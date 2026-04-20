import type { BlogArticle } from "@/queries";
import { BlogCard } from "./BlogCard";

export function BlogGrid({ articles }: Props) {
	return (
		<div className="grid animate-slide-bottom gap-6 md:grid-cols-2 xl:grid-cols-3">
			{articles.map((article) => (
				<BlogCard key={article.id} article={article} />
			))}
		</div>
	);
}

interface Props {
	articles: BlogArticle[];
}
