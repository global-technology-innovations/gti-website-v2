"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Facebook, Mail, MessageCircleMore, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ContactInfo() {
	const t = useTranslations("ContactPage.contacts");

	const phones = [
		{
			flag: "sk",
			content: "+421 917 089 618",
			href: "tel:+421917089618",
		},
		{
			flag: "ua",
			content: "+380 97 373 72 40",
			href: "tel:+380973737240",
		},
	];

	const otherContacts = [
		{
			icon: MessageCircleMore,
			title: t("whatsapp"),
			href: "https://wa.me/421917089618",
			bgColor: "bg-green-600",
			hoverBgColor: "hover:bg-green-700",
		},
		{
			icon: Facebook,
			title: t("facebook"),
			href: "https://www.facebook.com/share/19oenjwYPz/",
			bgColor: "bg-primary",
			hoverBgColor: "",
		},
		{
			icon: Mail,
			title: t("email"),
			href: "mailto:info@global-technology-innovations.com",
			bgColor: "bg-purple-600",
			hoverBgColor: "hover:bg-purple-700",
		},
	];

	return (
		<section>
			<div className="container mx-auto py-6">
				<div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
					<Card className="p-6 h-full flex flex-col">
						<div className="flex items-center gap-3 mb-4">
							<div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
								<Phone className="w-6 h-6 text-white" />
							</div>
							<h3 className="text-lg font-semibold">{t("phones")}</h3>
						</div>
						<div className="space-y-4 mt-auto">
							{phones.map((phone, index) => (
								<div key={index} className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<span className={`fi fi-${phone.flag} rounded-sm`} />
										<p className="font-medium">{phone.content}</p>
									</div>
									<Button asChild variant="default" className="px-2 py-1">
										<a href={phone.href}>{t("call")}</a>
									</Button>
								</div>
							))}
						</div>
					</Card>

					<div className="flex flex-col gap-4">
						{otherContacts.map((contact, index) => (
							<Card className="p-4" key={index}>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-4">
										<div className={`w-10 h-10 ${contact.bgColor} rounded-full flex items-center justify-center`}>
											<contact.icon className="w-6 h-6 text-white" />
										</div>
										<h4 className="">{contact.title}</h4>
									</div>
									<Button
										asChild
										variant="default"
										className={`${contact.bgColor} ${contact.hoverBgColor} border-0 px-4 py-1`}
									>
										<a
											href={contact.href}
											target={contact.href.startsWith("http") ? "_blank" : undefined}
											rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
										>
											{t("open")}
										</a>
									</Button>
								</div>
							</Card>
						))}
					</div>
				</div>

				<div className="text-center mt-8 text-sm text-gray-500">{t("workingHours")}</div>
			</div>
		</section>
	);
}
