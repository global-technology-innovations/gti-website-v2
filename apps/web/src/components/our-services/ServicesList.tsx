"use client";

import { Button, ServiceCard, ServiceCardSkeleton } from "@/components";
import { useServicesQuery } from "@/queries";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

const INITIAL_COUNT = 9;

export function ServicesList() {
	const t = useTranslations("OurServicesPage");
	const [expanded, setExpanded] = useState(false);
	const sectionRef = useRef<HTMLDivElement>(null);
	const { data: services, isLoading, error } = useServicesQuery();

	const handleToggle = () => {
		if (expanded) {
			setExpanded(false);
			sectionRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
			return;
		}

		setExpanded(true);
	};

	if (error) return <p>{t("loadError")}</p>;

	if (isLoading) {
		return (
			<div className="container mx-auto flex flex-col items-center px-4 py-6 lg:py-12 animate-slide-bottom">
				<div className="grid w-full grid-cols-1 items-stretch gap-x-4 gap-y-8 lg:grid-cols-3">
					{Array.from({ length: INITIAL_COUNT }).map((_, index) => (
						<div key={index} className="h-full">
							<ServiceCardSkeleton />
						</div>
					))}
				</div>
			</div>
		);
	}

	const displayedServices = expanded ? (services ?? []) : (services ?? []).slice(0, INITIAL_COUNT);
	const hasMore = (services?.length ?? 0) > INITIAL_COUNT;

	return (
		<div ref={sectionRef} className="flex flex-col items-center lg:py-12 py-6 px-4 container mx-auto">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-8 w-full items-stretch">
				{displayedServices.map((service) => (
					<div key={service.slug} className="h-full animate-slide-bottom">
						<ServiceCard
							slug={service.slug}
							title={service.title}
							description={service.shortDescription}
							image={service.image}
						/>
					</div>
				))}
			</div>
			{hasMore && (
				<Button type="button" aria-expanded={expanded} onClick={handleToggle} className="lg:mt-12 mt-6 animate-slide-bottom">
					{expanded ? t("showLess") : t("showMore")}
					<ArrowRight className={`size-4 shrink-0 transition-transform ${expanded ? "-rotate-90" : ""}`} />
				</Button>
			)}
		</div>
	);
}
