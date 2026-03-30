"use client";

import { Button } from "@/components/ui";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function OutstaffingExperienceSection() {
	const t = useTranslations("OutstaffingPage.Experience");

	return (
		<section className="py-10 md:py-16 lg:py-24">
			<div className="container mx-auto flex flex-col-reverse lg:flex-row justify-between items-center gap-10 px-4">
				<div className="overflow-hidden rounded-[32px]">
					<Image src="/outstaffing-worker.png" alt={t("imageAlt")} width={528} height={468} className="h-full object-cover" />
				</div>

				<div className="lg:w-2/3 xl:w-1/2">
					<h2 className="text-primary text-center md:text-left uppercase h3 !font-bold">
						{t.rich("title", {
							highlight: (chunks) => <span className="text-secondary">{chunks}</span>,
						})}
					</h2>
					<p className="mt-6 text-center md:text-left text-primary-foreground">{t("paragraphs.first")}</p>
					<p className="mt-6 text-center md:text-left text-primary-foreground">{t("paragraphs.second")}</p>

					<Button asChild className="hidden lg:inline-flex mt-10">
						<a href="#outstaffing-cta">
							{t("button")}
							<ArrowRight className="size-4 shrink-0" />
						</a>
					</Button>
				</div>
			</div>
			<div className="mt-10 flex justify-center lg:hidden">
				<Button asChild>
					<a href="#outstaffing-cta">
						{t("button")}
						<ArrowRight className="size-4 shrink-0" />
					</a>
				</Button>
			</div>
		</section>
	);
}
