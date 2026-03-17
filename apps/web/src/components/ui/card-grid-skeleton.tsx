import { Skeleton } from "./skeleton";

interface Props {
	count?: number;
	className?: string;
}

export function CardGridSkeleton({ count = 6, className }: Props) {
	return (
		<div className={["grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3", className].filter(Boolean).join(" ")}>
			{Array.from({ length: count }).map((_, index) => (
				<div key={index} className="overflow-hidden rounded-3xl border border-border p-4">
					<Skeleton className="aspect-[9/5] w-full rounded-3xl" />
					<div className="space-y-3 p-5">
						<Skeleton className="h-7 w-4/5" />
						<Skeleton className="h-7 w-3/5" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-11/12" />
						<Skeleton className="h-4 w-9/12" />
						<div className="pt-2">
							<Skeleton className="h-4 w-2/5" />
						</div>
						<div className="flex items-center justify-between pt-4">
							<Skeleton className="h-4 w-1/3" />
							<Skeleton className="h-4 w-4" />
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
