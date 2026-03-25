// Direct path to avoid circular dependency: hero → @/components → hero
import { Button, Card } from "@/components";
import { Link } from "@/i18n";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const HERO_SERVICES = [
	{
		title: "Штукатурка",
		description: "Виконуємо внутрішні та зовнішні штукатурні роботи з рівними поверхнями.",
		icon: "/icons/key.svg",
	},
	{
		title: "Шпаклівка",
		description: "Професійне вирівнювання стін і стель під фарбування або шпалери.",
		icon: "/icons/eraser.svg",
	},
	{
		title: "Монолітні роботи",
		description: "Монолітні роботи від фундаментів до перекриттів з дотриманням технологій.",
		icon: "/icons/sledgehammer.svg",
	},
	{
		title: "Гіпсокартонні роботи",
		description: "Монтаж стель, перегородок і декоративних конструкцій з гіпсокартону.",
		icon: "/icons/ruler-pen.svg",
	},
	{
		title: "Укладання бруківки",
		description: "Якісне укладання бруківки для дворів, доріжок та паркінгів.",
		icon: "/icons/delivery.svg",
	},
	{
		title: "Укладання покриття",
		description: "Монтаж усіх видів підлогових покриттів з акуратним виконанням.",
		icon: "/icons/palette.svg",
	},
	{
		title: "Малярні роботи",
		description: "Фарбування стін, стель і фасадів з рівномірним покриттям.",
		icon: "/icons/paint-roller.svg",
	},
	{
		title: "Фасадні роботи",
		description: "Комплексні фасадні роботи з утеплення та оздоблення будівель.",
		icon: "/icons/home.svg",
	},
] as const;

export function ServicesSection() {
	return (
		<section className="relative mx-4 bg-background rounded-3xl py-10 lg:py-22 px-4">
			<div className="container flex flex-col md:flex-row justify-between items-center relative mx-auto gap-x-6">
				<div>
					<h2 className="h3 !font-bold text-primary uppercase text-center md:text-left">Повний цикл робіт - під ключ</h2>
					<p className="text-primary-foreground mt-3 text-center md:text-left">
						Від ідеї та проєктування до реалізації та сервісного супроводу — беремо відповідальність за результат.
					</p>
				</div>

				<Button asChild variant="secondary" className="mt-6 md:mt-0 w-full md:w-auto">
					<Link href="/our-services">
						Усі сервіси <ArrowRight className="w-4 h-4" />
					</Link>
				</Button>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 container mx-auto pt-12">
				{HERO_SERVICES.map((service, index) => (
					<Card key={index} variant="outline" className="flex flex-col items-center md:items-start">
						<div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mb-4">
							<Image src={service.icon} alt="" width={24} height={24} className="text-primary" aria-hidden />
						</div>
						<h3 className="!text-lg !leading-normal !font-bold text-primary uppercase">{service.title}</h3>
						<p className="text-primary-foreground mt-2 text-sm max-w-[280px] text-center md:text-left">{service.description}</p>
					</Card>
				))}
			</div>
		</section>
	);
}
