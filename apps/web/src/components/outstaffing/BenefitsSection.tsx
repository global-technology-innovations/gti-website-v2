"use client";

import { Card } from "@/components";
import { Award, Clock, DollarSign, RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";

const benefitIcons = {
	speed: Clock,
	savings: DollarSign,
	experience: Award,
	flexibility: RotateCcw,
};

const benefitStyles = {
	speed: {
		bg: "bg-gradient-to-br from-blue-50 to-blue-100",
		iconBg: "bg-blue-600",
		iconColor: "text-white",
	},
	savings: {
		bg: "bg-gradient-to-br from-green-50 to-green-100",
		iconBg: "bg-green-600",
		iconColor: "text-white",
	},
	experience: {
		bg: "bg-gradient-to-br from-purple-50 to-purple-100",
		iconBg: "bg-purple-600",
		iconColor: "text-white",
	},
	flexibility: {
		bg: "bg-gradient-to-br from-orange-50 to-orange-100",
		iconBg: "bg-orange-600",
		iconColor: "text-white",
	},
};

export function BenefitsSection() {
	const t = useTranslations("OutstaffingPage.Benefits");

	const benefits = [
		{ key: "speed", icon: "speed" },
		{ key: "savings", icon: "savings" },
		{ key: "experience", icon: "experience" },
		{ key: "flexibility", icon: "flexibility" },
	];

	return (
		<section className="pt-12">
			<div className="container mx-auto">
				<div className="text-center mb-12">
					{/* <Badge className="mb-4">{t("badge")}</Badge> */}
					<h2>{t("title")}</h2>
					<p className="mt-4 text-gray-600 max-w-2xl mx-auto">{t("subtitle")}</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{benefits.map((benefit, index) => {
						const IconComponent = benefitIcons[benefit.icon as keyof typeof benefitIcons];
						const styles = benefitStyles[benefit.icon as keyof typeof benefitStyles];

						return (
							<Card
								key={benefit.key}
								className={`p-6 text-center h-full ${styles.bg} hover:shadow-lg transition-shadow duration-300 border-none`}
							>
								<div className={`w-16 h-16 ${styles.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
									<IconComponent className={`w-8 h-8 ${styles.iconColor}`} />
								</div>
								<h3 className="text-lg font-semibold text-gray-800 mb-3">{t(`list.${benefit.key}.title`)}</h3>
								<p className="text-gray-600 text-sm leading-relaxed">{t(`list.${benefit.key}.description`)}</p>
							</Card>
						);
					})}
				</div>
			</div>
		</section>
	);
}
