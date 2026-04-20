"use client";

import { SharedPagination } from "@/components/shared/SharedPagination";
import type { Job } from "@/lib/services/jobs";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { JobCard } from "./JobCard";

const JOBS_PER_PAGE = 6;

interface JobsListProps {
	jobs: Job[];
}

export function JobsList({ jobs }: JobsListProps) {
	const [page, setPage] = useState(1);
	const t = useTranslations("CareersPage");
	const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE);

	const currentJobs = useMemo(() => {
		const start = (page - 1) * JOBS_PER_PAGE;
		return jobs.slice(start, start + JOBS_PER_PAGE);
	}, [jobs, page]);

	useEffect(() => {
		if (page > totalPages) {
			setPage(Math.max(totalPages, 1));
		}
	}, [page, totalPages]);

	if (jobs.length === 0) {
		return (
			<section className="container mx-auto px-4 pt-10 lg:pt-16 animate-slide-bottom">
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
		<section className="container mx-auto px-4 pt-10 pb-3 lg:pt-16">
			<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
				{currentJobs.map((job) => (
					<JobCard key={job.id} job={job} />
				))}
			</div>
			{totalPages > 1 ? <SharedPagination currentPage={page} totalPages={totalPages} onChange={setPage} className="mt-6" /> : null}
		</section>
	);
}
