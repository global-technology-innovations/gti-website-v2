"use client";

import { Badge, Card, Reveal } from "@/components";
import { FileText, MessageSquare, PlayCircle, Search } from "lucide-react";
import { useTranslations } from "next-intl";

const stepIcons = {
	request: MessageSquare,
	selection: Search,
	contract: FileText,
	work: PlayCircle,
};

export function HowItWorksSection() {
	const t = useTranslations("OutstaffingPage.HowItWorks");

	const steps = [
		{ key: "request", icon: "request", number: 1 },
		{ key: "selection", icon: "selection", number: 2 },
		{ key: "contract", icon: "contract", number: 3 },
		{ key: "work", icon: "work", number: 4 },
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

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{steps.map((step, index) => {
						const IconComponent = stepIcons[step.icon as keyof typeof stepIcons];

						return (
							<Reveal key={step.key}>
								<div className="relative">
									{/* Connection line - horizontal for large screens, vertical for mobile */}
									{index < steps.length - 1 && (
										<>
											{/* Horizontal line for large screens */}
											<div className="hidden lg:block absolute top-12 left-full w-8 h-0.5 bg-primary/30 z-0" />
											{/* Vertical line for small mobile screens only */}
											<div className="md:hidden absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-primary/30 z-0" />
										</>
									)}

									<Card className="p-6 text-center relative z-10 bg-white hover:shadow-lg transition-shadow duration-300 border border-blue-500">
										<div className="relative mb-4">
											<div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto border border-blue-500">
												<IconComponent className="w-8 h-8 text-white" />
											</div>
											<div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center border border-blue-500">
												<span className="text-blue-500 font-bold text-sm">{step.number}</span>
											</div>
										</div>

										<h3 className="text-lg font-semibold text-gray-800 mb-3">
											{t(`steps.${step.key}.title`)}
										</h3>
										<p className="text-gray-600 text-sm leading-relaxed">
											{t(`steps.${step.key}.description`)}
										</p>
									</Card>
								</div>
							</Reveal>
						);
					})}
				</div>
			</div>
		</section>
	);
}
