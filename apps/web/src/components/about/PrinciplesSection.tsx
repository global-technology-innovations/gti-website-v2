// Direct path to avoid circular dependency: hero → @/components → hero
import { Card } from "@/components/ui";
import { useTranslations } from "next-intl";
import Image from "next/image";

const PRINCIPLES = [
	{
		key: "trust",
		icon: "/icons/crown-line.svg",
	},
	{
		key: "quality",
		icon: "/icons/layers.svg",
	},
	{
		key: "innovation",
		icon: "/icons/share-circle.svg",
	},
	{
		key: "excellence",
		icon: "/icons/chart-square.svg",
	},
	{
		key: "sustainability",
		icon: "/icons/paw.svg",
	},
	{
		key: "teamwork",
		icon: "/icons/mask-happly.svg",
	},
] as const;

export function PrinciplesSection() {
	const t = useTranslations("AboutPage.OurValues");

	return (
		<section className="relative container mx-auto rounded-3xl pb-10 lg:pb-22 px-4">
			<div className="flex flex-col items-center justify-center animate-slide-bottom">
				<h2 className="h3 !font-bold text-primary text-center lg:text-left uppercase">
					{t("headingStart")} <span className="text-secondary">{t("headingHighlight")}</span>
				</h2>
				<p className="text-primary-foreground mt-4 text-center lg:text-left">{t("description")}</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 lg:pt-12 pt-6">
				{PRINCIPLES.map((principle, index) => (
					<Card key={index} variant="default" className="items-center text-center animate-slide-bottom">
						<div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 mx-auto">
							<Image src={principle.icon} alt="" width={24} height={24} className="text-primary" aria-hidden />
						</div>
						<h3 className="!text-lg !leading-normal !font-bold text-primary uppercase">{t(`${principle.key}.title`)}</h3>
						<p className="text-primary-foreground mt-2 text-sm">{t(`${principle.key}.description`)}</p>
					</Card>
				))}
			</div>
		</section>
	);
}
