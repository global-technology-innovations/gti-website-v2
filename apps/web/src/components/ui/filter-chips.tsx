"use client";

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
		<div className={["mb-8 flex flex-wrap items-center justify-center gap-3", className].filter(Boolean).join(" ")}>
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
