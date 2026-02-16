"use client";

import {
	Button,
	ContactForm,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	FormData,
	SuccessMessage,
} from "@/components";
import { useSendContactForm } from "@/queries";
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
			<DialogContent className="max-w-md w-full">
				{!isSubmitted && (
					<DialogHeader>
						<h2 className="text-center">{tContactForm("title")}</h2>
					</DialogHeader>
				)}
				<DialogTitle className="sr-only">Contact Form</DialogTitle>
				{isSubmitted ? (
					<SuccessMessage />
				) : (
					<ContactForm
						onSubmitAction={handleSubmit}
						isSubmitting={mutation.isPending}
						className="bg-background rounded-none shadow-none p-0"
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
