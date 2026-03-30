import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

interface Props {
	count?: number;
	className?: string;
	variant?: "blog" | "project";
}

export function CardGridSkeleton({ count = 6, className, variant = "blog" }: Props) {
	return (
		<div className={cn("grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3", className)}>
			{Array.from({ length: count }).map((_, index) => (
				<div key={index}>{variant === "project" ? <ProjectCardSkeletonItem /> : <BlogCardSkeletonItem />}</div>
			))}
		</div>
	);
}

function BlogCardSkeletonItem() {
	return (
		<div className="h-full overflow-hidden rounded-3xl border border-[#ECECEC] bg-white p-4 pb-0">
			<div className="relative aspect-[9/5] overflow-hidden rounded-3xl">
				<Skeleton className="h-full w-full rounded-3xl" />
				<Skeleton className="absolute right-3 top-3 h-8 w-24 rounded-full" />
			</div>
			<div className="flex min-h-[220px] flex-col p-6">
				<div className="space-y-2">
					<Skeleton className="h-6 w-11/12 rounded-full" />
					<Skeleton className="h-6 w-2/3 rounded-full" />
				</div>
				<div className="mt-4 space-y-2">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-11/12" />
					<Skeleton className="h-4 w-10/12" />
					<Skeleton className="h-4 w-7/12" />
				</div>
				<div className="mt-auto flex items-center justify-between gap-2 pt-6">
					<Skeleton className="h-4 w-24 rounded-full" />
					<Skeleton className="h-4 w-4 rounded-full" />
				</div>
			</div>
		</div>
	);
}

function ProjectCardSkeletonItem() {
	return (
		<div className="flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-[#ECECEC] bg-white p-4">
			<div>
				<div className="relative aspect-[9/5] overflow-hidden rounded-3xl">
					<Skeleton className="h-full w-full rounded-3xl" />
					<Skeleton className="absolute right-3 top-3 h-8 w-28 rounded-full" />
				</div>
				<div className="mt-6 space-y-2">
					<Skeleton className="h-6 w-4/5 rounded-full" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-8/12" />
				</div>
			</div>
			<div className="mt-4">
				<div className="flex items-center gap-2">
					<Skeleton className="h-4 w-4 rounded-full" />
					<Skeleton className="h-4 w-24 rounded-full" />
				</div>
				<div className="mt-3 flex items-center justify-between gap-3">
					<Skeleton className="h-4 w-32 rounded-full" />
					<Skeleton className="h-4 w-4 rounded-full" />
				</div>
			</div>
		</div>
	);
}
