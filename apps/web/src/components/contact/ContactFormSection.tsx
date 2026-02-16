"use client";

import { Card, ContactForm, FormData, Reveal, SuccessMessage } from "@/components";
import { useSendContactForm } from "@/queries/useSendContactForm";
import { MessageCircle, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ContactFormSection() {
	const t = useTranslations("ContactPage");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const sendContactForm = useSendContactForm();

	const handleSubmit = async (data: FormData, reset: () => void) => {
		try {
			await sendContactForm.mutateAsync(data);
			setIsSubmitted(true);
			reset();

			setTimeout(() => {
				setIsSubmitted(false);
			}, 10000);
		} catch (error) {
			console.error("Error sending form:", error);
		}
	};

	return (
		<section className="py-16">
			<div className="container mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<Reveal>
						<div className="space-y-6">
							<div className="flex items-center space-x-3">
								<div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
									<MessageCircle className="w-6 h-6 text-white" />
								</div>
								<h2>{t("form.title")}</h2>
							</div>

							<p className="leading-relaxed">{t("form.description")}</p>

							<div className="space-y-4">
								<div className="flex items-center space-x-3">
									<div className="w-2 h-2 bg-primary rounded-full"></div>
									<span className="text-gray-700">{t("form.benefits.quick")}</span>
								</div>
								<div className="flex items-center space-x-3">
									<div className="w-2 h-2 bg-primary rounded-full"></div>
									<span className="text-gray-700">{t("form.benefits.professional")}</span>
								</div>
								<div className="flex items-center space-x-3">
									<div className="w-2 h-2 bg-primary rounded-full"></div>
									<span className="text-gray-700">{t("form.benefits.free")}</span>
								</div>
							</div>

							<div className="p-6 bg-white rounded-lg border-l-4 border-primary">
								<h3 className="mb-2">{t("form.responseTime.title")}</h3>
								<p>{t("form.responseTime.description")}</p>
							</div>
						</div>
					</Reveal>

					<Reveal>
						<Card>
							{isSubmitted ? (
								<SuccessMessage />
							) : (
								<div>
									<div className="text-center mb-6">
										<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
											<Send className="w-6 h-6 text-primary" />
										</div>
										<h3 className="text-xl font-semibold text-gray-800 mb-2">
											{t("form.formTitle")}
										</h3>
										<p className="text-gray-600 text-sm">{t("form.formSubtitle")}</p>
									</div>

									<ContactForm
										onSubmitAction={handleSubmit}
										isSubmitting={sendContactForm.isPending}
										className="bg-transparent shadow-none p-0 max-w-none"
									/>
								</div>
							)}
						</Card>
					</Reveal>
				</div>
			</div>
		</section>
	);
}
