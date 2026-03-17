"use client";

import { Button, Card, CardContent, ContactModal, Reveal } from "@/components";
import { ArrowRight, Calendar, CheckCircle, Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface PortfolioCTASectionProps {
	locale: string;
}

export function PortfolioCTASection({ locale }: PortfolioCTASectionProps) {
	const t = useTranslations("PortfolioPage.CTA");

	const contactMethods = [
		{
			icon: Phone,
			title: t("contactMethods.phone.title"),
			description: t("contactMethods.phone.description"),
			action: t("contactMethods.phone.action"),
			href: "tel:+380973737240",
		},
		{
			icon: Mail,
			title: t("contactMethods.email.title"),
			description: t("contactMethods.email.description"),
			action: t("contactMethods.email.action"),
			href: "mailto:info@global-technology-innovations.com",
		},
		{
			icon: Calendar,
			title: t("contactMethods.meeting.title"),
			description: t("contactMethods.meeting.description"),
			action: t("contactMethods.meeting.action"),
			href: `/${locale}/contact`,
		},
	];

	const benefits = [
		t("benefits.quality"),
		t("benefits.experience"),
		t("benefits.timeline"),
		t("benefits.support"),
		t("benefits.warranty"),
		t("benefits.transparency"),
	];

	return (
		<section className="py-20">
			<Reveal>
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t("title")}</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">{t("description")}</p>
					<div className="flex flex-wrap justify-center gap-4">
						{benefits.map((benefit, index) => (
							<div key={index} className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
								<CheckCircle className="w-5 h-5 text-green-600" />
								<span className="text-gray-700 font-medium">{benefit}</span>
							</div>
						))}
					</div>
				</div>
			</Reveal>

			<Reveal>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
					{contactMethods.map((method, index) => (
						<Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
							<CardContent>
								<div className="flex justify-center mb-4">
									<div className="p-3 bg-blue-100 rounded-full">
										<method.icon className="w-6 h-6 text-blue-600" />
									</div>
								</div>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
								<p className="text-gray-600 mb-4 text-sm">{method.description}</p>
								<Button asChild className="w-full">
									<Link href={method.href}>
										{method.action}
										<ArrowRight className="w-4 h-4 ml-2" />
									</Link>
								</Button>
							</CardContent>
						</Card>
					))}
				</div>
			</Reveal>

			<Reveal>
				<Card className="p-8 md:p-12">
					<CardContent className="p-0">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
							<div>
								<h3 className="text-3xl font-bold text-gray-900 mb-4">{t("consultation.title")}</h3>
								<p className="text-lg text-gray-600 mb-6">{t("consultation.description")}</p>
								<ul className="space-y-3 mb-8">
									{t.raw("consultation.features").map((feature: string, index: number) => (
										<li key={index} className="flex items-center space-x-3">
											<CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
											<span className="text-gray-700">{feature}</span>
										</li>
									))}
								</ul>
								<div className="flex flex-col sm:flex-row gap-4">
									<ContactModal className="mt-0 mx-0" triggerText={t("consultation.primaryButton")} />
									<Button>
										<Link href={`/${locale}/our-services`}>{t("consultation.secondaryButton")}</Link>
									</Button>
								</div>
							</div>
							<Card className="bg-gradient-to-br from-blue-100 to-indigo-100 border-0">
								<CardContent className="text-right">
									<div className="text-6xl font-bold text-blue-600 mb-2">100%</div>
									<div className="text-xl font-semibold text-gray-900 mb-2">{t("consultation.guarantee.title")}</div>
									<p className="text-gray-600">{t("consultation.guarantee.description")}</p>
								</CardContent>
							</Card>
						</div>
					</CardContent>
				</Card>
			</Reveal>
		</section>
	);
}
