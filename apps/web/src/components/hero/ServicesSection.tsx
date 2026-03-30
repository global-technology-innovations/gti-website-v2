// Direct path to avoid circular dependency: hero → @/components → hero
import { Button, Card } from "@/components";
import { Link } from "@/i18n";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const HERO_SERVICES = [
	{
		key: "plastering",
		icon: "/icons/key.svg",
	},
	{
		key: "putty",
		icon: "/icons/eraser.svg",
	},
	{
		key: "monolithic",
		icon: "/icons/sledgehammer.svg",
	},
	{
		key: "drywall",
		icon: "/icons/ruler-pen.svg",
	},
	{
		key: "paving",
		icon: "/icons/delivery.svg",
	},
	{
		key: "flooring",
		icon: "/icons/palette.svg",
	},
	{
		key: "painting",
		icon: "/icons/paint-roller.svg",
	},
	{
		key: "facade",
		icon: "/icons/home.svg",
	},
] as const;

export function ServicesSection() {
	const t = useTranslations("HomePage.ServicesSection");

	return (
		<section className="relative mx-4 bg-background rounded-3xl py-10 lg:py-22 px-4">
			<div className="container flex flex-col md:flex-row justify-between items-center relative mx-auto gap-x-6">
				<div>
					<h2 className="h3 !font-bold text-primary uppercase text-center md:text-left">
						{t("headingStart")} <span className="text-secondary">{t("headingHighlight")}</span>
					</h2>
					<p className="text-primary-foreground mt-3 text-center md:text-left">{t("description")}</p>
				</div>

				<Button asChild variant="secondary" className="mt-6 md:mt-0 w-full md:w-auto">
					<Link href="/our-services">
						{t("button")} <ArrowRight className="w-4 h-4" />
					</Link>
				</Button>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 container mx-auto pt-12">
				{HERO_SERVICES.map((service, index) => (
					<Card key={index} variant="outline" className="flex flex-col items-center md:items-start">
						<div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mb-4">
							<Image src={service.icon} alt="" width={24} height={24} className="text-primary" aria-hidden />
						</div>
						<h3 className="!text-lg !leading-normal !font-bold text-primary uppercase">{t(`items.${service.key}.title`)}</h3>
						<p className="text-primary-foreground mt-2 text-sm max-w-[280px] text-center md:text-left">
							{t(`items.${service.key}.description`)}
						</p>
					</Card>
				))}
			</div>
		</section>
	);
}
