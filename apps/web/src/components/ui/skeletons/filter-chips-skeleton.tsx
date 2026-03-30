import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

interface Props {
	count?: number;
	className?: string;
}

const chipWidthClasses = ["w-[92px]", "w-[128px]", "w-[108px]", "w-[136px]", "w-[100px]"];

export function FilterChipsSkeleton({ count = 4, className }: Props) {
	return (
		<div className={cn("mb-6 flex flex-wrap items-center justify-center gap-2 lg:mb-8 lg:gap-3", className)}>
			{Array.from({ length: count }).map((_, index) => (
				<Skeleton key={index} className={cn("h-9 rounded-full", chipWidthClasses[index % chipWidthClasses.length])} />
			))}
		</div>
	);
}
