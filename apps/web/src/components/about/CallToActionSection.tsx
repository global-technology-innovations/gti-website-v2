import { Button } from "@/components/ui";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function CallToActionSection({
	title,
	description,
	buttonText,
	sectionId,
}: {
	title?: string;
	description?: string;
	buttonText?: string;
	sectionId?: string;
}) {
	const t = useTranslations("AboutPage.CallToAction");

	return (
		<section id={sectionId} className="relative mx-4 overflow-hidden rounded-3xl bg-secondary py-10 lg:py-16 px-4">
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
				<h2 className="h3 text-center text-white uppercase">{title || t("title")}</h2>
				<p className="mt-4 text-center text-white/70">
					{description ? (
						description
					) : (
						<>
							{t("descriptionLine1")} <br />
							{t("descriptionLine2")}
						</>
					)}
				</p>
				<Button asChild variant="white" className="mt-8 text-secondary">
					<Link href="/contact">
						{buttonText || t("button")} <ArrowRight className="w-4 h-4" />
					</Link>
				</Button>
			</div>
		</section>
	);
}
