import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface LegalPageHeroSectionProps {
	title: ReactNode;
	description?: ReactNode;
	meta?: ReactNode;
	className?: string;
}

export function LegalPageHeroSection({ title, description, meta, className }: LegalPageHeroSectionProps) {
	return (
		<section className={cn("relative mx-4 overflow-hidden rounded-b-3xl bg-background", className)}>
			<div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[38%] max-w-[420px] bg-[url('/service-item-bg.svg')] bg-contain bg-right bg-no-repeat opacity-[0.12] md:block" />
			<div className="container relative z-10 mx-auto px-4 py-16 md:py-22">
				<div className="mx-auto text-center">
					<h1 className="h2 text-primary uppercase">{title}</h1>
					{description ? <p className="mx-auto mt-6 max-w-[760px] text-primary-foreground">{description}</p> : null}
					{meta ? <div className="mt-6 flex justify-center">{meta}</div> : null}
				</div>
			</div>
		</section>
	);
}
