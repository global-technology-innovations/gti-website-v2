"use client";

import { ContactForm, type FormData } from "@/components/forms/ContactForm";
import { SuccessMessage } from "@/components/forms/SuccessMessage";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useSendContactForm } from "@/queries/useSendContactForm";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ContactModal({ triggerText, className }: ContactModalProps) {
	const t = useTranslations("HomePage.HeroSection");
	const tContactForm = useTranslations("ContactForm");

	const [open, setOpen] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const mutation = useSendContactForm();

	const handleSubmit = (data: FormData, reset: () => void) => {
		mutation.mutate(data, {
			onSuccess: () => {
				reset();
				setIsSubmitted(true);

				setTimeout(() => {
					setIsSubmitted(false);
					setOpen(false);
				}, 6000);
			},
		});
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="default" className={className}>
					{triggerText || t("button")}
				</Button>
			</DialogTrigger>
			<DialogContent className="w-full rounded-[24px] border-border bg-white shadow-none">
				{!isSubmitted && (
					<DialogHeader className="mb-4">
						<DialogTitle className="h4 text-center font-bold uppercase leading-none text-primary">
							{tContactForm("title")}
						</DialogTitle>
					</DialogHeader>
				)}
				{isSubmitted ? (
					<SuccessMessage className="py-10" />
				) : (
					<ContactForm
						onSubmitAction={handleSubmit}
						isSubmitting={mutation.isPending}
						variant="application"
						className="max-w-none rounded-none border-0 bg-white p-0 shadow-none"
					/>
				)}
			</DialogContent>
		</Dialog>
	);
}

interface ContactModalProps {
	triggerText?: string;
	className?: string;
}
