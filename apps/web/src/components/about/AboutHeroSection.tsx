import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

export function AboutHeroSection() {
	const t = useTranslations("AboutPage.Hero");
	const badges = t.raw("badges") as string[];

	return (
		<section className="relative mx-4 bg-background rounded-b-3xl overflow-hidden min-h-[400px] px-4">
			<div
				aria-hidden="true"
				className="absolute top-0 left-0 w-[45%] max-w-[480px] h-full z-0 pointer-events-none animate-slide-left bg-[url('/about-bg-left.svg')] bg-contain bg-left-top bg-no-repeat blur-xs md:blur-none"
			/>
			<div
				aria-hidden="true"
				className="absolute top-0 right-0 w-[45%] max-w-[480px] h-full z-0 pointer-events-none animate-slide-right bg-[url('/about-bg-right.svg')] bg-contain bg-right-top bg-no-repeat blur-xs md:blur-none"
			/>
			<div className="container relative z-10 py-10 lg:py-22 flex justify-between items-center mx-auto animate-slide-bottom">
				<div className="flex flex-col items-center justify-center w-full">
					<h1 className="text-primary text-center uppercase">
						{t("headingStart")} <span className="text-secondary">{t("headingHighlight")}</span> <br />
						{t("headingEnd")}
					</h1>
					<p className="!text-primary-foreground mt-6 text-center max-w-[700px] !text-[18px]">{t("descriptionFull")}</p>
					<div className="flex flex-wrap justify-center gap-3 mt-6 lg:mt-12">
						{badges.map((badge) => (
							<Badge key={badge} variant="secondary">
								{badge}
							</Badge>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
