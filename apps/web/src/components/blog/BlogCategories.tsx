import { Button } from "@/components";

export function BlogCategories({ categories }: Props) {
	return (
		<div className="flex gap-3 mb-8">
			{categories.map((cat) => (
				<Button key={cat.id} variant="outline" size="small" className="font-normal">
					{cat.name}
				</Button>
			))}
		</div>
	);
}

interface Category {
	id: number;
	name: string;
}

interface Props {
	categories: Category[];
}
