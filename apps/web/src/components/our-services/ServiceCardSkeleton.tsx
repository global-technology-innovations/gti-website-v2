"use client";

import { Skeleton } from "@/components";

export function ServiceCardSkeleton({ reversed = false }: { reversed?: boolean }) {
	return (
		<div
			className={`lg:max-h-[250px] lg:h-[250px] flex flex-col md:flex-row ${
				reversed ? "md:flex-row-reverse" : ""
			} gap-6 bg-white rounded-xl p-6 shadow-md`}
		>
			{/* Image skeleton */}
			<Skeleton className="w-full md:w-[300px] lg:w-[400px] h-48 md:h-auto object-cover rounded-md" />

			{/* Text content */}
			<div className="flex flex-col justify-between flex-1">
				<div className="flex flex-col gap-4">
					{/* Icon + title */}
					<div className="flex items-center gap-3">
						<Skeleton className="h-6 w-6 rounded-full" />
						<Skeleton className="h-6 w-48" />
					</div>

					{/* Description lines */}
					<div className="flex flex-col gap-2">
						<Skeleton className="h-4 w-[90%]" />
						<Skeleton className="h-4 w-[80%]" />
						<Skeleton className="h-4 w-[70%]" />
					</div>
				</div>

				{/* Button skeleton */}
				<div className={`pt-4 flex ${reversed ? "md:justify-start" : "md:justify-end"}`}>
					<Skeleton className="h-10 w-full md:h-13 md:w-38" />
				</div>
			</div>
		</div>
	);
}
