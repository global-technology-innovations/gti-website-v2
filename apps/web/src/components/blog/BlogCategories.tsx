"use client";

import { Button } from "@/components";
import type { BlogCategory } from "@/queries";

export function BlogCategories({ categories }: Props) {
	return (
		<div className="mb-8 flex flex-wrap justify-center items-center gap-3">
			{categories.map((cat) => (
				<Button
					key={cat.id}
					onClick={() => cat.onClick?.()}
					variant={cat.isActive ? "secondary" : "outline"}
					size="small"
					className="font-normal"
				>
					{cat.name}
				</Button>
			))}
		</div>
	);
}

interface Category extends BlogCategory {
	isActive?: boolean;
	onClick?: () => void;
	name: string;
}

interface Props {
	categories: Category[];
}
