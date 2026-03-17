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
		<section className="relative py-32 w-full overflow-hidden">
			<Image
				src="/about-bg.svg"
				alt=""
				width={408}
				height={362}
				className="pointer-events-none absolute bottom-0 left-0 z-0 object-contain object-left-bottom"
				aria-hidden
			/>
			<div className="container relative z-10 mx-auto flex justify-between items-start">
				<div className="grid grid-cols-2 gap-4 max-w-[530px]">
					<div className="p-7 bg-background rounded-3xl">
						<h2 className="text-primary font-bold">{stats[0].value}</h2>
						<p className="text-primary-foreground">{stats[0].label}</p>
					</div>
					<div className="p-7 bg-primary rounded-3xl">
						<h2 className="text-white font-bold">{stats[1].value}</h2>
						<p className="text-white/70">{stats[1].label}</p>
					</div>
					<div className="p-7 bg-secondary rounded-3xl">
						<h2 className="text-white font-bold">{stats[2].value}</h2>
						<p className="text-white/70">{stats[2].label}</p>
					</div>
					<div></div>
					<div></div>
					<div className="p-7 bg-background rounded-3xl">
						<h2 className="text-primary font-bold">{stats[3].value}</h2>
						<p className="text-primary-foreground">{stats[3].label}</p>
					</div>
				</div>
				<div className="max-w-[590px]">
					<h2 className="h3 !font-bold text-primary uppercase">
						{t("heading")} <span className="text-secondary">{t("highlight")}</span> {t("headingSuffix")}
					</h2>
					<p className="text-primary-foreground mt-4">{t("paragraphs.first")}</p>
					<p className="text-primary-foreground mt-4">{t("paragraphs.second")}</p>
					<p className="text-primary-foreground mt-4">{t("paragraphs.third")}</p>
					<Button asChild className="mt-12">
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
