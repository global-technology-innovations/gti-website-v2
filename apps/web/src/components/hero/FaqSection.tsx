"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Reveal } from "@/components";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function FAQSection() {
	const t = useTranslations("HomePage.FAQSection");

	const items = t.raw("items") as { question: string; answer: string }[];

	return (
		<section className="relative py-32 overflow-hidden">
			<div className="absolute bottom-0 left-0 pointer-events-none">
				<Image
					src="/faq-bg.svg"
					alt=""
					width={711}
					height={651}
					className="object-contain object-left-bottom select-none z-[-1]"
					aria-hidden
				/>
			</div>
			<div className="container mx-auto flex z-[1]">
				<div className="w-1/2"></div>
				<div className="min-w-0 w-1/2 shrink-0 z-[1]">
					<Reveal direction="up">
						<h2 className="text-primary uppercase">
							Відповіді на ваші <br /> <span className="text-secondary">- запитання</span>
						</h2>
					</Reveal>
					<Accordion
						type="multiple"
						defaultValue={["item-0"]}
						className=" max-w-full flex flex-col gap-4 mt-10"
					>
						{items.map((item, index) => (
							<Reveal key={index} direction="up">
								<AccordionItem value={`item-${index}`}>
									<AccordionTrigger>{item.question}</AccordionTrigger>
									<AccordionContent>
										<p>{item.answer}</p>
									</AccordionContent>
								</AccordionItem>
							</Reveal>
						))}
					</Accordion>
				</div>
			</div>
		</section>
	);
}
