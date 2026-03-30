"use client";

import { Skeleton } from "./skeleton";

export function ServiceCardSkeleton() {
	return (
		<div className="flex h-full flex-col gap-3">
			<Skeleton className="h-48 w-full rounded-3xl md:h-64" />

			<div className="flex flex-1 flex-col rounded-3xl border border-[#ECECEC] bg-white px-8 py-6">
				<Skeleton className="h-6 w-3/4 rounded-full" />

				<div className="mt-4 flex flex-col gap-2">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-[88%]" />
					<Skeleton className="h-4 w-2/3" />
				</div>
			</div>
		</div>
	);
}
