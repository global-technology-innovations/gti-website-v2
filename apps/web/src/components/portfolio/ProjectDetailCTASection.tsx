"use client";

import { Link } from "@/i18n/navigation";
import ContactModal from "../modals/ContactModal";
import { Button } from "../ui/button";

interface ProjectDetailCTASectionProps {
	title: string;
	description: string;
	contactLabel: string;
	servicesLabel: string;
}

export function ProjectDetailCTASection({ title, description, contactLabel, servicesLabel }: ProjectDetailCTASectionProps) {
	return (
		<section className="mt-12 bg-primary/5 py-16">
			<div className="container mx-auto px-4 text-center">
				<h2 className="mb-4 text-3xl font-bold md:text-4xl">{title}</h2>
				<p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">{description}</p>
				<div className="flex flex-row items-center justify-center gap-4">
					<ContactModal triggerText={contactLabel} className="mx-0 mt-0" />
					<Button variant="default" asChild>
						<Link href="/our-services">{servicesLabel}</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
