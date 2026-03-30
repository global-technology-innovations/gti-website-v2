"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "@/index";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function HistorySection() {
	const t = useTranslations("HomePage.AboutUsSection");

	return (
		<section className="relative container mx-auto py-10 lg:py-32 w-full overflow-hidden px-4">
			<div className="flex flex-col lg:flex-row justify-between items-start mx-4 gap-6 md:gap-10">
				<div className="lg:max-w-[590px] animate-slide-left">
					<h2 className="h3 !font-bold text-primary text-center lg:text-left uppercase">
						{t("heading")} <span className="text-secondary">{t("highlight")}</span> {t("headingSuffix")}
					</h2>
					<p className="text-primary-foreground mt-4 text-center lg:text-left">{t("paragraphs.first")}</p>
					<p className="text-primary-foreground mt-4 text-center lg:text-left">{t("paragraphs.second")}</p>
					<p className="text-primary-foreground mt-4 text-center lg:text-left">{t("paragraphs.third")}</p>
					<Button asChild className="hidden lg:inline-flex mt-12">
						<Link href="/about">
							{t("button")}
							<ArrowRight className="size-4 shrink-0" />
						</Link>
					</Button>
				</div>
				<Image
					src="/history-img.png"
					alt={t("imageAlt")}
					width={590}
					height={400}
					className="w-full h-auto max-w-[528px] rounded-lg object-cover mx-auto lg:mx-0 lg:self-center animate-slide-right"
				/>
				<Button asChild className="lg:hidden mt-6 mx-auto animate-slide-bottom">
					<Link href="/about">
						{t("button")}
						<ArrowRight className="size-4 shrink-0" />
					</Link>
				</Button>
			</div>
		</section>
	);
}
