"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";

const steps = [
	{ key: "request", number: "01" },
	{ key: "selection", number: "02" },
	{ key: "contract", number: "03" },
	{ key: "work", number: "04" },
] as const;

export function OutstaffingWorkflowSection() {
	const t = useTranslations("OutstaffingPage.HowItWorks");

	return (
		<section className="py-10 md:py-16 lg:py-24">
			<div className="container mx-auto px-4">
				<div className="mx-auto">
					<h2 className="mx-auto text-center text-primary uppercase h3 !font-bold">
						{t.rich("title", {
							highlight: (chunks) => <span className="text-secondary">{chunks}</span>,
						})}
					</h2>

					<div className="mt-12 flex justify-between items-start gap-10 lg:gap-16">
						<div>
							{steps.map((step, index) => (
								<div
									key={step.key}
									className={cn(
										"flex justify-start items-start gap-4 border-border/60 py-5.5 md:gap-6",
										index !== steps.length - 1 && "border-b"
									)}
								>
									<span className="text-[32px] font-bold text-secondary/45 leading-none">{step.number}</span>
									<div>
										<h3 className="card-title text-primary">{t(`steps.${step.key}.title`)}</h3>
										<p className="mt-3 max-w-[620px] text-primary-foreground">{t(`steps.${step.key}.description`)}</p>
									</div>
								</div>
							))}
						</div>

						<div className="hidden lg:inline-flex flex items-center justify-center">
							<Image
								src="/outstaffing-worker-plan.png"
								alt={t("imageAlt")}
								width={552}
								height={540}
								className="h-full object-cover"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
