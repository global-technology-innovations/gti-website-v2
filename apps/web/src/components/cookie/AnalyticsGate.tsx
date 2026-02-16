"use client";
import { useEffect } from "react";
import { useConsent } from "./CookieConsentProvider";

declare global {
	interface Window {
		dataLayer?: unknown[];
		gtag?: (...args: unknown[]) => void;
	}
}

export function AnalyticsGate() {
	const { consent } = useConsent();

	useEffect(() => {
		const id = process.env.NEXT_PUBLIC_GA_ID;
		if (!id) return;
		if (!consent?.analytics) return;

		window.dataLayer = window.dataLayer || [];
		window.gtag = (...args: unknown[]) => {
			window.dataLayer!.push(args);
		};

		// 1) підключаємо скрипт
		const s = document.createElement("script");
		s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
		s.async = true;
		document.head.appendChild(s);

		// 2) ініціалізація
		window.gtag("js", new Date());
		window.gtag("config", id, { anonymize_ip: true });

		return () => {
			s.remove();
		};
	}, [consent]);

	return null;
}
