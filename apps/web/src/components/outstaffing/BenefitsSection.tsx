"use client";

import { Card } from "@/components/ui";
import { useTranslations } from "next-intl";
import Image from "next/image";

const benefits = [
	{ key: "speed", icon: "/icons/bolt-circle.svg" },
	{ key: "savings", icon: "/icons/clipboard.svg" },
	{ key: "experience", icon: "/icons/crown-minimalistic.svg" },
	{ key: "flexibility", icon: "/icons/layers.svg" },
] as const;

export function BenefitsSection() {
	const t = useTranslations("OutstaffingPage.Benefits");

	return (
		<section className="py-16 md:py-24">
			<div className="mx-4 rounded-[32px] bg-background py-16 md:py-20">
				<div className="container mx-auto px-4">
					<div className="mx-auto max-w-[760px] text-center">
						<h2 className="text-primary uppercase h3 !font-bold">{t("title")}</h2>
						<p className="mt-4 text-primary-foreground">{t("subtitle")}</p>
					</div>

					<div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
						{benefits.map((benefit) => (
							<Card key={benefit.key} variant="outline">
								<div className="flex size-14 items-center justify-center rounded-full bg-secondary/10">
									<Image src={benefit.icon} alt="" width={28} height={28} className="size-7" aria-hidden="true" />
								</div>
								<h3 className="mt-6 card-title text-primary">{t(`list.${benefit.key}.title`)}</h3>
								<p className="mt-2 text-primary-foreground">{t(`list.${benefit.key}.description`)}</p>
							</Card>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
