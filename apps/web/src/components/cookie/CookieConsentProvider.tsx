"use client";

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import type { Consent } from "@/lib/consent";
import {
	acceptAll as acceptAllFactory,
	rejectAll as rejectAllFactory,
	writeConsentToDocument,
	readConsentFromDocument,
	CONSENT_VERSION,
} from "@/lib/consent";

type Ctx = {
	consent: Consent | null; // null -> користувач ще не обрав
	decided: boolean; // true -> є будь-який збережений вибір
	isLoaded: boolean; // true -> дані завантажено з cookie
	setConsent: (c: Consent) => void; // зберегти кастомний вибір
	acceptAll: () => void;
	rejectAll: () => void;
};

const ConsentContext = createContext<Ctx | null>(null);

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
	const [consent, setConsentState] = useState<Consent | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);

	// 1) читаємо cookie на клієнті після маунту
	useEffect(() => {
		const saved = readConsentFromDocument();
		// якщо версія змінилась — ігноруємо старі дані
		if (saved && saved.version === CONSENT_VERSION) {
			setConsentState(saved);
		} else {
			setConsentState(null);
		}
		setIsLoaded(true);
	}, []);

	// 2) хелпери для збереження
	const setConsent = useCallback((c: Consent) => {
		const next: Consent = { ...c, timestamp: Date.now(), version: CONSENT_VERSION };
		writeConsentToDocument(next);
		setConsentState(next);
	}, []);

	const acceptAll = useCallback(() => setConsent(acceptAllFactory()), [setConsent]);
	const rejectAll = useCallback(() => setConsent(rejectAllFactory()), [setConsent]);

	const ctx = useMemo<Ctx>(() => {
		return {
			consent,
			decided: !!consent, // якщо null — користувач ще не зробив вибір
			isLoaded,
			setConsent,
			acceptAll,
			rejectAll,
		};
	}, [consent, isLoaded, setConsent, acceptAll, rejectAll]);

	return <ConsentContext.Provider value={ctx}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
	const ctx = useContext(ConsentContext);
	if (!ctx) throw new Error("useConsent must be used within CookieConsentProvider");
	return ctx;
}
