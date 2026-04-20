"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function MultiHeroSection({ title, description, className, badgeText }: MultiHeroSectionProps) {
	return (
		<section className={cn("", className)}>
			<div className="container mx-auto px-4">
				<div className="mx-auto text-center">
					{badgeText ? <Badge className="mb-3">{badgeText}</Badge> : null}
					<h1 className="text-center">{title}</h1>
					{description ? <p className="mt-4 text-center">{description}</p> : null}
				</div>
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
