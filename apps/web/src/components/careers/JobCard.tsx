"use client";

import type { Job } from "@/lib/services/jobs";
import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ApplicationFormModal } from "../forms/ApplicationFormModal";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";

export function JobCard({ job }: { job: Job }) {
	const t = useTranslations("CareersPage");

	return (
		<ApplicationFormModal jobId={job.id} title={t("apply", { title: job.title })}>
			<Card
				variant="outline"
				className="group flex h-full cursor-pointer flex-col justify-between rounded-[28px] bg-white p-6 text-left transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 animate-slide-left"
			>
				<CardHeader className="block">
					<CardTitle className="text-[22px] leading-[1.1]">{job.title}</CardTitle>
				</CardHeader>
				<CardContent className="mt-4">
					<p className="text-primary-foreground">{job.shortDescription}</p>
				</CardContent>
				<CardFooter className="mt-3 flex items-center justify-between gap-4 pt-2 text-sm text-primary">
					<div className="flex items-center gap-2 text-[18px] font-medium text-secondary">
						<MapPin className="h-5 w-5 shrink-0" />
						<span className="text-[16px] font-medium">{job.location}</span>
					</div>

					<Image
						src="/icons/arrow-right.svg"
						alt=""
						width={16}
						height={12}
						className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
						aria-hidden="true"
					/>
				</CardFooter>
			</Card>
		</ApplicationFormModal>
	);
}
