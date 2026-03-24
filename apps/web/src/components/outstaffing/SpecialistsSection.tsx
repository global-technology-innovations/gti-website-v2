"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";

const specialists = [
	{ key: "bricklayers", icon: "/icons/sledgehammer.svg", variant: "light" },
	{ key: "drywallers", icon: "/icons/home-white.svg", variant: "blue" },
	{ key: "tilers", icon: "/icons/palette.svg", variant: "light" },
	{ key: "facade", icon: "/icons/ruler-angular.svg", variant: "blue" },
	{ key: "electricians", icon: "/icons/lightbulb-minimalistic.svg", variant: "dark" },
	{ key: "plumbers", icon: "/icons/settings-minimalistic.svg", variant: "light" },
	{ key: "universal", icon: "/icons/users-group-two-rounded.svg", variant: "dark" },
	{ key: "cleaners", icon: "/icons/hand-stars.svg", variant: "light" },
] as const;

const specialistItemClasses = {
	light: "bg-card text-primary border border-border/40",
	blue: "bg-secondary text-secondary-foreground border border-transparent",
	dark: "bg-primary text-white border border-transparent",
};

const specialistIconClasses = {
	light: "bg-secondary/10",
	blue: "bg-white/30",
	dark: "bg-white/30",
};

export function SpecialistsSection() {
	const t = useTranslations("OutstaffingPage.Specialists");

	return (
		<section className="pb-16 pt-6 md:pb-24 md:pt-8">
			<div className="container mx-auto px-4">
				<div className="mx-auto max-w-[880px] text-center">
					<h2 className="text-primary uppercase !text-[32px] !leading-[1.04] md:!text-[42px] lg:!text-[56px]">{t("title")}</h2>
					<p className="mt-4 text-primary-foreground">{t("subtitle")}</p>
				</div>

				<div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
					{specialists.map((specialist) => (
						<div
							key={specialist.key}
							className={cn(
								"flex min-h-[74px] items-center gap-4 rounded-[24px] px-5 py-4 transition-transform duration-300 hover:-translate-y-0.5",
								specialistItemClasses[specialist.variant]
							)}
						>
							<div
								className={cn(
									"flex size-11 shrink-0 items-center justify-center rounded-full",
									specialistIconClasses[specialist.variant]
								)}
							>
								<Image src={specialist.icon} alt="" width={20} height={20} className="size-5" aria-hidden="true" />
							</div>
							<span className="text-[16px] font-medium uppercase leading-[1.2]">{t(`list.${specialist.key}`)}</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
