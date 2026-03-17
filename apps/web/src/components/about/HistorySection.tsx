"use client";

import { Button } from "@/index";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HistorySection() {
	return (
		<section className="relative container mx-auto py-32 w-full overflow-hidden">
			<div className="flex justify-between items-start mx-4">
				<div className="max-w-[590px]">
					<h2 className="h3 !font-bold text-primary uppercase">
						Надійний <span className="text-secondary">будівельний партнер</span> з перевіреним досвідом
					</h2>
					<p className="text-primary-foreground mt-4">
						Global Technology Innovations працює у сфері будівництва з 2009 року та надає комплексні рішення для житлових,
						комерційних і промислових об’єктів.
					</p>
					<p className="text-primary-foreground mt-4">
						Компанія розпочала свою діяльність як сімейний будівельний бізнес і з роками переросла у стабільну професійну
						структуру.
					</p>
					<p className="text-primary-foreground mt-4">
						Ми поєднуємо практичний досвід попереднього покоління, сучасні технології та відповідальний підхід до кожного
						проєкту, забезпечуючи якість, безпеку та стабільний результат.
					</p>
					<Button asChild className="mt-12">
						<Link href="/about">
							Дізнатись більше
							<ArrowRight className="size-4 shrink-0" />
						</Link>
					</Button>
				</div>
				<div className="max-w-[590px]">
					<Image
						src="/history-img.png"
						alt="Співробітники Global Technology Innovations з кресленнями"
						width={590}
						height={400}
						className="w-full h-auto rounded-lg object-cover"
					/>
				</div>
			</div>
		</section>
	);
}
