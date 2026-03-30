"use client";

import { Skeleton } from "./skeleton";

export function JobCardSkeleton() {
	return (
		<div className="flex h-full flex-col justify-between rounded-[28px] border border-[#ECECEC] bg-white p-6">
			<div>
				<div className="space-y-2">
					<Skeleton className="h-7 w-4/5 rounded-full" />
					<Skeleton className="h-7 w-2/3 rounded-full" />
				</div>

				<div className="mt-6 space-y-2">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-11/12" />
					<Skeleton className="h-4 w-8/12" />
				</div>
			</div>

			<div className="mt-6 flex items-center justify-between gap-4 pt-2">
				<div className="flex items-center gap-2">
					<Skeleton className="h-5 w-5 rounded-full" />
					<Skeleton className="h-5 w-24 rounded-full" />
				</div>
				<Skeleton className="h-4 w-4 rounded-full" />
			</div>
		</div>
	);
}
