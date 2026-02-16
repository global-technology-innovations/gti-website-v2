import { BlogCategories, BlogGrid, BlogPagination } from "@/components";

export default function BlogPage() {
	const categories = [
		{
			id: 1,
			name: "Category 1",
		},
		{
			id: 2,
			name: "Category 2",
		},
		{
			id: 3,
			name: "Category 3",
		},
	];
	const articles = [
		{
			id: 1,
			title: "Article 1",
			content: "Content 1",
			category: "Category 1",
		},
		{
			id: 2,
			title: "Article 2",
			content: "Content 2",
			category: "Category 2",
		},
		{
			id: 3,
			title: "Article 3",
			content: "Content 3",
			category: "Category 3",
		},
		{
			id: 4,
			title: "Article 4",
			content: "Content 4",
			category: "Category 1",
		},
		{
			id: 5,
			title: "Article 5",
			content: "Content 5",
			category: "Category 2",
		},
		{
			id: 6,
			title: "Article 6",
			content: "Content 6",
			category: "Category 3",
		},
	];
	return (
		<div className="container mx-auto pt-20 px-4">
			<div className="mb-10">
				<h2 className="text-primary text-left uppercase">
					Будівельні статті <span className="text-secondary">та аналітика</span>
				</h2>
				<p className="text-primary-foreground text-left mt-4">
					У цьому розділі зібрані інформаційні матеріали про будівництво, оновлення об’єктів та
					сучасні підходи.
				</p>
			</div>
			<BlogCategories categories={categories} />
			<BlogGrid articles={articles} />
			<BlogPagination currentPage={1} totalPages={10} />
		</div>
	);
}
