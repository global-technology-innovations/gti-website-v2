"use client";

import { useTranslations } from "next-intl";

export function OutstaffingHeroSection() {
	const t = useTranslations("OutstaffingPage.Hero");

	return (
		<section className="relative mx-4 overflow-hidden rounded-b-3xl bg-background">
			<div className="absolute top-0 left-0 h-full w-[42%] max-w-[326px] pointer-events-none">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src="/outstaffing-left-bg.svg"
					alt=""
					className="h-full w-full object-contain object-left-top select-none"
					aria-hidden
				/>
			</div>
			<div className="absolute top-0 right-0 h-full w-[44%] max-w-[366px] pointer-events-none">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src="/outstaffing-right-bg.svg"
					alt=""
					className="h-full w-full object-contain object-right-top select-none"
					aria-hidden
				/>
			</div>
			<div className="container relative z-10 mx-auto flex min-h-[320px] flex-col items-center justify-center px-4 py-10 text-center md:min-h-[420px] md:py-24">
				<h1 className="h2 text-primary max-w-[810px] uppercase">
					{t.rich("title", {
						highlight: (chunks) => <span className="text-secondary">{chunks}</span>,
					})}
				</h1>
				<p className="mt-6 text-primary-foreground">{t("description")}</p>
			</div>
		</section>
	);
}
