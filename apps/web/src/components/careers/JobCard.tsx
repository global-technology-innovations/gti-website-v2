"use client";

import {
	ApplicationFormModal,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components";
import { Job } from "@/queries";
import { Briefcase, FileText, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

export function JobCard({ job }: { job: Job }) {
	const t = useTranslations("CareersPage");

	return (
		<Card className="h-full flex flex-col justify-between">
			<div>
				<CardHeader>
					<CardTitle className="!text-[20px]">
						<Briefcase className="size-[18px] text-primary shrink-0" />
						{job.title}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex items-center gap-2 mt-3">
						<MapPin className="size-[20px] text-primary shrink-0" />
						<p>{job.location}</p>
					</div>
					<div className="flex items-start mt-2 gap-2">
						<FileText className="size-[20px] text-primary shrink-0" />
						<p className="card_descr">{job.shortDescription}</p>
					</div>
				</CardContent>
			</div>
			<CardFooter className="flex justify-center">
				{/* <Button className="mt-2">{t("apply")}</Button> */}
				<ApplicationFormModal
					jobId={job.id}
					triggerLabel={t("apply")}
					title={t("apply", { title: job.title })}
				/>
			</CardFooter>
		</Card>
	);
}
