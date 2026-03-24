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
			type="button"
			className="rounded-full border border-border bg-background px-5 py-3 text-sm font-medium text-primary transition-colors hover:bg-secondary/10"
			onClick={() => setShowBanner(true)}
		>
			{t("buttonText")} ({t("currentStatus")}: {getConsentStatus()})
		</button>
	);
}
