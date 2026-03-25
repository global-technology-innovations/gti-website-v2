// Direct paths to avoid circular dependency: hero → @/components → hero
import { ContactModal } from "@/components";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function HeroSection() {
	const t = useTranslations("HomePage.HeroSection");

	return (
		<section className="relative mx-4 px-4 bg-background rounded-b-3xl overflow-hidden">
			<div className="absolute inset-0 bg-[url('/hero-bg.svg')] bg-right bg-no-repeat blur-xs lg:blur-none" />
			<div className="container py-10 lg:py-22 flex flex-col md:flex-row justify-between items-center relative mx-auto z-10">
				<div className="flex flex-col items-start">
					<div className="max-w-[630px]">
						<h1 className="text-primary text-center md:text-left uppercase">
							Комплексні <br /> <span className="text-secondary">будівельні</span> <br />
							рішення під ключ
						</h1>
						<p className="text-primary mt-6 text-center md:text-left">{t("description")}</p>
					</div>
					<ContactModal className="mt-4 md:mt-8 mx-auto md:mx-0" />
				</div>
				<div className="relative bg-secondary w-fit h-fit mt-6 md:mt-0 max-w-[410px] rounded-lg p-6 md:self-end">
					<div className="absolute top-[-15px] right-14">
						<Image src="/icons/quote.svg" alt="quote" width={56} height={40} />
					</div>
					<h3 className="text-white !font-semibold !leading-normal !text-lg">Олександр Коваленко</h3>
					<p className="text-white/70">CEO, Horizon Group</p>
					<p className="text-white mt-4">
						Компанія продемонструвала високий рівень професіоналізму та надійності. Проєкт було виконано вчасно, з відмінною
						якістю та чіткою комунікацією на всіх етапах.
					</p>
				</div>
			</div>
		</section>
	);
}
