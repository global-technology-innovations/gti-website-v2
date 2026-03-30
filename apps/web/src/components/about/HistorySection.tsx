"use client";

import { Button } from "@/index";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function HistorySection() {
	const t = useTranslations("HomePage.AboutUsSection");

	return (
		<section className="relative container mx-auto py-10 lg:py-32 w-full overflow-hidden px-4">
			<div className="flex flex-col lg:flex-row justify-between items-start mx-4">
				<div className="lg:max-w-[590px]">
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
					className="w-full h-auto rounded-lg object-cover"
				/>
				<Button asChild className="lg:hidden mt-6 mx-auto">
					<Link href="/about">
						{t("button")}
						<ArrowRight className="size-4 shrink-0" />
					</Link>
				</Button>
			</div>
		</section>
	);
}
