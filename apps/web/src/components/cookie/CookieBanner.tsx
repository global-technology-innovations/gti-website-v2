"use client";

import type { Consent } from "@/lib/consent";
import { CONSENT_VERSION } from "@/lib/consent";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useConsent } from "./CookieConsentProvider";

type Toggles = Pick<Consent, "preferences" | "analytics" | "marketing">;

export function CookieBanner({
	forceOpen = false,
	defaultOpenSettings = false,
	onClose,
}: {
	forceOpen?: boolean;
	defaultOpenSettings?: boolean;
	onClose?: () => void;
}) {
	const { consent, decided, isLoaded, acceptAll, rejectAll, setConsent } = useConsent();
	const t = useTranslations("CookieBanner");

	// Якщо forceOpen — завжди відкриваємо налаштування.
	const [openSettings, setOpenSettings] = useState<boolean>(forceOpen || defaultOpenSettings);

	const [toggles, setToggles] = useState<Toggles>(() => ({
		preferences: consent?.preferences ?? false,
		analytics: consent?.analytics ?? false,
		marketing: consent?.marketing ?? false,
	}));

	// Синхронізуємо тумблери, коли підвантажили поточну згоду
	useEffect(() => {
		if (consent) {
			setToggles({
				preferences: consent.preferences,
				analytics: consent.analytics,
				marketing: consent.marketing,
			});
		}
	}, [consent]);

	// Якщо відкриваємо через кнопку зміни вибору — одразу режим налаштувань
	useEffect(() => {
		if (forceOpen) setOpenSettings(true);
	}, [forceOpen]);

	// Не блимати до ініціалізації провайдера (окрім примусового відкриття)
	if (!isLoaded && !forceOpen) return null;

	// Якщо вже прийнято рішення — малий банер більше не показуємо
	if (decided && !forceOpen) return null;

	const handleAcceptAll = () => {
		acceptAll();
		onClose?.();
	};

	const handleRejectAll = () => {
		rejectAll();
		onClose?.();
	};

	const handleSave = () => {
		setConsent({
			necessary: true,
			...toggles,
			version: CONSENT_VERSION,
			timestamp: Date.now(),
		});
		onClose?.();
	};

	return (
		<div className="fixed inset-x-0 bottom-0 z-50">
			<div className="relative mx-auto m-4 max-w-5xl rounded-2xl border bg-white p-4 shadow-lg">
				{/* Глобальний Х: показуємо лише у режимі forceOpen (зміна вибору) */}
				{forceOpen && onClose && (
					<Button
						type="button"
						onClick={onClose}
						className="absolute right-4 top-4 bg-transparent p-0 shadow-none border-none hover:bg-transparent"
					>
						<X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
					</Button>
				)}

				{/* Малий банер — тільки при першому показі (і точно не при forceOpen) */}
				{!forceOpen && !openSettings && (
					<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
						<div className="text-sm leading-relaxed">{t("description")}</div>

						<div className="flex shrink-0 gap-2">
							<Button
								type="button"
								className="rounded-md border px-3 py-2 text-sm"
								onClick={() => setOpenSettings(true)}
							>
								{t("buttons.configure")}
							</Button>
							<Button
								type="button"
								className="rounded-md border px-3 py-2 text-sm"
								onClick={handleRejectAll}
							>
								{t("buttons.reject")}
							</Button>
							<Button
								type="button"
								className="rounded-md px-3 py-2 text-sm text-white"
								onClick={handleAcceptAll}
							>
								{t("buttons.acceptAll")}
							</Button>
						</div>
					</div>
				)}

				{/* Налаштування — при forceOpen завжди, інакше коли користувач обрав "Налаштувати" */}
				{openSettings && (
					<>
						<div className="flex items-center justify-between">
							<div className="text-sm font-medium">{t("settings.title")}</div>
							{/* Кнопку "назад" прибрано за вимогою. Нема дубля хрестика. */}
						</div>

						<div className="mt-3 grid grid-cols-1 gap-2 text-sm md:grid-cols-3">
							<label className="flex items-start gap-2 rounded-md border p-3">
								<input type="checkbox" checked readOnly className="mt-1" />
								<div>
									<div className="font-medium">{t("settings.categories.necessary.title")}</div>
									<div className="opacity-70">{t("settings.categories.necessary.description")}</div>
								</div>
							</label>

							<label className="flex items-start gap-2 rounded-md border p-3">
								<input
									type="checkbox"
									className="mt-1"
									checked={toggles.preferences}
									onChange={(e) =>
										setToggles((prev) => ({ ...prev, preferences: e.target.checked }))
									}
								/>
								<div>
									<div className="font-medium">{t("settings.categories.functional.title")}</div>
									<div className="opacity-70">
										{t("settings.categories.functional.description")}
									</div>
								</div>
							</label>

							<label className="flex items-start gap-2 rounded-md border p-3">
								<input
									type="checkbox"
									className="mt-1"
									checked={toggles.analytics}
									onChange={(e) => setToggles((prev) => ({ ...prev, analytics: e.target.checked }))}
								/>
								<div>
									<div className="font-medium">{t("settings.categories.analytics.title")}</div>
									<div className="opacity-70">{t("settings.categories.analytics.description")}</div>
								</div>
							</label>

							<label className="md:col-span-3 flex items-start gap-2 rounded-md border p-3">
								<input
									type="checkbox"
									className="mt-1"
									checked={toggles.marketing}
									onChange={(e) => setToggles((prev) => ({ ...prev, marketing: e.target.checked }))}
								/>
								<div>
									<div className="font-medium">{t("settings.categories.marketing.title")}</div>
									<div className="opacity-70">{t("settings.categories.marketing.description")}</div>
								</div>
							</label>

							<div className="md:col-span-3 flex justify-end gap-2">
								<Button
									type="button"
									className="rounded-md border px-3 py-2 text-sm"
									onClick={handleRejectAll}
								>
									{t("buttons.rejectAll")}
								</Button>
								<Button
									type="button"
									className="rounded-md px-3 py-2 text-sm text-white"
									onClick={handleSave}
								>
									{t("buttons.saveSettings")}
								</Button>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
