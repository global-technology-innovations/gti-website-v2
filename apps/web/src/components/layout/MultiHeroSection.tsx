"use client";

import { Badge, Reveal } from "@/components";
import { cn } from "@/lib/utils";

export default function MultiHeroSection({
	title,
	description,
	className,
	badgeText,
}: MultiHeroSectionProps) {
	return (
		<section className={cn("", className)}>
			<div className="container mx-auto px-4">
				<Reveal>
					<div className="mx-auto text-center">
						{badgeText ? <Badge className="mb-3">{badgeText}</Badge> : null}
						<h1 className="text-center">{title}</h1>
						{description ? <p className="mt-4 text-center">{description}</p> : null}
					</div>
				</Reveal>
			</div>
		</section>
	);
}

interface MultiHeroSectionProps {
	title: string;
	description?: string;
	className?: string;
	badgeText?: string;
}
