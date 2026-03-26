"use client";

import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface FilterChipOption {
	id: string;
	label: string;
	isActive?: boolean;
	onClick?: () => void;
}

interface Props {
	options: FilterChipOption[];
	className?: string;
}

export function FilterChips({ options, className }: Props) {
	return (
		<div className={cn("lg:mb-8 mb-6 flex flex-wrap items-center justify-center lg:gap-3 gap-2", className)}>
			{options.map((option) => (
				<Button
					key={option.id}
					onClick={option.onClick}
					variant={option.isActive ? "secondary" : "outline"}
					size="small"
					className="font-normal"
				>
					{option.label}
				</Button>
			))}
		</div>
	);
}
