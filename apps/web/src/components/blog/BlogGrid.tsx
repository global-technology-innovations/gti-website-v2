import { Card, CardContent, CardDescription, CardTitle } from "@/components";

export function BlogGrid({ articles }: Props) {
	return (
		<div className="grid md:grid-cols-3 gap-6">
			{articles.map((article) => (
				<Card key={article.id} variant="outline">
					<CardContent>
						<CardTitle>{article.title}</CardTitle>
						<CardDescription>{article.content}</CardDescription>
					</CardContent>
				</Card>
			))}
		</div>
	);
}

interface Article {
	id: number;
	title: string;
	content: string;
	category: string;
}

interface Props {
	articles: Article[];
}
