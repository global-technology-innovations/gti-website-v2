"use client";

import { CareersPagination, JobCard, Reveal, Skeleton } from "@/components";
import { useJobsQuery } from "@/queries";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

const JOBS_PER_PAGE = 6;

export function JobsList() {
	const { data = [], isLoading, error } = useJobsQuery();
	const [page, setPage] = useState(1);
	const t = useTranslations("CareersPage");
	const totalPages = Math.ceil(data.length / JOBS_PER_PAGE);

	const currentJobs = useMemo(() => {
		const start = (page - 1) * JOBS_PER_PAGE;
		return data.slice(start, start + JOBS_PER_PAGE);
	}, [page, data]);

	if (isLoading) {
		return (
			<Reveal>
				<div className="pt-12">
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{Array.from({ length: JOBS_PER_PAGE }).map((_, i) => (
							<Skeleton key={i} className="h-[200px] rounded-xl" />
						))}
					</div>
					<div className="flex justify-center mt-6 gap-2">
						<Skeleton className="h-10 w-10 rounded-md" />
						<Skeleton className="h-10 w-10 rounded-md" />
						<Skeleton className="h-10 w-10 rounded-md" />
					</div>
				</div>
			</Reveal>
		);
	}

	if (error) {
		return (
			<div className="text-center text-red-600">
				<h2 className="text-xl font-semibold">{t("errorTitle")}</h2>
				<p>{t("errorLoadingJobs")}</p>
			</div>
		);
	}

	if (data.length === 0) {
		return (
			<Reveal>
				<div className="text-center pt-12">
					<h2 className="text-xl font-semibold">{t("noJobs")}</h2>
					<p>{t("checkBackLater")}</p>
				</div>
			</Reveal>
		);
	}

	return (
		<Reveal>
			<div className="pt-12">
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{currentJobs.map((job) => (
						<JobCard key={job.id} job={job} />
					))}
				</div>
				<CareersPagination page={page} totalPages={totalPages} onChange={setPage} />
			</div>
		</Reveal>
	);
}
