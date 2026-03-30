"use client";

import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

interface SuccessMessageProps {
	className?: string;
	translationKey?: string;
}

export function SuccessMessage({ className = "", translationKey = "ContactForm" }: SuccessMessageProps) {
	const t = useTranslations(translationKey);

	return (
		<div role="status" aria-live="polite" className={`text-center py-8 ${className}`}>
			<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
				<CheckCircle className="w-8 h-8 text-green-600" />
			</div>
			<h3 className="text-xl font-semibold text-gray-800 mb-2">{t("success.title")}</h3>
			<p className="text-gray-600">{t("success.message")}</p>
		</div>
	);
}
