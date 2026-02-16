// Direct paths to avoid circular dependency: hero → @/components → hero
import { ContactModal } from "@/components";
import { Reveal } from "@/components/animations";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function HeroSection() {
	const t = useTranslations("HomePage.HeroSection");

	return (
		<Reveal>
			<section className="relative mx-4 bg-background bg-[url('/hero-bg.svg')] bg-right bg-no-repeat bg-[length:auto_100%] rounded-b-3xl">
				<div className="container py-22 flex justify-between items-center relative mx-auto">
					<div className="flex flex-col items-start">
						<div className="max-w-[630px]">
							<h1 className="text-primary text-center md:text-left uppercase">
								Комплексні <br /> <span className="text-secondary">будівельні</span> <br />
								рішення під ключ
							</h1>
							<p className="text-primary mt-6 text-left">{t("description")}</p>
						</div>
						<ContactModal className="mt-8" />
					</div>
					<div className="relative bg-secondary w-fit h-fit max-w-[410px] rounded-lg p-6 self-end">
						<div className="absolute top-[-15px] right-14">
							<Image src="/icons/quote.svg" alt="quote" width={56} height={40} />
						</div>
						<h3 className="text-white">Олександр Коваленко</h3>
						<p className="text-white/70">CEO, Horizon Group</p>
						<p className="text-white mt-4">
							Компанія продемонструвала високий рівень професіоналізму та надійності. Проєкт було
							виконано вчасно, з відмінною якістю та чіткою комунікацією на всіх етапах.
						</p>
					</div>
				</div>
			</section>
		</Reveal>
	);
}
