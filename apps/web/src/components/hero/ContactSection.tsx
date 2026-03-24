"use client";

import { ContactForm, FormData, SuccessMessage } from "@/components";
import { useSendContactForm } from "@/queries/useSendContactForm";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

interface ContactSectionProps {
	customTitle?: React.ReactNode;
	customDescription?: string;
}

export function ContactSection({ customTitle, customDescription }: ContactSectionProps = {}) {
	const t = useTranslations("ContactFormSection");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const mutation = useSendContactForm();

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
		<section className="relative mx-4 bg-background rounded-3xl py-22">
			<div className="container flex justify-between items-start relative mx-auto gap-12">
				<div className="max-w-[675px]">
					<h2 className="h3 !font-bold text-primary uppercase">
						{customTitle ||
							t.rich("title", {
								highlight: (chunks) => <span className="text-secondary">{chunks}</span>,
							})}
					</h2>
					<p className="text-primary-foreground mt-4">{customDescription || t("description")}</p>

					<div className="flex items-center gap-4 mt-12">
						<div className="size-10 bg-secondary/10 rounded-full flex items-center justify-center">
							<Image src="/icons/phone-calling.svg" alt="phone" width={24} height={24} className="size-6" />
						</div>
						<div className="flex flex-col gap-0.5">
							<p className="text-primary !font-semibold text-[17px]">{t("phoneLabel")}</p>
							<a href="tel:+380973737240" className="text-primary-foreground text-[17px]">
								+380 97 373 72 40
							</a>
						</div>
					</div>
					<div className="flex items-center gap-4 mt-4">
						<div className="size-10 bg-secondary/10 rounded-full flex items-center justify-center">
							<Image src="/icons/inbox.svg" alt="inbox" width={24} height={24} className="size-6" />
						</div>
						<div className="flex flex-col gap-0.5">
							<p className="text-primary !font-semibold text-[17px]">{t("emailLabel")}</p>
							<a href="mailto:info@global-technology-innovations.com" className="text-primary-foreground text-[17px]">
								info@global-technology-innovations.com
							</a>
						</div>
					</div>
					<div className="flex items-center gap-4 mt-4">
						<div className="size-10 bg-secondary/10 rounded-full flex items-center justify-center">
							<Image src="/icons/map-point.svg" alt="phone" width={24} height={24} className="size-6" />
						</div>
						<div className="flex flex-col gap-0.5">
							<p className="text-primary !font-semibold text-[17px]">{t("addressLabel")}</p>
							<a
								href="https://maps.google.com/?q=Jenisejská+45A,+040+12+Košice-Nad+Jazerom"
								target="_blank"
								rel="noopener noreferrer"
								className="text-primary-foreground text-[17px]"
							>
								{t("address")}
							</a>
						</div>
					</div>
				</div>
				{isSubmitted ? (
					<SuccessMessage className="bg-white rounded-lg p-6" />
				) : (
					<ContactForm onSubmitAction={handleSubmit} isSubmitting={mutation.isPending} />
				)}
			</div>
		</section>
	);
}
