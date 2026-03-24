"use client";

import { JobCard, SharedPagination, Skeleton } from "@/components";
import { useJobsQuery } from "@/queries";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

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

	useEffect(() => {
		if (page > totalPages) {
			setPage(Math.max(totalPages, 1));
		}
	}, [page, totalPages]);

	if (isLoading) {
		return (
			<section className="container mx-auto px-4 pt-16 pb-6">
				<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
					{Array.from({ length: JOBS_PER_PAGE }).map((_, i) => (
						<Skeleton key={i} className="h-[260px] rounded-3xl" />
					))}
				</div>
				<div className="mt-10 flex justify-center gap-2">
					<Skeleton className="h-10 w-10 rounded-md" />
					<Skeleton className="h-10 w-10 rounded-md" />
					<Skeleton className="h-10 w-10 rounded-md" />
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className="container mx-auto px-4 py-16">
				<div className="rounded-3xl border border-dashed border-destructive/30 bg-destructive/5 px-6 py-12 text-center text-red-600">
					<h2 className="text-xl font-semibold">{t("errorTitle")}</h2>
					<p className="mt-2">{t("errorLoadingJobs")}</p>
				</div>
			</section>
		);
	}

	if (data.length === 0) {
		return (
			<section className="container mx-auto px-4 pt-16">
				<div className="flex min-h-[240px] items-center justify-center rounded-3xl border border-dashed border-border text-center text-primary-foreground">
					<div>
						<h2 className="text-xl font-semibold text-primary">{t("noJobs")}</h2>
						<p className="mt-2">{t("checkBackLater")}</p>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="container mx-auto px-4 pt-16">
			<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
				{currentJobs.map((job) => (
					<JobCard key={job.id} job={job} />
				))}
			</div>
			{totalPages > 1 ? <SharedPagination currentPage={page} totalPages={totalPages} onChange={setPage} className="mt-6" /> : null}
		</section>
	);
}
