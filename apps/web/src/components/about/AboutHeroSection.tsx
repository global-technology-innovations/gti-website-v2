import { Badge } from "@/components";
import { useTranslations } from "next-intl";

export function AboutHeroSection() {
	const t = useTranslations("AboutPage.Hero");

	return (
		<section className="relative mx-4 bg-background rounded-b-3xl overflow-hidden min-h-[400px] px-4">
			<div className="absolute top-0 left-0 w-[45%] max-w-[480px] h-full z-0 pointer-events-none">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src="/about-bg-left.svg"
					alt=""
					className="w-full h-full object-contain object-left-top select-none blur-xs md:blur-none"
					aria-hidden
				/>
			</div>
			<div className="absolute top-0 right-0 w-[45%] max-w-[480px] h-full z-0 pointer-events-none">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src="/about-bg-right.svg"
					alt=""
					className="w-full h-full object-contain object-right-top select-none blur-xs md:blur-none"
					aria-hidden
				/>
			</div>
			<div className="container relative z-10 py-10 lg:py-22 flex justify-between items-center mx-auto">
				<div className="flex flex-col items-center justify-center w-full">
					<h2 className="text-primary text-center uppercase">
						Будуємо <span className="text-secondary">простори,</span> <br />
						яким довіряють
					</h2>
					<p className="!text-primary-foreground mt-6 text-center max-w-[700px] !text-[18px]">
						Global Technology Innovations — будівельна компанія з повним циклом робіт. З 2009 року ми реалізуємо житлові,
						комерційні та промислові проєкти, забезпечуючи стабільну якість, безпеку та дотримання термінів.
					</p>
					<div className="flex flex-wrap justify-center gap-3 mt-6 lg:mt-12">
						<Badge variant="secondary">Комплексні рішення під ключ</Badge>
						<Badge variant="secondary">Контроль якості на усіх етапах</Badge>
						<Badge variant="secondary">Ефективність у кожному проекті</Badge>
					</div>
				</div>
			</div>
		</section>
	);
}
