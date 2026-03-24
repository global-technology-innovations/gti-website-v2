"use client";

import { MultiHeroSection } from "@/components";
import { useTranslations } from "next-intl";

export function OutstaffingHeroSection() {
	const t = useTranslations("OutstaffingPage.Hero");

	return (
		<section className="pt-12">
			<div className="container mx-auto">
				<MultiHeroSection title={t("title")} description={t("description")} badgeText={t("badge")} />

				<div className="max-w-4xl mx-auto text-center">
					<div className="flex items-center justify-center space-x-3 mt-6"></div>
				</div>
			</div>
		</section>
	);
}
