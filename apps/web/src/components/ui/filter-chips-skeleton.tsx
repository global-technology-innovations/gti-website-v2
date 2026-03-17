import { Skeleton } from "./skeleton";

interface Props {
	count?: number;
	className?: string;
}

export function FilterChipsSkeleton({ count = 4, className }: Props) {
	return (
		<div className={["mb-8 flex flex-wrap items-center justify-center gap-3", className].filter(Boolean).join(" ")}>
			{Array.from({ length: count }).map((_, index) => (
				<Skeleton key={index} className="h-9 w-28 rounded-full" />
			))}
		</div>
	);
}
