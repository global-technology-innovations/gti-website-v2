"use client";

import { MultiHeroSection } from "@/components";
import { useTranslations } from "next-intl";

export function PortfolioHeroSection() {
	const t = useTranslations("PortfolioPage.Hero");

	return (
		<section className="pt-12">
			<div className="container mx-auto">
				<MultiHeroSection
					title={t("title")}
					description={t("description")}
					badgeText={t("badge")}
				/>
			</div>
		</section>
	);
}
