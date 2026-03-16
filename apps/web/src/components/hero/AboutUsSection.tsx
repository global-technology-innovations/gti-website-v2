import { Button } from "@/components";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export function AboutUsSection() {
	const t = useTranslations("HomePage.AboutUsSection");

	return (
		<section className="relative py-32 w-full overflow-hidden">
			<Image
				src="/about-bg.svg"
				alt=""
				width={408}
				height={362}
				className="pointer-events-none absolute bottom-0 left-0 z-0 object-contain object-left-bottom"
				aria-hidden
			/>
			<div className="container relative z-10 mx-auto flex justify-between items-start">
				<div className="grid grid-cols-2 gap-4 max-w-[530px]">
					<div className="p-7 bg-background rounded-3xl">
						<h2 className="text-primary font-bold">15+</h2>
						<p className="text-primary-foreground">
							Років практичного досвіду
						</p>
					</div>
					<div className="p-7 bg-primary rounded-3xl">
						<h2 className="text-white font-bold">500+</h2>
						<p className="text-white/70">
							Успішно завершених проєктів
						</p>
					</div>
					<div className="p-7 bg-secondary rounded-3xl">
						<h2 className="text-white font-bold">50+</h2>
						<p className="text-white/70">
							Кваліфікованих фахівців у команді
						</p>
					</div>
					<div></div>
					<div></div>
					<div className="p-7 bg-background rounded-3xl">
						<h2 className="text-primary font-bold">98%</h2>
						<p className="text-primary-foreground">
							Задоволених постійних клієнтів
						</p>
					</div>
				</div>
				<div className="max-w-[590px]">
					<h2 className="text-primary uppercase">
						Надійний{" "}
						<span className="text-secondary">
							будівельний партнер
						</span>{" "}
						з перевіреним досвідом
					</h2>
					<p className="text-primary-foreground mt-4">
						Global Technology Innovations працює у сфері будівництва
						з 2009 року та надає комплексні рішення для житлових,
						комерційних і промислових об’єктів.
					</p>
					<p className="text-primary-foreground mt-4">
						Компанія розпочала свою діяльність як сімейний
						будівельний бізнес і з роками переросла у стабільну
						професійну структуру.
					</p>
					<p className="text-primary-foreground mt-4">
						Ми поєднуємо практичний досвід попереднього покоління,
						сучасні технології та відповідальний підхід до кожного
						проєкту, забезпечуючи якість, безпеку та стабільний
						результат.
					</p>
					<Button asChild className="mt-12">
						<Link href="/about">
							Дізнатись більше
							<ArrowRight className="size-4 shrink-0" />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
