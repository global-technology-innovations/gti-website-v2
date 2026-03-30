"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Reveal } from "@/components";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function FAQSection() {
	const t = useTranslations("HomePage.FAQSection");

	const items = t.raw("items") as { question: string; answer: string }[];

	return (
		<section className="relative py-10 lg:py-32 overflow-hidden px-4">
			<div className="absolute top-30 left-0 pointer-events-none">
				<Image
					src="/faq-bg.svg"
					alt=""
					width={711}
					height={651}
					className="object-contain object-left-top select-none z-[-1] blur-xs lg:blur-none"
					aria-hidden
				/>
			</div>
			<div className="container mx-auto flex z-[1]">
				<div className="w-1/2 hidden lg:block"></div>
				<div className="min-w-0 w-full lg:w-2/3 xl:w-1/2 shrink-0 z-[1]">
					<Reveal direction="up">
						<h2 className="h3 !font-bold text-primary text-center lg:text-left uppercase">
							{t("headingStart")} <span className="text-secondary">{t("headingHighlight")}</span>
						</h2>
					</Reveal>
					<Accordion type="multiple" defaultValue={["item-0"]} className=" max-w-full flex flex-col gap-4 mt-6 lg:mt-10">
						{items.map((item, index) => (
							<AccordionItem key={index} value={`item-${index}`}>
								<AccordionTrigger>{item.question}</AccordionTrigger>
								<AccordionContent>
									<p>{item.answer}</p>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</section>
	);
}
