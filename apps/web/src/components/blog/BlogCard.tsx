import Image from "next/image";
import Link from "next/link";

export function BlogCard({ article }: Props) {
	return (
		<Link href={`/blog/${article.slug}`}>
			<article className="rounded-xl border p-4">
				<Image src={article.image} alt={article.title} width={100} height={100} />
				<h3>{article.title}</h3>
				<p>{article.excerpt}</p>
				<time>{article.date}</time>
			</article>
		</Link>
	);
}

interface Article {
	slug: string;
	title: string;
	excerpt: string;
	date: string;
	image: string;
}

interface Props {
	article: Article;
}
