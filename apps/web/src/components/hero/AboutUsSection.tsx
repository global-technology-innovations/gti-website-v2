import { Button } from "@/components";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export function AboutUsSection() {
	const t = useTranslations("HomePage.AboutUsSection");
	const stats = [
		{ value: t("stats.experience.value"), label: t("stats.experience.label"), variant: "light" },
		{ value: t("stats.projects.value"), label: t("stats.projects.label"), variant: "dark" },
		{ value: t("stats.team.value"), label: t("stats.team.label"), variant: "secondary" },
		{ value: t("stats.satisfaction.value"), label: t("stats.satisfaction.label"), variant: "light" },
	] as const;

	return (
		<section className="relative py-10 lg:py-32 w-full overflow-hidden px-4">
			<Image
				src="/about-bg.svg"
				alt=""
				width={408}
				height={362}
				className="pointer-events-none absolute bottom-0 left-0 z-0 object-contain object-left-bottom blur-xs lg:blur-none"
				aria-hidden
			/>
			<div className="container relative z-10 gap-6 mx-auto flex flex-col-reverse md:flex-row justify-between items-start">
				<div className="grid grid-cols-2 gap-4 mt-4 md:mt-0 w-full md:w-fit">
					<div className="p-7 bg-background rounded-3xl md:max-w-[250px] animate-slide-left">
						<h2 className="lg:!text-[48px] text-primary font-bold text-center md:text-left">{stats[0].value}</h2>
						<p className="text-primary-foreground text-center md:text-left">{stats[0].label}</p>
					</div>
					<div className="p-7 bg-primary rounded-3xl md:max-w-[250px] animate-slide-left">
						<h2 className="lg:!text-[48px] text-white font-bold text-center md:text-left">{stats[1].value}</h2>
						<p className="text-white/70 text-center md:text-left">{stats[1].label}</p>
					</div>
					<div className="p-7 bg-secondary rounded-3xl md:max-w-[250px] animate-slide-left">
						<h2 className="lg:!text-[48px] text-white font-bold text-center md:text-left">{stats[2].value}</h2>
						<p className="text-white/70 text-center md:text-left">{stats[2].label}</p>
					</div>
					<div className="hidden md:block"></div>
					<div className="hidden md:block"></div>
					<div className="p-7 bg-background rounded-3xl md:max-w-[250px] animate-slide-left">
						<h2 className="lg:!text-[48px] text-primary font-bold text-center md:text-left">{stats[3].value}</h2>
						<p className="text-primary-foreground text-center md:text-left">{stats[3].label}</p>
					</div>
					<Button asChild className="mt-6 mx-auto col-span-2 md:hidden animate-slide-bottom">
						<Link href="/about">
							{t("button")}
							<ArrowRight className="size-4 shrink-0" />
						</Link>
					</Button>
				</div>
				<div className="w-full md:w-1/2 animate-slide-right">
					<h2 className="h3 !font-bold text-primary uppercase text-center md:text-left">
						{t("heading")} <span className="text-secondary">{t("highlight")}</span> {t("headingSuffix")}
					</h2>
					<p className="text-primary-foreground mt-4 text-center md:text-left">{t("paragraphs.first")}</p>
					<p className="text-primary-foreground mt-4 text-center md:text-left">{t("paragraphs.second")}</p>
					<p className="text-primary-foreground mt-4 text-center md:text-left">{t("paragraphs.third")}</p>
					<Button asChild className="mt-12 hidden md:inline-flex">
						<Link href="/about">
							{t("button")}
							<ArrowRight className="size-4 shrink-0" />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
