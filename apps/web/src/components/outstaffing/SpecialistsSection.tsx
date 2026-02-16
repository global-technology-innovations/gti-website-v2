"use client";

import { Badge, Card, Reveal } from "@/components";
import { Hammer, HardHat, Home, PaintBucket, Sparkles, Users, Wrench, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

const specialistIcons = {
	bricklayers: Hammer,
	drywallers: Home,
	tilers: PaintBucket,
	facade: HardHat,
	electricians: Zap,
	plumbers: Wrench,
	universal: Users,
	cleaners: Sparkles,
};

export function SpecialistsSection() {
	const t = useTranslations("OutstaffingPage.Specialists");

	const specialists = [
		{ key: "bricklayers", icon: "bricklayers" },
		{ key: "drywallers", icon: "drywallers" },
		{ key: "tilers", icon: "tilers" },
		{ key: "facade", icon: "facade" },
		{ key: "electricians", icon: "electricians" },
		{ key: "plumbers", icon: "plumbers" },
		{ key: "universal", icon: "universal" },
		{ key: "cleaners", icon: "cleaners" },
	];

	return (
		<section className="pt-12">
			<div className="container mx-auto">
				<Reveal>
					<div className="text-center mb-12">
						<Badge className="mb-4">{t("badge")}</Badge>
						<h2>{t("title")}</h2>
						<p className="mt-4 text-gray-600 max-w-2xl mx-auto">{t("subtitle")}</p>
					</div>
				</Reveal>

				<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
					{specialists.map((specialist, index) => {
						const IconComponent = specialistIcons[specialist.icon as keyof typeof specialistIcons];

						return (
							<Reveal key={specialist.key}>
								<Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
									<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
										<IconComponent className="w-8 h-8 text-primary" />
									</div>
									<h3 className="text-lg font-semibold text-gray-800">
										{t(`list.${specialist.key}`)}
									</h3>
								</Card>
							</Reveal>
						);
					})}
				</div>
			</div>
		</section>
	);
}
