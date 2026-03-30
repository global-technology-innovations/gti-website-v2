import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

interface Props {
	pageCount?: number;
	className?: string;
}

export function PaginationSkeleton({ pageCount = 3, className }: Props) {
	return (
		<div className={cn("mt-10", className)}>
			<div className="flex w-full items-center justify-between gap-4">
				<div className="flex items-center gap-2">
					<Skeleton className="h-5 w-5 rounded-full" />
					<Skeleton className="h-5 w-24 rounded-full" />
				</div>

				<div className="flex items-center gap-2 md:gap-4">
					{Array.from({ length: pageCount }).map((_, index) => (
						<Skeleton key={index} className="h-9 w-9 rounded-full" />
					))}
				</div>

				<div className="flex items-center gap-2">
					<Skeleton className="h-5 w-16 rounded-full" />
					<Skeleton className="h-5 w-5 rounded-full" />
				</div>
			</div>
		</div>
	);
}
