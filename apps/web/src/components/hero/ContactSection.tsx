"use client";

import { ContactForm, FormData, SuccessMessage } from "@/components/forms";
import { cn } from "@/lib/utils";
import { useSendContactForm } from "@/queries/useSendContactForm";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

interface ContactSectionProps {
	customTitle?: React.ReactNode;
	customDescription?: React.ReactNode;
	contactDetails?: ContactDetailItem[];
	contactDetailsVariant?: "stack" | "grid";
	sectionClassName?: string;
	containerClassName?: string;
	infoColumnClassName?: string;
	detailsClassName?: string;
	formClassName?: string;
	formWrapperClassName?: string;
}

export interface ContactDetailItem {
	iconSrc: string;
	iconAlt: string;
	label: string;
	value: string;
	href?: string;
	external?: boolean;
	fullWidth?: boolean;
}

export function ContactSection({
	customTitle,
	customDescription,
	contactDetails,
	contactDetailsVariant = "stack",
	sectionClassName,
	containerClassName,
	infoColumnClassName,
	detailsClassName,
	formClassName,
	formWrapperClassName,
}: ContactSectionProps = {}) {
	const t = useTranslations("ContactFormSection");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const mutation = useSendContactForm();

	const defaultContactDetails: ContactDetailItem[] = [
		{
			iconSrc: "/icons/phone-calling.svg",
			iconAlt: "phone",
			label: t("phoneLabel"),
			value: "+380 97 373 72 40",
			href: "tel:+380973737240",
		},
		{
			iconSrc: "/icons/inbox.svg",
			iconAlt: "inbox",
			label: t("emailLabel"),
			value: "info@global-technology-innovations.com",
			href: "mailto:info@global-technology-innovations.com",
		},
		{
			iconSrc: "/icons/map-point.svg",
			iconAlt: "map point",
			label: t("addressLabel"),
			value: t("address"),
			href: "https://maps.google.com/?q=Jenisejská+45A,+040+12+Košice-Nad+Jazerom",
			external: true,
		},
	];

	const details = contactDetails ?? defaultContactDetails;

	const handleSubmit = (data: FormData, reset: () => void) => {
		mutation.mutate(data, {
			onSuccess: () => {
				reset();
				setIsSubmitted(true);

				setTimeout(() => {
					setIsSubmitted(false);
				}, 10000);
			},
		});
	};

	return (
		<section className={cn("relative mx-4 rounded-3xl bg-background py-10 lg:py-22 px-4", sectionClassName)}>
			<div
				className={cn(
					"container relative mx-auto flex flex-col lg:flex-row items-start justify-between gap-12",
					containerClassName
				)}
			>
				<div className={cn("max-w-[675px]", infoColumnClassName)}>
					<h2 className="h3 !font-bold text-primary text-center lg:text-left uppercase">
						{customTitle ||
							t.rich("title", {
								highlight: (chunks) => <span className="text-secondary">{chunks}</span>,
							})}
					</h2>
					<p className="text-primary-foreground mt-4 text-center lg:text-left">{customDescription || t("description")}</p>

					<div
						className={cn(
							contactDetailsVariant === "grid" ? "mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2" : "mt-12 space-y-4",
							detailsClassName
						)}
					>
						{details.map((item) => (
							<div
								key={`${item.label}-${item.value}`}
								className={cn(
									"flex items-start gap-4",
									contactDetailsVariant === "grid" && item.fullWidth && "sm:col-span-2"
								)}
							>
								<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary/10">
									<Image src={item.iconSrc} alt={item.iconAlt} width={24} height={24} className="size-6" />
								</div>
								<div className="flex flex-col gap-0.5">
									<p className="text-[17px] !font-semibold text-primary">{item.label}</p>
									{item.href ? (
										<a
											href={item.href}
											target={item.external ? "_blank" : undefined}
											rel={item.external ? "noopener noreferrer" : undefined}
											className="text-[17px] text-primary-foreground"
										>
											{item.value}
										</a>
									) : (
										<p className="text-[17px] text-primary-foreground">{item.value}</p>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
				<div className={cn("w-full lg:max-w-[650px]", formWrapperClassName)}>
					{isSubmitted ? (
						<SuccessMessage className="rounded-lg bg-white p-6" />
					) : (
						<ContactForm
							onSubmitAction={handleSubmit}
							isSubmitting={mutation.isPending}
							className={cn("max-w-none", formClassName)}
						/>
					)}
				</div>
			</div>
		</section>
	);
}
