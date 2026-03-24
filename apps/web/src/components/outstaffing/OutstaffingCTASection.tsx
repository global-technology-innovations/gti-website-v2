"use client";

import { Card, ContactForm, FormData, SuccessMessage } from "@/components";
import { useSendContactForm } from "@/queries";
import { Clock, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function OutstaffingCTASection() {
	const t = useTranslations("OutstaffingPage.CTA");
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
		<section className="py-16 ">
			<div className="container mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<div className="space-y-6">
						<div className="flex items-center space-x-3">
							<div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
								<Clock className="w-6 h-6 text-white" />
							</div>
							<h2>{t("title")}</h2>
						</div>

						<p className="text-lg leading-relaxed text-gray-700">{t("description")}</p>

						<div className="space-y-4">
							<div className="flex items-start space-x-3">
								<div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
								<span className="text-gray-700">{t("benefits.immediate")}</span>
							</div>
							<div className="flex items-start space-x-3">
								<div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
								<span className="text-gray-700">{t("benefits.experienced")}</span>
							</div>
							<div className="flex items-start space-x-3">
								<div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
								<span className="text-gray-700">{t("benefits.flexible")}</span>
							</div>
						</div>

						<div className="p-6 bg-white rounded-lg border-l-4 border-primary shadow-sm">
							<div className="flex items-center space-x-3 mb-2">
								<Users className="w-5 h-5 text-primary" />
								<h3 className="font-semibold text-gray-800">{t("guarantee.title")}</h3>
							</div>
							<p className="text-gray-600">{t("guarantee.description")}</p>
						</div>
					</div>

					<Card>
						{isSubmitted ? (
							<SuccessMessage />
						) : (
							<div>
								<div className="text-center mb-6">
									<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
										<Users className="w-6 h-6 text-primary" />
									</div>
									<h3 className="text-xl font-semibold text-gray-800 mb-2">{t("form.title")}</h3>
									<p className="text-gray-600 text-sm">{t("form.subtitle")}</p>
								</div>

								<ContactForm
									onSubmitAction={handleSubmit}
									isSubmitting={sendContactForm.isPending}
									className="bg-transparent shadow-none p-0 max-w-none"
								/>
							</div>
						)}
					</Card>
				</div>
			</div>
		</section>
	);
}
