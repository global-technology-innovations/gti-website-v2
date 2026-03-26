"use client";

import { Button } from "@/index";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HistorySection() {
	return (
		<section className="relative container mx-auto py-10 lg:py-32 w-full overflow-hidden px-4">
			<div className="flex flex-col lg:flex-row justify-between items-start mx-4">
				<div className="lg:max-w-[590px]">
					<h2 className="h3 !font-bold text-primary text-center lg:text-left uppercase">
						Надійний <span className="text-secondary">будівельний партнер</span> з перевіреним досвідом
					</h2>
					<p className="text-primary-foreground mt-4 text-center lg:text-left">
						Global Technology Innovations працює у сфері будівництва з 2009 року та надає комплексні рішення для житлових,
						комерційних і промислових об’єктів.
					</p>
					<p className="text-primary-foreground mt-4 text-center lg:text-left">
						Компанія розпочала свою діяльність як сімейний будівельний бізнес і з роками переросла у стабільну професійну
						структуру.
					</p>
					<p className="text-primary-foreground mt-4 text-center lg:text-left">
						Ми поєднуємо практичний досвід попереднього покоління, сучасні технології та відповідальний підхід до кожного
						проєкту, забезпечуючи якість, безпеку та стабільний результат.
					</p>
					<Button asChild className="hidden lg:inline-flex mt-12">
						<Link href="/about">
							Дізнатись більше
							<ArrowRight className="size-4 shrink-0" />
						</Link>
					</Button>
				</div>
				<Image
					src="/history-img.png"
					alt="Співробітники Global Technology Innovations з кресленнями"
					width={590}
					height={400}
					className="w-full h-auto rounded-lg object-cover"
				/>
				<Button asChild className="lg:hidden mt-6 mx-auto">
					<Link href="/about">
						Дізнатись більше
						<ArrowRight className="size-4 shrink-0" />
					</Link>
				</Button>
			</div>
		</section>
	);
}
