"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteContact } from "@/config/site-contact";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface PortfolioCTASectionProps {
	locale: string;
}

export function PortfolioCTASection({ locale }: PortfolioCTASectionProps) {
	const t = useTranslations("PortfolioPage.CTA");

	const contactMethods = [
		{
			icon: "/icons/phone-calling.svg",
			title: t("contactMethods.phone.title"),
			description: t("contactMethods.phone.description"),
			action: t("contactMethods.phone.action"),
			href: `tel:${siteContact.phones.ua.replace(/\s+/g, "")}`,
		},
		{
			icon: "/icons/inbox.svg",
			title: t("contactMethods.email.title"),
			description: t("contactMethods.email.description"),
			action: t("contactMethods.email.action"),
			href: `mailto:${siteContact.email}`,
		},
		{
			icon: "/icons/map-point.svg",
			title: t("contactMethods.meeting.title"),
			description: t("contactMethods.meeting.description"),
			action: t("contactMethods.meeting.action"),
			href: `/${locale}/contact`,
		},
	];

	return (
		<section className="container mx-auto py-10 lg:py-30 px-4">
			<div className="animate-slide-bottom">
				<h2 className="h3 text-center uppercase text-primary">
					{t("heading")} <span className="text-secondary">{t("headingHighlight")}</span>
				</h2>
				<p className="mt-5 text-center text-primary-foreground">{t("headingDescription")}</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:mt-12 mt-6">
				{contactMethods.map((method, index) => (
					<Card key={index} variant="default" className="items-center text-center animate-slide-bottom">
						<CardContent>
							<div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto">
								<Image src={method.icon} alt="" width={26} height={26} aria-hidden />
							</div>
							<h3 className="!text-lg mt-6 !leading-normal !font-semibold text-primary uppercase">{method.title}</h3>
							<p className="text-primary-foreground mt-2">{method.description}</p>
							<Button variant="secondary" asChild className="w-full mt-6">
								<Link href={method.href}>
									{method.action}
									<ArrowRight className="w-4 h-4 ml-2" />
								</Link>
							</Button>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
}
