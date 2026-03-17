import { Reveal } from "@/components/animations";
import { Button } from "@/components/ui";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function CallToActionSection() {
	const t = useTranslations("AboutPage.CallToAction");

	return (
		<Reveal>
			<section className="relative mx-4 bg-secondary rounded-3xl pt-16 pb-18 overflow-hidden">
				<div className="absolute top-0 left-0 w-[45%] max-w-[480px] h-full z-0 pointer-events-none">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src="/call-to-action-right-bg.svg"
						alt=""
						className="w-full h-full object-contain object-left-top select-none"
						aria-hidden
					/>
				</div>
				<div className="absolute top-1/3 right-0 w-[45%] max-w-[480px] h-full z-0 pointer-events-none">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src="/call-to-action-left-bg.svg"
						alt=""
						className="w-full h-full object-contain object-right-bottom select-none"
						aria-hidden
					/>
				</div>
				<div className="container flex flex-col items-center justify-center relative z-10 mx-auto">
					<h2 className="h3 text-white uppercase">{t("title")}</h2>
					<p className="text-white/70 mt-4">
						{t("descriptionLine1")} <br />
						{t("descriptionLine2")}
					</p>
					<Button asChild variant="white" className="mt-8 text-secondary">
						<Link href="/contact">
							{t("button")} <ArrowRight className="w-4 h-4" />
						</Link>
					</Button>
				</div>
			</section>
		</Reveal>
	);
}
