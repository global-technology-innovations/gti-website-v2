import { Button, Card } from "@/components/ui";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const quickContactLinks = [
	{
		key: "phone",
		iconSrc: "/icons/phone-calling.svg",
		iconAlt: "phone",
		href: "tel:+421917089618",
		external: false,
	},
	{
		key: "whatsapp",
		iconSrc: "/icons/whatsapp.svg",
		iconAlt: "whatsapp",
		href: "https://wa.me/421917089618",
		external: true,
	},
	{
		key: "facebook",
		iconSrc: "/icons/facebook.svg",
		iconAlt: "facebook",
		href: "https://www.facebook.com/share/19oenjwYPz/",
		external: true,
	},
	{
		key: "email",
		iconSrc: "/icons/inbox.svg",
		iconAlt: "email",
		href: "mailto:info@global-technology-innovations.com",
		external: false,
	},
] as const;

export function ContactHeroSection() {
	const t = useTranslations("ContactPage");

	return (
		<section className="py-10 md:py-20">
			<div className="container mx-auto px-4">
				<div className="mx-auto max-w-[1080px] text-center">
					<h1 className="text-primary uppercase h2">
						{t.rich("Hero.title", {
							highlight: (chunks) => <span className="text-secondary">{chunks}</span>,
						})}
					</h1>
					<p className="mx-auto mt-6 max-w-[760px] text-primary-foreground">{t("Hero.description")}</p>
				</div>

				<div className="mt-6 lg:mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
					{quickContactLinks.map((item) => (
						<Card key={item.key} variant="outline" className="flex flex-col items-center justify-between p-6 md:p-8">
							<Image src={item.iconSrc} alt={item.iconAlt} width={30} height={30} className="size-[30px]" />
							<h3 className="mt-3 md:mt-6 card-title text-primary">{t(`QuickContacts.items.${item.key}.title`)}</h3>
							<Button asChild variant="secondary" className="mt-3 md:mt-6 w-full sm:w-fit">
								<a
									href={item.href}
									target={item.external ? "_blank" : undefined}
									rel={item.external ? "noopener noreferrer" : undefined}
								>
									{t(`QuickContacts.items.${item.key}.action`)}
									<ArrowRight className="size-4 shrink-0" />
								</a>
							</Button>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
