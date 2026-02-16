"use client";

import { CookieBanner, useConsent } from "@/components";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function ChangeConsentButton() {
	const { consent } = useConsent();
	const [showBanner, setShowBanner] = useState(false);
	const t = useTranslations("ChangeConsentButton");

	const getConsentStatus = () => {
		if (!consent) return t("statusNone");
		const enabledCount = Object.entries(consent).filter(
			([key, value]) => key !== "version" && key !== "timestamp" && value === true
		).length;
		return `${enabledCount} ${t("statusActive")}`;
	};

	if (showBanner) {
		return <CookieBanner forceOpen defaultOpenSettings onClose={() => setShowBanner(false)} />;
	}

	return (
		<button
			className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
			onClick={() => setShowBanner(true)}
		>
			{t("buttonText")} ({t("currentStatus")}: {getConsentStatus()})
		</button>
	);
}
